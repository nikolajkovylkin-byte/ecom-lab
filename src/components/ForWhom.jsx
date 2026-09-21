import React from "react";
import { motion } from "framer-motion";
import { scenarios } from "../data.js";

export default function ForWhom() {
  return (
    <section className="py-24 lg:py-32 border-t border-ink-700">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <h2 className="font-display font-bold text-3xl sm:text-4xl max-w-xl">
          С какой точки ты начинаешь?
        </h2>

        <div className="mt-14 grid sm:grid-cols-2 gap-4">
          {scenarios.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-ink-600 p-7 hover:border-ink-500 transition-colors"
            >
              <span className="font-mono text-xs text-signal">{s.n}</span>
              <h3 className="font-display font-semibold text-xl mt-3">
                «{s.title}»
              </h3>
              <p className="text-sm text-paper-dim mt-2 max-w-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
