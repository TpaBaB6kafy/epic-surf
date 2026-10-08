"use client";

import Image from 'next/image';
import { MessageCircle, Send } from 'lucide-react';
import { InstagramIcon, ChatZaloIcon } from '../Icons';
import HomeV2Footer from '../home-v2/HomeV2Footer';
import LanguageSwitcher from '../LanguageSwitcher';
import { buildTelegramUrl, buildWhatsAppUrl, buildZaloUrl, getHrefWithCurrentQuery, trackEvent } from '../../utils/tracking';
import { translations } from '../../data/translations';
import { links } from '../../data/links';
import { ContentFrame } from './primitives';
import './site-footer.css';

export function SiteFooter({ locale, languageHref, languageOptions, shellCopy, fullWidthDetails = false, serviceType = 'surf_lesson' }) {
  const t = shellCopy || translations[locale] || translations.en;
  const isVi = locale === 'vi';
  const partnership = serviceType === 'partnership';
  const message = partnership
    ? (isVi ? 'Xin chào Epic Surf School! Tôi muốn trao đổi về việc hợp tác.' : locale === 'ru' ? 'Привет! Хочу обсудить партнёрство с Epic Surf School.' : 'Hi Epic Surf School! I want to discuss a partnership.')
    : (isVi ? 'Xin chào! Tôi muốn tìm hiểu về các lớp học lướt sóng tại Epic Surf.' : locale === 'ru' ? 'Привет! Хочу узнать об уроках в EPIC.' : 'Hi! I would like to ask about EPIC surf lessons.');
  const details = <details className="ds-lesson-footer-details"><summary>{isVi ? 'Thông tin liên hệ và bản đồ' : locale === 'ru' ? 'Контакты и карта' : 'Contacts and map'}</summary><HomeV2Footer t={t} lang={locale} links={links} description={t.heroSub} mapInitiallyActive={false} layout="library" /></details>;
  const home = locale === 'ru' ? '/ru' : '/';
  const partnersHref = isVi ? '/vi/partners' : locale === 'ru' ? '/ru/partners' : '/partners';
  const navigation = [['lessons',t.navLessons],['rentals',t.navRentals],['how-it-works',t.navHow],['forecast',t.navForecast],['events',t.navEvents],['location',t.navLocation]];
  const socials = isVi
    ? [['zalo','Zalo',ChatZaloIcon],['whatsapp','WhatsApp',MessageCircle],['telegram','Telegram',Send],['instagram','Instagram',InstagramIcon]]
    : [['whatsapp','WhatsApp',MessageCircle],['telegram','Telegram',Send],['instagram','Instagram',InstagramIcon]];
  const builders = { whatsapp: buildWhatsAppUrl, telegram: buildTelegramUrl, zalo: buildZaloUrl };
  return <div className={'ds-lesson-footer' + (fullWidthDetails ? ' ds-site-footer-wide' : '')}><ContentFrame>
    <div className="ds-lesson-footer-row">
      <a className="ds-lesson-footer-logo" href={home} aria-label="Epic Surf School"><Image src="/design/home-v5/header/epic-logo-artwork.svg" width={80} height={36} alt="EPIC" unoptimized /></a>
      <nav aria-label={isVi ? 'Điều hướng cuối trang' : locale === 'ru' ? 'Навигация в подвале' : 'Footer navigation'}>{navigation.map(([fragment,label]) => <a key={fragment} href={home + '#' + fragment} title={isVi ? 'Nội dung trên trang chính bằng tiếng Anh' : undefined}>{label}</a>)}<a href={partnersHref}>{isVi ? 'Đối tác' : locale === 'ru' ? 'Для партнёров' : 'Partners'}</a></nav>
      <div className="ds-lesson-footer-socials">
        {languageOptions ? <LanguageSwitcher locale={locale} options={languageOptions} location="footer" /> : <a href={languageHref} aria-label={locale === 'ru' ? 'Switch to English' : 'Переключить на русский'} onClick={event=>{ event.preventDefault(); trackEvent('language_switch',{language:locale,cta_location:'footer',cta_label:locale==='ru'?'en':'ru'}); window.location.assign(getHrefWithCurrentQuery(languageHref)); }}>{locale === 'ru' ? 'EN' : 'RU'}</a>}
        {socials.map(([name,label,Icon])=><a key={name} href={links[name]} aria-label={label} target="_blank" rel="noopener noreferrer" onClick={event=>{
          if(builders[name]) {
            event.currentTarget.href=builders[name](links[name],message,{language:locale,includePartnerCode:partnership});
            trackEvent(name + '_click',{language:locale,service_type:serviceType,cta_location:'footer',cta_label:name});
          } else trackEvent('social_click',{platform:name,location:'footer',language:locale});
        }}><Icon /></a>)}
      </div>
    </div>
    {isVi && <p className="partner-navigation-note">Thông tin lớp học và đặt lịch trên trang chính hiện có bằng tiếng Anh và tiếng Nga.</p>}
    {!fullWidthDetails && details}
  </ContentFrame>{fullWidthDetails && details}</div>;
}
