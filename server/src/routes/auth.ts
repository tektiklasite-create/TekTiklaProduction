import { Router } from "express";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { db } from "../db.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Çok fazla deneme. 15 dakika sonra tekrar deneyin." },
});

const LoginSchema = z.object({
  username: z.string().min(1).max(64),
  password: z.string().min(1).max(128),
});

const TOKEN_TTL = "12h";

router.post("/login", loginLimiter, (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Kullanıcı adı ve şifre zorunlu" });
  }
  const { username, password } = parsed.data;

  const user = db
    .prepare("SELECT id, username, password_hash FROM users WHERE username = ?")
    .get(username) as { id: number; username: string; password_hash: string } | undefined;

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: "Kullanıcı adı veya şifre hatalı" });
  }

  const token = jwt.sign({ sub: user.username }, process.env.JWT_SECRET as string, {
    expiresIn: TOKEN_TTL,
  });
  res.json({ token, username: user.username });
});

export default router;
