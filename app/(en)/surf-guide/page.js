import SeoPage from "../../components/SeoPage";
import { getSeoPage } from "../../data/seoPages";
import { siteConfig } from "../../data/siteConfig";

const page = getSeoPage("surf-guide");

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    absolute: "Epic Surf Guide | Beginner Surf Tips & Da Nang Surf Info",
  },
  description:
    "Beginner-friendly surf tips from Epic Surf School Da Nang. Learn about surf lessons, safety, etiquette, pop-up basics, and surfing at My Khe Beach.",
  alternates: {
    canonical: "/surf-guide",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/surf-guide",
    siteName: siteConfig.name,
    title: "Epic Surf Guide | Beginner Surf Tips & Da Nang Surf Info",
    description:
      "Beginner-friendly surf tips from Epic Surf School Da Nang. Learn about surf lessons, safety, etiquette, pop-up basics, and surfing at My Khe Beach.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <SeoPage page={page} />;
}
