"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { buildWhatsAppUrl, trackEvent } from "../../../utils/tracking";
import { HomeV2SectionHeading, PosterButton, PosterLink } from "../PosterPrimitives";

const bookingLessonIds = new Set(["group", "private", "split"]);

function useHomeV2Presentation() {
  const [presentation, setPresentation] = useState(null);

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 639px)");
    const desktopMedia = window.matchMedia("(min-width: 1440px)");
    const updatePresentation = () => setPresentation(desktopMedia.matches ? "desktop" : mobileMedia.matches ? "mobile" : "adaptive");
    updatePresentation();
    mobileMedia.addEventListener?.("change", updatePresentation);
    desktopMedia.addEventListener?.("change", updatePresentation);
    return () => {
      mobileMedia.removeEventListener?.("change", updatePresentation);
      desktopMedia.removeEventListener?.("change", updatePresentation);
    };
  }, []);

  return presentation;
}

const lessonMessages = {
  ru: {
    surf_skate: "Здравствуйте! Хочу записаться на surf-skate урок.",
    lineup_pro: "Здравствуйте! Хочу записаться на Line-up / Pro урок.",
  },
  en: {
    surf_skate: "Hi! I'd like to book a surf-skate lesson.",
    lineup_pro: "Hi! I'd like to book a Line-up / Pro lesson.",
  },
};

const rentalPromoCopy = {
  en: {
    description: "Board rental in Da Nang with delivery or pickup in a convenient city spot. We help match the board to your level and the day's conditions.",
    viewAll: "View all boards",
  },
  ru: {
    description: "Аренда досок в Дананге от 250,000 VND / 2 часа. Помогаем выбрать доску под уровень и условия.",
    viewAll: "Выбрать доску",
  },
};

const rentalPosterCopy = {
  en: {
    from: "FROM",
    description: "Shortboards, funboards, softboards and more",
    term: "Daily or long term.",
    rentNow: "RENT NOW",
    chooseBoard: "CHOOSE A BOARD",
  },
  ru: {
    from: "ОТ",
    description: "Шортборды, фанборды, софтборды и другие",
    term: "На день или долгий срок.",
    rentNow: "АРЕНДОВАТЬ",
    chooseBoard: "ВЫБРАТЬ ДОСКУ",
  },
};

const surfStackAssets = {
  rentalHeading: "/design/home-v2/surf-stack/Rentals%20block%20assets/rental-heading-paper.svg",
  rentalPriceCard: "/design/home-v2/surf-stack/Rentals%20block%20assets/rental-price-card.svg",
  rentalPhotoFrame: "/design/home-v2/surf-stack/Rentals%20block%20assets/rental-photo-frame.svg",
  rentalBeachPhoto: "/design/home-v2/surf-stack/Rentals%20block%20assets/rental-beach-photo.webp",
  rentalMintBrush: "/design/home-v2/surf-stack/Rentals%20block%20assets/rental-mint-brush.svg",
};

const lessonPresentationOrder = [
  { id: "group", image: "/design/home-v2/lessons/lesson-group-desktop.webp" },
  { id: "split", image: "/design/home-v2/lessons/lesson-split-desktop.webp" },
  { id: "private", image: "/design/home-v2/lessons/lesson-private-desktop.webp" },
  { id: "surf_skate", image: "/design/home-v2/lessons/lesson-surf-skate-desktop.webp" },
  { id: "lineup_pro", image: "/design/home-v2/lessons/lesson-line-up-pro-desktop.webp" },
];

const desktopLessonCopy = {
  en: {
    audience: { group: "Best for first-timers", split: "Best for pairs", private: "Personal coaching", surf_skate: "Land-based training", lineup_pro: "Advanced surfers" },
    features: ["Beginner", "Social format", "Easy start"],
  },
  ru: {
    audience: { group: "Для новичков", split: "Для пар", private: "Личный инструктор", surf_skate: "Тренировка на суше", lineup_pro: "Для опытных" },
    features: ["Новичкам", "В группе", "Лёгкий старт"],
  },
};

const desktopLessonFeatures = [
  { icon: "/design/home-v2/lessons/lesson-feature-beginner.svg", iconSize: 24 },
  { icon: "/design/home-v2/lessons/lesson-feature-social-format.svg", iconSize: 24 },
  { icon: "/design/home-v2/lessons/lesson-feature-easy-start.svg", iconSize: 21 },
];

function DesktopLessonFeature({ feature, label, index, isRu }) {
  const edgeClass = index === 0 ? "rounded-l-[3px]" : index === desktopLessonFeatures.length - 1 ? "-ml-[0.9px] rounded-r-[3px]" : "-ml-[0.9px]";

  return (
    <div className={`flex h-[60px] w-[72px] flex-col items-center justify-center border-[0.9px] border-[#f6f6f6] ${edgeClass}`}>
      <Image
        aria-hidden="true"
        src={feature.icon}
        alt=""
        width={feature.iconSize}
        height={feature.iconSize}
        className={`mb-[3px] shrink-0 ${index === 1 ? "brightness-0 invert" : ""}`}
      />
      <span className={`font-['Bebas_Neue','Arial_Narrow',Arial,sans-serif] font-bold uppercase leading-[8px] text-[#f6f6f6] ${isRu ? "text-[7px] tracking-0" : "text-[8px] tracking-[0.3787px]"}`}>
        {label}
      </span>
    </div>
  );
}

function DesktopLessonDetail({ item, image, isBookingLesson, links, onBookingClick, onMessengerClick, t, lang }) {
  const price = item.price.replace(/\s*VND$/i, "");
  const isRu = lang === "ru";
  const localizedCopy = desktopLessonCopy[lang] || desktopLessonCopy.en;
  const ctaClass =
    "absolute left-[53px] top-[517px] flex h-[58px] w-[214px] items-center justify-center rounded-[3px] bg-[#fe746a] font-['Montserrat',var(--font-heading)] text-[19.474px] font-bold uppercase leading-[21.638px] tracking-[0.3787px] text-[#2e2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6f6f6]";

  return (
    <div id="home-v2-lesson-detail" data-home-v2-lesson-detail className="absolute left-[659px] top-[100px] h-[615px] w-[682px]">
      <article className="relative h-full w-full">
        <div data-home-v2-lesson-photo-frame className="absolute left-0 top-0 h-[615px] w-[360px] overflow-hidden rounded-l-[3px]">
          <Image
            key={image}
            data-lessons-photo
            src={image}
            alt={item.title}
            fill
            sizes="360px"
            className="object-cover object-center"
            priority={item.id === "group"}
          />
        </div>

        <div data-home-v2-lesson-info-panel className="absolute left-[357px] top-0 h-[615px] w-[325px] overflow-hidden rounded-r-[3px] border-[3px] border-[#f6f6f6] bg-[#2e2e2e] text-[#f6f6f6]">
          <h3 className={`absolute flex items-center justify-center text-center font-['Montserrat',var(--font-heading)] font-bold uppercase ${isRu ? "left-[48px] top-[24px] h-[78px] w-[220px] text-[27px] leading-[31px]" : "left-[77px] top-[29px] h-[69px] w-[164px] text-[36px] leading-[43.056px]"}`}>
            {item.title}
          </h3>
          <Image
            aria-hidden="true"
            src="/design/home-v2/lessons/lesson-title-divider.svg"
            alt=""
            width={205}
            height={2}
            className="absolute left-[57px] top-[116px] h-[2px] w-[205px]"
          />
          <p className="absolute left-0 top-[132px] w-full text-center font-['Montserrat',var(--font-body)] text-[21.6px] font-normal leading-[21.638px] text-[#3d535a]">
            {localizedCopy.audience[item.id] || item.badge}
          </p>
          <p className={`absolute flex items-center justify-center text-center font-[Arial,sans-serif] font-normal text-[#f6f6f6] ${isRu ? "left-[45px] top-[174px] h-[112px] w-[228px] text-[12.5px] leading-[22px]" : "left-[53px] top-[186px] h-[91px] w-[212px] text-[14px] leading-[30.294px]"}`}>
            {item.desc}
          </p>

          <div data-home-v2-lesson-price className="absolute left-[53px] top-[317px] flex h-[58px] w-[214px] items-center justify-center rounded-[3px] bg-[#395962]">
            <span className="font-['Montserrat',var(--font-body)] text-[28px] font-normal leading-[30.294px]">{price}</span>
            <span className="ml-[6px] font-['Montserrat',var(--font-body)] text-[20px] font-normal leading-[30.294px]">VND</span>
          </div>

          <div data-home-v2-lesson-features className="absolute left-[53px] top-[426px] flex h-[60px] w-[214px]">
            {desktopLessonFeatures.map((feature, index) => (
              <DesktopLessonFeature key={localizedCopy.features[index]} feature={feature} label={localizedCopy.features[index]} index={index} isRu={isRu} />
            ))}
          </div>

          {isBookingLesson ? (
            <button type="button" data-home-v2-booking-cta onClick={() => onBookingClick(item)} className={ctaClass}>
              {t.btnBook}
            </button>
          ) : (
            <Link
              data-home-v2-booking-cta
              href={links.whatsapp}
              onClick={(event) => onMessengerClick(event, item)}
              target="_blank"
              rel="noreferrer"
              className={ctaClass}
            >
              {t.btnBook}
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}

function DesktopLessonPresentation({ orderedLessons, activeLesson, setActiveLessonId, links, onBookingClick, onMessengerClick, t, lang }) {
  const headingWords = t.sectionTitle.trim().split(/\s+/);
  const headingFirst = headingWords.shift();
  const headingSecond = [...headingWords, t.sectionTitleRide].join(" ");
  const isRu = lang === "ru";

  return (
    <div data-home-v2-lessons-desktop data-home-v2-lessons-desktop-en className="absolute left-1/2 top-0 h-[843px] w-[1440px] -translate-x-1/2 overflow-hidden bg-[#2e2e2e]">
      <h2 data-home-v2-lessons-heading className="absolute left-[126px] top-[98px] font-['Montserrat',var(--font-heading)] text-[48px] font-black uppercase leading-[42px]">
        <span className="block text-[#f6f6f6]">{headingFirst}</span>
        <span className={`mt-[19px] block whitespace-nowrap text-[#585858] ${isRu ? "ml-[24px] text-[43px]" : "ml-[49px]"}`}>{headingSecond}</span>
      </h2>

      <div data-home-v2-lesson-selector className="absolute left-[100px] top-[254px] w-[405.9px]">
        {orderedLessons.map(({ id, item }, index) => {
          const isActive = id === activeLesson.id;
          return (
            <button
              key={id}
              type="button"
              data-lesson-selector-item={id}
              aria-pressed={isActive}
              aria-controls="home-v2-lesson-detail"
              onClick={() => setActiveLessonId(id)}
              className={`group relative grid w-[405.9px] grid-cols-[75.44px_270px_60.46px] items-center text-left text-[#f6f6f6] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6f6f6] ${
                isActive
                  ? "h-[108.9px] rounded-[3.3px] border-[3.3px] border-[#fe746a]"
                  : "-mt-[1.1px] h-[89.1px] border-[1.1px] border-[#f6f6f6] first:mt-0 last:rounded-b-[3.3px]"
              }`}
            >
              <span className="flex h-full items-center justify-center font-['Bebas_Neue','Arial_Narrow',Arial,sans-serif] text-[36px] font-bold leading-[22.389px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="relative flex h-full items-center justify-center">
                <Image
                  aria-hidden="true"
                  src={isActive ? "/design/home-v2/lessons/lesson-number-divider-active.svg" : "/design/home-v2/lessons/lesson-number-divider.svg"}
                  alt=""
                  width={2}
                  height={isActive ? 70 : 50}
                  className={`absolute left-0 top-1/2 w-[2px] -translate-y-1/2 ${isActive ? "h-[69.3px]" : "h-[49.5px]"}`}
                />
                <span data-lesson-selector-title className={`px-2 text-center font-[Arial,sans-serif] font-bold uppercase leading-[20px] ${isRu ? "text-[18px]" : "text-[24px]"}`}>
                  {item.title}
                </span>
              </span>
              {isActive ? (
                <span data-lesson-selector-arrow-area className="absolute bottom-0 right-0 top-0 flex w-[57.16px] items-center justify-center rounded-r-[1.5px] bg-[#585858]">
                  <Image aria-hidden="true" src="/design/home-v2/lessons/lesson-selector-arrow.svg" alt="" width={30} height={12} className="h-[12px] w-[29.7px]" />
                </span>
              ) : (
                <span aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      <DesktopLessonDetail
        item={activeLesson.item}
        image={activeLesson.image}
        isBookingLesson={bookingLessonIds.has(activeLesson.id)}
        links={links}
        onBookingClick={onBookingClick}
        onMessengerClick={onMessengerClick}
        t={t}
        lang={lang}
      />
    </div>
  );
}

const mobileLessonFeatures = [
  {
    label: "Beginner",
    border: "/design/home-v2/lessons/mobile-feature-cell-border-left.svg",
    icon: "/design/home-v2/lessons/mobile-feature-icon-beginner.svg",
  },
  {
    label: "Social format",
    border: "/design/home-v2/lessons/mobile-feature-cell-border-center.svg",
    icon: "/design/home-v2/lessons/mobile-feature-icon-social.svg",
  },
  {
    label: "Easy start",
    border: "/design/home-v2/lessons/mobile-feature-cell-border-right.svg",
    icon: "/design/home-v2/lessons/mobile-feature-icon-easy-start.svg",
  },
];

function MobileEnLessonFeatures() {
  return (
    <div data-home-v2-lesson-features className="absolute left-[197px] top-[97px] flex h-[34px] w-[126px]">
      {mobileLessonFeatures.map((feature) => (
        <div key={feature.label} className="relative h-[34px] w-[42px] shrink-0">
          <Image aria-hidden="true" src={feature.border} alt="" fill sizes="42px" className="object-fill" />
          <Image aria-hidden="true" src={feature.icon} alt="" width={12} height={12} className="absolute left-[15px] top-[7px] h-[12px] w-[12px]" />
          <span className="absolute inset-x-0 top-[22px] text-center font-['Bebas_Neue','Arial_Narrow',Arial,sans-serif] text-[4.536px] font-bold uppercase leading-[5px] tracking-[0.2147px] text-[#f6f6f6]">
            {feature.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function MobileEnLessonDetail({ item, image, isBookingLesson, links, onBookingClick, onMessengerClick, t }) {
  const price = item.price.replace(/\s*VND$/i, "");
  const ctaClass =
    "absolute left-[197px] top-[161px] flex h-[34px] w-[126px] items-center justify-center rounded-[1.7px] bg-[#fe746a] font-['Montserrat',var(--font-heading)] text-[12px] font-bold uppercase leading-[12.269px] tracking-[0.2147px] text-[#2e2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6f6f6]";

  return (
    <div id="home-v2-lesson-detail" data-home-v2-lesson-detail className="absolute left-[20px] top-[550px] h-[550px] w-[calc(100%_-_40px)]">
      <div data-home-v2-lesson-photo-frame className="relative h-[280px] w-full overflow-hidden rounded-t-[3px]">
        <Image
          key={image}
          data-lessons-photo
          src={image}
          alt={item.title}
          fill
          sizes="(max-width: 390px) calc(100vw - 40px), 350px"
          className="object-cover object-center"
          priority={item.id === "group"}
        />
      </div>

      <article data-home-v2-lesson-info-panel className="relative h-[270px] w-full overflow-hidden rounded-b-[3px] border-[1.701px] border-[#f6f6f6] bg-[#2e2e2e] text-[#f6f6f6]">
        <h3 data-home-v2-lesson-title className="absolute left-[27px] top-[26px] flex h-[49px] w-[139px] items-center justify-center text-center font-['Montserrat',var(--font-heading)] text-[24px] font-bold uppercase leading-[24.412px]">
          {item.title}
        </h3>
        <Image aria-hidden="true" src="/design/home-v2/lessons/mobile-title-divider.svg" alt="" width={117} height={1} className="absolute left-[38px] top-[87px] h-[1px] w-[117px]" />
        <p data-home-v2-lesson-audience className="absolute left-[27px] top-[98px] w-[139px] text-center font-['Montserrat',var(--font-body)] text-[12.247px] font-normal leading-[12px] text-[#3d535a]">
          {desktopLessonCopy.en.audience[item.id] || item.badge}
        </p>
        <p
          data-home-v2-lesson-description
          className={`absolute left-[26px] top-[128px] flex h-[71px] w-[139px] items-center justify-center text-center font-[Arial,sans-serif] font-normal text-[#f6f6f6] ${
            item.desc.length > 110 ? "text-[9.5px] leading-[12px]" : "text-[12px] leading-[17.176px]"
          }`}
        >
          {item.desc}
        </p>

        <div data-home-v2-lesson-price className="absolute left-[197px] top-[32px] flex h-[34px] w-[126px] items-center justify-center rounded-[1.7px] bg-[#395962]">
          <span className="font-['Montserrat',var(--font-body)] text-[16px] font-normal leading-[17.176px]">{price}</span>
          <span className="ml-[5px] font-['Montserrat',var(--font-body)] text-[10.5px] font-normal leading-[17.176px]">VND</span>
        </div>

        <MobileEnLessonFeatures />

        {isBookingLesson ? (
          <button type="button" data-home-v2-booking-cta onClick={() => onBookingClick(item)} className={ctaClass}>
            {t.btnBook}
          </button>
        ) : (
          <Link
            data-home-v2-booking-cta
            href={links.whatsapp}
            onClick={(event) => onMessengerClick(event, item)}
            target="_blank"
            rel="noreferrer"
            className={ctaClass}
          >
            {t.btnBook}
          </Link>
        )}
      </article>
    </div>
  );
}

function MobileEnLessonPresentation({ orderedLessons, activeLesson, setActiveLessonId, links, onBookingClick, onMessengerClick, t }) {
  return (
    <div data-home-v2-lessons-mobile-en className="relative mx-auto h-[1103px] w-full max-w-[390px] overflow-hidden bg-[#2e2e2e]">
      <h2 data-home-v2-lessons-heading className="absolute left-1/2 top-0 h-[80px] w-[275px] -translate-x-1/2 text-center font-['Montserrat',var(--font-heading)] text-[36px] font-black uppercase leading-[42px]">
        <span className="block text-[#f6f6f6]">Choose</span>
        <span className="mt-[-4.58px] block whitespace-nowrap text-[#585858]">Your Lesson</span>
      </h2>

      <div data-home-v2-lesson-selector className="absolute left-[20px] top-[142px] w-[calc(100%_-_40px)]">
        {orderedLessons.map(({ id, item }, index) => {
          const isActive = id === activeLesson.id;
          return (
            <button
              key={id}
              type="button"
              data-lesson-selector-item={id}
              aria-pressed={isActive}
              aria-controls="home-v2-lesson-detail"
              onClick={() => setActiveLessonId(id)}
              className={`relative grid w-full grid-cols-[65px_minmax(0,1fr)_52px] items-center text-left text-[#f6f6f6] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6f6f6] ${index === 0 ? "" : "-mt-[0.88px]"} ${
                isActive
                  ? "z-[1] h-[87.12px] rounded-[3px] border-[2.64px] border-[#ef5533]"
                  : "h-[71.28px] border-[0.88px] border-[#f6f6f6] last:rounded-b-[3px]"
              }`}
            >
              <span className="flex h-full items-center justify-center font-['Bebas_Neue','Arial_Narrow',Arial,sans-serif] text-[28.8px] font-bold leading-[17.912px] text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="relative flex h-full min-w-0 items-center pl-[32px]">
                <Image
                  aria-hidden="true"
                  src={isActive ? "/design/home-v2/lessons/mobile-number-divider-active.svg" : "/design/home-v2/lessons/mobile-number-divider.svg"}
                  alt=""
                  width={1}
                  height={isActive ? 56 : 40}
                  className={`absolute left-0 top-1/2 w-[1px] -translate-y-1/2 ${isActive ? "h-[56px]" : "h-[40px]"}`}
                />
                <span data-lesson-selector-title className="truncate font-[Arial,sans-serif] text-[19.2px] font-bold uppercase leading-[14px]">
                  {item.title}
                </span>
              </span>
              {isActive ? (
                <span data-lesson-selector-arrow-area className="absolute bottom-[1.76px] right-[1.897px] top-[1.76px] flex w-[52.168px] items-center justify-center overflow-hidden rounded-r-[1.4px]">
                  <Image aria-hidden="true" src="/design/home-v2/lessons/mobile-active-item-border.svg" alt="" fill sizes="53px" className="object-fill" />
                  <Image aria-hidden="true" src="/design/home-v2/lessons/mobile-item-arrow.svg" alt="" width={10} height={24} className="relative z-10 h-[24px] w-[10px]" />
                </span>
              ) : (
                <span aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      <MobileEnLessonDetail
        item={activeLesson.item}
        image={activeLesson.image}
        isBookingLesson={bookingLessonIds.has(activeLesson.id)}
        links={links}
        onBookingClick={onBookingClick}
        onMessengerClick={onMessengerClick}
        t={t}
      />
    </div>
  );
}

function LessonDetailPanel({
  item,
  image,
  t,
  isBookingLesson,
  links,
  onBookingClick,
  onMessengerClick,
  reduceMotion,
  enableMotion,
  lang,
}) {
  const panelEase = [0.2, 0.7, 0.2, 1];
  const textMotion = (delay = 0) => ({
    initial: false,
    animate: reduceMotion || !enableMotion ? { opacity: 1, x: 0 } : { opacity: [0, 1], x: [10, 0] },
    transition: { duration: reduceMotion ? 0.08 : 0.28, delay: reduceMotion ? 0 : delay, ease: panelEase },
  });

  return (
    <div id="home-v2-lesson-detail" data-home-v2-lesson-detail className="relative h-[720px] min-[900px]:h-[615px]">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-2 right-0 top-2 hidden min-[900px]:block"
        style={{ backgroundColor: "var(--home-v2-deep-teal)" }}
      />
      <article className="relative grid h-[calc(100%_-_8px)] w-full grid-rows-[280px_minmax(0,1fr)] overflow-hidden rounded-[3px] border-[2px] border-epicWhite/70 bg-epicDark shadow-[var(--home-v2-hard-shadow)] min-[900px]:w-[calc(100%_-_8px)] min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] min-[900px]:grid-rows-none min-[1200px]:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]">
        <div className="relative h-full overflow-hidden bg-epicGray">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={image}
              className="absolute inset-0"
              initial={false}
              animate={reduceMotion || !enableMotion ? { opacity: 1, scale: 1 } : { opacity: [0, 1], scale: [1.02, 1] }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: reduceMotion ? 0.08 : 0.3, ease: panelEase }}
            >
              <Image
                data-lessons-photo
                src={image}
                alt={item.title}
                fill
                sizes="(min-width: 1280px) 310px, (min-width: 1024px) 24vw, 100vw"
                className="object-cover contrast-[1.02] saturate-[0.86]"
                priority={item.id === "group"}
              />
              <div className="absolute inset-0 bg-epicDark/8" aria-hidden="true" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative min-h-0 bg-epicDark text-epicWhite">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={item.id}
              className="absolute inset-0 flex min-h-0 flex-col px-6 py-5 sm:px-8 sm:py-6 min-[900px]:px-5 min-[900px]:py-6 min-[1200px]:px-7 min-[1200px]:py-7"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.08 : 0.18, ease: panelEase }}
            >
              <motion.h3 {...textMotion(0)} className="text-center text-[30px] font-bold uppercase leading-[0.95] sm:text-[34px] min-[900px]:text-[clamp(24px,2.3vw,32px)]">
                {item.title}
              </motion.h3>
              <motion.p {...textMotion(0.035)} className="mt-3 text-center text-[16px] font-normal leading-none text-[#3d535a] sm:text-[18px]">
                {(desktopLessonCopy[lang] || desktopLessonCopy.en).audience[item.id] || item.badge}
              </motion.p>
              <motion.p {...textMotion(0.09)} className="mt-4 text-center text-[13px] font-normal leading-[1.55] text-epicWhite/90 sm:text-sm min-[900px]:leading-6">
                {item.desc}
              </motion.p>
              <motion.div {...textMotion(0.11)} data-home-v2-lesson-price className="mx-auto mt-4 flex min-h-12 w-full max-w-[240px] items-center justify-center rounded-[3px] bg-[var(--home-v2-deep-teal)] px-4 text-center text-[22px] font-normal leading-none text-epicWhite">
                {item.price}
              </motion.div>
              <motion.div {...textMotion(0.12)} data-home-v2-lesson-features className="mx-auto mt-4 flex h-[60px] w-[214px]">
                {desktopLessonFeatures.map((feature, index) => (
                  <DesktopLessonFeature
                    key={(desktopLessonCopy[lang] || desktopLessonCopy.en).features[index]}
                    feature={feature}
                    label={(desktopLessonCopy[lang] || desktopLessonCopy.en).features[index]}
                    index={index}
                    isRu={lang === "ru"}
                  />
                ))}
              </motion.div>
              <motion.div {...textMotion(0.14)} className="mt-auto pt-4">
                {isBookingLesson ? (
                  <PosterButton
                    data-home-v2-booking-cta
                    onClick={() => onBookingClick(item)}
                    className="w-full border-0 bg-epicRed text-epicDark shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicDark"
                  >
                    {t.btnBook}
                  </PosterButton>
                ) : (
                  <PosterLink
                    data-home-v2-booking-cta
                    href={links.whatsapp}
                    onClick={(event) => onMessengerClick(event, item)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full border-0 bg-epicRed text-epicDark shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicDark"
                  >
                    {t.btnBook}
                  </PosterLink>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </article>
    </div>
  );
}

export function HomeV2Lessons({ t, lang, links, openBookingModal }) {
  const [activeLessonId, setActiveLessonId] = useState("group");
  const [presentation, setPresentation] = useState("mobile");
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const cardsById = new Map(t.cards.map((item) => [item.id, item]));
  const orderedLessons = lessonPresentationOrder.map((presentation) => {
    const item = cardsById.get(presentation.id);
    if (!item) {
      throw new Error("Home V2 lesson presentation is missing service: " + presentation.id);
    }

    return { ...presentation, item };
  });
  const activeLesson = orderedLessons.find(({ id }) => id === activeLessonId) || orderedLessons[0];
  const titleWords = t.sectionTitle.trim().split(/\s+/);
  const lessonHeadingLines = [titleWords[0], [...titleWords.slice(1), t.sectionTitleRide].join(" ")];
  const useApprovedDesktop = presentation === "desktop";
  const useApprovedMobileEn = presentation === "mobile" && lang === "en";

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 639px)");
    const desktopMedia = window.matchMedia("(min-width: 1440px)");
    const updatePresentation = () => setPresentation(desktopMedia.matches ? "desktop" : mobileMedia.matches ? "mobile" : "adaptive");
    updatePresentation();
    mobileMedia.addEventListener("change", updatePresentation);
    desktopMedia.addEventListener("change", updatePresentation);
    return () => {
      mobileMedia.removeEventListener("change", updatePresentation);
      desktopMedia.removeEventListener("change", updatePresentation);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;

    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const getBookingUrl = (item) => links.booking?.[lang]?.[item.id];

  const handleBookingClick = (item) => {
    const bookingUrl = getBookingUrl(item);
    if (!bookingUrl) return;

    openBookingModal(bookingUrl, {
      serviceType: item.id,
      ctaLocation: "home_v2_lessons",
      ctaLabel: item.title,
      lessonId: item.id,
    });
  };

  const handleMessengerClick = (event, item) => {
    const message = lessonMessages[lang]?.[item.id] || lessonMessages.en[item.id] || item.title;

    trackEvent("whatsapp_click", {
      language: lang,
      service_type: item.id,
      cta_location: "home_v2_lessons",
      cta_label: item.title,
      lesson_id: item.id,
    });
    event.currentTarget.href = buildWhatsAppUrl(links.whatsapp, message, {
      language: lang,
      includePartnerCode: false,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="lessons"
      data-home-v2-lessons-block
      data-home-v2-lessons-entered={hasEnteredViewport ? "true" : "false"}
      className={`relative isolate overflow-hidden text-epicWhite scroll-mt-24 ${
        useApprovedDesktop
          ? "h-[843px] bg-[#2e2e2e] p-0"
          : useApprovedMobileEn
            ? "h-[1103px] bg-[#2e2e2e] p-0"
          : "bg-epicDark pb-[var(--home-v2-space-compact)] pt-[var(--home-v2-space-heading)] min-[900px]:pt-[clamp(64px,6.7vw,96px)]"
      }`}
    >
      {!useApprovedDesktop && !useApprovedMobileEn && (
        <>
          <Image
            aria-hidden="true"
            src="/gallery/lesson-5.webp"
            alt=""
            fill
            sizes="52vw"
            className="pointer-events-none absolute inset-0 hidden object-cover object-left grayscale opacity-[0.07] min-[900px]:block"
          />
          <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
        </>
      )}
      <div data-home-v2-lessons-grid className={useApprovedDesktop ? "relative mx-auto h-[843px] w-full" : useApprovedMobileEn ? "relative mx-auto h-[1103px] w-full" : "home-v2-container relative min-[900px]:px-[clamp(16px,1.4vw,20px)]"}>
        {useApprovedDesktop ? (
          <DesktopLessonPresentation
            orderedLessons={orderedLessons}
            activeLesson={activeLesson}
            setActiveLessonId={setActiveLessonId}
            links={links}
            onBookingClick={handleBookingClick}
            onMessengerClick={handleMessengerClick}
            t={t}
            lang={lang}
          />
        ) : useApprovedMobileEn ? (
          <MobileEnLessonPresentation
            orderedLessons={orderedLessons}
            activeLesson={activeLesson}
            setActiveLessonId={setActiveLessonId}
            links={links}
            onBookingClick={handleBookingClick}
            onMessengerClick={handleMessengerClick}
            t={t}
          />
        ) : (
          <>
        <motion.div
          data-home-v2-lessons-adaptive-heading
          className="mb-[var(--home-v2-space-heading)] font-['Montserrat',var(--font-heading)]"
          initial={false}
          animate={hasEnteredViewport && !reduceMotion ? { opacity: [0, 1], y: [14, 0] } : { opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.08 : 0.26, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <h2 className="max-w-full text-[clamp(38px,6vw,48px)] font-black uppercase leading-[0.88] tracking-tight min-[900px]:text-[clamp(34px,calc(10.67px+2.59vw),48px)]">
            {lessonHeadingLines.map((line, index) => (
              <span key={`${line}-${index}`} data-home-v2-heading-line className={`block w-fit max-w-full ${index === 0 ? "text-epicWhite" : "ml-[clamp(28px,6vw,49px)] mt-[clamp(8px,2vw,19px)] whitespace-nowrap text-epicGray"}`}>
                {line}
              </span>
            ))}
          </h2>
        </motion.div>

        <div data-home-v2-lessons-adaptive className="grid gap-[var(--home-v2-space-internal-lg)] min-[900px]:grid-cols-[minmax(280px,clamp(300px,33.82vw,405.9px))_minmax(0,682px)] min-[900px]:items-start min-[900px]:justify-between">
          <motion.div
            data-home-v2-lesson-selector
            className="grid"
            initial={false}
            animate={hasEnteredViewport && !reduceMotion ? { opacity: [0, 1], x: [-16, 0] } : { opacity: 1, x: 0 }}
            transition={{ duration: reduceMotion ? 0.08 : 0.32, delay: reduceMotion ? 0 : 0.07, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {orderedLessons.map(({ id, item }, index) => {
              const isActive = id === activeLesson.id;
              return (
                <button
                  key={id}
                  type="button"
                  data-lesson-selector-item={id}
                  aria-pressed={isActive}
                  aria-controls="home-v2-lesson-detail"
                  onClick={() => setActiveLessonId(id)}
                  className={[
                    "group relative -mt-px grid w-full grid-cols-[64px_minmax(0,1fr)_56px] items-center text-left text-epicWhite first:mt-0 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicWhite min-[900px]:grid-cols-[clamp(64px,6.3vw,76px)_minmax(0,1fr)_clamp(54px,5vw,60px)]",
                    isActive
                      ? "z-[1] min-h-[88px] rounded-[3px] border-[3px] border-epicRed min-[900px]:min-h-[clamp(98px,9.1vw,109px)]"
                      : "min-h-[72px] border border-epicWhite/75 hover:border-epicRed/70 min-[900px]:min-h-[clamp(80px,7.45vw,89px)]",
                  ].join(" ")}
                >
                  <span className="relative z-[1] flex h-[70%] items-center justify-center border-r border-epicWhite/75 font-['Bebas_Neue','Arial_Narrow',Arial,sans-serif] text-[clamp(27px,3vw,36px)] font-bold leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="relative z-[1] flex h-full min-w-0 items-center justify-center px-3 text-center font-[Arial,sans-serif] text-[clamp(16px,2.3vw,24px)] font-bold uppercase leading-tight">
                    <span data-lesson-selector-title className="block">{item.title}</span>
                  </span>
                  <span className={`relative z-[1] flex h-full items-center justify-center border-l border-epicWhite/45 ${isActive ? "bg-epicGray" : ""}`}>
                    {isActive && <Image aria-hidden="true" src="/design/home-v2/lessons/lesson-selector-arrow.svg" alt="" width={30} height={12} className="h-3 w-[30px]" />}
                  </span>
                </button>
              );
            })}
          </motion.div>

          <motion.div
            className="min-[900px]:-mt-[clamp(100px,9.3vw,134px)]"
            initial={false}
            animate={hasEnteredViewport && !reduceMotion ? { opacity: [0, 1], x: [16, 0] } : { opacity: 1, x: 0 }}
            transition={{ duration: reduceMotion ? 0.08 : 0.32, delay: reduceMotion ? 0 : 0.14, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <LessonDetailPanel
              item={activeLesson.item}
              image={activeLesson.image}
              t={t}
              isBookingLesson={bookingLessonIds.has(activeLesson.id)}
              links={links}
              onBookingClick={handleBookingClick}
              onMessengerClick={handleMessengerClick}
              reduceMotion={reduceMotion}
              enableMotion={hasEnteredViewport && !reduceMotion}
              lang={lang}
            />
          </motion.div>
        </div>
          </>
        )}
      </div>
    </section>
  );
}

function HomeV2RentalsAdaptive({ lang, catalogHref, copy, onRentNow }) {
  const isRu = lang === "ru";

  return (
    <div
      data-rentals-adaptive
      data-rentals-artboard
      className="block"
    >
      <div className="home-v2-container relative pb-[var(--home-v2-space-standard)] min-[900px]:h-[calc(716px+var(--home-v2-space-standard))] min-[900px]:pb-0">
        <div data-rentals-adaptive-photo className="relative h-[clamp(310px,43vw,366px)] overflow-hidden rounded-[3px] min-[900px]:absolute min-[900px]:inset-x-0 min-[900px]:top-0">
          <Image
            data-rentals-layer="background-photo"
            src="/design/home-v2/rentals/rentals-background-photo.jpg"
            alt="Epic Surf School rental surfboards"
            fill
            priority
            sizes="(min-width: 1200px) 1280px, calc(100vw - 48px)"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-epicDark/10 via-transparent to-epicDark/55" aria-hidden="true" />
        </div>

        <div data-rentals-heading className="absolute left-[clamp(16px,3vw,39px)] top-[clamp(18px,2vw,28px)] h-[clamp(94px,9vw,129px)] w-[clamp(300px,31vw,357px)] text-epicDark">
          <Image aria-hidden="true" src="/design/home-v2/rentals/rentals-heading-paper.svg" alt="" fill sizes="357px" className="object-fill" />
          <h2 aria-label="SURF BOARD RENTALS" className="absolute inset-0 font-['Montserrat',var(--font-heading)] text-[clamp(38px,3.34vw,48px)] font-black uppercase leading-[1.06]">
            <span className="absolute left-[8px] top-0 whitespace-nowrap">SURF BOARD</span>
            <span className="absolute left-[10px] top-[62%] whitespace-nowrap">RENTALS</span>
          </h2>
        </div>

        <div data-rentals-intro className="relative mt-6 rounded-[3px] bg-[rgba(81,81,81,0.9)] px-5 py-3 text-center min-[900px]:absolute min-[900px]:inset-x-0 min-[900px]:top-[405px] min-[900px]:mt-0 min-[900px]:min-h-[30px] min-[900px]:py-0">
          <p className="text-[clamp(15px,1.5vw,20px)] font-normal leading-6 text-white min-[1200px]:whitespace-nowrap min-[1200px]:leading-[30px]">
            {rentalPromoCopy[lang]?.description || rentalPromoCopy.en.description}
          </p>
        </div>

        <div data-rentals-content className="relative mt-6 grid gap-6 rounded-[3px] bg-[rgba(81,81,81,0.9)] p-[clamp(24px,4vw,48px)] min-[900px]:absolute min-[900px]:left-1/2 min-[900px]:top-[493px] min-[900px]:mt-0 min-[900px]:h-[223px] min-[900px]:w-[min(909px,calc(100%-80px))] min-[900px]:-translate-x-1/2 min-[900px]:grid-cols-[minmax(0,1fr)_214px] min-[900px]:items-center min-[900px]:px-[clamp(32px,5vw,60px)] min-[900px]:py-[34px]">
          <div className="min-w-0">
            <div data-rentals-price-block className="flex flex-wrap items-end gap-x-3 font-[Arial,sans-serif] font-bold uppercase">
              <span className="w-full text-[clamp(18px,1.7vw,25px)] leading-none text-epicWhite/75">{copy.from}</span>
              <span className="mt-3 text-[clamp(52px,4.6vw,66px)] leading-none text-epicRed">250.000</span>
              <span className="text-[clamp(22px,2.2vw,32px)] leading-none text-epicWhite/75">VND</span>
              <span className="text-[clamp(20px,2.15vw,31px)] leading-none text-white">{isRu ? "/ 2 ЧАСА" : "/ 2 HOURS"}</span>
            </div>
            <div data-rentals-offer-description className="mt-4">
              <p className="text-[clamp(15px,1.3vw,19px)] font-normal leading-[22px] text-epicWhite">{copy.description}</p>
              <p className="mt-2 text-[14px] font-normal leading-[22px] text-epicWhite/75">{copy.term}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <Link
              data-home-v2-rental-catalog-cta
              href={catalogHref}
              className="flex min-h-14 items-center justify-center rounded-[3px] bg-[var(--home-v2-deep-teal)] px-4 text-center text-[clamp(15px,1.6vw,19px)] font-bold uppercase leading-tight text-epicWhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicWhite"
            >
              {copy.chooseBoard}
            </Link>
            <button
              type="button"
              data-home-v2-rental-cta
              onClick={onRentNow}
              className="flex min-h-14 items-center justify-center rounded-[3px] bg-epicRed px-4 text-[clamp(15px,1.6vw,19px)] font-bold uppercase leading-tight text-epicDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicWhite"
            >
              {copy.rentNow}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeV2Rentals({ lang, setRentalModalOpen }) {
  const catalogHref = lang === "ru" ? "/ru/surfboard-rental-danang" : "/surfboard-rental-danang";
  const copy = rentalPosterCopy[lang] || rentalPosterCopy.en;
  const presentation = useHomeV2Presentation();

  const handleGenericRentalClick = () => {
    trackEvent("rental_cta_click", {
      language: lang,
      service_type: "board_rental",
      cta_location: "home_v2_rental_section",
      cta_label: "rent_now",
    });
    setRentalModalOpen(true);
  };

  return (
    <section
      id="rentals"
      data-home-v2-rentals-block
      data-surf-stack-scene="rental"
      className="relative isolate overflow-visible bg-transparent text-epicWhite scroll-mt-24"
    >
      <div
        data-rental-visual-composition
        className="relative mx-auto w-full min-[1440px]:h-[900px] min-[1440px]:max-w-none"
      >
          {presentation === "desktop" && <div
            data-rentals-artboard
            data-rentals-desktop
            data-rentals-desktop-en
            className="absolute left-1/2 top-0 h-[900px] w-[1440px] -translate-x-1/2 overflow-hidden bg-[#2e2e2e]"
          >
            <div aria-hidden="true" className="absolute left-0 top-0 h-[810px] w-[1440px]">
              <Image
                data-rentals-layer="background-overlay"
                src="/design/home-v2/rentals/rentals-background-overlay.png"
                alt=""
                fill
                sizes="1440px"
                className="object-cover object-bottom opacity-[0.22]"
              />
            </div>

            <div aria-hidden="true" className="absolute left-0 top-0 h-[366px] w-[1440px] overflow-hidden opacity-[0.82]">
              <Image
                data-rentals-layer="background-photo"
                src="/design/home-v2/rentals/rentals-background-photo.jpg"
                alt=""
                width={4096}
                height={2304}
                sizes="1440px"
                className="absolute left-0 top-[-0.37px] h-[810.76px] w-[1440px] max-w-none"
                priority
              />
            </div>

            <div data-rentals-heading className="absolute left-[118.68px] top-[27.54px] h-[129.406px] w-[356.645px] text-[#2e2e2e]">
              <Image
                aria-hidden="true"
                src="/design/home-v2/rentals/rentals-heading-paper.svg"
                alt=""
                fill
                sizes="357px"
                className="object-fill"
              />
              <h2 aria-label="SURF BOARD RENTALS" className="absolute inset-0 font-['Montserrat',var(--font-heading)] text-[48px] font-black uppercase leading-[50.811px]">
                <span className="absolute left-[7.89px] top-[-2.25px] block w-[365.78px] origin-center -rotate-[0.89deg] -skew-x-[0.52deg] whitespace-nowrap">
                  SURF BOARD
                </span>
                <span className="absolute left-[9.77px] top-[79.74px] block w-[241.71px] -skew-x-[0.35deg] whitespace-nowrap">
                  RENTALS
                </span>
              </h2>
            </div>

            <div data-rentals-intro className="absolute left-[99.5px] top-[405px] h-[30px] w-[1241px] rounded-[3px] bg-[rgba(81,81,81,0.82)]">
              <p className={`absolute top-[-3px] whitespace-nowrap font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[20px] font-normal leading-[32px] text-white ${lang === "ru" ? "left-0 w-full text-center" : "left-[14.5px]"}`}>
                 {rentalPromoCopy[lang]?.description || rentalPromoCopy.en.description}
              </p>
            </div>

            <div data-rentals-content className="absolute left-[265px] top-[493px] h-[223px] w-[909px] rounded-[3px] bg-[rgba(81,81,81,0.82)]">
              <div data-rentals-price-block className="absolute inset-0 font-[Arial,sans-serif] font-bold uppercase">
                <span className="absolute left-[60px] top-[34.84px] text-[24.786px] leading-[10.327px] text-[rgba(246,246,246,0.75)]">{copy.from}</span>
                <span className="absolute left-[57px] top-[72.65px] text-[66.096px] leading-[50.811px] text-[#fe746a]">250.000</span>
                <span className="absolute left-[308px] top-[83.00px] text-[33.048px] leading-[50.811px] text-[rgba(246,246,246,0.75)]">VND</span>
                 <span className={`absolute left-[389px] top-[83.00px] whitespace-nowrap leading-[50.811px] text-white ${lang === "ru" ? "text-[28px]" : "text-[33.048px]"}`}>{lang === "ru" ? "/ 2 ЧАСА" : "/ 2 HOURS"}</span>
              </div>

              <div data-rentals-offer-description className="absolute left-[60px] top-[148px] font-['Segoe_UI','Segoe_UI',Arial,sans-serif]">
                <p className={`h-[19px] font-normal leading-[22.032px] text-[#f6f6f6] ${lang === "ru" ? "w-[520px] text-[18px]" : "w-[388px] text-[19.278px]"}`}>{copy.description}</p>
                <p className="mt-[11px] text-[15.147px] font-normal leading-[22.032px] text-[rgba(246,246,246,0.75)]">{copy.term}</p>
              </div>

              <Link
                data-home-v2-rental-catalog-cta
                href={catalogHref}
                className="absolute left-[641px] top-[41px] flex h-[56px] w-[214px] items-center justify-center rounded-[3px] bg-[#395962] font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[19.474px] font-bold uppercase leading-[21.638px] tracking-[0.3787px] text-[#f6f6f6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6f6f6]"
              >
                {copy.chooseBoard}
              </Link>
              <button
                type="button"
                data-home-v2-rental-cta
                onClick={handleGenericRentalClick}
                className="absolute left-[641px] top-[120px] flex h-[56px] w-[214px] items-center justify-center rounded-[3px] bg-[#fe746a] font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[19.474px] font-bold uppercase leading-[21.638px] tracking-[0.3787px] text-[#2e2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6f6f6]"
              >
                {copy.rentNow}
              </button>
            </div>
          </div>}

        {presentation === "mobile" && lang === "en" && (
          <div
            data-rentals-mobile-en
            data-rentals-artboard
            className="relative h-[790px] w-full overflow-hidden bg-[#2e2e2e]"
          >
            <Image
              data-rentals-layer="background-photo"
              src="/design/home-v2/rentals/rentals-background-photo.jpg"
              alt="Epic Surf School rental surfboards"
              width={501}
              height={283}
              sizes="501px"
              className="absolute left-1/2 top-0 h-[283px] w-[501px] max-w-none -translate-x-1/2 object-fill"
              priority
            />

            <div
              data-rentals-heading
              className="absolute left-[31.195px] top-[-5px] h-[63.124px] w-[351.842px] text-[#2e2e2e]"
            >
              <Image
                aria-hidden="true"
                src="/design/home-v2/rentals/mobile-heading-paper-artwork.svg"
                alt=""
                width={330}
                height={32}
                sizes="330px"
                className="absolute left-0 top-[17.229px] h-[31.432px] w-[329.251px] max-w-none"
              />
              <h2 aria-label="SURF BOARD RENTALS" className="absolute inset-0 font-['Montserrat',var(--font-heading)] text-[24px] font-black uppercase leading-[30.487px]">
                <span className="absolute left-[2.805px] top-[19.669px] whitespace-nowrap">SURF BOARD</span>
                <span className="absolute left-[206.66px] top-[19.669px] whitespace-nowrap">RENTALS</span>
              </h2>
            </div>

            <div
              data-rentals-content
              data-rentals-mobile-content
              data-rentals-offer-surface
              className="absolute left-[17px] right-[23px] top-[304px] h-[310px] sm:right-[17px]"
            >
              <Image
                aria-hidden="true"
                src="/design/home-v2/rentals/mobile-offer-surface.svg"
                alt=""
                fill
                sizes="350px"
                className="object-fill"
              />

              <div data-rentals-price-block className="absolute left-[38px] top-[30px] h-[36.65px] w-[280px] font-bold uppercase">
                <span className="absolute left-0 top-[12px] h-[10.328px] w-[77.112px] font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[18px] leading-[10.328px] text-[rgba(246,246,246,0.75)]">{copy.from}</span>
                <span className="absolute left-[77px] top-[8px] h-[20px] w-[133px] font-[Arial,sans-serif] text-[36px] leading-[20.325px] text-[#fe746a]">250.000</span>
                <span className="absolute left-[220px] top-0 h-[17.35px] w-[28.366px] font-[Arial,sans-serif] text-[12px] leading-[20.325px] text-[rgba(246,246,246,0.75)]">VND</span>
                <span className="absolute left-[219px] top-[15.65px] h-[21px] whitespace-nowrap font-[Arial,sans-serif] text-[12px] leading-[20.325px] text-white">/ 2 HOURS</span>
              </div>

              <p
                data-rentals-offer-description
                className="absolute left-[53px] top-[92px] h-[39px] w-[256px] text-center font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[24px] font-normal leading-[22.032px] text-[#f6f6f6]"
              >
                Shortboards, funboards,<br />softboards and more
              </p>

              <Link
                data-home-v2-rental-catalog-cta
                href={catalogHref}
                className="absolute left-[73px] top-[167px] flex h-[48px] w-[210px] items-center justify-center rounded-[3px] bg-[#395962] font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[19.474px] font-bold uppercase leading-[21.638px] tracking-[0.3787px] text-[#f6f6f6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6f6f6]"
              >
                {copy.chooseBoard}
              </Link>
              <button
                type="button"
                data-home-v2-rental-cta
                onClick={handleGenericRentalClick}
                className="absolute left-[73px] top-[232px] flex h-[48px] w-[210px] items-center justify-center rounded-[3px] bg-[#fe746a] font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[19.474px] font-bold uppercase leading-[21.638px] tracking-[0.3787px] text-[#2e2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6f6f6]"
              >
                {copy.rentNow}
              </button>
            </div>

            <div
              data-rentals-intro
              data-rentals-intro-surface
              className="absolute left-[17px] right-[23px] top-[635px] h-[155px] sm:right-[17px]"
            >
              <Image
                aria-hidden="true"
                src="/design/home-v2/rentals/mobile-intro-surface.svg"
                alt=""
                fill
                sizes="350px"
                className="object-fill"
              />
              <p
                data-rentals-intro-description
                className="absolute left-[35px] top-[10px] h-[128px] w-[280px] text-center font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[16px] font-normal leading-[32px] text-white max-[374px]:left-[26px]"
              >
                Board rental in Da Nang with delivery<br />
                or pickup in a convenient city spot.<br />
                We help match the board to your level<br />
                and the day&apos;s conditions.
              </p>
            </div>
          </div>
        )}

        {presentation !== null && presentation !== "desktop" && !(presentation === "mobile" && lang === "en") && (
          <HomeV2RentalsAdaptive lang={lang} catalogHref={catalogHref} copy={copy} onRentNow={handleGenericRentalClick} />
        )}
      </div>
    </section>
  );
}

function HomeV2IncludedAdaptive({ items, subtitle, accentTitle }) {
  const assetByIcon = {
    camera: "/design/home-v2/included/included-icon-photos-videos.svg",
    zinc: "/design/home-v2/included/included-icon-zinc-spf.svg",
    board: "/design/home-v2/included/included-icon-board.svg",
    rashguard: "/design/home-v2/included/included-icon-rashguard.svg",
  };

  const itemByIcon = new Map(items.map((item) => [item.icon, item]));
  const orderedItems = ["camera", "zinc", "board", "rashguard"].map((icon) => itemByIcon.get(icon)).filter(Boolean);

  return (
    <div
      data-home-v2-included-adaptive
      className="block"
    >
      <div className="home-v2-container pb-[calc(var(--home-v2-space-compact)-24px)] md:pb-[calc(var(--home-v2-space-compact)-32px)]">
        <div data-home-v2-included-adaptive-grid className="grid grid-cols-2 gap-x-[var(--home-v2-space-internal)] gap-y-10 min-[900px]:grid-cols-4 min-[900px]:gap-x-[clamp(18px,2.5vw,34px)]">
          {orderedItems.map((item) => (
            <article key={item.icon} data-home-v2-included-adaptive-feature={item.icon} className="flex min-w-0 flex-col items-center text-center text-epicWhite">
              <div className={`relative flex items-center justify-center ${item.icon === "board" ? "h-[clamp(160px,22vw,300px)] w-[clamp(160px,22vw,300px)]" : "h-[clamp(132px,20vw,210px)] w-[clamp(132px,20vw,210px)]"}`}>
                <Image
                  data-home-v2-included-adaptive-icon={item.icon}
                  src={assetByIcon[item.icon]}
                  alt=""
                  width={210}
                  height={210}
                  className={`h-full w-full object-contain ${item.icon === "board" ? "rotate-[21deg]" : ""}`}
                />
              </div>
              <h3 className="mt-4 text-[clamp(16px,2.2vw,21px)] font-black uppercase leading-tight">{item.label}</h3>
              <p className="mt-3 max-w-[220px] text-[clamp(12px,1.5vw,15px)] font-normal leading-[1.45] text-epicWhite/88">{item.desc}</p>
            </article>
          ))}
        </div>

        <div data-home-v2-included-adaptive-message className="mt-[var(--home-v2-space-heading)] grid items-center gap-6 border-t border-epicWhite/25 pt-[var(--home-v2-space-heading)] min-[900px]:grid-cols-[minmax(220px,0.32fr)_minmax(0,0.68fr)] min-[900px]:gap-10">
          <p className="whitespace-pre-line text-center text-[clamp(24px,3vw,32px)] font-black uppercase leading-[1.05] text-epicMint min-[900px]:text-left">{accentTitle}</p>
          <p className="text-center text-[clamp(18px,2.5vw,32px)] font-normal leading-[1.35] text-epicWhite min-[900px]:text-left">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export function HomeV2Included({ t }) {
  const isRu = t.includedLabel !== "Included";
  const presentation = useHomeV2Presentation();
  const includedByIcon = new Map(t.includedItems.map((item) => [item.icon, item]));
  const photosItem = includedByIcon.get("camera");
  const zincItem = includedByIcon.get("zinc");
  const boardItem = includedByIcon.get("board");
  const rashguardItem = includedByIcon.get("rashguard");
  const includedCalloutLines = t.includedAccentTitle.split("\n");
  return (
    <section
      id="included"
      data-home-v2-included
      className={`relative isolate overflow-hidden bg-epicDark text-epicWhite scroll-mt-0 min-[1440px]:!h-[639px] min-[1440px]:px-0 min-[1440px]:py-0 min-[1440px]:shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${isRu ? "" : "h-[746px] px-0 py-0 sm:h-auto"}`}
    >
        {presentation === "desktop" && <div data-home-v2-included-desktop data-home-v2-included-desktop-en className="relative left-1/2 h-[639px] w-[1440px] -translate-x-1/2 overflow-hidden bg-[#2e2e2e]">
          <div data-home-v2-included-features className="absolute inset-0">
            <article data-home-v2-included-feature="photos-videos" className="absolute left-[144px] top-[9px] h-[309px] w-[204px] text-center">
              <Image src="/design/home-v2/included/included-icon-photos-videos.svg" alt="" width={200} height={200} className="absolute left-[2px] top-0 h-[200px] w-[200px]" />
              <h3 className={`absolute left-0 top-[237px] flex h-[28px] w-[204px] items-center justify-center font-['Montserrat',var(--font-heading)] font-black uppercase leading-[22px] text-[#f6f6f6] ${isRu ? "text-[18px]" : "text-[21.503px]"}`}>
                {photosItem.label}
              </h3>
              <p className="absolute left-[5px] top-[267px] flex h-[42px] w-[194px] items-center justify-center font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[14.783px] font-normal leading-[21.503px] text-[#f6f6f6]">
                {photosItem.desc}
              </p>
            </article>

            <article data-home-v2-included-feature="zinc-spf" className="absolute left-[440.52px] top-[3.52px] h-[316px] w-[211px] text-center">
              <div className="absolute left-0 top-0 flex h-[210.951px] w-[210.951px] items-center justify-center overflow-hidden">
                <Image src="/design/home-v2/included/included-icon-zinc-spf.svg" alt="" width={205.403} height={205.403} className="h-[205.403px] w-[205.403px] -rotate-[1.57deg]" />
              </div>
              <h3 className={`absolute top-[232px] flex h-[38px] items-center justify-center font-['Montserrat',var(--font-heading)] font-black uppercase leading-[22px] text-[#f6f6f6] ${isRu ? "left-[24px] w-[163px] text-[18px]" : "left-[49.48px] w-[111px] text-[21.503px]"}`}>
                {zincItem.label}
              </h3>
              <p className="absolute left-[24.48px] top-[273.48px] flex h-[42px] w-[163px] items-center justify-center font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[14.783px] font-normal leading-[21.503px] text-[#f6f6f6]">
                {zincItem.desc}
              </p>
            </article>

            <article data-home-v2-included-feature="board" className="absolute left-[702.07px] top-[-50.93px] h-[371px] w-[334px] text-center">
              <div className="absolute left-0 top-0 flex h-[333.864px] w-[333.864px] items-center justify-center overflow-hidden">
                <Image data-home-v2-included-board-icon src="/design/home-v2/included/included-icon-board.svg" alt="" width={258.404} height={258.404} className="h-[258.404px] w-[258.404px] rotate-[21.01deg]" />
              </div>
              <h3 className={`absolute flex items-center justify-center font-['Montserrat',var(--font-heading)] font-black uppercase text-[#f6f6f6] ${isRu ? "left-[94px] top-[296.93px] h-[18px] w-[150px] text-[18px] leading-[22px]" : "left-[126.89px] top-[296.93px] h-[14.111px] w-[87px] text-[21.503px] leading-[49.59px]"}`}>
                {boardItem.label}
              </h3>
              <p className="absolute left-[79.89px] top-[322.93px] flex h-[47.946px] w-[183px] items-center justify-center font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[14.783px] font-normal leading-[21.503px] text-[#f6f6f6]">
                {boardItem.desc}
              </p>
            </article>

            <article data-home-v2-included-feature="rashguard" className="absolute left-[1093px] top-[16px] h-[302px] w-[200px] text-center">
              <Image src="/design/home-v2/included/included-icon-rashguard.svg" alt="" width={200} height={200} className="absolute left-0 top-0 h-[200px] w-[200px]" />
              <h3 className={`absolute flex items-center justify-center font-['Montserrat',var(--font-heading)] font-black uppercase text-[#f6f6f6] ${isRu ? "left-[15px] top-[223px] h-[22px] w-[170px] text-[18px] leading-[22px]" : "left-[24px] top-[223px] h-[14.111px] w-[152px] text-[21.503px] leading-[49.59px]"}`}>
                {rashguardItem.label}
              </h3>
              <p className="absolute left-[23px] top-[262px] flex h-[36.683px] w-[155px] items-center justify-center font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[14.783px] font-normal leading-[21.503px] text-[#f6f6f6]">
                {rashguardItem.desc}
              </p>
            </article>
          </div>

          <div data-home-v2-included-message className="absolute inset-0">
            <div data-home-v2-included-callout className="absolute left-[207px] top-[421px] h-[65px] w-[208px] font-['Montserrat',var(--font-heading)] text-[28px] font-black uppercase text-[#aaffc7]">
              <p className={`absolute top-0 h-[17px] -translate-y-[17px] whitespace-nowrap leading-[49.59px] ${isRu ? "left-[-18px] text-[23px]" : "left-[19.55px]"}`}>{includedCalloutLines[0]}</p>
              <p className={`absolute top-[40.82px] h-[17px] -translate-y-[17px] whitespace-nowrap leading-[49.59px] ${isRu ? "left-[-18px] text-[23px]" : "left-[0.36px]"}`}>{includedCalloutLines[1]}</p>
            </div>
            <p data-home-v2-included-description className="absolute left-[452.2px] top-[330px] flex h-[227px] w-[781px] items-center justify-center text-center font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[36px] font-normal leading-[40px] text-[#f6f6f6]">
              {t.includedSubtitle}
            </p>
          </div>

          <div data-home-v2-included-marquee className="absolute left-0 top-[539px] h-[30px] w-[1440px] overflow-hidden">
            <div data-home-v2-included-marquee-track className="absolute left-0 top-0 h-[40px] w-[2307px]">
              {[0, 280, 560, 840, 1120, 1400, 1740, 2090].map((left, index) => (
                <div
                  key={left}
                  data-home-v2-included-marquee-repeat
                  className={`absolute top-0 h-[30.094px] w-[216.973px] overflow-hidden ${index === 1 || index === 3 || index >= 5 ? "rotate-180" : ""}`}
                  style={{ left }}
                >
                  <Image src="/design/home-v2/included/included-surf-school-logo.svg" alt="" width={216.798} height={29.965} className="h-[29.965px] w-[216.798px]" />
                </div>
              ))}
            </div>
          </div>
        </div>}

      {presentation === "mobile" && !isRu && (
        <div
          data-home-v2-included-mobile-en
          data-home-v2-included-grid
          className="relative left-1/2 h-[746px] w-[390px] max-w-none -translate-x-1/2 overflow-hidden bg-[#2e2e2e]"
        >
          <article data-home-v2-included-mobile-feature="photos-videos" className="absolute left-[30px] top-[26px] h-[183.513px] w-[122.122px] text-center">
            <div data-home-v2-included-mobile-icon-circle="photos-videos" className="absolute left-[1.2px] top-0 h-[120px] w-[120px]">
              <Image data-home-v2-included-mobile-icon-artwork="photos-videos" src="/design/home-v2/included/mobile/feature-icon-450-227.svg" alt="" width={120} height={120} className="h-[120px] w-[120px]" />
            </div>
            <h3 className="absolute left-0 top-[137px] flex h-[24px] w-[122.122px] items-center justify-center font-['Montserrat',var(--font-heading)] text-[12.9015px] font-black uppercase leading-[13.2px] text-[#f6f6f6]">PHOTOS/VIDEOS</h3>
            <p className="absolute left-[3.029px] top-[159.592px] flex h-[24.838px] w-[116.453px] items-center justify-center font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[8.8698px] font-normal leading-[12.9015px] text-[#f6f6f6]">We capture the best moments your lesson.</p>
          </article>

          <article data-home-v2-included-mobile-feature="zinc-spf" className="absolute left-[232px] top-[26px] h-[184.438px] w-[126.571px] text-center">
            <div data-home-v2-included-mobile-icon-circle="zinc-spf" className="absolute left-0 top-0 h-[126.571px] w-[126.571px]">
              <Image data-home-v2-included-mobile-icon-artwork="zinc-spf" src="/design/home-v2/included/mobile/feature-icon.svg" alt="" width={127} height={127} className="absolute left-0 top-0 h-[126.571px] w-[126.571px]" />
            </div>
            <h3 className="absolute left-[29.001px] top-[132px] flex h-[22.8px] w-[66.6px] items-center justify-center font-['Montserrat',var(--font-heading)] text-[12.9015px] font-black uppercase leading-[13.2px] text-[#f6f6f6]">ZINC/SPF</h3>
            <p className="absolute left-[14px] top-[159.6px] flex h-[24.838px] w-[97.561px] items-center justify-center font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[8.8698px] font-normal leading-[12.9015px] text-[#f6f6f6]">Strong face protection for tropical sun.</p>
          </article>

          <article data-home-v2-included-mobile-feature="board" className="absolute left-[-10px] top-[212px] h-[222.527px] w-[200.318px] text-center">
            <div data-home-v2-included-mobile-icon-circle="board" className="absolute left-0 top-0 h-[200.318px] w-[200.318px]">
              <Image data-home-v2-included-mobile-icon-artwork="board" src="/design/home-v2/included/mobile/feature-icon-450-264.svg" alt="" width={191} height={201} className="absolute left-[10px] top-0 h-[200.318px] w-[190.318px] max-w-none" />
            </div>
            <h3 className="absolute left-[76.139px] top-[170.159px] flex h-[18px] w-[52.362px] items-center justify-center font-['Montserrat',var(--font-heading)] text-[12.9015px] font-black uppercase leading-[13.2px] text-[#f6f6f6]">BOARD</h3>
            <p className="absolute left-[47.939px] top-[193.759px] flex h-[28.768px] w-[109.75px] items-center justify-center font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[8.8698px] font-normal leading-[12.9015px] text-[#f6f6f6]">Softboard matched to your level, height and weight.</p>
          </article>

          <article data-home-v2-included-mobile-feature="rashguard" className="absolute left-[238px] top-[252px] h-[182.527px] w-[120px] text-center">
            <div data-home-v2-included-mobile-icon-circle="rashguard" className="absolute left-0 top-0 h-[120px] w-[120px]">
              <Image data-home-v2-included-mobile-icon-artwork="rashguard" src="/design/home-v2/included/mobile/icon-artwork-450-250.svg" alt="" width={120} height={120} className="h-[120px] w-[120px]" />
            </div>
            <h3 className="absolute left-[16.18px] top-[127.8px] flex h-[18px] w-[90.895px] items-center justify-center font-['Montserrat',var(--font-heading)] text-[12.9015px] font-black uppercase leading-[13.2px] text-[#f6f6f6]">RASHGUARD</h3>
            <p className="absolute left-[15.58px] top-[157.2px] flex h-[22.01px] w-[92.908px] items-center justify-center font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[8.8698px] font-normal leading-[12.9015px] text-[#f6f6f6]">Clean lycra for sun and rash protection.</p>
          </article>

          <div data-home-v2-included-mobile-callout className="absolute left-[113.612px] top-[496px] h-[57px] w-[163.052px] font-['Montserrat',var(--font-heading)] text-[22px] font-black uppercase text-[#aaffc7]">
            <p className="absolute left-[15.486px] top-0 flex h-[22px] w-[123.942px] items-center justify-center whitespace-nowrap leading-[22px]">NO GEAR?</p>
            <p className="absolute left-[0.388px] top-[40.813px] flex h-[22px] w-[162.638px] items-center justify-center whitespace-nowrap leading-[22px]">NO PROBLEM</p>
          </div>

          <p data-home-v2-included-mobile-description className="absolute left-[57px] top-[595px] h-[88px] w-[276.249px] text-center font-['Segoe_UI','Segoe_UI',Arial,sans-serif] text-[18px] font-normal leading-[40px] text-[#f6f6f6]">
            We prepare the essentials for your<br />lesson: board, rashguard, sun<br />protection and photos/videos.
          </p>
        </div>
      )}

      {presentation !== null && presentation !== "desktop" && !(presentation === "mobile" && !isRu) && (
        <HomeV2IncludedAdaptive items={t.includedItems} subtitle={t.includedSubtitle} accentTitle={t.includedAccentTitle} />
      )}
    </section>
  );
}
