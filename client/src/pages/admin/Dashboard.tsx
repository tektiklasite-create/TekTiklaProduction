import { useCallback, useEffect, useState } from "react";
import { api, ApiError, clearToken } from "../../lib/api";
import type { Lead, LeadStats, Package } from "../../types";
import LeadsTable from "./LeadsTable";
import PackagesEditor from "./PackagesEditor";

interface DashboardProps {
  onLogout: () => void;
}

type Tab = "overview" | "leads" | "packages";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Genel Bakış" },
  { id: "leads", label: "Talepler" },
  { id: "packages", label: "Paketler" },
];

export default function Dashboard({ onLogout }: DashboardProps) {
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [error, setError] = useState("");

  const handleAuthError = useCallback(
    (err: unknown) => {
      if (err instanceof ApiError && err.status === 401) {
        clearToken();
        onLogout();
        return;
      }
      setError(err instanceof ApiError ? err.message : "Bağlantı hatası");
    },
    [onLogout]
  );

  const refresh = useCallback(async () => {
    setError("");
    try {
      const [statsRes, leadsRes, packagesRes] = await Promise.all([
        api<LeadStats>("/api/leads/stats/summary", { auth: true }),
        api<Lead[]>("/api/leads", { auth: true }),
        api<Package[]>("/api/packages"),
      ]);
      setStats(statsRes);
      setLeads(leadsRes);
      setPackages(packagesRes);
    } catch (err) {
      handleAuthError(err);
    }
  }, [handleAuthError]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function logout() {
    clearToken();
    onLogout();
  }

  const statCards = stats
    ? [
        { label: "Toplam Talep", value: stats.total },
        { label: "Son 7 Gün", value: stats.last7 },
        { label: "Yeni", value: stats.new },
        { label: "Kazanılan", value: stats.won },
      ]
    : [];

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <p className="text-lg font-bold text-bright">
            tektıkla<span className="text-lime">.site</span>{" "}
            <span className="text-sm font-normal text-body">Admin</span>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-sm text-body transition-colors duration-150 hover:text-bright"
            >
              Siteyi Gör
            </a>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-bright transition-colors duration-150 hover:border-red-400/50 hover:text-red-400"
            >
              Çıkış
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <nav aria-label="Panel sekmeleri" className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-current={tab === t.id ? "page" : undefined}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                tab === t.id
                  ? "bg-brand-500 text-white"
                  : "border border-line bg-surface text-body hover:text-bright"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {error && (
          <p role="alert" className="mt-6 rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {tab === "overview" && (
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {statCards.map((card) => (
                <div key={card.label} className="rounded-xl border border-line bg-surface p-5">
                  <p className="text-sm">{card.label}</p>
                  <p className="mt-1 text-3xl font-bold text-bright">{card.value}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-lg font-semibold text-bright">Son Talepler</h2>
            <div className="mt-4">
              <LeadsTable
                leads={leads.slice(0, 5)}
                onChanged={refresh}
                onAuthError={handleAuthError}
                compact
              />
            </div>
          </div>
        )}

        {tab === "leads" && (
          <div className="mt-8">
            <LeadsTable leads={leads} onChanged={refresh} onAuthError={handleAuthError} />
          </div>
        )}

        {tab === "packages" && (
          <div className="mt-8">
            <PackagesEditor packages={packages} onChanged={refresh} onAuthError={handleAuthError} />
          </div>
        )}
      </main>
    </div>
  );
}
