"use client";
import Image from 'next/image';
import { useGalleryFraming } from './GalleryFraming';
import { photoFramingStyle } from './photoFramingStyle';

// The frame keeps its layout/mask; only the inner image is moved and enlarged.
export default function EditablePhoto({ slot, label, src, alt = '', fallback = { x:50, y:50, scale:1 }, sizes, unoptimized, imageProps, className = '', ...frameProps }) {
  const editor = useGalleryFraming();
  const select = () => editor.selectSlot(slot, src, label, fallback);
  return <div {...frameProps} className={`epic-editable-photo ${className}`} data-photo-slot={slot} data-photo-editing={editor.enabled || undefined} data-photo-selected={editor.enabled && editor.selection?.slot === slot || undefined} role={editor.enabled ? 'button' : undefined} aria-label={editor.enabled ? `Кадрировать: ${label}` : undefined} tabIndex={editor.enabled ? 0 : undefined} onClick={editor.enabled ? select : undefined} onKeyDown={editor.enabled ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); } } : undefined}>
    <Image {...imageProps} src={src} alt={alt} fill sizes={sizes} unoptimized={unoptimized} draggable={false} style={photoFramingStyle(editor.getSlot(slot), fallback)} />
  </div>;
}
