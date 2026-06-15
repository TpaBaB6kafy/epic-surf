import RentalDesignTestPage from "../../components/RentalDesignTestPage";
import { getSeoPage } from "../../data/seoPages";
import PageJsonLd from "../../components/PageJsonLd";
import {
  buildWebPageStructuredData,
  openGraphImages,
  siteConfig,
  twitterMetadata,
} from "../../data/siteConfig";

const page = getSeoPage("surfboard-rental-danang");
const title = "Surfboard Rental in Da Nang | Epic Surf School";
const description =
  "Rent a surfboard in Da Nang near My Khe Beach. Softboards, longboards, malibus and shortboards from 250,000 VND / 2 hours. Message Epic Surf School to confirm availability.";
const path = "/surfboard-rental-danang";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: path,
    languages: {
      en: path,
      ru: "/ru/surfboard-rental-danang",
      "x-default": path,
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
      <RentalDesignTestPage pageContent={page} />
    </>
  );
}
