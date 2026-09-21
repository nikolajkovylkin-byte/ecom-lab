import React from "react";
import { User } from "lucide-react";

const stats = [
  { value: "[X лет опыта]", label: "в продажах на Kaspi" },
  { value: "[X товаров]", label: "запущено в работу" },
  { value: "[X учеников]", label: "прошли обучение" },
  { value: "[X проектов]", label: "реализовано" },
];

export default function Author() {
  return (
    <section className="py-24 lg:py-32 border-t border-ink-700 bg-ink-950">
      <div className="max-w-content mx-auto px-5 sm:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
        <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-ink-800 border border-ink-600 flex items-center justify-center">
          <User size={48} className="text-paper-faint" />
        </div>

        <div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl">[ИМЯ]</h2>
          <p className="text-paper-dim mt-2 max-w-md">
            «Практик в сфере продаж на Kaspi.»
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
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
