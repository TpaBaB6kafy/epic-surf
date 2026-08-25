"use client";

import { useState } from "react";
import Image from "next/image";
import { LessonGroupIcon, LessonIndividualIcon, LessonSkateboardIcon, LessonSplitIcon, LessonWavesIcon } from "./Icons";
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
  const [activeLessonId, setActiveLessonId] = useState(t.cards[0]?.id);
  const activeIndex = Math.max(0, t.cards.findIndex((item) => item.id === activeLessonId));
  const activeLesson = t.cards[activeIndex] || t.cards[0];
  const lessonIcons = {
    group: <LessonGroupIcon className="h-9 w-9 md:h-11 md:w-11" />,
    split: <LessonSplitIcon className="h-9 w-9 md:h-11 md:w-11" />,
    private: <LessonIndividualIcon className="h-9 w-9 md:h-11 md:w-11" />,
    surf_skate: <LessonSkateboardIcon className="h-9 w-9 md:h-11 md:w-11" />,
    lineup_pro: <LessonWavesIcon className="h-9 w-9 md:h-11 md:w-11" />,
  };
  const lessonImagePositions = {
    group: "object-[center_35%] md:object-center",
    split: "object-[center_52%] md:object-center",
    private: "object-[center_35%] md:object-[68%_center]",
    surf_skate: "object-center",
    lineup_pro: "object-[center_62%] md:object-center",
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
    event.currentTarget.href = buildWhatsAppUrl(links.whatsapp, message, {
      language: lang,
      includePartnerCode: false,
    });
  };

  return (
    <section id="lessons" className="px-6 pb-14 pt-16 max-w-6xl mx-auto scroll-mt-24 md:py-24">
      <h2 className="text-4xl md:text-6xl font-black text-center mb-8 md:mb-14 tracking-normal leading-tight text-epicDark break-words">
        {t.sectionTitle} <span className="text-epicDark">{t.sectionTitleRide}</span>
      </h2>

      <div data-lessons-layout className="grid gap-5 md:grid-cols-[minmax(268px,0.4fr)_minmax(0,0.6fr)] md:gap-6 lg:grid-cols-[minmax(300px,0.32fr)_minmax(0,0.68fr)] lg:gap-8">
        <div data-lesson-selector role="group" aria-label={t.sectionTitle} className="grid content-start gap-1.5 md:grid-rows-5 md:content-stretch md:gap-2">
          {t.cards.map((item, index) => {
            const isActive = item.id === activeLesson.id;

            return (
              <button
                key={item.id}
                type="button"
                data-lesson-selector-item={item.id}
                aria-pressed={isActive}
                aria-controls="lesson-active-detail"
                onClick={() => setActiveLessonId(item.id)}
                className={`group grid h-[46px] w-full grid-cols-[42px_minmax(0,1fr)_30px] items-center overflow-hidden rounded-[14px] border text-left transition-colors duration-150 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-epicDark md:h-auto md:min-h-[60px] md:grid-cols-[52px_minmax(0,1fr)_36px] md:rounded-[18px] ${
                  isActive
                    ? "border-epicDark bg-epicDark text-epicWhite shadow-md ring-1 ring-epicRed/60"
                    : "border-epicDark/15 bg-white text-epicDark shadow-sm hover:border-epicRed hover:bg-epicRed/5"
                }`}
              >
                <span className={`flex h-full items-center justify-center border-r text-[12px] font-black tabular-nums md:text-sm ${isActive ? "border-white/20 text-epicRed" : "border-epicDark/10 text-epicGray"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span data-lesson-selector-title className="min-w-0 px-3 text-[13px] font-extrabold leading-[1.05] md:px-4 md:text-base lg:text-lg">
                  {item.title}
                </span>
                <span aria-hidden="true" className={`flex h-full items-center justify-center transition-transform duration-150 ${isActive ? "translate-x-0" : "-translate-x-0.5 group-hover:translate-x-0"}`}>
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-base leading-none transition-colors md:h-7 md:w-7 ${isActive ? "bg-epicRed text-epicWhite" : "text-epicGray/45 group-hover:bg-epicRed/10 group-hover:text-epicRed"}`}>→</span>
                </span>
              </button>
            );
          })}
        </div>

        <article
          id="lesson-active-detail"
          data-lesson-detail
          data-active-lesson-id={activeLesson.id}
          className="grid min-w-0 overflow-hidden rounded-[32px] border border-white/20 bg-epicDark text-epicWhite shadow-lg md:min-h-[368px] md:grid-cols-[minmax(150px,0.4fr)_minmax(0,0.6fr)] md:rounded-[36px] lg:min-h-[400px] lg:grid-cols-[minmax(240px,0.44fr)_minmax(0,0.56fr)]"
        >
          <div className="relative h-[148px] w-full md:h-full md:min-h-[368px] lg:min-h-[400px]">
            <Image
              key={activeLesson.id}
              data-lesson-photo
              src={`/gallery/lesson-${activeIndex + 1}.webp`}
              alt={activeLesson.title}
              fill
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) 32vw, 430px"
              className={`object-cover ${lessonImagePositions[activeLesson.id] || "object-center"}`}
              priority={activeLesson.id === "group"}
            />
          </div>

          <div className="flex min-h-[272px] min-w-0 flex-col px-5 pb-2 pt-5 text-center md:min-h-0 md:items-start md:px-5 md:pb-5 md:pt-5 md:text-left lg:px-7 lg:pb-7 lg:pt-7">
            <div className="mb-2 flex items-center justify-center gap-3 self-center md:mb-3 md:self-start">
              <span className="text-epicGray">{lessonIcons[activeLesson.id] || lessonIcons.group}</span>
              <span className="text-[11px] font-extrabold leading-snug text-epicRed md:text-xs">{activeLesson.badge}</span>
            </div>
            <h3 data-lesson-active-title className="text-[22px] font-extrabold leading-tight text-epicWhite break-words hyphens-auto md:text-2xl lg:text-[28px]">
              {activeLesson.title}
            </h3>
            <p data-lesson-description className="mt-3 min-h-[66px] text-sm font-medium leading-[1.5] text-epicWhite/80 md:mt-4 md:min-h-[84px] md:leading-6 lg:max-w-[430px]">
              {activeLesson.desc}
            </p>
            <div data-lesson-action-zone className="mt-auto grid w-full grid-cols-[auto_minmax(132px,0.9fr)] items-center justify-between gap-3 rounded-[18px] border border-white/10 bg-white/[0.045] p-2 md:grid-cols-1 md:gap-3 md:p-3 lg:grid-cols-[auto_minmax(140px,160px)] lg:justify-start lg:gap-4">
              <div data-lesson-price className="whitespace-nowrap text-[21px] font-normal leading-none tracking-normal text-epicWhite md:text-[25px]">
                {activeLesson.price}
              </div>
              {bookingLessonIds.has(activeLesson.id) ? (
                <button
                  type="button"
                  data-lesson-cta
                  data-booking-url={getBookingUrl(activeLesson)}
                  onClick={() => handleBookingClick(activeLesson)}
                  className="w-full rounded-[16px] bg-epicRed px-3 py-3.5 text-xs font-extrabold uppercase tracking-wide text-epicWhite shadow-lg transition-transform duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-epicWhite md:py-4 md:text-sm"
                >
                  {t.btnBook}
                </button>
              ) : (
                <a
                  data-lesson-cta
                  href={links.whatsapp}
                  onClick={(event) => handleMessengerClick(event, activeLesson)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-[16px] bg-epicRed px-3 py-3.5 text-center text-xs font-extrabold uppercase tracking-wide text-epicWhite shadow-lg transition-transform duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-epicWhite md:py-4 md:text-sm"
                >
                  {t.btnBook}
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
