import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, ClipboardList, Store, Star } from "lucide-react";
import { usePackage } from "../context/PackageContext.jsx";

const WHATSAPP_NUMBER = "77088344780";
const EMAIL = "site.kaspi@gmail.com";

// Разовые консультации — вне тарифов и вне скидки на тарифы.
const CONSULTATIONS = [
  {
    id: "shop",
    icon: Store,
    name: "Консультация по магазину",
    price: "от 10 000 ₸",
    desc: "Разберём именно твой магазин: карточки товаров, заказы, цены или продажи — один на один, без привязки к полному курсу.",
    whatsappText: "Здравствуйте! Хочу записаться на консультацию по магазину на Kaspi.",
  },
  {
    id: "reviews",
    icon: Star,
    name: "Консультация по отзывам",
    price: "30 000 ₸",
    desc: "Разберём отзывы на твоих карточках: как правильно отвечать покупателям, что делать с необоснованными или ложными отзывами и как добиться их удаления.",
    whatsappText: "Здравствуйте! Хочу записаться на консультацию по отзывам на Kaspi.",
  },
];

export default function Consultation() {
  const { selectCustomRequest } = usePackage();

  return (
    <section id="consultation" className="py-20 lg:py-24 border-t border-ink-700">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <div className="max-w-lg">
          <span className="inline-flex items-center rounded-full bg-signal/10 text-signal text-xs font-semibold px-3 py-1">
            Без ожидания курса
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl mt-4">
            Личные консультации
          </h2>
          <p className="text-paper-dim mt-3 text-sm sm:text-base">
            Не хочешь ждать курс — разберём твой вопрос точечно, один на один с наставником.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {CONSULTATIONS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-signal/30 bg-gradient-to-br from-ink-800 to-ink-900 p-6 sm:p-8 flex flex-col"
              >
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20 blur-3xl"
                  style={{ background: "radial-gradient(circle, #E23B34, transparent 70%)" }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="w-11 h-11 rounded-full bg-signal/10 border border-signal/30 flex items-center justify-center shrink-0">
                    <Icon size={19} className="text-signal" />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-signal/10 text-signal text-xs font-semibold px-3 py-1 whitespace-nowrap">
                    {c.price}
                  </span>
                </div>

                <h3 className="relative font-display font-bold text-xl sm:text-2xl mt-5">
                  {c.name}
                </h3>
                <p className="relative text-paper-dim mt-2.5 text-sm leading-relaxed flex-1">
                  {c.desc}
                </p>

                <div className="relative flex flex-col sm:flex-row gap-2.5 mt-6">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      c.whatsappText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-11 rounded-full border border-ink-500 px-4 text-sm font-medium hover:border-ink-400 hover:bg-ink-700 transition-colors"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>

                  <a
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                      c.name
                    )}&body=${encodeURIComponent(c.whatsappText)}`}
                    className="inline-flex items-center justify-center gap-2 h-11 rounded-full border border-ink-500 px-4 text-sm font-medium hover:border-ink-400 hover:bg-ink-700 transition-colors"
                  >
                    <Mail size={16} />
                    Почта
                  </a>

                  <button
                    onClick={() => selectCustomRequest({ name: c.name, price: c.price })}
                    className="inline-flex items-center justify-center gap-2 h-11 rounded-full bg-signal px-4 text-sm font-semibold hover:bg-signal-dim transition-colors sm:ml-auto"
                  >
                    <ClipboardList size={16} />
                    Записаться
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
