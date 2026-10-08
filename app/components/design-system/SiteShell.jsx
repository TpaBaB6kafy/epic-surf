"use client";

import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Header from '../Header';
import MessengerFab from '../MessengerFab';
import { ChatTelegramIcon, ChatWhatsAppIcon, ChatZaloIcon } from '../Icons';
import { translations } from '../../data/translations';
import { links } from '../../data/links';
import { PageFrame } from './primitives';
import { SiteFooter } from './SiteFooter';
import './site-shell.css';

// Existing site integrations, with layout owned by the opt-in library scope.
export function SiteShell({ locale = 'en', languageHref, onBooking, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[locale];
  return <MotionConfig reducedMotion="user"><PageFrame locale={locale} className="ds-site-shell">
    <a href="#service-content" className="ds-skip-link">{locale === 'ru' ? 'К содержимому' : 'Skip to content'}</a>
    <Header t={t} lang={locale} links={links} variant="homeV2" languageHref={languageHref}
      sectionHrefBase={locale === 'ru' ? '/ru' : '/'} isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen} openBookingModal={onBooking} showMobileBackdrop={false} />
    {children}
    <SiteFooter locale={locale} languageHref={languageHref} />
    <MessengerFab links={links} lang={locale} variant="homeV2" ChatWhatsAppIcon={ChatWhatsAppIcon}
      ChatTelegramIcon={ChatTelegramIcon} ChatZaloIcon={ChatZaloIcon} />
  </PageFrame></MotionConfig>;
}
