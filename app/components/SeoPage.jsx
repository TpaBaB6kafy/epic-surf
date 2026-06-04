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
import {
  ChatTelegramIcon,
  ChatWhatsAppIcon,
  ChatZaloIcon,
  FacebookIcon,
  InstagramIcon,
} from "./Icons";
import { links } from "../data/links";
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

export default function SeoPage({ page }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingModalUrl, setBookingModalUrl] = useState(null);
  const [isRentalModalOpen, setRentalModalOpen] = useState(false);
  const t = translations.en;
  const bookingUrl = links.booking?.en?.[page.bookingService || "group"] || links.booking?.en?.group;
  const message = `Hi! I have a question about ${page.title} at Epic Surf School.`;

  useEffect(() => {
    storeAttributionFromUrl({ includePartner: true });
    trackEvent("page_view", { language: "en", page_type: "seo_page", page_slug: page.path });
  }, [page.path]);

  const openBookingModal = (url, options = {}) => {
    trackEvent(options.event || "booking_cta_click", {
      language: "en",
      service_type: options.serviceType || "surf_lesson",
      cta_location: options.ctaLocation || "seo_page",
      cta_label: options.ctaLabel || page.bookingLabel || "book_now",
    });
    setBookingModalUrl(url);
  };

  const handlePrimaryCta = () => {
    if (page.primaryAction === "rental") {
      trackEvent("rental_cta_click", {
        language: "en",
        service_type: "board_rental",
        cta_location: "seo_page_hero",
        cta_label: page.path,
      });
      setRentalModalOpen(true);
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
      trackEvent("rental_cta_click", {
        language: "en",
        service_type: "board_rental",
        cta_location: "seo_page_hero",
        cta_label: page.path,
      });
      setRentalModalOpen(true);
      return;
    }

    trackEvent("whatsapp_click", {
      language: "en",
      service_type: "general_question",
      cta_location: "seo_page_hero",
      cta_label: page.path,
    });
    window.open(buildWhatsAppUrl(links.whatsapp, message, { language: "en" }), "_blank", "noopener,noreferrer");
  };

  const handleMessengerClick = (event, eventName, label, hrefBuilder) => {
    event.currentTarget.href = hrefBuilder();
    trackEvent(eventName, {
      language: "en",
      service_type: page.primaryAction === "rental" ? "board_rental" : "surf_lesson",
      cta_location: "seo_page_contact",
      cta_label: label,
    });
  };

  return (
    <div className="min-h-screen bg-epicWhite font-sans text-epicDark overflow-x-clip">
      <Header
        t={t}
        lang="en"
        links={links}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        openBookingModal={openBookingModal}
      />

      <main className="pt-16 md:pt-20">
        <section className="relative overflow-hidden bg-epicDark text-epicWhite">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
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
            <div className="relative h-[360px] overflow-hidden rounded-[34px] border border-white/10 bg-white/5 shadow-2xl md:h-[520px] lg:rounded-[56px]">
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

        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="space-y-14">
            {page.sections.map((section) => (
              <article key={section.title} className="border-b border-epicDark/10 pb-12 last:border-b-0 last:pb-0">
                <h2 className="text-3xl font-black uppercase leading-tight tracking-normal md:text-5xl">
                  {section.title}
                </h2>
                {section.body && (
                  <p className="mt-5 text-lg font-medium leading-8 text-epicDark/72">
                    {section.body}
                  </p>
                )}
                {section.items && (
                  <ul className="mt-6 grid gap-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-base font-bold leading-7 text-epicDark/75">
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-epicRed" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.cards && (
                  <div className="mt-7 grid gap-4 md:grid-cols-3">
                    {section.cards.map((card) => (
                      <div key={card.title} className="rounded-[26px] bg-epicDark p-6 text-epicWhite">
                        <h3 className="text-xl font-black leading-tight tracking-normal">{card.title}</h3>
                        <p className="mt-3 text-sm font-medium leading-6 text-white/70">{card.text}</p>
                      </div>
                    ))}
                  </div>
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

        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="rounded-[34px] bg-epicDark p-7 text-epicWhite md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-epicMint">Explore more</p>
                <h2 className="mt-3 text-3xl font-black uppercase leading-tight tracking-normal md:text-5xl">
                  Surf info for Da Nang
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedPages(page.related).map((item) => (
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

        <section className="bg-epicMint px-6 py-14 text-epicDark">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div>
              <p className="text-[11px] font-black uppercase tracking-wide">Ready to surf?</p>
              <h2 className="mt-2 text-3xl font-black uppercase leading-tight tracking-normal md:text-5xl">
                Book or message Epic
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
                onClick={(event) => handleMessengerClick(event, "whatsapp_click", "whatsapp", () => buildWhatsAppUrl(links.whatsapp, message, { language: "en" }))}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full bg-epicDark px-7 text-sm font-black uppercase tracking-wide text-white transition-all hover:bg-epicRed active:scale-95"
              >
                WhatsApp
              </a>
              <a
                href={links.telegram}
                onClick={(event) => handleMessengerClick(event, "telegram_click", "telegram", () => buildTelegramUrl(links.telegram, message, { language: "en" }))}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full bg-epicDark px-7 text-sm font-black uppercase tracking-wide text-white transition-all hover:bg-epicRed active:scale-95"
              >
                Telegram
              </a>
              <a
                href={links.zalo}
                onClick={(event) => handleMessengerClick(event, "zalo_click", "zalo", () => buildZaloUrl(links.zalo, message, { language: "en" }))}
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
        lang="en"
        links={links}
        InstagramIcon={InstagramIcon}
        FacebookIcon={FacebookIcon}
      />

      <MessengerFab
        links={links}
        lang="en"
        ChatWhatsAppIcon={ChatWhatsAppIcon}
        ChatTelegramIcon={ChatTelegramIcon}
        ChatZaloIcon={ChatZaloIcon}
      />

      <BookingModal bookingModalUrl={bookingModalUrl} setBookingModalUrl={setBookingModalUrl} title={t.modalTitle} />
      <RentalModal
        isRentalModalOpen={isRentalModalOpen}
        setRentalModalOpen={setRentalModalOpen}
        t={t}
        links={links}
      />
    </div>
  );
}
