import { Router, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import Stripe from "stripe";
import { z } from "zod";
import { db } from "../db.js";

// STRIPE_SECRET_KEY boşsa online ödeme kapalı — site iletişim formuyla çalışmaya devam eder
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey) : null;

const router = Router();

const checkoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Çok fazla istek. Lütfen daha sonra tekrar deneyin." },
});

const CheckoutSchema = z.object({
  packageId: z.number().int().positive(),
});

interface PackageRow {
  id: number;
  name: string;
  price: string;
  price_amount: number | null;
}

router.post("/", checkoutLimiter, async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: "Online ödeme şu anda aktif değil — iletişim formunu kullanın" });
  }

  const parsed = CheckoutSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Geçersiz istek" });

  const row = db
    .prepare("SELECT id, name, price, price_amount FROM packages WHERE id = ?")
    .get(parsed.data.packageId) as unknown as PackageRow | undefined;

  if (!row) return res.status(404).json({ error: "Paket bulunamadı" });
  if (!row.price_amount) {
    return res.status(400).json({ error: "Bu paket için özel teklif gerekiyor — iletişim formunu kullanın" });
  }

  // FAQ'daki ödeme planıyla uyumlu: başta %50, kalan teslimde
  const depositAmount = Math.round(row.price_amount / 2);
  const origin = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "try",
            unit_amount: depositAmount,
            product_data: {
              name: `${row.name} Paketi — %50 başlangıç ödemesi`,
              description: `Toplam ${row.price} — kalan %50 teslimde ödenir.`,
            },
          },
        },
      ],
      metadata: { packageId: String(row.id), packageName: row.name },
      success_url: `${origin}/?odeme=basarili`,
      cancel_url: `${origin}/?odeme=iptal`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout hatası:", err);
    res.status(502).json({ error: "Ödeme başlatılamadı, lütfen tekrar deneyin" });
  }
});

// Raw body ister — index.ts'te express.json'dan ÖNCE express.raw ile mount edilir
export function stripeWebhook(req: Request, res: Response) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers["stripe-signature"];

  if (!stripe || !webhookSecret) return res.status(503).json({ error: "Webhook yapılandırılmamış" });
  if (typeof signature !== "string") return res.status(400).json({ error: "İmza eksik" });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook imza hatası:", err);
    return res.status(400).json({ error: "İmza doğrulanamadı" });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const amountText = ((session.amount_total ?? 0) / 100).toLocaleString("tr-TR");

    // Ödeme, admin panelde görünsün diye "won" statülü talep olarak kaydedilir
    db.prepare(
      `INSERT INTO leads (name, email, phone, package_name, message, status)
       VALUES (?, ?, ?, ?, ?, 'won')`
    ).run(
      session.customer_details?.name ?? "Stripe müşterisi",
      session.customer_details?.email ?? "e-posta alınamadı",
      session.customer_details?.phone ?? null,
      session.metadata?.packageName ?? null,
      `Stripe ödemesi alındı: ₺${amountText} (%50 başlangıç ödemesi). Oturum: ${session.id}`
    );
  }

  res.json({ received: true });
}

export default router;
