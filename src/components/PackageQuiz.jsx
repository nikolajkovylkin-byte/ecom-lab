import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, RotateCcw, Rocket, Globe, Sparkles } from "lucide-react";
import { quizQuestions, resolvePackage, packages } from "../data.js";
import { usePackage } from "../context/PackageContext.jsx";

const questionIcons = {
  hasShop: Store,
  needsReturns: RotateCcw,
  needsFullLaunch: Rocket,
  needsMarketplaces: Globe,
};

export default function PackageQuiz() {
  const [answers, setAnswers] = useState({});
  const { selectPackage } = usePackage();

  const answeredCount = quizQuestions.filter((q) => answers[q.key] !== undefined).length;
  const answeredAll = answeredCount === quizQuestions.length;
  const suggestion = useMemo(
    () => (answeredAll ? packages.find((p) => p.id === resolvePackage(answers)) : null),
    [answers, answeredAll]
  );

  const setAnswer = (key, value) => setAnswers((a) => ({ ...a, [key]: value }));

  return (
    <section className="py-24 lg:py-32 border-t border-ink-700 relative overflow-hidden">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <div className="rounded-3xl border border-ink-600 bg-gradient-to-br from-ink-800 to-ink-900 p-6 sm:p-10 lg:p-12 grid lg:grid-cols-[1fr_0.9fr] gap-12 items-start relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #E23B34, transparent 70%)" }}
          />

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-3 py-1 text-[11px] font-medium text-signal">
              <Sparkles size={12} /> Подбор пакета
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl max-w-md mt-4">
              Не знаешь, какой пакет выбрать?
            </h2>
            <p className="text-sm text-paper-dim mt-3 max-w-sm">
              Ответь на 4 коротких вопроса — подскажем формат по объёму
              обучения и сопровождения, который тебе нужен.
            </p>

            <div className="mt-4 h-1.5 rounded-full bg-ink-700 overflow-hidden max-w-xs">
              <motion.div
                className="h-full bg-signal"
                animate={{ width: `${(answeredCount / quizQuestions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="mt-8 space-y-4">
              {quizQuestions.map((q) => {
                const Icon = questionIcons[q.key];
                return (
                  <div
                    key={q.key}
                    className="rounded-xl border border-ink-600 bg-ink-900/40 p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-2.5 mb-3.5">
                      <Icon size={16} className="text-signal shrink-0" />
                      <p className="text-sm font-medium">{q.q}</p>
                    </div>
                    <div className="flex gap-2">
                      {[
                        { label: "Да", value: true },
                        { label: "Нет", value: false },
                      ].map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => setAnswer(q.key, opt.value)}
                          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                            answers[q.key] === opt.value
                              ? "bg-signal text-paper"
                              : "bg-ink-800 text-paper-dim hover:text-paper border border-ink-600"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative rounded-2xl border border-ink-600 bg-ink-900 p-7 min-h-[320px] flex flex-col justify-center overflow-hidden">
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: "linear-gradient(90deg, #E23B34, #8C2622)" }}
            />
            <AnimatePresence mode="wait">
              {!answeredAll ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-ink-800 border border-ink-600 flex items-center justify-center mx-auto">
                    <Sparkles size={18} className="text-paper-faint" />
                  </div>
                  <p className="text-paper-faint text-sm mt-4 max-w-[220px] mx-auto">
                    Ответь на вопросы слева, и здесь появится подходящий формат
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="font-mono text-[11px] text-paper-faint">
                    ПОДХОДЯЩИЙ ФОРМАТ
                  </span>
                  <h3 className="font-display font-bold text-3xl mt-2">
                    {suggestion.name}
                  </h3>
                  <p className="text-sm text-paper-dim mt-2 max-w-sm">
                    {suggestion.tagline}
                  </p>
                  <p className="font-mono text-xl font-semibold mt-4">
                    {suggestion.price}
                  </p>
                  <button
                    onClick={() => selectPackage(suggestion.id)}
                    className="mt-6 w-full rounded-full bg-signal py-3 text-sm font-semibold hover:bg-signal-dim transition-colors"
                  >
                    Выбрать тариф
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
