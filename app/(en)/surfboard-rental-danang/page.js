import SeoPage from "../../components/SeoPage";
import { getSeoPage } from "../../data/seoPages";
import { siteConfig } from "../../data/siteConfig";

const page = getSeoPage("surfboard-rental-danang");

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    absolute: "Surfboard Rental in Da Nang | Epic Surf School",
  },
  description:
    "Rent a surfboard in Da Nang near My Khe Beach. Softboards, longboards, malibus and shortboards from 250,000 VND / 2 hours. Message Epic Surf School to confirm availability.",
  alternates: {
    canonical: "/surfboard-rental-danang",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/surfboard-rental-danang",
    siteName: siteConfig.name,
    title: "Surfboard Rental in Da Nang | Epic Surf School",
    description:
      "Rent a surfboard in Da Nang near My Khe Beach. Softboards, longboards, malibus and shortboards from 250,000 VND / 2 hours. Message Epic Surf School to confirm availability.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <SeoPage page={page} />;
}
