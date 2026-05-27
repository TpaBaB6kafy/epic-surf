import { links } from "./links";

const configuredSiteUrl =
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.surfdanang.com";

export const siteConfig = {
  name: "Epic Surf School Da Nang",
  shortName: "Epic Surf",
  siteUrl: configuredSiteUrl.replace(/\/$/, ""),
  defaultLocale: "en",
  alternateLocale: "ru",
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

export const seoLocales = {
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    alternateLocale: "ru_RU",
    title: "Epic Surf School Da Nang | Surf Lessons & Board Rentals",
    description:
      "Surf lessons, board rentals and surf community on My Khe Beach in Da Nang, Vietnam.",
    keywords: [
      "surf school Da Nang",
      "surf lessons Da Nang",
      "surfboard rental Da Nang",
      "My Khe Beach surf",
      "beginner surf lessons Vietnam",
      "Da Nang surf community",
    ],
    faqItems: [
      {
        question: "How long does it take to stand up on the board?",
        answer: "Most students get riding during the first lesson, but it is in your hands.",
      },
      {
        question: "Do I need experience for my first surf lesson?",
        answer:
          "No. We choose the board, spot and lesson pace based on your current level.",
      },
      {
        question: "Can I rent a surfboard at Epic Surf School?",
        answer:
          "Yes. We rent soft-tops, longboards, malibu boards and shortboards for different conditions.",
      },
    ],
  },
  ru: {
    htmlLang: "ru",
    ogLocale: "ru_RU",
    alternateLocale: "en_US",
    title: "Epic Surf School Da Nang | Уроки серфинга и аренда досок",
    description:
      "Epic Surf School Da Nang: уроки серфинга, аренда досок и серф-комьюнити на пляже My Khe в Дананге, Вьетнам.",
    keywords: [
      "серфинг Дананг",
      "уроки серфинга Дананг",
      "аренда досок Дананг",
      "серф школа Дананг",
      "серфинг My Khe",
      "Epic Surf School",
    ],
    faqItems: [
      {
        question: "Сколько нужно заниматься, чтобы встать на доску?",
        answer: "Большинство учеников уезжает уже на первом занятии, все в ваших руках.",
      },
      {
        question: "Нужен ли опыт для первого урока серфинга?",
        answer:
          "Нет. Мы подбираем доску, спот и темп занятия под уровень ученика.",
      },
      {
        question: "Можно ли арендовать доску в Epic Surf School?",
        answer:
          "Да. Мы сдаем софтборды, лонгборды, малибу и шортборды для разных условий.",
      },
    ],
  },
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localizedPath(locale = siteConfig.defaultLocale) {
  return locale === "ru" ? "/ru" : "/";
}

export function localizedUrl(locale = siteConfig.defaultLocale) {
  return absoluteUrl(localizedPath(locale));
}

export function localizedFragmentUrl(locale, fragment) {
  const path = localizedPath(locale);
  return absoluteUrl(`${path === "/" ? "" : path}#${fragment}`);
}

export function languageAlternates() {
  return {
    en: localizedUrl("en"),
    ru: localizedUrl("ru"),
    "x-default": localizedUrl("en"),
  };
}

export function buildMetadata(locale = siteConfig.defaultLocale) {
  const seo = seoLocales[locale] || seoLocales.en;

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    applicationName: siteConfig.name,
    title: {
      default: seo.title,
      template: `%s | ${siteConfig.shortName}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "sports",
    alternates: {
      canonical: localizedPath(locale),
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      locale: seo.ogLocale,
      alternateLocale: [seo.alternateLocale],
      url: localizedPath(locale),
      siteName: siteConfig.name,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: "Da Nang Surfing Open 2025 by Epic Surf School",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [siteConfig.ogImage],
    },
    icons: {
      icon: "/favicon.ico",
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2B2D42",
};

export function buildStructuredData(locale = siteConfig.defaultLocale) {
  const seo = seoLocales[locale] || seoLocales.en;
  const pageUrl = localizedUrl(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["School", "SportsActivityLocation", "LocalBusiness"],
        "@id": absoluteUrl("/#business"),
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url: siteConfig.siteUrl,
        image: absoluteUrl(siteConfig.ogImage),
        telephone: siteConfig.phone,
        priceRange: siteConfig.priceRange,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.streetAddress,
          addressLocality: siteConfig.address.addressLocality,
          addressCountry: siteConfig.address.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        areaServed: {
          "@type": "City",
          name: "Da Nang",
        },
        sameAs: siteConfig.socialLinks,
        knowsAbout: [
          "Surf lessons",
          "Surfboard rental",
          "Beginner surfing",
          "My Khe Beach",
          "Da Nang surfing",
        ],
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        inLanguage: ["en", "ru"],
        publisher: { "@id": absoluteUrl("/#business") },
      },
      {
        "@type": "WebPage",
        "@id": localizedFragmentUrl(locale, "webpage"),
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": absoluteUrl("/#website") },
        about: { "@id": absoluteUrl("/#business") },
        inLanguage: seo.htmlLang,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.ogImage),
        },
      },
      {
        "@type": "Service",
        "@id": absoluteUrl("/#surf-lessons"),
        name: "Surf lessons in Da Nang",
        serviceType: "Surf lessons",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Da Nang, Vietnam",
        offers: {
          "@type": "Offer",
          url: links.group,
          priceCurrency: "VND",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Service",
        "@id": absoluteUrl("/#board-rentals"),
        name: "Surfboard rentals in Da Nang",
        serviceType: "Surfboard rental",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Da Nang, Vietnam",
        offers: {
          "@type": "Offer",
          url: links.rental,
          priceCurrency: "VND",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        "@id": localizedFragmentUrl(locale, "faq-schema"),
        mainEntity: seo.faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
