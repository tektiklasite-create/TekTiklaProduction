import * as React from "react";
import { site } from "../content/site";
import { GooeyText } from "./ui/gooey-text-morphing";

// three.js ağır — hero arkaplanı lazy yüklenir, ana bundle şişmez
const CanvasRevealEffect = React.lazy(() =>
  import("./ui/canvas-reveal-effect").then((m) => ({ default: m.CanvasRevealEffect }))
);

// Lime rengi (#d9ff4b) RGB olarak — shader renk kanalı 0-255 bekliyor
const LIME_RGB: number[][] = [[217, 255, 75]];

export default function Hero() {
  const [reduceMotion] = React.useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  return (
    <section className="relative overflow-hidden border-b border-line pt-32 pb-16 sm:pt-40 sm:pb-24">
      {/* Nokta-matrisi shader arkaplanı — merkezden açılıp hafifçe yanıp söner */}
      {!reduceMotion && (
        <div className="absolute inset-0 opacity-25" aria-hidden="true">
          <React.Suspense fallback={null}>
            <CanvasRevealEffect
              animationSpeed={2.5}
              containerClassName="bg-transparent"
              colors={LIME_RGB}
              dotSize={2.5}
              showGradient={false}
            />
          </React.Suspense>
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
        </div>
      )}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Üst şerit: eyebrow + müsaitlik */}
        <div className="anim-hero flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-widest text-body sm:text-xs">
          <span>{site.hero.eyebrow}</span>
        </div>

        {/* Dev başlık */}
        <h1 className="mt-10 font-bold uppercase leading-[0.92] tracking-tight">
          <span
            className="anim-hero block text-outline text-[16vw] sm:text-[7.5rem] lg:text-[9rem]"
            style={{ animationDelay: "80ms" }}
          >
            {site.hero.titleTop}
          </span>
          <span
            className="anim-hero block text-[16vw] text-bright sm:text-[7.5rem] lg:text-[9rem]"
            style={{ animationDelay: "160ms" }}
          >
            {site.hero.titleBottom.split(" ").map((word, i) =>
              i === 0 ? (
                <span key={i} className="text-lime">
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word}</span>
              )
            )}
            <span className="text-lime">*</span>
          </span>
        </h1>

        {/* Akışkan (gooey) morph'lanan kelime satırı */}
        <p
          className="anim-hero mt-8 flex flex-wrap items-baseline gap-x-2 text-xl text-bright sm:text-3xl"
          style={{ animationDelay: "240ms" }}
        >
          <span className="text-body">*{site.hero.rotatingPrefix}</span>
          {reduceMotion ? (
            <span className="font-bold text-lime">{site.hero.rotatingWords[0]}</span>
          ) : (
            <GooeyText
              texts={[...site.hero.rotatingWords]}
              morphTime={1}
              cooldownTime={1.5}
              textClassName="text-[length:inherit] md:text-[length:inherit] font-bold leading-none text-lime whitespace-nowrap"
            />
          )}
          {/* Ekran okuyucular için statik metin */}
          <span className="sr-only">{site.hero.rotatingWords.join(", ")}</span>
          <span className="text-body">{site.hero.rotatingSuffix}</span>
        </p>

        {/* Alt satır: açıklama + CTA + dönen rozet */}
        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="anim-hero max-w-md" style={{ animationDelay: "320ms" }}>
            <p className="text-sm leading-relaxed sm:text-base">{site.hero.subtitle}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#iletisim"
                className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-bold text-ink transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
              >
                {site.hero.ctaPrimary}
                <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#projeler"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-bold text-bright transition-colors duration-150 hover:border-lime hover:text-lime"
              >
                {site.hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Dairesel dönen rozet */}
          <div className="anim-hero hidden md:block" style={{ animationDelay: "400ms" }} aria-hidden="true">
            <svg viewBox="0 0 120 120" className="spin-slow h-28 w-28 text-body">
              <defs>
                <path id="badge-circle" d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
              </defs>
              <text className="fill-current font-mono text-[10.5px] uppercase tracking-[0.22em]">
                <textPath href="#badge-circle">
                  tek tıkla • gerisi bizde • şablon yok •
                </textPath>
              </text>
              <text
                x="60"
                y="66"
                textAnchor="middle"
                className="fill-lime text-[18px] font-bold"
              >
                ✳
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
