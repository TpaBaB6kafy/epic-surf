"use client";

import Image from 'next/image';
import { MessageCircle, Send } from 'lucide-react';
import { InstagramIcon } from '../Icons';
import HomeV2Footer from '../home-v2/HomeV2Footer';
import { buildTelegramUrl, buildWhatsAppUrl, getHrefWithCurrentQuery, trackEvent } from '../../utils/tracking';
import { translations } from '../../data/translations';
import { links } from '../../data/links';
import { ContentFrame } from './primitives';
import './site-footer.css';

export function SiteFooter({ locale, languageHref, fullWidthDetails = false, serviceType = 'surf_lesson' }) {
  const t = translations[locale];
  const partnership = serviceType === 'partnership';
  const message = partnership ? (locale === 'ru' ? 'Привет! Хочу обсудить партнёрство с Epic Surf School.' : 'Hi Epic Surf School! I want to discuss a partnership.') : (locale === 'ru' ? 'Привет! Хочу узнать об уроках в EPIC.' : 'Hi! I would like to ask about EPIC surf lessons.');
  const details = <details className="ds-lesson-footer-details"><summary>{locale === 'ru' ? 'Контакты и карта' : 'Contacts and map'}</summary><HomeV2Footer t={t} lang={locale} links={links} description={t.heroSub} mapInitiallyActive={false} layout="library" /></details>;
  const home = locale === 'ru' ? '/ru' : '/';
  const navigation = [['lessons',t.navLessons],['rentals',t.navRentals],['how-it-works',t.navHow],['forecast',t.navForecast],['events',t.navEvents],['location',t.navLocation]];
  const socials = [['whatsapp','WhatsApp',MessageCircle],['telegram','Telegram',Send],['instagram','Instagram',InstagramIcon]];
  return <div className={`ds-lesson-footer${fullWidthDetails ? ' ds-site-footer-wide' : ''}`}><ContentFrame>
    <div className="ds-lesson-footer-row">
      <a className="ds-lesson-footer-logo" href={home} aria-label="Epic Surf School"><Image src="/design/home-v5/header/epic-logo-artwork.svg" width={80} height={36} alt="EPIC" unoptimized /></a>
      <nav aria-label={locale === 'ru' ? 'Навигация в подвале' : 'Footer navigation'}>{navigation.map(([fragment,label]) => <a key={fragment} href={home + '#' + fragment}>{label}</a>)}<a href={home === '/' ? '/partners' : '/ru/partners'}>{locale === 'ru' ? 'Для партнёров' : 'Partners'}</a></nav>
      <div className="ds-lesson-footer-socials"><a href={languageHref} aria-label={locale === 'ru' ? 'Switch to English' : 'Переключить на русский'} onClick={event=>{ event.preventDefault(); trackEvent('language_switch',{language:locale,cta_location:'footer',cta_label:locale==='ru'?'en':'ru'}); window.location.assign(getHrefWithCurrentQuery(languageHref)); }}>{locale === 'ru' ? 'EN' : 'RU'}</a>{socials.map(([name,label,Icon])=><a key={name} href={links[name]} aria-label={label} target="_blank" rel="noopener noreferrer" onClick={event=>{ if(name === 'whatsapp' || name === 'telegram') { const builder=name === 'whatsapp' ? buildWhatsAppUrl : buildTelegramUrl; event.currentTarget.href=builder(links[name],message,{language:locale,includePartnerCode:partnership}); trackEvent(name + '_click',{language:locale,service_type:serviceType,cta_location:'footer',cta_label:name}); } else trackEvent('social_click',{platform:name,location:'footer',language:locale}); }}><Icon /></a>)}</div>
    </div>
    {!fullWidthDetails && details}
  </ContentFrame>{fullWidthDetails && details}</div>;
}
