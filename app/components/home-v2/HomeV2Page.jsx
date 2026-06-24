"use client";

import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import MessengerFab from "../MessengerFab";
import BookingModal from "../BookingModal";
import RentalModal from "../RentalModal";
import {
  ChatTelegramIcon,
  ChatWhatsAppIcon,
  ChatZaloIcon,
  FacebookIcon,
  InstagramIcon
} from "../Icons";
import { translations } from "../../data/translations";
import { links } from "../../data/links";
import {
  getEventGalleryGroups,
  galleryPhotoSrc
} from "../../data/gallery";
import { storeAttributionFromUrl, trackEvent } from "../../utils/tracking";
import HomeV2Hero from "./sections/HomeV2Hero";
import {
  HomeV2Included,
  HomeV2Lessons,
  HomeV2PhotoBreak,
  HomeV2Rentals
} from "./sections/HomeV2LessonsRentals";
import {
  HomeV2Events,
  HomeV2FAQ,
  HomeV2Gallery,
  HomeV2HowItWorks,
  HomeV2Reviews
} from "./sections/HomeV2ContentSections";
import { HomeV2Forecast, HomeV2LiveCam } from "./sections/HomeV2UtilitySections";

export default function HomeV2Page({ locale = "en" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRentalModalOpen, setRentalModalOpen] = useState(false);
  const [selectedRentalBoard, setSelectedRentalBoard] = useState(null);
  const [bookingModalUrl, setBookingModalUrl] = useState(null);
  const [activeGalleryKey, setActiveGalleryKey] = useState("all");

  const lang = locale === "ru" ? "ru" : "en";
  const t = translations[lang];
  const sectionHrefBase = lang === "ru" ? "/ru/home-v2" : "/home-v2";
  const languageHref = lang === "ru" ? "/home-v2" : "/ru/home-v2";
  const eventGalleryGroups = getEventGalleryGroups(lang);
  const activeGalleryGroup = eventGalleryGroups.find((group) => group.key === activeGalleryKey) || eventGalleryGroups[0];

  useEffect(() => {
    storeAttributionFromUrl({ includePartner: true });
    trackEvent("page_view", { language: lang, page_variant: "home_v2" });
  }, [lang]);

  const openEventGallery = (galleryKey) => {
    setActiveGalleryKey(galleryKey);
    trackEvent("gallery_open", {
      language: lang,
      page_variant: "home_v2",
      cta_location: "home_v2_events_section",
      cta_label: galleryKey,
    });
    requestAnimationFrame(() => {
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const openBookingModal = (url, options = {}) => {
    trackEvent(options.event || "booking_cta_click", {
      language: lang,
      page_variant: "home_v2",
      service_type: options.serviceType || "surf_lesson",
      cta_location: options.ctaLocation || "unknown",
      cta_label: options.ctaLabel || "book_now",
      ...(options.lessonId ? { lesson_id: options.lessonId } : {}),
    });
    setBookingModalUrl(url);
  };

  const openRentalModal = (board = null) => {
    setSelectedRentalBoard(board);
    setRentalModalOpen(true);
  };

  const setRentalModalOpenSafely = (isOpen) => {
    setRentalModalOpen(isOpen);
    if (!isOpen) {
      setSelectedRentalBoard(null);
    }
  };

  return (
    <div data-home-v2-root className="min-h-screen overflow-x-clip bg-epicWhite font-sans text-epicDark">
      <Header
        t={t}
        lang={lang}
        links={links}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        openBookingModal={openBookingModal}
        languageHref={languageHref}
        sectionHrefBase={sectionHrefBase}
      />

      <HomeV2Hero t={t} lang={lang} links={links} openBookingModal={openBookingModal} whyItems={t.whyItems} />
      <HomeV2HowItWorks t={t} lang={lang} />
      <HomeV2Lessons t={t} lang={lang} links={links} openBookingModal={openBookingModal} />
      <HomeV2Included t={t} />
      <HomeV2Rentals
        t={t}
        lang={lang}
        setRentalModalOpen={setRentalModalOpenSafely}
        onSelectRentalBoard={openRentalModal}
      />
      <HomeV2LiveCam locale={lang} />
      <HomeV2Forecast t={t} lang={lang} />
      <HomeV2PhotoBreak />
      <HomeV2Reviews t={t} googleMapsUrl={links.googleMaps} />
      <HomeV2FAQ title={t.faqTitle} titleEnd={t.faqTitleEnd} items={t.faqItems} />
      <HomeV2Events t={t} openEventGallery={openEventGallery} />
      <HomeV2Gallery
        links={links}
        t={t}
        eventGalleryGroups={eventGalleryGroups}
        activeGalleryKey={activeGalleryKey}
        setActiveGalleryKey={setActiveGalleryKey}
        activeGalleryGroup={activeGalleryGroup}
        galleryPhotoSrc={galleryPhotoSrc}
        InstagramIcon={InstagramIcon}
      />
      <Footer
        t={t}
        lang={lang}
        links={links}
        InstagramIcon={InstagramIcon}
        FacebookIcon={FacebookIcon}
      />

      <div data-home-v2-messenger>
        <MessengerFab
          links={links}
          lang={lang}
          ChatWhatsAppIcon={ChatWhatsAppIcon}
          ChatTelegramIcon={ChatTelegramIcon}
          ChatZaloIcon={ChatZaloIcon}
        />
      </div>

      <BookingModal bookingModalUrl={bookingModalUrl} setBookingModalUrl={setBookingModalUrl} title={t.modalTitle} />

      <div data-home-v2-rental-modal>
        <RentalModal
          isRentalModalOpen={isRentalModalOpen}
          setRentalModalOpen={setRentalModalOpenSafely}
          t={t}
          links={links}
          selectedBoard={selectedRentalBoard}
        />
      </div>
    </div>
  );
}
