"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LessonGroupIcon, LessonIndividualIcon, LessonSkateboardIcon, LessonSplitIcon, LessonWavesIcon } from "./Icons";
import { handleHorizontalWheelScroll } from "./horizontalScroll";
import { buildWhatsAppUrl, trackEvent } from "../utils/tracking";

const bookingLessonIds = new Set(["group", "private", "split"]);
const lessonMessages = {
  ru: {
    surf_skate: "Здравствуйте! Хочу записаться на surf-skate урок. Подскажите, пожалуйста, доступное время и детали.",
    lineup_pro: "Здравствуйте! Хочу записаться на Line-up / Pro урок. У меня уже есть опыт серфинга. Подскажите, пожалуйста, доступное время и детали.",
  },
  en: {
    surf_skate: "Hi! I'd like to book a surf-skate lesson. Could you please send me the available times and details?",
    lineup_pro: "Hi! I'd like to book a Line-up / Pro lesson. I already have surfing experience. Could you please send me the available times and details?",
  },
};

export default function Lessons({ t, lang = "en", links, openBookingModal }) {
  const lessonsScrollRef = useRef(null);
  const interactiveSelector = "button, a, input, select, textarea, [role='button']";
  const lessonIcons = {
    group: <LessonGroupIcon className="h-12 w-12" />,
    split: <LessonSplitIcon className="h-12 w-12" />,
    private: <LessonIndividualIcon className="h-12 w-12" />,
    surf_skate: <LessonSkateboardIcon className="h-12 w-12" />,
    lineup_pro: <LessonWavesIcon className="h-12 w-12" />,
  };
  const lessonsDragRef = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    moved: false
  });

  const handleLessonsWheel = (event) => {
    handleHorizontalWheelScroll(event, lessonsScrollRef.current);
  };

  const handleLessonsPointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    if (event.target.closest(interactiveSelector)) return;

    const scroller = lessonsScrollRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;

    lessonsDragRef.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: scroller.scrollLeft,
      moved: false
    };
    scroller.setPointerCapture?.(event.pointerId);
  };

  const handleLessonsPointerMove = (event) => {
    const scroller = lessonsScrollRef.current;
    const drag = lessonsDragRef.current;
    if (!scroller || !drag.isDragging) return;

    const diff = event.clientX - drag.startX;
    if (Math.abs(diff) > 4) drag.moved = true;
    scroller.scrollLeft = drag.scrollLeft - diff;
  };

  const stopLessonsDrag = (event) => {
    const scroller = lessonsScrollRef.current;
    if (scroller?.hasPointerCapture?.(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
    lessonsDragRef.current.isDragging = false;
  };

  const handleLessonsClickCapture = (event) => {
    if (!lessonsDragRef.current.moved) return;

    lessonsDragRef.current.moved = false;
    if (event.target.closest(interactiveSelector)) return;

    event.preventDefault();
    event.stopPropagation();
  };

  const getLessonPayload = (item) => ({
    language: lang,
    service_type: item.id,
    cta_location: "lessons",
    cta_label: item.title,
    lesson_id: item.id,
  });

  const getBookingUrl = (item) => links.booking?.[lang]?.[item.id];

  const handleBookingClick = (item) => {
    const bookingUrl = getBookingUrl(item);
    if (!bookingUrl) return;

    openBookingModal(bookingUrl, {
      serviceType: item.id,
      ctaLocation: "lessons",
      ctaLabel: item.title,
      lessonId: item.id,
    });
  };

  const handleMessengerClick = (event, item) => {
    const message = lessonMessages[lang]?.[item.id] || lessonMessages.en[item.id] || item.title;

    trackEvent("whatsapp_click", getLessonPayload(item));
    event.currentTarget.href = buildWhatsAppUrl(links.whatsapp, message, { language: lang });
  };

  return (
    <section id="lessons" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
      <h2 className="text-4xl md:text-6xl font-black text-center mb-12 md:mb-16 tracking-normal leading-tight text-epicDark break-words">
        {t.sectionTitle} <span className="text-epicDark">{t.sectionTitleRide}</span>
      </h2>

      <div
        ref={lessonsScrollRef}
        onWheel={handleLessonsWheel}
        onPointerDown={handleLessonsPointerDown}
        onPointerMove={handleLessonsPointerMove}
        onPointerUp={stopLessonsDrag}
        onPointerCancel={stopLessonsDrag}
        onPointerLeave={stopLessonsDrag}
        onClickCapture={handleLessonsClickCapture}
        className="relative left-1/2 w-screen -translate-x-1/2 px-6 md:left-auto md:w-full md:-mx-6 md:translate-x-0 md:px-6 overflow-x-auto overscroll-x-contain scrollbar-hide cursor-grab active:cursor-grabbing select-none touch-auto snap-x snap-mandatory md:snap-none scroll-px-6"
      >
        <div className="flex gap-4 sm:gap-6 md:gap-8 pb-8 w-max">
          {t.cards.map((item, i) => (
            <motion.div
              key={item.id}
              className="w-[76vw] max-w-[300px] sm:w-[300px] flex-shrink-0 snap-start bg-epicDark rounded-[40px] overflow-hidden shadow-lg flex flex-col border border-white/20 text-epicWhite group"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={`/gallery/lesson-${i + 1}.webp`}
                  alt={item.title}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              <div className="px-8 pb-8 pt-9 flex flex-col flex-1 text-center items-center">
                <div className="mb-3 text-epicGray">
                  {lessonIcons[item.id] || lessonIcons.group}
                </div>
                <div className="text-[12px] text-epicRed font-extrabold mb-5 leading-snug">{item.badge}</div>
                <h3 className="text-2xl font-extrabold mb-7 text-epicWhite leading-tight break-words hyphens-auto">{item.title}</h3>
                <p className="text-epicWhite/80 mb-12 text-sm leading-7 font-medium max-w-[220px] flex-1">
                  {item.desc}
                </p>
                <div className="text-[28px] font-normal mb-8 text-epicWhite leading-none tracking-normal">{item.price}</div>
                {bookingLessonIds.has(item.id) ? (
                  <button onClick={() => handleBookingClick(item)} className="w-full bg-epicRed text-epicWhite py-5 rounded-[18px] font-extrabold uppercase text-sm tracking-wide shadow-lg transition-all duration-300 hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 active:scale-95">{t.btnBook}</button>
                ) : (
                  <a href={links.whatsapp} onClick={(event) => handleMessengerClick(event, item)} target="_blank" rel="noreferrer" className="w-full bg-epicRed text-epicWhite py-5 rounded-[18px] font-extrabold uppercase text-sm tracking-wide shadow-lg transition-all duration-300 hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 active:scale-95">{t.btnBook}</a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
