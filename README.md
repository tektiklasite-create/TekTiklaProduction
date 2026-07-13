# tektıkla.site — Web Ajansı Sitesi

Full-stack ajans sitesi: landing page + REST API + admin dashboard.

## Teknolojiler

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS v4, React Router
- **Backend:** Node.js, Express, TypeScript, SQLite (yerleşik `node:sqlite`, Node 22.5+ gerekir)
- **Auth:** JWT (12 saat), bcrypt ile şifre hashleme
- **Güvenlik:** Helmet, CORS, rate limiting, Zod validation, honeypot spam koruması

## Kurulum

```sh
cd webajans
npm run install:all
```

## Geliştirme

```sh
npm run dev
```

- Site: http://localhost:5173
- Admin: http://localhost:5173/admin
- API: http://localhost:3001/api/health

## Admin Girişi

`server/.env` dosyasındaki `ADMIN_USERNAME` / `ADMIN_PASSWORD` ile giriş yapılır.
**Yayına almadan önce şifreyi ve `JWT_SECRET` değerini mutlaka değiştirin.**

## Yapı

```
webajans/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── components/      # Landing bölümleri (Hero, Pricing, Contact...)
│       ├── pages/
│       │   ├── Landing.tsx
│       │   └── admin/       # Admin panel (Login, Dashboard, Talepler, Paketler)
│       ├── content/site.ts  # Tüm site metinleri — düzenlemek için tek yer
│       └── lib/api.ts       # Fetch wrapper + token yönetimi
└── server/                  # Express API
    ├── src/
    │   ├── routes/          # auth, leads, packages
    │   ├── middleware/      # JWT doğrulama
    │   └── db.ts            # SQLite şema + seed
    └── data/novaweb.db      # Veritabanı (otomatik oluşur, git'e girmez)
```

## API Endpointleri

| Method | Endpoint | Auth | Açıklama |
|---|---|---|---|
| GET | `/api/packages` | — | Paket listesi |
| PUT | `/api/packages/:id` | ✓ | Paket güncelle |
| POST | `/api/leads` | — | Teklif talebi gönder (rate limited) |
| GET | `/api/leads` | ✓ | Talepleri listele (`?status=new`) |
| PATCH | `/api/leads/:id` | ✓ | Talep durumu güncelle |
| DELETE | `/api/leads/:id` | ✓ | Talep sil |
| GET | `/api/leads/stats/summary` | ✓ | Dashboard istatistikleri |
| POST | `/api/auth/login` | — | Admin girişi (rate limited) |
| POST | `/api/checkout` | — | Stripe Checkout oturumu başlat (rate limited) |
| POST | `/api/stripe/webhook` | imza | Stripe webhook — ödeme kaydı düşer |

## Stripe (Online Ödeme)

`server/.env` içine `STRIPE_SECRET_KEY` girilince paket kartlarında "Kartla hemen başla" butonu aktifleşir.
Boş bırakılırsa online ödeme kapalı kalır, site iletişim formuyla çalışmaya devam eder.

- Kart ödemesi paket fiyatının **%50'si** (başlangıç ödemesi) — SSS'deki ödeme planıyla uyumlu.
- Paket bazında tutar admin panelden yönetilir ("Online ödeme fiyatı" alanı, boş = o pakette kart kapalı).
- Tamamlanan ödemeler webhook ile admin panelde "kazanıldı" statülü talep olarak görünür.
  Webhook için Stripe dashboard'da endpoint: `<site>/api/stripe/webhook`, event: `checkout.session.completed`;
  verilen imza anahtarını `STRIPE_WEBHOOK_SECRET` olarak ekle. Lokal test: `stripe listen --forward-to localhost:3001/api/stripe/webhook`

## İçerik Düzenleme

- **Metinler / hizmetler / SSS / projeler:** `client/src/content/site.ts`
- **Paketler ve fiyatlar:** Admin panel → Paketler sekmesi (veritabanından yönetilir)
- **Tema renkleri:** `client/src/index.css` içindeki `@theme` bloğu

## Production Build

```sh
npm run build
```

Client çıktısı `client/dist/`, server çıktısı `server/dist/`. Deploy seçenekleri:
frontend → Vercel/Netlify, backend → VPS/Railway/Render (SQLite dosyası kalıcı disk ister).
