import { useState, type FormEvent } from "react";
import { api } from "../../lib/api";
import type { Package } from "../../types";

interface PackagesEditorProps {
  packages: Package[];
  onChanged: () => void;
  onAuthError: (err: unknown) => void;
}

export default function PackagesEditor({ packages, onChanged, onAuthError }: PackagesEditorProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {packages.map((pkg) => (
        <PackageForm key={pkg.id} pkg={pkg} onChanged={onChanged} onAuthError={onAuthError} />
      ))}
    </div>
  );
}

function PackageForm({
  pkg,
  onChanged,
  onAuthError,
}: {
  pkg: Package;
  onChanged: () => void;
  onAuthError: (err: unknown) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const features = String(data.get("features") ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    // TL girilir, API kuruş bekler; boş = online ödeme kapalı
    const priceAmountTL = String(data.get("priceAmount") ?? "").trim();

    setSaving(true);
    setSaved(false);
    try {
      await api(`/api/packages/${pkg.id}`, {
        method: "PUT",
        auth: true,
        body: {
          name: data.get("name"),
          price: data.get("price"),
          period: data.get("period"),
          badge: String(data.get("badge") ?? "").trim() || null,
          features,
          highlighted: data.get("highlighted") === "on",
          priceAmount: priceAmountTL ? Math.round(Number(priceAmountTL) * 100) : null,
        },
      });
      setSaved(true);
      onChanged();
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      onAuthError(err);
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm text-bright transition-colors duration-150 focus:border-brand-400 focus:outline-none";
  const labelClass = "mb-1 block text-xs font-semibold uppercase tracking-wide text-body";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-5"
    >
      <div>
        <label htmlFor={`pkg-name-${pkg.id}`} className={labelClass}>
          Paket Adı
        </label>
        <input
          id={`pkg-name-${pkg.id}`}
          name="name"
          defaultValue={pkg.name}
          required
          maxLength={60}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`pkg-price-${pkg.id}`} className={labelClass}>
            Fiyat
          </label>
          <input
            id={`pkg-price-${pkg.id}`}
            name="price"
            defaultValue={pkg.price}
            required
            maxLength={30}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`pkg-period-${pkg.id}`} className={labelClass}>
            Dönem
          </label>
          <input
            id={`pkg-period-${pkg.id}`}
            name="period"
            defaultValue={pkg.period}
            required
            maxLength={40}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`pkg-price-amount-${pkg.id}`} className={labelClass}>
          Online ödeme fiyatı ₺ (boş = kartla ödeme kapalı)
        </label>
        <input
          id={`pkg-price-amount-${pkg.id}`}
          name="priceAmount"
          type="number"
          min={1}
          step="0.01"
          defaultValue={pkg.priceAmount != null ? pkg.priceAmount / 100 : ""}
          placeholder="örn: 14900"
          className={inputClass}
        />
        <p className="mt-1 text-xs text-body">Müşteriden Stripe ile bu tutarın %50'si tahsil edilir.</p>
      </div>

      <div>
        <label htmlFor={`pkg-badge-${pkg.id}`} className={labelClass}>
          Rozet (boş bırakılabilir)
        </label>
        <input
          id={`pkg-badge-${pkg.id}`}
          name="badge"
          defaultValue={pkg.badge ?? ""}
          maxLength={30}
          placeholder="örn: En Popüler"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`pkg-features-${pkg.id}`} className={labelClass}>
          Özellikler (her satır bir madde)
        </label>
        <textarea
          id={`pkg-features-${pkg.id}`}
          name="features"
          defaultValue={pkg.features.join("\n")}
          required
          rows={7}
          className={`${inputClass} resize-y`}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-bright">
        <input
          type="checkbox"
          name="highlighted"
          defaultChecked={pkg.highlighted}
          className="h-4 w-4 accent-brand-500"
        />
        Öne çıkan paket
      </label>

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Kaydediliyor..." : saved ? "Kaydedildi ✓" : "Kaydet"}
      </button>
    </form>
  );
}
