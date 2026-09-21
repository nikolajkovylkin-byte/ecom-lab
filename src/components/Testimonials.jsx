import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, MessageSquareText } from "lucide-react";

function timeAgo(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
  } catch {
    return "";
  }
}

function ReviewForm({ onClose }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "request failed");
      setSubmitted(true);
    } catch {
      setError(
        "Не получилось отправить. Проверь, что подключено хранилище отзывов (см. README) и попробуй ещё раз."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md bg-ink-800 border border-ink-600 sm:rounded-2xl rounded-t-2xl p-6 sm:p-8"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl">
            {submitted ? "Спасибо за отзыв!" : "Оставить отзыв"}
          </h3>
          <button onClick={onClose} className="text-paper-faint hover:text-paper">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="mt-8 flex flex-col items-center text-center py-4">
            <CheckCircle2 size={38} className="text-signal" />
            <p className="mt-4 text-sm text-paper-dim max-w-xs">
              Отзыв отправлен на проверку — появится на сайте после одобрения.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full border border-ink-500 px-6 py-2.5 text-sm font-medium"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs text-paper-faint">Имя</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-lg bg-ink-700 border border-ink-600 px-3.5 py-2.5 text-sm focus:border-signal outline-none"
                placeholder="Как подписать отзыв"
              />
            </div>
            <div>
              <label className="text-xs text-paper-faint">Отзыв</label>
              <textarea
                required
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-1.5 w-full rounded-lg bg-ink-700 border border-ink-600 px-3.5 py-2.5 text-sm focus:border-signal outline-none resize-none"
                placeholder="Что было полезно, что изменилось в работе с магазином"
              />
            </div>
            {error && <p className="text-xs text-signal leading-relaxed">{error}</p>}
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-signal py-3.5 text-sm font-semibold hover:bg-signal-dim transition-colors disabled:opacity-40"
            >
              {sending ? "Отправляем…" : "Отправить на проверку"}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [formOpen, setFormOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => setReviews(data.reviews || []))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  return (
    <section id="reviews" className="py-24 lg:py-32 border-t border-ink-700 bg-ink-950">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <span className="font-mono text-xs text-signal tracking-wider">ОТЗЫВЫ</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl mt-2 max-w-lg">
          Что говорят ученики
        </h2>

        <div className="mt-12 max-w-lg mx-auto rounded-2xl border border-ink-600 bg-ink-800 overflow-hidden shadow-2xl shadow-black/30">
          <div className="px-5 py-4 border-b border-ink-600 flex items-center gap-3 bg-ink-900/40">
            <div className="w-9 h-9 rounded-full bg-signal/15 border border-signal/40 flex items-center justify-center font-display font-bold text-signal text-sm">
              EL
            </div>
            <div>
              <p className="text-sm font-semibold">Отзывы учеников</p>
              <p className="text-xs text-paper-faint">
                {reviews.length > 0 ? `${reviews.length} отзывов` : "переписка с потока"}
              </p>
            </div>
          </div>

          <div className="p-5 space-y-3 bg-ink-950/40 min-h-[140px]">
            {!loaded ? (
              <p className="text-sm text-paper-faint text-center py-6">Загружаем отзывы…</p>
            ) : reviews.length === 0 ? (
              <div className="flex flex-col items-center text-center py-8">
                <MessageSquareText size={22} className="text-paper-faint" />
                <p className="text-sm text-paper-faint mt-3 max-w-[240px]">
                  Пока нет ни одного отзыва — стань первым, кто оставит его.
                </p>
              </div>
            ) : (
              reviews.map((m, i) => (
                <div key={i} className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm bg-ink-700 text-paper">
                    <p className="text-xs font-semibold text-signal mb-1">{m.name}</p>
                    <p className="leading-relaxed">{m.text}</p>
                    <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-paper-faint">
                      {timeAgo(m.time)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setFormOpen(true)}
            className="rounded-full border border-ink-500 hover:border-signal hover:text-paper px-6 py-3 text-sm font-semibold transition-colors"
          >
            Оставить отзыв
          </button>
        </div>
      </div>

      <AnimatePresence>
        {formOpen && (
          <ReviewForm onClose={() => setFormOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
