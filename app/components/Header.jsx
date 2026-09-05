"use client";

import { HomeV2MobileHeaderVideo } from "./home-v2/sections/HomeV2MobileTop";
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
  openBookingModal,
  languageHref,
  sectionHrefBase,
  mobileTop = false,
  variant = "default"
}) {
  const pathname = usePathname();
  const isHomeV2 = variant === "homeV2";
  const isHomeV2Desktop = isHomeV2;
  const homeHref = isHomeV2 && sectionHrefBase
    ? sectionHrefBase
    : lang === "ru" ? "/ru" : "/";
  const isHomePage = pathname === homeHref;
  const sectionHref = (fragment) => {
    if (sectionHrefBase) {
      return `${sectionHrefBase}#${fragment}`;
    }

    return isHomePage ? `#${fragment}` : `${homeHref === "/" ? "/" : homeHref}#${fragment}`;
  };
  const baseLanguageHref = languageHref || (lang === "ru" ? "/" : "/ru");
  const languageLabel = lang === "ru" ? "EN" : "RU";
  const partnersHref = lang === "ru" ? "/ru/partners" : "/partners";
  const partnersLabel = lang === "ru" ? "Для партнеров" : "Partners";
  const headerBookingUrl = links.headerBooking?.[lang] || links.group;
  const navItems = [
    { href: sectionHref("lessons"), label: t.navLessons },
    ...(isHomeV2 ? [{ href: sectionHref("rentals"), label: t.navRentals }] : []),
    { href: sectionHref("how-it-works"), label: t.navHow },
    { href: sectionHref("forecast"), label: t.navForecast },
    { href: sectionHref("events"), label: t.navEvents },
    { href: sectionHref("location"), label: t.navLocation },
    { href: partnersHref, label: partnersLabel }
  ];
  const menuId = isHomeV2 ? "home-v2-mobile-navigation" : "mobile-navigation";

  return (
    <header
      data-home-v2-header={isHomeV2 ? "true" : undefined}
      data-home-v2-header-locale={isHomeV2 ? lang : undefined}
      className={isHomeV2
        ? "absolute left-0 top-0 z-[100] w-full overflow-visible bg-epicDark/[0.18] text-epicWhite shadow-none backdrop-blur-[1.5px] md:bg-epicWhite/[0.24] md:text-epicDark"
        : "fixed top-0 left-0 w-full z-[100] bg-white shadow-md"}
    >
      {isHomeV2 && mobileTop && <HomeV2MobileHeaderVideo />}
      <div data-home-v2-header-strip={isHomeV2 ? "true" : undefined} className={isHomeV2 ? "flex h-[62px] items-center md:h-[68px]" : "h-16 md:h-20 flex items-center"}>
        <div data-home-v2-header-frame={isHomeV2 ? "true" : undefined} className="max-w-7xl mx-auto px-4 md:px-6 w-full flex items-center justify-between gap-2">
          <Link
            href={homeHref}
            aria-label={isHomeV2 ? "Epic Surf School" : undefined}
            data-home-v2-brand-logo={isHomeV2 ? "true" : undefined}
            className="z-[110] flex flex-shrink-0 items-center transition-transform active:scale-95"
          >
            {isHomeV2 && mobileTop ? (
              <Image src="/design/home-v2/mobile-top/brand-logo.svg" alt="EPIC SURF" width={51} height={23} priority unoptimized />
            ) : isHomeV2 && lang === "en" ? (
              <picture>
                <source
                  media="(max-width: 639px)"
                  srcSet="/design/home-v2/header/epic-logo-mobile-en.svg"
                />
                <Image
                  src="/design/home-v2/header/epic-logo-dark.svg"
                  alt="EPIC SURF"
                  width={79}
                  height={35}
                  priority
                  className="h-9 md:h-10"
                  style={{ width: "auto" }}
                />
              </picture>
            ) : (
              <Image
                src={isHomeV2Desktop ? "/design/home-v2/header/epic-logo-dark.svg" : "/epic-logo-v-ksu-v4.png"}
                alt="EPIC SURF"
                width={isHomeV2Desktop ? 79 : 132}
                height={isHomeV2Desktop ? 35 : 32}
                priority
                className={isHomeV2 ? "h-9 md:h-10" : "h-9 w-auto md:h-10"}
                style={isHomeV2 ? { width: "auto" } : undefined}
              />
            )}
          </Link>

          <nav
            data-home-v2-primary-navigation={isHomeV2 ? "true" : undefined}
            className={isHomeV2
              ? "hidden min-[1200px]:ml-auto min-[1200px]:flex min-[1200px]:items-center min-[1200px]:gap-5 min-[1320px]:gap-8"
              : "hidden items-center gap-6 lg:flex"}
            aria-label={isHomeV2 ? "Primary navigation" : undefined}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-home-v2-nav-link={isHomeV2 ? "true" : undefined}
                className={isHomeV2
                  ? "text-[11px] font-black uppercase tracking-[0.055em] leading-snug text-epicDark/90 transition-colors hover:text-epicRed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-epicRed"
                  : "text-[11px] font-bold uppercase tracking-wide leading-snug text-epicDark hover:text-epicRed transition-colors"}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div data-home-v2-header-actions={isHomeV2 ? "true" : undefined} className={`z-[110] flex items-center gap-2 md:gap-4 ${isHomeV2 ? "min-[1200px]:ml-auto" : ""}`}>
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
              data-home-v2-language-switcher={isHomeV2 ? "true" : undefined}
              className={isHomeV2
                ? "flex h-9 w-9 items-center justify-center rounded-full border border-epicWhite/25 bg-epicDark text-[10px] font-black uppercase text-white transition-colors hover:border-epicRed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicRed md:border-epicDark/25"
                : "w-9 h-9 flex items-center justify-center bg-epicDark text-white rounded-full font-bold text-[10px] uppercase shadow-md"}
            >
              {languageLabel}
            </Link>

            <button
              type="button"
              data-home-v2-book-now={isHomeV2 ? "true" : undefined}
              onClick={() => openBookingModal(headerBookingUrl, {
                ctaLocation: "header",
                ctaLabel: "book_now",
              })}
              className={isHomeV2
                ? "h-9 rounded-full bg-epicRed px-4 text-[10px] font-black uppercase tracking-[0.05em] text-white transition active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicWhite md:h-10 md:px-7 md:text-[11px]"
                : "bg-epicRed text-white px-4 md:px-8 h-9 md:h-10 rounded-full font-bold uppercase text-[11px] tracking-wide leading-snug shadow-lg shadow-epicRed/20 active:scale-95 transition-all"}
            >
              {t.btnBook}
            </button>

            <button
              type={isHomeV2 ? "button" : undefined}
              data-home-v2-menu-control={isHomeV2 ? "true" : undefined}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isHomeV2 ? (isMenuOpen ? "Close navigation" : "Open navigation") : undefined}
              aria-expanded={isHomeV2 ? isMenuOpen : undefined}
              aria-controls={isHomeV2 ? menuId : undefined}
              className={isHomeV2
                ? "flex h-9 w-9 items-center justify-center rounded-full border border-epicWhite/25 bg-epicWhite/90 text-epicDark transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicRed min-[1200px]:hidden"
                : "lg:hidden w-9 h-9 flex items-center justify-center bg-epicMint rounded-full text-epicDark transition-all"}
            >
              {isHomeV2 && mobileTop && !isMenuOpen ? (
                <Image src="/design/home-v2/mobile-top/menu-icon.svg" alt="" width={18} height={16} unoptimized />
              ) : isHomeV2 && lang === "en" && !isMenuOpen ? (
                <span data-home-v2-hamburger-icon aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              ) : isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id={isHomeV2 ? menuId : undefined}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={isHomeV2
              ? "absolute left-0 top-full z-[120] w-full overflow-hidden border-t border-epicWhite/20 bg-epicDark/96 text-epicWhite shadow-[0_16px_30px_rgba(0,0,0,0.35)] backdrop-blur-md min-[1200px]:hidden"
              : "absolute top-full left-0 w-full bg-white shadow-2xl border-t border-epicDark/10 lg:hidden z-0 overflow-hidden"}
          >
            <div className="flex flex-col p-6 gap-4 pb-8 relative z-10">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={isHomeV2
                    ? "border-b border-epicWhite/16 py-2 text-xl font-black uppercase leading-snug tracking-normal text-epicWhite transition-colors hover:text-epicRed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicRed"
                    : "text-2xl font-bold tracking-normal leading-snug break-words text-epicDark hover:text-epicRed py-2 border-b border-epicDark/10"}
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
