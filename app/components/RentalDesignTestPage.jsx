"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MapPin,
  Sparkles,
  Users,
  Waves,
  X,
  ZoomIn,
} from "lucide-react";
import Footer from "./Footer";
import RentalModal from "./RentalModal";
import { FacebookIcon, InstagramIcon } from "./Icons";
import { links } from "../data/links";
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
    icon: BadgeDollarSign,
    title: "Rental price",
    text: "From 250,000 VND for a two-hour session. Message Epic Surf School to confirm availability and board choice.",
  },
  {
    icon: Users,
    title: "Who rental is for",
    text: "Perfect for surfers who can paddle, catch green waves, avoid reefs, and want more freedom.",
  },
  {
    icon: Sparkles,
    title: "Board options",
    text: "Softboards, longboards, funboards, shortboards. Availability depends on the day and conditions.",
  },
  {
    icon: Waves,
    title: "How rental works",
    text: "Choose your board, show ID, pay the rental, get quick rules, and go surf. We are here if you need help.",
  },
  {
    icon: MapPin,
    title: "Pickup & location",
    text: "Epic Surf School is connected to the My Khe Beach surf area. Pickup confirmed by message.",
  },
  {
    icon: GraduationCap,
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
  },
};

const rentalPageAssets = {
  hero: "/rentals/page/rental-hero-boards-bw.jpg",
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
  infoFrames: [
    "/rentals/page/rental-info-frame-price.svg",
    "/rentals/page/rental-info-frame-who-for.svg",
    "/rentals/page/rental-info-frame-board-option.svg",
    "/rentals/page/rental-info-frame-how-works.svg",
    "/rentals/page/rental-info-frame-pick-location.svg",
    "/rentals/page/rental-info-frame-take-lesson.svg",
  ],
  surfInfoFrames: [
    "/rentals/page/rental-surf-info-frame-lessons.svg",
    "/rentals/page/rental-surf-info-frame-surfing.svg",
    "/rentals/page/rental-surf-info-frame-my-khe.svg",
    "/rentals/page/rental-surf-info-frame-guide.svg",
  ],
};

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
      { icon: BadgeDollarSign, title: price?.title, text: price?.body },
      { icon: Users, title: audience?.title, text: audience?.body },
      { icon: Sparkles, title: boards?.title, text: boards?.body },
      { icon: Waves, title: process?.title, text: process?.body },
      { icon: MapPin, title: "Получение доски", text: pageContent.rentalAvailabilityNote },
      { icon: GraduationCap, title: lesson?.title, text: lesson?.body },
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

const infoCardClipPath = "polygon(0% 2.82%, 29.46% 0%, 96.76% 2.82%, 100% 37.62%, 96.76% 100%, 42.88% 96.55%, 0% 100%)";
const surfInfoCardClipPath = "polygon(2% 0%, 100% 0%, 99% 96%, 0% 100%)";

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

function compactPrice(price) {
  return price.amount.toLocaleString("en-US");
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

function imageFitClass() {
  return "object-cover";
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

function ActionPill({ href, children, onClick, className = "" }) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className={`inline-flex h-14 items-center justify-center rounded-lg px-8 text-center text-[11px] font-black uppercase leading-tight tracking-wide transition-all active:scale-95 ${className}`}
    >
      {children}
    </a>
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
  const [activeMobileAsset, setActiveMobileAsset] = useState("front");
  const [isRentalModalOpen, setRentalModalOpen] = useState(false);
  const [lightboxAsset, setLightboxAsset] = useState(null);
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
    <div className="min-h-screen overflow-x-clip bg-epicDark font-sans text-epicWhite">
      <main>
        <section data-section="rental-design-hero" className="relative min-h-[54vh] overflow-hidden bg-epicDark shadow-2xl shadow-epicDark md:min-h-[68vh] lg:min-h-[76vh]">
          <h1 className="sr-only">{content.heroTitle}</h1>
          <Image
            src={rentalPageAssets.hero}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            data-role="rental-hero-image"
            className="object-cover object-center grayscale"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-epicDark/0 via-epicDark/10 to-epicDark" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-epicDark md:h-52" />
        </section>

        <section data-section="rental-board-showroom" className="relative bg-epicDark px-5 pb-10 text-epicWhite shadow-inner shadow-epicDark sm:px-8 lg:px-10">
          <div className="relative mx-auto max-w-7xl">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-x-4 top-8 hidden h-[720px] bg-epicGray/10 shadow-2xl shadow-epicDark/70 lg:block" />
            <div className="grid gap-2 lg:grid-cols-[0.9fr_0.68fr_1.22fr]">
              <div ref={showroomImageRef} className="lg:col-span-2">
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
                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-epicDark/55 text-epicWhite/80 opacity-70 backdrop-blur-sm">
                      <ZoomIn size={18} aria-hidden="true" />
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2.5 rounded-b-[20px] bg-epicDark pt-2 lg:hidden">
                  {lightboxAssets.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveMobileAsset(key)}
                      aria-label={`Show ${activeBoard.displayName || activeBoard.name} ${key} image`}
                      aria-pressed={activeMobileAsset === key}
                      className={`relative h-32 overflow-hidden rounded-xl border-2 bg-epicDark shadow-lg shadow-epicDark/45 transition-colors sm:h-36 ${activeMobileAsset === key ? "border-epicRed" : "border-epicWhite/15"}`}
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

                <div className="relative hidden aspect-[723/761] w-full bg-epicDark lg:block">
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

              <article className="relative flex min-h-[520px] flex-col items-center rounded-none border border-epicGray/15 bg-epicGray/10 px-7 py-9 text-center shadow-2xl shadow-epicDark/70 md:px-12 md:py-12 lg:justify-center lg:py-14">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-epicDark/25" />
                <div className="relative z-10 flex flex-col items-center">
                <h2 className="max-w-[460px] font-heading text-4xl uppercase leading-[0.9] tracking-normal text-epicWhite md:text-6xl lg:text-[58px]">
                  {activeBoard.displayName || activeBoard.name}
                </h2>
                <div className="mt-6">
                  <p className="font-heading text-5xl leading-none text-epicMint lg:text-[54px]">
                    {referencePrice(activeBoard.price)}
                    <span className="ml-2 align-baseline text-2xl text-epicMint">VND</span>
                  </p>
                  <p className="mt-1 text-sm font-black uppercase tracking-wide text-epicWhite">{lang === "ru" ? ui.priceUnit : activeBoard.price.unit}</p>
                </div>
                <p className="mt-7 max-w-[350px] text-[13px] font-bold leading-5 text-epicWhite/82 md:text-sm">{activeBoard.description}</p>
                <dl data-section="rental-board-specs" className="mt-8 w-full max-w-[360px]">
                  {boardSpecs(activeBoard, lang, ui).map(([label, value]) => (
                    <div key={label} data-role="rental-spec-row" className="grid grid-cols-[104px_1fr] gap-4 border-b-2 border-epicRed py-3.5 text-base leading-5 md:text-lg">
                      <dt className="text-left font-black text-epicWhite/82">{label}</dt>
                      <dd className="text-right font-black text-epicWhite">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-10 flex w-full max-w-[240px] flex-col items-stretch gap-4">
                  <button
                    type="button"
                    onClick={() => openRentalModal("rental_page_showroom")}
                    className="inline-flex h-12 w-full items-center justify-center rounded-none bg-epicRed px-8 text-center text-sm font-black uppercase leading-tight tracking-wide text-epicDark shadow-none transition-all hover:brightness-95 active:scale-95"
                  >
                    {ui.rentCta}
                  </button>
                  <ActionPill
                    href={links.whatsapp}
                    onClick={(event) => handleMessengerClick(
                      event,
                      "whatsapp_click",
                      "whatsapp_to_book",
                      () => buildWhatsAppUrl(links.whatsapp, rentalMessage(activeBoard, lang, content.contactMessage), { language: lang }),
                    )}
                    className="!h-12 w-full gap-3 !rounded-none bg-epicWhite text-epicDark hover:bg-epicMint"
                  >
                    <ArrowRight size={19} />
                    WhatsApp
                  </ActionPill>
                </div>
                </div>
              </article>
            </div>

            <div className="flex items-center justify-center gap-4 bg-epicDark px-2 py-8 md:px-8">
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
                        className="w-[88px] shrink-0 text-left text-epicWhite transition-transform duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-0.5 lg:w-[158px]"
                      >
                        <span
                          data-carousel-frame={frame}
                          style={{ clipPath: carouselClipPaths[index % carouselClipPaths.length] }}
                          className={`relative block h-[88px] overflow-hidden bg-epicDark grayscale transition-all lg:h-[164px] ${isActive ? "outline outline-[3px] outline-offset-2 outline-epicRed grayscale-0" : "opacity-75 hover:opacity-100"}`}
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

        <section className="relative bg-epicDark px-5 py-14 text-epicWhite shadow-inner shadow-epicDark sm:px-8 md:py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div data-section="rental-info-cards" className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {content.infoCards.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className="relative mx-auto aspect-[280/202] w-full max-w-[290px] overflow-visible px-7 pb-6 pt-12 text-center transition-transform duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-1">
                  <DecorativeFrame
                    src={rentalPageAssets.infoFrames[index]}
                    imgClassName="object-fill opacity-0"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-epicWhite shadow-xl shadow-epicDark/35"
                    style={{ clipPath: infoCardClipPath }}
                  />
                  <span data-role="info-icon-badge" className="absolute left-1/2 top-0 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-epicMint text-epicDark shadow-xl shadow-epicDark/30">
                    <Icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-[13px] font-black uppercase leading-tight tracking-normal text-epicDark">{title}</h3>
                    <p className="mx-auto mt-3 max-w-[230px] text-[11px] font-semibold leading-5 text-epicDark/62">{text}</p>
                  </div>
                </article>
              ))}
            </div>

            <section data-section="rental-faq" className="relative left-1/2 mt-16 w-screen -translate-x-1/2 bg-epicWhite px-5 py-12 text-epicDark shadow-2xl shadow-epicDark/45 md:mt-20 md:py-16">
              <div className="mx-auto max-w-5xl">
                <h2 className="font-heading text-3xl uppercase leading-none text-epicDark md:text-4xl">{ui.faqTitle}</h2>
                <div className="mt-7 grid gap-x-16 md:grid-cols-2">
                  {content.faqItems.map(([question, answer]) => (
                    <details key={question} className="group border-b border-epicDark/10 py-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-xs font-black leading-snug text-epicDark">
                        {question}
                        <span className="text-lg font-normal text-epicRed transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 max-w-[560px] text-sm font-medium leading-6 text-epicDark/65">
                        {answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            <section data-section="rental-related" className="relative mt-16 overflow-hidden px-1 py-2 text-epicWhite md:mt-20 md:py-4">
              <h2 className="px-1 font-heading text-2xl uppercase leading-tight text-epicMint">{ui.relatedTitle}</h2>
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {content.relatedItems.map((item, index) => (
                  <Link key={`${item.href}-${item.title}`} href={item.href} className="group relative aspect-[274/102] min-h-[104px] overflow-hidden px-5 py-5 shadow-lg shadow-epicDark/30 transition-transform duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-0.5">
                    <DecorativeFrame
                      src={rentalPageAssets.surfInfoFrames[index]}
                      imgClassName="object-fill opacity-0"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 border border-epicWhite/45 transition-colors duration-300 [@media(hover:hover)]:group-hover:border-epicMint"
                      style={{ clipPath: surfInfoCardClipPath }}
                    />
                    <span className="relative z-10 block">
                      <h3 className="text-sm font-black uppercase leading-tight text-epicWhite">{item.title}</h3>
                      <span aria-hidden="true" className="mt-2 block h-px w-8 bg-epicMint/0 transition-colors duration-300 [@media(hover:hover)]:group-hover:bg-epicMint" />
                      <p className="mt-2 max-w-[220px] text-[11px] font-medium leading-4 text-epicWhite/62">{item.text}</p>
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <section data-section="rental-final-cta" className="relative left-1/2 mt-16 w-screen -translate-x-1/2 overflow-hidden px-5 py-12 text-epicDark md:mt-20 md:py-16">
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
                  <ActionPill
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
                  </ActionPill>
                  <ActionPill
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
                  </ActionPill>
                  <ActionPill
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
                  </ActionPill>
                  <ActionPill href="tel:+84905012198" className="bg-epicDark text-epicWhite">
                    {ui.call}
                  </ActionPill>
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
