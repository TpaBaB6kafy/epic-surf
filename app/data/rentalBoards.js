export const boardTypeLabels = {
  softboard: "Softboard",
  longboard: "Longboard",
  malibu: "Malibu",
  funboard: "Funboard",
  fish: "Fish",
  shortboard: "Shortboard",
};

const boardTypeLabelsRu = {
  softboard: "СОФТБОРД",
  longboard: "ЛОНГБОРД",
  malibu: "MALIBU",
  funboard: "FUNBOARD",
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
    name: "Softboard 8'0",
    type: "softboard",
    size: "8'0",
    level: ["beginner", "improver"],
    price: { amount: 250000, currency: "VND", unit: "2 hours" },
    bestFor: ["Small waves", "Stable practice", "First independent sessions"],
    description: "Stable soft-top board for relaxed practice and easier paddling.",
    localized: {
      ru: {
        bestFor: ["Небольшие волны", "Стабильная практика", "Первые самостоятельные сессии"],
        description: "Стабильный soft-top для спокойной практики и более лёгкой гребли.",
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
    name: "Softboard 8'6",
    type: "softboard",
    size: "8'6",
    level: ["beginner"],
    price: { amount: 250000, currency: "VND", unit: "2 hours" },
    bestFor: ["Extra stability", "Newer surfers", "Easy whitewater practice"],
    description: "A larger softboard for maximum forgiveness and float.",
    localized: {
      ru: {
        bestFor: ["Больше стабильности", "Для начинающих серферов", "Практика в пене"],
        description: "Более крупный софтборд с максимальной плавучестью и прощающей формой.",
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
    name: "Longboard 9'0",
    type: "longboard",
    size: "9'0",
    level: ["improver", "intermediate"],
    price: { amount: 300000, currency: "VND", unit: "2 hours" },
    bestFor: ["Small clean waves", "Relaxed trim", "Early wave entry"],
    description: "Classic longboard feel for smooth paddling and easy wave catching.",
    localized: {
      ru: {
        bestFor: ["Небольшие чистые волны", "Спокойное скольжение", "Ранний вход в волну"],
        description: "Классическое ощущение лонгборда: плавная гребля и легче ловить волну.",
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
    name: "Malibu 7'6",
    type: "malibu",
    size: "7'6",
    level: ["improver", "intermediate"],
    price: { amount: 300000, currency: "VND", unit: "2 hours" },
    bestFor: ["Progression sessions", "Turning practice", "Mixed beach-break days"],
    description: "A balanced shape for moving from softboards toward smaller boards.",
    localized: {
      ru: {
        bestFor: ["Сессии для прогресса", "Практика поворотов", "Разные условия beach break"],
        description: "Сбалансированная форма для перехода от софтбордов к более коротким доскам.",
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
    name: "Funboard 7'2",
    type: "funboard",
    size: "7'2",
    level: ["intermediate"],
    price: { amount: 300000, currency: "VND", unit: "2 hours" },
    bestFor: ["Easy turns", "Beach breaks", "Improving surfers"],
    description: "A responsive but still forgiving option for confident paddlers.",
    localized: {
      ru: {
        bestFor: ["Лёгкие повороты", "Beach break", "Для прогрессирующих серферов"],
        description: "Отзывчивая, но всё ещё forgiving доска для уверенной гребли.",
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
    name: "Fish 5'10",
    type: "fish",
    size: "5'10",
    level: ["intermediate", "advanced"],
    price: { amount: 350000, currency: "VND", unit: "2 hours" },
    bestFor: ["Fast small waves", "Down-the-line speed", "Experienced surfers"],
    description: "A lively fish for surfers who already read waves and control speed.",
    localized: {
      ru: {
        bestFor: ["Быстрые небольшие волны", "Скорость вдоль волны", "Опытные серферы"],
        description: "Живой fish для серферов, которые уже читают волну и контролируют скорость.",
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
    name: "Fish 6'0",
    type: "fish",
    size: "6'0",
    level: ["intermediate", "advanced"],
    price: { amount: 350000, currency: "VND", unit: "2 hours" },
    bestFor: ["Fast paddling", "Smaller surf", "Confident turns"],
    description: "A slightly fuller fish for speed without going too small.",
    localized: {
      ru: {
        bestFor: ["Быстрая гребля", "Небольшие волны", "Уверенные повороты"],
        description: "Чуть более объёмный fish для скорости без слишком короткой доски.",
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
    name: "Shortboard 6'0",
    type: "shortboard",
    size: "6'0",
    level: ["advanced"],
    price: { amount: 350000, currency: "VND", unit: "2 hours" },
    bestFor: ["Steeper waves", "Performance turns", "Advanced surfers"],
    description: "Performance shortboard for experienced surfers in suitable conditions.",
    localized: {
      ru: {
        bestFor: ["Более резкие волны", "Performance-повороты", "Продвинутые серферы"],
        description: "Performance shortboard для опытных серферов в подходящих условиях.",
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
    name: "Shortboard 6'2",
    type: "shortboard",
    size: "6'2",
    level: ["advanced"],
    price: { amount: 350000, currency: "VND", unit: "2 hours" },
    bestFor: ["Extra paddle power", "Open faces", "Experienced surfers"],
    description: "A shortboard with a touch more length for stronger paddling.",
    localized: {
      ru: {
        bestFor: ["Больше мощности в гребле", "Открытая стенка волны", "Опытные серферы"],
        description: "Shortboard с немного большей длиной для более сильной гребли.",
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
    name: "Longboard 9'4",
    type: "longboard",
    size: "9'4",
    level: ["improver", "intermediate", "advanced"],
    price: { amount: 300000, currency: "VND", unit: "2 hours" },
    bestFor: ["Tiny waves", "Nose-riding practice", "Smooth cruising"],
    description: "A high-volume longboard for relaxed sessions when the surf is small.",
    localized: {
      ru: {
        bestFor: ["Совсем маленькие волны", "Практика nose-riding", "Плавное катание"],
        description: "Объёмный лонгборд для расслабленных сессий, когда волны небольшие.",
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
    name: "Mini Malibu 7'0",
    type: "malibu",
    size: "7'0",
    level: ["improver", "intermediate"],
    price: { amount: 300000, currency: "VND", unit: "2 hours" },
    bestFor: ["Beach-break practice", "Earlier takeoffs", "Progression from softboards"],
    description: "Compact Malibu shape with enough float for smooth progression sessions.",
    localized: {
      ru: {
        bestFor: ["Практика на beach break", "Более ранний takeoff", "Прогресс после софтборда"],
        description: "Компактная Malibu-форма с достаточной плавучестью для плавного прогресса.",
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
    name: "Step-up 6'6",
    type: "shortboard",
    size: "6'6",
    level: ["intermediate", "advanced"],
    price: { amount: 350000, currency: "VND", unit: "2 hours" },
    bestFor: ["More paddle power", "Bigger clean days", "Confident surfers"],
    description: "A longer performance board for surfers who want control and extra drive.",
    localized: {
      ru: {
        bestFor: ["Больше мощности в гребле", "Чистые дни с волнами побольше", "Уверенные серферы"],
        description: "Более длинная performance-доска для контроля и дополнительного drive.",
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
