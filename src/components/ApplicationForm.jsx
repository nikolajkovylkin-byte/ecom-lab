import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { packages } from "../data.js";
import { usePackage } from "../context/PackageContext.jsx";

// Куда уходит заявка:
// 1) если задан VITE_FORMSPREE_ENDPOINT (.env) — форма уходит в Formspree, без бэкенда;
// 2) иначе — POST на /api/submit-application (serverless-функция, см. /api и README),
//    она пересылает заявку в Telegram-бот.
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "";
const FALLBACK_ENDPOINT = "/api/submit-application";

export default function ApplicationForm() {
  const { formOpen, closeForm, selected, selectedId, selectPackage, customRequest } =
    usePackage();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const close = () => {
    closeForm();
    setTimeout(() => {
      setSubmitted(false);
      setError("");
    }, 300);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);

    const payload = {
      name,
      phone,
      whatsapp,
      package: customRequest?.name || selected?.name || "",
      price: customRequest?.price || selected?.price || "",
    };

    const endpoint = FORMSPREE_ENDPOINT || FALLBACK_ENDPOINT;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setSubmitted(true);
    } catch (err) {
      setError(
        "Не получилось отправить заявку. Проверь подключение endpoint'а (см. README) и попробуй ещё раз."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {formOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={close}
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
                {submitted
                  ? "Заявка отправлена"
                  : customRequest
                  ? `Заявка: ${customRequest.name}`
                  : "Оставить заявку на обучение"}
              </h3>
              <button onClick={close} className="text-paper-faint hover:text-paper">
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <div className="mt-8 flex flex-col items-center text-center py-4">
                <CheckCircle2 size={38} className="text-signal" />
                <p className="mt-4 text-sm text-paper-dim max-w-xs">
                  Спасибо! Мы свяжемся с тобой в ближайшее время, чтобы подтвердить{" "}
                  {customRequest ? customRequest.name.toLowerCase() : `пакет ${selected?.name || ""}`} и
                  рассказать о следующих шагах.
                </p>
                <button
                  onClick={close}
                  className="mt-6 rounded-full border border-ink-500 px-6 py-2.5 text-sm font-medium"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-4">
                {customRequest ? (
                  <div className="flex items-center justify-between rounded-lg bg-ink-700/60 border border-ink-600 px-3.5 py-2.5 text-sm">
                    <span className="text-paper-dim">{customRequest.name}</span>
                    <span className="font-mono font-semibold">{customRequest.price}</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="text-xs text-paper-faint">Выбранный пакет</label>
                      <select
                        value={selectedId || ""}
                        onChange={(e) => selectPackage(e.target.value, false)}
                        className="mt-1.5 w-full rounded-lg bg-ink-700 border border-ink-600 px-3.5 py-2.5 text-sm focus:border-signal outline-none"
                      >
                        <option value="" disabled>
                          Выбери пакет
                        </option>
                        {packages.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} — {p.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selected && (
                      <div className="flex items-center justify-between rounded-lg bg-ink-700/60 border border-ink-600 px-3.5 py-2.5 text-sm">
                        <span className="text-paper-dim">Стоимость</span>
                        <span className="font-mono font-semibold">{selected.price}</span>
                      </div>
                    )}
                  </>
                )}

                <div>
                  <label className="text-xs text-paper-faint">Имя</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-lg bg-ink-700 border border-ink-600 px-3.5 py-2.5 text-sm focus:border-signal outline-none"
                    placeholder="Как к тебе обращаться"
                  />
                </div>

                <div>
                  <label className="text-xs text-paper-faint">Телефон</label>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 w-full rounded-lg bg-ink-700 border border-ink-600 px-3.5 py-2.5 text-sm focus:border-signal outline-none"
                    placeholder="+7 ___ ___ __ __"
                  />
                </div>

                <div>
                  <label className="text-xs text-paper-faint">WhatsApp</label>
                  <input
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="mt-1.5 w-full rounded-lg bg-ink-700 border border-ink-600 px-3.5 py-2.5 text-sm focus:border-signal outline-none"
                    placeholder="Если отличается от телефона"
                  />
                </div>

                {error && (
                  <p className="text-xs text-signal leading-relaxed">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={(!selectedId && !customRequest) || sending}
                  className="w-full rounded-full bg-signal py-3.5 text-sm font-semibold hover:bg-signal-dim transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {sending ? "Отправляем…" : "Отправить заявку"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
