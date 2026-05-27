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
  ThreadsIcon,
  YoutubeIcon,
} from "./Icons";
import { partnersContent } from "../data/partners";
import { translations } from "../data/translations";
import { links } from "../data/links";
import {
  buildTelegramUrl,
  buildWhatsAppUrl,
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
      className={`${centered ? "mx-auto text-center" : ""} max-w-3xl space-y-5`}
    >
      <h2 className="text-4xl font-black leading-[0.98] tracking-normal text-epicDark md:text-6xl">
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

function ChecklistPanel({ title, items, tone }) {
  const isMint = tone === "mint";

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.5 }}
      className={`rounded-[36px] p-7 shadow-sm md:p-9 ${
        isMint ? "bg-epicMint text-epicDark" : "bg-white text-epicDark ring-1 ring-epicDark/5"
      }`}
    >
      <h2 className="text-3xl font-black leading-tight md:text-5xl">{title}</h2>
      <div className="mt-8 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 rounded-2xl bg-white/70 p-4 text-sm font-bold leading-relaxed shadow-sm md:text-base">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-epicRed text-white">
              <Check size={15} />
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </motion.article>
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
        <section className="relative overflow-hidden px-5 pb-20 pt-6 md:px-6 md:pb-28">
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
              className="flex h-11 w-11 items-center justify-center rounded-full bg-epicDark text-[11px] font-black uppercase leading-none text-white shadow-md"
            >
              {content.languageLabel}
            </a>
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl gap-10 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:pt-24">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.65 }}
              className="space-y-8"
            >
              <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-epicMint px-4 py-2 text-[11px] font-black uppercase leading-snug tracking-wide text-epicDark shadow-sm">
                <Handshake size={16} className="shrink-0 text-epicRed" />
                <span>{content.badge}</span>
              </div>
              <div className="space-y-6">
                <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-normal text-epicDark md:text-7xl lg:text-8xl">
                  {content.title}
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
              <div className="relative overflow-hidden rounded-[42px] bg-epicDark p-5 text-white shadow-2xl md:p-6">
                <div className="absolute right-6 top-6 z-10 rounded-full bg-epicMint px-4 py-2 text-[11px] font-black uppercase leading-snug tracking-wide text-epicDark">
                  My Khe
                </div>
                <div className="relative h-[420px] overflow-hidden rounded-[32px] bg-white/10">
                  <Image
                    src="/gallery/lesson-1.webp"
                    alt="Epic Surf School lesson at My Khe Beach"
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="grid gap-3 pt-5 sm:grid-cols-3">
                  {["Easy booking", "Safe lessons", "Partner rewards"].map((item) => (
                    <div key={item} className="rounded-2xl bg-white/5 px-4 py-4 text-sm font-bold leading-snug text-white/80">
                      <Check size={17} className="mb-2 text-epicMint" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-6 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title={content.sections.audience.title} subtitle={content.sections.audience.subtitle} />
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                    className="rounded-[32px] bg-white p-7 shadow-sm ring-1 ring-epicDark/5"
                  >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-epicMint text-epicRed">
                      <Icon size={26} />
                    </div>
                    <h3 className="text-2xl font-black leading-tight text-epicDark">{item.title}</h3>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-epicDark/60 md:text-base">{item.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-epicDark px-5 py-20 text-white md:px-6 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-black leading-[0.98] tracking-normal text-white md:text-6xl">
                {content.sections.process.title}
              </h2>
              <p className="font-subtitle mt-5 text-base leading-relaxed text-white/60 md:text-lg">
                {content.sections.process.subtitle}
              </p>
            </div>
            <div className="mt-14 grid gap-5 lg:grid-cols-4">
              {content.sections.process.items.map((item, index) => (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="relative rounded-[30px] bg-white p-7 text-epicDark shadow-xl"
                >
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-epicRed text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-black leading-tight">{item.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-epicDark/60">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-6 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
            <ChecklistPanel title={content.sections.partnerGets.title} items={content.sections.partnerGets.items} tone="light" />
            <ChecklistPanel title={content.sections.recommend.title} items={content.sections.recommend.items} tone="mint" />
          </div>
        </section>

        <section className="px-5 pb-20 md:px-6 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title={content.sections.formats.title} />
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
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
                    className="group rounded-[34px] bg-white p-8 shadow-sm ring-1 ring-epicDark/5 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[24px] bg-epicDark text-epicMint transition group-hover:bg-epicRed group-hover:text-white">
                      <Icon size={30} />
                    </div>
                    <h3 className="text-3xl font-black leading-tight">{item.title}</h3>
                    <p className="mt-4 text-sm font-black leading-relaxed text-epicRed">{item.bestFor}</p>
                    <p className="mt-4 text-base font-medium leading-relaxed text-epicDark/65">{item.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 md:px-6 md:pb-28">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="mx-auto grid max-w-7xl gap-6 rounded-[34px] bg-white p-7 shadow-sm ring-1 ring-epicDark/5 md:p-10 lg:grid-cols-[1fr_0.8fr]"
          >
            <div>
              <h2 className="text-3xl font-black leading-tight text-epicDark md:text-5xl">
                {content.sections.tracking.title}
              </h2>
              <p className="mt-5 text-base font-medium leading-relaxed text-epicDark/65 md:text-lg">
                {content.sections.tracking.text}
              </p>
            </div>
            <div className="rounded-[26px] bg-epicMint p-6 text-epicDark">
              <p className="text-[11px] font-black uppercase leading-snug tracking-wide text-epicDark/60">
                {content.sections.tracking.exampleLabel}
              </p>
              <p className="mt-4 break-all text-lg font-black leading-tight md:text-2xl">
                surfdanang.com/?partner=hotel_abc
              </p>
            </div>
          </motion.div>
        </section>

        <section className="px-5 pb-24 md:px-6 md:pb-32">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="relative mx-auto max-w-7xl overflow-hidden rounded-[42px] bg-epicRed px-7 py-14 text-center text-white shadow-2xl md:px-14 md:py-20"
          >
            <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full border-[28px] border-white/15" />
            <div className="absolute -bottom-20 right-8 h-52 w-52 rounded-full border-[32px] border-epicMint/50" />
            <div className="relative mx-auto max-w-4xl space-y-7">
              <h2 className="text-4xl font-black leading-[0.98] tracking-normal md:text-6xl">
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
        YoutubeIcon={YoutubeIcon}
        ThreadsIcon={ThreadsIcon}
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
