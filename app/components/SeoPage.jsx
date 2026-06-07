"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import MessengerFab from "./MessengerFab";
import BookingModal from "./BookingModal";
import RentalModal from "./RentalModal";
import RentalBoardShowroom from "./RentalBoardShowroom";
import {
  ChatTelegramIcon,
  ChatWhatsAppIcon,
  ChatZaloIcon,
  FacebookIcon,
  InstagramIcon,
} from "./Icons";
import { links } from "../data/links";
import { getBoardTrackingPayload, rentalBoards } from "../data/rentalBoards";
import { seoPageLinks } from "../data/seoPages";
import { translations } from "../data/translations";
import {
  buildTelegramUrl,
  buildWhatsAppUrl,
  buildZaloUrl,
  storeAttributionFromUrl,
  trackEvent,
} from "../utils/tracking";

function relatedPages(paths) {
  return seoPageLinks.filter((item) => paths?.includes(item.href));
}

export default function SeoPage({ page, locale = "en", languageHref }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingModalUrl, setBookingModalUrl] = useState(null);
  const [isRentalModalOpen, setRentalModalOpen] = useState(false);
  const [selectedRentalBoard, setSelectedRentalBoard] = useState(null);
  const lang = locale === "ru" ? "ru" : "en";
  const t = translations[lang] || translations.en;
  const bookingUrl = links.booking?.[lang]?.[page.bookingService || "group"] || links.booking?.[lang]?.group || links.booking?.en?.group;
  const message = page.contactMessage || (lang === "ru"
    ? `Привет! У меня вопрос про ${page.title} в Epic Surf School.`
    : `Hi! I have a question about ${page.title} at Epic Surf School.`);
  const isRentalPage = page.primaryAction === "rental" || page.path === "/surfboard-rental-danang" || page.path === "/ru/surfboard-rental-danang";
  const rentalAvailabilityNote = page.rentalAvailabilityNote || "12 boards available - from 250,000 VND / 2 hours";
  const relatedItems = relatedPages(page.related);

  useEffect(() => {
    storeAttributionFromUrl({ includePartner: true });
    trackEvent("page_view", { language: lang, page_type: "seo_page", page_slug: page.path });
  }, [lang, page.path]);

  const openBookingModal = (url, options = {}) => {
    trackEvent(options.event || "booking_cta_click", {
      language: lang,
      service_type: options.serviceType || "surf_lesson",
      cta_location: options.ctaLocation || "seo_page",
      cta_label: options.ctaLabel || page.bookingLabel || "book_now",
    });
    setBookingModalUrl(url);
  };

  const setRentalModalOpenSafely = (isOpen) => {
    setRentalModalOpen(isOpen);
    if (!isOpen) {
      setSelectedRentalBoard(null);
    }
  };

  const openRentalModal = (board = null) => {
    setSelectedRentalBoard(board);
    setRentalModalOpen(true);
  };

  const trackRentalCta = (ctaLocation, ctaLabel, board = null) => {
    trackEvent("rental_cta_click", {
      language: lang,
      service_type: "board_rental",
      cta_location: ctaLocation,
      cta_label: ctaLabel,
      ...getBoardTrackingPayload(board),
    });
  };

  const handlePrimaryCta = () => {
    if (page.primaryAction === "rental") {
      trackRentalCta("seo_page_hero", page.path);
      openRentalModal();
      return;
    }

    openBookingModal(bookingUrl, {
      serviceType: page.bookingService || "group",
      ctaLocation: "seo_page_hero",
      ctaLabel: page.bookingLabel || page.path,
    });
  };

  const handleSecondaryCta = () => {
    if (page.secondaryAction === "rental") {
      trackRentalCta("seo_page_hero", page.path);
      openRentalModal();
      return;
    }

    trackEvent("whatsapp_click", {
      language: lang,
      service_type: "general_question",
      cta_location: "seo_page_hero",
      cta_label: page.path,
    });
    window.open(buildWhatsAppUrl(links.whatsapp, message, { language: lang }), "_blank", "noopener,noreferrer");
  };

  const handleMessengerClick = (event, eventName, label, hrefBuilder) => {
    event.currentTarget.href = hrefBuilder();
    trackEvent(eventName, {
      language: lang,
      service_type: page.primaryAction === "rental" ? "board_rental" : "surf_lesson",
      cta_location: "seo_page_contact",
      cta_label: label,
    });
  };

  const handleBoardRentalClick = (board, ctaLocation = "rental_catalog") => {
    trackRentalCta(ctaLocation, board.id, board);
    openRentalModal(board);
  };

  return (
    <div className="min-h-screen bg-epicWhite font-sans text-epicDark overflow-x-clip">
      <Header
        t={t}
        lang={lang}
        links={links}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        openBookingModal={openBookingModal}
        languageHref={languageHref}
      />

      <main className="pt-16 md:pt-20">
        <section
          data-rental-hero-flow={isRentalPage ? "true" : undefined}
          className="relative overflow-hidden bg-epicDark text-epicWhite"
        >
          <div className={`mx-auto grid max-w-7xl gap-7 px-6 ${isRentalPage ? "pb-6 pt-12 md:gap-10 md:pb-10 md:pt-20" : "py-16 md:py-24"} lg:grid-cols-[1.02fr_0.98fr] lg:items-center`}>
            <div className="max-w-3xl">
              <p className="mb-5 inline-flex rounded-full bg-epicMint px-4 py-2 text-[11px] font-black uppercase tracking-wide text-epicDark">
                {page.eyebrow}
              </p>
              <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-normal md:text-7xl lg:text-8xl">
                {page.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-white/75 md:text-xl">
                {page.intro}
              </p>
              {isRentalPage && (
                <p className="mt-5 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] font-black uppercase tracking-wide text-epicMint">
                  {rentalAvailabilityNote}
                </p>
              )}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handlePrimaryCta}
                  className="inline-flex h-14 items-center justify-center rounded-full bg-epicRed px-8 text-sm font-black uppercase tracking-wide text-white shadow-lg transition-all hover:brightness-105 active:scale-95"
                >
                  {page.primaryCta}
                </button>
                <button
                  type="button"
                  onClick={handleSecondaryCta}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 text-sm font-black uppercase tracking-wide text-white transition-all hover:border-epicMint hover:text-epicMint active:scale-95"
                >
                  <MessageCircle size={18} />
                  {page.secondaryCta}
                </button>
              </div>
            </div>
            <div className="relative h-[220px] overflow-hidden rounded-[26px] border border-white/10 bg-white/5 shadow-2xl md:h-[500px] lg:rounded-[42px]">
              <Image
                src={page.heroImage}
                alt={page.title}
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {isRentalPage && (
            <RentalBoardShowroom
              boards={rentalBoards}
              lang={lang}
              onChooseBoard={(board) => handleBoardRentalClick(board, "rental_showroom")}
            />
          )}
        </section>

        {page.hubCards && (
          <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="grid gap-4 md:grid-cols-2">
              {page.hubCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group rounded-[30px] border border-epicDark/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-epicRed/40"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h2 className="text-2xl font-black leading-tight tracking-normal text-epicDark">{card.title}</h2>
                      <p className="mt-3 text-sm font-medium leading-6 text-epicDark/65">{card.text}</p>
                    </div>
                    <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-epicRed transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section
          data-rental-info-sections={isRentalPage ? "true" : undefined}
          data-mobile-compact={isRentalPage ? "true" : undefined}
          className={`mx-auto max-w-5xl px-6 ${isRentalPage ? "py-10 md:py-24" : "py-16 md:py-24"}`}
        >
          <div className={isRentalPage ? "space-y-8 md:space-y-14" : "space-y-14"}>
            {page.sections.map((section) => (
              <article
                key={section.title}
                className={`border-b border-epicDark/10 last:border-b-0 last:pb-0 ${isRentalPage ? "pb-8 md:pb-12" : "pb-12"}`}
              >
                <h2 className={`${isRentalPage ? "text-2xl md:text-5xl" : "text-3xl md:text-5xl"} font-black uppercase leading-tight tracking-normal`}>
                  {section.title}
                </h2>
                {section.body && (
                  <p className={`${isRentalPage ? "mt-3 text-sm leading-6 md:mt-5 md:text-lg md:leading-8" : "mt-5 text-lg leading-8"} font-medium text-epicDark/72`}>
                    {section.body}
                  </p>
                )}
                {section.items && (
                  <ul className={`${isRentalPage ? "mt-4 gap-2 md:mt-6 md:gap-3" : "mt-6 gap-3"} grid`}>
                    {section.items.map((item) => (
                      <li key={item} className={`${isRentalPage ? "text-sm leading-6 md:text-base md:leading-7" : "text-base leading-7"} flex gap-3 font-bold text-epicDark/75`}>
                        <span className={`${isRentalPage ? "mt-2 h-2 w-2 md:h-2.5 md:w-2.5" : "mt-2 h-2.5 w-2.5"} shrink-0 rounded-full bg-epicRed`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.cards && (
                  <div className={`${isRentalPage ? "mt-5 gap-3 md:mt-7 md:gap-4" : "mt-7 gap-4"} grid md:grid-cols-3`}>
                    {section.cards.map((card) => (
                      <div key={card.title} className={`${isRentalPage ? "rounded-[18px] p-4 md:rounded-[26px] md:p-6" : "rounded-[26px] p-6"} bg-epicDark text-epicWhite`}>
                        <h3 className={`${isRentalPage ? "text-base md:text-xl" : "text-xl"} font-black leading-tight tracking-normal`}>{card.title}</h3>
                        <p className={`${isRentalPage ? "mt-2 text-xs leading-5 md:mt-3 md:text-sm md:leading-6" : "mt-3 text-sm leading-6"} font-medium text-white/70`}>{card.text}</p>
                      </div>
                    ))}
                  </div>
                )}
                {section.cta && (
                  <Link
                    href={section.cta.href}
                    className="mt-5 inline-flex h-11 items-center justify-center rounded-full border border-epicDark/12 bg-white px-5 text-xs font-black uppercase tracking-wide text-epicDark transition-all hover:border-epicRed hover:text-epicRed active:scale-95 md:mt-6"
                  >
                    {section.cta.label}
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-4xl font-black uppercase leading-tight tracking-normal md:text-6xl">FAQ</h2>
            <div className="mt-8 grid gap-4">
              {page.faq.map((item) => (
                <div key={item.question} className="rounded-[28px] border border-epicDark/10 bg-epicWhite p-6">
                  <h3 className="text-xl font-black leading-tight tracking-normal">{item.question}</h3>
                  <p className="mt-3 text-base font-medium leading-7 text-epicDark/68">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {relatedItems.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="rounded-[34px] bg-epicDark p-7 text-epicWhite md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-epicMint">{page.relatedEyebrow || "Explore more"}</p>
                <h2 className="mt-3 text-3xl font-black uppercase leading-tight tracking-normal md:text-5xl">
                  {page.relatedTitle || "Surf info for Da Nang"}
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-[24px] border border-white/10 bg-white/5 p-5 transition-colors hover:border-epicRed/50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-black leading-tight tracking-normal">{item.label}</h3>
                        <p className="mt-2 text-sm font-medium leading-6 text-white/60">{item.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 shrink-0 text-epicRed transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        )}

        <section className="bg-epicMint px-6 py-14 text-epicDark">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div>
              <p className="text-[11px] font-black uppercase tracking-wide">{page.contactEyebrow || "Ready to surf?"}</p>
              <h2 className="mt-2 text-3xl font-black uppercase leading-tight tracking-normal md:text-5xl">
                {page.contactTitle || "Book or message Epic"}
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <button
                type="button"
                onClick={handlePrimaryCta}
                className="inline-flex h-14 items-center justify-center rounded-full bg-epicRed px-8 text-sm font-black uppercase tracking-wide text-white shadow-lg transition-all hover:brightness-105 active:scale-95"
              >
                {page.primaryCta}
              </button>
              <a
                href={links.whatsapp}
                onClick={(event) => handleMessengerClick(event, "whatsapp_click", "whatsapp", () => buildWhatsAppUrl(links.whatsapp, message, { language: lang }))}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full bg-epicDark px-7 text-sm font-black uppercase tracking-wide text-white transition-all hover:bg-epicRed active:scale-95"
              >
                WhatsApp
              </a>
              <a
                href={links.telegram}
                onClick={(event) => handleMessengerClick(event, "telegram_click", "telegram", () => buildTelegramUrl(links.telegram, message, { language: lang }))}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full bg-epicDark px-7 text-sm font-black uppercase tracking-wide text-white transition-all hover:bg-epicRed active:scale-95"
              >
                Telegram
              </a>
              <a
                href={links.zalo}
                onClick={(event) => handleMessengerClick(event, "zalo_click", "zalo", () => buildZaloUrl(links.zalo, message, { language: lang }))}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full bg-epicDark px-7 text-sm font-black uppercase tracking-wide text-white transition-all hover:bg-epicRed active:scale-95"
              >
                Zalo
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer
        t={t}
        lang={lang}
        links={links}
        InstagramIcon={InstagramIcon}
        FacebookIcon={FacebookIcon}
      />

      <MessengerFab
        links={links}
        lang={lang}
        ChatWhatsAppIcon={ChatWhatsAppIcon}
        ChatTelegramIcon={ChatTelegramIcon}
        ChatZaloIcon={ChatZaloIcon}
      />

      <BookingModal bookingModalUrl={bookingModalUrl} setBookingModalUrl={setBookingModalUrl} title={t.modalTitle} />
      <RentalModal
        isRentalModalOpen={isRentalModalOpen}
        setRentalModalOpen={setRentalModalOpenSafely}
        t={t}
        links={links}
        selectedBoard={selectedRentalBoard}
      />
    </div>
  );
}
