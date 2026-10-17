"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { MotionConfig } from "framer-motion";
import LandingShell from "./landing-v5/LandingShell";
import RentalModal from "./RentalModal";
import { Action, ContentFrame, IconControl, PageFrame } from "./design-system/primitives";
import { Dialog, FAQItem } from "./design-system/interactive";
import RentalLiveCam from "./rental-v5/RentalLiveCam";
import RentalBoardInformation from "./rental-v5/RentalBoardInformation";
import RentalLocationMap from "./rental-v5/RentalLocationMap";
import { links } from "../data/links";
import { translations } from "../data/translations";
import { getBoardTrackingPayload, getBoardTypeLabel, getLocalizedBoard, rentalBoards } from "../data/rentalBoards";
import { adjustmentStyle, boardWithAssets, buildPageContent, defaultImageAdjustment, getImageAdjustment, imageAdjustmentStorageKey, localeUi, normalizeImageAdjustments, referencePrice, rentalMessage, rotationOptions, tunerControls } from "../data/rentalPage";
import { buildTelegramUrl, buildWhatsAppUrl, buildZaloUrl, storeAttributionFromUrl, trackEvent } from "../utils/tracking";
import "./rental-v5/rental-v5.css";

const views = ["front", "back", "fins"];
const builders = { whatsapp: buildWhatsAppUrl, telegram: buildTelegramUrl, zalo: buildZaloUrl };
const relatedPages = [
  ["surf-lessons-danang", "Surf Lessons", "Уроки серфинга", "Beginner-friendly coaching near My Khe Beach.", "Занятия с инструктором у пляжа Микхе."],
  ["surfing-danang", "Surfing in Da Nang", "Серфинг в Дананге", "Where to surf, when to go, and how it works.", "Где кататься, когда приезжать и как всё устроено."],
  ["my-khe-beach-surfing", "My Khe Beach Surfing", "Серфинг на Микхе", "Waves, local conditions, and the beach.", "Волны, местные условия и пляж."],
  ["surf-guide", "Surf Guide", "Гид по серфингу", "Equipment, tips, safety, waves, and local know-how.", "Оборудование, техника, безопасность и волны."],
];
const relatedPhotos = ["/design/home-v5/how-it-works/practice-photo.webp", "/video/hero/desktop-poster.webp", "/design/rental-redesign/pickup/rental-pickup-my-khe-source.jpg", "/design/home-v5/how-it-works/review-tips-camera.webp"];
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function RentalDesignTestPage({ locale = "en", pageContent = null }) {
  const lang = locale === "ru" ? "ru" : "en", ru = lang === "ru";
  const t = translations[lang], ui = localeUi[lang];
  const content = useMemo(() => buildPageContent(lang, pageContent), [lang, pageContent]);
  const boards = useMemo(() => rentalBoards.map((board, index) => boardWithAssets(getLocalizedBoard(board, lang), index)), [lang]);
  const [activeBoardId, setActiveBoardId] = useState(() => (boards.find(board => board.recommended) || boards[0]).id);
  const [isRentalModalOpen, setRentalModalOpen] = useState(false);
  const [lightboxAsset, setLightboxAsset] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [imageAdjustments, setImageAdjustments] = useState({});
  const [tunerSlot, setTunerSlot] = useState("front");
  const [copyStatus, setCopyStatus] = useState("Copy config");
  const [catalogActive, setCatalogActive] = useState(false);
  const catalogRef = useRef(null);
  const stripRef = useRef(null), swipeRef = useRef(null), lightboxSwipe = useRef(null), suppressPhotoClick = useRef(0);
  const filteredBoards = boards;
  const activeBoard = boards.find(board => board.id === activeBoardId) || boards[0];
  const activeIndex = filteredBoards.findIndex(board => board.id === activeBoard.id);
  const boardName = activeBoard.displayName || activeBoard.name;
  const languageHref = ru ? "/surfboard-rental-danang" : "/ru/surfboard-rental-danang";
  const lessonHref = ru ? "/ru#lessons" : "/surf-lessons-danang";
  const lessonText = content.infoCards.find(item => item.title === "Когда лучше взять урок" || item.title === "Take a lesson")?.text;
  const pickupText = content.infoCards.find(item => item.title === "Получение доски" || item.title === "Pickup & location")?.text;
  const viewLabel = slot => activeBoard.imageLabels?.[slot] || (ru ? { front: "Верх доски", back: "Низ доски", fins: "Плавники" } : { front: "Deck", back: "Underside", fins: "Fins" })[slot];

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setCatalogActive(entry.isIntersecting), { rootMargin: "-64px 0px 0px" });
    if (catalogRef.current) observer.observe(catalogRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    storeAttributionFromUrl({ includePartner: true });
    trackEvent("page_view", { language: lang, page_type: "rental_page", page_slug: ru ? "/ru/surfboard-rental-danang" : "/surfboard-rental-danang" });
    const frame = requestAnimationFrame(() => {
      setEditMode(new URLSearchParams(window.location.search).get("edit") === "1");
      try { const saved = localStorage.getItem(imageAdjustmentStorageKey); if (saved) setImageAdjustments(normalizeImageAdjustments(JSON.parse(saved))); } catch { /* Public gallery works without draft storage. */ }
    });
    return () => cancelAnimationFrame(frame);
  }, [lang, ru]);
  useEffect(() => { if (editMode) { try { localStorage.setItem(imageAdjustmentStorageKey, JSON.stringify(imageAdjustments)); } catch { /* Tuning remains usable without persistence. */ } } }, [editMode, imageAdjustments]);
  useEffect(() => {
    const listener = event => { if (event.key === imageAdjustmentStorageKey) { try { setImageAdjustments(normalizeImageAdjustments(JSON.parse(event.newValue || "{}"))); } catch { setImageAdjustments({}); } } };
    window.addEventListener("storage", listener); return () => window.removeEventListener("storage", listener);
  }, []);
  useEffect(() => {
    const strip = stripRef.current, selected = strip?.querySelector(`[data-board-id="${activeBoardId}"]`);
    // Keep the selected thumbnail visible without scrolling the whole page.
    if (selected) strip.scrollTo({ left: selected.offsetLeft - (strip.clientWidth - selected.offsetWidth) / 2, behavior: reducedMotion() ? "instant" : "smooth" });
  }, [activeBoardId]);

  const selectBoard = useCallback((id, method = "thumbnail") => {
    if (method === "thumbnail") suppressPhotoClick.current = 0;
    setActiveBoardId(id); setLightboxAsset(null);
    trackEvent("rental_board_select", { language: lang, service_type: "board_rental", cta_location: "rental_catalog", cta_label: method, ...getBoardTrackingPayload(boards.find(board => board.id === id)) });
  }, [boards, lang]);
  const moveBoard = direction => { if (filteredBoards.length > 1) selectBoard(filteredBoards[(activeIndex + direction + filteredBoards.length) % filteredBoards.length].id, "swipe_or_arrow"); };
  const onSwipeStart = event => { if (event.pointerType === "touch" && window.matchMedia("(max-width: 1199px)").matches) swipeRef.current = { x: event.clientX, y: event.clientY }; };
  const onSwipeMove = event => { const start = swipeRef.current; if (start && Math.abs(event.clientX - start.x) > 22 && Math.abs(event.clientX - start.x) > Math.abs(event.clientY - start.y) * 1.4) suppressPhotoClick.current = event.timeStamp + 700; };
  const onSwipeEnd = event => {
    const start = swipeRef.current; swipeRef.current = null; if (!start) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.4) { suppressPhotoClick.current = event.timeStamp + 700; moveBoard(dx < 0 ? 1 : -1); }
  };
  const openPhoto = (slot, event) => { if (event.timeStamp >= suppressPhotoClick.current) setLightboxAsset(slot); };
  const moveView = direction => setLightboxAsset(views[(views.indexOf(lightboxAsset) + direction + views.length) % views.length]);
  const openRental = location => { trackEvent("rental_cta_click", { language: lang, service_type: "board_rental", cta_location: location, cta_label: activeBoard.id, ...getBoardTrackingPayload(activeBoard) }); setRentalModalOpen(true); };
  const messageLink = (event, channel, location) => {
    event.currentTarget.href = builders[channel](links[channel], rentalMessage(activeBoard, lang, content.contactMessage), { language: lang });
    trackEvent(channel + "_click", { language: lang, service_type: "board_rental", cta_location: location, cta_label: channel, ...getBoardTrackingPayload(activeBoard) });
  };
  const updateAdjustment = (key, value) => setImageAdjustments(current => ({ ...current, [activeBoard.id]: { ...current[activeBoard.id], [tunerSlot]: { ...getImageAdjustment(current, activeBoard.id, tunerSlot), [key]: Number(value) } } }));
  const copyConfig = async () => { try { await navigator.clipboard.writeText(JSON.stringify(normalizeImageAdjustments(imageAdjustments), null, 2)); setCopyStatus("Copied"); } catch { setCopyStatus("Copy failed"); } };

  return <MotionConfig reducedMotion="user"><PageFrame locale={lang} className="rental-v5" data-catalog-active={catalogActive} style={{ "--ds-page-gutter": "clamp(20px,6.15vw,24px)" }}><LandingShell locale={lang} languageHref={languageHref} shellCopy={{ ...t, btnBook: ru ? "Написать" : "Message" }} className="rental-v5-shell" footerCollapsible footerServiceType="board_rental" openBookingModal={() => openRental("header")}>
    <a className="rv-skip-link" href="#rental-content">{ru ? "К содержимому" : "Skip to content"}</a>
    <main id="rental-content">
      <section className="rv-hero" data-section="rental-design-hero" aria-labelledby="rental-title">
        <picture className="rv-hero-picture">
          <source media="(min-width: 1800px)" srcSet="/design/rental-v5/rental-hero-wide-v3.webp" />
          <Image src="/design/rental-v5/rental-hero-art.webp" alt="" fill loading="eager" fetchPriority="high" unoptimized sizes="100vw" className="rv-hero-art" />
        </picture>
        <ContentFrame className="rv-hero-frame"><h1 id="rental-title" aria-label={content.heroTitle}>{ru ? <>Аренда досок<br />в Дананге</> : <>Surfboard rental<br />in Da Nang</>}</h1><p className="rv-hero-price">{ui.from} <strong>250.000 <span>VND</span></strong> / {ui.priceUnit}</p><div className="rv-hero-actions"><Action href="#rental-catalog">{ru ? "Выбрать доску" : "Choose a board"}<ArrowDown size={18} aria-hidden="true" /></Action><Action variant="secondary" href={links.whatsapp} target="_blank" rel="noopener noreferrer" onClick={event => messageLink(event, "whatsapp", "rental_hero")}>{ru ? "Спросить в WhatsApp" : "Ask on WhatsApp"}</Action></div></ContentFrame>
      </section>
      <div className="rv-sand">
        <section id="rental-catalog" className="rv-catalog rv-section" data-section="rental-board-showroom"><ContentFrame>
          <div className="rv-catalog-heading"><div><h2>{ru ? "Найди свою доску" : "Find your board"}</h2><p>{ru ? "Выбери модель в ленте. Рассмотри её со всех сторон." : "Choose a model below. Explore it from every angle."}</p></div></div>
          <div ref={catalogRef} className="rv-board-layout" data-active-board={activeBoard.id}>
            <div className="rv-mobile-board-title" aria-live="polite" aria-atomic="true"><span>{getBoardTypeLabel(activeBoard.type, lang)}</span><h3>{boardName}</h3></div>
            <div className="rv-gallery" data-role="rental-gallery" onPointerDown={onSwipeStart} onPointerMove={onSwipeMove} onPointerUp={onSwipeEnd} onPointerCancel={() => { swipeRef.current = null; }}>
              {views.map(slot => <button type="button" key={slot} className={`rv-photo rv-photo-${slot}`} onClick={event => openPhoto(slot, event)} aria-label={`${ru ? "Увеличить" : "Enlarge"}: ${viewLabel(slot)}`}><Image src={activeBoard.processedImages[slot]} alt={`${boardName} — ${viewLabel(slot)}`} fill unoptimized sizes={slot === "front" ? "(max-width: 699px) 90vw, (max-width: 1199px) 57vw, 37vw" : "(max-width: 699px) 43vw, 21vw"} style={adjustmentStyle(imageAdjustments, activeBoard.id, slot)} /></button>)}
            </div>
            <div className="rv-board-copy" data-section="rental-board-specs"><RentalBoardInformation boards={boards} activeId={activeBoard.id} lang={lang} ui={ui} /><p className="rv-board-price" aria-live="polite"><strong>{referencePrice(activeBoard.price)}</strong> <span>{activeBoard.price.currency}</span></p><p className="rv-duration">{ru ? "за" : "for"} {ui.priceUnit}</p><Action onClick={() => openRental("rental_page_showroom")}>{ui.rentCta}</Action><p className="rv-availability">{ru ? "Наличие доски и подходящие условия подтвердим в мессенджере." : "Message us to confirm board availability and suitable conditions."}</p></div>
            <div className="rv-board-selector" data-section="rental-board-strip"><p className="rv-swipe-hint"><MoveHorizontal size={19} aria-hidden="true" />{ru ? "Листай фото, чтобы выбрать доску" : "Swipe the photos to choose a board"}</p><IconControl tone="graphite" className="rv-board-arrow rv-board-prev" label={ru ? "Предыдущая доска" : "Previous board"} icon={<ChevronLeft />} onClick={() => moveBoard(-1)} disabled={filteredBoards.length < 2} /><div ref={stripRef} className="rv-board-rail" aria-label={ui.otherBoards}>{filteredBoards.map(board => <button type="button" data-board-id={board.id} aria-pressed={board.id === activeBoard.id} aria-label={board.displayName || board.name} onClick={() => selectBoard(board.id)} key={board.id} className="rv-board-thumb"><Image src={board.processedImages.thumb} alt="" fill unoptimized sizes="(max-width: 699px) 80px, 20vw" style={adjustmentStyle(imageAdjustments, board.id, "thumb")} /><span>{board.displayName || board.name}</span></button>)}</div><IconControl tone="graphite" className="rv-board-arrow rv-board-next" label={ru ? "Следующая доска" : "Next board"} icon={<ChevronRight />} onClick={() => moveBoard(1)} disabled={filteredBoards.length < 2} /></div>
            <div className="rv-mobile-booking"><div><p className="rv-mobile-price" aria-live="polite"><strong>{referencePrice(activeBoard.price)}</strong> <span>{activeBoard.price.currency}</span></p><p>{ru ? "за" : "for"} {ui.priceUnit}</p></div><Action onClick={() => openRental("rental_mobile_catalog")}>{ui.rentCta}</Action></div>
          </div>
        </ContentFrame></section>
        <section className="rv-section rv-process" data-section="rental-process"><ContentFrame><h2>{ru ? "Как взять доску в аренду" : "How rental works"}</h2><ol>{ui.processSteps.map(([title, description], index) => <li key={title}><span className="rv-step-number">{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></li>)}</ol></ContentFrame></section>
        <section className="rv-section rv-comparison" data-section="rental-comparison">
          <ContentFrame className="rv-comparison-frame"><h2>{ui.comparisonTitle}</h2><div className="rv-choice-grid"><article><h3>{ui.rentHeading}</h3><ul>{ui.rentCriteria.map(item => <li key={item}>{item}</li>)}</ul></article><article><h3>{ui.lessonHeading}</h3><p>{lessonText}</p><Action variant="secondary" href={lessonHref}>{ui.lessonCta}<ArrowRight size={18} aria-hidden="true" /></Action></article></div><RentalLocationMap lang={lang} /></ContentFrame>
        </section>
        <section className="rv-section rv-pickup" data-section="rental-pickup"><ContentFrame><div className="rv-pickup-grid">
          <div className="rv-pickup-photo"><Image src="/design/rental-redesign/pickup/rental-pickup-my-khe-source.jpg" alt={ru ? "Пляж Микхе в Дананге" : "My Khe Beach in Da Nang"} fill unoptimized sizes="(max-width: 699px) 90vw, 44vw" /></div>
          <div className="rv-pickup-copy"><h2>{ru ? "Встретимся на Микхе" : "Meet us at My Khe"}</h2><p>{pickupText || (ru ? "Точку получения и возврата подтвердим в мессенджере." : "Confirm the pickup and return point by message.")}</p><Action variant="secondary" href={links.whatsapp} target="_blank" rel="noopener noreferrer" onClick={event => messageLink(event, "whatsapp", "ask_about_conditions")}>{ui.conditionsCta}<ArrowRight size={18} aria-hidden="true" /></Action><div className="rv-spot-camera"><h3>{ru ? "Перед выходом в воду" : "Before you paddle out"}</h3><p>{ru ? "Посмотри волны и уточни у нас, подходят ли условия твоему уровню." : "Check the waves, then ask us whether the conditions suit your level."}</p><RentalLiveCam lang={lang} /></div></div>
        </div></ContentFrame></section>
        <section className="rv-section rv-faq" data-section="rental-faq"><ContentFrame><h2>{ui.faqTitle}</h2><div className="rv-faq-grid">{content.faqItems.map(([question, answer]) => <FAQItem question={question} key={question}><p>{answer}</p></FAQItem>)}</div></ContentFrame></section>
        <section className="rv-section rv-related" data-section="rental-related"><ContentFrame><h2>{ui.relatedTitle}</h2><div className="rv-related-list">{relatedPages.map(([slug, enTitle, ruTitle, enText, ruText], index) => <Link href={`${ru ? "/ru" : ""}/${slug}`} key={slug}><span className="rv-related-photo"><Image src={relatedPhotos[index]} alt="" fill unoptimized sizes={index === 0 ? "(max-width: 699px) 90vw, 38vw" : "104px"} /></span><span><strong>{ru ? ruTitle : enTitle}</strong><span>{ru ? ruText : enText}</span></span><ArrowRight size={24} aria-hidden="true" /></Link>)}</div></ContentFrame></section>
      </div>
      <section className="rv-final rv-section" data-section="rental-final-cta"><ContentFrame><div className="rv-final-grid"><div><h2>{ru ? "Пора на волну?" : "Ready for your next wave?"}</h2><p>{ru ? "Выбери доску — договоримся о времени." : "Choose your board. Let’s arrange your session."}</p></div><div className="rv-final-actions">{["whatsapp", "telegram", "zalo"].map((channel, index) => <Action key={channel} variant={index ? "secondary" : "primary"} href={links[channel]} target="_blank" rel="noopener noreferrer" onClick={event => messageLink(event, channel, "rental_final_cta")}>{channel === "whatsapp" ? "WhatsApp" : channel === "telegram" ? "Telegram" : "Zalo"}</Action>)}<Action variant="secondary" href="tel:+84905012198">{ui.call}</Action></div></div></ContentFrame></section>
    </main>
    <Dialog open={Boolean(lightboxAsset)} onClose={() => setLightboxAsset(null)} title={boardName} closeLabel={ru ? "Закрыть галерею" : "Close gallery"} className="rv-lightbox"><div className="rv-lightbox-stage" tabIndex={0} data-autofocus onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); moveView(event.key === "ArrowLeft" ? -1 : 1); } }} onPointerDown={event => { if (event.pointerType === "touch") lightboxSwipe.current = { x: event.clientX, y: event.clientY }; }} onPointerUp={event => { const start = lightboxSwipe.current; lightboxSwipe.current = null; if (start && Math.abs(event.clientX - start.x) > 50 && Math.abs(event.clientX - start.x) > Math.abs(event.clientY - start.y) * 1.4) moveView(event.clientX < start.x ? 1 : -1); }}><Image src={activeBoard.processedImages[`${lightboxAsset || "front"}-full`]} alt={`${boardName} — ${viewLabel(lightboxAsset || "front")}`} fill unoptimized sizes="100vw" /><IconControl className="rv-lightbox-arrow" label={ru ? "Предыдущее фото" : "Previous photo"} icon={<ChevronLeft />} onClick={() => moveView(-1)} /><IconControl className="rv-lightbox-arrow" label={ru ? "Следующее фото" : "Next photo"} icon={<ChevronRight />} onClick={() => moveView(1)} /></div><div className="rv-lightbox-views">{views.map(slot => <button key={slot} type="button" aria-pressed={lightboxAsset === slot} onClick={() => setLightboxAsset(slot)}>{viewLabel(slot)}</button>)}</div></Dialog>
    <RentalModal isRentalModalOpen={isRentalModalOpen} setRentalModalOpen={setRentalModalOpen} t={t} links={links} selectedBoard={activeBoard} />
    {editMode && <aside className="rv-tuner" data-section="rental-image-tuner"><strong>Image tuner · {activeBoard.id}</strong><div className="rv-tuner-slots">{[...views, "thumb"].map(slot => <button key={slot} type="button" aria-pressed={tunerSlot === slot} onClick={() => setTunerSlot(slot)}>{slot}</button>)}</div>{tunerControls.map(({key,label,min,max,step}) => <label key={key}>{label}: {getImageAdjustment(imageAdjustments, activeBoard.id, tunerSlot)[key]}<input type="range" min={min} max={max} step={step} value={getImageAdjustment(imageAdjustments, activeBoard.id, tunerSlot)[key]} onChange={event => updateAdjustment(key, event.target.value)} /></label>)}<div className="rv-tuner-slots">{rotationOptions.map(angle => <button type="button" key={angle} onClick={() => updateAdjustment("rotate", angle)}>{angle}°</button>)}</div><button type="button" onClick={() => setImageAdjustments(current => ({ ...current, [activeBoard.id]: { ...current[activeBoard.id], [tunerSlot]: defaultImageAdjustment } }))}>Reset current</button><button type="button" onClick={() => setImageAdjustments({})}>Reset all</button><button type="button" onClick={copyConfig}>{copyStatus}</button></aside>}
  </LandingShell></PageFrame></MotionConfig>;
}
