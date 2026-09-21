import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { programModules } from "../data.js";
import { ChevronDown } from "lucide-react";

export default function Program() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="program" className="py-24 lg:py-32 border-t border-ink-700">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <h2 className="font-display font-bold text-3xl sm:text-4xl max-w-xl">
          Программа курса
        </h2>

        <div className="mt-12 max-w-2xl divide-y divide-ink-700 border-t border-b border-ink-700">
          {programModules.map((m, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={m.n}>
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full flex items-center gap-5 py-5 text-left group"
                >
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs transition-colors ${
                      isOpen
                        ? "bg-signal text-paper"
                        : "border border-ink-600 text-paper-faint group-hover:border-ink-500"
                    }`}
                  >
                    {m.n}
                  </span>
                  <span className="font-display font-medium text-base sm:text-lg flex-1">
                    {m.title}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-paper-faint transition-transform duration-300 shrink-0 ${
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
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-paper-dim pb-6 pl-14 max-w-md">
                        {m.desc}
                      </p>
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
