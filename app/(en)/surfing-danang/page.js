import SeoPage from "../../components/SeoPage";
import { getSeoPage } from "../../data/seoPages";
import PageJsonLd from "../../components/PageJsonLd";
import {
  buildWebPageStructuredData,
  openGraphImages,
  siteConfig,
  twitterMetadata,
} from "../../data/siteConfig";

const page = getSeoPage("surfing-danang");
const title = "Surfing in Da Nang: My Khe Beach, Lessons & Board Rental";
const description =
  "Learn about surfing in Da Nang: where to start near My Khe Beach, when to ask for local conditions, and how to choose between surf lessons and board rental.";
const path = "/surfing-danang";

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
