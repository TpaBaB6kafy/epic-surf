import SurfLandingPage from "../../../components/landing-v5/SurfLandingPage";
import { getSeoPage } from "../../../data/seoPages";
import PageJsonLd from "../../../components/PageJsonLd";
import { buildWebPageStructuredData, openGraphImages, siteConfig, twitterMetadata } from "../../../data/siteConfig";

const page = getSeoPage("surf-guide", "ru");
const title = "Гид по сёрфингу Epic | Советы новичкам и сёрфинг в Дананге";
const description = "Советы начинающим сёрферам от Epic Surf School в Дананге: подъём на доску, безопасность, этикет, подготовка к уроку и выбор между обучением и арендой.";
const path = "/ru/surf-guide";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { absolute: title },
  description,
  alternates: { canonical: path, languages: { en: "/surf-guide", ru: path, "x-default": "/surf-guide" } },
  openGraph: { type: "website", locale: "ru_RU", url: path, siteName: siteConfig.name, title, description, images: openGraphImages(title) },
  twitter: twitterMetadata(title, description),
};

export default function Page() {
  return (
    <>
      <PageJsonLd data={buildWebPageStructuredData({ path, title, description, locale: "ru" })} />
      <SurfLandingPage page={page} locale="ru" languageHref="/surf-guide" />
    </>
  );
}
