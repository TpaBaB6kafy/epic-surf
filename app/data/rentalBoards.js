export const boardTypeLabels = {
  softboard: "Softboard",
  longboard: "Longboard",
  malibu: "Malibu",
  funboard: "Funboard",
  midlength: "Mid-length",
  fish: "Fish",
  shortboard: "Shortboard",
};

const boardTypeLabelsRu = {
  softboard: "СОФТБОРД",
  longboard: "ЛОНГБОРД",
  malibu: "MALIBU",
  funboard: "FUNBOARD",
  midlength: "MID-LENGTH",
  fish: "FISH",
  shortboard: "SHORTBOARD",
};

export const boardLevelLabels = {
  beginner: "Beginner",
  improver: "Improver",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const boardLevelLabelsRu = {
  beginner: "начинающий",
  improver: "прогрессирующий",
  intermediate: "средний уровень",
  advanced: "продвинутый",
};

function boardImage(number) {
  return `/rentals/boards/board-${String(number).padStart(2, "0")}.png`;
}

function boardBackImage(number) {
  return `/rentals/boards/board-${String(number).padStart(2, "0")}-back.png?v=2`;
}

export const rentalBoards = [
  {
    id: "board-01",
    name: "Softboard Orange",
    type: "softboard",
    size: "8'0 / 9'0",
    level: ["beginner"],
    price: { amount: 250000, currency: "VND", unit: "2 hours" },
    waves: "Small, Medium",
    bestFor: ["Small, Medium", "Stable practice", "Beginner sessions"],
    description: "Soft and stable beginner-friendly board. Easy to catch waves and perfect for building confidence in the water.",
    localized: {
      ru: {
        waves: "Маленькие, средние",
        bestFor: ["Маленькие, средние", "Стабильная практика", "Сессии для начинающих"],
        description: "Мягкая и устойчивая доска для начинающих. Легко ловит волны и помогает уверенно прогрессировать.",
      },
    },
    image: boardImage(1),
    backImage: boardBackImage(1),
    images: [boardImage(1)],
    available: true,
    recommended: true,
    visualScale: 1.03,
    visualOffsetX: 0,
    visualOffsetY: 8,
  },
  {
    id: "board-02",
    name: "Softboard Pink",
    type: "softboard",
    size: "7'0 / 8'0 / 8'5 / 8'6 / 9'0",
    level: ["beginner"],
    price: { amount: 250000, currency: "VND", unit: "2 hours" },
    waves: "Small, Medium",
    bestFor: ["Small, Medium", "Extra stability", "Newer surfers"],
    description: "Soft and stable beginner-friendly board. Easy to catch waves and perfect for building confidence in the water.",
    localized: {
      ru: {
        waves: "Маленькие, средние",
        bestFor: ["Маленькие, средние", "Больше стабильности", "Для начинающих серферов"],
        description: "Мягкая и устойчивая доска для начинающих. Легко ловит волны и помогает уверенно прогрессировать.",
      },
    },
    image: boardImage(2),
    backImage: boardBackImage(2),
    images: [boardImage(2)],
    available: true,
    recommended: true,
    visualScale: 1.03,
    visualOffsetX: 0,
    visualOffsetY: 10,
  },
  {
    id: "board-03",
    name: "Malibu Resistance White",
    type: "malibu",
    size: "8'6",
    level: ["beginner", "intermediate"],
    price: { amount: 300000, currency: "VND", unit: "2 hours" },
    waves: "Small to Medium",
    bestFor: ["Small to Medium", "Step-up from softboard", "Progression sessions"],
    description: "A great choice for surfers ready to move from a softboard to a hardboard. Stable and forgiving, it catches waves easily and helps build confidence in the lineup.",
    localized: {
      ru: {
        waves: "Маленькие и средние",
        bestFor: ["Маленькие и средние", "Переход с софтборда", "Сессии для прогресса"],
        description: "Отличный вариант для тех, кто уже готов перейти с софтборда на хардборд. Стабильная и маневренная доска, которая легко ловит волны и помогает уверенно прогрессировать.",
      },
    },
    image: boardImage(3),
    backImage: boardBackImage(3),
    images: [boardImage(3)],
    available: true,
    recommended: true,
    visualScale: 1.04,
    visualOffsetX: 0,
    visualOffsetY: 8,
  },
  {
    id: "board-04",
    name: "Malibu Green",
    type: "malibu",
    size: "8'0",
    level: ["beginner", "intermediate"],
    price: { amount: 300000, currency: "VND", unit: "2 hours" },
    waves: "Small to Medium",
    bestFor: ["Small to Medium", "Learning turns", "Confident progression"],
    description: "A versatile board for learning and progression. Easy wave catching, great stability, and the perfect platform for building confidence and learning your first turns.",
    localized: {
      ru: {
        waves: "Маленькие и средние",
        bestFor: ["Маленькие и средние", "Обучение поворотам", "Уверенный прогресс"],
        description: "Универсальная доска для обучения и уверенного прогресса. Легко ловит волны, сохраняет стабильность и помогает комфортно переходить от базовых навыков к первым самостоятельным манёврам.",
      },
    },
    image: boardImage(4),
    backImage: boardBackImage(4),
    images: [boardImage(4)],
    available: true,
    recommended: true,
    visualScale: 1.06,
    visualOffsetX: -4,
    visualOffsetY: 28,
  },
  {
    id: "board-05",
    name: "Mini Malibu Red",
    type: "malibu",
    size: "7'0",
    level: ["intermediate", "advanced"],
    price: { amount: 300000, currency: "VND", unit: "2 hours" },
    waves: "Medium to Large",
    bestFor: ["Medium to Large", "Speed generation", "Confident surfing"],
    description: "A mini malibu with a shortboard feel. Fast, maneuverable, and perfect for building speed, improving turns, and surfing more powerful waves with confidence.",
    localized: {
      ru: {
        waves: "Средние и большие",
        bestFor: ["Средние и большие", "Набор скорости", "Уверенное катание"],
        description: "Мини-малибу с характером шортборда. Быстрая, маневренная и отлично подходит для уверенного катания, набора скорости и прогресса на более мощных волнах.",
      },
    },
    image: boardImage(5),
    images: [boardImage(5)],
    available: true,
    recommended: false,
    visualScale: 1.01,
    visualOffsetX: 0,
    visualOffsetY: 14,
  },
  {
    id: "board-06",
    name: "Magswell Dark Flow Shortboard",
    type: "shortboard",
    size: "5'10",
    level: ["advanced"],
    price: { amount: 350000, currency: "VND", unit: "2 hours" },
    waves: "Medium to Large",
    bestFor: ["Medium to Large", "Powerful waves", "Aggressive maneuvers"],
    description: "A fast and responsive performance shortboard for advanced surfers. Built for powerful waves, speed generation, and aggressive maneuvers.",
    localized: {
      ru: {
        waves: "Средние и большие",
        bestFor: ["Средние и большие", "Мощные волны", "Агрессивные манёвры"],
        description: "Быстрый и отзывчивый шортборд для опытных серферов. Отлично чувствует себя на мощных волнах, позволяет уверенно набирать скорость и выполнять агрессивные манёвры.",
      },
    },
    image: boardImage(6),
    images: [boardImage(6)],
    available: true,
    recommended: false,
    visualScale: 0.88,
    visualOffsetX: 2,
    visualOffsetY: 24,
  },
  {
    id: "board-07",
    name: "BSB Mid-Length",
    type: "midlength",
    size: "6'8",
    level: ["intermediate", "advanced"],
    price: { amount: 350000, currency: "VND", unit: "2 hours" },
    waves: "Small to Medium",
    bestFor: ["Small to Medium", "More waves", "Flowing down-the-line rides"],
    description: "A great choice for surfers looking to catch more waves without sacrificing maneuverability. Fast, stable, and fun to ride, it offers smooth progression and long, flowing rides down the line.",
    localized: {
      ru: {
        waves: "Маленькие и средние",
        bestFor: ["Маленькие и средние", "Больше пойманных волн", "Длинные проезды по стенке"],
        description: "Отличный вариант для тех, кто хочет ловить больше волн, сохраняя хорошую манёвренность. Быстрая, стабильная и очень приятная в катании доска для уверенного прогресса и длинных проездов по стенке волны.",
      },
    },
    image: boardImage(7),
    images: [boardImage(7)],
    available: true,
    recommended: false,
    visualScale: 0.9,
    visualOffsetX: 0,
    visualOffsetY: 22,
  },
  {
    id: "board-08",
    name: "REDZ Funboard",
    type: "funboard",
    size: "6'6",
    level: ["intermediate"],
    price: { amount: 350000, currency: "VND", unit: "2 hours" },
    waves: "Small to Medium",
    bestFor: ["Small to Medium", "Smooth progression", "More control"],
    description: "A versatile funboard designed for smooth progression. Perfect for surfers who have mastered the basics and are looking for more maneuverability and control on the wave.",
    localized: {
      ru: {
        waves: "Маленькие и средние",
        bestFor: ["Маленькие и средние", "Плавный прогресс", "Больше контроля"],
        description: "Универсальный фанборд для прогресса. Отлично подходит для тех, кто уже освоил базовые элементы серфинга и хочет больше манёвренности и контроля на волне.",
      },
    },
    image: boardImage(8),
    images: [boardImage(8)],
    available: true,
    recommended: false,
    visualScale: 1,
    visualOffsetX: 2,
    visualOffsetY: 16,
  },
  {
    id: "board-09",
    name: "Luke Studer Shortboard",
    type: "shortboard",
    size: "6'1",
    level: ["advanced"],
    price: { amount: 350000, currency: "VND", unit: "2 hours" },
    waves: "Medium to Large",
    bestFor: ["Medium to Large", "Sharp turns", "High-performance surfing"],
    description: "Built for speed, sharp turns, and high-performance surfing. A great choice for experienced surfers when the waves turn on.",
    localized: {
      ru: {
        waves: "Средние и большие",
        bestFor: ["Средние и большие", "Резкие повороты", "Performance-серфинг"],
        description: "Классический шортборд для тех дней, когда хочется скорости, резких поворотов и максимум драйва на волне. Отличный выбор для уверенных серферов в хороших условиях.",
      },
    },
    image: boardImage(9),
    images: [boardImage(9)],
    available: true,
    recommended: false,
    visualScale: 1.02,
    visualOffsetX: -2,
    visualOffsetY: 16,
  },
  {
    id: "board-10",
    name: "Resistance Longboard Pink",
    type: "longboard",
    size: "9'0",
    level: ["beginner", "intermediate"],
    price: { amount: 300000, currency: "VND", unit: "2 hours" },
    waves: "Small to Medium",
    bestFor: ["Small to Medium", "First cross-steps", "Long smooth rides"],
    description: "A lightweight and responsive longboard for small to medium waves. Perfect for learning your first cross-steps, improving technique, and enjoying long, smooth rides.",
    localized: {
      ru: {
        waves: "Маленькие и средние",
        bestFor: ["Маленькие и средние", "Первые кросс-степы", "Длинные плавные проезды"],
        description: "Лёгкий и отзывчивый лонгборд для райдеров с небольшим весом. Отличный выбор для тех, кто хочет попробовать первые кросс-степы, поработать над техникой и получать удовольствие от длинных проездов.",
      },
    },
    image: boardImage(10),
    images: [boardImage(10)],
    available: true,
    recommended: false,
    visualScale: 1.04,
    visualOffsetX: 0,
    visualOffsetY: 8,
  },
  {
    id: "board-11",
    name: "Resistance Malibu White",
    type: "malibu",
    size: "7'6",
    level: ["intermediate", "advanced"],
    price: { amount: 300000, currency: "VND", unit: "2 hours" },
    waves: "All wave types",
    bestFor: ["All wave types", "Sharper sections", "More dynamic surfing"],
    description: "A maneuverable Malibu for confident surfers. Builds speed easily, helps develop sharper turns, and handles sections with confidence. A great choice for surfers looking for more freedom and performance than a classic Malibu.",
    localized: {
      ru: {
        waves: "Все типы волн",
        bestFor: ["Все типы волн", "Более резкие секции", "Более динамичное катание"],
        description: "Маневренная доска для уверенных райдеров. Хорошо разгоняется на волне, помогает брать и уверенно проходить более резкие секции. Отличный вариант для тех, кто хочет больше свободы и динамики, чем на классической Malibu.",
      },
    },
    image: boardImage(11),
    images: [boardImage(11)],
    available: true,
    recommended: false,
    visualScale: 1.02,
    visualOffsetX: 0,
    visualOffsetY: 14,
  },
  {
    id: "board-12",
    name: "Resistance Longboard Leopard",
    type: "longboard",
    size: "9'0",
    level: ["beginner", "intermediate"],
    price: { amount: 350000, currency: "VND", unit: "2 hours" },
    waves: "From very small to larger mellow waves",
    bestFor: ["From very small to larger mellow waves", "Step-up from softboard", "Wide range of conditions"],
    description: "A great step-up from a softboard. Easy to paddle, catches waves effortlessly, and remains forgiving. Perfect for building confidence and progressing in a wide range of conditions.",
    localized: {
      ru: {
        waves: "От очень маленьких до больших пологих волн",
        bestFor: ["От очень маленьких до больших пологих волн", "Переход с софтборда", "Широкий диапазон условий"],
        description: "Отличная доска для перехода с софтборда. Легко ловит волны, хорошо разгоняется и прощает ошибки. Идеальный вариант для первых самостоятельных катаний на лайн-апе.",
      },
    },
    image: boardImage(12),
    images: [boardImage(12)],
    available: true,
    recommended: false,
    visualScale: 1.06,
    visualOffsetX: 0,
    visualOffsetY: 14,
  },
];

function normalizedLanguage(lang = "en") {
  return lang === "ru" ? "ru" : "en";
}

export function getBoardTypeLabel(type, lang = "en") {
  return normalizedLanguage(lang) === "ru"
    ? boardTypeLabelsRu[type] || boardTypeLabels[type] || type
    : boardTypeLabels[type] || type;
}

export function getBoardLevelLabel(level, lang = "en") {
  return normalizedLanguage(lang) === "ru"
    ? boardLevelLabelsRu[level] || boardLevelLabels[level] || level
    : boardLevelLabels[level] || level;
}

export function getLocalizedBoard(board, lang = "en") {
  if (!board || normalizedLanguage(lang) !== "ru") return board;

  const localized = board.localized?.ru || {};

  return {
    ...board,
    displayName: localized.name || board.name,
    description: localized.description || board.description,
    bestFor: localized.bestFor || board.bestFor,
    waves: localized.waves || board.waves,
  };
}

export function formatBoardPrice(price, lang = "en") {
  const amount = price.amount.toLocaleString("en-US");
  if (normalizedLanguage(lang) === "ru") {
    return `от ${amount} ${price.currency} / 2 часа`;
  }

  return `from ${amount} ${price.currency} / ${price.unit}`;
}

export function getBoardTrackingPayload(board) {
  if (!board) return {};

  return {
    selected_board: board.id,
    board_type: board.type,
    board_level: board.level.join(","),
  };
}
