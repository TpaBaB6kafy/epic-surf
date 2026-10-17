import { boardTypeLabels, getBoardLevelSummary, getBoardTypeLabel } from "./rentalBoards";

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
    waves: "Waves",
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
    waves: "Волны",
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

function boardSpecs(board, locale, ui) {
  return [
    [ui.specs[0], board.size],
    [ui.specs[1], board.finSetup || (locale === "ru" ? getBoardTypeLabel(board.type, "ru") : boardTypeLabels[board.type] || board.type)],
    [ui.specs[2], getBoardLevelSummary(board, locale)],
    ...(board.finSetup ? [[ui.waves, board.waves]] : []),
  ];
}

function rentalMessage(board, locale, contactMessage) {
  if (locale === "ru") return `${contactMessage || "Привет! Хочу арендовать доску."} Доска: ${board.displayName || board.name}.`;
  return `Hi! I want to rent: ${board.name}.`;
}


export { localeUi, buildPageContent, boardWithAssets, referencePrice, boardSpecs, rentalMessage };

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


export { defaultImageAdjustment, imageAdjustmentStorageKey, rotationOptions, tunerControls, normalizeImageAdjustments, getImageAdjustment, adjustmentStyle };
