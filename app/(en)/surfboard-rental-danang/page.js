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
    "Rent a surfboard in Da Nang with Epic Surf School. Board rental near My Khe Beach, easy messenger booking, and beginner-friendly safety guidance.",
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
      "Rent a surfboard in Da Nang with Epic Surf School. Board rental near My Khe Beach, easy messenger booking, and beginner-friendly safety guidance.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <SeoPage page={page} />;
}
