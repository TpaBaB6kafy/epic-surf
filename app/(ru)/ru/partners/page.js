import PartnersPage from "../../../components/PartnersPage";
import PageJsonLd from "../../../components/PageJsonLd";
import {
  buildWebPageStructuredData,
  openGraphImages,
  siteConfig,
  twitterMetadata,
} from "../../../data/siteConfig";

const path = "/ru/partners";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    absolute: "Для партнёров | Epic Surf School Дананг",
  },
  description:
    "Партнёрство с Epic Surf School в Дананге: уроки сёрфинга для гостей отелей, вилл, турагентств, блогеров, ретритов и локального бизнеса у пляжа Микхе.",
  alternates: {
    canonical: "/ru/partners",
    languages: {
      en: "/partners",
      ru: "/ru/partners",
      "x-default": "/partners",
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/ru/partners",
    siteName: siteConfig.name,
    title: "Для партнёров | Epic Surf School Дананг",
    description:
      "Партнёрство с Epic Surf School в Дананге: уроки сёрфинга для гостей отелей, вилл, турагентств, блогеров, ретритов и локального бизнеса у пляжа Микхе.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

metadata.openGraph.images = openGraphImages(metadata.openGraph.title);
metadata.twitter = twitterMetadata(metadata.title.absolute, metadata.description);

export default function Page() {
  return (
    <>
      <PageJsonLd
        data={buildWebPageStructuredData({
          path,
          title: metadata.title.absolute,
          description: metadata.description,
          locale: "ru",
        })}
      />
      <PartnersPage locale="ru" />
    </>
  );
}
