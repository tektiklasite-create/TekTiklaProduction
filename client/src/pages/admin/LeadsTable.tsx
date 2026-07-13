import { Fragment, useState } from "react";
import { api } from "../../lib/api";
import type { Lead, LeadStatus } from "../../types";

interface LeadsTableProps {
  leads: Lead[];
  onChanged: () => void;
  onAuthError: (err: unknown) => void;
  compact?: boolean;
}

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Yeni",
  contacted: "Görüşüldü",
  won: "Kazanıldı",
  lost: "Kaybedildi",
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-brand-500/15 text-brand-400",
  contacted: "bg-amber-400/15 text-amber-400",
  won: "bg-emerald-400/15 text-emerald-400",
  lost: "bg-red-400/15 text-red-400",
};

export default function LeadsTable({ leads, onChanged, onAuthError, compact }: LeadsTableProps) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [busy, setBusy] = useState<number | null>(null);

  async function updateStatus(id: number, status: LeadStatus) {
    setBusy(id);
    try {
      await api(`/api/leads/${id}`, { method: "PATCH", body: { status }, auth: true });
      onChanged();
    } catch (err) {
      onAuthError(err);
    } finally {
      setBusy(null);
    }
  }

  async function remove(id: number) {
    if (!window.confirm("Bu talep kalıcı olarak silinecek. Emin misiniz?")) return;
    setBusy(id);
    try {
      await api(`/api/leads/${id}`, { method: "DELETE", auth: true });
      onChanged();
    } catch (err) {
      onAuthError(err);
    } finally {
      setBusy(null);
    }
  }

  if (leads.length === 0) {
    return (
      <p className="rounded-xl border border-line bg-surface px-5 py-8 text-center text-sm">
        Henüz talep yok. İletişim formundan gelen talepler burada listelenir.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-body">
            <th scope="col" className="px-4 py-3 font-semibold">Kişi</th>
            <th scope="col" className="px-4 py-3 font-semibold">Paket</th>
            <th scope="col" className="px-4 py-3 font-semibold">Tarih</th>
            <th scope="col" className="px-4 py-3 font-semibold">Durum</th>
            {!compact && <th scope="col" className="px-4 py-3 font-semibold">İşlem</th>}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <Fragment key={lead.id}>
              <tr
                className="cursor-pointer border-b border-line/50 transition-colors duration-150 hover:bg-surface-2"
                onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-bright">{lead.name}</p>
                  <p className="text-xs">{lead.email}</p>
                </td>
                <td className="px-4 py-3">{lead.package_name ?? "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date(lead.created_at + "Z").toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[lead.status]}`}
                  >
                    {STATUS_LABELS[lead.status]}
                  </span>
                </td>
                {!compact && (
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <label htmlFor={`status-${lead.id}`} className="sr-only">
                        Durum değiştir
                      </label>
                      <select
                        id={`status-${lead.id}`}
                        value={lead.status}
                        disabled={busy === lead.id}
                        onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                        className="rounded-md border border-line bg-surface-2 px-2 py-1.5 text-xs text-bright focus:border-brand-400 focus:outline-none"
                      >
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        disabled={busy === lead.id}
                        onClick={() => remove(lead.id)}
                        className="rounded-md border border-line px-2.5 py-1.5 text-xs text-body transition-colors duration-150 hover:border-red-400/50 hover:text-red-400"
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                )}
              </tr>
              {expanded === lead.id && (
                <tr className="border-b border-line/50 bg-surface-2/50">
                  <td colSpan={compact ? 4 : 5} className="px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-body">Mesaj</p>
                    <p className="mt-1 whitespace-pre-wrap text-bright">{lead.message}</p>
                    {lead.phone && (
                      <p className="mt-3 text-xs">
                        Telefon: <span className="text-bright">{lead.phone}</span>
                      </p>
                    )}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
