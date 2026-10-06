"use client";

import Image from 'next/image';
import { useId, useRef, useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, MapPin, PackageCheck, PersonStanding, Users, Waves } from 'lucide-react';
import { Action, ContentFrame, FramedPhoto, IconControl, SectionHeading } from './primitives';
import { FAQList } from './interactive';
import './service-page.css';

export function ServiceChoices({ items, locale = 'en', onChoose, actionLabel, contactHref }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const move = direction => setSelected(index => (index + direction + items.length) % items.length);
  return <div className="ds-service-choices">
    <div className="ds-lesson-choice-list" role="group" aria-label={locale === 'ru' ? 'Форматы занятий' : 'Lesson formats'}>
      {items.map((item, index) => <button key={item.id} type="button" className="ds-lesson-choice ds-filter" id={`${id}-choice-${index}`} aria-controls={`${id}-offer-${index}`} aria-pressed={selected === index} onClick={() => setSelected(index)}>
        <span className="ds-lesson-choice-heading"><strong>{item.title}</strong><span className="ds-lesson-choice-price">{item.price} <span>VND</span></span></span>
        <span className="ds-lesson-choice-description">{item.description}</span>
      </button>)}
    </div>
    <div className="ds-lesson-selected" aria-live="polite" aria-atomic="true">
      {items.map((item, index) => <div key={item.id} id={`${id}-offer-${index}`} className="ds-lesson-offer" role="region" aria-labelledby={`${id}-choice-${index}`} hidden={selected !== index}>
        <div className="ds-lesson-offer-media">{item.fit === "portrait" && <div className="ds-lesson-offer-backdrop" aria-hidden="true"><Image src={item.image} alt="" fill unoptimized sizes="(max-width: 1199px) 92vw, 46vw" /></div>}<FramedPhoto src={item.image} alt={item.title} shape="service" ratio="3 / 2" sizes="(max-width: 799px) 90vw, 46vw" className={`ds-lesson-offer-photo${item.fit === "portrait" ? " ds-lesson-offer-photo-portrait" : ""}`} />
        <IconControl label={locale === 'ru' ? 'Предыдущий урок' : 'Previous lesson'} icon={<ChevronLeft aria-hidden="true" />} className="ds-lesson-prev" onClick={() => move(-1)} />
        <IconControl label={locale === 'ru' ? 'Следующий урок' : 'Next lesson'} icon={<ChevronRight aria-hidden="true" />} className="ds-lesson-next" onClick={() => move(1)} />
        </div><Action className="ds-lesson-book" href={item.contact ? contactHref : undefined} target={item.contact ? "_blank" : undefined} rel={item.contact ? "noopener noreferrer" : undefined} onClick={event => onChoose(item.id, event)}>{item.actionLabel || actionLabel}</Action>
      </div>)}
    </div>
  </div>;
}

// These are the original homepage assets, placed at their original proportions.
// The two exported halves are joined without regenerating EPIC equipment.
export function LessonGearArtwork() {
  const root = '/design/home-v5/lessons-included';
  const parts = [
    ['svg/gear-background-2142-446.svg', 0, 0, 332, 166], ['svg/gear-background.svg', 0, 166, 332, 166],
    ['png/rashguard-artwork-2142-447@2x.png', 41, 37, 246, 129], ['png/rashguard-artwork@2x.png', 41, 166, 246, 117],
    ['png/camera-artwork-2142-448@2x.png', 41, 160, 122, 6], ['png/camera-artwork@2x.png', 41, 166, 122, 116],
    ['png/zinc-artwork-2142-449@2x.png', 153, 158, 137, 8], ['png/zinc-artwork@2x.png', 153, 166, 137, 129],
  ];
  return <div className="ds-lesson-gear" aria-hidden="true">{parts.map(([file, x, y, width, height]) => <Image key={file} src={`${root}/${file}`} alt="" width={width} height={height} unoptimized style={{ left: `${x / 3.32}%`, top: `${y / 3.32}%`, width: `${width / 3.32}%`, height: `${height / 3.32}%` }} />)}</div>;
}

export function LessonIncluded({ title, body, items }) {
  const icons = [Waves, Users, Camera];
  return <div className="ds-lesson-included"><LessonGearArtwork /><div className="ds-lesson-included-copy"><SectionHeading align="left">{title}</SectionHeading><p>{body}</p><ul className="ds-lesson-included-items">{items.map((text, i) => { const Icon = icons[i]; return <li key={text}><Icon aria-hidden="true" /><span>{text}</span></li>; })}</ul></div></div>;
}

export function LessonProcess({ title, body, steps }) {
  const [active, setActive] = useState(0);
  const photos = useRef(null);
  const id = useId();
  const icons = [PackageCheck, PersonStanding, Waves, Camera];
  const select = index => {
    setActive(index);
    const strip = photos.current;
    if (strip && window.matchMedia('(max-width: 799px)').matches) {
      strip.scrollTo({ left: strip.children[index].offsetLeft - strip.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };
  const followPhoto = event => {
    if (!window.matchMedia('(max-width: 799px)').matches) return;
    const strip = event.currentTarget;
    const index = [...strip.children].reduce((best, child, i, children) => Math.abs(child.offsetLeft - strip.offsetLeft - strip.scrollLeft) < Math.abs(children[best].offsetLeft - strip.offsetLeft - strip.scrollLeft) ? i : best, 0);
    setActive(index);
  };
  return <div className="ds-lesson-process" data-active-step={active + 1}>
    <ContentFrame><div className="ds-lesson-process-heading"><SectionHeading align="left">{title}</SectionHeading><p>{body}</p></div></ContentFrame>
    <div ref={photos} className="ds-lesson-process-photos" onScroll={followPhoto}>{steps.map((step, i) => <figure key={step.id} id={`${id}-photo-${i}`} className="ds-lesson-process-photo" data-active={active === i}>
      <FramedPhoto src={step.src} alt={step.description} shape="plain" ratio="3 / 2" framing={i === 1 ? { x: 65, y: 35, scale: 1 } : undefined} sizes="(max-width: 799px) 82vw, 25vw" />
      <figcaption><span>{i + 1}</span>{step.title}</figcaption>
    </figure>)}</div>
    <ContentFrame><ol className="ds-lesson-process-steps">{steps.map((step, i) => { const Icon = icons[i]; return <li key={step.id} data-active={active === i} data-complete={i < active}>
      <button type="button" className="ds-lesson-step-control" aria-pressed={active === i} aria-controls={`${id}-photo-${i}`} onClick={() => select(i)} onKeyDown={event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? steps.length - 1 : (i + (event.key === 'ArrowRight' ? 1 : -1) + steps.length) % steps.length; select(next); event.currentTarget.closest('ol').querySelectorAll('button')[next].focus(); } }}>
        <span className={`ds-lesson-step-icon ds-lesson-step-icon-${i + 1}`}><Icon aria-hidden="true" /><span className="ds-lesson-step-number" aria-hidden="true">{i + 1}</span></span>
        <span className="ds-lesson-step-title">{step.title}</span><span className="ds-lesson-step-duration">{step.duration}</span>
      </button><p>{step.description}</p>
    </li>; })}</ol></ContentFrame>
  </div>;
}

export function ContentStory({ title, body, items, children }) {
  return <div className="ds-story-grid"><SectionHeading align="left">{title}</SectionHeading><div className="ds-story-copy">{body && <p>{body}</p>}{items?.length > 0 && <ul className="ds-story-list">{items.map(item => <li key={item}>{item}</li>)}</ul>}{children}</div></div>;
}

// Presentation only: the route owns booking, tracking and attribution.
export function ServicePageTemplate({ model, locale = 'en', onBook, onChoose, offerContactHref, heroSecondary, messengers }) {
  const { hero, sections, faq, additionalFaq, related, contact, labels } = model;
  const offers = sections.find(section => section.kind === 'offers');
  const included = sections.find(section => section.kind === 'included');
  const process = sections.find(section => section.kind === 'process');
  return <main id="service-content" tabIndex={-1} className="ds-service-page" data-service-template>
    <section className="ds-service-hero" id="lesson-intro">
      <Image className="ds-lesson-hero-photo" src={hero.image} alt={hero.imageAlt} fill priority unoptimized sizes="100vw" />
      <ContentFrame><div className="ds-lesson-hero-copy"><p className="ds-service-eyebrow"><MapPin aria-hidden="true" />{hero.eyebrow}</p><SectionHeading as="h1" align="left" className="ds-hero-title" aria-label={hero.title}>{hero.lines.map(line => <span className="ds-hero-line" key={line}>{line}</span>)}</SectionHeading><div className="ds-page-actions"><Action onClick={() => onBook('seo_page_hero')}>{hero.primaryCta}</Action>{heroSecondary}</div></div></ContentFrame>
    </section>
    <div className="ds-lesson-textured-wrap"><div className="ds-lesson-textured">
      <section id={offers.id} className="ds-lesson-formats"><ContentFrame><SectionHeading align="left">{offers.title}</SectionHeading><ServiceChoices items={offers.offers} locale={locale} onChoose={onChoose} actionLabel={labels.book} contactHref={offerContactHref} /></ContentFrame></section>
      <section id={included.id} className="ds-lesson-included-section"><ContentFrame><LessonIncluded {...included} /></ContentFrame></section>
      <section id={process.id} className="ds-lesson-process-section"><LessonProcess {...process} /></section>
      </div><ContentFrame className="ds-lesson-final-container"><div className="ds-lesson-final-band">
        <section id="lesson-faq" className="ds-lesson-faq"><SectionHeading align="left">{labels.faq}</SectionHeading><FAQList items={faq} /><details className="ds-lesson-more"><summary>{labels.more}</summary><FAQList items={additionalFaq} /><div id="lesson-related" className="ds-lesson-related"><h3>{related.title}</h3>{related.items.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}</div></details></section>
        <section id="lesson-contact" className="ds-lesson-contact"><SectionHeading align="left">{contact.title}</SectionHeading><p>{contact.body}</p><div className="ds-page-actions"><Action onClick={() => onBook('seo_page_contact')}>{hero.primaryCta}</Action>{messengers[0]}</div><div className="ds-lesson-contact-links">{messengers.slice(1)}</div></section>
      </div></ContentFrame>
    </div>
  </main>;
}
