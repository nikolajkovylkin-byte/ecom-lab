import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePackage } from "../context/PackageContext.jsx";

const links = [
  { href: "#about", label: "О курсе" },
  { href: "#program", label: "Программа" },
  { href: "#practice", label: "Практика" },
  { href: "#packages", label: "Пакеты" },
  { href: "#reviews", label: "Отзывы" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { selectPackage } = usePackage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-ink-900/80 border-b border-ink-600 py-3"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-content mx-auto px-5 sm:px-8 flex items-center justify-between">
        <div className="flex flex-col leading-none">
          <span className="font-display font-bold text-lg tracking-tight">
            Ecom Lab
          </span>
          <span className="font-mono text-[10px] text-signal tracking-wider mt-1">
            KASPI SELLER EDUCATION
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-8 font-body text-sm text-paper-dim">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="hover:text-paper transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => selectPackage(null, true)}
          className="hidden lg:inline-flex items-center rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-paper hover:bg-signal-dim transition-colors"
        >
          Выбрать тариф
        </button>

        <button
          className="lg:hidden text-paper"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden mt-4 px-5 pb-5 flex flex-col gap-4 bg-ink-900/95 border-t border-ink-600">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="text-left pt-4 text-paper-dim text-base"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              selectPackage(null, true);
            }}
            className="mt-1 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-paper text-center"
          >
            Выбрать тариф
          </button>
        </div>
      )}
    </header>
  );
}
