import React from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp, Bell, Package, Store, MoreVertical, ShoppingCart, ChevronRight } from "lucide-react";

const PRODUCT_IMG = "/products/jeans-main.jpg";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-6 right-0 lg:right-10 font-display font-extrabold text-[26vw] lg:text-[220px] leading-none text-white/[0.03] tracking-tighter"
      >
        KASPI
      </span>

      <div className="max-w-content mx-auto px-5 sm:px-8 relative grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-display font-extrabold text-[13vw] leading-[0.98] sm:text-6xl lg:text-[64px] tracking-tight">
            Научись продавать
            <br />
            на Kaspi системно.
          </h1>
          <p className="mt-6 text-paper-dim text-base sm:text-lg max-w-md">
            Практический курс о том, как работать с товарами, карточками,
            заказами, ценами и продажами на Kaspi.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={() =>
                document.querySelector("#packages")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full bg-signal px-7 py-3.5 text-sm font-semibold hover:bg-signal-dim transition-colors"
            >
              Выбрать обучение
            </button>
            <button
              onClick={() =>
                document.querySelector("#program")?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm font-medium text-paper-dim hover:text-paper transition-colors"
            >
              Смотреть программу ↓
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative min-h-[560px] flex items-center justify-center py-10"
        >
          {/* top-left: new order */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-[220px] rounded-xl border border-ink-600 bg-ink-800/95 backdrop-blur px-4 py-3.5 shadow-xl shadow-black/30 z-10 flex items-center gap-3"
          >
            <div className="relative shrink-0">
              <Bell size={18} className="text-signal" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-signal" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Новый заказ</p>
              <p className="text-xs text-paper-faint truncate">Заказ №2417 · 1 товар</p>
            </div>
            <ChevronRight size={15} className="text-paper-faint shrink-0" />
          </motion.div>

          {/* top-right: sales */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="absolute top-0 right-0 w-[200px] rounded-xl border border-ink-600 bg-ink-800/95 backdrop-blur px-4 py-3.5 shadow-xl shadow-black/30 z-10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <TrendingUp size={15} className="text-signal" /> Продажи
              </div>
              <ChevronRight size={15} className="text-paper-faint" />
            </div>
            <svg viewBox="0 0 100 30" className="w-full h-7 mt-2">
              <polyline
                points="0,26 20,20 40,22 60,10 80,13 100,3"
                fill="none"
                stroke="#E23B34"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          {/* main card */}
          <div className="w-full max-w-[420px] rounded-2xl border border-ink-600 bg-ink-800 shadow-2xl shadow-black/40 overflow-hidden">
            <div className="px-5 py-4 border-b border-ink-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store size={16} className="text-signal" />
                <span className="text-sm font-semibold">Мой магазин</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-signal/10 border border-signal/30 px-2.5 py-1 text-[11px] text-signal">
                <span className="w-1.5 h-1.5 rounded-full bg-signal" /> Активен
              </span>
            </div>

            <div className="p-5">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-ink-600">
                <span className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-signal px-2.5 py-1 text-[10px] font-semibold">
                  🔥 ХИТ
                </span>
                <img
                  src={PRODUCT_IMG}
                  alt="Товар в магазине"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-semibold text-lg leading-tight">
                    Джинсы карго оверсайз
                  </h3>
                  <p className="text-xs text-paper-faint mt-1">Свободный крой, с ремнём</p>
                </div>
                <MoreVertical size={16} className="text-paper-faint shrink-0 mt-1" />
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="font-mono text-2xl font-bold">15 990 ₸</span>
                <span className="flex items-center gap-1 text-sm text-paper-dim">
                  <Star size={13} className="fill-signal text-signal" /> 4.8
                </span>
              </div>

              <button className="mt-4 w-full rounded-full bg-signal py-3 text-sm font-semibold flex items-center justify-center gap-2">
                <ShoppingCart size={15} /> Продано
              </button>
            </div>
          </div>

          {/* bottom-right: confirmed */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            className="absolute bottom-0 right-0 w-[220px] rounded-xl border border-ink-600 bg-ink-800/95 backdrop-blur px-4 py-3.5 shadow-xl shadow-black/30 z-10 flex items-center gap-3"
          >
            <Package size={18} className="text-signal shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Заказ подтверждён</p>
              <p className="text-xs text-paper-faint">Ожидает передачи в доставку</p>
            </div>
            <ChevronRight size={15} className="text-paper-faint shrink-0" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
