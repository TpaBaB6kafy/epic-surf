"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { galleryPhotoSrc, galleryPhotoDetails } from "../../../data/gallery";
import { useGalleryFraming } from "./GalleryFraming";
import "./photo-gallery.css";
import { photoFramingStyle } from "./photoFramingStyle";

function Arrow({ next = false }) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d={next ? "M7 16h18M18 7l9 9-9 9" : "M25 16H7M14 7l-9 9 9 9"} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Photo({ photo, lang, alt, full = false, large = false, framing }) {
  const details = galleryPhotoDetails(photo, lang);
  const style = full ? undefined : photoFramingStyle(framing, { x: 50, y: details?.variants[1].height > details?.variants[1].width ? 25 : 50, scale: 1 });
  if (details) {
    const variants = full ? [details.variants[2]] : details.variants.slice(0, 2);
    const last = variants.at(-1);
    return <img src={last.src} srcSet={full ? undefined : variants.map(v => `${v.src} ${v.width}w`).join(", ")} sizes={large ? "(max-width: 699px) 90vw, 40vw" : "(max-width: 699px) 44vw, 27vw"} width={last.width} height={last.height} alt={details.alt} loading={full ? "eager" : "lazy"} decoding="async" style={style} draggable="false" />; // eslint-disable-line @next/next/no-img-element
  }
  return <Image src={galleryPhotoSrc(photo)} alt={alt} fill sizes={full ? "90vw" : large ? "50vw" : "30vw"} unoptimized={full} style={style} draggable={false} />;
}

function Lightbox({ photos, selection, lang, label, onClose }) {
  const dialog = useRef(null);
  const stage = useRef(null);
  const touch = useRef(null);
  const wheel = useRef({ total: 0, last: 0, locked: false });
  const closing = useRef(false);
  const [index, setIndex] = useState(selection.index);
  const isRu = lang === "ru";
  const details = galleryPhotoDetails(photos[index], lang);
  const size = details?.variants[2];
  const [legacyRatio, setLegacyRatio] = useState(selection.ratio);
  const ratio = size ? size.width / size.height : legacyRatio;
  const move = delta => setIndex(value => (value + delta + photos.length) % photos.length);
  useEffect(() => {
    if (size) return;
    const image = new window.Image();
    image.onload = () => setLegacyRatio(image.naturalWidth / image.naturalHeight);
    image.src = galleryPhotoSrc(photos[index]);
    return () => { image.onload = null; };
  }, [index, photos, size]);
  useEffect(() => {
    const el = dialog.current;
    const overflow = document.body.style.overflow;
    const opener = document.activeElement;
    document.body.style.overflow = "hidden";
    el.showModal();
    const target = stage.current.getBoundingClientRect();
    const origin = selection.rect;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.current.animate([
        { transform: `translate(${origin.x + origin.width / 2 - target.x - target.width / 2}px, ${origin.y + origin.height / 2 - target.y - target.height / 2}px) scale(${origin.width / target.width}, ${origin.height / target.height})`, opacity: .65, borderRadius: "40px" },
        { transform: "none", opacity: 1, borderRadius: "18px" },
      ], { duration: 380, easing: "cubic-bezier(.2,.8,.2,1)" });
    }
    return () => { el.close(); document.body.style.overflow = overflow; opener?.focus({ preventScroll: true }); };
  }, [selection]);
  async function close() {
    if (closing.current) return;
    closing.current = true;
    dialog.current.classList.add("is-closing");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const box = stage.current.getBoundingClientRect(), origin = selection.rect;
      const transform = index === selection.index ? `translate(${origin.x + origin.width / 2 - box.x - box.width / 2}px, ${origin.y + origin.height / 2 - box.y - box.height / 2}px) scale(${origin.width / box.width}, ${origin.height / box.height})` : "scale(.94)";
      await stage.current.animate([{ transform: "none", opacity: 1 }, { transform, opacity: 0 }], { duration: 260, easing: "ease-in", fill: "forwards" }).finished.catch(() => {});
    }
    onClose();
  }
  return createPortal(<dialog ref={dialog} className="epic-photo-dialog" aria-label={isRu ? "Просмотр фотографий" : "Photo viewer"} onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === e.currentTarget) close(); }} onKeyDown={e => {
    if (e.key === "Tab") {
      const buttons = [...dialog.current.querySelectorAll("button")].filter(el => el.getClientRects().length);
      const first = buttons[0], last = buttons.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); move(e.key === "ArrowRight" ? 1 : -1); }
  }} onWheel={e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || e.ctrlKey) return;
    const now = performance.now(), gesture = wheel.current;
    if (now - gesture.last > 180) { gesture.total = 0; gesture.locked = false; }
    gesture.last = now;
    gesture.total += e.deltaX * (e.deltaMode === 1 ? 16 : 1);
    if (!gesture.locked && Math.abs(gesture.total) > 65) { move(gesture.total > 0 ? 1 : -1); gesture.locked = true; }
  }}>
    <span className="sr-only" aria-live="polite">{galleryPhotoDetails(photos[index], lang)?.alt || label}</span>
    <div ref={stage} className="epic-photo-stage" style={{ "--photo-ratio": ratio || 1.5 }} onTouchStart={e => { touch.current = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null; }} onTouchCancel={() => { touch.current = null; }} onTouchEnd={e => {
      if (!touch.current) return;
      const dx = e.changedTouches[0].clientX - touch.current.x, dy = e.changedTouches[0].clientY - touch.current.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
      touch.current = null;
    }}>
      <div className="epic-photo-full" key={index} style={{ backgroundImage: `url("${details?.variants[1].src || galleryPhotoSrc(photos[index])}")` }}><Photo photo={photos[index]} lang={lang} alt={label} full /></div>
      <button autoFocus className="epic-photo-close" type="button" onClick={close} aria-label={isRu ? "Закрыть фото" : "Close photo"}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg></button>
      <button className="epic-photo-arrow epic-photo-prev" type="button" onClick={() => move(-1)} aria-label={isRu ? "Предыдущее фото" : "Previous photo"}><Arrow /></button>
      <button className="epic-photo-arrow epic-photo-next" type="button" onClick={() => move(1)} aria-label={isRu ? "Следующее фото" : "Next photo"}><Arrow next /></button>
    </div>
  </dialog>, document.body);
}

function Album({ group, lang, editor }) {
  const viewport = useRef(null);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);
  const isRu = lang === "ru";
  const count = Math.ceil(group.photos.length / 5);
  function pageWidth(el) { return el.clientWidth + parseFloat(getComputedStyle(el).columnGap || 0); }
  function go(next) {
    const el = viewport.current, target = Math.max(0, Math.min(count - 1, next));
    el.scrollTo({ left: target * pageWidth(el), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  function endDrag(e) {
    const state = drag.current;
    if (!state || e.pointerId !== state.id) return;
    drag.current = null;
    const el = viewport.current;
    el.classList.remove("is-dragging");
    if (state.moved) {
      suppressClick.current = true;
      const distance = e.clientX - state.x;
      go(state.page + (Math.abs(distance) > 55 ? (distance < 0 ? 1 : -1) : 0));
      window.setTimeout(() => { suppressClick.current = false; }, 0);
    }
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  }
  useEffect(() => {
    const el = viewport.current;
    const resize = new ResizeObserver(() => el.scrollTo({ left: Number(el.dataset.page || 0) * pageWidth(el), behavior: "instant" }));
    resize.observe(el);
    return () => resize.disconnect();
  }, []);
  return <div className="epic-album">
    <div ref={viewport} className="epic-gallery-viewport" data-page={page} role="region" aria-roledescription={isRu ? "карусель" : "carousel"} aria-label={group.label} tabIndex={0} onScroll={e => {
      const el = e.currentTarget;
      setPage(Math.max(0, Math.min(count - 1, Math.round(el.scrollLeft / pageWidth(el)))));
    }} onKeyDown={e => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); go(page + (e.key === "ArrowRight" ? 1 : -1)); }
    }} onPointerDown={e => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      suppressClick.current = false;
      drag.current = { id: e.pointerId, x: e.clientX, scroll: e.currentTarget.scrollLeft, page, moved: false };
    }} onPointerMove={e => {
      const state = drag.current;
      if (!state || e.pointerId !== state.id) return;
      const dx = e.clientX - state.x;
      if (!state.moved && Math.abs(dx) < 7) return;
      state.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.classList.add("is-dragging");
      e.currentTarget.scrollLeft = state.scroll - dx;
    }} onPointerUp={endDrag} onPointerCancel={endDrag} onClickCapture={e => { if (suppressClick.current) { e.preventDefault(); e.stopPropagation(); } }}>
      {Array.from({ length: count }, (_, p) => <div className="epic-gallery-page" key={p} inert={p !== page} aria-hidden={p !== page}>
        {group.photos.slice(p * 5, p * 5 + 5).map((photo, i) => <button className="v5-gallery-tile epic-gallery-tile" type="button" key={galleryPhotoSrc(photo)} aria-label={`${isRu ? "Открыть фото" : "Open photo"} ${p * 5 + i + 1} — ${group.label}`} onClick={e => {
          if (editor.enabled) { editor.select(photo, i === 0); return; }
          const img = e.currentTarget.querySelector('img');
          setSelected({ index: p * 5 + i, rect: e.currentTarget.getBoundingClientRect().toJSON(), ratio: img?.naturalWidth / img?.naturalHeight || 1.5 });
        }}>
          {Math.abs(p - page) <= 1 && <Photo photo={photo} lang={lang} alt={`${group.label} — ${p * 5 + i + 1}`} large={i === 0} framing={editor.get(photo, i === 0)} />}
        </button>)}
      </div>)}
    </div>
    {selected !== null && <Lightbox photos={group.photos} selection={selected} lang={lang} label={group.label} onClose={() => setSelected(null)} />}
  </div>;
}

export default function PhotoGallery({ lang, eventGalleryGroups, activeGalleryKey, setActiveGalleryKey, activeGalleryGroup }) {
  const editor = useGalleryFraming();
  return <div data-home-v5-gallery data-lang={lang} className="epic-photo-gallery">
    <h2 className="sr-only">{lang === "ru" ? "Фотографии EPIC" : "EPIC photo gallery"}</h2>
    <div role="group" aria-label={lang === "ru" ? "Альбомы" : "Photo albums"}>
      {eventGalleryGroups.map(group => <button key={group.key} type="button" className="v5-gallery-filter" aria-pressed={activeGalleryKey === group.key} onClick={() => setActiveGalleryKey(group.key)}>{group.label}</button>)}
    </div>
    <Album key={activeGalleryKey} group={activeGalleryGroup} lang={lang} editor={editor} />
  </div>;
}
