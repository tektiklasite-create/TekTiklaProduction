import { Link } from "react-router-dom";
import { site } from "../content/site";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-mono text-[11px] uppercase tracking-widest text-lime">
        hata — sayfa bulunamadı
      </p>
      <h1 className="text-outline mt-6 text-[28vw] font-bold leading-none tracking-tight sm:text-[12rem]">
        404
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed sm:text-base">
        Bu sayfa yok. Ama senin siten olabilir — biz tam olarak bu işi yapıyoruz.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-bold uppercase text-ink transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
        >
          Ana sayfaya dön
          <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
            →
          </span>
        </Link>
        <a
          href={`mailto:${site.footer.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-bold uppercase text-bright transition-colors duration-150 hover:border-lime hover:text-lime"
        >
          Bize yaz
        </a>
      </div>
      <p className="mt-14 font-mono text-[11px] uppercase tracking-widest">
        {site.brand} — şablon yok, kayıp sayfa çok
      </p>
    </main>
  );
}
