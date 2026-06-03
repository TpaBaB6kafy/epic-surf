import SeoPage from "../../components/SeoPage";
import { getSeoPage } from "../../data/seoPages";
import { siteConfig } from "../../data/siteConfig";

const page = getSeoPage("surfing-danang");

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    absolute: "Surfing in Da Nang: Lessons, Season & My Khe Beach Guide",
  },
  description:
    "Planning to surf in Da Nang? Learn where to surf, when to go, what beginners should know, and how to book surf lessons or board rental with Epic Surf School.",
  alternates: {
    canonical: "/surfing-danang",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/surfing-danang",
    siteName: siteConfig.name,
    title: "Surfing in Da Nang: Lessons, Season & My Khe Beach Guide",
    description:
      "Planning to surf in Da Nang? Learn where to surf, when to go, what beginners should know, and how to book surf lessons or board rental with Epic Surf School.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <SeoPage page={page} />;
}
