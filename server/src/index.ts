import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { seed } from "./db.js";
import authRoutes from "./routes/auth.js";
import packageRoutes from "./routes/packages.js";
import leadRoutes from "./routes/leads.js";
import checkoutRoutes, { stripeWebhook } from "./routes/checkout.js";

const required = ["JWT_SECRET", "ADMIN_USERNAME", "ADMIN_PASSWORD"] as const;
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Eksik ortam değişkeni: ${key} (.env dosyasını kontrol et)`);
    process.exit(1);
  }
}

seed(process.env.ADMIN_USERNAME as string, process.env.ADMIN_PASSWORD as string);

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
  })
);
// Stripe webhook imza doğrulaması raw body ister — express.json'dan önce
app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), stripeWebhook);

app.use(express.json({ limit: "50kb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/checkout", checkoutRoutes);

app.use((_req, res) => res.status(404).json({ error: "Bulunamadı" }));

// Hata yakalama — hatayı logla, istemciye detay sızdırma
app.use(
  (err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
);

const port = Number(process.env.API_PORT ?? 3001);
app.listen(port, () => {
  console.log(`API hazır: http://localhost:${port}`);
});
