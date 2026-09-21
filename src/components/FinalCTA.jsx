import React from "react";
import { Package, ClipboardList, BadgeCheck, BarChart3, ArrowRight } from "lucide-react";
import { usePackage } from "../context/PackageContext.jsx";

const flow = [
  { icon: Package, label: "Товар" },
  { icon: ClipboardList, label: "Заказ" },
  { icon: BadgeCheck, label: "Продажа" },
  { icon: BarChart3, label: "Аналитика" },
];

export default function FinalCTA() {
  const { selectPackage } = usePackage();

  return (
    <section className="relative py-28 lg:py-36 border-t border-ink-700 overflow-hidden bg-ink-950">
      <div className="absolute inset-0 opacity-[0.06] flex items-center justify-center gap-10 pointer-events-none select-none">
        {flow.map((f, i) => (
          <React.Fragment key={f.label}>
            <f.icon size={64} />
            {i < flow.length - 1 && <ArrowRight size={28} />}
          </React.Fragment>
        ))}
      </div>

      <div className="max-w-content mx-auto px-5 sm:px-8 relative text-center">
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl max-w-2xl mx-auto leading-tight">
          Выбери свой формат обучения и начни работать с Kaspi системно.
        </h2>
        <p className="text-paper-dim mt-5 max-w-md mx-auto">
          От самостоятельного изучения до индивидуального сопровождения.
        </p>
        <button
          onClick={() => selectPackage(null, true)}
          className="mt-9 rounded-full bg-signal px-8 py-4 text-sm font-semibold hover:bg-signal-dim transition-colors"
        >
          Выбрать тариф
        </button>
      </div>
    </section>
  );
}
