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
    "Learn to surf in Da Nang near My Khe Beach. Beginner-friendly group, private and split surf lessons with board, rashguard, instructor support and easy online booking.",
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
      "Learn to surf in Da Nang near My Khe Beach. Beginner-friendly group, private and split surf lessons with board, rashguard, instructor support and easy online booking.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <SeoPage page={page} />;
}
