import { useState } from "react";
import { site } from "../content/site";
import Reveal from "./Reveal";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="sss" className="scroll-mt-20 border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-bold uppercase tracking-tight text-bright sm:text-6xl">
            Merak <span className="text-outline-lime">Edilenler</span>
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest">(dobra cevaplar)</span>
        </Reveal>

        <div className="mt-12 border-t border-line">
          {site.faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="grid w-full grid-cols-[48px_1fr_32px] items-center gap-3 py-5 text-left"
                  >
                    <span className="font-mono text-sm text-lime">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-bold text-bright sm:text-lg">{item.q}</span>
                    <span
                      aria-hidden="true"
                      className={`text-center font-mono text-xl text-body transition-transform duration-200 ease-out ${
                        isOpen ? "rotate-45 text-lime" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pl-[60px] pr-10 text-sm leading-relaxed sm:text-base">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
