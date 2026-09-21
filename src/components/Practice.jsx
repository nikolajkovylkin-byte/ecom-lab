import React from "react";
import { motion } from "framer-motion";
import { formatCards } from "../data.js";

export default function Practice() {
  return (
    <section id="practice" className="py-24 lg:py-32 border-t border-ink-700">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <h2 className="font-display font-bold text-3xl sm:text-4xl max-w-lg">
          Как проходит обучение
        </h2>
        <p className="text-paper-dim mt-3 max-w-md text-sm">
          Курс полностью онлайн, в живом формате — не запись, а реальные занятия с наставником.
        </p>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {formatCards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-2xl border border-ink-600 bg-ink-800 p-6"
            >
              <span className="text-3xl leading-none">{c.icon}</span>
              <h3 className="font-display font-semibold text-lg mt-4">{c.title}</h3>
              <p className="text-sm text-paper-dim mt-1.5">{c.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
