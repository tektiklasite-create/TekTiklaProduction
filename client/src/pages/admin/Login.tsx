import { useState, type FormEvent } from "react";
import { api, ApiError, setToken } from "../../lib/api";

interface LoginProps {
  onSuccess: () => void;
}

export default function Login({ onSuccess }: LoginProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    setLoading(true);
    setError("");
    try {
      const res = await api<{ token: string }>("/api/auth/login", {
        method: "POST",
        body: {
          username: data.get("username"),
          password: data.get("password"),
        },
      });
      setToken(res.token);
      onSuccess();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Bağlantı hatası");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-bright placeholder:text-body/60 transition-colors duration-150 focus:border-brand-400 focus:outline-none";

  return (
    <main className="flex min-h-dvh items-center justify-center px-4">
      <div className="anim-hero w-full max-w-sm rounded-xl border border-line bg-surface p-8">
        <p className="text-center text-lg font-bold text-bright">
          tektıkla<span className="text-lime">.site</span>{" "}
          <span className="font-normal text-body">Admin</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label htmlFor="admin-username" className="mb-1.5 block text-sm font-medium text-bright">
              Kullanıcı Adı
            </label>
            <input
              id="admin-username"
              name="username"
              required
              autoComplete="username"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-bright">
              Şifre
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={inputClass}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </main>
  );
}
