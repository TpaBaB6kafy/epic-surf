import SurfLandingPage from "../../../components/landing-v5/SurfLandingPage";
import { getSeoPage } from "../../../data/seoPages";
import PageJsonLd from "../../../components/PageJsonLd";
import { buildWebPageStructuredData, openGraphImages, siteConfig, twitterMetadata } from "../../../data/siteConfig";

const page = getSeoPage("surfing-danang", "ru");
const title = "Сёрфинг в Дананге: пляж Микхе, уроки и аренда досок";
const description = "Сёрфинг в Дананге: где начать у пляжа Микхе, как проверить местные условия и что выбрать — урок с инструктором или аренду доски.";
const path = "/ru/surfing-danang";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { absolute: title },
  description,
  alternates: { canonical: path, languages: { en: "/surfing-danang", ru: path, "x-default": "/surfing-danang" } },
  openGraph: { type: "website", locale: "ru_RU", url: path, siteName: siteConfig.name, title, description, images: openGraphImages(title) },
  twitter: twitterMetadata(title, description),
};

export default function Page() {
  return (
    <>
      <PageJsonLd data={buildWebPageStructuredData({ path, title, description, locale: "ru" })} />
      <SurfLandingPage page={page} locale="ru" languageHref="/surfing-danang" />
    </>
  );
}
