import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { outcomes } from "../data.js";

function Column({ title, items, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      className="rounded-2xl border border-ink-600 bg-ink-800/70 backdrop-blur-sm p-7"
    >
      <h3 className="font-display font-bold text-xl">{title}</h3>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-paper-dim">
            <CheckCircle2 size={17} className="text-signal mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Outcomes() {
  return (
    <section className="py-24 lg:py-32 border-t border-ink-700">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <h2 className="font-display font-bold text-3xl sm:text-4xl max-w-lg">
          После обучения
        </h2>
        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          <Column title="Получишь" items={outcomes.get} delay={0} />
          <Column title="Научишься" items={outcomes.learn} delay={0.1} />
        </div>
      </div>
    </section>
  );
}
