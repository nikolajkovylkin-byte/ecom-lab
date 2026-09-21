import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, MessageSquareText } from "lucide-react";

// Сколько отзывов показывать на странице до нажатия «Посмотреть все».
// 4 = две ровные строки на десктопе. Меняй это число, если захочешь больше/меньше.
const PREVIEW_COUNT = 4;

function formatDate(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
  } catch {
    return "";
  }
}

// 1 отзыв / 2 отзыва / 5 отзывов
function plural(n, one, few, many) {
  const d = n % 10;
  const h = n % 100;
  if (d === 1 && h !== 11) return one;
  if (d >= 2 && d <= 4 && (h < 10 || h >= 20)) return few;
  return many;
}

// Реальные отзывы, которые ученики присылали в WhatsApp до запуска этого сайта —
// не выдуманы, добавлены напрямую владельцем курса.
const seedReviews = [
  {
    name: "Алина",
    text: "До курса многое делала наугад, особенно с карточками товаров и продвижением. Здесь всё объясняют пошагово и простым языком. После обучения смогла привести свой магазин в порядок и систематизировать работу.",
  },
  {
    name: "Данияр",
    text: "Понравилось, что обучение не только про теорию. Много практических советов именно для продавцов на Kaspi. После курса стало намного понятнее, как анализировать товары, работать с магазином и увеличивать продажи.",
  },
  {
    name: "Айдос",
    text: "Курс помог разобраться, как правильно работать с магазином на Kaspi. Особенно полезными были практические уроки по оформлению товаров, продвижению и работе с заказами. Теперь гораздо лучше понимаю, что и зачем делаю.",
  },
];

function ReviewCard({ review, clamped = false }) {
  const initial = (review.name || "?").trim().charAt(0).toUpperCase();
  const date = formatDate(review.time);

  return (
    <article className="rounded-2xl border border-ink-600 bg-ink-800 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 shrink-0 rounded-full bg-signal/15 border border-signal/40 flex items-center justify-center font-display font-bold text-signal text-sm">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{review.name}</p>
          {date && <p className="text-[11px] text-paper-faint">{date}</p>}
        </div>
      </div>
      <p
        className={`mt-4 text-sm text-paper-dim leading-relaxed ${
          clamped ? "line-clamp-6" : ""
        }`}
      >
        {review.text}
      </p>
    </article>
  );
}

function AllReviewsModal({ reviews, onClose, onWriteReview }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[65] bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Все отзывы учеников"
        className="w-full sm:w-[94vw] sm:max-w-3xl max-h-[92vh] sm:max-h-[85vh] bg-ink-900 border border-ink-600 sm:rounded-2xl rounded-t-2xl flex flex-col overflow-hidden"
      >
        <div className="px-5 sm:px-6 py-5 border-b border-ink-600 flex items-center justify-between gap-4 shrink-0">
          <div>
            <h3 className="font-display font-bold text-xl">Все отзывы</h3>
            <p className="text-xs text-paper-faint mt-0.5 tabular">
              {reviews.length} {plural(reviews.length, "отзыв", "отзыва", "отзывов")}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="shrink-0 w-9 h-9 rounded-full border border-ink-600 flex items-center justify-center text-paper-faint hover:text-paper hover:border-ink-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 sm:px-6 py-5 overflow-y-auto flex-1">
          <div className="grid gap-4 sm:grid-cols-2 items-start">
            {reviews.map((r, i) => (
              <ReviewCard key={r.id || `seed-${i}`} review={r} />
            ))}
          </div>
        </div>

        <div className="px-5 sm:px-6 py-4 border-t border-ink-600 shrink-0 flex justify-center">
          <button
            onClick={onWriteReview}
            className="rounded-full border border-ink-500 hover:border-signal px-6 py-2.5 text-sm font-semibold transition-colors"
          >
            Оставить отзыв
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
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
      className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="w-full sm:max-w-md bg-ink-800 border border-ink-600 sm:rounded-2xl rounded-t-2xl p-6 sm:p-8"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl">
            {submitted ? "Спасибо за отзыв!" : "Оставить отзыв"}
          </h3>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="text-paper-faint hover:text-paper"
          >
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
  const [allOpen, setAllOpen] = useState(false);
  const [fetchedReviews, setFetchedReviews] = useState([]);

  useEffect(() => {
    let alive = true;
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        if (alive) setFetchedReviews(Array.isArray(data.reviews) ? data.reviews : []);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // Esc закрывает верхнее окно, и пока открыто любое из них — страница под ним не скроллится.
  useEffect(() => {
    if (!formOpen && !allOpen) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (formOpen) setFormOpen(false);
      else setAllOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [formOpen, allOpen]);

  // /api/reviews отдаёт одобренные отзывы от свежих к старым — свежие идут первыми,
  // за ними три отзыва из WhatsApp. Поменяй порядок слагаемых, если хочешь наоборот.
  const allReviews = [...fetchedReviews, ...seedReviews];
  const total = allReviews.length;
  const preview = allReviews.slice(0, PREVIEW_COUNT);
  const hasMore = total > PREVIEW_COUNT;

  return (
    <section id="reviews" className="py-24 lg:py-32 border-t border-ink-700 bg-ink-950">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <span className="font-mono text-xs text-signal tracking-wider">ОТЗЫВЫ</span>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h2 className="font-display font-bold text-3xl sm:text-4xl max-w-lg">
            Что говорят ученики
          </h2>
          {total > 0 && (
            <p className="text-sm text-paper-faint tabular">
              {total} {plural(total, "отзыв", "отзыва", "отзывов")}
            </p>
          )}
        </div>

        {total === 0 ? (
          <div className="mt-12 rounded-2xl border border-ink-600 bg-ink-800 flex flex-col items-center text-center px-6 py-14">
            <MessageSquareText size={22} className="text-paper-faint" />
            <p className="text-sm text-paper-faint mt-3 max-w-[260px]">
              Пока нет ни одного отзыва — стань первым, кто оставит его.
            </p>
            <button
              onClick={() => setFormOpen(true)}
              className="mt-6 rounded-full border border-ink-500 hover:border-signal px-6 py-3 text-sm font-semibold transition-colors"
            >
              Оставить отзыв
            </button>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 items-start">
              {preview.map((r, i) => (
                <ReviewCard key={r.id || `seed-${i}`} review={r} clamped />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {hasMore && (
                <button
                  onClick={() => setAllOpen(true)}
                  className="rounded-full border border-ink-500 hover:border-signal px-6 py-3 text-sm font-semibold transition-colors"
                >
                  Посмотреть все {total} {plural(total, "отзыв", "отзыва", "отзывов")}
                </button>
              )}
              <button
                onClick={() => setFormOpen(true)}
                className="rounded-full border border-ink-500 hover:border-signal hover:text-paper px-6 py-3 text-sm font-semibold transition-colors"
              >
                Оставить отзыв
              </button>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {allOpen && (
          <AllReviewsModal
            reviews={allReviews}
            onClose={() => setAllOpen(false)}
            onWriteReview={() => {
              setAllOpen(false);
              setFormOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {formOpen && <ReviewForm onClose={() => setFormOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
