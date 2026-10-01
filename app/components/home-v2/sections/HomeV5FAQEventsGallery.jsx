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
  const community = t.eventsItems.find(e => e.galleryKey === "community") || t.eventsItems[3];
  return <div data-home-v5-events data-lang={isRu ? "ru" : "en"}>
    <h2 className="sr-only">{t.eventsTitle}</h2>
    <article className="v5-event-card v5-event-featured" style={box(117, 85, 664, 788)}>
      <Image className="v5-event-photo" src={`${root}/event-featured.webp`} alt={featured.title} width={664} height={589} unoptimized />
      <h3>{featured.title}</h3><p>{featured.desc}</p>
    </article>
    {[{ event: birthday, y: 149, file: "event-birthday.webp", h: 292, photoHeight: 157 }, { event: community, y: 520, file: "event-community.webp", h: 290, photoHeight: 145 }].map(({ event, y, file, h, photoHeight }) => <article className="v5-event-card v5-event-small" key={file} style={box(921, y, 397, h)}>
      <Image className="v5-event-photo" src={`${root}/${file}`} alt={event.title} width={397} height={photoHeight} unoptimized style={{ height: unit(photoHeight) }} />
      <h3>{event.title}</h3><p>{event.desc}</p>
    </article>)}
    <Art file="svg/event-ctas.svg" x={1079.307} y={415.956} width={71} height={440} />
    <button className="v5-event-cta v5-event-photos" type="button" onClick={() => openEventGallery(featured.galleryKey)} style={box(697.909, 826.14, 137, 75)}>
      <Image src={`${root}/svg/view-photos-cta.svg`} alt="" width={137} height={75} unoptimized /><span>{isRu ? <>СМОТРЕТЬ<br />ФОТО</> : <>VIEW<br />PHOTOS</>}</span>
    </button>
    {[{ event: birthday, y: 415.956 }, { event: community, y: 783.358 }].map(({ event, y }) => <button key={event.galleryKey} className="v5-event-cta v5-event-all" type="button" onClick={() => openEventGallery(event.galleryKey)} aria-label={`${isRu ? "Все фото" : "All photos"}: ${event.title}`} style={box(1079.307, y, 71, 72)}>{isRu ? "ВСЕ" : "ALL"}</button>)}
  </div>;
}

const filters = {
  all: [272, 134, 55, 43, "rectangle-29.svg"],
  "surf-fest": [342, 135, 307, 43, "filter-border-2142-112.svg"],
  birthday: [687, 135, 135, 43, "filter-border-2142-109.svg"],
  sunset: [851, 136, 135, 41, "filter-border-2142-106.svg"],
  community: [1014, 136, 156, 41, "filter-border.svg"],
};
const tiles = [[121, 273, 475, 479], [639, 273, 318, 232], [1000, 273, 318, 232], [639, 521, 318, 232], [1000, 521, 318, 232]];

export function HomeV5Gallery({ lang, eventGalleryGroups, activeGalleryKey, setActiveGalleryKey, activeGalleryGroup, galleryPhotoSrc }) {
  return <div data-home-v5-gallery data-lang={lang}>
    <h2 className="sr-only">{lang === "ru" ? "Фотографии EPIC" : "EPIC photo gallery"}</h2>
    <div role="group" aria-label={lang === "ru" ? "Альбомы" : "Photo albums"}>
      {eventGalleryGroups.map(group => {
        const [x, y, w, h, file] = filters[group.key];
        return <button key={group.key} type="button" className="v5-gallery-filter" aria-pressed={activeGalleryKey === group.key} onClick={() => setActiveGalleryKey(group.key)} style={box(x, y, w, h)}>
          <span aria-hidden="true" className="v5-gallery-filter-border" style={{ maskImage: `url(${root}/svg/${file})`, WebkitMaskImage: `url(${root}/svg/${file})` }} />
          <span>{lang === "ru" && group.key === "all" ? "Все" : group.label}</span>
        </button>;
      })}
    </div>
    <div aria-live="polite" className="sr-only">{activeGalleryGroup.label}</div>
    {activeGalleryGroup.photos.slice(0, 5).map((photo, index) => <div className="v5-gallery-tile" key={`${activeGalleryKey}-${index}`} style={box(...tiles[index])}>
      <Image src={activeGalleryKey === "all" ? `${root}/gallery-${index + 1}.webp` : galleryPhotoSrc(photo)} alt={`${activeGalleryGroup.label} — ${lang === "ru" ? "фото" : "photo"} ${index + 1}`} fill sizes={index === 0 ? "33vw" : "22vw"} unoptimized={activeGalleryKey === "all"} />
    </div>)}
  </div>;
}
