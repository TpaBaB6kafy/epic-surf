"use client";

import { useRef, useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { Action, ContentFrame, Filter, FramedPhoto, IconControl, SectionHeading, Surface } from './primitives';
import { Dialog } from './interactive';

export function ProcessGrid({ steps, title, accent, locale = 'en' }) {
  return <div className="ds-process-recipe"><SectionHeading>{title}{accent && <> <span>{accent}</span></>}</SectionHeading><div className="ds-process-grid">{steps.map((step, index) => <article className="ds-process-card" key={step.id || step.title}>
    <div className="ds-process-media"><FramedPhoto src={step.src} alt={step.alt || step.title} slot={step.slot} sizes="(max-width: 999px) 40vw, 22vw" className="ds-process-photo" /><h3 className="ds-process-label">{step.title}</h3></div>
    <p>{step.description || step.desc}</p><span className="ds-visually-hidden">{locale === 'ru' ? 'Шаг' : 'Step'} {index + 1}</span>
  </article>)}</div></div>;
}

export function ServiceOffer({ title, price, currency = 'VND', description, image, slot, action, previous, next, locale = 'en' }) {
  return <div className="ds-service-recipe">
    <div className="ds-service-copy"><Surface tone="dark" className="ds-service-price"><h3>{title}</h3><p><strong>{price}</strong> <span>{currency}</span></p></Surface><Surface tone="sea" className="ds-service-description"><p>{description}</p></Surface></div>
    <FramedPhoto src={image} alt={title} slot={slot} shape="service" ratio="3 / 2" className="ds-service-photo" sizes="(max-width: 699px) 92vw, 45vw" />
    <div className="ds-service-controls">{previous && <IconControl direction="previous" label={locale === 'ru' ? 'Предыдущий урок' : 'Previous lesson'} onClick={previous} />}{action}{next && <IconControl direction="next" label={locale === 'ru' ? 'Следующий урок' : 'Next lesson'} onClick={next} />}</div>
  </div>;
}

export function IncludedPanel({ image, alt = '', items }) {
  return <div className="ds-included"><FramedPhoto src={image} alt={alt} shape="round" ratio="1" className="ds-included-photo" sizes="(max-width:699px) 220px, 280px" /><div>{items.map((item, index) => <Surface key={item.id || index} tone="dark" className="ds-included-item"><p>{item.text || item}</p></Surface>)}</div></div>;
}

export function ReviewCard({ review, locale = 'en' }) {
  const text = locale === 'ru' ? review.excerpt : review.englishTranslation || review.excerpt;
  return <Surface tone="paper" className="ds-review">
    <blockquote><span lang={locale === 'ru' ? review.language : 'en'}>{text}</span></blockquote>
    <div className="ds-review-author"><div><strong>{review.name}</strong>{locale !== 'ru' && review.englishTranslation && <small>Translated from Russian</small>}<a className="ds-text-link" href={review.reviewUrl} target="_blank" rel="noopener noreferrer" aria-label={locale === 'ru' ? `Полный отзыв ${review.name} в Google Maps` : `${review.name}'s full review on Google Maps`}>{locale === 'ru' ? 'Полный отзыв' : 'Full review'} <ExternalLink aria-hidden="true" size={14} /></a></div>{review.avatarUrl && <FramedPhoto src={review.avatarUrl} alt="" shape="arch" ratio="88 / 104" className="ds-review-avatar" sizes="96px" />}</div>
  </Surface>;
}
export function ReviewRating({ rating, href, locale = 'en' }) {
  return <a className="ds-rating" href={href} target="_blank" rel="noopener noreferrer" aria-label={locale === 'ru' ? `Рейтинг EPIC: ${rating} из 5. Читать отзывы в Google Maps` : `EPIC rating: ${rating} out of 5. Read reviews on Google Maps`}><strong>{new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US', { minimumFractionDigits: 1 }).format(rating)}</strong><span aria-hidden="true">{Array.from({length:5}, (_, index) => <Star key={index} size={16} />)}</span><span>Google Maps</span><ExternalLink aria-hidden="true" size={14} /></a>;
}
export function ReviewsSection({ title, reviews, rating, href, locale = 'en', transition = false }) {
  return <section className={`ds-reviews-section ${transition ? 'ds-reviews-transition' : ''}`}><ContentFrame><div className="ds-reviews-heading"><SectionHeading align="left">{title}</SectionHeading><ReviewRating rating={rating} href={href} locale={locale} /></div><div className="ds-reviews-grid">{reviews.map(review => <ReviewCard key={review.reviewUrl} review={review} locale={locale} />)}</div></ContentFrame>{transition && <div className="ds-wave-transition" aria-hidden="true" />}</section>;
}

// A gallery composition with scoped native dialog and no production tracking.
export function PhotoGallery({ albums, locale = 'en' }) {
  const [active, setActive] = useState(0);
  const [selection, setSelection] = useState(null);
  const touch = useRef(null);
  const album = albums[active];
  const move = direction => setSelection(index => (index + direction + album.photos.length) % album.photos.length);
  const ru = locale === 'ru';
  return <div className="ds-gallery-recipe" onKeyDown={event => {
    if (selection === null || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
    event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);
  }}>
    <div className="ds-filter-group" role="group" aria-label={ru ? 'Альбомы' : 'Albums'}>{albums.map((item, index) => <Filter key={item.id} selected={active === index} onClick={() => { setSelection(null); setActive(index); }}>{item.label}</Filter>)}</div>
    <div className="ds-gallery-grid">{album.photos.map((photo, index) => <button key={photo.src} className="ds-gallery-tile" type="button" aria-label={ru ? `Открыть фото: ${photo.alt}` : `Open photo: ${photo.alt}`} onClick={() => setSelection(index)}><FramedPhoto {...photo} sizes="(max-width:699px) 90vw, 32vw" /></button>)}</div>
    <Dialog open={selection !== null} onClose={() => setSelection(null)} title={`${album.label} · ${selection === null ? '' : selection + 1} / ${album.photos.length}`} closeLabel={ru ? 'Закрыть фото' : 'Close photo'} className="ds-photo-dialog">
      {selection !== null && <><div className="ds-full-photo" onTouchStart={event => { touch.current = event.touches.length === 1 ? {x:event.touches[0].clientX,y:event.touches[0].clientY} : null; }} onTouchCancel={() => { touch.current = null; }} onTouchEnd={event => { if (!touch.current || !event.changedTouches[0]) return; const dx=event.changedTouches[0].clientX-touch.current.x,dy=event.changedTouches[0].clientY-touch.current.y; if (Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)*1.5) move(dx<0?1:-1); touch.current=null; }}><FramedPhoto src={album.photos[selection].src} alt={album.photos[selection].alt} ratio="3 / 2" shape="plain" className="ds-photo-contain" priority /></div><div className="ds-photo-dialog-controls"><IconControl label={ru?'Предыдущее фото':'Previous photo'} direction="previous" onClick={()=>move(-1)} /><p aria-live="polite">{album.photos[selection].alt}</p><IconControl label={ru?'Следующее фото':'Next photo'} direction="next" onClick={()=>move(1)} /></div></>}
    </Dialog>
  </div>;
}

export function RelatedAction({ children, label, href, onClick }) {
  return <Surface tone="sea" className="ds-related-action"><p>{children}</p><Action href={href} onClick={onClick}>{label}</Action></Surface>;
}
