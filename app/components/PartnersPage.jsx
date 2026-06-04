"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Camera,
  Check,
  Coffee,
  Handshake,
  Hotel,
  MessageCircle,
  Plane,
  QrCode,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import Footer from "./Footer";
import MessengerFab from "./MessengerFab";
import {
  ChatTelegramIcon,
  ChatWhatsAppIcon,
  ChatZaloIcon,
  FacebookIcon,
  InstagramIcon,
} from "./Icons";
import { partnersContent } from "../data/partners";
import { translations } from "../data/translations";
import { links } from "../data/links";
import {
  buildTelegramUrl,
  buildWhatsAppUrl,
  getHrefWithCurrentQuery,
  storeAttributionFromUrl,
  trackEvent,
} from "../utils/tracking";

const audienceIcons = [Hotel, Building2, Plane, Coffee, Camera, Users];
const formatIcons = [QrCode, Sparkles, Waves];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function SectionHeading({ title, subtitle, centered = true }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className={`${centered ? "mx-auto text-center" : ""} max-w-3xl space-y-4`}
    >
      <h2 className="text-3xl font-black leading-tight tracking-normal text-epicDark md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="font-subtitle text-base leading-relaxed text-epicDark/60 md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function DotPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
      <div className="absolute left-8 top-24 h-24 w-24 rounded-full border-[18px] border-epicMint" />
      <div className="absolute right-4 top-16 h-40 w-40 rounded-full border-[24px] border-epicRed" />
      <div className="absolute bottom-10 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border-[18px] border-epicDark" />
    </div>
  );
}

function HeroTitle({ content, lang }) {
  if (lang === "ru") {
    return (
      <>
        Станьте партнёром <span className="whitespace-nowrap">Epic Surf</span>
      </>
    );
  }

  return (
    <>
      <span className="block md:inline">Partner with</span>
      {" "}
      <span className="block whitespace-nowrap md:inline">Epic Surf</span>
    </>
  );
}

function BenefitsColumn({ title, items }) {
  return (
    <div>
      <h2 className="text-2xl font-black leading-tight text-epicDark md:text-4xl">{title}</h2>
      <div className="mt-5 divide-y divide-epicDark/10">
        {items.map((item) => (
          <div key={item} className="flex gap-3 py-3 text-sm font-bold leading-snug text-epicDark md:text-base">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-epicMint text-epicRed">
              <Check size={12} strokeWidth={3} />
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WaveDivider() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-8 overflow-hidden text-epicMint opacity-45 md:h-12"
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="none"
      >
        <path
          d="M0 30 C180 54 360 6 540 30 S900 54 1080 30 S1260 6 1440 30"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0 42 C220 18 380 50 590 34 S960 18 1150 34 S1340 50 1440 38"
          className="text-epicRed"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.28"
        />
      </svg>
    </div>
  );
}

export default function PartnersPage({ locale = "en" }) {
  const lang = locale === "ru" ? "ru" : "en";
  const content = partnersContent[lang];
  const t = translations[lang];
  const partnerMessage = lang === "ru"
    ? "Привет! Хочу обсудить партнёрство с Epic Surf School."
    : "Hi Epic Surf School! I want to discuss a partnership.";

  useEffect(() => {
    storeAttributionFromUrl({ includePartner: true });
    trackEvent("page_view", { language: lang });
  }, [lang]);

  const handlePartnerClick = (event, eventName, label, hrefBuilder) => {
    if (hrefBuilder) {
      event.currentTarget.href = hrefBuilder();
    }
    trackEvent(eventName, {
      language: lang,
      service_type: "partnership",
      cta_location: "partners_page",
      cta_label: label,
    });
  };

  return (
    <div
      className="min-h-screen overflow-x-clip bg-epicWhite font-sans text-epicDark"
    >
      <main>
        <section className="relative overflow-hidden px-5 pb-14 pt-6 md:px-6 md:pb-24">
          <DotPattern />
          <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4">
            <a href={content.homeHref} className="inline-flex items-center rounded-full bg-white px-5 py-3 shadow-sm transition active:scale-95">
              <Image
                src="/epic-logo-v-ksu-v4.png"
                alt="EPIC SURF"
                width={132}
                height={32}
                priority
                className="h-8 w-auto"
              />
            </a>
            <a
              href={content.languageHref}
              onClick={(event) => {
                event.preventDefault();
                window.location.assign(getHrefWithCurrentQuery(content.languageHref));
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-epicDark text-[11px] font-black uppercase leading-none text-white shadow-md"
            >
              {content.languageLabel}
            </a>
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl gap-8 pt-12 md:gap-10 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:pt-20">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.65 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-epicMint px-4 py-2 text-[11px] font-black uppercase leading-snug tracking-wide text-epicDark shadow-sm">
                <Handshake size={16} className="shrink-0 text-epicRed" />
                <span>{content.badge}</span>
              </div>
              <div className="space-y-6">
                <h1 className="max-w-4xl text-4xl font-black leading-[0.92] tracking-normal text-epicDark md:text-6xl lg:text-7xl">
                  <HeroTitle content={content} lang={lang} />
                </h1>
                <p className="font-subtitle max-w-2xl text-base leading-relaxed text-epicDark/70 md:text-xl">
                  {content.subtitle}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={links.whatsapp}
                  onClick={(event) => handlePartnerClick(event, "partner_cta_click", "get_partner_code", () => buildWhatsAppUrl(links.whatsapp, partnerMessage, { language: lang, includePartnerCode: true }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-epicRed px-7 py-4 text-[11px] font-black uppercase leading-snug tracking-wide text-white shadow-xl shadow-epicRed/20 transition hover:-translate-y-0.5 active:scale-95"
                >
                  {content.primaryCta}
                  <ArrowUpRight size={18} />
                </a>
                <a
                  href={links.telegram}
                  onClick={(event) => handlePartnerClick(event, "telegram_click", "message_us", () => buildTelegramUrl(links.telegram, partnerMessage, { language: lang, includePartnerCode: true }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-[11px] font-black uppercase leading-snug tracking-wide text-epicDark shadow-sm ring-1 ring-epicDark/10 transition hover:-translate-y-0.5 hover:text-epicRed active:scale-95"
                >
                  {content.secondaryCta}
                  <MessageCircle size={18} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[34px] bg-epicDark p-4 text-white shadow-2xl md:rounded-[42px] md:p-6">
                <div className="absolute right-6 top-6 z-10 rounded-full bg-epicMint px-4 py-2 text-[11px] font-black uppercase leading-snug tracking-wide text-epicDark">
                  My Khe
                </div>
                <div className="relative h-[290px] overflow-hidden rounded-[26px] bg-white/10 sm:h-[360px] md:h-[420px] md:rounded-[32px]">
                  <Image
                    src="/gallery/lesson-1.webp"
                    alt="Epic Surf School lesson at My Khe Beach"
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="grid gap-2 pt-3 sm:grid-cols-3 md:gap-3 md:pt-5">
                  {["Easy booking", "Safe lessons", "Partner rewards"].map((item) => (
                    <div key={item} className="rounded-2xl bg-white/5 px-3.5 py-2.5 text-sm font-bold leading-snug text-white/80 md:px-4 md:py-4">
                      <Check size={16} className="mb-1.5 text-epicMint md:mb-2" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-5 py-14 md:px-6 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title={content.sections.audience.title} subtitle={content.sections.audience.subtitle} />
            <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
              {content.sections.audience.items.map((item, index) => {
                const Icon = audienceIcons[index] || BadgeCheck;
                return (
                  <motion.article
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                    className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-epicDark/5 md:p-6"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-epicMint text-epicRed">
                      <Icon size={23} />
                    </div>
                    <h3 className="text-xl font-black leading-tight text-epicDark md:text-2xl">{item.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-epicDark/60">{item.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-5 pb-14 md:px-6 md:pb-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title={content.sections.formats.title} subtitle={content.sections.formats.subtitle} />
            <div className="mt-10 grid gap-4 md:mt-12 lg:grid-cols-3">
              {content.sections.formats.items.map((item, index) => {
                const Icon = formatIcons[index] || Handshake;
                return (
                  <motion.article
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="group rounded-[26px] bg-white p-6 shadow-sm ring-1 ring-epicDark/5 transition hover:-translate-y-1 hover:shadow-xl md:p-7"
                  >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[20px] bg-epicDark text-epicMint transition group-hover:bg-epicRed group-hover:text-white">
                      <Icon size={26} />
                    </div>
                    <h3 className="text-2xl font-black leading-tight">{item.title}</h3>
                    <p className="mt-3 text-sm font-black leading-relaxed text-epicRed">{item.bestFor}</p>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-epicDark/65 md:text-base">{item.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-epicDark px-5 py-14 text-white md:px-6 md:py-24">
          <WaveDivider />
          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-black leading-tight tracking-normal text-white md:text-5xl">
                {content.sections.process.title}
              </h2>
              <p className="font-subtitle mt-4 text-base leading-relaxed text-white/60 md:text-lg">
                {content.sections.process.subtitle}
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:mt-12 lg:grid-cols-4">
              {content.sections.process.items.map((item, index) => (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="relative rounded-[24px] bg-white p-5 text-epicDark shadow-xl md:p-6"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-epicRed text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-black leading-tight">{item.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-epicDark/60">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 md:px-6 md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-epicDark/5"
          >
            <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10">
              <BenefitsColumn title={content.sections.partnerGets.title} items={content.sections.partnerGets.items} />
              <div className="border-t border-epicDark/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <BenefitsColumn title={content.sections.recommend.title} items={content.sections.recommend.items} />
              </div>
            </div>

            <div className="border-t border-epicDark/10 bg-epicWhite/70 p-6 md:p-8 lg:grid lg:grid-cols-[1fr_0.72fr] lg:items-center lg:gap-8 lg:px-10">
              <div>
                <p className="text-[11px] font-black uppercase leading-snug tracking-wide text-epicRed">
                  {content.sections.tracking.title}
                </p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-epicDark/65 md:text-base">
                  {content.sections.tracking.text}
                </p>
              </div>
              <div className="mt-5 rounded-[18px] bg-epicMint px-4 py-4 text-epicDark lg:mt-0">
                <p className="text-[10px] font-black uppercase leading-snug tracking-wide text-epicDark/60">
                  {content.sections.tracking.exampleLabel}
                </p>
                <p className="mt-2 break-all text-sm font-black leading-tight md:text-lg">
                  surfdanang.com/?partner=hotel_abc
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="px-5 pb-20 md:px-6 md:pb-28">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="relative mx-auto max-w-7xl overflow-hidden rounded-[34px] bg-epicRed px-6 py-11 text-center text-white shadow-2xl md:rounded-[42px] md:px-14 md:py-18"
          >
            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full border-[24px] border-white/10 md:-left-16 md:-top-16 md:h-44 md:w-44 md:border-[28px] md:border-white/15" />
            <div className="absolute -bottom-24 right-1/2 h-44 w-44 translate-x-1/2 rounded-full border-[28px] border-epicMint/35 md:-bottom-20 md:right-8 md:h-52 md:w-52 md:translate-x-0 md:border-[32px] md:border-epicMint/50" />
            <div className="relative mx-auto max-w-4xl space-y-6">
              <h2 className="text-2xl font-black leading-tight tracking-normal md:text-5xl">
                {content.sections.finalCta.title}
              </h2>
              <p className="font-subtitle mx-auto max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                {content.sections.finalCta.text}
              </p>
              <a
                href={links.whatsapp}
                onClick={(event) => handlePartnerClick(event, "partner_cta_click", "discuss_partnership", () => buildWhatsAppUrl(links.whatsapp, partnerMessage, { language: lang, includePartnerCode: true }))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[11px] font-black uppercase leading-snug tracking-wide text-epicDark shadow-xl transition hover:-translate-y-0.5 active:scale-95"
              >
                {content.sections.finalCta.button}
                <ArrowUpRight size={18} />
              </a>
              <p className="mx-auto max-w-2xl text-xs font-bold leading-relaxed text-white/65">
                {content.sections.finalCta.note}
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer
        t={t}
        lang={lang}
        links={links}
        InstagramIcon={InstagramIcon}
        FacebookIcon={FacebookIcon}
      />

      <MessengerFab
        links={links}
        lang={lang}
        ChatWhatsAppIcon={ChatWhatsAppIcon}
        ChatTelegramIcon={ChatTelegramIcon}
        ChatZaloIcon={ChatZaloIcon}
      />
    </div>
  );
}
