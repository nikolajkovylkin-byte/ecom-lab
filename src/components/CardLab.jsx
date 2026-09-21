import React, { useState } from "react";
import {
  Star,
  Truck,
  MapPin,
  ShieldCheck,
  Heart,
  Share2,
  ChevronRight,
} from "lucide-react";

const MAIN_IMG = "/products/jeans-main.jpg";
const GALLERY = ["/products/jeans-main.jpg", "/products/jeans-2.jpg", "/products/jeans-3.jpg", "/products/jeans-4.jpg"];

const fields = [
  { key: "photo", label: "Фото" },
  { key: "name", label: "Название" },
  { key: "price", label: "Цена" },
  { key: "specs", label: "Характеристики" },
];

const specs = [
  { label: "Материал", value: "Деним" },
  { label: "Посадка", value: "Оверсайз" },
  { label: "Цвет", value: "Тёмно-синий, бежевый" },
  { label: "Комплект", value: "Ремень в комплекте" },
];

const deliveryRows = [
  { icon: Truck, title: "Доставка", note: "1–3 дня, бесплатно" },
  { icon: MapPin, title: "Самовывоз", note: "Сегодня, бесплатно" },
  { icon: ShieldCheck, title: "Гарантия", note: "14 дней на возврат" },
];

export default function CardLab() {
  const [active, setActive] = useState(null);
  const [mainImg, setMainImg] = useState(MAIN_IMG);
  const hl = (key) =>
    active === key ? "ring-2 ring-signal ring-offset-2 ring-offset-ink-800" : "";

  return (
    <section className="py-24 lg:py-32 border-t border-ink-700 bg-ink-950">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <h2 className="font-display font-bold text-3xl sm:text-4xl max-w-lg">
          Карточка товара решает больше, чем кажется.
        </h2>
        <p className="text-paper-dim mt-3 max-w-md text-sm">
          Разбираем на примере — наведи на любой пункт ниже, чтобы увидеть,
          какой элемент карточки за него отвечает.
        </p>

        <div className="mt-12 rounded-2xl border border-ink-600 bg-ink-800 p-6 sm:p-8">
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8">
            {/* gallery */}
            <div>
              <div
                className={`relative aspect-square rounded-xl overflow-hidden border border-ink-600 transition-shadow ${hl(
                  "photo"
                )}`}
              >
                <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-signal px-3 py-1 text-[11px] font-semibold">
                  🔥 Хит продаж
                </span>
                <img
                  src={mainImg}
                  alt="Товар"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {GALLERY.map((src) => (
                  <button
                    key={src}
                    onClick={() => setMainImg(src)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      mainImg === src ? "border-signal" : "border-ink-600 hover:border-ink-500"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            {/* info */}
            <div className="flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    className={`font-display font-bold text-2xl rounded transition-shadow ${hl(
                      "name"
                    )}`}
                  >
                    Джинсы карго оверсайз
                  </h3>
                  <p className="text-sm text-paper-dim mt-1">Свободный крой, с ремнём</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-paper-faint">
                  <Heart size={18} />
                  <Share2 size={16} />
                </div>
              </div>

              <div className="flex items-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < 4 ? "fill-signal text-signal" : "text-ink-600"}
                  />
                ))}
                <span className="text-xs text-paper-faint ml-1">4.8 · 128 отзывов</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-600 px-3 py-1.5 text-xs text-paper-dim">
                  <ShieldCheck size={13} className="text-signal" /> В наличии
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-600 px-3 py-1.5 text-xs text-paper-dim">
                  <Truck size={13} className="text-signal" /> Быстрая доставка
                </span>
              </div>

              <p
                className={`font-mono text-3xl font-bold mt-5 rounded transition-shadow ${hl(
                  "price"
                )}`}
              >
                15 990 ₸
              </p>

              <div className="flex gap-3 mt-5">
                <button className="flex-1 rounded-full bg-signal py-3 text-sm font-semibold">
                  Добавить в корзину
                </button>
                <button className="flex-1 rounded-full border border-ink-500 py-3 text-sm font-semibold">
                  Купить сейчас
                </button>
              </div>

              <div className="mt-6 rounded-xl border border-ink-600 divide-y divide-ink-700">
                {deliveryRows.map((r) => (
                  <div
                    key={r.title}
                    className="flex items-center justify-between px-4 py-3 text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <r.icon size={15} className="text-signal" />
                      <div>
                        <p className="text-paper">{r.title}</p>
                        <p className="text-xs text-paper-faint">{r.note}</p>
                      </div>
                    </div>
                    <ChevronRight size={15} className="text-paper-faint" />
                  </div>
                ))}
              </div>

              <div
                className={`mt-4 rounded-xl border border-ink-600 divide-y divide-ink-700 transition-shadow ${hl(
                  "specs"
                )}`}
              >
                {specs.map((s) => (
                  <div key={s.label} className="flex items-center justify-between px-4 py-2.5 text-sm">
                    <span className="text-paper-faint">{s.label}</span>
                    <span className="text-paper-dim">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {fields.map((f) => (
            <button
              key={f.key}
              onMouseEnter={() => setActive(f.key)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(f.key)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(active === f.key ? null : f.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === f.key
                  ? "border-signal bg-signal/10 text-paper"
                  : "border-ink-600 text-paper-dim hover:border-ink-500"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
