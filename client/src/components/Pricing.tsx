import { useEffect, useState } from "react";
import { api, ApiError } from "../lib/api";
import type { Package } from "../types";
import Reveal from "./Reveal";

interface PricingProps {
  onSelectPackage: (name: string) => void;
}

export default function Pricing({ onSelectPackage }: PricingProps) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [error, setError] = useState(false);
  const [payingId, setPayingId] = useState<number | null>(null);
  const [payError, setPayError] = useState("");

  useEffect(() => {
    api<Package[]>("/api/packages")
      .then(setPackages)
      .catch(() => setError(true));
  }, []);

  async function handlePay(pkg: Package) {
    setPayingId(pkg.id);
    setPayError("");
    try {
      const { url } = await api<{ url: string }>("/api/checkout", {
        method: "POST",
        body: { packageId: pkg.id },
      });
      window.location.assign(url);
    } catch (err) {
      setPayError(
        err instanceof ApiError ? err.message : "Ödeme başlatılamadı — iletişim formunu kullanın"
      );
      setPayingId(null);
    }
  }

  return (
    <section id="paketler" className="scroll-mt-20 border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-bold uppercase tracking-tight text-bright sm:text-6xl">
            Hazır <span className="text-outline-lime">Paketler</span>
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest">(gizli maliyet yok)</span>
        </Reveal>

        {error && (
          <p className="mt-10 text-sm">
            Paketler şu anda yüklenemedi — iletişim formundan bize ulaşın.
          </p>
        )}

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 100} className="h-full">
              <article
                className={`card-lift relative flex h-full flex-col border p-7 ${
                  pkg.highlighted
                    ? "border-lime bg-lime text-ink"
                    : "border-line bg-ink"
                }`}
              >
                {pkg.badge && (
                  <span
                    className={`absolute right-0 top-0 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest ${
                      pkg.highlighted ? "bg-ink text-lime" : "bg-lime text-ink"
                    }`}
                  >
                    {pkg.badge}
                  </span>
                )}

                <h3
                  className={`font-mono text-sm font-bold uppercase tracking-widest ${
                    pkg.highlighted ? "text-ink/70" : "text-lime"
                  }`}
                >
                  {pkg.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className={`text-4xl font-bold sm:text-5xl ${
                      pkg.highlighted ? "text-ink" : "text-bright"
                    }`}
                  >
                    {pkg.price}
                  </span>
                  <span className={`text-sm ${pkg.highlighted ? "text-ink/60" : ""}`}>
                    / {pkg.period}
                  </span>
                </div>

                <ul
                  className={`mt-7 flex flex-1 flex-col gap-3 border-t pt-6 ${
                    pkg.highlighted ? "border-ink/15" : "border-line"
                  }`}
                >
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2.5 text-sm ${
                        pkg.highlighted ? "text-ink/85" : ""
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 font-mono font-bold ${
                          pkg.highlighted ? "text-ink" : "text-lime"
                        }`}
                      >
                        +
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg.name)}
                    className={`w-full rounded-full px-5 py-3 text-sm font-bold uppercase transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] ${
                      pkg.highlighted
                        ? "bg-ink text-lime"
                        : "border border-line text-bright hover:border-lime hover:text-lime"
                    }`}
                  >
                    Bu paketi seç →
                  </button>
                  {pkg.priceAmount != null && (
                    <button
                      type="button"
                      onClick={() => handlePay(pkg)}
                      disabled={payingId !== null}
                      className={`w-full rounded-full px-5 py-3 text-sm font-bold uppercase transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
                        pkg.highlighted
                          ? "border border-ink/30 text-ink hover:bg-ink/10"
                          : "bg-lime text-ink"
                      }`}
                    >
                      {payingId === pkg.id ? "Yönlendiriliyor..." : "Kartla hemen başla"}
                    </button>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {payError && (
          <p role="alert" className="mt-6 text-sm text-red-400">
            {payError}
          </p>
        )}

        <p className="mt-8 font-mono text-xs uppercase tracking-widest">
          Kart ödemesi = %50 başlangıç ödemesi, Stripe güvencesiyle. Kalan %50 teslimde.
        </p>
      </div>
    </section>
  );
}
