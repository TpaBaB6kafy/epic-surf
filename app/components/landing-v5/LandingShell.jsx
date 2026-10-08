"use client";

import { useState } from "react";
import Header from "../Header";
import { SiteFooter } from "../design-system/SiteFooter";
import HomeV2Footer from "../home-v2/HomeV2Footer";
import MessengerFab from "../MessengerFab";
import BookingModal from "../BookingModal";
import { ChatTelegramIcon, ChatWhatsAppIcon, ChatZaloIcon } from "../Icons";
import { translations } from "../../data/translations";
import { links } from "../../data/links";
import { trackEvent } from "../../utils/tracking";
import "./landing-v5.css";

// Shared V5 components with layout scoped to this root, outside homepage canvases.
export default function LandingShell({ locale = "en", languageHref, languageOptions, shellCopy, children, openBookingModal, className = "", footerLayout = "home", footerCollapsible = false, footerServiceType = "surf_lesson" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingUrl, setBookingUrl] = useState(null);
  const t = shellCopy || translations[locale] || translations.en;
  const book = openBookingModal || ((url, options = {}) => {
    trackEvent("booking_cta_click", { language: locale, service_type: "surf_lesson", cta_location: options.ctaLocation || "header", cta_label: options.ctaLabel || "book_now" });
    setBookingUrl(url);
  });
  return (
    <div className={`epic-landing ${className}`} lang={locale}>
      <Header t={t} lang={locale} links={links} variant="homeV2" languageHref={languageHref} languageOptions={languageOptions}
        sectionHrefBase={locale === "ru" ? "/ru" : "/"} isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen} openBookingModal={book} />
      {children}
      {footerCollapsible ? <SiteFooter locale={locale} shellCopy={shellCopy} languageOptions={languageOptions} languageHref={languageHref} fullWidthDetails serviceType={footerServiceType} /> : <HomeV2Footer t={t} lang={locale} links={links} description={t.heroSub} layout={footerLayout} />}
      <MessengerFab links={links} lang={locale} variant="homeV2" serviceType={footerServiceType === "partnership" ? "partnership" : "general_question"} ChatWhatsAppIcon={ChatWhatsAppIcon}
        ChatTelegramIcon={ChatTelegramIcon} ChatZaloIcon={ChatZaloIcon} />
      <BookingModal bookingModalUrl={bookingUrl} setBookingModalUrl={setBookingUrl} title={t.modalTitle} />
    </div>
  );
}
