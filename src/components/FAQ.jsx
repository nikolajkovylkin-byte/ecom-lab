import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqItems } from "../data.js";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 lg:py-32 border-t border-ink-700">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <h2 className="font-display font-bold text-3xl sm:text-4xl max-w-lg">
          Частые вопросы
        </h2>

        <div className="mt-10 border-t border-ink-700 max-w-2xl">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-ink-700">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-medium text-sm sm:text-base">{item.q}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-paper-faint transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-paper-dim pb-5 max-w-lg">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
