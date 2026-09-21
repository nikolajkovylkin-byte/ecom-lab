import React from "react";

const stats = [
  { value: "4 года", label: "в продажах на Kaspi" },
  { value: "5 000 товаров", label: "запущено в работу" },
  { value: "10 учеников", label: "прошли обучение" },
];

export default function Author() {
  return (
    <section className="py-24 lg:py-32 border-t border-ink-700 bg-ink-950">
      <div className="max-w-content mx-auto px-5 sm:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
        <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border border-ink-600">
          <img
            src="/products/author.jpg"
            alt="Владислав — автор курса"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl">Владислав</h2>
          <p className="text-paper-dim mt-2 max-w-md">
            «Практик в сфере продаж на Kaspi.»
          </p>

          <div className="mt-8 grid grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-mono text-sm font-semibold text-signal">{s.value}</p>
                <p className="text-xs text-paper-faint mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
