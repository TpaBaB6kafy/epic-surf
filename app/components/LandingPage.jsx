"use client";
import { useEffect, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import WhyEpic from "./WhyEpic";
import HowItWorks from "./HowItWorks";
import Lessons from "./Lessons";
import IncludedBento from "./IncludedBento";
import Rentals from "./Rentals";
import Forecast from "./Forecast";
import Reviews from "./Reviews";
import FAQ from "./FAQ";
import Events from "./Events";
import Gallery from "./Gallery";
import Footer from "./Footer";
import MessengerFab from "./MessengerFab";
import BookingModal from "./BookingModal";
import RentalModal from "./RentalModal";
import { translations } from "../data/translations";
import { links } from "../data/links";
import {
  getEventGalleryGroups,
  galleryLayoutClasses,
  galleryPhotoSrc
} from "../data/gallery";
import {
  ChatTelegramIcon,
  ChatWhatsAppIcon,
  ChatZaloIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  ThreadsIcon
} from "./Icons";
import { storeAttributionFromUrl, trackEvent } from "../utils/tracking";

export default function EpicSurfLanding({ locale = "en" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRentalModalOpen, setRentalModalOpen] = useState(false);
  const [bookingModalUrl, setBookingModalUrl] = useState(null);
  const [activeGalleryKey, setActiveGalleryKey] = useState("all");

  const lang = locale === "ru" ? "ru" : "en";
  const t = translations[lang];
  const eventGalleryGroups = getEventGalleryGroups(lang);
  const activeGalleryGroup = eventGalleryGroups.find((group) => group.key === activeGalleryKey) || eventGalleryGroups[0];
  const openEventGallery = (galleryKey) => {
    setActiveGalleryKey(galleryKey);
    trackEvent("gallery_open", {
      language: lang,
      cta_location: "events_section",
      cta_label: galleryKey,
    });
    requestAnimationFrame(() => {
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  useEffect(() => {
    storeAttributionFromUrl({ includePartner: true });
    trackEvent("page_view", { language: lang });
  }, [lang]);

  const openBookingModal = (url, options = {}) => {
    trackEvent(options.event || "booking_cta_click", {
      language: lang,
      service_type: options.serviceType || "surf_lesson",
      cta_location: options.ctaLocation || "unknown",
      cta_label: options.ctaLabel || "book_now",
      ...(options.lessonId ? { lesson_id: options.lessonId } : {}),
    });
    setBookingModalUrl(url);
  };

  return (
    <div
      className="min-h-screen bg-epicWhite font-sans text-epicDark overflow-x-clip transition-colors duration-500 scroll-smooth"
    >

      <Header
        t={t}
        lang={lang}
        links={links}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        openBookingModal={openBookingModal}
      />

      <Hero t={t} lang={lang} />

      <WhyEpic items={t.whyItems} />
      <HowItWorks t={t} />

      <Lessons
        t={t}
        lang={lang}
        links={links}
        openBookingModal={openBookingModal}
      />

      <IncludedBento
        label={t.includedLabel}
        title={t.includedTitle}
        description={t.includedSubtitle}
        accentTitle={t.includedAccentTitle}
        accentDesc={t.includedAccentDesc}
        items={t.includedItems}
      />
      <Rentals
        t={t}
        lang={lang}
        setRentalModalOpen={setRentalModalOpen}
      />

      <Forecast
        t={t}
        lang={lang}
      />

      <Reviews t={t} googleMapsUrl={links.googleMaps} />

      <FAQ
        title={t.faqTitle}
        titleEnd={t.faqTitleEnd}
        items={t.faqItems}
      />

      <Events t={t} openEventGallery={openEventGallery} />

      <Gallery
        links={links}
        t={t}
        eventGalleryGroups={eventGalleryGroups}
        activeGalleryKey={activeGalleryKey}
        setActiveGalleryKey={setActiveGalleryKey}
        activeGalleryGroup={activeGalleryGroup}
        galleryLayoutClasses={galleryLayoutClasses}
        galleryPhotoSrc={galleryPhotoSrc}
        InstagramIcon={InstagramIcon}
      />
      <Footer
        t={t}
        lang={lang}
        links={links}
        InstagramIcon={InstagramIcon}
        FacebookIcon={FacebookIcon}
        YoutubeIcon={YoutubeIcon}
        ThreadsIcon={ThreadsIcon}
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
        setRentalModalOpen={setRentalModalOpen}
        t={t}
        links={links}
      />
    </div>
  );
}


