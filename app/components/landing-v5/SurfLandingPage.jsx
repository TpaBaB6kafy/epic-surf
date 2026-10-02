"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Plus } from "lucide-react";
import LandingShell from "./LandingShell";
import BookingModal from "../BookingModal";
import RentalModal from "../RentalModal";
import { links } from "../../data/links";
import { getSeoPageLinks } from "../../data/seoPages";
import { translations } from "../../data/translations";
import { buildTelegramUrl, buildWhatsAppUrl, buildZaloUrl, storeAttributionFromUrl, trackEvent } from "../../utils/tracking";

export default function SurfLandingPage({ page, locale = "en", languageHref }) {
  const [bookingModalUrl, setBookingModalUrl] = useState(null);
  const [isRentalModalOpen, setRentalModalOpen] = useState(false);
  const lang = locale === "ru" ? "ru" : "en";
  const t = translations[lang];
  const bookingUrl = links.booking[lang][page.bookingService || "group"];
  const message = lang === "ru" ? `Привет! У меня вопрос про ${page.title} в Epic Surf School.` : `Hi! I have a question about ${page.title} at Epic Surf School.`;
  const relatedItems = getSeoPageLinks(lang).filter(item => page.related?.includes(item.href));
  const path = page.path.replace(/^\/ru(?=\/)/, "");
  const kind = path === "/surf-guide" ? "guide" : path === "/surf-lessons-danang" ? "lessons" : path === "/my-khe-beach-surfing" ? "beach" : "destination";

  useEffect(() => {
    storeAttributionFromUrl({ includePartner: true });
    trackEvent("page_view", { language: lang, page_type: "seo_page", page_slug: page.path });
  }, [lang, page.path]);

  const openBookingModal = (url, options = {}) => {
    trackEvent(options.event || "booking_cta_click", { language: lang, service_type: options.serviceType || "surf_lesson",
      cta_location: options.ctaLocation || "seo_page", cta_label: options.ctaLabel || page.bookingLabel || "book_now" });
    setBookingModalUrl(url);
  };
  const primary = () => openBookingModal(bookingUrl, { serviceType: page.bookingService || "group", ctaLocation: "seo_page_hero", ctaLabel: page.bookingLabel || page.path });
  const secondary = () => {
    if (page.secondaryAction === "rental") {
      trackEvent("rental_cta_click", { language: lang, service_type: "board_rental", cta_location: "seo_page_hero", cta_label: page.path });
      setRentalModalOpen(true);
    } else {
      trackEvent("whatsapp_click", { language: lang, service_type: "general_question", cta_location: "seo_page_hero", cta_label: page.path });
      window.open(buildWhatsAppUrl(links.whatsapp, message, { language: lang }), "_blank", "noopener,noreferrer");
    }
  };
  const messenger = (event, name, builder) => {
    event.currentTarget.href = builder(links[name], message, { language: lang });
    trackEvent(`${name}_click`, { language: lang, service_type: "surf_lesson", cta_location: "seo_page_contact", cta_label: name });
  };

  return (
    <LandingShell locale={lang} languageHref={languageHref || (lang === "ru" ? path : `/ru${path}`)} openBookingModal={openBookingModal} className={`landing-${kind}`}>
      <main>
        <section className="landing-hero">
          <div className="landing-container landing-hero-grid">
            <div className="landing-hero-copy">
              <p className="landing-eyebrow">{page.eyebrow}</p>
              <h1>{page.title}</h1>
              <p className="landing-intro">{page.intro}</p>
              <div className="landing-actions">
                <button type="button" className="landing-button" onClick={primary}>{page.primaryCta}<ArrowRight size={18} /></button>
                <button type="button" className="landing-button landing-button-secondary" onClick={secondary}><MessageCircle size={18} />{page.secondaryCta}</button>
              </div>
            </div>
            <div className="landing-hero-photo">
              <Image src={page.heroImage} alt={page.title} fill priority sizes="(min-width: 900px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </section>
        {page.hubCards && (
          <nav className="landing-container landing-guide-hub" aria-label={lang === "ru" ? "Темы гида" : "Surf guide topics"}>
            <div className="landing-related-grid">
              {page.hubCards.map(card => (
                <Link key={card.href} href={card.href} className="landing-related-card">
                  <h2>{card.title}<ArrowRight size={20} aria-hidden="true" /></h2>
                  <p>{card.text}</p>
                </Link>
              ))}
            </div>
          </nav>
        )}
        <div className="landing-content">
          {page.sections.map((section) => (
            <section className={`landing-section ${section.cards ? "landing-section-feature" : ""}`} key={section.title}>
              <div className="landing-container landing-section-grid">
                <h2>{section.title}</h2>
                <div className="landing-section-copy">
                  {section.body && <p>{section.body}</p>}
                  {section.items && <ul className="landing-list">{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
                  {section.cta && <Link href={section.cta.href} className="landing-button landing-button-secondary">{section.cta.label}<ArrowRight size={18} /></Link>}
                </div>
                {section.cards && <div className={`landing-cards ${section.cards.length === 4 ? "landing-cards-steps" : ""}`}>
                  {section.cards.map(card => <article className="landing-card" key={card.title}><h3>{card.title}</h3><p>{card.text}</p></article>)}
                </div>}
              </div>
            </section>
          ))}
        </div>
        <section className="landing-faq">
          <div className="landing-container landing-faq-grid">
            <h2>{lang === "ru" ? "Вопросы и ответы" : "FAQ"}</h2>
            <div>{page.faq.map(item => <details className="landing-faq-item" key={item.question}>
              <summary>{item.question}<Plus size={20} aria-hidden="true" /></summary><p>{item.answer}</p>
            </details>)}</div>
          </div>
        </section>
        <section className="landing-related landing-container">
          <p className="landing-eyebrow">{page.relatedEyebrow || (lang === "ru" ? "Узнайте больше" : "Explore more")}</p>
          <h2>{page.relatedTitle || (lang === "ru" ? "О сёрфинге в Дананге" : "Surf info for Da Nang")}</h2>
          <div className="landing-related-grid">{relatedItems.map(item => <Link key={item.href} href={item.href} className="landing-related-card">
            <h3>{item.label}<ArrowRight size={20} /></h3><p>{item.description}</p>
          </Link>)}</div>
        </section>
        <section className="landing-contact">
          <div className="landing-container">
            <p className="landing-eyebrow">{page.contactEyebrow || (lang === "ru" ? "Готовы к сёрфингу?" : "Ready to surf?")}</p>
            <h2>{page.contactTitle || (lang === "ru" ? "Запишитесь или напишите Epic" : "Book or message Epic")}</h2>
            <div className="landing-actions">
              <button type="button" className="landing-button" onClick={primary}>{page.primaryCta}<ArrowRight size={18} /></button>
              {[["whatsapp", "WhatsApp", buildWhatsAppUrl], ["telegram", "Telegram", buildTelegramUrl], ["zalo", "Zalo", buildZaloUrl]].map(([name, label, builder]) =>
                <a key={name} className="landing-button landing-button-secondary" href={links[name]} target="_blank" rel="noreferrer" onClick={event => messenger(event, name, builder)}>{label}</a>)}
            </div>
          </div>
        </section>
      </main>
      <BookingModal bookingModalUrl={bookingModalUrl} setBookingModalUrl={setBookingModalUrl} title={t.modalTitle} />
      <RentalModal isRentalModalOpen={isRentalModalOpen} setRentalModalOpen={setRentalModalOpen} t={t} links={links} />
    </LandingShell>
  );
}
