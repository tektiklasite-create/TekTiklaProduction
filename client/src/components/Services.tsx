import { site } from "../content/site";
import Reveal from "./Reveal";

const bentoClasses = [
  "md:col-span-2 lg:col-span-4", // Geniş kart
  "md:col-span-1 lg:col-span-2", // Dar kart
  "md:col-span-1 lg:col-span-2", // Alt sıra 1
  "md:col-span-1 lg:col-span-2", // Alt sıra 2
  "md:col-span-1 lg:col-span-2", // Alt sıra 3
];

export default function Services() {
  return (
    <section id="hizmetler" className="scroll-mt-20 border-b border-line py-20 sm:py-28 relative">
      {/* Hafif arka plan ışıltısı */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-lime/5 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-16">
          <h2 className="text-4xl font-bold uppercase tracking-tight text-bright sm:text-6xl max-w-lg">
            Ne <span className="text-lime">Yapıyoruz</span>
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest text-body">
            ({String(site.services.length).padStart(2, "0")} HİZMET)
          </span>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {site.services.map((service, i) => (
            <Reveal
              key={service.no}
              delay={i * 60}
              className={`group relative flex flex-col justify-between overflow-hidden border border-line bg-surface/20 p-8 transition-all duration-300 hover:border-lime/50 hover:-translate-y-1 ${
                bentoClasses[i % bentoClasses.length]
              }`}
            >
              {/* İç Hover Efekti (Hafif Yeşil Gradyan) */}
              <div className="absolute inset-0 bg-gradient-to-br from-lime/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-12 sm:mb-20">
                  <span className="font-mono text-sm font-bold text-body group-hover:text-lime transition-colors duration-300">
                    /{service.no}
                  </span>
                  
                  {/* Dönen Ok İkonu */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-body transition-all duration-300 group-hover:bg-lime group-hover:text-ink group-hover:border-lime group-hover:-rotate-45">
                    →
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-2xl font-bold uppercase tracking-tight text-bright transition-colors duration-300 group-hover:text-lime sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-body group-hover:text-bright/90 transition-colors duration-300">
                    {service.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
