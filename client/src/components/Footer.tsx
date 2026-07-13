import { useEffect, useState } from "react";
import { site } from "../content/site";

const timeFormat = new Intl.DateTimeFormat("tr-TR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Istanbul",
});

function IstanbulClock() {
  const [time, setTime] = useState(() => timeFormat.format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(timeFormat.format(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span>
      Trabzon, TR — <span className="text-lime">{time}</span>
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-line">
      {/* Dev CTA */}
      <a
        href="#iletisim"
        className="group block border-b border-line px-4 py-14 text-center transition-colors duration-200 hover:bg-lime sm:px-6 sm:py-20"
      >
        <span className="block font-mono text-xs uppercase tracking-widest text-body transition-colors duration-200 group-hover:text-ink/60">
          {site.footer.ctaBig}
        </span>
        <span className="mt-3 block text-5xl font-bold uppercase tracking-tight text-bright transition-colors duration-200 group-hover:text-ink sm:text-8xl">
          {site.footer.ctaAction}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-3"
          >
            {" "}
            ↗
          </span>
        </span>
      </a>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xl font-bold text-bright">
              {site.brand.slice(0, site.brand.lastIndexOf("."))}
              <span className="text-lime">{site.brand.slice(site.brand.lastIndexOf("."))}</span>
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed">{site.footer.description}</p>
          </div>

          <nav aria-label="Site haritası" className="flex flex-wrap gap-x-6 gap-y-2">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-xs uppercase tracking-widest transition-colors duration-150 hover:text-lime"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="font-mono text-xs">
            <a
              href={`mailto:${site.footer.email}`}
              className="block transition-colors duration-150 hover:text-lime"
            >
              {site.footer.email}
            </a>
            <a
              href={`tel:${site.footer.phone.replace(/\s/g, "")}`}
              className="mt-1 block transition-colors duration-150 hover:text-lime"
            >
              {site.footer.phone}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-widest">
          <p>© {new Date().getFullYear()} {site.brand} — şablon kullanılmamıştır.</p>
          <p>
            <IstanbulClock />
          </p>
        </div>
      </div>
    </footer>
  );
}
