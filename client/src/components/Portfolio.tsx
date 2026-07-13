import { useRef, type MouseEvent } from "react";
import { site } from "../content/site";
import Reveal from "./Reveal";

const TILT_MAX_DEG = 4;

// WordPress mShots — anahtarsız site ekran görüntüsü servisi (ilk istekte üretir, sonra önbellekten gelir)
function screenshotUrl(url: string) {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=800`;
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-relY * TILT_MAX_DEG}deg) rotateY(${relX * TILT_MAX_DEG}deg)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div ref={ref} className="tilt-card h-full" onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="projeler" className="scroll-mt-20 border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-bold uppercase tracking-tight text-bright sm:text-6xl">
            Seçili <span className="text-outline-lime">İşler</span>
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest">
            (hepsi yayında — tıkla, gez)
          </span>
        </Reveal>

        <div className="mt-12 flex flex-col gap-10">
          {site.portfolio.map((project, i) => (
            <Reveal key={project.url} delay={(i % 2) * 80}>
              <article className="grid gap-px border border-line bg-line lg:grid-cols-[1.25fr_1fr]">
                {/* Site önizlemesi — tarayıcı çerçevesi içinde canlı ekran görüntüsü */}
                <div className={`bg-ink p-4 sm:p-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <TiltCard>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} sitesini yeni sekmede aç`}
                      className="group block border border-line bg-surface transition-colors duration-200 hover:border-lime"
                    >
                      {/* Tarayıcı çubuğu */}
                      <span className="flex items-center gap-3 border-b border-line px-4 py-2.5">
                        <span className="flex gap-1.5" aria-hidden="true">
                          <span className="h-2.5 w-2.5 rounded-full bg-line" />
                          <span className="h-2.5 w-2.5 rounded-full bg-line" />
                          <span className="h-2.5 w-2.5 rounded-full bg-lime" />
                        </span>
                        <span className="flex-1 truncate border border-line bg-ink px-3 py-1 font-mono text-[11px] text-body">
                          {project.url.replace("https://", "")}
                        </span>
                        <span
                          aria-hidden="true"
                          className="font-mono text-xs text-body transition-colors duration-150 group-hover:text-lime"
                        >
                          ↗
                        </span>
                      </span>
                      {/* Ekran görüntüsü */}
                      <span className="block aspect-[16/10] overflow-hidden">
                        <img
                          src={screenshotUrl(project.url)}
                          alt={`${project.title} — site önizlemesi`}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                      </span>
                    </a>
                  </TiltCard>
                </div>

                {/* Detay: kategori, özellikler, fiyat */}
                <div className={`flex flex-col bg-ink p-6 sm:p-8 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-lime">
                    {String(i + 1).padStart(2, "0")} — {project.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold uppercase text-bright sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed">{project.description}</p>

                  <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-line pt-5">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <span aria-hidden="true" className="mt-0.5 font-mono font-bold text-lime">
                          +
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                    <p>
                      <span className="block font-mono text-[11px] uppercase tracking-widest">
                        benzeri, sana
                      </span>
                      <span className="text-3xl font-bold text-lime">{project.price}</span>
                    </p>
                    <a
                      href="#iletisim"
                      className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-bold text-bright transition-colors duration-150 hover:border-lime hover:text-lime"
                    >
                      Benzerini isterim
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-150 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
