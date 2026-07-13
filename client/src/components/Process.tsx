import { site } from "../content/site";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section id="surec" className="scroll-mt-20 border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-bold uppercase tracking-tight text-bright sm:text-6xl">
            Nasıl <span className="text-outline-lime">Çalışıyoruz</span>
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest">(4 adım, sürpriz yok)</span>
        </Reveal>

        <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {site.process.map((step, i) => (
            <Reveal key={step.no} delay={i * 80} className="h-full">
              <div className="flex h-full flex-col bg-ink p-6 transition-colors duration-200 hover:bg-surface">
                <span
                  className="text-outline select-none text-7xl font-bold leading-none"
                  aria-hidden="true"
                >
                  {step.no}
                </span>
                <h3 className="mt-6 text-lg font-bold uppercase text-bright">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{step.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
