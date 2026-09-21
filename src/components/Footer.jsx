import React from "react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-ink-700">
      <div className="max-w-content mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <span className="font-display font-bold">Ecom Lab</span>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper-dim">
          <a href="[ССЫЛКА]" className="hover:text-paper transition-colors">
            Instagram
          </a>
          <a href="[ССЫЛКА]" className="hover:text-paper transition-colors">
            WhatsApp
          </a>
          <a href="[ССЫЛКА]" className="hover:text-paper transition-colors">
            Telegram
          </a>
          <a href="[ССЫЛКА]" className="hover:text-paper transition-colors">
            Политика конфиденциальности
          </a>
          <a href="[ССЫЛКА]" className="hover:text-paper transition-colors">
            Условия обучения
          </a>
        </nav>
      </div>
    </footer>
  );
}
