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
export default function LandingShell({ locale = "en", languageHref, children, openBookingModal, className = "", footerLayout = "home", footerCollapsible = false, footerServiceType = "surf_lesson" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingUrl, setBookingUrl] = useState(null);
  const t = translations[locale];
  const book = openBookingModal || ((url, options = {}) => {
    trackEvent("booking_cta_click", { language: locale, service_type: "surf_lesson", cta_location: options.ctaLocation || "header", cta_label: options.ctaLabel || "book_now" });
    setBookingUrl(url);
  });
  return (
    <div className={`epic-landing ${className}`} lang={locale}>
      <Header t={t} lang={locale} links={links} variant="homeV2" languageHref={languageHref}
        sectionHrefBase={locale === "ru" ? "/ru" : "/"} isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen} openBookingModal={book} />
      {children}
      {footerCollapsible ? <SiteFooter locale={locale} languageHref={languageHref} fullWidthDetails serviceType={footerServiceType} /> : <HomeV2Footer t={t} lang={locale} links={links} description={t.heroSub} layout={footerLayout} />}
      <MessengerFab links={links} lang={locale} variant="homeV2" ChatWhatsAppIcon={ChatWhatsAppIcon}
        ChatTelegramIcon={ChatTelegramIcon} ChatZaloIcon={ChatZaloIcon} />
      <BookingModal bookingModalUrl={bookingUrl} setBookingModalUrl={setBookingUrl} title={t.modalTitle} />
    </div>
  );
}
