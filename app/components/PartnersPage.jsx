"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MotionConfig } from 'framer-motion';
import { Building2, Camera, Check, Coffee, Hotel, Mail, MessageCircle, Plane, Users, Waves } from 'lucide-react';
import { Action, ContentFrame, FramedPhoto, PageFrame, SectionHeading } from './design-system';
import LandingShell from './landing-v5/LandingShell';
import PartnerCodeDialog from './partners/PartnerCodeDialog';
import { getPartnerContact } from '../utils/partner-contact';
import { partnersContent } from '../data/partners';
import { storeAttributionFromUrl, trackEvent } from '../utils/tracking';
import './partners/partners-v4.css';

const assetRoot = '/design/partners-v4';
const audienceIcons = [Hotel, Building2, Plane, Coffee, Camera, Users];
const processIcons = [MessageCircle, Mail, Waves, Check];
const formatPhotos = [
  { name: 'referral-reception', framing: { x: 50, y: 48 }, mobile: { x: 55, y: 45 }, alt: { en: 'A concierge recommends a coastal activity to hotel guests', ru: 'Сотрудник ресепшена рекомендует гостям пляжную активность' } },
  { name: 'content-creator', framing: { x: 48, y: 48 }, mobile: { x: 38, y: 48 }, alt: { en: 'A travel creator films the coastline with a camera', ru: 'Автор контента снимает побережье на камеру' } },
  { name: 'group-program-planning', framing: { x: 50, y: 52 }, mobile: { x: 50, y: 52 }, alt: { en: 'An organizer and local coordinator plan a group itinerary', ru: 'Организатор и координатор согласуют групповой маршрут' } },
];

function Heading({ title, subtitle, id }) {
  return <div className="partner-heading-group"><SectionHeading id={id} recipe="utility" align="left" className="partner-heading">{title}</SectionHeading>{subtitle && <p>{subtitle}</p>}</div>;
}
function BenefitsColumn({ title, items }) {
  return <div><SectionHeading recipe="utility" align="left" className="partner-heading">{title}</SectionHeading><ul className="partner-benefit-list">{items.map(item => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}</ul></div>;
}
function FormatsSlider({ content, lang }) {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const gesture = useRef(null);
  const items = content.items;
  const select = index => {
    const next = (index + items.length) % items.length;
    setActive(next);
    const tab = tabs.current[next], strip = tab?.parentElement;
    if (!strip || strip.scrollWidth <= strip.clientWidth) return;
    const area = strip.getBoundingClientRect(), button = tab.getBoundingClientRect();
    const shift = button.left < area.left ? button.left - area.left - 4 : button.right > area.right ? button.right - area.right + 4 : 0;
    if (shift) strip.scrollTo({ left: strip.scrollLeft + shift, behavior: 'instant' });
  };
  const onTabKey = (event, index) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % items.length;
    if (event.key === 'ArrowLeft') next = (index + items.length - 1) % items.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = items.length - 1;
    if (next === undefined) return;
    event.preventDefault(); event.stopPropagation(); select(next); tabs.current[next]?.focus();
  };
  const photo = formatPhotos[active];
  const item = items[active];
  return <div className="partner-slider" role="region" aria-roledescription={lang === 'ru' ? 'карусель' : 'carousel'} aria-labelledby="partner-formats-heading">
    <div className="partner-format-tabs" role="tablist" aria-label={content.title}>
      {items.map((format, index) => <button key={format.title} ref={node => { tabs.current[index] = node; }} type="button" role="tab" id={`partner-format-tab-${index}`} aria-selected={active === index} aria-controls="partner-format-panel" tabIndex={active === index ? 0 : -1} onKeyDown={event => onTabKey(event, index)} onClick={() => select(index)}>{format.title}</button>)}
    </div>
    <div className="partner-slider-layout">
      <div className="partner-active-format" id="partner-format-panel" role="tabpanel" aria-labelledby={`partner-format-tab-${active}`} tabIndex={0} onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); select(active + (event.key === 'ArrowRight' ? 1 : -1)); }
      }}>
        <div className="partner-slider-photo" onPointerDown={event => { gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId }; }} onPointerCancel={() => { gesture.current = null; }} onPointerUp={event => {
          const start = gesture.current; gesture.current = null;
          if (!start || start.id !== event.pointerId) return;
          const dx = event.clientX - start.x, dy = event.clientY - start.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) select(active + (dx < 0 ? 1 : -1));
        }}>
          <FramedPhoto key={photo.name} src={`${assetRoot}/${photo.name}.webp`} alt={photo.alt[lang]} shape="plain" ratio="2 / 1" framing={photo.framing} mobileFraming={photo.mobile} sizes="(min-width: 2300px) 1220px, (min-width: 1200px) 53vw, (min-width: 700px) 62vw, 92vw" className="partner-format-photo" />
        </div>
        <div className="partner-format-caption" aria-live="polite" aria-atomic="true"><h3>{item.title}</h3><p className="partner-format-best">{item.bestFor}</p><p>{item.text}</p></div>
      </div>
      <div className="partner-format-previews" role="group" aria-label={lang === 'ru' ? 'Другие форматы' : 'Other formats'}>
        {items.map((format, index) => index !== active && <button type="button" key={format.title} onClick={() => select(index)} aria-label={`${lang === 'ru' ? 'Показать формат' : 'Show format'}: ${format.title}`}>
          <FramedPhoto src={`${assetRoot}/${formatPhotos[index].name}-preview.webp`} alt="" shape="plain" ratio="3 / 2" framing={formatPhotos[index].framing} mobileFraming={formatPhotos[index].mobile} sizes="(min-width: 2300px) 520px, (min-width: 700px) 25vw, 40vw" className="partner-preview-photo" /><span>{format.title}</span>
        </button>)}
      </div>
    </div>
  </div>;
}

export default function PartnersPage({ locale = 'en' }) {
  const lang = locale === 'ru' ? 'ru' : 'en';
  const content = partnersContent[lang];
  const contact = getPartnerContact(lang);
  const [codeFormOpen, setCodeFormOpen] = useState(false);
  useEffect(() => {
    storeAttributionFromUrl({ includePartner: true });
    trackEvent('page_view', { language: lang });
  }, [lang]);
  const handlePartnerClick = (event, eventName, label, hrefBuilder) => {
    event.currentTarget.href = hrefBuilder();
    trackEvent(eventName, { language: lang, service_type: 'partnership', cta_location: 'partners_page', cta_label: label });
  };
  const openCodeForm = () => {
    trackEvent('partner_cta_click', { language: lang, service_type: 'partnership', cta_location: 'partners_page', cta_label: 'get_partner_code' });
    setCodeFormOpen(true);
  };
  return <MotionConfig reducedMotion="user"><PageFrame locale={lang} className="partner-page"><LandingShell locale={lang} languageHref={content.languageHref} className="landing-partners partners-v4" footerCollapsible footerServiceType="partnership">
    <a className="partner-skip-link" href="#partner-content">{lang === 'ru' ? 'К содержимому' : 'Skip to content'}</a>
    <main id="partner-content">
      <section className="partner-hero-v4 partner-painted" aria-labelledby="partner-title">
        <div className="partner-hero-art" aria-hidden="true"><Image src={`${assetRoot}/surfer-epic-fish.webp`} alt="" width={1536} height={1024} priority unoptimized /></div>
        <ContentFrame className="partner-hero-frame">
          <SectionHeading as="h1" id="partner-title" recipe="utility" align="left" className="partner-title">{lang === 'ru' ? <><span className="partner-title-opening">Станьте</span> партнёром </> : <>Partner with<br /></>}<em>Epic Surf</em></SectionHeading>
          <div className="partner-hero-copy"><p className="partner-eyebrow">{content.badge}</p><p className="partner-hero-description">{content.subtitle}</p><div className="partner-actions">
            <Action onClick={openCodeForm} aria-haspopup="dialog">{content.primaryCta}</Action>
            <Action href={contact.href} variant="secondary" onClick={event => handlePartnerClick(event, contact.eventName, 'message_us', contact.buildHref)} target="_blank" rel="noopener noreferrer">{content.secondaryCta}</Action>
          </div></div>
        </ContentFrame>
      </section>
      <section className="partner-audience-v4 partner-paper" aria-labelledby="partner-audience-heading"><ContentFrame>
        <Heading {...content.sections.audience} id="partner-audience-heading" />
        <div className="partner-audiences">{content.sections.audience.items.map((item, index) => { const Icon = audienceIcons[index]; return <article key={item.title}><Icon aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.text}</p></div></article>; })}</div>
      </ContentFrame></section>
      <section className="partner-formats-v4 partner-dark" aria-labelledby="partner-formats-heading"><ContentFrame>
        <Heading {...content.sections.formats} id="partner-formats-heading" /><FormatsSlider content={content.sections.formats} lang={lang} />
      </ContentFrame></section>
      <section className="partner-process-v4 partner-dark" aria-labelledby="partner-process-heading"><ContentFrame>
        <Heading {...content.sections.process} id="partner-process-heading" /><ol className="partner-process-list">{content.sections.process.items.map((item, index) => { const Icon = processIcons[index]; return <li key={item.title}><div className="partner-process-icon"><Icon aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.text}</p></li>; })}</ol>
      </ContentFrame></section>
      <section className="partner-benefits-v4 partner-paper" aria-label={lang === 'ru' ? 'Преимущества и отслеживание заявок' : 'Benefits and referral tracking'}><ContentFrame>
        <div className="partner-benefit-columns"><BenefitsColumn {...content.sections.partnerGets} /><BenefitsColumn {...content.sections.recommend} /></div>
        <div className="partner-attribution"><div><h3>{content.sections.tracking.title}</h3><p>{content.sections.tracking.text}</p></div><div className="partner-link-example"><p>{content.sections.tracking.exampleLabel}</p><code>surfdanang.com/?partner=hotel_abc</code></div></div>
      </ContentFrame></section>
      <section className="partner-final-v4 partner-painted" aria-labelledby="partner-final-heading"><ContentFrame className="partner-final-frame">
        <div className="partner-hands" aria-hidden="true"><Image src={`${assetRoot}/partner-hands.webp`} alt="" width={1024} height={1536} unoptimized /></div>
        <div className="partner-final-copy"><SectionHeading id="partner-final-heading" recipe="utility" align="left" className="partner-heading">{content.sections.finalCta.title}</SectionHeading><p>{content.sections.finalCta.text}</p><Action href={contact.href} onClick={event => handlePartnerClick(event, 'partner_cta_click', 'discuss_partnership', contact.buildHref)} target="_blank" rel="noopener noreferrer">{content.sections.finalCta.button}</Action><p className="partner-final-note">{content.sections.finalCta.note}</p></div>
      </ContentFrame></section>
    </main>
    {codeFormOpen && <PartnerCodeDialog open onClose={() => setCodeFormOpen(false)} locale={lang} contact={contact} />}
  </LandingShell></PageFrame></MotionConfig>;
}
