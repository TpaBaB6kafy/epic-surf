"use client";

import { useEffect, useState } from 'react';
import { Action, ServicePageTemplate, SiteShell } from './design-system';
import BookingModal from './BookingModal';
import { buildLessonServiceModel } from '../data/lessonServicePage';
import { translations } from '../data/translations';
import { links } from '../data/links';
import { buildTelegramUrl, buildWhatsAppUrl, buildZaloUrl, storeAttributionFromUrl, trackEvent } from '../utils/tracking';

// The pilot owns production actions; library components remain independent of them.
export default function LessonServicePage({ page, locale = 'en' }) {
  const [bookingUrl, setBookingUrl] = useState(null);
  const model = buildLessonServiceModel(page, locale);
  const message = locale === 'ru' ? `Привет! У меня вопрос про ${page.title} в Epic Surf School.` : `Hi! I have a question about ${page.title} at Epic Surf School.`;
  useEffect(() => {
    storeAttributionFromUrl({ includePartner: true });
    trackEvent('page_view', { language: locale, page_type: 'seo_page', page_slug: page.path });
  }, [locale, page.path]);
  const openBooking = (url, options = {}) => {
    trackEvent(options.event || 'booking_cta_click', { language: locale, service_type: options.serviceType || 'surf_lesson',
      cta_location: options.ctaLocation || 'seo_page', cta_label: options.ctaLabel || page.bookingLabel || 'book_now' });
    setBookingUrl(url);
  };
  const book = location => openBooking(links.booking[locale][page.bookingService || 'group'], { serviceType: page.bookingService || 'group', ctaLocation: location, ctaLabel: page.bookingLabel || page.path });
  const choose = (service, event) => {
    if (links.booking[locale][service]) {
      openBooking(links.booking[locale][service], { serviceType: service, ctaLocation: 'seo_page_formats', ctaLabel: service });
      return;
    }
    const title = translations[locale].cards.find(item => item.id === service).title;
    const request = locale === 'ru' ? `Привет! Хочу записаться на ${title} в EPIC.` : `Hi! I'd like to book a ${title} lesson at EPIC.`;
    event.currentTarget.href = buildWhatsAppUrl(links.whatsapp, request, { language: locale });
    trackEvent('whatsapp_click', { language: locale, service_type: service, cta_location: 'seo_page_formats', cta_label: service });
  };
  const messenger = (event, name, builder, location) => {
    event.currentTarget.href = builder(links[name], message, { language: locale });
    trackEvent(`${name}_click`, { language: locale, service_type: location === 'seo_page_hero' ? 'general_question' : 'surf_lesson', cta_location: location, cta_label: location === 'seo_page_hero' ? page.path : name });
  };
  const messengerAction = (name, label, builder, location) => <Action key={name} href={links[name]} variant="secondary" target="_blank" rel="noopener noreferrer" onClick={event => messenger(event,name,builder,location)}>{label}</Action>;
  return <SiteShell locale={locale} languageHref={locale === 'ru' ? '/surf-lessons-danang' : '/ru/surf-lessons-danang'} onBooking={openBooking}>
    <ServicePageTemplate model={model} locale={locale} onBook={book} onChoose={choose} offerContactHref={links.whatsapp}
      heroSecondary={messengerAction('whatsapp',page.secondaryCta,buildWhatsAppUrl,'seo_page_hero')}
      messengers={[[ 'whatsapp','WhatsApp',buildWhatsAppUrl ],[ 'telegram','Telegram',buildTelegramUrl ],[ 'zalo','Zalo',buildZaloUrl ]].map(([name,label,builder]) => messengerAction(name,label,builder,'seo_page_contact'))} />
    <BookingModal bookingModalUrl={bookingUrl} setBookingModalUrl={setBookingUrl} title={translations[locale].modalTitle} />
  </SiteShell>;
}
