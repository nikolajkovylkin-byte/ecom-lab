import React from "react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-ink-700">
      <div className="max-w-content mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <span className="font-display font-bold">Ecom Lab</span>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper-dim">
          <a
            href="https://wa.me/77088344780"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-paper transition-colors"
          >
            WhatsApp +7 708 834 47 80
          </a>

          <a
            href="/privacy"
            className="hover:text-paper transition-colors"
          >
            Политика конфиденциальности
          </a>

          <a
            href="/terms"
            className="hover:text-paper transition-colors"
          >
            Условия обучения
          </a>
        </nav>
      </div>
    </footer>
  );
}