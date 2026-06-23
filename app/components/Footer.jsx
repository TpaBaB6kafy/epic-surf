"use client";

import Image from "next/image";
import Link from "next/link";
import { Handshake, MapPin, Send } from "lucide-react";
import { seoPageLinks } from "../data/seoPages";
import { trackEvent } from "../utils/tracking";

export default function Footer({ t, lang = "en", links, InstagramIcon, FacebookIcon, variant = "default" }) {
  const isRentalVariant = variant === "rental";
  const partnersHref = lang === "ru" ? "/ru/partners" : "/partners";
  const partnersLabel = lang === "ru" ? "Партнёрам" : "For Partners";
  const footerSocialLinks = [
    { href: links.instagram, label: "Instagram", platform: "instagram", icon: <InstagramIcon /> },
    { href: links.facebook, label: "Facebook", platform: "facebook", icon: <FacebookIcon /> },
    { href: links.telegram, label: "Telegram chat", platform: "telegram_chat", icon: <Send size={20} /> },
    {
      href: links.telegramChannel,
      label: "TG Channel",
      platform: "telegram_channel",
      icon: <Send size={16} />,
      className: "inline-flex h-12 items-center gap-2 rounded-full bg-white/5 px-5 text-[11px] font-bold tracking-wide leading-snug text-white hover:bg-epicRed transition-all",
    },
  ];
  const defaultSocialLinkClass = "p-4 bg-white/5 rounded-full hover:bg-epicRed transition-all";
  const rentalSocialLinkClass = "inline-flex h-11 items-center justify-center gap-2 rounded-md border border-epicWhite/15 bg-epicDark px-4 text-[11px] font-black uppercase tracking-wide leading-snug text-epicWhite/75 transition-colors hover:border-epicMint hover:text-epicMint";

  return (
    <footer id="location" className="bg-epicDark text-white pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 grid gap-12 text-center md:text-left lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5 space-y-12">
            <div>
              <Image
                src="/epic-logo-v-ksu-v4.png"
                alt="EPIC SURF"
                width={132}
                height={32}
                className="h-8 w-auto mb-6"
              />
              <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-sm mx-auto md:mx-0">{t.heroSub}</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {footerSocialLinks.map((item) => (
                <a
                  key={item.platform}
                  href={item.href}
                  onClick={() => trackEvent("social_click", { platform: item.platform, location: "footer", language: lang })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={isRentalVariant ? rentalSocialLinkClass : item.className || defaultSocialLinkClass}
                  aria-label={`Epic Surf School ${item.label}`}
                  title={`Epic Surf School ${item.label}`}
                >
                  {item.icon}
                  {item.platform === "telegram_channel" && " TG Channel"}
                </a>
              ))}
            </div>
            <div className="pt-8 border-t border-white/5 flex flex-col items-center md:items-start gap-3">
              <a
                href={partnersHref}
                onClick={() => trackEvent("partner_cta_click", { language: lang, service_type: "partnership", cta_location: "footer", cta_label: "for_partners" })}
                className="flex items-center justify-center md:justify-start gap-3 text-sm font-bold leading-snug text-white/70 transition-colors hover:text-epicRed"
                aria-label={`Epic Surf School ${partnersLabel}`}
                title={`Epic Surf School ${partnersLabel}`}
              >
                <Handshake size={16} className="shrink-0 text-epicRed" />
                {partnersLabel}
              </a>
              <div className="flex items-center justify-center md:justify-start gap-3 text-sm font-bold leading-snug text-white/70">
                <MapPin size={16} className="shrink-0 text-epicRed" /> {t.locationAddress}
              </div>
            </div>
          </div>
          <div className={`relative h-[300px] overflow-hidden md:h-[380px] lg:col-span-7 lg:h-[440px] ${isRentalVariant ? "border-0 shadow-none" : "rounded-[44px] border border-white/10 shadow-2xl lg:rounded-[56px]"}`}>
            {isRentalVariant && (
              <Image
                src="/rentals/page/rental-footer-map-frame.svg"
                alt=""
                aria-hidden="true"
                fill
                unoptimized
                sizes="(min-width: 1024px) 700px, 100vw"
                className="pointer-events-none absolute inset-0 z-30 select-none object-fill opacity-95"
              />
            )}
            {!isRentalVariant && (
            <div className="absolute inset-x-4 bottom-4 z-40 flex items-center justify-center rounded-[24px] border border-white/10 bg-epicDark/70 px-4 py-3 text-center text-white shadow-xl backdrop-blur-md md:inset-auto md:left-7 md:bottom-7 md:w-[300px] md:px-5 md:py-4">
              <div>
                <MapPin size={20} className="mx-auto mb-2 text-epicRed md:mx-0" />
                <p className="text-base font-black leading-tight text-white">{t.locationAddress}</p>
                <a
                  href={links.googleMaps}
                  onClick={() => trackEvent("map_activate", { language: lang, cta_location: "footer", cta_label: "google_maps" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex rounded-full bg-epicRed px-4 py-2 text-[10px] font-black uppercase tracking-wide text-white transition-all hover:brightness-105"
                  aria-label="Epic Surf School Google Maps"
                  title="Epic Surf School Google Maps"
                >
                  Open Google Maps
                </a>
              </div>
            </div>
            )}
            {isRentalVariant && (
              <a
                href={links.googleMaps}
                onClick={() => trackEvent("map_activate", { language: lang, cta_location: "footer", cta_label: "google_maps" })}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-5 right-5 z-40 inline-flex h-10 items-center justify-center rounded-md border border-epicWhite/25 bg-epicDark/85 px-4 text-[10px] font-black uppercase tracking-wide text-epicWhite transition-colors hover:border-epicMint hover:text-epicMint"
                aria-label="Epic Surf School Google Maps"
                title="Epic Surf School Google Maps"
                data-role="footer-map-link"
              >
                Open Google Maps
              </a>
            )}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1024.2523782017452!2d108.25027605520296!3d16.046658364986484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314217f20b1fa357%3A0xa323fdd182ae974!2sEPIC%20Surf%20School%20Da%20Nang!5e1!3m2!1sru!2s!4v1777015710238!5m2!1sru!2s"
              title="Epic Surf School Da Nang location map"
              className="relative z-10 w-full h-full border-none lg:grayscale lg:invert lg:contrast-125 lg:opacity-60 lg:hover:grayscale-0 lg:hover:invert-0 transition-all duration-1000"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        {lang === "en" && !isRentalVariant && (
          <div className="mb-12 border-t border-white/5 pt-8 text-center md:text-left">
            <p className="mb-4 text-[11px] font-black uppercase tracking-wide text-white/35">Surf Info</p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 md:justify-start">
              {seoPageLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-bold leading-snug text-white/60 transition-colors hover:text-epicRed"
                  aria-label={`Surf Info: ${item.label}`}
                  title={`Surf Info: ${item.label}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="pt-12 border-t border-white/5 text-[11px] font-bold tracking-wide text-white/25 text-center md:text-left">
          <div>© 2026 Epic Surf School - Ride Every Day</div>
        </div>
      </div>
    </footer>
  );
}
