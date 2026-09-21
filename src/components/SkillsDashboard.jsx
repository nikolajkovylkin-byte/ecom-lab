import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  Star,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Clock,
  BarChart3,
  ShoppingBag,
  Percent,
} from "lucide-react";

const PRODUCT_IMG = "/products/jeans-main.jpg";

function Counter({ to, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular">
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-block rounded-full border border-signal/40 text-signal px-2.5 py-1 text-[10px] font-mono tracking-wide">
      {children}
    </span>
  );
}

export default function SkillsDashboard() {
  return (
    <section className="py-24 lg:py-32 border-t border-ink-700 bg-ink-950">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <span className="font-mono text-xs text-signal tracking-wider">ТОВАРЫ</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl mt-2 max-w-xl">
          От товара до продажи
        </h2>
        <p className="text-paper-dim mt-3 max-w-md text-sm">
          Один и тот же товар проходит через четыре состояния — этому и учит курс.
        </p>

        <div className="mt-14 grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
          {/* PRODUCT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-ink-600 bg-ink-800 p-5 flex flex-col min-h-[260px]"
          >
            <Tag>ТОВАР</Tag>
            <div className="mt-3 aspect-[4/3] rounded-lg overflow-hidden border border-ink-600">
              <img
                src={PRODUCT_IMG}
                alt="Товар"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-sm font-semibold">Джинсы карго оверсайз</p>
            <p className="text-xs text-paper-faint mt-0.5">Свободный крой, с ремнём</p>
            <div className="mt-auto pt-3 flex items-center justify-between">
              <span className="text-base font-mono font-bold">15 990 ₸</span>
              <span className="w-7 h-7 rounded-full border border-ink-600 flex items-center justify-center">
                <ArrowRight size={13} />
              </span>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center justify-center">
            <ChevronRight size={18} className="text-ink-600" />
          </div>

          {/* CARD */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-ink-600 bg-ink-800 p-5 flex flex-col min-h-[260px]"
          >
            <Tag>КАРТОЧКА</Tag>
            <div className="mt-4">
              <p className="text-sm font-semibold">Джинсы карго оверсайз</p>
              <p className="text-xs text-paper-faint mt-1">
                Свободный крой, с ремнём в комплекте
              </p>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className={i < 4 ? "fill-signal text-signal" : "text-ink-600"} />
              ))}
              <span className="text-[11px] text-paper-faint ml-1">4.6 (124)</span>
            </div>
            <div className="mt-auto pt-4 space-y-2 text-xs text-paper-dim">
              <div className="flex items-center gap-2">
                <ShieldCheck size={13} className="text-signal" /> Гарантия 6 месяцев
              </div>
              <div className="flex items-center gap-2">
                <Truck size={13} className="text-signal" /> Быстрая доставка
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={13} className="text-signal" /> Лёгкий возврат
              </div>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center justify-center">
            <ChevronRight size={18} className="text-ink-600" />
          </div>

          {/* ORDER */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border border-ink-600 bg-ink-800 p-5 flex flex-col min-h-[260px]"
          >
            <Tag>ЗАКАЗ</Tag>
            <p className="mt-3 text-sm font-semibold">Новый заказ</p>
            <div className="mt-2 flex items-center justify-between text-sm text-paper-dim">
              <span>Товар × 1</span>
              <span className="font-mono text-paper">15 990 ₸</span>
            </div>
            <div className="mt-4 rounded-lg bg-signal py-2.5 text-center text-xs font-semibold">
              Ожидает подтверждения
            </div>
            <div className="mt-auto pt-4 border-t border-ink-700 flex items-center gap-2 text-xs text-paper-faint">
              <Clock size={13} />
              Статус обновляется в реальном времени
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center justify-center">
            <ChevronRight size={18} className="text-ink-600" />
          </div>

          {/* ANALYTICS */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-2xl border border-ink-600 bg-ink-800 p-5 flex flex-col min-h-[260px] justify-center"
          >
            <Tag>АНАЛИТИКА</Tag>
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-paper-dim">
                  <BarChart3 size={14} className="text-signal" /> Заказы
                </span>
                <span className="text-right">
                  <span className="block font-mono text-base font-semibold">
                    <Counter to={128} />
                  </span>
                  <span className="text-[10px] text-emerald-400">↑ +12%</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-paper-dim">
                  <ShoppingBag size={14} className="text-signal" /> Продажи
                </span>
                <span className="text-right">
                  <span className="block font-mono text-base font-semibold">
                    <Counter to={3.2} decimals={1} suffix=" млн ₸" />
                  </span>
                  <span className="text-[10px] text-emerald-400">↑ +18%</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-paper-dim">
                  <Percent size={14} className="text-signal" /> Конверсия
                </span>
                <span className="text-right">
                  <span className="block font-mono text-base font-semibold">
                    <Counter to={6.4} decimals={1} suffix="%" />
                  </span>
                  <span className="text-[10px] text-emerald-400">↑ +2.3%</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <p className="mt-6 text-xs text-paper-faint">
          Показатели условны и приведены для иллюстрации формата.
        </p>
      </div>
    </section>
  );
}
