"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header({
  t,
  lang,
  links,
  isMenuOpen,
  setIsMenuOpen,
  setLang,
  openBookingModal
}) {
  const navItems = [
    { href: "#lessons", label: t.navLessons },
    { href: "#how-it-works", label: t.navHow },
    { href: "#forecast", label: t.navForecast },
    { href: "#events", label: t.navEvents },
    { href: "#location", label: t.navLocation }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-white shadow-md">
      <div className="h-16 md:h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full flex items-center justify-between gap-2">
          <Link href="/" className="flex-shrink-0 transition-transform active:scale-95 z-[110] font-black text-2xl uppercase flex items-center">
            <span className="text-[#1A1C20]" style={{ letterSpacing: "-0.02em" }}>EPIC</span>
            <span className="text-[#EF233C]" style={{ letterSpacing: "0.05em" }}>SURF</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-[11px] font-bold uppercase tracking-wide leading-snug text-epicDark hover:text-epicRed transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4 z-[110]">
            <button
              onClick={() => setLang(lang === "ru" ? "en" : "ru")}
              className="w-9 h-9 flex items-center justify-center bg-epicDark text-white rounded-full font-bold text-[10px] uppercase shadow-md"
            >
              {lang === "ru" ? "EN" : "RU"}
            </button>

            <button
              onClick={() => openBookingModal(links.group)}
              className="bg-epicRed text-white px-4 md:px-8 h-9 md:h-10 rounded-full font-bold uppercase text-[11px] tracking-wide leading-snug shadow-lg shadow-epicRed/20 active:scale-95 transition-all"
            >
              {t.btnBook}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center bg-epicPink rounded-full text-epicDark transition-all"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-epicPink lg:hidden z-0 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4 pb-8 relative z-10">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold tracking-normal leading-snug break-words text-epicDark hover:text-epicRed py-2 border-b border-epicPink/50"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
