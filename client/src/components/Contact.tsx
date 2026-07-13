import { useEffect, useState, type FormEvent } from "react";
import { api, ApiError } from "../lib/api";
import { site } from "../content/site";
import type { Package } from "../types";
import Reveal from "./Reveal";

interface ContactProps {
  selectedPackage: string;
  prefillMessage: string;
}

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact({ selectedPackage, prefillMessage }: ContactProps) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [packageName, setPackageName] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    api<Package[]>("/api/packages")
      .then(setPackages)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedPackage) setPackageName(selectedPackage);
  }, [selectedPackage]);

  useEffect(() => {
    if (prefillMessage) setMessage(prefillMessage);
  }, [prefillMessage]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setState("loading");
    setErrorMsg("");
    try {
      await api("/api/leads", {
        method: "POST",
        body: {
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          packageName: data.get("packageName"),
          message,
          website: data.get("website"),
        },
      });
      setState("success");
      form.reset();
      setPackageName("");
      setMessage("");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof ApiError ? err.message : "Bağlantı hatası, tekrar deneyin");
    }
  }

  const inputClass =
    "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-base text-bright placeholder:text-body/40 transition-colors duration-150 focus:border-lime focus:outline-none";
  const labelClass = "block font-mono text-[11px] uppercase tracking-widest text-lime";

  return (
    <section id="iletisim" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="text-4xl font-bold uppercase tracking-tight text-bright sm:text-6xl">
              Projeni
              <br />
              <span className="text-outline-lime">Anlat</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed sm:text-base">
              Formu doldur, 24 saat içinde dönelim. İlk görüşme ücretsiz — satış konuşması değil,
              keşif görüşmesi.
            </p>
            <p className="mt-8 font-mono text-xs uppercase tracking-widest">
              ya da direkt yaz:
              <br />
              <a
                href={`mailto:${site.footer.email}`}
                className="mt-2 inline-block text-base normal-case tracking-normal text-bright underline decoration-lime decoration-2 underline-offset-4 transition-colors duration-150 hover:text-lime"
              >
                {site.footer.email}
              </a>
            </p>
          </Reveal>

          <Reveal delay={100}>
            {state === "success" ? (
              <div role="status" className="border border-lime p-10 text-center">
                <p className="text-2xl font-bold uppercase text-lime">Talebin alındı ✓</p>
                <p className="mt-3 text-sm sm:text-base">
                  En geç 24 saat içinde e-posta veya telefonla dönüş yapacağız.
                </p>
                <button
                  type="button"
                  onClick={() => setState("idle")}
                  className="mt-8 rounded-full border border-line px-6 py-3 text-sm font-bold text-bright transition-colors duration-150 hover:border-lime hover:text-lime"
                >
                  Yeni talep gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    01 — ad soyad *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="name"
                    placeholder="Adın Soyadın"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    02 — e-posta *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={120}
                    autoComplete="email"
                    placeholder="ornek@mail.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    03 — telefon
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    maxLength={30}
                    autoComplete="tel"
                    placeholder="+90 5xx xxx xx xx"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-package" className={labelClass}>
                    04 — paket
                  </label>
                  <select
                    id="contact-package"
                    name="packageName"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="" className="bg-surface">
                      Henüz karar vermedim
                    </option>
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.name} className="bg-surface">
                        {pkg.name} — {pkg.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className={labelClass}>
                    05 — derdini anlat *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nasıl bir site istiyorsun? Ne satıyorsun, hedefin ne?"
                    className={`${inputClass} resize-y`}
                  />
                </div>

                {/* Honeypot — görünmez, botlar doldurur */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                {state === "error" && (
                  <p role="alert" className="text-sm text-red-400 sm:col-span-2">
                    {errorMsg}
                  </p>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-7 py-4 text-sm font-bold uppercase text-ink transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {state === "loading" ? "Gönderiliyor..." : "Gönder"}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-150 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
