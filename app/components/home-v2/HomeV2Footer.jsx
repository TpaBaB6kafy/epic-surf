"use client";

import Image from "next/image";
import Link from "next/link";
import { seoPageLinks } from "../../data/seoPages";
import { siteConfig } from "../../data/siteConfig";
import { trackEvent } from "../../utils/tracking";

const assetRoot = "/design/home-v2/footer";

const socialItems = [
  { key: "facebook", label: "Facebook", artwork: "icon-artwork.svg", surface: "icon-surface.svg" },
  { key: "telegram", label: "Telegram chat", artwork: "icon-artwork-384-661.svg", surface: "icon-surface-384-660.svg" },
  { key: "instagram", label: "Instagram", artwork: "icon-artwork-384-666.svg", surface: "icon-surface-384-665.svg" },
  { key: "telegramChannel", label: "TG Channel", artwork: "icon-artwork-384-671.svg", surface: "icon-surface-384-670.svg", channel: true },
];

const contactIcons = {
  location: "contact-icon.svg",
  email: "contact-icon-384-591.svg",
  phone: "contact-icon-384-596.svg",
  partners: "contact-icon-384-602.svg",
};

function SocialLink({ item, href, lang }) {
  const platform = item.key === "telegramChannel" ? "telegram_channel" : item.key === "telegram" ? "telegram_chat" : item.key;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Epic Surf School ${item.label}`}
      title={`Epic Surf School ${item.label}`}
      data-footer-social={platform}
      onClick={() => trackEvent("social_click", { platform, location: "footer", language: lang })}
      className={`relative inline-flex h-[35px] shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-epicRed ${item.channel ? "w-[90px]" : "w-[35px]"}`}
    >
      <Image src={`${assetRoot}/${item.surface}`} alt="" fill unoptimized className="pointer-events-none" />
      <Image
        src={`${assetRoot}/${item.artwork}`}
        alt=""
        width={item.channel ? 11 : 15}
        height={item.channel ? 11 : 15}
        unoptimized
        className={`relative z-10 object-contain ${item.channel ? "ml-3" : "mx-auto"}`}
      />
      {item.channel ? <span className="relative z-10 ml-2 text-[8.25px] font-bold leading-none tracking-[0.206px] text-white">TG Channel</span> : null}
    </a>
  );
}

function ContactRow({ icon, href, external, children, onClick, role }) {
  const content = (
    <>
      <Image src={`${assetRoot}/${contactIcons[icon]}`} alt="" width={25} height={25} unoptimized className="h-[25px] w-[25px] shrink-0" />
      <span>{children}</span>
    </>
  );
  const className = "flex min-h-[25px] items-center gap-[14px] text-[16px] leading-[1.25] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-epicRed";

  return href ? (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} onClick={onClick} data-footer-contact={role} className={className}>
      {content}
    </a>
  ) : <div data-footer-contact={role} className={className}>{content}</div>;
}

export default function HomeV2Footer({ t, lang = "en", links }) {
  const isRu = lang === "ru";
  const partnersHref = isRu ? "/ru/partners" : "/partners";
  const quickLinks = isRu ? [
    { href: "/ru/surf-lessons-danang", label: "Уроки серфинга" },
    { href: "/ru/surfing-danang", label: "Серфинг в Дананге" },
    { href: "/ru/surfboard-rental-danang", label: "Аренда серфборда" },
    { href: "/ru/my-khe-beach-surfing", label: "Серфинг на пляже Микхе" },
    { href: "/ru/surf-guide", label: "Гид по серфингу" },
  ] : seoPageLinks;
  const year = new Date().getFullYear();
  const email = "epicsurf@gmail.com";
  const brandDescription = isRu ? t.heroSub : "Best surf school on My Khe Beach.\nExpert\ncoaching, top-tier gear, and the best\ncommunity.";

  return (
    <footer id="location" data-home-v2-footer="true" className="relative isolate overflow-hidden bg-epicDark text-white">
      <div data-home-v2-footer-map className="relative isolate h-[189px] w-full overflow-hidden bg-epicGray">
        <iframe
          data-home-v2-footer-map-iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1024.2523782017452!2d108.25027605520296!3d16.046658364986484!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x314217f20b1fa357%3A0xa323fdd182ae974!2sEPIC%20Surf%20School%20Da%20Nang!5e1!3m2!1sru!2s!4v1777015710238!5m2!1sru!2s"
          title="Epic Surf School Da Nang location map"
          className="pointer-events-auto absolute inset-0 z-0 block h-full w-full cursor-grab border-0 grayscale contrast-125 opacity-60 active:cursor-grabbing"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div data-home-v2-footer-body className="relative mx-auto min-h-[373px] max-w-[1440px] px-5 pb-24 pt-12 min-[1440px]:h-[373px] min-[1440px]:px-0 min-[1440px]:pb-0 min-[1440px]:pt-0">
        <div data-home-v2-footer-main className="relative z-20 grid gap-10 md:grid-cols-3 min-[1440px]:absolute min-[1440px]:left-[233px] min-[1440px]:top-[58px] min-[1440px]:h-[198px] min-[1440px]:w-[975px] min-[1440px]:!block">
          <section data-home-v2-footer-brand className="w-full min-[1440px]:absolute min-[1440px]:left-0 min-[1440px]:top-0 min-[1440px]:h-[198px] min-[1440px]:w-[306px]">
            <Image src={`${assetRoot}/brand-logo.svg`} alt="EPIC" width={29} height={18} unoptimized className="h-[18px] w-[29px]" />
            <p className="mt-[24px] h-[101px] max-w-[306px] whitespace-pre-line text-[16px] font-light leading-[30px] text-white">
              {brandDescription}
            </p>
            <div data-home-v2-footer-socials="true" className="mt-[20px] flex items-center gap-5 min-[1440px]:gap-[20px]">
              {socialItems.map((item) => <SocialLink key={item.key} item={item} href={links[item.key]} lang={lang} />)}
            </div>
          </section>

          <nav aria-label={isRu ? "Ссылки в подвале" : "Footer links"} data-home-v2-footer-quick-links className="space-y-3 min-[1440px]:absolute min-[1440px]:left-[431px] min-[1440px]:top-0 min-[1440px]:w-[191px] min-[1440px]:space-y-[20px]">
            {quickLinks.map((item) => (
              <Link key={item.href} href={item.href} data-footer-quick-link className="flex min-h-[25px] items-center gap-[6px] text-[16px] leading-[1.25] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-epicRed min-[1440px]:h-[13px] min-[1440px]:min-h-0 min-[1440px]:leading-[13px]">
                <Image src={`${assetRoot}/link-icon.svg`} alt="" width={13} height={13} unoptimized className="h-[13px] w-[13px] shrink-0" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <section data-home-v2-footer-contacts className="space-y-5 min-[1440px]:absolute min-[1440px]:left-[747px] min-[1440px]:top-0 min-[1440px]:w-[228px] min-[1440px]:space-y-[20px]">
            <ContactRow icon="location" href={links.googleMaps} external role="location" onClick={() => trackEvent("map_activate", { language: lang, cta_location: "footer", cta_label: "google_maps" })}>{t.locationAddress}</ContactRow>
            <ContactRow icon="email" href={`mailto:${email}`} role="email">{email}</ContactRow>
            <ContactRow icon="phone" href={`tel:${siteConfig.phone}`} role="phone">+84 383 880 164</ContactRow>
            <ContactRow icon="partners" href={partnersHref} role="partners" onClick={() => trackEvent("partner_cta_click", { language: lang, service_type: "partnership", cta_location: "footer", cta_label: "for_partners" })}>{isRu ? "Партнёрам" : "For Partners"}</ContactRow>
          </section>
        </div>

        <Image data-home-v2-footer-surfboard src={`${assetRoot}/footer-surfboard-artwork.svg`} alt="" width={163} height={163} unoptimized className="pointer-events-none absolute bottom-0 right-4 z-10 h-[130px] w-[130px] object-fill min-[1440px]:-bottom-[12px] min-[1440px]:right-[25px] min-[1440px]:h-[163px] min-[1440px]:w-[163px]" />

        <svg data-home-v2-footer-wave aria-hidden="true" viewBox="0 0 1740 83" preserveAspectRatio="none" className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[83px] w-[1740px] -translate-x-1/2 fill-white/[0.08] min-[1440px]:left-[-70px] min-[1440px]:translate-x-0">
          {Array.from({ length: 10 }, (_, index) => <path key={index} d={`M${index * 174} 0C${index * 174 + 35} 0 ${index * 174 + 52} 24 ${index * 174 + 87} 24C${index * 174 + 122} 24 ${index * 174 + 139} 0 ${index * 174 + 174} 0V83H${index * 174}Z`} />)}
        </svg>

        <div data-home-v2-footer-copyright className="absolute bottom-[31px] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-center text-[13px] leading-[10px] text-white">
          © {year} Epic Surf School - Ride Every Day
        </div>
      </div>
    </footer>
  );
}
