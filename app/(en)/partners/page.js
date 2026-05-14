import PartnersPage from "../../components/PartnersPage";
import { siteConfig } from "../../data/siteConfig";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    absolute: "Partners | Epic Surf School Da Nang",
  },
  description:
    "Partner with Epic Surf School in Da Nang. Surf lessons for hotel guests, villas, travel agencies, creators, retreats and local businesses near My Khe Beach.",
  alternates: {
    canonical: "/partners",
    languages: {
      en: "/partners",
      ru: "/ru/partners",
      "x-default": "/partners",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/partners",
    siteName: siteConfig.name,
    title: "Partners | Epic Surf School Da Nang",
    description:
      "Partner with Epic Surf School in Da Nang. Surf lessons for hotel guests, villas, travel agencies, creators, retreats and local businesses near My Khe Beach.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <PartnersPage locale="en" />;
}
