import SeoPage from "../../components/SeoPage";
import { getSeoPage } from "../../data/seoPages";
import { siteConfig } from "../../data/siteConfig";

const page = getSeoPage("surf-lessons-danang");

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    absolute: "Surf Lessons in Da Nang | Epic Surf School My Khe Beach",
  },
  description:
    "Learn to surf in Da Nang with Epic Surf School. Beginner-friendly surf lessons, local instructors, board and gear included, and lessons near My Khe Beach.",
  alternates: {
    canonical: "/surf-lessons-danang",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/surf-lessons-danang",
    siteName: siteConfig.name,
    title: "Surf Lessons in Da Nang | Epic Surf School My Khe Beach",
    description:
      "Learn to surf in Da Nang with Epic Surf School. Beginner-friendly surf lessons, local instructors, board and gear included, and lessons near My Khe Beach.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <SeoPage page={page} />;
}
