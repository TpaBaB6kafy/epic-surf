"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import savedFraming from "../../../data/gallery-framing.json";
import { galleryPhotoDetails, galleryPhotoSrc } from "../../../data/gallery";
const storageKey = "epic_gallery_framing_draft";
const clamp = (n, min, max, fallback) => Number.isFinite(Number(n)) ? Math.max(min, Math.min(max, Number(n))) : fallback;
function normalize(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return {};
  return Object.fromEntries(Object.entries(data).filter(([key, value]) => (key.startsWith('/gallery/') || key.startsWith('section:')) && value && typeof value === 'object').map(([key, value]) => [key, { x: clamp(value.x, 0, 100, 50), y: clamp(value.y, 0, 100, 50), scale: clamp(value.scale, 1, 2.5, 1) }]));
}
const FramingContext = createContext(null);
export const useGalleryFraming = () => useContext(FramingContext);

function useFramingState() {
  const [enabled, setEnabled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [draft, setDraft] = useState({});
  const [selection, setSelection] = useState(null);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const media = window.matchMedia('(max-width: 699px)');
    const load = () => { try { setDraft(normalize(JSON.parse(localStorage.getItem(storageKey) || '{}'))); } catch { setNotice('Черновик недоступен. Изменения можно выгрузить в JSON.'); } };
    const frame = requestAnimationFrame(() => { setEnabled(new URLSearchParams(location.search).get('edit') === '1'); setMobile(media.matches); load(); });
    const resize = () => setMobile(media.matches);
    const sync = e => { if (e.key === storageKey) load(); };
    media.addEventListener('change', resize); window.addEventListener('storage', sync);
    return () => { cancelAnimationFrame(frame); media.removeEventListener('change', resize); window.removeEventListener('storage', sync); };
  }, []);
  const keyFor = (photo, large) => `${galleryPhotoSrc(photo)}|${mobile ? 'mobile' : 'desktop'}|${large ? 'large' : 'small'}`;
  const get = (photo, large) => draft[keyFor(photo, large)] || savedFraming[keyFor(photo, large)];
  const slotKey = slot => `section:${slot}|${mobile ? "mobile" : "desktop"}`;
  const getSlot = slot => draft[slotKey(slot)] || savedFraming[slotKey(slot)];
  const details = selection && galleryPhotoDetails(selection.photo, 'ru');
  const fallback = selection?.fallback || { x:50, y: details?.variants[1].height > details?.variants[1].width ? 25 : 50, scale:1 };
  const value = selection ? (selection.slot ? getSlot(selection.slot) : get(selection.photo, selection.large)) || fallback : fallback;
  function update(patch) {
    if (!selection) return;
    const next = { ...draft, [selection.slot ? slotKey(selection.slot) : keyFor(selection.photo, selection.large)]: { ...value, ...patch } };
    setDraft(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setNotice('Черновик сохранён в этом браузере.'); } catch { setNotice('Сохранение в браузере недоступно — скачайте JSON.'); }
  }
  const config = () => JSON.stringify({ ...savedFraming, ...draft }, null, 2);
  async function copy() { try { await navigator.clipboard.writeText(config()); setNotice('Настройки скопированы. Передайте их для сохранения в проекте.'); } catch { setNotice('Не удалось скопировать. Используйте «Скачать JSON».'); } }
  function download() {
    const url = URL.createObjectURL(new Blob([config()], { type:'application/json' }));
    const link = document.createElement('a'); link.href=url; link.download='gallery-framing.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return { enabled, mobile, selection, value, notice, get, getSlot, selectSlot: (slot, photo, label, fallback) => setSelection({slot,photo,label,fallback}), update, copy, download, reset: () => update(fallback), select: (photo, large) => setSelection({photo,large}) };
}
export function PhotoFramingProvider({ children }) {
  const editor = useFramingState();
  return <FramingContext.Provider value={editor}>{children}{editor.enabled && createPortal(<GalleryFraming editor={editor} />, document.body)}</FramingContext.Provider>;
}

export default function GalleryFraming({ editor }) {
  const { selection, value } = editor;
  return <aside className="epic-gallery-tuner" aria-label="Кадрирование фотографий">
    <strong>Кадрирование фото</strong>
    <p>{selection ? `${editor.mobile ? 'Телефон' : 'Десктоп'} · ${selection.label || (selection.large ? 'большая рамка галереи' : 'малая рамка галереи')}` : 'Нажмите на фото в галерее, эвентах, шагах или уроках.'}</p>
    {selection && <>
      <p>Для движения по обеим осям увеличьте масштаб выше 1×.</p>
      <p className="epic-tuner-filename">{galleryPhotoSrc(selection.photo).split('/').at(-1)}</p>
      {[['x','По горизонтали',0,100,1],['y','По вертикали',0,100,1],['scale','Масштаб',1,2.5,.05]].map(([key,label,min,max,step]) => <label key={key}>{label} <output>{value[key]}</output><input aria-label={label} type="range" min={min} max={max} step={step} value={value[key]} onChange={e=>editor.update({[key]:Number(e.target.value)})} /></label>)}
      <div className="epic-tuner-nudge"><button type="button" aria-label="Сместить кадр влево" onClick={()=>editor.update({x:Math.max(0,value.x-2)})}>←</button><button type="button" aria-label="Сместить кадр вверх" onClick={()=>editor.update({y:Math.max(0,value.y-2)})}>↑</button><button type="button" aria-label="Сместить кадр вниз" onClick={()=>editor.update({y:Math.min(100,value.y+2)})}>↓</button><button type="button" aria-label="Сместить кадр вправо" onClick={()=>editor.update({x:Math.min(100,value.x+2)})}>→</button><button type="button" onClick={editor.reset}>Сброс</button></div>
    </>}
    <div className="epic-tuner-export"><button type="button" onClick={editor.copy}>Copy config</button><button type="button" onClick={editor.download}>Скачать JSON</button></div>
    <p role="status">{editor.notice || 'Настройки видны только в этом браузере. Для переноса в проект — Copy config или JSON.'}</p>
  </aside>;
}
