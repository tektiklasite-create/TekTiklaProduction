import { useEffect, useState } from "react";
import { site } from "../content/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || menuOpen
          ? "border-b border-line bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="text-lg font-bold tracking-tight text-bright">
          {site.brand.slice(0, site.brand.lastIndexOf("."))}
          <span className="text-lime">{site.brand.slice(site.brand.lastIndexOf("."))}</span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {site.nav.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-mono text-xs uppercase tracking-widest text-body transition-colors duration-150 hover:text-lime"
              >
                <span aria-hidden="true" className="text-lime">
                  {String(i + 1).padStart(2, "0")}.
                </span>{" "}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#iletisim"
          className="hidden rounded-full bg-lime px-5 py-2 text-xs font-bold uppercase text-ink transition-transform duration-150 hover:scale-[1.04] active:scale-[0.98] md:block"
        >
          Teklif al →
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="p-2 text-bright md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-line bg-ink/95 px-4 pb-5 backdrop-blur-md md:hidden">
          <ul className="flex flex-col pt-2">
            {site.nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-line/50 px-1 py-3.5 font-mono text-sm uppercase tracking-widest text-body hover:text-lime"
                >
                  <span aria-hidden="true" className="text-lime">
                    {String(i + 1).padStart(2, "0")}.
                  </span>{" "}
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#iletisim"
                onClick={() => setMenuOpen(false)}
                className="block rounded-full bg-lime px-3 py-3 text-center text-sm font-bold uppercase text-ink"
              >
                Teklif al →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
