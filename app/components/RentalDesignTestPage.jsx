"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
} from "lucide-react";
import Footer from "./Footer";
import RentalModal from "./RentalModal";
import { FacebookIcon, InstagramIcon } from "./Icons";
import { links } from "../data/links";
import { liveCam } from "../data/liveCam";
import {
  boardLevelLabels,
  boardTypeLabels,
  getBoardLevelLabel,
  getBoardTrackingPayload,
  getBoardTypeLabel,
  getLocalizedBoard,
  rentalBoards,
} from "../data/rentalBoards";
import { translations } from "../data/translations";
import {
  buildTelegramUrl,
  buildWhatsAppUrl,
  buildZaloUrl,
  storeAttributionFromUrl,
  trackEvent,
} from "../utils/tracking";

const enNavItems = [
  { href: "/surf-lessons-danang", label: "Surf lessons" },
  { href: "/surfing-danang", label: "Surfing in Da Nang" },
  { href: "/my-khe-beach-surfing", label: "My Khe Beach Surfing" },
  { href: "/surf-guide", label: "Surf guide" },
];

const enInfoCards = [
  {
    title: "Rental price",
    text: "From 250,000 VND for a two-hour session. Message Epic Surf School to confirm availability and board choice.",
  },
  {
    title: "Who rental is for",
    text: "Perfect for surfers who can paddle, catch green waves, avoid reefs, and want more freedom.",
  },
  {
    title: "Board options",
    text: "Softboards, longboards, funboards, shortboards. Availability depends on the day and conditions.",
  },
  {
    title: "How rental works",
    text: "Choose your board, show ID, pay the rental, get quick rules, and go surf. We are here if you need help.",
  },
  {
    title: "Pickup & location",
    text: "Epic Surf School is connected to the My Khe Beach surf area. Pickup confirmed by message.",
  },
  {
    title: "Take a lesson",
    text: "Not confident? Start with a lesson, learn the basics, and rent with support whenever you are ready.",
  },
];

const enFaqItems = [
  ["How much is surfboard rental in Da Nang?", "Surfboard rental starts from 250,000 VND for 2 hours. Message Epic Surf School to confirm the current board availability, pickup point, and conditions before you go."],
  ["What boards can I rent?", "Options include softboards, longboards, malibus, funboards, fish, and shortboards. Availability changes by day, so the team confirms the best board for your level by messenger."],
  ["Can beginners rent a board?", "First-timers should take a lesson instead of renting alone. Rental is for surfers who can paddle, control the board, stop safely, and avoid collisions."],
  ["Where do I pick up the board?", "Pickup is connected to the My Khe Beach surf area in Da Nang. The exact spot is confirmed through WhatsApp, Telegram, or Zalo because beach setup can change."],
  ["Do I need to book in advance?", "Booking in advance is recommended so Epic can reserve a suitable board, confirm timing, and check whether the surf conditions match your level."],
  ["What if conditions are not suitable?", "Check conditions before rental. If the sea is too strong or unclear, the team can suggest another time, another board, or a lesson instead."],
  ["Should I rent or take a lesson?", "Rent if you can paddle, turn, stop, and judge conditions safely. Take a lesson if you are new, inconsistent, or want instructor support before surfing independently."],
  ["Can I ask about waves before renting?", "Yes. Send a message on WhatsApp, Telegram, or Zalo and the Epic team can advise on waves, board choice, timing, and pickup details."],
];

const enRelatedItems = [
  { href: "/surf-lessons-danang", title: "Surf Lessons", text: "Beginner-friendly coaching near My Khe Beach." },
  { href: "/surfing-danang", title: "Surfing in Da Nang", text: "Where to surf, when to go, and how it works." },
  { href: "/my-khe-beach-surfing", title: "My Khe Beach Surfing", text: "Best waves in Da Nang for learners and riders." },
  { href: "/surf-guide", title: "Surf Guide", text: "Equipment, tips, safety, waves, and local know-how." },
];

const localeUi = {
  en: {
    navItems: enNavItems,
    heroEyebrow: "Da Nang, Vietnam",
    heroTitle: "Surfboard rental in Da Nang",
    heroTitlePrimary: "Surfboard rental",
    heroTitleSecondary: "in Da Nang",
    heroIntro: "Rent a surfboard in Da Nang near My Khe Beach from 250,000 VND / 2 hours. Epic Surf School offers top choices to boost your surf level and find joy.",
    stamp: "Surf rental",
    headerCta: "Book / Message",
    from: "from",
    priceUnit: "2 hours",
    rentCta: "Rent this board",
    otherBoards: "Other boards",
    faqTitle: "FAQ",
    relatedTitle: "Surf info for Da Nang",
    relatedItems: enRelatedItems,
    finalCta: "Book or\nmessage Epic",
    call: "Call",
    specs: ["Length", "Type", "Level", "Conditions", "Includes"],
    leash: "Leash",
    backLong: "Back to Epic Surf",
    backShort: "Epic Surf",
    processTitle: "How rental works",
    processSteps: [
      ["Choose", "Pick a board that fits your level and the conditions."],
      ["Confirm", "Message us to confirm availability, timing, and the pickup point."],
      ["Pick up", "Bring ID, pay for the rental, and get the safety rules."],
      ["Surf", "Collect the board and enjoy your session."],
    ],
    comparisonTitle: "Rent a board or take a lesson?",
    rentCriteria: ["You can paddle and catch green waves.", "You can control the board and stop safely.", "You want freedom to choose your own session."],
    rentHeading: "Rent a board",
    lessonHeading: "Take a lesson",
    lessonCta: "View surf lessons",
    pickupTitle: "Pickup at My Khe",
    conditionsCta: "Ask about conditions",
    boardOptionsTitle: "Choose your board",
  },
  ru: {
    navItems: [
      { href: "/ru#lessons", label: "Уроки серфинга" },
      { href: "/surfing-danang", label: "Серфинг в Дананге" },
      { href: "/my-khe-beach-surfing", label: "Пляж Май Кхе" },
      { href: "/surf-guide", label: "Гид по серфингу" },
    ],
    heroEyebrow: "Дананг, Вьетнам",
    stamp: "Аренда досок",
    headerCta: "Написать",
    from: "от",
    priceUnit: "2 часа",
    rentCta: "Арендовать доску",
    otherBoards: "Другие доски",
    faqTitle: "Вопросы",
    relatedTitle: "Полезно о серфинге в Дананге",
    finalCta: "Написать\nEpic",
    call: "Позвонить",
    specs: ["Длина", "Тип", "Уровень", "Условия", "В комплекте"],
    leash: "Лиш",
    backLong: "Назад в Epic Surf",
    backShort: "Epic Surf",
    processTitle: "Как работает аренда",
    processSteps: [
      ["Выберите", "Подберите доску под свой уровень и текущие условия."],
      ["Подтвердите", "Напишите нам, чтобы уточнить наличие, время и точку получения."],
      ["Получите", "Покажите ID, оплатите аренду и получите правила безопасности."],
      ["Катайтесь", "Заберите доску и отправляйтесь на сессию."],
    ],
    comparisonTitle: "Арендовать доску или взять урок?",
    rentCriteria: ["Вы уверенно гребёте и ловите зелёные волны.", "Вы контролируете доску и умеете безопасно остановиться.", "Вы хотите сами выбрать формат и время сессии."],
    rentHeading: "Арендовать доску",
    lessonHeading: "Взять урок",
    lessonCta: "Смотреть уроки",
    pickupTitle: "Забрать доску на My Khe",
    conditionsCta: "Спросить об условиях",
    boardOptionsTitle: "Выберите доску",
  },
};

const rentalPageAssets = {
  hero: "/rentals/hero/rental-hero-color.jpg",
  heroColorOverlays: [
    "/rentals/hero/rental-hero-board-color-01.webp",
    "/rentals/hero/rental-hero-board-color-02.webp",
    "/rentals/hero/rental-hero-board-color-03.webp",
    "/rentals/hero/rental-hero-board-color-04.webp",
    "/rentals/hero/rental-hero-board-color-05.webp",
    "/rentals/hero/rental-hero-board-color-06.webp",
    "/rentals/hero/rental-hero-board-color-07.webp",
  ],
  ctaBrush: "/rentals/page/rental-cta-mint-brush.svg",
  galleryFrames: {
    main: "/rentals/page/rental-gallery-frame-main.svg",
    detailTop: "/rentals/page/rental-gallery-frame-detail-top.svg",
    detailBottom: "/rentals/page/rental-gallery-frame-detail-bottom.svg",
  },
  carouselThumbFrames: [
    "/rentals/page/rental-carousel-thumb-frame-01.svg",
    "/rentals/page/rental-carousel-thumb-frame-02.svg",
    "/rentals/page/rental-carousel-thumb-frame-03.svg",
    "/rentals/page/rental-carousel-thumb-frame-04.svg",
    "/rentals/page/rental-carousel-thumb-frame-05.svg",
    "/rentals/page/rental-carousel-thumb-frame-06.svg",
  ],
  carouselArrows: {
    left: "/rentals/page/rental-carousel-arrow-left.svg",
    right: "/rentals/page/rental-carousel-arrow-right.svg",
  },
  redesign: {
    process: "/design/rental-redesign/process",
    comparison: "/design/rental-redesign/comparison",
    mapBackground: "/design/rental-redesign/map/rental-map-background.svg",
    mapMarker: "/design/rental-redesign/map/rental-map-epic-marker.svg",
    pickup: "/design/rental-redesign/pickup/rental-pickup-my-khe-source.jpg",
  },
};

const heroHotspots = [
  { id: 1, left: "4%", top: "18%", width: "13%", height: "65%" },
  { id: 2, left: "17%", top: "14%", width: "13%", height: "68%" },
  { id: 3, left: "31%", top: "18%", width: "12%", height: "64%" },
  { id: 4, left: "45%", top: "0%", width: "15%", height: "82%" },
  { id: 5, left: "61%", top: "22%", width: "10%", height: "55%" },
  { id: 6, left: "72%", top: "21%", width: "11%", height: "58%" },
  { id: 7, left: "84%", top: "15%", width: "12%", height: "65%" },
];

function findSection(pageContent, title) {
  return pageContent?.sections?.find((section) => section.title === title);
}

function buildPageContent(locale, pageContent) {
  if (locale !== "ru" || !pageContent) {
    return {
      heroTitle: localeUi.en.heroTitle,
      heroTitlePrimary: localeUi.en.heroTitlePrimary,
      heroTitleSecondary: localeUi.en.heroTitleSecondary,
      heroIntro: localeUi.en.heroIntro,
      infoCards: enInfoCards,
      faqItems: enFaqItems,
      relatedItems: enRelatedItems,
      contactMessage: null,
    };
  }

  const price = findSection(pageContent, "Цена");
  const audience = findSection(pageContent, "Кому подходит аренда");
  const boards = findSection(pageContent, "Доски в аренду");
  const process = findSection(pageContent, "Как работает аренда");
  const lesson = findSection(pageContent, "Когда лучше взять урок");

  return {
    heroTitle: pageContent.title,
    heroTitlePrimary: "Аренда досок",
    heroTitleSecondary: "для серфинга в Дананге",
    heroIntro: "Возьмите доску для серфинга рядом с пляжем Май Кхе. Поможем выбрать доску под ваш уровень, условия и формат катания. Наличие и бронь — через WhatsApp, Telegram или Zalo.",
    infoCards: [
      { title: price?.title, text: price?.body },
      { title: audience?.title, text: audience?.body },
      { title: boards?.title, text: boards?.body },
      { title: process?.title, text: process?.body },
      { title: "Получение доски", text: pageContent.rentalAvailabilityNote },
      { title: lesson?.title, text: lesson?.body },
    ].filter(({ title, text }) => title && text),
    faqItems: (pageContent.faq || []).map(({ question, answer }) => [question, answer]),
    relatedItems: [
      ...(boards?.cards || []).map(({ title, text }) => ({
        href: "/ru/surfboard-rental-danang",
        title,
        text,
      })),
      ...(lesson ? [{ href: lesson.cta?.href || "/ru#lessons", title: lesson.title, text: lesson.body }] : []),
    ],
    contactMessage: pageContent.contactMessage,
  };
}

const lightboxAssets = [
  { key: "front", label: "Front" },
  { key: "back", label: "Back" },
  { key: "fins", label: "Fins" },
];

const gallerySlots = {
  front: {
    frameKey: "main",
    boxClass: "left-0 top-0 h-full w-[54.36%]",
    clipPath: "polygon(1.9% 74.6%, 0.25% 0.13%, 50.4% 0.13%, 99.75% 1.51%, 99.75% 99.01%, 0.25% 99.87%)",
  },
  back: {
    frameKey: "detailTop",
    boxClass: "left-[55.46%] top-[0.13%] h-[48.88%] w-[44.4%]",
    clipPath: "polygon(1.25% 99%, 0.16% 1.2%, 38.16% 1.2%, 98.9% 0.13%, 100% 100%)",
  },
  fins: {
    frameKey: "detailBottom",
    boxClass: "left-[55.6%] top-[50.59%] h-[49.01%] w-[44.4%]",
    clipPath: "polygon(98.75% 1.2%, 99.84% 98.8%, 61.84% 98.8%, 1.09% 99.87%, 0% 0.27%)",
  },
};

const carouselClipPaths = [
  "polygon(0% 1.83%, 99.05% 0%, 98.1% 100%, 49.37% 97.87%, 0% 100%)",
  "polygon(0% 0%, 100% 0%, 100% 97.58%, 31.09% 100%, 0% 97.58%)",
  "polygon(99.69% 99.7%, 0% 99.7%, 3.4% 2.71%, 47.53% 0%, 99.69% 2.71%)",
  "polygon(98.17% 0%, 100% 99.68%, 0% 98.73%, 2.13% 49.37%, 0% 0%)",
  "polygon(0% 100%, 0% 0%, 97.58% 0%, 100% 68.91%, 97.58% 100%)",
  "polygon(0% 0%, 99.69% 0%, 96.3% 96.99%, 52.16% 99.7%, 0% 96.99%)",
];

const defaultImageAdjustment = {
  scale: 1,
  x: 0,
  y: 0,
  rotate: 0,
};

const imageAdjustmentStorageKey = "epic_rental_image_adjustments_draft";
const imageAdjustmentSlots = ["front", "back", "fins", "thumb"];
const rotationOptions = [0, 90, 180, 270];

const tunerControls = [
  { key: "scale", label: "Scale", min: 0.5, max: 4, step: 0.05 },
  { key: "x", label: "X offset", min: -200, max: 200, step: 1 },
  { key: "y", label: "Y offset", min: -200, max: 200, step: 1 },
];

function boardAssetPath(board, index, asset) {
  const fallbackId = `board-${String(index + 1).padStart(2, "0")}`;
  const slug = /^board-\d{2}$/.test(board.id) ? board.id : fallbackId;
  return `/rentals/boards/processed/${slug}/${asset}.webp`;
}

function boardWithAssets(board, index) {
  return {
    ...board,
    processedImages: {
      front: boardAssetPath(board, index, "front"),
      back: boardAssetPath(board, index, "back"),
      fins: boardAssetPath(board, index, "fins"),
      "front-full": boardAssetPath(board, index, "front-full"),
      "back-full": boardAssetPath(board, index, "back-full"),
      "fins-full": boardAssetPath(board, index, "fins-full"),
      thumb: boardAssetPath(board, index, "thumb"),
    },
  };
}

function referencePrice(price) {
  return price.amount.toLocaleString("de-DE");
}

function readableLevels(board, locale) {
  return board.level.map((level) => (
    locale === "ru" ? getBoardLevelLabel(level, "ru") : boardLevelLabels[level] || level
  )).join(", ");
}

function boardSpecs(board, locale, ui) {
  return [
    [ui.specs[0], board.size],
    [ui.specs[1], locale === "ru" ? getBoardTypeLabel(board.type, "ru") : boardTypeLabels[board.type] || board.type],
    [ui.specs[2], readableLevels(board, locale)],
  ];
}

function rentalMessage(board, locale, contactMessage) {
  if (locale === "ru") return `${contactMessage || "Привет! Хочу арендовать доску."} Доска: ${board.displayName || board.name}.`;
  return `Hi! I want to rent: ${board.name}.`;
}

function normalizeImageAdjustment(value) {
  const scale = Number(value?.scale);
  const x = Number(value?.x);
  const y = Number(value?.y);
  const rotate = Number(value?.rotate);

  return {
    scale: Number.isFinite(scale) ? Math.min(4, Math.max(0.5, scale)) : defaultImageAdjustment.scale,
    x: Number.isFinite(x) ? x : defaultImageAdjustment.x,
    y: Number.isFinite(y) ? y : defaultImageAdjustment.y,
    rotate: rotationOptions.includes(rotate) ? rotate : defaultImageAdjustment.rotate,
  };
}

function normalizeImageAdjustments(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(Object.entries(value).flatMap(([boardId, slots]) => {
    if (!slots || typeof slots !== "object" || Array.isArray(slots)) return [];
    const normalizedSlots = Object.fromEntries(imageAdjustmentSlots.flatMap((slot) => (
      slots[slot] ? [[slot, normalizeImageAdjustment(slots[slot])]] : []
    )));
    return Object.keys(normalizedSlots).length ? [[boardId, normalizedSlots]] : [];
  }));
}

function getImageAdjustment(adjustments, boardId, slot) {
  return normalizeImageAdjustment(adjustments[boardId]?.[slot]);
}

function adjustmentStyle(adjustments, boardId, slot) {
  const adjustment = getImageAdjustment(adjustments, boardId, slot);
  return {
    transform: `translate3d(${adjustment.x}px, ${adjustment.y}px, 0) scale(${adjustment.scale}) rotate(${adjustment.rotate}deg)`,
  };
}

function imageFitClass(slot) {
  return slot === "fins" ? "object-cover object-bottom" : "object-cover";
}

function frameMaskStyle(src) {
  return {
    WebkitMaskImage: `url("${src}")`,
    maskImage: `url("${src}")`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
  };
}

function DecorativeFrame({ src, className = "", imgClassName = "" }) {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      fill
      unoptimized
      sizes="100vw"
      className={`pointer-events-none absolute inset-0 select-none ${className} ${imgClassName}`}
    />
  );
}

function EditorialAction({ href, children, onClick, className = "" }) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className={`inline-flex min-h-12 items-center justify-center border-2 border-epicDark px-6 py-3 text-center text-[11px] font-black uppercase leading-tight tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-epicRed active:scale-[0.98] ${className}`}
    >
      {children}
    </a>
  );
}

const productCardActionClass = "inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg border-2 border-epicDark px-6 py-3 text-center text-xs font-black uppercase leading-tight tracking-wide shadow-none transition-colors hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-epicRed active:scale-[0.98]";

function RentalLiveCamPreview({ lang }) {
  const frameRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const forcedFallback = new URLSearchParams(window.location.search).has("liveCamFallback");
    if (forcedFallback) {
      const fallbackTimer = window.setTimeout(() => setFailed(true), 0);
      return () => window.clearTimeout(fallbackTimer);
    }
    const node = frameRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect(); }
    }, { rootMargin: "500px 0px" });
    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const openLabel = lang === "ru" ? "Открыть камеру" : "Open full camera";
  const liveLabel = lang === "ru" ? "Сейчас на My Khe" : "Live / My Khe";
  const trackLiveCam = () => trackEvent("live_cam_outbound_click", { language: lang, provider: "danangsurfcam", location: "rental_pickup", target: "full_stream" });

  return (
    <div ref={frameRef} data-role="rental-live-cam" data-live-cam-state={failed ? "fallback" : loaded ? "loaded" : "loading"} className="min-w-0">
      <div data-role="rental-live-cam-media" className="relative aspect-video min-w-0 overflow-hidden border-2 border-epicDark bg-epicDark">
        {!loaded && !failed ? <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(110deg,#2E2E2E_30%,#585858_50%,#2E2E2E_70%)] bg-[length:200%_100%] animate-pulse text-center motion-reduce:animate-none" aria-label="Loading live camera"><span className="text-xs font-black uppercase tracking-[0.18em] text-epicMint">My Khe Live Cam</span></div> : null}
        {shouldLoad && !failed ? (
          <iframe
            src={liveCam.previewUrl}
            title={lang === "ru" ? "Live-камера My Khe" : "My Khe live camera"}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => { setLoaded(true); trackEvent("live_cam_preview_load", { language: lang, provider: "danangsurfcam", location: "rental_pickup" }); }}
            onError={() => setFailed(true)}
            className={`absolute inset-0 h-full w-full border-0 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        ) : null}
        {failed ? <div className="absolute inset-0 flex flex-col items-center justify-center bg-epicDark px-5 text-center"><span className="text-xs font-black uppercase tracking-[0.18em] text-epicMint">My Khe Live Cam</span><span className="mt-2 text-xs text-epicWhite/60">{liveCam.cameraName}</span></div> : null}
      </div>
      <div data-role="rental-live-cam-meta" className="mt-3 flex flex-col items-start gap-4 pl-[22px] text-epicDark md:flex-row md:items-center md:justify-between md:gap-3 md:pl-0">
        <p className="flex min-h-11 items-center gap-2 text-xs font-black uppercase tracking-[0.12em]"><span className="h-2 w-2 shrink-0 rounded-full bg-epicRed" />{liveLabel}</p>
        <a href={liveCam.fullStreamUrl} target="_blank" rel="noopener noreferrer" onClick={trackLiveCam} className="inline-flex min-h-11 items-center whitespace-nowrap border-2 border-epicDark px-4 text-[11px] font-black uppercase text-epicDark transition-colors hover:bg-epicDark hover:text-epicWhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-epicDark md:text-xs">{openLabel}<ArrowRight className="ml-2" size={15} /></a>
      </div>
    </div>
  );
}

function RentalArtboardAsset({ src, role, className = "" }) {
  return <Image src={src} alt="" aria-hidden="true" data-role={role} fill unoptimized sizes="(min-width: 768px) 1235px, 390px" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}

function RentalMaskLayer({ src, role, color }) {
  return (
    <span
      aria-hidden="true"
      data-role={role}
      data-asset={src}
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
      }}
    />
  );
}

const processDesktopCards = [
  { left: 0, top: 207, width: 288, height: 184 },
  { left: 313, top: 215, width: 288, height: 176 },
  { left: 626, top: 215, width: 288, height: 176 },
  { left: 940, top: 218, width: 288, height: 173 },
];

const processMobileCards = [
  { left: 33, top: 342, width: 120, height: 120 },
  { left: 242, top: 349, width: 120, height: 120 },
  { left: 33, top: 499, width: 120, height: 120 },
  { left: 242, top: 499, width: 120, height: 120 },
];

function ProcessArtboard({ ui, processText, lang, mobile = false }) {
  const width = mobile ? 390 : 1235;
  const height = mobile ? 685 : 391;
  const cards = mobile ? processMobileCards : processDesktopCards;
  const suffix = mobile ? "mobile" : "desktop";
  const headingWords = ui.processTitle.split(" ");
  const headingLines = [headingWords.slice(0, 2).join(" "), headingWords.slice(2).join(" ")];
  const root = rentalPageAssets.redesign.process;

  return (
    <div
      data-role="rental-process-artboard"
      data-breakpoint={suffix}
      data-canvas={`${width}x${height}`}
      className={`relative [container-type:inline-size] ${mobile ? "aspect-[390/685] w-full max-w-[390px] md:hidden" : "hidden aspect-[1235/391] w-full max-w-[1235px] md:block"}`}
    >
      <RentalArtboardAsset src={`${root}/process-heading-main-plate-${suffix}.svg`} role="process-heading-main-plate" />
      <RentalArtboardAsset src={`${root}/process-heading-accent-plate-${suffix}.svg`} role="process-heading-accent-plate" />
      <RentalArtboardAsset src={`${root}/process-intro-note-plate-${suffix}.svg`} role="process-intro-note-plate" />
      {cards.map((_, index) => (
        <RentalMaskLayer
          key={`process-mask-${index + 1}`}
          src={`${root}/process-card-mask-${mobile ? "mobile-" : ""}${String(index + 1).padStart(2, "0")}.svg`}
          role="process-card-mask"
          color="#585858"
        />
      ))}
      <h2 className="absolute inset-0 font-heading uppercase leading-none text-epicDark">
        <span className="sr-only">{ui.processTitle}</span>
        <span data-role="process-heading-primary" aria-hidden="true" className={mobile ? `absolute left-[8.7%] top-[5.2%] whitespace-nowrap ${lang === "ru" ? "text-[clamp(25px,7.9cqi,32px)]" : "text-[clamp(27px,8.6cqi,35px)]"}` : `absolute left-[1.9%] top-[1.2%] whitespace-nowrap ${lang === "ru" ? "text-[clamp(34px,3.4cqi,42px)]" : "text-[clamp(40px,4cqi,50px)]"}`}>{headingLines[0]}</span>
        <span data-role="process-heading-accent" aria-hidden="true" className={mobile ? `absolute top-[12.2%] whitespace-nowrap text-epicRed ${lang === "ru" ? "left-[26%] text-[clamp(27px,8.6cqi,35px)]" : "left-[27%] text-[clamp(29px,9.4cqi,38px)]"}` : `absolute left-[2%] top-[17%] whitespace-nowrap text-epicRed ${lang === "ru" ? "text-[clamp(36px,3.55cqi,44px)]" : "text-[clamp(38px,3.7cqi,46px)]"}`}>{headingLines[1]}</span>
      </h2>
      <p data-role="process-intro-copy" className={`absolute text-center font-normal text-epicDark ${mobile ? `left-[17%] top-[24.2%] w-[66%] leading-[1.55] ${lang === "ru" ? "text-[clamp(14px,3.75cqi,15px)]" : "text-[clamp(15px,4.1cqi,17px)]"}` : `left-[62%] top-[4.2%] w-[31%] ${lang === "ru" ? "text-[clamp(14px,1.3cqi,16px)] leading-[1.35]" : "text-[clamp(16px,1.5cqi,19px)] leading-[1.55]"}`}`}>{processText}</p>
      <ol className="absolute inset-0">
        {ui.processSteps.map(([title, text], index) => {
          const card = cards[index];
          return (
            <li
              key={title}
              data-role="process-card"
              className="absolute flex flex-col items-center px-[1.3cqi] text-center text-epicWhite"
              style={{ left: `${(card.left / width) * 100}%`, top: `${(card.top / height) * 100}%`, width: `${(card.width / width) * 100}%`, height: `${(card.height / height) * 100}%`, paddingTop: mobile ? "2.2cqi" : "1.8cqi" }}
            >
              <span data-role="process-card-number" className={mobile ? "font-heading text-[clamp(16px,4.6cqi,18px)] leading-none text-epicRed" : "font-heading text-[clamp(28px,2.75cqi,34px)] leading-none text-epicRed"}>{String(index + 1).padStart(2, "0")}</span>
              <strong data-role="process-card-label" className={mobile ? "mt-[0.5cqi] text-[clamp(6px,1.8cqi,8px)] font-black uppercase leading-none" : `mt-[0.3cqi] font-black uppercase leading-none ${lang === "ru" ? "text-[clamp(10px,0.95cqi,12px)]" : "text-[clamp(11px,1.05cqi,13px)]"}`}>{title}</strong>
              <span data-role="process-card-description" className={mobile ? `mt-[2.7cqi] block font-normal leading-[1.35] ${lang === "ru" ? "px-0 text-[clamp(9px,2.7cqi,11px)]" : "px-[1cqi] text-[clamp(10px,2.95cqi,12px)]"}` : `mt-[2.15cqi] block font-normal leading-[1.42] text-epicWhite/90 ${lang === "ru" ? "px-0 text-[clamp(12px,1.1cqi,14px)]" : "px-[0.3cqi] text-[clamp(14px,1.3cqi,16px)]"}`}>{text}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ComparisonArtboard({ ui, lessonText, lessonHref, lang, mobile = false }) {
  const width = mobile ? 390 : 1235;
  const height = mobile ? 828 : 461;
  const suffix = mobile ? "mobile" : "desktop";
  const root = rentalPageAssets.redesign.comparison;
  const rentBounds = mobile ? { left: 42, top: 244, width: 305, height: 205 } : { left: 38, top: 235, width: 450, height: 196 };
  const lessonBounds = mobile ? { left: 45, top: 603, width: 292, height: 170 } : { left: 775, top: 231, width: 422, height: 190 };
  const boundsStyle = (bounds) => ({ left: `${(bounds.left / width) * 100}%`, top: `${(bounds.top / height) * 100}%`, width: `${(bounds.width / width) * 100}%`, height: `${(bounds.height / height) * 100}%` });
  const headingClass = mobile
    ? `left-[6%] top-[4.2%] h-[12.8%] w-[88%] ${lang === "ru" ? "text-[clamp(20px,6.2cqi,25px)]" : "text-[clamp(23px,7.2cqi,29px)]"}`
    : `left-[5.6%] top-[15%] h-[13%] w-[87%] whitespace-nowrap ${lang === "ru" ? "text-[clamp(35px,3.35cqi,41px)]" : "text-[clamp(42px,4.1cqi,51px)]"}`;
  const bulletClass = mobile ? "h-[2.6cqi] w-[2.6cqi]" : "h-[0.65cqi] w-[0.65cqi]";

  return (
    <div
      data-role="rental-comparison-artboard"
      data-breakpoint={suffix}
      data-canvas={`${width}x${height}`}
      className={`relative [container-type:inline-size] ${mobile ? "aspect-[390/828] w-full max-w-[390px] md:hidden" : "hidden aspect-[1235/461] w-full max-w-[1235px] md:block"}`}
    >
      <RentalArtboardAsset src={`${root}/comparison-heading-plate-${suffix}.svg`} role="comparison-heading-plate" />
      <RentalMaskLayer src={`${root}/comparison-rent-card-plate-${suffix}.svg`} role="comparison-rent-card-plate" color="#585858" />
      <RentalMaskLayer src={`${root}/comparison-lesson-card-plate-${suffix}.svg`} role="comparison-lesson-card-plate" color="#F6F6F6" />
      <h2 data-role="comparison-heading" className={`absolute flex items-center justify-center px-[2cqi] text-center font-heading uppercase text-epicDark ${mobile ? (lang === "ru" ? "leading-[1.15]" : "leading-[1.42]") : "leading-[1.05]"} ${headingClass}`}>{ui.comparisonTitle}</h2>
      <article data-role="rental-decision-zone" className={`absolute flex flex-col items-center text-center text-epicWhite ${mobile ? "" : "pt-[1.2cqi]"}`} style={boundsStyle(rentBounds)}>
        <h3 data-role="comparison-rent-heading" className={mobile ? `font-heading uppercase leading-none text-epicMint ${lang === "ru" ? "text-[clamp(25px,7cqi,29px)]" : "text-[clamp(26px,7.7cqi,31px)]"}` : `font-heading uppercase leading-none text-epicMint ${lang === "ru" ? "text-[clamp(27px,2.45cqi,30px)]" : "text-[clamp(30px,2.9cqi,36px)]"}`}>{ui.rentHeading}</h3>
        <ul data-role="comparison-criteria" className={mobile ? `mt-[4.6cqi] grid w-[86%] gap-[3.8cqi] font-normal leading-[1.35] ${lang === "ru" ? "text-[clamp(12px,3.55cqi,14px)]" : "text-[clamp(13px,4.1cqi,16px)]"}` : `mt-[2.3cqi] grid w-[90%] gap-[1.85cqi] text-left font-semibold leading-[1.35] ${lang === "ru" ? "text-[clamp(11px,0.95cqi,12px)]" : "text-[clamp(12px,1.05cqi,13px)]"}`}>
          {ui.rentCriteria.map((criterion) => (
            <li key={criterion} className={`flex min-w-0 items-center ${mobile ? "gap-[8cqi]" : "gap-[3.3cqi]"}`}>
              <span className={`shrink-0 rounded-full bg-epicMint ${bulletClass}`} />
              <span className="min-w-0">{criterion}</span>
            </li>
          ))}
        </ul>
      </article>
      <Image src={`${root}/rental-comparison-vs.svg`} alt="versus" data-role="rental-comparison-vs" width={168} height={110} unoptimized className={mobile ? "absolute left-[28.5%] top-[57.7%] h-auto w-[43%]" : "absolute left-[43.2%] top-[55%] h-auto w-[13.6%]"} />
      <article data-role="lesson-note" className={`absolute flex flex-col items-center text-center text-epicDark ${mobile ? "" : "pt-[2.7cqi]"}`} style={boundsStyle(lessonBounds)}>
        <h3 data-role="comparison-lesson-heading" className={mobile ? `font-heading uppercase leading-none ${lang === "ru" ? "text-[clamp(24px,6.9cqi,28px)]" : "text-[clamp(25px,7.7cqi,31px)]"}` : `font-heading uppercase leading-none ${lang === "ru" ? "text-[clamp(28px,2.5cqi,31px)]" : "text-[clamp(29px,2.75cqi,34px)]"}`}>{ui.lessonHeading}</h3>
        <p data-role="comparison-lesson-copy" className={mobile ? `mt-[4.5cqi] max-w-[92%] font-normal leading-[1.35] ${lang === "ru" ? "text-[clamp(12px,3.55cqi,14px)]" : "text-[clamp(13px,3.85cqi,15px)]"}` : `mt-[1.45cqi] max-w-[88%] font-normal leading-[1.45] text-epicDark/80 ${lang === "ru" ? "text-[clamp(12px,1cqi,13px)]" : "text-[clamp(13px,1.12cqi,14px)]"}`}>{lessonText}</p>
        <Link data-role="comparison-lesson-cta" href={lessonHref} className={mobile ? `${lang === "ru" ? "mt-[4cqi]" : "mt-[5.7cqi]"} inline-flex min-h-9 items-center border-2 border-epicDark bg-epicRed px-5 py-2 text-[9px] font-black uppercase shadow-[4px_4px_0_0_#2E2E2E]` : `${lang === "ru" ? "mt-[1.8cqi]" : "mt-[3.4cqi]"} inline-flex min-h-10 items-center border-2 border-epicDark bg-epicRed px-6 py-2 text-[10px] font-black uppercase shadow-[4px_4px_0_0_#2E2E2E]`}>
          {ui.lessonCta}<ArrowRight className="ml-2" size={14} />
        </Link>
      </article>
    </div>
  );
}

function RentalFaqItem({ question, answer, index, lang, isLastOdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const answerId = `rental-faq-${lang}-${index + 1}`;

  return (
    <article className={`border-b-2 border-epicDark/20 ${isLastOdd ? "md:col-span-2" : ""}`}>
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={() => setIsOpen((current) => !current)}
          className="grid min-h-16 w-full grid-cols-[1fr_24px] items-center gap-3 py-4 text-left text-sm font-black leading-snug text-epicDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicRed"
        >
          <span>{question}</span>
          <span aria-hidden="true" className="text-right text-2xl font-normal leading-none text-epicRed">{isOpen ? "−" : "+"}</span>
        </button>
      </h3>
      <div id={answerId} hidden={!isOpen} className="pb-5 pr-6">
        <p className="max-w-[560px] text-sm font-medium leading-6 text-epicDark/70">{answer}</p>
      </div>
    </article>
  );
}

export default function RentalDesignTestPage({ locale = "en", pageContent = null }) {
  const lang = locale === "ru" ? "ru" : "en";
  const ui = localeUi[lang];
  const content = useMemo(() => buildPageContent(lang, pageContent), [lang, pageContent]);
  const boards = useMemo(() => rentalBoards.map((board, index) => (
    boardWithAssets(getLocalizedBoard(board, lang), index)
  )), [lang]);
  const initialBoard = boards.find((board) => board.recommended) || boards[0];
  const [activeBoardId, setActiveBoardId] = useState(initialBoard.id);
  const [activeHeroBoard, setActiveHeroBoard] = useState(null);
  const [heroMasks, setHeroMasks] = useState(null);
  const heroFrameRef = useRef(null);
  const heroRafRef = useRef(null);
  const debugCanvasRef = useRef(null);
  const [activeMobileAsset, setActiveMobileAsset] = useState("front");
  const [isRentalModalOpen, setRentalModalOpen] = useState(false);
  const [lightboxAsset, setLightboxAsset] = useState(null);
  const debugHeroHotspots = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("debugHeroHotspots");
  useEffect(() => {
    let cancelled = false;
    Promise.all(rentalPageAssets.heroColorOverlays.map((src) => new Promise((resolve) => {
      const image = new window.Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1440;
        canvas.height = 810;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        context.drawImage(image, 0, 0, 1440, 810);
        resolve(context.getImageData(0, 0, 1440, 810).data);
      };
      image.onerror = () => resolve(null);
      image.src = src;
    }))).then((masks) => { if (!cancelled) setHeroMasks(masks); });
    return () => { cancelled = true; };
  }, []);
  useEffect(() => () => { if (heroRafRef.current) cancelAnimationFrame(heroRafRef.current); }, []);
  useEffect(() => {
    const canvas = debugCanvasRef.current;
    if (!canvas || !heroMasks) return;
    const context = canvas.getContext("2d");
    const image = context.createImageData(1440, 810);
    const colors = [[254,116,106],[170,255,199],[255,210,96],[117,194,255],[211,153,255],[255,170,96],[150,255,220]];
    heroMasks.forEach((mask, boardIndex) => {
      if (!mask) return;
      const color = colors[boardIndex];
      for (let i = 0; i < 1440 * 810; i += 1) {
        const alpha = mask[i * 4 + 3];
        if (alpha > 24) { image.data[i * 4] = color[0]; image.data[i * 4 + 1] = color[1]; image.data[i * 4 + 2] = color[2]; image.data[i * 4 + 3] = Math.min(150, alpha); }
      }
    });
    context.putImageData(image, 0, 0);
  }, [heroMasks, debugHeroHotspots]);
  const pickHeroBoard = (event) => {
    if (!heroMasks || !heroFrameRef.current) return;
    const rect = heroFrameRef.current.getBoundingClientRect();
    const scale = Math.max(rect.width / 1440, rect.height / 810);
    const sourceX = Math.round((event.clientX - rect.left - (rect.width - 1440 * scale) / 2) / scale);
    const sourceY = Math.round((event.clientY - rect.top - (rect.height - 810 * scale) / 2) / scale);
    if (sourceX < 0 || sourceX >= 1440 || sourceY < 0 || sourceY >= 810) { setActiveHeroBoard(null); return; }
    const pixel = sourceY * 1440 + sourceX;
    let bestBoard = null; let bestAlpha = 24;
    heroMasks.forEach((mask, index) => { const alpha = mask?.[pixel * 4 + 3] || 0; if (alpha > bestAlpha) { bestAlpha = alpha; bestBoard = index + 1; } });
    setActiveHeroBoard(bestBoard);
  };
  const [editMode, setEditMode] = useState(false);
  const [tunerSlot, setTunerSlot] = useState("front");
  const [imageAdjustments, setImageAdjustments] = useState({});
  const [copyStatus, setCopyStatus] = useState("Copy config");
  const boardStripRef = useRef(null);
  const showroomImageRef = useRef(null);
  const dragStateRef = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });
  const activeBoard = boards.find((board) => board.id === activeBoardId) || initialBoard;
  const activeAdjustment = getImageAdjustment(imageAdjustments, activeBoard.id, tunerSlot);
  const t = translations[lang];
  const [, , , rentalProcess, pickupDetails, lessonDetails] = content.infoCards;
  const lessonHref = lang === "ru" ? "/ru#lessons" : "/surf-lessons-danang";

  useEffect(() => {
    storeAttributionFromUrl({ includePartner: true });
    const editModeFrame = window.requestAnimationFrame(() => {
      const isEditMode = new URLSearchParams(window.location.search).get("edit") === "1";
      setEditMode(isEditMode);
      try {
        const storedAdjustments = window.localStorage.getItem(imageAdjustmentStorageKey);
        if (storedAdjustments) setImageAdjustments(normalizeImageAdjustments(JSON.parse(storedAdjustments)));
      } catch {
        // Keep image tuning usable even when storage is unavailable or invalid.
      }
    });
    trackEvent("page_view", {
      language: lang,
      page_type: "rental_page",
      page_slug: lang === "ru" ? "/ru/surfboard-rental-danang" : "/surfboard-rental-danang",
    });

    return () => window.cancelAnimationFrame(editModeFrame);
  }, [lang]);

  useEffect(() => {
    if (!editMode) return;
    try {
      window.localStorage.setItem(imageAdjustmentStorageKey, JSON.stringify(imageAdjustments));
    } catch {
      // Live tuning still works when storage is unavailable.
    }
  }, [editMode, imageAdjustments]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== imageAdjustmentStorageKey) return;
      try {
        setImageAdjustments(event.newValue ? normalizeImageAdjustments(JSON.parse(event.newValue)) : {});
      } catch {
        setImageAdjustments({});
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const activeButton = boardStripRef.current?.querySelector(`[data-board-id="${activeBoardId}"]`);
    activeButton?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeBoardId]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const drag = dragStateRef.current;
      if (!drag.active || !boardStripRef.current) return;
      const delta = event.clientX - drag.startX;
      if (Math.abs(delta) > 4) drag.moved = true;
      boardStripRef.current.scrollLeft = drag.startScroll - delta;
      if (drag.moved) event.preventDefault();
    };

    const handleMouseUp = () => {
      if (!dragStateRef.current.active) return;
      dragStateRef.current.active = false;
      window.setTimeout(() => {
        dragStateRef.current.moved = false;
      }, 0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (!lightboxAsset) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightboxAsset(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxAsset]);

  const openRentalModal = (ctaLocation) => {
    trackEvent("rental_cta_click", {
      language: lang,
      service_type: "board_rental",
      cta_location: ctaLocation,
      cta_label: activeBoard.id,
      ...getBoardTrackingPayload(activeBoard),
    });
    setRentalModalOpen(true);
  };

  const handleMessengerClick = (event, eventName, label, hrefBuilder) => {
    if (hrefBuilder) {
      event.currentTarget.href = hrefBuilder();
    }

    trackEvent(eventName, {
      language: lang,
      service_type: "board_rental",
      cta_location: "rental_page",
      cta_label: label,
      ...getBoardTrackingPayload(activeBoard),
    });
  };

  const changeLightboxAsset = (direction) => {
    const currentIndex = lightboxAssets.findIndex(({ key }) => key === lightboxAsset);
    const nextIndex = (currentIndex + direction + lightboxAssets.length) % lightboxAssets.length;
    setLightboxAsset(lightboxAssets[nextIndex].key);
  };

  const scrollBoards = (direction) => {
    boardStripRef.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  };

  const selectBoard = (boardId) => {
    setActiveBoardId(boardId);
    setActiveMobileAsset("front");
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    window.requestAnimationFrame(() => {
      const imageArea = showroomImageRef.current;
      if (!imageArea) return;
      const top = imageArea.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: "smooth" });
    });
  };

  const handleBoardStripMouseDown = (event) => {
    dragStateRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startScroll: boardStripRef.current?.scrollLeft || 0,
    };
  };

  const updateImageAdjustment = (key, value) => {
    setImageAdjustments((current) => ({
      ...current,
      [activeBoard.id]: {
        ...current[activeBoard.id],
        [tunerSlot]: {
          ...defaultImageAdjustment,
          ...current[activeBoard.id]?.[tunerSlot],
          [key]: Number(value),
        },
      },
    }));
  };

  const copyImageConfig = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(normalizeImageAdjustments(imageAdjustments), null, 2));
      setCopyStatus("Copied");
    } catch {
      setCopyStatus("Copy failed");
    }
    window.setTimeout(() => setCopyStatus("Copy config"), 1400);
  };

  const resetImageAdjustment = () => {
    setImageAdjustments((current) => ({
      ...current,
      [activeBoard.id]: {
        ...current[activeBoard.id],
        [tunerSlot]: defaultImageAdjustment,
      },
    }));
  };

  const resetAllImageAdjustments = () => setImageAdjustments({});

  return (
    <div className="min-h-screen overflow-x-clip bg-epicDark font-sans text-epicWhite [--rental-content-max:1280px]">
      <main>
        <section
          data-section="rental-design-hero"
          className="bg-epicDark"
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setActiveHeroBoard(null);
          }}
        >
          <div data-role="rental-hero-media" className="relative mx-auto aspect-[16/9] min-h-[300px] w-[min(100%,var(--rental-content-max))] overflow-hidden bg-epicDark sm:min-h-[360px]">
          <h1 className="sr-only">{content.heroTitle}</h1>
          <Image
            src={rentalPageAssets.hero}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            data-role="rental-hero-base"
            className="z-0 object-cover object-center grayscale"
          />
          {rentalPageAssets.heroColorOverlays.map((src, index) => {
            const boardId = index + 1;
            const isActive = activeHeroBoard === boardId;
            return (
              <Image
                key={src}
                src={src}
                alt=""
                aria-hidden="true"
                data-role="rental-hero-color-overlay"
                data-hero-board-id={boardId}
                draggable={false}
                fill
                unoptimized
                sizes="100vw"
                className={`pointer-events-none z-[1] select-none object-cover object-center transition-opacity duration-300 ease-out motion-reduce:transition-none ${isActive ? "opacity-100" : "opacity-0"}`}
              />
            );
          })}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-epicDark/0 via-epicDark/10 to-epicDark" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-epicDark md:h-52" />
          <div
            aria-hidden="true"
            data-role="rental-hero-hotspot-layer"
            data-hero-masks-ready={heroMasks ? "true" : "false"}
            ref={heroFrameRef}
            className="absolute inset-0 z-10 h-full w-full"
            onPointerMove={(event) => {
              if (event.pointerType === "touch") return;
              if (heroRafRef.current) return;
              heroRafRef.current = requestAnimationFrame(() => { heroRafRef.current = null; pickHeroBoard(event); });
            }}
            onPointerUp={(event) => {
              if (event.pointerType === "mouse") return;
              pickHeroBoard(event);
            }}
            onPointerDown={(event) => { if (event.pointerType !== "mouse") pickHeroBoard(event); }}
            onClick={pickHeroBoard}
          >
            {debugHeroHotspots ? <canvas ref={debugCanvasRef} width="1440" height="810" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center" /> : null}
          </div>
          <Link
            href={lang === "ru" ? "/ru" : "/"}
            data-role="rental-back-link"
            className="absolute left-4 top-4 z-20 inline-flex min-h-12 items-center border-2 border-epicDark bg-epicWhite px-4 py-3 text-xs font-black uppercase leading-none text-epicDark shadow-[5px_5px_0_0_#AAFFC7] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-epicMint md:left-8 md:top-8 md:px-5 md:text-sm"
          >
            <span aria-hidden="true" className="mr-2">←</span>
            <span className="md:hidden">{ui.backShort}</span>
            <span className="hidden md:inline">{ui.backLong}</span>
          </Link>
          </div>
        </section>

        <section data-section="rental-board-showroom" className="relative bg-epicDark px-5 pb-10 text-epicWhite sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[var(--rental-content-max)]">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.82fr)_minmax(310px,0.78fr)] lg:items-stretch lg:gap-8">
              <div ref={showroomImageRef}>
                <div
                  className="relative min-h-[430px] overflow-hidden bg-epicDark md:min-h-[640px] lg:hidden"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxAsset(activeMobileAsset)}
                    aria-label={`Open ${activeBoard.displayName || activeBoard.name} ${activeMobileAsset} view`}
                    className="group absolute inset-0 cursor-zoom-in shadow-xl shadow-epicDark/60"
                  >
                    <Image
                      src={activeBoard.processedImages[activeMobileAsset]}
                      alt={`${activeBoard.displayName || activeBoard.name} ${activeMobileAsset} view`}
                      data-image-slot={activeMobileAsset}
                      fill
                      priority
                      unoptimized
                      sizes="100vw"
                      style={adjustmentStyle(imageAdjustments, activeBoard.id, activeMobileAsset)}
                      className={`${imageFitClass(activeMobileAsset)} transition-transform duration-200`}
                    />
                    <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-epicWhite/60 bg-epicDark/90 text-epicWhite/80">
                      <ZoomIn size={18} aria-hidden="true" />
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2.5 bg-epicDark pt-2 lg:hidden">
                  {lightboxAssets.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveMobileAsset(key)}
                      aria-label={`Show ${activeBoard.displayName || activeBoard.name} ${key} image`}
                      aria-pressed={activeMobileAsset === key}
                      className={`relative h-32 overflow-hidden border-2 bg-epicDark transition-colors sm:h-36 ${activeMobileAsset === key ? "border-epicRed shadow-[4px_4px_0_0_#FE746A]" : "border-epicWhite/35"}`}
                    >
                      <Image
                        src={activeBoard.processedImages[key]}
                        alt=""
                        fill
                        unoptimized
                        sizes="33vw"
                        style={adjustmentStyle(imageAdjustments, activeBoard.id, key)}
                        className={imageFitClass(key)}
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-epicDark/90 to-epicDark/20 py-1.5 text-[10px] font-black uppercase leading-none text-epicWhite">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>

                <div data-role="rental-gallery" className="relative hidden aspect-[723/761] w-full bg-epicDark lg:block">
                  {[
                    ["front", "Front view", gallerySlots.front],
                    ["back", "Back view", gallerySlots.back],
                    ["fins", "Fin setup", gallerySlots.fins],
                  ].map(([asset, label, slot]) => {
                    const frame = rentalPageAssets.galleryFrames[slot.frameKey];
                    return (
                      <div
                        key={asset}
                        data-gallery-frame={frame}
                        className={`absolute overflow-hidden bg-epicDark shadow-2xl shadow-epicDark/70 transition-transform duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-1 ${slot.boxClass}`}
                        style={{ clipPath: slot.clipPath }}
                      >
                        <DecorativeFrame
                          src={frame}
                          imgClassName="object-fill opacity-0"
                        />
                        <button
                          type="button"
                          onClick={() => setLightboxAsset(asset)}
                          aria-label={`Open ${activeBoard.displayName || activeBoard.name} ${asset} view`}
                          className="absolute inset-0 cursor-zoom-in"
                        >
                          <Image
                            src={activeBoard.processedImages[asset]}
                            alt={`${activeBoard.displayName || activeBoard.name} ${label}`}
                            data-image-slot={asset}
                            fill
                            priority={asset === "front"}
                            unoptimized
                            sizes="(min-width: 1024px) 58vw, 100vw"
                            style={adjustmentStyle(imageAdjustments, activeBoard.id, asset)}
                            className={`${imageFitClass(asset)} transition-transform duration-200`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <article data-role="rental-product-card" className="flex min-h-[520px] min-w-0 flex-col border-2 border-epicWhite/45 bg-epicDark px-6 py-8 text-left shadow-[8px_8px_0_0_#585858] md:px-8 md:py-10 lg:h-full lg:min-h-0 lg:justify-center lg:py-9">
                <div className="min-w-0 text-center">
                <h2 className="mx-auto max-w-[460px] break-words font-heading text-4xl uppercase leading-[0.92] tracking-normal text-epicWhite md:text-[36px] lg:text-[36px]">
                  {activeBoard.displayName || activeBoard.name}
                </h2>
                <div className="mt-5">
                  <p className="font-heading text-4xl leading-none text-epicMint lg:text-[46px]">
                    {referencePrice(activeBoard.price)}
                    <span className="ml-2 align-baseline text-2xl text-epicMint">VND</span>
                  </p>
                  <p className="mt-1 text-sm font-black uppercase tracking-wide text-epicWhite">{lang === "ru" ? ui.priceUnit : activeBoard.price.unit}</p>
                </div>
                </div>
                <div className="min-w-0">
                <p className="mt-7 max-w-[420px] text-[15px] font-semibold leading-7 text-epicWhite/82">{activeBoard.description}</p>
                <dl data-section="rental-board-specs" className="mt-6 w-full min-w-0 max-w-[420px]">
                  {boardSpecs(activeBoard, lang, ui).map(([label, value]) => (
                    <div key={label} data-role="rental-spec-row" className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(88px,auto)] gap-4 border-t-2 border-epicRed py-3 text-sm leading-5 last:border-b-2">
                      <dt className="min-w-0 text-left font-bold text-epicWhite/78">{label}</dt>
                      <dd className="min-w-0 break-words text-right font-black text-epicWhite">{value}</dd>
                    </div>
                  ))}
                </dl>
                </div>
                <div data-role="rental-product-actions" className="mt-7 flex w-full min-w-0 max-w-[420px] flex-col items-stretch gap-3">
                  <button
                    type="button"
                    onClick={() => openRentalModal("rental_page_showroom")}
                    className={`${productCardActionClass} bg-epicRed text-epicDark`}
                  >
                    {ui.rentCta}
                  </button>
                  <a
                    href={links.whatsapp}
                    onClick={(event) => handleMessengerClick(
                      event,
                      "whatsapp_click",
                      "whatsapp_to_book",
                      () => buildWhatsAppUrl(links.whatsapp, rentalMessage(activeBoard, lang, content.contactMessage), { language: lang }),
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className={`${productCardActionClass} bg-epicWhite text-epicDark hover:bg-epicMint`}
                  >
                    <ArrowRight size={19} />
                    WhatsApp
                  </a>
                </div>
              </article>
            </div>

            <div className="flex items-center justify-center gap-4 bg-epicDark px-2 pt-6 md:px-8 md:pt-8">
              <button
                type="button"
                onClick={() => scrollBoards(-1)}
                aria-label="Scroll boards left"
                className="hidden h-11 w-11 shrink-0 items-center justify-center transition-transform hover:scale-110 lg:flex"
              >
                <Image
                  src={rentalPageAssets.carouselArrows.left}
                  alt=""
                  aria-hidden="true"
                  width={30}
                  height={35}
                  unoptimized
                  className="pointer-events-none h-9 w-8"
                />
              </button>
              <div className="relative min-w-0 flex-1 lg:w-[1108px] lg:flex-none">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-epicDark to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-epicDark to-transparent" />
                <div
                  ref={boardStripRef}
                  data-section="rental-board-strip"
                  onMouseDown={handleBoardStripMouseDown}
                  onDragStart={(event) => event.preventDefault()}
                  onClickCapture={(event) => {
                    if (!dragStateRef.current.moved) return;
                    event.preventDefault();
                    event.stopPropagation();
                    dragStateRef.current.moved = false;
                  }}
                  className="scrollbar-hide flex min-w-0 cursor-grab touch-pan-x select-none gap-5 overflow-x-auto px-4 pb-2 active:cursor-grabbing lg:gap-8 lg:px-0"
                >
                  {boards.map((board, index) => {
                    const isActive = board.id === activeBoard.id;
                    const frame = rentalPageAssets.carouselThumbFrames[index % rentalPageAssets.carouselThumbFrames.length];
                    return (
                      <button
                        key={board.id}
                        type="button"
                        data-board-id={board.id}
                        onClick={() => selectBoard(board.id)}
                        aria-label={`Show ${board.displayName || board.name}`}
                        title={board.displayName || board.name}
                        aria-current={isActive ? "true" : undefined}
                        data-carousel-window="thumbnail"
                        className="w-[100px] shrink-0 text-left text-epicWhite lg:w-[176px]"
                      >
                        <span
                          data-carousel-frame={frame}
                          style={{ clipPath: carouselClipPaths[index % carouselClipPaths.length] }}
                          className={`relative block h-[100px] overflow-hidden bg-epicDark grayscale transition-all lg:h-[176px] ${isActive ? "outline outline-[3px] outline-offset-2 outline-epicRed grayscale-0" : "opacity-75 hover:opacity-100"}`}
                        >
                          <DecorativeFrame
                            src={frame}
                            imgClassName="object-fill opacity-0"
                          />
                          <Image
                            src={board.processedImages.thumb}
                            alt=""
                            data-image-slot="thumb"
                            draggable={false}
                            fill
                            unoptimized
                            sizes="(min-width: 1024px) 158px, 88px"
                            style={adjustmentStyle(imageAdjustments, board.id, "thumb")}
                            className="object-cover"
                          />
                          <span className={`absolute left-2 top-2 border px-2 py-1 text-[10px] font-black leading-none ${isActive ? "border-epicDark bg-epicRed text-epicDark" : "border-epicWhite/45 bg-epicDark/90 text-epicWhite"}`}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <button
                type="button"
                onClick={() => scrollBoards(1)}
                aria-label="Scroll boards right"
                className="hidden h-11 w-11 shrink-0 items-center justify-center transition-transform hover:scale-110 lg:flex"
              >
                <Image
                  src={rentalPageAssets.carouselArrows.right}
                  alt=""
                  aria-hidden="true"
                  width={30}
                  height={35}
                  unoptimized
                  className="pointer-events-none h-9 w-8"
                />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-epicDark px-5 pb-14 pt-12 text-epicWhite sm:px-8 md:pb-20 md:pt-16 lg:px-10">
          <div className="mx-auto max-w-[var(--rental-content-max)]">
            <div data-role="rental-redesign-map-field" className="relative">
              <Image src={rentalPageAssets.redesign.mapBackground} alt="" aria-hidden="true" data-role="rental-map-background" data-opacity="0.29" width={1414} height={490} unoptimized className="pointer-events-none absolute left-1/2 top-[265px] hidden h-auto w-[114%] max-w-[1414px] -translate-x-1/2 opacity-[0.29] md:block" />
              <Image src={rentalPageAssets.redesign.mapBackground} alt="" aria-hidden="true" data-role="rental-map-background-mobile" data-opacity="0.29" width={1414} height={490} unoptimized className="pointer-events-none absolute left-1/2 top-[210px] h-auto w-[2520px] max-w-none -translate-x-[43.5%] opacity-[0.29] md:hidden" />
              <Image src={rentalPageAssets.redesign.mapMarker} alt="" aria-hidden="true" data-role="rental-map-epic-marker" data-opacity="1" width={32} height={17} unoptimized className="pointer-events-none absolute left-[48%] top-[348px] z-[1] h-auto w-10 opacity-100 md:left-[60.5%] md:top-[451px] md:w-10" />

              <section data-section="rental-process" className="relative left-1/2 z-10 w-screen max-w-[390px] -translate-x-1/2 md:left-auto md:mx-auto md:w-auto md:max-w-[1235px] md:translate-x-0">
                <ProcessArtboard ui={ui} processText={rentalProcess?.text} lang={lang} />
                <ProcessArtboard ui={ui} processText={rentalProcess?.text} lang={lang} mobile />
              </section>

              <section data-section="rental-comparison" className="relative left-1/2 z-10 w-screen max-w-[390px] -translate-x-1/2 md:left-auto md:mx-auto md:mt-8 md:w-auto md:max-w-[1235px] md:translate-x-0">
                <div data-role="rental-comparison-options">
                  <ComparisonArtboard ui={ui} lessonText={lessonDetails?.text} lessonHref={lessonHref} lang={lang} />
                  <ComparisonArtboard ui={ui} lessonText={lessonDetails?.text} lessonHref={lessonHref} lang={lang} mobile />
                </div>
              </section>
            </div>

            <section data-section="rental-pickup" className="relative left-1/2 mt-2 h-[828px] w-screen max-w-[1235px] -translate-x-1/2 overflow-hidden text-epicWhite shadow-[0_8px_0_0_#FE746A] md:mt-20 md:h-[461px]">
              <Image data-role="rental-pickup-photo" src={rentalPageAssets.redesign.pickup} alt="" aria-hidden="true" fill sizes="(min-width: 768px) 1235px, 100vw" className="!top-[-6%] !h-[106%] object-cover object-[19%_center] md:!top-0 md:!h-full md:object-[center_24%]" />
              <div data-role="rental-pickup-gradient" aria-hidden="true" className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(46,46,46,0.62)_0%,rgba(46,46,46,0.52)_30%,rgba(46,46,46,0.16)_50%,rgba(46,46,46,0)_66%)] md:bg-[linear-gradient(90deg,rgba(46,46,46,0.76)_0%,rgba(46,46,46,0.64)_27%,rgba(46,46,46,0.24)_45%,rgba(46,46,46,0)_60%)]" />
              <div className="relative z-10 grid h-[828px] content-start md:h-[461px] md:grid-cols-[0.92fr_1.08fr] md:content-normal md:items-stretch">
                <div data-role="rental-pickup-copy" className="px-7 pb-6 pt-4 text-center md:px-10 md:pb-10 md:pt-9 md:text-left lg:px-14">
                  <h2 data-role="rental-pickup-heading" className={`mx-auto max-w-[11ch] font-heading uppercase text-epicWhite md:mx-0 ${lang === "ru" ? "text-[30px] leading-[1.06] md:text-[36px]" : "text-[38px] leading-[1.1] md:text-[42px]"}`}>{ui.pickupTitle}</h2>
                  <p data-role="rental-pickup-description" className={`mx-auto mt-7 font-normal text-epicWhite/95 md:mx-0 md:max-w-[19rem] ${lang === "ru" ? "max-w-[21rem] text-[15px] leading-[1.65] md:mt-8 md:text-[16px] md:leading-[1.6]" : "max-w-[260px] text-[16px] leading-7 md:mt-12 md:text-[18px] md:leading-7"}`}>{pickupDetails?.text}</p>
                <div className="flex justify-start pl-[22px] md:block md:pl-0">
                <EditorialAction
                  href={links.whatsapp}
                  onClick={(event) => handleMessengerClick(
                    event,
                    "whatsapp_click",
                    "ask_about_conditions",
                    () => buildWhatsAppUrl(links.whatsapp, rentalMessage(activeBoard, lang, content.contactMessage), { language: lang }),
                  )}
                    className="mt-10 bg-epicDark text-epicWhite shadow-[5px_5px_0_0_#F6F6F6] [padding-inline:8px] hover:bg-epicRed hover:text-epicDark md:mt-16 md:[padding-inline:24px]"
                >
                  {ui.conditionsCta}
                </EditorialAction>
                </div>
                </div>
                <div data-role="rental-pickup-live-cam" className="min-w-0 px-7 pb-10 pt-0 md:pb-8 md:pl-[132px] md:pr-12 md:pt-[34px]">
                  <RentalLiveCamPreview lang={lang} />
                </div>
              </div>
            </section>

            <section data-section="rental-faq" className="relative left-1/2 mt-16 w-screen -translate-x-1/2 bg-epicWhite px-5 py-12 text-epicDark shadow-xl shadow-black/10 md:mt-20 md:py-16">
              <div className="mx-auto max-w-5xl">
                <h2 className="font-heading text-5xl uppercase leading-none text-epicDark md:text-7xl">{ui.faqTitle}</h2>
                <div className="mt-7 grid gap-x-16 md:grid-cols-2">
                  {content.faqItems.map(([question, answer], index) => (
                    <RentalFaqItem key={question} question={question} answer={answer} index={index} lang={lang} isLastOdd={content.faqItems.length % 2 === 1 && index === content.faqItems.length - 1} />
                  ))}
                </div>
              </div>
            </section>

            <section data-section="rental-related" className="relative mt-16 overflow-hidden px-1 py-2 text-epicWhite md:mt-20 md:py-4">
              <h2 className="px-1 font-heading text-4xl uppercase leading-tight text-epicMint md:text-5xl">{ui.relatedTitle}</h2>
              <div className="mt-7 border-t-2 border-epicWhite/45">
                {content.relatedItems.map((item, index) => (
                  <Link key={`${item.href}-${item.title}`} href={item.href} className="group grid min-h-[118px] grid-cols-[64px_1fr_28px] items-center gap-3 border-b-2 border-epicWhite/45 px-1 py-5 transition-colors hover:bg-epicWhite hover:px-4 hover:text-epicDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicMint md:grid-cols-[90px_1fr_36px]">
                    <span className="font-heading text-3xl text-epicRed md:text-4xl">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block text-base font-black uppercase leading-tight md:text-xl">{item.title}</span>
                      <span className="mt-2 block max-w-2xl text-sm font-medium leading-5 text-epicWhite/62 transition-colors group-hover:text-epicDark/65">{item.text}</span>
                    </span>
                    <ArrowRight size={24} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>

            <section data-section="rental-final-cta" className="relative left-1/2 mt-16 w-screen -translate-x-1/2 overflow-hidden bg-epicMint px-5 py-12 text-epicDark md:mt-20 md:py-16">
              <DecorativeFrame
                src={rentalPageAssets.ctaBrush}
                imgClassName="object-cover"
              />
              <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
                <h2 className="font-heading text-3xl uppercase leading-none text-epicDark md:text-4xl">
                  {ui.finalCta.split("\n").map((line, index) => (
                    <span key={line} className="block">{line}{index === 0 ? null : ""}</span>
                  ))}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <EditorialAction
                    href={links.whatsapp}
                    onClick={(event) => handleMessengerClick(
                      event,
                      "whatsapp_click",
                      "final_whatsapp",
                      () => buildWhatsAppUrl(links.whatsapp, rentalMessage(activeBoard, lang, content.contactMessage), { language: lang }),
                    )}
                    className="bg-epicRed text-epicWhite"
                  >
                    WhatsApp
                  </EditorialAction>
                  <EditorialAction
                    href={links.telegram}
                    onClick={(event) => handleMessengerClick(
                      event,
                      "telegram_click",
                      "final_telegram",
                      () => buildTelegramUrl(links.telegram, rentalMessage(activeBoard, lang, content.contactMessage), { language: lang }),
                    )}
                    className="bg-epicDark text-epicWhite"
                  >
                    Telegram
                  </EditorialAction>
                  <EditorialAction
                    href={links.zalo}
                    onClick={(event) => handleMessengerClick(
                      event,
                      "zalo_click",
                      "final_zalo",
                      () => buildZaloUrl(links.zalo, rentalMessage(activeBoard, lang, content.contactMessage), { language: lang }),
                    )}
                    className="bg-epicDark text-epicWhite"
                  >
                    Zalo
                  </EditorialAction>
                  <EditorialAction href="tel:+84905012198" className="bg-epicDark text-epicWhite">
                    {ui.call}
                  </EditorialAction>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      {editMode && (
        <aside
          data-section="rental-image-tuner"
          className="fixed bottom-3 left-3 right-3 z-[90] max-h-[calc(100vh-24px)] overflow-y-auto rounded-lg border border-white/15 bg-epicDark/95 p-4 text-white shadow-2xl backdrop-blur-md sm:left-auto sm:right-4 sm:w-[300px]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-wide text-epicMint">Image tuner</p>
              <p className="mt-1 truncate text-xs font-bold text-white/65">{activeBoard.id} · {activeBoard.displayName || activeBoard.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={resetImageAdjustment}
                className="text-[10px] font-black uppercase text-white/60 hover:text-epicMint"
              >
                Reset current
              </button>
              <button
                type="button"
                onClick={resetAllImageAdjustments}
                className="text-[10px] font-black uppercase text-white/35 hover:text-epicMint"
              >
                Reset all
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-1">
            {[...lightboxAssets, { key: "thumb", label: "Thumb" }].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setTunerSlot(key)}
                aria-pressed={tunerSlot === key}
                className={`h-8 rounded text-[9px] font-black uppercase ${tunerSlot === key ? "bg-epicMint text-epicDark" : "bg-white/10 text-white/65"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3">
            {tunerControls.map(({ key, label, min, max, step }) => (
              <label key={key} className="grid gap-1.5 text-[10px] font-bold uppercase text-white/55">
                <span className="flex items-center justify-between gap-3">
                  {label}
                  <span className="font-mono text-white/85">{activeAdjustment[key]}</span>
                </span>
                <input
                  aria-label={label}
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={activeAdjustment[key]}
                  onChange={(event) => updateImageAdjustment(key, event.target.value)}
                  className="w-full accent-epicMint"
                />
              </label>
            ))}

            <div className="grid gap-1.5 text-[10px] font-bold uppercase text-white/55">
              <span className="flex items-center justify-between gap-3">
                Rotate
                <span className="font-mono text-white/85">{activeAdjustment.rotate}°</span>
              </span>
              <div className="grid grid-cols-4 gap-1">
                {rotationOptions.map((angle) => (
                  <button
                    key={angle}
                    type="button"
                    aria-label={`Rotate ${angle} degrees`}
                    aria-pressed={activeAdjustment.rotate === angle}
                    onClick={() => updateImageAdjustment("rotate", angle)}
                    className={`h-9 rounded text-[10px] font-black transition-colors ${activeAdjustment.rotate === angle ? "bg-epicMint text-epicDark" : "bg-white/10 text-white/65 hover:bg-white/15 hover:text-white"}`}
                  >
                    {angle}°
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={copyImageConfig}
            className="mt-4 h-10 w-full rounded-md bg-epicRed px-4 text-[10px] font-black uppercase text-white"
          >
            {copyStatus}
          </button>
        </aside>
      )}

      {lightboxAsset && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Board image gallery"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightboxAsset(null);
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-epicDark/95 px-3 py-4 backdrop-blur-sm sm:px-6 sm:py-6"
        >
          <button
            type="button"
            onClick={() => setLightboxAsset(null)}
            aria-label="Close image gallery"
            className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-epicDark text-white transition-colors hover:border-epicMint hover:text-epicMint sm:right-6 sm:top-6"
          >
            <X size={24} />
          </button>

          <div className="relative flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center">
            <Image
              src={activeBoard.processedImages[`${lightboxAsset}-full`]}
              alt={`${activeBoard.displayName || activeBoard.name} ${lightboxAsset} enlarged view`}
              fill
              unoptimized
              sizes="100vw"
              className="object-contain"
            />
            <button
              type="button"
              onClick={() => changeLightboxAsset(-1)}
              aria-label="Previous image"
              className="absolute left-1 flex h-12 w-12 items-center justify-center rounded-full bg-epicDark/80 text-white transition-colors hover:text-epicMint sm:left-4"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              onClick={() => changeLightboxAsset(1)}
              aria-label="Next image"
              className="absolute right-1 flex h-12 w-12 items-center justify-center rounded-full bg-epicDark/80 text-white transition-colors hover:text-epicMint sm:right-4"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          <div className="mt-4 grid w-full max-w-lg grid-cols-3 gap-2 sm:gap-3">
            {lightboxAssets.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setLightboxAsset(key)}
                aria-label={`Show ${label}`}
                aria-pressed={lightboxAsset === key}
                className={`relative h-16 overflow-hidden rounded-md border-2 bg-epicDark sm:h-20 ${lightboxAsset === key ? "border-epicMint" : "border-white/20"}`}
              >
                <Image
                  src={activeBoard.processedImages[key]}
                  alt=""
                  fill
                  unoptimized
                  sizes="150px"
                  className={imageFitClass(key)}
                />
                <span className="absolute inset-x-0 bottom-0 bg-epicDark/80 py-1 text-[10px] font-black uppercase text-white">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <Footer t={t} lang={lang} links={links} InstagramIcon={InstagramIcon} FacebookIcon={FacebookIcon} variant="rental" />
      <RentalModal
        isRentalModalOpen={isRentalModalOpen}
        setRentalModalOpen={setRentalModalOpen}
        t={t}
        links={links}
        selectedBoard={activeBoard}
      />
    </div>
  );
}
