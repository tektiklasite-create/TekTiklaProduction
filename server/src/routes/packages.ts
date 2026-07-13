import { Router } from "express";
import { z } from "zod";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

interface PackageRow {
  id: number;
  name: string;
  price: string;
  period: string;
  badge: string | null;
  features: string;
  highlighted: number;
  sort: number;
  price_amount: number | null;
}

function toDto(row: PackageRow) {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    period: row.period,
    badge: row.badge,
    features: JSON.parse(row.features) as string[],
    highlighted: row.highlighted === 1,
    priceAmount: row.price_amount,
  };
}

router.get("/", (_req, res) => {
  const rows = db.prepare("SELECT * FROM packages ORDER BY sort ASC").all() as unknown as PackageRow[];
  res.json(rows.map(toDto));
});

const UpdateSchema = z.object({
  name: z.string().min(1).max(60),
  price: z.string().min(1).max(30),
  period: z.string().min(1).max(40),
  badge: z.string().max(30).nullable(),
  features: z.array(z.string().min(1).max(120)).min(1).max(12),
  highlighted: z.boolean(),
  // Kuruş cinsinden; null = online ödeme kapalı
  priceAmount: z.number().int().positive().max(100_000_000_000).nullable(),
});

router.put("/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Geçersiz id" });

  const parsed = UpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Geçersiz paket verisi", details: parsed.error.flatten() });
  }
  const p = parsed.data;

  const result = db
    .prepare(
      `UPDATE packages SET name=@name, price=@price, period=@period, badge=@badge,
       features=@features, highlighted=@highlighted, price_amount=@price_amount WHERE id=@id`
    )
    .run({
      id,
      name: p.name,
      price: p.price,
      period: p.period,
      badge: p.badge,
      features: JSON.stringify(p.features),
      highlighted: p.highlighted ? 1 : 0,
      price_amount: p.priceAmount,
    });

  if (result.changes === 0) return res.status(404).json({ error: "Paket bulunamadı" });

  const row = db.prepare("SELECT * FROM packages WHERE id = ?").get(id) as unknown as PackageRow;
  res.json(toDto(row));
});

export default router;
