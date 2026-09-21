import React from "react";
import { motion } from "framer-motion";
import { Search, ClipboardList, BadgeCheck, Rocket, ArrowRight } from "lucide-react";
import { usePackage } from "../context/PackageContext.jsx";

const steps = [
  {
    n: "01",
    icon: Search,
    title: "Выберите курс",
    desc: "Посмотрите программы обучения и выберите курс, который подходит именно вам.",
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Оставьте заявку",
    desc: "Нажмите кнопку «Записаться на курс» и заполните короткую форму.",
  },
  {
    n: "03",
    icon: BadgeCheck,
    title: "Получите подтверждение",
    desc: "Мы свяжемся с вами, ответим на вопросы и расскажем о дальнейших шагах.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Начните обучение",
    desc: "После подтверждения вы получите всю необходимую информацию и сможете приступить к обучению.",
  },
];

export default function HowToEnroll() {
  // Форма заявки на сайте — это модальное окно, которое открывается через
  // PackageContext (так же, как у кнопок «Выбрать тариф» в Header и FinalCTA).
  const { selectPackage } = usePackage();

  return (
    <section id="how-to-enroll" className="py-24 lg:py-32 border-t border-ink-700">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <h2 className="font-display font-bold text-3xl sm:text-4xl max-w-xl">
          Как записаться на курс?
        </h2>
        <p className="text-paper-dim mt-4 max-w-md">
          Всего несколько простых шагов — и вы сможете начать обучение.
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl border border-ink-600 bg-ink-800/70 backdrop-blur-sm p-6 hover:border-ink-500 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-black/30 transition-transform duration-300 group-hover:scale-105"
                    style={{ background: "linear-gradient(145deg, #E23B34, #8C2622)" }}
                  >
                    <Icon size={20} className="text-paper" />
                  </div>
                  <span className="font-display font-extrabold text-5xl leading-none text-signal tabular">
                    {step.n}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-xl mt-6">{step.title}</h3>
                <p className="text-sm text-paper-dim mt-2 leading-relaxed">{step.desc}</p>

                {!isLast && (
                  <>
                    {/* connector: desktop — горизонтальная линия в зазоре между карточками */}
                    <span
                      aria-hidden="true"
                      className="hidden lg:block absolute top-12 -right-6 w-6 border-t border-dashed border-signal/60"
                    />
                    {/* connector: mobile — вертикальная линия между карточками */}
                    <span
                      aria-hidden="true"
                      className="sm:hidden receipt-line absolute top-full left-12 h-4"
                    />
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => selectPackage(null, true)}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[52px] rounded-full bg-signal px-8 py-4 text-sm font-semibold hover:bg-signal-dim transition-colors"
          >
            Записаться на курс
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
