import SeoPage from "../../components/SeoPage";
import { getSeoPage } from "../../data/seoPages";
import PageJsonLd from "../../components/PageJsonLd";
import {
  buildWebPageStructuredData,
  openGraphImages,
  siteConfig,
  twitterMetadata,
} from "../../data/siteConfig";

const page = getSeoPage("surf-lessons-danang");
const title = "Surf Lessons in Da Nang | Epic Surf School My Khe Beach";
const description =
  "Learn to surf in Da Nang near My Khe Beach. Beginner-friendly group, private and split surf lessons with board, rashguard, instructor support and easy online booking.";
const path = "/surf-lessons-danang";

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
