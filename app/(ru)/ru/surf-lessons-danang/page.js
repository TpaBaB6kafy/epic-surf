import LessonServicePage from "../../../components/LessonServicePage";
import { getSeoPage } from "../../../data/seoPages";
import PageJsonLd from "../../../components/PageJsonLd";
import { buildWebPageStructuredData, openGraphImages, siteConfig, twitterMetadata } from "../../../data/siteConfig";

const page = getSeoPage("surf-lessons-danang", "ru");
const title = "Уроки сёрфинга в Дананге | Epic Surf School, пляж Микхе";
const description = "Уроки сёрфинга в Дананге у пляжа Микхе: групповые, индивидуальные и для двоих. Доска, рашгард, поддержка инструктора и удобная онлайн-запись.";
const path = "/ru/surf-lessons-danang";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { absolute: title },
  description,
  alternates: { canonical: path, languages: { en: "/surf-lessons-danang", ru: path, "x-default": "/surf-lessons-danang" } },
  openGraph: { type: "website", locale: "ru_RU", url: path, siteName: siteConfig.name, title, description, images: openGraphImages(title) },
  twitter: twitterMetadata(title, description),
};

export default function Page() {
  return (
    <>
      <PageJsonLd data={buildWebPageStructuredData({ path, title, description, locale: "ru" })} />
      <LessonServicePage page={page} locale="ru" />
    </>
  );
}
