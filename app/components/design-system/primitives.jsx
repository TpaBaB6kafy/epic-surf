"use client";

import Image from 'next/image';
import { ArrowLeft, ArrowRight, LoaderCircle, X } from 'lucide-react';
import { tokenVariables } from './tokens';
import savedFraming from '../../data/gallery-framing.json';
import './system.css';

export const cx = (...items) => items.filter(Boolean).join(' ');

export function PageFrame({ children, locale = 'en', className, style, ...props }) {
  return <div {...props} lang={locale} data-ds-page className={cx('epic-ds', className)} style={{ ...tokenVariables, ...style }}>{children}</div>;
}
export function ContentFrame({ children, as: Tag = 'div', readable = false, className, ...props }) {
  return <Tag {...props} className={cx('ds-content', readable && 'ds-readable', className)}>{children}</Tag>;
}
export function Section({ children, id, tone = 'dark', className, ...props }) {
  return <section {...props} id={id} className={cx('ds-section', `ds-section-${tone}`, className)}><ContentFrame>{children}</ContentFrame></section>;
}
export function SectionHeading({ children, accent, as: Tag = 'h2', recipe = 'process', align = 'center', className, ...props }) {
  return <Tag {...props} className={cx('ds-heading', `ds-heading-${recipe}`, `ds-align-${align}`, className)}>{children}{accent && <> <span>{accent}</span></>}</Tag>;
}
export function Surface({ children, as: Tag = 'article', tone = 'dark', className, ...props }) {
  return <Tag {...props} className={cx('ds-surface', `ds-surface-${tone}`, className)}>{children}</Tag>;
}
export function Action({ children, href, variant = 'primary', size = 'regular', disabled = false, loading = false, className, onClick, ...props }) {
  const unavailable = disabled || loading;
  const common = { ...props, className: cx('ds-action', `ds-action-${variant}`, `ds-action-${size}`, className), 'aria-busy': loading || undefined };
  const content = <>{loading && <LoaderCircle aria-hidden="true" className="ds-spinner" />}<span>{children}</span></>;
  if (href !== undefined) return <a {...common} href={unavailable ? undefined : href} role={unavailable ? 'link' : undefined} aria-disabled={unavailable || undefined} tabIndex={unavailable ? -1 : props.tabIndex} onClick={unavailable ? event => event.preventDefault() : onClick}>{content}</a>;
  return <button {...common} type={props.type || 'button'} disabled={unavailable} onClick={onClick}>{content}</button>;
}
export function IconControl({ label, direction, icon, tone = 'sea', size = 'regular', className, ...props }) {
  const Icon = direction === 'previous' ? ArrowLeft : direction === 'next' ? ArrowRight : X;
  return <button {...props} type="button" aria-label={label} className={cx('ds-icon-control', `ds-icon-${tone}`, `ds-icon-${size}`, className)}>{icon || <Icon aria-hidden="true" />}</button>;
}
export function Filter({ children, selected = false, className, ...props }) {
  return <button {...props} type="button" aria-pressed={selected} className={cx('ds-filter', className)}>{children}</button>;
}
const coordinate = (value, fallback) => value === undefined || value === null || !Number.isFinite(Number(value)) ? fallback : Number(value);
const crop = value => ({ x: Math.min(100, Math.max(0, coordinate(value?.x, 50))), y: Math.min(100, Math.max(0, coordinate(value?.y, 50))), scale: Math.min(2.5, Math.max(1, coordinate(value?.scale, 1))) });
export function FramedPhoto({ src, alt, ratio = '4 / 3', shape = 'rounded', slot, framing, mobileFraming, sizes = '100vw', priority = false, className, style, ...props }) {
  const fallback = { x: 50, y: 50, scale: 1 };
  const desktop = crop(framing || (slot && savedFraming[`section:${slot}|desktop`]) || fallback);
  const mobile = crop(mobileFraming || (slot && savedFraming[`section:${slot}|mobile`]) || framing || fallback);
  return <div {...props} data-ds-photo-slot={slot} className={cx('ds-photo', `ds-photo-${shape}`, className)} style={{ '--ds-photo-ratio': ratio, '--ds-photo-x': `${desktop.x}%`, '--ds-photo-y': `${desktop.y}%`, '--ds-photo-scale': desktop.scale, '--ds-photo-mobile-x': `${mobile.x}%`, '--ds-photo-mobile-y': `${mobile.y}%`, '--ds-photo-mobile-scale': mobile.scale, ...style }}>
    <Image src={src} alt={alt} fill sizes={sizes} unoptimized loading={priority ? 'eager' : 'lazy'} />
  </div>;
}
