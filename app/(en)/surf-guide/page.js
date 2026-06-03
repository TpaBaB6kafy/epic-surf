import SeoPage from "../../components/SeoPage";
import { getSeoPage } from "../../data/seoPages";
import PageJsonLd from "../../components/PageJsonLd";
import {
  buildWebPageStructuredData,
  openGraphImages,
  siteConfig,
  twitterMetadata,
} from "../../data/siteConfig";

const page = getSeoPage("surf-guide");
const title = "Epic Surf Guide | Beginner Surf Tips & Da Nang Surf Info";
const description =
  "Beginner surf tips from Epic Surf School Da Nang. Learn pop-up basics, surf safety, etiquette, what to bring, and when to choose lessons or board rental.";
const path = "/surf-guide";

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
