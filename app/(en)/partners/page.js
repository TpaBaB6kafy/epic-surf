import PartnersPage from "../../components/PartnersPage";
import PageJsonLd from "../../components/PageJsonLd";
import {
  buildWebPageStructuredData,
  openGraphImages,
  siteConfig,
  twitterMetadata,
} from "../../data/siteConfig";

const title = "Partners | Epic Surf School Da Nang";
const description =
  "Partner with Epic Surf School in Da Nang. Surf lessons for hotel guests, villas, travel agencies, creators, retreats and local businesses near My Khe Beach.";
const path = "/partners";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: path,
    languages: {
      en: "/partners",
      ru: "/ru/partners",
      "x-default": "/partners",
    },
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
      <PartnersPage locale="en" />
    </>
  );
}
