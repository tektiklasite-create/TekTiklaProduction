import { site } from "../content/site";
import Reveal from "./Reveal";

export default function Manifesto() {
  return (
    <section className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-lime">(manifesto)</p>
        </Reveal>

        {site.manifesto.lines.map((line, i) => (
          <Reveal key={i} delay={i * 100}>
            <p className="mt-8 max-w-5xl text-3xl font-bold leading-tight tracking-tight text-bright sm:text-5xl">
              {line.map((seg, j) => (
                <span
                  key={j}
                  className={seg.accent ? "font-serif font-normal italic text-lime" : undefined}
                >
                  {seg.t}
                </span>
              ))}
            </p>
          </Reveal>
        ))}



        {/* Yayında olan gerçek işler */}
        <Reveal delay={100}>
          <p className="mt-14 font-mono text-xs uppercase tracking-widest text-lime">(yayında)</p>
        </Reveal>
        <ul className="mt-4 border-t border-line">
          {site.manifesto.references.map((ref, i) => (
            <Reveal key={ref.url} delay={i * 60}>
              <li>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4 transition-colors duration-200 hover:bg-surface"
                >
                  <span className="text-lg font-bold uppercase text-bright transition-colors duration-150 group-hover:text-lime sm:text-xl">
                    {ref.name}
                    <span
                      aria-hidden="true"
                      className="ml-2 inline-block text-body transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime"
                    >
                      ↗
                    </span>
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest">{ref.detail}</span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
