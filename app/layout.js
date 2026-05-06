import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { links } from "./data/links";
import { absoluteUrl, seoFaqItems, siteConfig } from "./data/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "surf school Da Nang",
    "surf lessons Da Nang",
    "surfboard rental Da Nang",
    "My Khe Beach surf",
    "серфинг Дананг",
    "уроки серфинга Дананг",
    "аренда досок Дананг",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "sports",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
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
    title: siteConfig.title,
    description: siteConfig.englishDescription,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2B2D42",
};

const structuredData = {
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
      inLanguage: ["ru", "en"],
      publisher: { "@id": absoluteUrl("/#business") },
    },
    {
      "@type": "WebPage",
      "@id": absoluteUrl("/#webpage"),
      url: siteConfig.siteUrl,
      name: siteConfig.title,
      description: siteConfig.description,
      isPartOf: { "@id": absoluteUrl("/#website") },
      about: { "@id": absoluteUrl("/#business") },
      inLanguage: ["ru", "en"],
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
      "@id": absoluteUrl("/#faq-schema"),
      mainEntity: seoFaqItems.map((item) => ({
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

export default function RootLayout({ children }) {
  return (
    <html 
      lang="ru" 
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
