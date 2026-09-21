import React from "react";
import { motion } from "framer-motion";
import { sellerFlow } from "../data.js";
import {
  Package,
  CreditCard,
  Store,
  ClipboardList,
  BadgeCheck,
  BarChart3,
} from "lucide-react";

const icons = [Store, Package, CreditCard, ClipboardList, BadgeCheck, BarChart3];

export default function SellerFlow() {
  return (
    <section id="about" className="py-24 lg:py-32 border-t border-ink-700 relative">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <h2 className="font-display font-bold text-3xl sm:text-4xl max-w-xl">
          Как выглядит путь продавца
        </h2>

        <div className="mt-16 relative">
          {/* animated flowing connector line, desktop only */}
          <svg
            className="hidden lg:block absolute top-7 left-0 w-full h-2 pointer-events-none"
            viewBox="0 0 1200 8"
            preserveAspectRatio="none"
          >
            <line
              x1="60"
              y1="4"
              x2="1140"
              y2="4"
              stroke="#2a2b33"
              strokeWidth="2"
            />
            <motion.line
              x1="60"
              y1="4"
              x2="1140"
              y2="4"
              stroke="#E23B34"
              strokeWidth="2"
              strokeDasharray="14 10"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -240 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-12">
            {sellerFlow.map((step, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="relative"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 shadow-lg shadow-black/30"
                    style={{
                      background: "linear-gradient(145deg, #E23B34, #8C2622)",
                    }}
                  >
                    <Icon size={20} className="text-paper" />
                  </div>
                  <span className="block mt-4 font-mono text-[11px] text-signal">
                    {step.n}
                  </span>
                  <h3 className="font-display font-semibold text-lg mt-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-paper-dim mt-1">{step.note}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
