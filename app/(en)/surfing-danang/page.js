import SeoPage from "../../components/SeoPage";
import { getSeoPage } from "../../data/seoPages";
import { siteConfig } from "../../data/siteConfig";

const page = getSeoPage("surfing-danang");

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    absolute: "Surfing in Da Nang: My Khe Beach, Lessons & Board Rental",
  },
  description:
    "Learn about surfing in Da Nang: where to start near My Khe Beach, when to ask for local conditions, and how to choose between surf lessons and board rental.",
  alternates: {
    canonical: "/surfing-danang",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/surfing-danang",
    siteName: siteConfig.name,
    title: "Surfing in Da Nang: My Khe Beach, Lessons & Board Rental",
    description:
      "Learn about surfing in Da Nang: where to start near My Khe Beach, when to ask for local conditions, and how to choose between surf lessons and board rental.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <SeoPage page={page} />;
}
