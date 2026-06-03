import SeoPage from "../../components/SeoPage";
import { getSeoPage } from "../../data/seoPages";
import { siteConfig } from "../../data/siteConfig";

const page = getSeoPage("my-khe-beach-surfing");

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    absolute: "My Khe Beach Surfing | Surf Lessons & Board Rental in Da Nang",
  },
  description:
    "Surf at My Khe Beach in Da Nang with Epic Surf School. Beginner surf lessons, board rental, local guidance, and easy booking.",
  alternates: {
    canonical: "/my-khe-beach-surfing",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/my-khe-beach-surfing",
    siteName: siteConfig.name,
    title: "My Khe Beach Surfing | Surf Lessons & Board Rental in Da Nang",
    description:
      "Surf at My Khe Beach in Da Nang with Epic Surf School. Beginner surf lessons, board rental, local guidance, and easy booking.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <SeoPage page={page} />;
}
