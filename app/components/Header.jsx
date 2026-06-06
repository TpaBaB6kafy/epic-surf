"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getHrefWithCurrentQuery, trackEvent } from "../utils/tracking";

export default function Header({
  t,
  lang,
  links,
  isMenuOpen,
  setIsMenuOpen,
  openBookingModal
}) {
  const pathname = usePathname();
  const homeHref = lang === "ru" ? "/ru" : "/";
  const isHomePage = pathname === homeHref;
  const sectionHref = (fragment) => (isHomePage ? `#${fragment}` : `${homeHref === "/" ? "/" : homeHref}#${fragment}`);
  const baseLanguageHref = lang === "ru" ? "/" : "/ru";
  const languageLabel = lang === "ru" ? "EN" : "RU";
  const partnersHref = lang === "ru" ? "/ru/partners" : "/partners";
  const partnersLabel = lang === "ru" ? "Для партнеров" : "Partners";
  const headerBookingUrl = links.headerBooking?.[lang] || links.group;
  const navItems = [
    { href: sectionHref("lessons"), label: t.navLessons },
    { href: sectionHref("how-it-works"), label: t.navHow },
    { href: sectionHref("forecast"), label: t.navForecast },
    { href: sectionHref("events"), label: t.navEvents },
    { href: sectionHref("location"), label: t.navLocation },
    { href: partnersHref, label: partnersLabel }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-white shadow-md">
      <div className="h-16 md:h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full flex items-center justify-between gap-2">
          <Link href={homeHref} className="flex-shrink-0 transition-transform active:scale-95 z-[110] flex items-center">
            <Image
              src="/epic-logo-v-ksu-v4.png"
              alt="EPIC SURF"
              width={132}
              height={32}
              priority
              className="h-9 md:h-10 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-[11px] font-bold uppercase tracking-wide leading-snug text-epicDark hover:text-epicRed transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4 z-[110]">
            <Link
              href={baseLanguageHref}
              onClick={(event) => {
                event.preventDefault();
                const nextHref = getHrefWithCurrentQuery(baseLanguageHref);
                trackEvent("language_switch", {
                  language: lang,
                  cta_location: "header",
                  cta_label: languageLabel.toLowerCase(),
                });
                window.location.assign(nextHref);
              }}
              className="w-9 h-9 flex items-center justify-center bg-epicDark text-white rounded-full font-bold text-[10px] uppercase shadow-md"
            >
              {languageLabel}
            </Link>

            <button
              onClick={() => openBookingModal(headerBookingUrl, {
                ctaLocation: "header",
                ctaLabel: "book_now",
              })}
              className="bg-epicRed text-white px-4 md:px-8 h-9 md:h-10 rounded-full font-bold uppercase text-[11px] tracking-wide leading-snug shadow-lg shadow-epicRed/20 active:scale-95 transition-all"
            >
              {t.btnBook}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center bg-epicMint rounded-full text-epicDark transition-all"
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
            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-epicDark/10 lg:hidden z-0 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4 pb-8 relative z-10">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold tracking-normal leading-snug break-words text-epicDark hover:text-epicRed py-2 border-b border-epicDark/10"
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
