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
  { key: "main", label: "Main" },
  { key: "nose", label: "Nose" },
  { key: "tail", label: "Tail" },
  { key: "fins", label: "Fins" },
];

const defaultImageAdjustment = {
  scale: 1,
  x: 0,
  y: 0,
  rotate: 0,
};

const imageAdjustmentStorageKey = "epic_rental_image_adjustments_draft";
const imageAdjustmentSlots = ["main", "nose", "tail", "fins", "thumb"];
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
      main: boardAssetPath(board, index, "main"),
      front: boardAssetPath(board, index, "front"),
      back: boardAssetPath(board, index, "back"),
      nose: boardAssetPath(board, index, "back-nose"),
      tail: boardAssetPath(board, index, "back-middle"),
      fins: boardAssetPath(board, index, "back-tail-fins"),
      thumb: boardAssetPath(board, index, "thumb"),
    },
  };
}

function compactPrice(price) {
  return price.amount.toLocaleString("en-US");
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
    [ui.specs[3], board.waves || board.bestFor[0] || "Check with Epic team"],
    [ui.specs[4], ui.leash],
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
  const [isRentalModalOpen, setRentalModalOpen] = useState(false);
  const [lightboxAsset, setLightboxAsset] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tunerSlot, setTunerSlot] = useState("main");
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
    <div className="min-h-screen overflow-x-clip bg-epicWhite font-sans text-epicDark">
      <main>
        <section data-section="rental-design-hero" className="relative overflow-hidden bg-[#101313] text-epicWhite">
          <div className="absolute inset-0">
            <Image
              src="/rentals/hero/rental-hero-mobile.webp"
              alt=""
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-center opacity-60 md:hidden"
            />
            <Image
              src="/rentals/hero/rental-hero-desktop.webp"
              alt=""
              fill
              priority
              unoptimized
              sizes="(min-width: 768px) 100vw, 1px"
              className="hidden object-cover object-center opacity-60 md:block"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(170,255,199,0.16),transparent_28%),linear-gradient(90deg,#101313_0%,rgba(16,19,19,0.95)_34%,rgba(16,19,19,0.66)_65%,#101313_100%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-5 sm:px-8 md:pb-32 md:pt-8 lg:px-10">
            <header className="flex items-center justify-between gap-5">
              <Link href={lang === "ru" ? "/ru" : "/"} className="shrink-0" aria-label="Epic Surf School home">
                <Image
                  src="/epic-logo-v-ksu-v4.png"
                  alt="EPIC Surf School"
                  width={104}
                  height={76}
                  priority
                  loading="eager"
                  className="h-auto w-20 lg:w-[104px]"
                />
              </Link>
              <nav className="hidden items-center gap-9 lg:flex">
                {ui.navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="text-[11px] font-black uppercase tracking-wide text-white/90 transition-colors hover:text-epicMint">
                    {item.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => openRentalModal("rental_page_header")}
                  className="h-11 rounded-full bg-epicRed px-6 text-[11px] font-black uppercase tracking-wide text-white shadow-lg shadow-epicRed/20"
                >
                  {ui.headerCta}
                </button>
              </nav>
            </header>

            <div className="grid min-h-[500px] items-center gap-8 py-16 md:min-h-[620px] lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
              <div className="max-w-[560px]">
                <p className="mb-8 inline-flex rounded bg-epicMint px-3 py-1 text-[10px] font-black uppercase tracking-wide text-epicDark">
                  {ui.heroEyebrow}
                </p>
                <h1 className="font-heading uppercase tracking-normal text-white" aria-label={content.heroTitle}>
                  <span
                    data-hero-title-primary
                    className="block text-[46px] leading-[0.92] sm:text-[62px] md:text-[76px] lg:text-[82px]"
                  >
                    {content.heroTitlePrimary}
                  </span>
                  <span
                    data-hero-title-secondary
                    className="mt-2 block max-w-[520px] text-[24px] leading-none text-white/92 sm:text-[31px] md:text-[38px] lg:text-[42px]"
                  >
                    {content.heroTitleSecondary}
                  </span>
                </h1>
                <p className="mt-7 max-w-[500px] text-sm font-bold leading-6 text-white/78 md:text-base md:leading-7">
                  {content.heroIntro}
                </p>
              </div>

              <div className="relative hidden min-h-[420px] lg:block">
                <div className="absolute left-[20%] top-[18%] rotate-[-12deg] rounded-xl border-[5px] border-epicMint px-9 py-6 text-center text-3xl font-black uppercase leading-tight tracking-normal text-epicMint shadow-[0_0_36px_rgba(170,255,199,0.12)]">
                  Epic
                  <br />
                  {ui.stamp}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-section="rental-board-showroom" className="relative bg-[#101313] px-5 pb-10 text-epicWhite sm:px-8 lg:px-10">
          <div className="mx-auto -mt-24 max-w-7xl md:-mt-36">
            <div className="grid gap-1 lg:grid-cols-[1.28fr_0.72fr_1.45fr]">
              <div ref={showroomImageRef} className="relative min-h-[560px] overflow-hidden rounded-t-[28px] bg-epicDark md:min-h-[720px] lg:rounded-l-[28px] lg:rounded-tr-none">
                <button
                  type="button"
                  onClick={() => setLightboxAsset("main")}
                  aria-label={`Open ${activeBoard.displayName || activeBoard.name} main view`}
                  className="group absolute inset-0 cursor-zoom-in"
                >
                  <Image
                    src={activeBoard.processedImages.main}
                    alt={`${activeBoard.displayName || activeBoard.name} main view`}
                    data-image-slot="main"
                    fill
                    priority
                    unoptimized
                    sizes="(min-width: 1024px) 480px, 100vw"
                    style={adjustmentStyle(imageAdjustments, activeBoard.id, "main")}
                    className="object-cover transition-transform duration-200"
                  />
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-epicDark/55 text-white/80 opacity-70 backdrop-blur-sm transition-opacity md:opacity-0 md:group-hover:opacity-100">
                    <ZoomIn size={18} aria-hidden="true" />
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1 lg:grid-cols-1">
                {[
                  ["nose", "Nose detail"],
                  ["tail", "Tail detail"],
                  ["fins", "Fin setup"],
                ].map(([asset, label]) => (
                  <div key={asset} className="relative min-h-[150px] overflow-hidden bg-epicDark md:min-h-[190px] lg:min-h-0">
                    <button
                      type="button"
                      onClick={() => setLightboxAsset(asset)}
                      aria-label={`Open ${activeBoard.displayName || activeBoard.name} ${asset}`}
                      className="absolute inset-0 cursor-zoom-in"
                    >
                      <Image
                        src={activeBoard.processedImages[asset]}
                        alt={`${activeBoard.displayName || activeBoard.name} ${label}`}
                        data-image-slot={asset}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 260px, 33vw"
                        style={adjustmentStyle(imageAdjustments, activeBoard.id, asset)}
                        className="object-cover transition-transform duration-200"
                      />
                    </button>
                  </div>
                ))}
              </div>

              <article className="flex min-h-[520px] flex-col bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.09),transparent_32%),#202020] px-7 py-9 md:px-12 md:py-12 lg:rounded-r-[28px]">
                <span className="w-fit rounded-md bg-epicMint px-4 py-1.5 text-[11px] font-black uppercase text-epicDark">
                  {readableLevels(activeBoard, lang)}
                </span>
                <h2 className="mt-7 font-heading text-4xl uppercase leading-none tracking-normal text-white md:text-6xl">
                  {activeBoard.displayName || activeBoard.name}
                </h2>
                <div className="mt-7 h-1 w-20 bg-epicRed" />
                <div className="mt-8">
                  <p className="text-xs font-black uppercase text-white/70">{ui.from}</p>
                  <p className="mt-1 flex flex-wrap items-end gap-3 font-heading text-5xl leading-none text-epicMint">
                    {compactPrice(activeBoard.price)}
                    <span className="pb-1 text-base font-black text-white">VND</span>
                    <span className="pb-1 text-base font-black text-white/45">/</span>
                    <span className="pb-1 text-base font-black text-white">{lang === "ru" ? ui.priceUnit : activeBoard.price.unit}</span>
                  </p>
                </div>
                <p className="mt-7 max-w-[500px] text-[15px] font-medium leading-7 text-white/74">{activeBoard.description}</p>
                <dl data-section="rental-board-specs" className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  {boardSpecs(activeBoard, lang, ui).map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[92px_1fr] gap-4 py-3 text-sm leading-5">
                      <dt className="font-medium text-white/45">{label}</dt>
                      <dd className="font-bold text-white/88">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-auto">
                  <button
                    type="button"
                    onClick={() => openRentalModal("rental_page_showroom")}
                    className="inline-flex h-14 w-full min-w-0 items-center justify-center rounded-lg bg-epicRed px-8 text-center text-[11px] font-black uppercase leading-tight tracking-wide text-white shadow-xl shadow-epicRed/20 transition-all hover:brightness-105 active:scale-95 sm:w-auto sm:min-w-[220px]"
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
                    className="w-full min-w-0 gap-3 border border-white/40 bg-transparent text-white hover:border-epicMint hover:text-epicMint sm:w-auto sm:min-w-[220px]"
                  >
                    <ArrowRight size={19} />
                    WhatsApp
                  </ActionPill>
                </div>
              </article>
            </div>

            <div className="flex flex-col gap-4 bg-[#101313] px-2 py-6 md:flex-row md:items-center md:px-8">
              <p className="shrink-0 pt-1 text-[10px] font-black uppercase tracking-wide text-white/50">
                {ui.otherBoards}
              </p>
              <div className="relative min-w-0 flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#101313] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#101313] to-transparent" />
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
                  className="scrollbar-hide flex min-w-0 cursor-grab touch-pan-x select-none gap-5 overflow-x-auto px-4 pb-2 active:cursor-grabbing"
                >
                  {boards.map((board) => {
                    const isActive = board.id === activeBoard.id;
                    return (
                      <button
                        key={board.id}
                        type="button"
                        data-board-id={board.id}
                        onClick={() => selectBoard(board.id)}
                        aria-label={`Show ${board.displayName || board.name}`}
                        aria-current={isActive ? "true" : undefined}
                        className="w-[88px] shrink-0 text-left text-white"
                      >
                        <span className={`relative block h-[88px] overflow-hidden rounded-lg border-2 bg-epicDark ${isActive ? "border-epicRed" : "border-transparent"}`}>
                          <Image
                            src={board.processedImages.thumb}
                            alt=""
                            data-image-slot="thumb"
                            draggable={false}
                            fill
                            unoptimized
                            sizes="88px"
                            style={adjustmentStyle(imageAdjustments, board.id, "thumb")}
                            className="object-cover"
                          />
                        </span>
                        <span className="mt-2 block truncate text-[10px] font-bold leading-tight">{board.displayName || board.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="hidden shrink-0 gap-2 lg:flex">
                <button
                  type="button"
                  onClick={() => scrollBoards(-1)}
                  aria-label="Scroll boards left"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-epicMint hover:text-epicMint"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollBoards(1)}
                  aria-label="Scroll boards right"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-epicMint hover:text-epicMint"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-epicWhite px-5 py-14 sm:px-8 md:py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div data-section="rental-info-cards" className="grid gap-px overflow-hidden rounded-lg bg-epicDark/10 sm:grid-cols-2 lg:grid-cols-3">
              {content.infoCards.map(({ icon: Icon, title, text }) => (
                <article key={title} className="bg-white px-7 py-11 text-center md:px-10 md:py-14">
                  <span data-role="info-icon-badge" className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-epicMint text-epicDark">
                    <Icon className="h-6 w-6" strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-7 text-base font-black uppercase leading-tight tracking-normal">{title}</h3>
                  <p className="mx-auto mt-5 max-w-[340px] text-sm font-medium leading-6 text-epicDark/68 md:text-[15px] md:leading-7">{text}</p>
                </article>
              ))}
            </div>

            <section data-section="rental-faq" className="mt-14 rounded-lg bg-white px-6 py-9 shadow-xl shadow-epicDark/5 md:mt-16 md:px-10 md:py-11">
              <h2 className="font-heading text-4xl uppercase leading-none">{ui.faqTitle}</h2>
              <div className="mt-7 grid gap-x-16 md:grid-cols-2">
                {content.faqItems.map(([question, answer]) => (
                  <details key={question} className="group border-b border-epicDark/12 py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[15px] font-black leading-snug">
                      {question}
                      <span className="text-xl font-normal transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 max-w-[560px] text-sm font-medium leading-6 text-epicDark/65">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section data-section="rental-related" className="relative mt-12 overflow-hidden rounded-2xl bg-epicDark px-6 py-9 text-white md:px-10 md:py-11">
              <div className="absolute inset-y-0 right-0 hidden w-[34%] md:block">
                <Image
                  src="/gallery/events/danang-open-2025/danang-open-2025-17.webp"
                  alt=""
                  fill
                  sizes="420px"
                  className="object-cover opacity-35 grayscale"
                />
              </div>
              <div className="relative z-10">
                <h2 className="font-heading text-2xl uppercase leading-tight text-epicMint">{ui.relatedTitle}</h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {content.relatedItems.map((item) => (
                    <Link key={`${item.href}-${item.title}`} href={item.href} className="rounded-lg border border-white/10 bg-white/5 p-5 transition-colors hover:border-epicMint/60">
                      <h3 className="text-sm font-black leading-tight">{item.title}</h3>
                      <p className="mt-2 text-xs font-medium leading-5 text-white/58">{item.text}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section data-section="rental-final-cta" className="mt-12 bg-epicMint px-6 py-9 md:px-12 md:py-11 lg:px-16">
              <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
                <h2 className="font-heading text-3xl uppercase leading-none md:text-4xl">
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
                    className="bg-epicRed text-white"
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
                    className="bg-epicDark text-white"
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
                    className="bg-epicDark text-white"
                  >
                    Zalo
                  </ActionPill>
                  <ActionPill href="tel:+84905012198" className="bg-epicDark text-white">
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

          <div className="mt-4 grid grid-cols-5 gap-1">
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
              src={activeBoard.processedImages[lightboxAsset]}
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

          <div className="mt-4 grid w-full max-w-xl grid-cols-4 gap-2 sm:gap-3">
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
                  className="object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-epicDark/80 py-1 text-[10px] font-black uppercase text-white">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <Footer t={t} lang={lang} links={links} InstagramIcon={InstagramIcon} FacebookIcon={FacebookIcon} />
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
