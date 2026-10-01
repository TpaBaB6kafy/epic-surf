import Image from "next/image";
import Link from "next/link";

const root = "/design/home-v5/lessons-included";
const box = (x, y, width, height) => ({
  left: `${x / 14.4}cqw`, top: `${y / 14.4}cqw`,
  width: `${width / 14.4}cqw`, height: `${height / 14.4}cqw`,
});

function Artwork({ file, x, y, width, height, className = "" }) {
  return <Image aria-hidden="true" alt="" src={`${root}/${file}`} width={width} height={height}
    unoptimized className={`home-v5-li-art ${className}`} style={box(x, y, width, height)} />;
}

export default function HomeV5LessonsIncluded({ orderedLessons, activeLesson, setActiveLessonId, links,
  onBookingClick, onMessengerClick, t, lang, titleParts, posterMedia, isBookingLesson }) {
  const isRu = lang === "ru";
  const index = orderedLessons.findIndex(({ id }) => id === activeLesson.id);
  const changeLesson = (direction) => setActiveLessonId(orderedLessons[(index + direction + orderedLessons.length) % orderedLessons.length].id);
  const price = activeLesson.item.price.replace(/\s*VND$/i, "");
  const group = activeLesson.id === "group";
  const description = group && !isRu
    ? "Perfect for those who\nwant to learn in a relaxed,\nlively atmosphere\nwith like-minded people."
    : activeLesson.item.desc;
  const ctaContent = <><Image aria-hidden="true" alt="" src={`${root}/svg/book-now-cta.svg`} width={194.003} height={68.904} unoptimized /><span>{t.btnBook}</span></>;

  return (
    <div data-home-v5-lessons-included data-lang={lang} data-lesson={activeLesson.id}>
      <Artwork file="png/section-background-texture@2x.png" x={0} y={36} width={1440} height={807} />
      <div className="home-v5-li-band" aria-hidden="true" />
      <h2 className="home-v5-li-heading">{isRu ? "Выбери свой формат" : "Choose Your Lesson"}</h2>

      <div role="region" aria-roledescription={isRu ? "карусель" : "carousel"} aria-label={isRu ? "Варианты уроков" : "Lesson options"}>
        <Artwork file="svg/lesson-price-panel.svg" x={243.004} y={203} width={214} height={306} />
        <Artwork file="svg/rectangle-73.svg" x={141} y={403} width={416} height={212} />
        <Artwork file="svg/lesson-photo-surface.svg" x={676} y={203} width={602} height={412} />
        <div id="home-v2-lesson-detail" aria-live="polite" aria-atomic="true">
          <h3 className="home-v5-li-title" data-home-v2-lesson-title>{titleParts.map((part, i) => <span key={i}>{part}</span>)}</h3>
          <p className="home-v5-li-price" data-home-v2-lesson-price data-long={price.length > 7 ? "true" : undefined}><span>{price}</span><span>VND</span></p>
          <p className="home-v5-li-description" data-home-v2-lesson-description>{description}</p>
          <div className="home-v5-li-photo">
            <Image key={activeLesson.id} data-lessons-photo src={group ? `${root}/png/group-lesson-photo@2x.png` : posterMedia.asset}
              alt={activeLesson.item.title} fill sizes="41vw" unoptimized={group}
              style={{ objectFit: "cover", objectPosition: group ? "center" : posterMedia.position }} />
          </div>
        </div>
        {[-1, 1].map((direction) => <button key={direction} type="button" className={`home-v5-li-control ${direction < 0 ? "home-v5-li-prev" : "home-v5-li-next"}`}
          aria-label={isRu ? direction < 0 ? "Предыдущий урок" : "Следующий урок" : direction < 0 ? "Previous lesson" : "Next lesson"}
          aria-controls="home-v2-lesson-detail" onClick={() => changeLesson(direction)}>
          <Image aria-hidden="true" alt="" src={`${root}/svg/${direction < 0 ? "control-surface.svg" : "control-surface-2142-457.svg"}`} width={62} height={62} unoptimized />
          <Image aria-hidden="true" alt="" className="home-v5-li-arrow" src={`${root}/svg/${direction < 0 ? "arrow-icon.svg" : "arrow-icon-2142-458.svg"}`} width={17} height={30} unoptimized />
        </button>)}
        {isBookingLesson ? <button type="button" className="home-v5-li-cta" data-home-v2-booking-cta onClick={() => onBookingClick(activeLesson.item)}>{ctaContent}</button>
          : <Link className="home-v5-li-cta" data-home-v2-booking-cta href={links.whatsapp} onClick={(event) => onMessengerClick(event, activeLesson.item)} target="_blank" rel="noreferrer">{ctaContent}</Link>}
      </div>

      <section id="included" className="home-v5-li-included" aria-label={t.includedLabel}>
        {/* Both clipped Figma copies represent this single continuous gear composition. */}
        <Artwork file="svg/gear-background-2142-446.svg" x={298.999} y={0} width={332} height={166} />
        <Artwork file="svg/gear-background.svg" x={298.999} y={166} width={332} height={166} />
        <Artwork file="png/rashguard-artwork-2142-447@2x.png" x={339.999} y={37} width={246} height={129} />
        <Artwork file="png/rashguard-artwork@2x.png" x={339.999} y={166} width={246} height={117} />
        <Artwork file="png/camera-artwork-2142-448@2x.png" x={339.999} y={160} width={122} height={6} />
        <Artwork file="png/camera-artwork@2x.png" x={339.999} y={166} width={122} height={116} />
        <Artwork file="png/zinc-artwork-2142-449@2x.png" x={451.999} y={158} width={137} height={8} />
        <Artwork file="png/zinc-artwork@2x.png" x={451.999} y={166} width={137} height={129} />
        <Artwork file="svg/feature-surface-2142-450.svg" x={605.999} y={77} width={536} height={74} />
        <Artwork file="svg/feature-surface.svg" x={606.997} y={179} width={536} height={74} />
        <p className="home-v5-li-feature home-v5-li-rashguard">{t.includedItems.find(({ icon }) => icon === "rashguard")?.desc}</p>
        <p className="home-v5-li-feature home-v5-li-camera">{t.includedItems.find(({ icon }) => icon === "camera")?.desc}</p>
      </section>
    </div>
  );
}
