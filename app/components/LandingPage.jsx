"use client";
import { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import WhyEpic from "./WhyEpic";
import HowItWorks from "./HowItWorks";
import Lessons from "./Lessons";
import Included from "./Included";
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
import { includedImages } from "../data/included";
import { links } from "../data/links";
import {
  getEventGalleryGroups,
  galleryLayoutClasses,
  galleryPhotoSrc
} from "../data/gallery";
import {
  WaveDivider,
  ChatTelegramIcon,
  ChatWhatsAppIcon,
  ChatZaloIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  ThreadsIcon
} from "./Icons";
export default function EpicSurfLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRentalModalOpen, setRentalModalOpen] = useState(false);
  const [lang, setLang] = useState('ru');
  const [bookingModalUrl, setBookingModalUrl] = useState(null);
  const [activeGalleryKey, setActiveGalleryKey] = useState("all");

  const t = translations[lang];
  const eventGalleryGroups = getEventGalleryGroups(lang);
  const activeGalleryGroup = eventGalleryGroups.find((group) => group.key === activeGalleryKey) || eventGalleryGroups[0];
  const openEventGallery = (galleryKey) => {
    setActiveGalleryKey(galleryKey);
    requestAnimationFrame(() => {
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div
      className="min-h-screen bg-epicWhite font-sans text-epicDark overflow-x-clip transition-colors duration-500 scroll-smooth"
      style={{ fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif' }}
    >

      <Header
        t={t}
        lang={lang}
        links={links}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setLang={setLang}
        openBookingModal={setBookingModalUrl}
      />

      <Hero t={t} lang={lang} />

      {/* WAVE TOP */}
      <WaveDivider color="#FFFFFF" flip={true} />

      <WhyEpic items={t.whyItems} />
      <HowItWorks t={t} />

      <Lessons
        t={t}
        links={links}
        openBookingModal={setBookingModalUrl}
      />

      <Included title={t.includedTitle} items={t.includedItems} includedImages={includedImages} />
      <Rentals
        t={t}
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
        lang={lang}
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
        links={links}
        InstagramIcon={InstagramIcon}
        FacebookIcon={FacebookIcon}
        YoutubeIcon={YoutubeIcon}
        ThreadsIcon={ThreadsIcon}
      />

      <MessengerFab
        links={links}
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


