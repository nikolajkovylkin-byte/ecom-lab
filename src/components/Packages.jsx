import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { packages } from "../data.js";
import { usePackage } from "../context/PackageContext.jsx";
import PackageDetailModal from "./PackageDetailModal.jsx";

export default function Packages() {
  const { selectPackage, selectedId } = usePackage();
  const [detailId, setDetailId] = useState(null);
  const detailPkg = packages.find((p) => p.id === detailId) || null;

  const openDetail = (id) => setDetailId(id);
  const closeDetail = () => setDetailId(null);
  const chooseFromModal = () => {
    if (detailId) selectPackage(detailId);
    closeDetail();
  };

  return (
    <section id="packages" className="py-24 lg:py-32 border-t border-ink-700 bg-ink-950">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <h2 className="font-display font-bold text-3xl sm:text-4xl max-w-lg">
          Выбери формат обучения
        </h2>
        <p className="text-paper-dim mt-3 max-w-md text-sm">
          5 вариантов — от базового курса до полного сопровождения и отдельного модуля по закупкам.
          Нажми на карточку, чтобы увидеть полную программу.
        </p>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {packages.map((p, i) => {
            const isSelected = selectedId === p.id;
            const isFeatured = Boolean(p.badge);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                onClick={() => openDetail(p.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openDetail(p.id);
                }}
                className={`relative rounded-2xl border p-6 flex flex-col transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 ${
                  isFeatured
                    ? "border-signal bg-ink-800"
                    : isSelected
                    ? "border-signal/70 bg-ink-800"
                    : "border-ink-600 bg-ink-800 hover:border-ink-500"
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-6 rounded-full bg-signal px-3 py-1 text-[10px] font-semibold tracking-wide">
                    🔥 {p.badge}
                  </span>
                )}

                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, di) => (
                    <span
                      key={di}
                      className={`h-1.5 w-4 rounded-full ${
                        di < p.level ? "bg-signal" : "bg-ink-600"
                      }`}
                    />
                  ))}
                </div>

                <h3 className="font-display font-bold text-xl mt-4">{p.name}</h3>
                <p className="text-sm text-paper-dim mt-2 min-h-[52px]">{p.tagline}</p>

                <div className="mt-3 flex items-baseline gap-2 flex-wrap">
                  {p.originalPrice && (
                    <span className="font-mono text-sm text-paper-faint line-through">
                      {p.originalPrice}
                    </span>
                  )}
                  <span className="font-mono text-xl font-semibold">{p.price}</span>
                </div>

                <ul className="mt-5 space-y-2.5 flex-1">
                  {p.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-paper-dim">
                      <Check size={15} className="text-signal mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openDetail(p.id);
                  }}
                  className={`mt-6 w-full rounded-full py-3 text-sm font-semibold transition-colors ${
                    isFeatured
                      ? "bg-signal hover:bg-signal-dim"
                      : "border border-ink-500 hover:border-signal hover:text-paper"
                  }`}
                >
                  {p.cta}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {detailPkg && (
          <PackageDetailModal
            pkg={detailPkg}
            onClose={closeDetail}
            onSelect={chooseFromModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
