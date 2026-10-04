import EditablePhoto from "./EditablePhoto";
import Image from "next/image";

const root = "/design/home-v5/faq-events-gallery";
const unit = (n) => `${n / 14.4}cqw`;
const box = (x, y, w, h) => ({ left: unit(x), top: unit(y), width: unit(w), height: unit(h) });
function Art({ file, x, y, width, height, className = "" }) {
  return <Image alt="" aria-hidden="true" src={`${root}/${file}`} width={width} height={height} unoptimized className={`v5-feg-art ${className}`} style={box(x, y, width, height)} />;
}

const controls = ["control-surface-2142-33.svg", "control-surface-2142-26.svg", "control-surface-2142-19.svg", "control-surface.svg"];
const plusIcons = ["plus-icon-2142-30.svg", "plus-icon-2142-23.svg", "plus-icon-2142-16.svg", "plus-icon.svg"];

export function HomeV5FAQ({ lang, items, openFaq, setOpenFaq }) {
  return <div data-home-v5-faq data-lang={lang}>
    <Art file="faq-texture.webp" x={0} y={0} width={1440} height={619} className="v5-faq-texture" />
    <Art file="reviews-transition.webp" x={0} y={0} width={1440} height={166} />
    <h2 className="v5-faq-heading">FAQ</h2>
    <div className="v5-faq-items">
      {items.map((item, index) => {
        const open = openFaq === index;
        const answerId = `home-v5-faq-answer-${index}`;
        return <div className="v5-faq-item" key={item.q}>
          <button id={`home-v5-faq-question-${index}`} type="button" aria-expanded={open} aria-controls={answerId} onClick={() => setOpenFaq(open ? null : index)}>
            <span>{item.q}</span>
            <span className="v5-faq-control" aria-hidden="true">
              <Image src={`${root}/svg/${controls[index]}`} width={49} height={index % 2 ? 61 : 62} alt="" unoptimized />
              <Image className={`v5-faq-plus ${open ? "v5-faq-plus-open" : ""}`} src={`${root}/svg/${plusIcons[index]}`} width={22} height={22} alt="" unoptimized />
            </span>
          </button>
          <div id={answerId} role="region" aria-labelledby={`home-v5-faq-question-${index}`} hidden={!open} className="v5-faq-answer"><p>{item.a}</p></div>
        </div>;
      })}
    </div>
  </div>;
}

export function HomeV5Events({ t, openEventGallery, isRu }) {
  const featured = t.eventsItems[0];
  const birthday = t.eventsItems.find(e => e.galleryKey === "birthday") || t.eventsItems[1];
  const umka = t.eventsItems.find(e => e.galleryKey === "umka") || t.eventsItems[3];
  return <div data-home-v5-events data-lang={isRu ? "ru" : "en"}>
    <h2 className="sr-only">{t.eventsTitle}</h2>
    <article className="v5-event-card v5-event-featured" style={box(117, 85, 664, 788)}>
      <EditablePhoto className="v5-event-photo" slot={`event-${featured.galleryKey}`} label={`Эвенты: ${featured.title}`} src={`${root}/event-featured.webp`} alt={featured.title} sizes="(max-width: 699px) 92vw, 46vw" unoptimized />
      <h3>{featured.title}</h3><p>{featured.desc}</p>
    </article>
    {[{ event: birthday, y: 149, file: "event-birthday.webp", h: 292, photoHeight: 157 }, { event: umka, y: 520, file: "event-community.webp", h: 290, photoHeight: 145 }].map(({ event, y, file, h, photoHeight }) => <article className="v5-event-card v5-event-small" key={file} style={box(921, y, 397, h)}>
      <EditablePhoto className="v5-event-photo" slot={`event-${event.galleryKey}`} label={`Эвенты: ${event.title}`} src={event.galleryKey === "umka" ? event.image : `${root}/${file}`} alt={event.title} sizes="(max-width: 699px) 92vw, 28vw" unoptimized fallback={{ x:50, y:event.galleryKey === "umka" ? 30 : 50, scale:1 }} style={{ height: unit(photoHeight) }} />
      <h3>{event.title}</h3><p>{event.desc}</p>
    </article>)}

    <button className="v5-event-cta v5-event-photos" type="button" onClick={() => openEventGallery(featured.galleryKey)} style={box(697.909, 826.14, 137, 75)}>
      <Image src={`${root}/svg/view-photos-cta.svg`} alt="" width={137} height={75} unoptimized /><span>{isRu ? <>СМОТРЕТЬ <br />ФОТО</> : <>VIEW <br />PHOTOS</>}</span>
    </button>
    {[{ event: birthday, y: 415.956 }, { event: umka, y: 783.358 }].map(({ event, y }) => <button key={event.galleryKey} className="v5-event-cta v5-event-all" type="button" onClick={() => openEventGallery(event.galleryKey)} aria-label={`${isRu ? "Все фото" : "All photos"}: ${event.title}`} style={box(1079.307, y, 71, 72)}><Image src={`${root}/svg/${event.galleryKey === "birthday" ? "event-all-birthday-surface.svg" : "event-all-community-surface.svg"}`} alt="" aria-hidden="true" width={71} height={72} unoptimized /><span><span className="v5-event-label-original">{isRu ? "ВСЕ" : "ALL"}</span><span className="v5-event-label-mobile">{isRu ? "ВСЕ ФОТО" : "ALL PHOTOS"}</span></span></button>)}
  </div>;
}

export { default as HomeV5Gallery } from "./PhotoGallery";
