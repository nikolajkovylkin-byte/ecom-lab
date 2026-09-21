import React, { useEffect, useState } from "react";
import { Check, X, Clock, ShieldCheck } from "lucide-react";

const TOKEN_KEY = "ecomlab_admin_token";

function StatusBadge({ status }) {
  const map = {
    pending: { label: "На проверке", cls: "bg-signal/15 text-signal border-signal/40" },
    approved: { label: "Опубликован", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
    rejected: { label: "Отклонён", cls: "bg-ink-600 text-paper-faint border-ink-600" },
  };
  const s = map[status] || map.pending;
  return (
    <span className={`text-[11px] px-2 py-0.5 rounded-full border ${s.cls}`}>{s.label}</span>
  );
}

export default function AdminReviews() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || "");
  const [inputToken, setInputToken] = useState("");
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = async (t) => {
    setError("");
    try {
      const res = await fetch("/api/reviews-admin", {
        headers: { "x-admin-token": t },
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) setError("Неверный токен.");
        else setError(data?.error || "Ошибка загрузки.");
        setReviews(null);
        return;
      }
      setReviews(data.reviews || []);
    } catch {
      setError("Не удалось связаться с сервером.");
    }
  };

  useEffect(() => {
    if (token) load(token);
  }, [token]);

  const handleLogin = (e) => {
    e.preventDefault();
    sessionStorage.setItem(TOKEN_KEY, inputToken);
    setToken(inputToken);
  };

  const act = async (id, status) => {
    setBusyId(id);
    try {
      const res = await fetch("/api/reviews-moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      }
    } finally {
      setBusyId(null);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-ink-900 text-paper flex items-center justify-center px-5">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-ink-600 bg-ink-800 p-7"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={18} className="text-signal" />
            <h1 className="font-display font-bold text-lg">Модерация отзывов</h1>
          </div>
          <label className="text-xs text-paper-faint">Токен доступа</label>
          <input
            autoFocus
            type="password"
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            className="mt-1.5 w-full rounded-lg bg-ink-700 border border-ink-600 px-3.5 py-2.5 text-sm focus:border-signal outline-none"
            placeholder="ADMIN_TOKEN"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-signal py-3 text-sm font-semibold hover:bg-signal-dim transition-colors"
          >
            Войти
          </button>
        </form>
      </div>
    );
  }

  const pending = (reviews || []).filter((r) => r.status === "pending");
  const decided = (reviews || []).filter((r) => r.status !== "pending");

  return (
    <div className="min-h-screen bg-ink-900 text-paper">
      <div className="max-w-2xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-bold text-2xl">Модерация отзывов</h1>
          <button
            onClick={() => {
              sessionStorage.removeItem(TOKEN_KEY);
              setToken("");
              setReviews(null);
            }}
            className="text-xs text-paper-faint hover:text-paper"
          >
            Выйти
          </button>
        </div>

        {error && (
          <p className="text-sm text-signal mb-6 rounded-lg border border-signal/30 bg-signal/5 px-4 py-3">
            {error}
          </p>
        )}

        {reviews === null && !error && (
          <p className="text-sm text-paper-faint">Загружаем…</p>
        )}

        {reviews !== null && (
          <>
            <h2 className="font-display font-semibold text-sm text-paper-dim flex items-center gap-2 mb-3">
              <Clock size={14} className="text-signal" /> На проверке ({pending.length})
            </h2>

            {pending.length === 0 ? (
              <p className="text-sm text-paper-faint mb-8">Новых отзывов нет.</p>
            ) : (
              <div className="space-y-3 mb-10">
                {pending.map((r) => (
                  <div key={r.id} className="rounded-xl border border-ink-600 bg-ink-800 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{r.name}</p>
                      <StatusBadge status={r.status} />
                    </div>
                    <p className="text-sm text-paper-dim mt-2 leading-relaxed">{r.text}</p>
                    <div className="flex gap-2 mt-4">
                      <button
                        disabled={busyId === r.id}
                        onClick={() => act(r.id, "approved")}
                        className="flex-1 rounded-full bg-signal py-2 text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-40"
                      >
                        <Check size={13} /> Одобрить
                      </button>
                      <button
                        disabled={busyId === r.id}
                        onClick={() => act(r.id, "rejected")}
                        className="flex-1 rounded-full border border-ink-500 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-40"
                      >
                        <X size={13} /> Отклонить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {decided.length > 0 && (
              <>
                <h2 className="font-display font-semibold text-sm text-paper-dim mb-3">
                  Ранее рассмотренные
                </h2>
                <div className="space-y-2">
                  {decided.map((r) => (
                    <div
                      key={r.id}
                      className="rounded-lg border border-ink-700 bg-ink-800/50 p-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{r.name}</p>
                        <p className="text-xs text-paper-faint truncate">{r.text}</p>
                      </div>
                      <StatusBadge status={r.status} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
