import PartnersPage from "../../../components/PartnersPage";
import { siteConfig } from "../../../data/siteConfig";

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

export default function Page() {
  return <PartnersPage locale="ru" />;
}
