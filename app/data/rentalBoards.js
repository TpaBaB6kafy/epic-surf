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
  intermediate: "продолжающий",
  advanced: "продвинутый",
};

function boardImage(number) {
  return `/rentals/boards/board-${String(number).padStart(2, "0")}.png`;
}

function boardBackImage(number) {
  return `/rentals/boards/board-${String(number).padStart(2, "0")}-back.png?v=2`;
}

function boardPrice(amount) {
  return { amount, currency: "VND", unit: "2 hours" };
}

function boardBase({
  number,
  name,
  type,
  size,
  level,
  price,
  waves,
  wavesRu,
  description,
  descriptionRu,
  bestFor,
  bestForRu,
  recommended = false,
}) {
  return {
    id: `board-${String(number).padStart(2, "0")}`,
    name,
    type,
    size,
    level,
    price: boardPrice(price),
    waves,
    bestFor,
    description,
    localized: {
      ru: {
        waves: wavesRu,
        bestFor: bestForRu,
        description: descriptionRu,
      },
    },
    image: boardImage(number),
    backImage: boardBackImage(number),
    images: [boardImage(number)],
    available: true,
    recommended,
    visualScale: 1,
    visualOffsetX: 0,
    visualOffsetY: 0,
  };
}

export const rentalBoards = [
  boardBase({
    number: 1,
    name: "Softboard Orange",
    type: "softboard",
    size: "8'0 / 9'0",
    level: ["beginner"],
    price: 250000,
    waves: "Small, Medium",
    wavesRu: "Маленькие, средние",
    bestFor: ["Small, Medium", "Stable practice", "Beginner sessions"],
    bestForRu: ["Маленькие, средние", "Стабильная практика", "Сессии для начинающих"],
    description: "Soft and stable beginner-friendly board. Easy to catch waves and perfect for building confidence in the water.",
    descriptionRu: "Мягкая и устойчивая доска для начинающих. Легко ловит волны и помогает уверенно прогрессировать.",
    recommended: true,
  }),
  boardBase({
    number: 2,
    name: "Softboard Pink",
    type: "softboard",
    size: "7'0 / 8'0 / 8'5 / 8'6 / 9'0",
    level: ["beginner"],
    price: 250000,
    waves: "Small, Medium",
    wavesRu: "Маленькие, средние",
    bestFor: ["Small, Medium", "Extra stability", "Newer surfers"],
    bestForRu: ["Маленькие, средние", "Больше стабильности", "Для начинающих серферов"],
    description: "Soft and stable beginner-friendly board. Easy to catch waves and perfect for building confidence in the water.",
    descriptionRu: "Мягкая и устойчивая доска для начинающих. Легко ловит волны и помогает уверенно прогрессировать.",
    recommended: true,
  }),
  boardBase({
    number: 3,
    name: "Resistance Malibu White",
    type: "malibu",
    size: "7'6",
    level: ["intermediate", "advanced"],
    price: 300000,
    waves: "All wave types",
    wavesRu: "Все типы волн",
    bestFor: ["All wave types", "Sharper sections", "More dynamic surfing"],
    bestForRu: ["Все типы волн", "Более резкие секции", "Более динамичное катание"],
    description: "A maneuverable Malibu for confident surfers. Builds speed easily, helps develop sharper turns, and handles sections with confidence. A great choice for surfers looking for more freedom and performance than a classic Malibu.",
    descriptionRu: "Маневренная доска для уверенных райдеров. Хорошо разгоняется на волне, помогает брать и уверенно проходить более резкие секции. Отличный вариант для тех, кто хочет больше свободы и динамики, чем на классической Malibu.",
  }),
  boardBase({
    number: 4,
    name: "Malibu Green",
    type: "malibu",
    size: "8'0",
    level: ["beginner", "intermediate"],
    price: 300000,
    waves: "Small to Medium",
    wavesRu: "Маленькие и средние",
    bestFor: ["Small to Medium", "Learning turns", "Confident progression"],
    bestForRu: ["Маленькие и средние", "Обучение поворотам", "Уверенный прогресс"],
    description: "A versatile board for learning and progression. Easy wave catching, great stability, and the perfect platform for building confidence and learning your first turns.",
    descriptionRu: "Универсальная доска для обучения и уверенного прогресса. Легко ловит волны, сохраняет стабильность и помогает комфортно переходить от базовых навыков к первым самостоятельным манёврам.",
  }),
  boardBase({
    number: 5,
    name: "Mini Malibu Red",
    type: "malibu",
    size: "7'0",
    level: ["intermediate", "advanced"],
    price: 300000,
    waves: "Medium to Large",
    wavesRu: "Средние и большие",
    bestFor: ["Medium to Large", "Speed generation", "Confident surfing"],
    bestForRu: ["Средние и большие", "Набор скорости", "Уверенное катание"],
    description: "A mini malibu with a shortboard feel. Fast, maneuverable, and perfect for building speed, improving turns, and surfing more powerful waves with confidence.",
    descriptionRu: "Мини-малибу с характером шортборда. Быстрая, маневренная и отлично подходит для уверенного катания, набора скорости и прогресса на более мощных волнах.",
  }),
  boardBase({
    number: 6,
    name: "Magswell Dark Flow Shortboard",
    type: "shortboard",
    size: "5'10",
    level: ["advanced"],
    price: 350000,
    waves: "Medium to Large",
    wavesRu: "Средние и большие",
    bestFor: ["Medium to Large", "Powerful waves", "Aggressive maneuvers"],
    bestForRu: ["Средние и большие", "Мощные волны", "Агрессивные манёвры"],
    description: "A fast and responsive performance shortboard for advanced surfers. Built for powerful waves, speed generation, and aggressive maneuvers.",
    descriptionRu: "Быстрый и отзывчивый шортборд для опытных серферов. Отлично чувствует себя на мощных волнах, позволяет уверенно набирать скорость и выполнять агрессивные манёвры.",
  }),
  boardBase({
    number: 7,
    name: "BSB Mid-Length",
    type: "midlength",
    size: "6'8",
    level: ["intermediate", "advanced"],
    price: 350000,
    waves: "Small to Medium",
    wavesRu: "Маленькие и средние",
    bestFor: ["Small to Medium", "More waves", "Flowing down-the-line rides"],
    bestForRu: ["Маленькие и средние", "Больше пойманных волн", "Длинные проезды по стенке"],
    description: "A great choice for surfers looking to catch more waves without sacrificing maneuverability. Fast, stable, and fun to ride, it offers smooth progression and long, flowing rides down the line.",
    descriptionRu: "Отличный вариант для тех, кто хочет ловить больше волн, сохраняя хорошую манёвренность. Быстрая, стабильная и очень приятная в катании доска для уверенного прогресса и длинных проездов по стенке волны.",
  }),
  boardBase({
    number: 8,
    name: "REDZ Funboard",
    type: "funboard",
    size: "6'6",
    level: ["intermediate"],
    price: 350000,
    waves: "Small to Medium",
    wavesRu: "Маленькие и средние",
    bestFor: ["Small to Medium", "Smooth progression", "More control"],
    bestForRu: ["Маленькие и средние", "Плавный прогресс", "Больше контроля"],
    description: "A versatile funboard designed for smooth progression. Perfect for surfers who have mastered the basics and are looking for more maneuverability and control on the wave.",
    descriptionRu: "Универсальный фанборд для прогресса. Отлично подходит для тех, кто уже освоил базовые элементы серфинга и хочет больше манёвренности и контроля на волне.",
  }),
  boardBase({
    number: 9,
    name: "Luke Studer Shortboard",
    type: "shortboard",
    size: "6'1",
    level: ["advanced"],
    price: 350000,
    waves: "Medium to Large",
    wavesRu: "Средние и большие",
    bestFor: ["Medium to Large", "Sharp turns", "High-performance surfing"],
    bestForRu: ["Средние и большие", "Резкие повороты", "Performance-серфинг"],
    description: "Built for speed, sharp turns, and high-performance surfing. A great choice for experienced surfers when the waves turn on.",
    descriptionRu: "Классический шортборд для тех дней, когда хочется скорости, резких поворотов и максимум драйва на волне. Отличный выбор для уверенных серферов в хороших условиях.",
  }),
  boardBase({
    number: 10,
    name: "Resistance Longboard Pink",
    type: "longboard",
    size: "9'0",
    level: ["beginner", "intermediate"],
    price: 300000,
    waves: "Small to Medium",
    wavesRu: "Маленькие и средние",
    bestFor: ["Small to Medium", "First cross-steps", "Long smooth rides"],
    bestForRu: ["Маленькие и средние", "Первые кросс-степы", "Длинные плавные проезды"],
    description: "A lightweight and responsive longboard for small to medium waves. Perfect for learning your first cross-steps, improving technique, and enjoying long, smooth rides.",
    descriptionRu: "Лёгкий и отзывчивый лонгборд для райдеров с небольшим весом. Отличный выбор для тех, кто хочет попробовать первые кросс-степы, поработать над техникой и получать удовольствие от длинных проездов.",
  }),
  boardBase({
    number: 11,
    name: "Malibu Resistance White",
    type: "malibu",
    size: "8'6",
    level: ["beginner", "intermediate"],
    price: 300000,
    waves: "Small to Medium",
    wavesRu: "Маленькие и средние",
    bestFor: ["Small to Medium", "Step-up from softboard", "Progression sessions"],
    bestForRu: ["Маленькие и средние", "Переход с софтборда", "Сессии для прогресса"],
    description: "A great choice for surfers ready to move from a softboard to a hardboard. Stable and forgiving, it catches waves easily and helps build confidence in the lineup.",
    descriptionRu: "Отличный вариант для тех, кто уже готов перейти с софтборда на хардборд. Стабильная и маневренная доска, которая легко ловит волны и помогает уверенно прогрессировать.",
  }),
  boardBase({
    number: 12,
    name: "Resistance Longboard Leopard",
    type: "longboard",
    size: "9'0",
    level: ["beginner", "intermediate"],
    price: 350000,
    waves: "From very small to larger mellow waves",
    wavesRu: "От очень маленьких до больших пологих волн",
    bestFor: ["Very small to mellow waves", "Step-up from softboard", "Wide range of conditions"],
    bestForRu: ["Очень маленькие и пологие волны", "Переход с софтборда", "Широкий диапазон условий"],
    description: "A great step-up from a softboard. Easy to paddle, catches waves effortlessly, and remains forgiving. Perfect for building confidence and progressing in a wide range of conditions.",
    descriptionRu: "Отличная доска для перехода с софтборда. Легко ловит волны, хорошо разгоняется и прощает ошибки. Идеальный вариант для первых самостоятельных катаний на лайн-апе.",
  }),
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
