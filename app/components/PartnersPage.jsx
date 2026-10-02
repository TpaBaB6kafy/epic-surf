"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Building2, Camera, Check, Coffee, Handshake, Hotel, MessageCircle, Plane, QrCode, Sparkles, Users, Waves } from "lucide-react";
import LandingShell from "./landing-v5/LandingShell";
import { partnersContent } from "../data/partners";
import { links } from "../data/links";
import { buildTelegramUrl, buildWhatsAppUrl, storeAttributionFromUrl, trackEvent } from "../utils/tracking";

const audienceIcons = [Hotel, Building2, Plane, Coffee, Camera, Users];
const formatIcons = [QrCode, Sparkles, Waves];

function SectionHeading({ title, subtitle }) {
  return <div className="partner-section-heading"><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>;
}
function BenefitsColumn({ title, items }) {
  return <div><h2>{title}</h2><ul className="landing-list">{items.map(item => <li key={item}>{item}</li>)}</ul></div>;
}

export default function PartnersPage({ locale = "en" }) {
  const lang = locale === "ru" ? "ru" : "en";
  const content = partnersContent[lang];
  const partnerMessage = lang === "ru" ? "Привет! Хочу обсудить партнёрство с Epic Surf School." : "Hi Epic Surf School! I want to discuss a partnership.";
  useEffect(() => {
    storeAttributionFromUrl({ includePartner: true });
    trackEvent("page_view", { language: lang });
  }, [lang]);
  const handlePartnerClick = (event, eventName, label, hrefBuilder) => {
    event.currentTarget.href = hrefBuilder();
    trackEvent(eventName, { language: lang, service_type: "partnership", cta_location: "partners_page", cta_label: label });
  };
  const whatsapp = () => buildWhatsAppUrl(links.whatsapp, partnerMessage, { language: lang, includePartnerCode: true });
  const telegram = () => buildTelegramUrl(links.telegram, partnerMessage, { language: lang, includePartnerCode: true });
  return (
    <LandingShell locale={lang} languageHref={content.languageHref} className="landing-partners">
      <main>
        <section className="landing-hero">
          <div className="landing-container landing-hero-grid">
            <div className="landing-hero-copy">
              <p className="landing-eyebrow"><Handshake size={18} />{content.badge}</p>
              <h1>{lang === "ru" ? "Станьте партнёром" : "Partner with"} <span>Epic Surf</span></h1>
              <p className="landing-intro">{content.subtitle}</p>
              <div className="landing-actions">
                <a href={links.whatsapp} onClick={event => handlePartnerClick(event, "partner_cta_click", "get_partner_code", whatsapp)} target="_blank" rel="noopener noreferrer" className="landing-button">{content.primaryCta}<ArrowUpRight size={18} /></a>
                <a href={links.telegram} onClick={event => handlePartnerClick(event, "telegram_click", "message_us", telegram)} target="_blank" rel="noopener noreferrer" className="landing-button landing-button-secondary">{content.secondaryCta}<MessageCircle size={18} /></a>
              </div>
            </div>
            <div className="partner-hero-card">
              <div className="landing-hero-photo">
                <Image src="/gallery/lesson-1.webp" alt={lang === "ru" ? "Урок Epic Surf School на пляже Микхе" : "Epic Surf School lesson at My Khe Beach"} fill priority sizes="(min-width: 900px) 50vw, 100vw" className="object-cover" />
                <span className="partner-photo-label">{lang === "ru" ? "Микхе" : "My Khe"}</span>
              </div>
              <div className="partner-hero-benefits">{(lang === "ru" ? ["Удобная запись", "Безопасные уроки", "Бонусы партнёрам"] : ["Easy booking", "Safe lessons", "Partner rewards"]).map(item => <div key={item}><Check size={18} />{item}</div>)}</div>
            </div>
          </div>
        </section>
        <section className="partner-audience landing-section">
          <div className="landing-container">
            <SectionHeading {...content.sections.audience} />
            <div className="partner-audience-grid">{content.sections.audience.items.map((item, index) => {
              const Icon = audienceIcons[index];
              return <article key={item.title} className="landing-card"><span className="partner-icon"><Icon size={24} /></span><h3>{item.title}</h3><p>{item.text}</p></article>;
            })}</div>
          </div>
        </section>
        <section className="partner-formats landing-section">
          <div className="landing-container">
            <SectionHeading {...content.sections.formats} />
            <div className="landing-cards">{content.sections.formats.items.map((item, index) => {
              const Icon = formatIcons[index];
              return <article key={item.title} className="landing-card"><span className="partner-icon"><Icon size={24} /></span><h3>{item.title}</h3><p className="partner-best-for">{item.bestFor}</p><p>{item.text}</p></article>;
            })}</div>
          </div>
        </section>
        <section className="partner-process landing-section">
          <div className="landing-container">
            <SectionHeading {...content.sections.process} />
            <div className="landing-cards landing-cards-steps">{content.sections.process.items.map((item, index) => <article key={item.title} className="landing-card"><span className="partner-step">{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </div>
        </section>
        <section className="partner-benefits landing-section">
          <div className="landing-container">
            <div className="partner-benefits-grid"><BenefitsColumn {...content.sections.partnerGets} /><BenefitsColumn {...content.sections.recommend} /></div>
            <div className="partner-tracking">
              <div><h3>{content.sections.tracking.title}</h3><p>{content.sections.tracking.text}</p></div>
              <div className="partner-example"><p>{content.sections.tracking.exampleLabel}</p><p>surfdanang.com/?partner=hotel_abc</p></div>
            </div>
          </div>
        </section>
        <section className="landing-contact partner-contact">
          <div className="landing-container">
            <h2>{content.sections.finalCta.title}</h2><p>{content.sections.finalCta.text}</p>
            <a href={links.whatsapp} onClick={event => handlePartnerClick(event, "partner_cta_click", "discuss_partnership", whatsapp)} target="_blank" rel="noopener noreferrer" className="landing-button">{content.sections.finalCta.button}<ArrowUpRight size={18} /></a>
            <p className="partner-note">{content.sections.finalCta.note}</p>
          </div>
        </section>
      </main>
    </LandingShell>
  );
}
