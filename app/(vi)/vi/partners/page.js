import PartnersPage from "../../../components/PartnersPage";
import PageJsonLd from "../../../components/PageJsonLd";
import { buildWebPageStructuredData, openGraphImages, siteConfig, twitterMetadata } from "../../../data/siteConfig";

const title = "Hợp tác cùng Epic Surf | Đối tác tại Đà Nẵng";
const description = "Hợp tác với Epic Surf tại Đà Nẵng: giới thiệu khách học lướt sóng tại biển Mỹ Khê, hợp tác nội dung hoặc tổ chức trải nghiệm cho đoàn. Trao đổi qua Zalo.";
const path = "/vi/partners";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { absolute: title },
  description,
  keywords: ["đối tác Epic Surf", "hợp tác lướt sóng Đà Nẵng", "lớp học lướt sóng Mỹ Khê"],
  alternates: {
    canonical: path,
    languages: { en: "/partners", ru: "/ru/partners", vi: path, "x-default": "/partners" },
  },
  openGraph: {
    type: "website", locale: "vi_VN", alternateLocale: ["en_US", "ru_RU"],
    url: path, siteName: siteConfig.name, title, description, images: openGraphImages(title),
  },
  twitter: {
    ...twitterMetadata(title, description),
    images: [{ url: siteConfig.ogImage, alt: "Huấn luyện viên và học viên Epic Surf tại biển Mỹ Khê" }],
  },
};

export default function Page() {
  return <>
    <PageJsonLd data={buildWebPageStructuredData({ path, title, description, locale: "vi" })} />
    <PartnersPage locale="vi" />
  </>;
}
