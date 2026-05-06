import { links } from "./links";

const configuredSiteUrl =
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://epic-surf.vercel.app";

export const siteConfig = {
  name: "Epic Surf School Da Nang",
  shortName: "Epic Surf",
  title: "Epic Surf School Da Nang | Surf Lessons & Board Rentals",
  siteUrl: configuredSiteUrl.replace(/\/$/, ""),
  defaultLocale: "ru",
  alternateLocale: "en",
  description:
    "Epic Surf School Da Nang: уроки серфинга, аренда досок и surf community на пляже My Khe во Вьетнаме.",
  englishDescription:
    "Surf lessons, board rentals and surf community on My Khe Beach in Da Nang, Vietnam.",
  phone: "+84383880164",
  priceRange: "$$",
  address: {
    streetAddress: "My Khe Beach",
    addressLocality: "Da Nang",
    addressCountry: "VN",
  },
  geo: {
    latitude: 16.0464674,
    longitude: 108.2504812,
  },
  socialLinks: [
    links.instagram,
    links.facebook,
    links.youtube,
    links.threads,
    links.telegram,
    links.telegramChannel,
  ],
  ogImage: "/gallery/events/danang-open-2025/danang-open-2025-3.webp",
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const seoFaqItems = [
  {
    question: "Сколько нужно заниматься, чтобы встать на доску?",
    answer: "Большинство учеников уезжает уже на первом занятии, все в ваших руках.",
  },
  {
    question: "Нужен ли опыт для первого урока серфинга?",
    answer: "Нет. Мы подбираем доску, спот и темп занятия под уровень ученика.",
  },
  {
    question: "Можно ли арендовать доску в Epic Surf School?",
    answer: "Да. Мы сдаем софтборды, лонгборды, малибу и шортборды для разных условий.",
  },
];
