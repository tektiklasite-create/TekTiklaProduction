import { useMemo, useState } from "react";
import Reveal from "./Reveal";

interface CalculatorProps {
  onQuote: (message: string) => void;
}

const SITE_TYPES = [
  { id: "landing", label: "Landing Page", base: 2500 },
  { id: "kurumsal", label: "Kurumsal Site", base: 4500 },
  { id: "eticaret", label: "E-Ticaret", base: 12000 },
  { id: "ozel", label: "Özel Yazılım", base: 18000 },
] as const;

const EXTRAS = [
  { id: "blog", label: "Blog / İçerik Sistemi", price: 2000 },
  { id: "lang", label: "Çoklu Dil", price: 1500 },
  { id: "seo", label: "SEO Paketi", price: 1500 },
  { id: "panel", label: "Admin Panel", price: 4000 },
] as const;

const INCLUDED_PAGES = 5;
const PRICE_PER_EXTRA_PAGE = 300;
const PRICE_MARGIN = 0.15;

function formatTL(value: number) {
  const rounded = Math.round(value / 100) * 100;
  return "₺" + rounded.toLocaleString("tr-TR");
}

export default function Calculator({ onQuote }: CalculatorProps) {
  const [siteType, setSiteType] = useState<(typeof SITE_TYPES)[number]["id"]>("kurumsal");
  const [pages, setPages] = useState(5);
  const [extras, setExtras] = useState<Set<string>>(new Set());

  const { low, high, selectedType, selectedExtras } = useMemo(() => {
    const type = SITE_TYPES.find((t) => t.id === siteType) ?? SITE_TYPES[1];
    const extraPages = Math.max(0, pages - INCLUDED_PAGES) * PRICE_PER_EXTRA_PAGE;
    const extraItems = EXTRAS.filter((e) => extras.has(e.id));
    const extrasTotal = extraItems.reduce((sum, e) => sum + e.price, 0);
    const total = type.base + extraPages + extrasTotal;
    return {
      low: total * (1 - PRICE_MARGIN),
      high: total * (1 + PRICE_MARGIN),
      selectedType: type,
      selectedExtras: extraItems,
    };
  }, [siteType, pages, extras]);

  function toggleExtra(id: string) {
    setExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function requestQuote() {
    const extrasText =
      selectedExtras.length > 0 ? selectedExtras.map((e) => e.label).join(", ") : "yok";
    onQuote(
      `Hesaplayıcıdan geliyorum. ${selectedType.label} istiyorum — yaklaşık ${pages} sayfa, ` +
        `ekstralar: ${extrasText}. Tahmini aralık ${formatTL(low)} – ${formatTL(high)} göründü. ` +
        `Detayları konuşabilir miyiz?`
    );
  }

  const optionClass = (active: boolean) =>
    `cursor-pointer border px-4 py-3 text-center text-sm font-bold uppercase transition-colors duration-150 ${
      active
        ? "border-lime bg-lime text-ink"
        : "border-line text-body hover:border-body hover:text-bright"
    }`;

  return (
    <section id="hesapla" className="scroll-mt-20 border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-bold uppercase tracking-tight text-bright sm:text-6xl">
            Kaça <span className="text-outline-lime">Patlar?</span>
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest">(30 saniyede tahmini fiyat)</span>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-[1.4fr_1fr]">
            {/* Sol: seçimler */}
            <div className="flex flex-col gap-8 bg-ink p-6 sm:p-8">
              <fieldset>
                <legend className="font-mono text-xs uppercase tracking-widest text-lime">
                  01 — ne lazım?
                </legend>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {SITE_TYPES.map((type) => (
                    <label key={type.id} className={optionClass(siteType === type.id)}>
                      <input
                        type="radio"
                        name="siteType"
                        value={type.id}
                        checked={siteType === type.id}
                        onChange={() => setSiteType(type.id)}
                        className="sr-only"
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <div className="flex items-baseline justify-between">
                  <label
                    htmlFor="calc-pages"
                    className="font-mono text-xs uppercase tracking-widest text-lime"
                  >
                    02 — kaç sayfa?
                  </label>
                  <span className="font-mono text-2xl font-bold text-bright">{pages}</span>
                </div>
                <input
                  id="calc-pages"
                  type="range"
                  min={1}
                  max={30}
                  value={pages}
                  onChange={(e) => setPages(Number(e.target.value))}
                  className="mt-4 w-full accent-lime"
                />
                <div className="mt-1 flex justify-between font-mono text-[11px]">
                  <span>1</span>
                  <span>ilk {INCLUDED_PAGES} sayfa dahil</span>
                  <span>30</span>
                </div>
              </div>

              <fieldset>
                <legend className="font-mono text-xs uppercase tracking-widest text-lime">
                  03 — ekstralar
                </legend>
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {EXTRAS.map((extra) => (
                    <label
                      key={extra.id}
                      className={`flex cursor-pointer items-center justify-between border px-4 py-3 text-sm transition-colors duration-150 ${
                        extras.has(extra.id)
                          ? "border-lime text-bright"
                          : "border-line hover:border-body"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={extras.has(extra.id)}
                          onChange={() => toggleExtra(extra.id)}
                          className="h-4 w-4 accent-lime"
                        />
                        {extra.label}
                      </span>
                      <span className="font-mono text-xs">
                        +₺{extra.price.toLocaleString("tr-TR")}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Sağ: sonuç */}
            <div className="flex flex-col justify-between bg-surface p-6 sm:p-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest">tahmini aralık</p>
                <p className="mt-4 text-4xl font-bold leading-tight text-lime sm:text-5xl" aria-live="polite">
                  {formatTL(low)}
                  <span className="text-body"> —</span>
                  <br />
                  {formatTL(high)}
                </p>
                <p className="mt-6 text-sm leading-relaxed">
                  Bu bir taahhüt değil, dürüst bir tahmin. Net fiyat 30 dakikalık ücretsiz keşif
                  görüşmesinden sonra — ve o fiyat değişmez.
                </p>
              </div>
              <button
                type="button"
                onClick={requestQuote}
                className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-bold text-ink transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
              >
                Bu tahminle teklif iste
                <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
