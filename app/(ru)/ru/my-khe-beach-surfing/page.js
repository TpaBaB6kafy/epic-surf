import SurfLandingPage from "../../../components/landing-v5/SurfLandingPage";
import { getSeoPage } from "../../../data/seoPages";
import PageJsonLd from "../../../components/PageJsonLd";
import { buildWebPageStructuredData, openGraphImages, siteConfig, twitterMetadata } from "../../../data/siteConfig";

const page = getSeoPage("my-khe-beach-surfing", "ru");
const title = "Сёрфинг на пляже Микхе | Уроки и аренда в Дананге";
const description = "Сёрфинг на пляже Микхе в Дананге с Epic Surf School. Уроки для новичков, аренда досок у пляжа и уточнение местных условий в мессенджере.";
const path = "/ru/my-khe-beach-surfing";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { absolute: title },
  description,
  alternates: { canonical: path, languages: { en: "/my-khe-beach-surfing", ru: path, "x-default": "/my-khe-beach-surfing" } },
  openGraph: { type: "website", locale: "ru_RU", url: path, siteName: siteConfig.name, title, description, images: openGraphImages(title) },
  twitter: twitterMetadata(title, description),
};

export default function Page() {
  return (
    <>
      <PageJsonLd data={buildWebPageStructuredData({ path, title, description, locale: "ru" })} />
      <SurfLandingPage page={page} locale="ru" languageHref="/my-khe-beach-surfing" />
    </>
  );
}
