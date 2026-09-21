import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Check, Target } from "lucide-react";

export default function PackageDetailModal({ pkg, onClose, onSelect }) {
  // Esc to close + lock page scroll while open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!pkg) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:w-[94vw] sm:max-w-xl max-h-[92vh] sm:max-h-[85vh] bg-ink-800 border border-ink-600 sm:rounded-2xl rounded-t-2xl flex flex-col overflow-hidden"
      >
        {/* header */}
        <div className="px-6 py-5 border-b border-ink-600 flex items-start justify-between gap-4 shrink-0">
          <div>
            {pkg.badge && (
              <span className="inline-flex items-center gap-1 rounded-full bg-signal px-2.5 py-1 text-[10px] font-semibold tracking-wide mb-2">
                🔥 {pkg.badge}
              </span>
            )}
            <h2 className="font-display font-bold text-2xl">{pkg.name}</h2>
            <p className="text-sm text-paper-dim mt-1.5 max-w-md">{pkg.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="shrink-0 w-9 h-9 rounded-full border border-ink-600 flex items-center justify-center text-paper-faint hover:text-paper hover:border-ink-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* scrollable body */}
        <div className="px-6 py-5 overflow-y-auto flex-1">
          {pkg.whoFor && (
            <div className="rounded-xl border border-signal/30 bg-signal/5 px-4 py-3.5 flex gap-3">
              <Target size={16} className="text-signal shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-signal mb-1">Кому подходит</p>
                <p className="text-sm text-paper-dim leading-relaxed">{pkg.whoFor}</p>
              </div>
            </div>
          )}

          <p className="font-mono text-xs text-signal tracking-wider mt-6 mb-3">
            📚 ПРОГРАММА ОБУЧЕНИЯ
          </p>
          <div className="space-y-5">
            {pkg.program?.map((module, i) => (
              <div key={module.title}>
                <p className="text-sm font-semibold">
                  {i + 1}. {module.title}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {module.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-paper-dim"
                    >
                      <span className="w-1 h-1 rounded-full bg-ink-500 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="font-mono text-xs text-signal tracking-wider mt-7 mb-3">
            ВЫ ПОЛУЧИТЕ
          </p>
          <ul className="space-y-2">
            {pkg.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-paper-dim">
                <Check size={15} className="text-signal mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* sticky footer CTA */}
        <div className="px-6 py-5 border-t border-ink-600 shrink-0 flex items-center justify-between gap-4 bg-ink-800">
          <div>
            <p className="text-[11px] text-paper-faint">Стоимость</p>
            <p className="font-mono text-xl font-bold">{pkg.price}</p>
          </div>
          <button
            onClick={onSelect}
            className="rounded-full bg-signal px-7 py-3 text-sm font-semibold hover:bg-signal-dim transition-colors"
          >
            {pkg.cta}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
