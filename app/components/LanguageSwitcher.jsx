"use client";

import { useEffect, useId, useRef, useState } from 'react';
import { getHrefWithCurrentQuery, trackEvent } from '../utils/tracking';

export default function LanguageSwitcher({ locale, options, location = 'header' }) {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const button = useRef(null);
  const id = useId();
  const label = locale === 'vi' ? 'Chọn ngôn ngữ' : locale === 'ru' ? 'Выбрать язык' : 'Choose language';
  useEffect(() => {
    if (!open) return;
    const outside = event => { if (!root.current?.contains(event.target)) setOpen(false); };
    const escape = event => {
      if (event.key === 'Escape') { setOpen(false); button.current?.focus(); }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);
  return <div ref={root} className={'site-language-control site-language-' + location}>
    <button ref={button} type="button" className="site-language-switcher" data-language-toggle
      data-home-v2-language-switcher={location === 'header' ? 'true' : undefined}
      aria-label={label} aria-expanded={open} aria-controls={id}
      onClick={() => setOpen(value => !value)}>{locale.toUpperCase()}</button>
    {open && <div id={id} className="site-language-options" role="group" aria-label={label}>
      {options.map(option => <a key={option.locale} href={option.href} lang={option.locale}
        aria-label={option.name} aria-current={option.locale === locale ? 'page' : undefined}
        onClick={event => {
          event.preventDefault();
          setOpen(false);
          if (option.locale === locale) { button.current?.focus(); return; }
          trackEvent('language_switch', { language: locale, cta_location: location, cta_label: option.locale });
          window.location.assign(getHrefWithCurrentQuery(option.href));
        }}>{option.label}</a>)}
    </div>}
  </div>;
}
