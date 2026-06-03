import SeoPage from "../../components/SeoPage";
import { getSeoPage } from "../../data/seoPages";
import PageJsonLd from "../../components/PageJsonLd";
import {
  buildWebPageStructuredData,
  openGraphImages,
  siteConfig,
  twitterMetadata,
} from "../../data/siteConfig";

const page = getSeoPage("my-khe-beach-surfing");
const title = "My Khe Beach Surfing | Surf Lessons & Board Rental in Da Nang";
const description =
  "Surf at My Khe Beach in Da Nang with Epic Surf School. Book beginner-friendly surf lessons, rent boards near the beach, and confirm local conditions by messenger.";
const path = "/my-khe-beach-surfing";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: path,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
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
      <PageJsonLd data={buildWebPageStructuredData({ path, title, description, locale: "en" })} />
      <SeoPage page={page} />
    </>
  );
}
