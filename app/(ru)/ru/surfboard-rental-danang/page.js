import SeoPage from "../../../components/SeoPage";
import { getSeoPage } from "../../../data/seoPages";
import PageJsonLd from "../../../components/PageJsonLd";
import {
  buildWebPageStructuredData,
  openGraphImages,
  siteConfig,
  twitterMetadata,
} from "../../../data/siteConfig";

const page = getSeoPage("surfboard-rental-danang", "ru");
const title = "Аренда досок для серфинга в Дананге | Epic Surf School";
const description =
  "Аренда досок для серфинга в Дананге рядом с пляжем Май Кхе от 250,000 VND / 2 часа. Softboards, longboards, malibus и shortboards, наличие лучше уточнить в мессенджере.";
const path = "/ru/surfboard-rental-danang";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: path,
    languages: {
      en: "/surfboard-rental-danang",
      ru: path,
      "x-default": "/surfboard-rental-danang",
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: path,
    siteName: siteConfig.name,
    title,
    description,
    images: openGraphImages(title),
  },
  twitter: twitterMetadata(title, description),
};

export default function Page() {
  return (
    <>
      <PageJsonLd data={buildWebPageStructuredData({ path, title, description, locale: "ru" })} />
      <SeoPage page={page} locale="ru" languageHref="/surfboard-rental-danang" />
    </>
  );
}
