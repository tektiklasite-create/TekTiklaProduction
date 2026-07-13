import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Çok fazla istek. Lütfen daha sonra tekrar deneyin." },
});

const LEAD_STATUSES = ["new", "contacted", "won", "lost"] as const;

const CreateSchema = z.object({
  name: z.string().trim().min(2, "İsim en az 2 karakter").max(80),
  email: z.string().trim().email("Geçerli bir e-posta girin").max(120),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  packageName: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Mesaj en az 10 karakter").max(2000),
  // Honeypot — botlar doldurur, insanlar görmez
  website: z.string().max(0).optional().or(z.literal("")),
});

router.post("/", submitLimiter, (req, res) => {
  const parsed = CreateSchema.safeParse(req.body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return res.status(400).json({ error: first?.message ?? "Geçersiz form verisi" });
  }
  const d = parsed.data;

  // Honeypot dolu ise sessizce başarılı dön — bota sinyal verme
  if (d.website) return res.status(201).json({ ok: true });

  const result = db
    .prepare(
      `INSERT INTO leads (name, email, phone, package_name, message)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(d.name, d.email, d.phone || null, d.packageName || null, d.message);

  res.status(201).json({ ok: true, id: result.lastInsertRowid });
});

router.get("/", requireAuth, (req, res) => {
  const status = req.query.status as string | undefined;
  const rows =
    status && (LEAD_STATUSES as readonly string[]).includes(status)
      ? db.prepare("SELECT * FROM leads WHERE status = ? ORDER BY id DESC").all(status)
      : db.prepare("SELECT * FROM leads ORDER BY id DESC").all();
  res.json(rows);
});

const StatusSchema = z.object({ status: z.enum(LEAD_STATUSES) });

router.patch("/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Geçersiz id" });

  const parsed = StatusSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Geçersiz durum" });

  const result = db
    .prepare("UPDATE leads SET status = ? WHERE id = ?")
    .run(parsed.data.status, id);
  if (result.changes === 0) return res.status(404).json({ error: "Talep bulunamadı" });
  res.json({ ok: true });
});

router.delete("/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Geçersiz id" });

  const result = db.prepare("DELETE FROM leads WHERE id = ?").run(id);
  if (result.changes === 0) return res.status(404).json({ error: "Talep bulunamadı" });
  res.json({ ok: true });
});

router.get("/stats/summary", requireAuth, (_req, res) => {
  const total = (db.prepare("SELECT COUNT(*) c FROM leads").get() as { c: number }).c;
  const byStatus = db
    .prepare("SELECT status, COUNT(*) c FROM leads GROUP BY status")
    .all() as { status: string; c: number }[];
  const last7 = (
    db
      .prepare("SELECT COUNT(*) c FROM leads WHERE created_at >= datetime('now', '-7 days')")
      .get() as { c: number }
  ).c;

  const counts: Record<string, number> = { new: 0, contacted: 0, won: 0, lost: 0 };
  for (const row of byStatus) counts[row.status] = row.c;

  res.json({ total, last7, ...counts });
});

export default router;
