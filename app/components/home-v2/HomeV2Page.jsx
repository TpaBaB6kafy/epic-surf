"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Header from "../Header";
import HomeV2Footer from "./HomeV2Footer";
import MessengerFab from "../MessengerFab";
import BookingModal from "../BookingModal";
import RentalModal from "../RentalModal";
import {
  ChatTelegramIcon,
  ChatWhatsAppIcon,
  ChatZaloIcon,
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
  HomeV2Rentals
} from "./sections/HomeV2LessonsRentals";
import {
  HomeV2Events,
  HomeV2FAQ,
  HomeV2Gallery,
  HomeV2HowItWorks,
  HomeV2Reviews
} from "./sections/HomeV2ContentSections";
import { HomeV2Conditions } from "./sections/HomeV2Conditions";

export default function HomeV2Page({ locale = "en" }) {
  const rootRef = useRef(null);
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
    rootRef.current?.setAttribute("data-home-v2-client-ready", "true");
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
    <div
      ref={rootRef}
      data-home-v2-root
      className="relative min-h-screen overflow-x-clip bg-epicDark font-sans text-epicDark"
      style={{ "--home-v2-deep-teal": "#395962" }}
    >
      <Header
        t={t}
        lang={lang}
        links={links}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        openBookingModal={openBookingModal}
        languageHref={languageHref}
        sectionHrefBase={sectionHrefBase}
        variant="homeV2"
      />

      <main data-home-v2-main-flow className="relative">
        <HomeV2Hero t={t} lang={lang} links={links} openBookingModal={openBookingModal} whyItems={t.whyItems} />
        <HomeV2HowItWorks t={t} lang={lang} />
        <HomeV2Lessons t={t} lang={lang} links={links} openBookingModal={openBookingModal} />
        <HomeV2Included t={t} />
        <section
          data-home-v2-surf-stack
          className="relative isolate overflow-hidden bg-epicDark pb-0 pt-6 text-epicWhite md:pb-0 md:pt-8"
        >
          <Image
            data-home-v2-wave-layer
            aria-hidden="true"
            src="/design/home-v2/surf-stack/surf-stack-wave-contour.svg"
            alt=""
            width={2294}
            height={3227}
            sizes="(min-width: 1024px) 1980px, 1200px"
            className="pointer-events-none absolute inset-y-0 left-1/2 z-0 h-full w-auto max-w-none -translate-x-1/2 opacity-[0.09] sm:opacity-[0.12] lg:opacity-[0.16]"
          />
          <div data-home-v2-surf-stack-content className="relative z-10 space-y-8 md:space-y-0">
            <div data-home-v2-flow-stage="rental">
              <HomeV2Rentals
                t={t}
                lang={lang}
                setRentalModalOpen={setRentalModalOpenSafely}
                onSelectRentalBoard={openRentalModal}
              />
            </div>
            <div data-home-v2-flow-stage="livecam-forecast">
              <HomeV2Conditions t={t} locale={lang} />
            </div>
          </div>
        </section>
        <HomeV2Reviews t={t} googleMapsUrl={links.googleMaps} />
      </main>
      <HomeV2FAQ lang={lang} title={t.faqTitle} titleEnd={t.faqTitleEnd} items={t.faqItems} />
      <HomeV2Events t={t} openEventGallery={openEventGallery} />
      <HomeV2Gallery
        lang={lang}
        links={links}
        t={t}
        eventGalleryGroups={eventGalleryGroups}
        activeGalleryKey={activeGalleryKey}
        setActiveGalleryKey={setActiveGalleryKey}
        activeGalleryGroup={activeGalleryGroup}
        galleryPhotoSrc={galleryPhotoSrc}
        InstagramIcon={InstagramIcon}
      />
      <HomeV2Footer
        t={t}
        lang={lang}
        links={links}
      />

      <div data-home-v2-messenger>
        <MessengerFab
          links={links}
          lang={lang}
          ChatWhatsAppIcon={ChatWhatsAppIcon}
          ChatTelegramIcon={ChatTelegramIcon}
          ChatZaloIcon={ChatZaloIcon}
          variant="homeV2"
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
