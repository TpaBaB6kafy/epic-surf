import Image from "next/image";
import Link from "next/link";
import HomeV5RentalMarquee from "./HomeV5RentalMarquee";
import { ArrowUp, ExternalLink, Star, Thermometer, Waves, Wind } from "lucide-react";
import { googleFeaturedReviews, googleReviewsSummary } from "../../../data/googleReviews";

const root = "/design/home-v5/rentals-conditions-reviews";
const unit = (value) => `${value / 14.4}cqw`;
const box = (x, y, width, height) => ({ position: "absolute", left: unit(x), top: unit(y), width: unit(width), height: unit(height) });

function Art({ file, x, y, width, height, className = "" }) {
  return <Image src={`${root}/${file}`} alt="" aria-hidden="true" width={width} height={height} unoptimized className={`home-v5-surf-art ${className}`} style={box(x, y, width, height)} />;
}

function Text({ children, x, y, width, height, size, line = size, className = "", style }) {
  return <span className={`home-v5-surf-text ${size >= 40 ? "home-v5-surf-text-large" : ""} ${className}`} style={{ ...box(x, y, width, height), "--home-v5-text-size": unit(size), fontSize: unit(size), lineHeight: unit(line), ...style }}>{children}</span>;
}

export function HomeV5Rentals({ lang, copy, catalogHref, onRent }) {
  const ru = lang === "ru";
  return <section id="rentals" data-home-v2-rentals-block data-home-v5-rentals data-lang={lang} aria-label={ru ? "Аренда досок" : "Board rentals"}>
    {/* Both background exports are clipped at their Figma section boundaries. */}
    <Art className="home-v5-rental-backdrop" file="svg/rentals-background-shape.svg" x={0} y={0} width={1440} height={900} />
    <div className="home-v5-rental-photo">
      <Image src={`${root}/boards.webp`} alt={ru ? "Доски EPIC для аренды" : "EPIC surfboards available to rent"} width={1030} height={592} unoptimized />
    </div>
    <h2 className="home-v5-rental-heading">{ru ? "Аренда" : "Rental"}</h2>
    <Art file="svg/offer-surface.svg" className="home-v5-rental-offer-surface" x={109} y={345} width={349} height={267} />
    <div className="home-v5-rental-offer">
    <Text x={170} y={378} width={150} height={29} size={24} className="home-v5-rental-muted">{copy.from}</Text>
    <Text x={170} y={411} width={131} height={51} size={28} line={51} className="home-v5-surf-montserrat" style={{ color: "#aaffc7" }}>250.000</Text>
    <Text x={301} y={411} width={70} height={51} size={28} line={51} className="home-v5-rental-muted">VND</Text>
    <Text x={170} y={457} width={260} height={24} size={ru ? 18 : 20} line={22} className="home-v5-surf-montserrat">{ru ? "СЕССИЯ НА ДВА ЧАСА" : "TWO HOURS SESSION"}<span className="home-v5-rental-duration-mobile" aria-hidden="true">{ru ? "за 2 часа" : "for 2 hours"}</span></Text>
    <Text x={170} y={513} width={250} height={70} size={20} line={28} className="home-v5-surf-chivo">{copy.description}</Text>
    </div>
    <button type="button" onClick={onRent} className="home-v5-surf-cta home-v5-rent-cta" style={box(1124, 435, 194, 69)}>
      <Image src={`${root}/svg/rent-now-cta.svg`} alt="" width={194} height={69} unoptimized /><span>{copy.rentNow}</span>
    </button>
    <Link href={catalogHref} className="home-v5-surf-cta home-v5-choose-board-cta" style={box(986, 523, 258, 69)}>
      <Image src={`${root}/svg/choose-board-cta.svg`} alt="" width={258} height={69} unoptimized /><span>{copy.chooseBoard}</span>
    </Link>
    <Art className="home-v5-rental-marquee-static" file="svg/surf-school-marquee-artwork-2142-240.svg" x={0} y={694.072} width={1440} height={206} />
  </section>;
}

export function HomeV5Conditions({ language, t, copy, map, camera, footer, waveHeight, wavePeriod, windSpeed, windDirection, windCardinal, whatsappHref, onWhatsApp }) {
  const stats = [
    { x: 130, y: 508, background: "stat-background-2142-401.svg", surface: "stat-surface-2142-402.svg" },
    { x: 361, y: 508, background: "rectangle-68.svg", surface: "stat-surface.svg" },
    { x: 592, y: 511, background: "stat-background.svg", surface: "stat-surface-2142-389.svg" },
    { x: 823, y: 509, background: "stat-background-2142-415.svg", surface: "stat-surface-2142-416.svg" },
  ];
  return <div data-home-v5-conditions data-lang={language}>
    <h2 className="sr-only">{language === "ru" ? "Камера и прогноз волн" : "Live cam and surf forecast"}</h2>
    <Art className="home-v5-conditions-backdrop" file="svg/vector.svg" x={0} y={0} width={1440} height={332} />
    <HomeV5RentalMarquee />
    <Art className="home-v5-rental-marquee-static" file="svg/surf-school-marquee-artwork.svg" x={155.664} y={0} width={1285} height={184} />
    <div className="home-v5-wave-height" aria-label={language === "ru" ? "Высота волн" : "Wave height"} style={box(1075, -28, 240, 102)}><strong>{waveHeight}</strong><span>m</span></div>
    <div className="home-v5-forecast-map" style={box(121, 102, 530, 345.373)}>{map}</div>
    <div className="home-v5-livecam" style={box(789, 102, 530, 345)}><div className="home-v5-camera-stream">{camera}</div>{footer}</div>
    <dl className="home-v5-responsive-stats">
      {[
        [language === "ru" ? "Высота волн" : "Wave height", waveHeight + " m"],
        [t.forecastPeriod, wavePeriod + " s"],
        [t.forecastWind, windSpeed + " km/h"],
        [t.forecastDir, windCardinal],
        [t.forecastWater, "26°C"],
      ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
    </dl>
    <dl className="home-v5-mobile-conditions">
      <div className="home-v5-mobile-condition home-v5-mobile-waves">
        <span className="home-v5-condition-badge" aria-hidden="true"><Waves /></span>
        <div><dt>{language === "ru" ? "Высота волн" : "Wave height"}</dt><dd>{waveHeight}<small> m</small></dd></div>
        <div className="home-v5-mobile-period"><dt>{t.forecastPeriod}</dt><dd>{wavePeriod}<small> s</small></dd></div>
      </div>
      <div className="home-v5-mobile-condition home-v5-mobile-wind">
        <span className="home-v5-condition-badge" aria-hidden="true"><Wind /></span>
        <dt>{t.forecastWind}</dt><dd>{windSpeed}<small> km/h</small></dd>
        <dt className="sr-only">{t.forecastDir}</dt>
        <dd className="home-v5-mobile-direction"><ArrowUp aria-hidden="true" data-mobile-wind-direction style={{ transform: `rotate(${windDirection}deg)` }} /><span>{windCardinal}</span></dd>
      </div>
      <div className="home-v5-mobile-condition home-v5-mobile-water">
        <span className="home-v5-condition-badge" aria-hidden="true"><Thermometer /></span>
        <dt>{t.forecastWater}</dt><dd>≈26<small>°C</small></dd>
        <dt className="sr-only">{language === "ru" ? "Источник значения" : "Value source"}</dt>
        <dd className="home-v5-condition-note">{language === "ru" ? "Ориентир" : "Estimate"}</dd>
      </div>
    </dl>
    <div className="home-v5-desktop-stats">
    {stats.map(({ x, y, background, surface }) => <div key={x} aria-hidden="true"><Art file={`svg/${background}`} className="home-v5-stat-base" x={x + 17} y={y + 6} width={194} height={69} /><Art file={`svg/${surface}`} className="home-v5-stat-icon" x={x} y={y} width={81} height={81} /></div>)}
    <Text x={220} y={521} width={110} height={29} size={25.2} className="home-v5-stat-centered">{wavePeriod}s</Text>
    <Text x={220} y={548} width={110} height={26} size={24} className="home-v5-stat-centered home-v5-stat-dark">{t.forecastPeriod}</Text>
    <Text x={445} y={514} width={65} height={65} size={48} line={60} className="home-v5-stat-centered">{windSpeed}</Text>
    <Text x={505} y={521} width={64} height={27} size={22} className="home-v5-stat-dark">{t.forecastWind}</Text>
    <Text x={505} y={548} width={64} height={27} size={22} className="home-v5-stat-dark">km/h</Text>
    <Text x={703.5} y={528} width={90} height={12} size={8.61} className="home-v5-stat-muted">{t.forecastDir}</Text>
    <div style={{ ...box(697, 540, 32, 32), transform: `rotate(${windDirection - 225}deg)` }}><Image src={`${root}/svg/direction-arrow-icon.svg`} alt="" width={32} height={32} unoptimized className="h-full w-full" /></div>
    <Text x={730.35} y={544.86} width={65} height={24} size={21.528}>{windCardinal}</Text>
    <Text x={929} y={529} width={90} height={12} size={8.324} className="home-v5-stat-muted">{t.forecastWater}</Text>
    <Text x={929} y={543.711} width={85} height={28} size={25.834}>26°C</Text>
    </div>
    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={onWhatsApp} className="home-v5-surf-cta home-v5-conditions-cta" style={box(1054, 484, 256, 135)}>
      <Image src={`${root}/svg/ask-conditions-cta.svg`} alt="" width={256} height={135} unoptimized /><span>{copy.askEpic}</span>
    </a>
  </div>;
}

export function HomeV5Reviews({ isRu, googleMapsUrl }) {
  return <div data-home-v5-reviews data-lang={isRu ? "ru" : "en"}>
    <h2 className="sr-only">{isRu ? "Отзывы учеников" : "Student reviews"}</h2>
    <a className="home-v5-review-rating" href={googleMapsUrl} target="_blank" rel="noopener noreferrer" aria-label={isRu ? "Рейтинг EPIC: 5 из 5 в Google Maps. Читать отзывы" : "EPIC rating: 5 out of 5 on Google Maps. Read reviews"}>
      <strong>{new Intl.NumberFormat(isRu ? "ru-RU" : "en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(googleReviewsSummary.rating)}</strong>
      <span className="home-v5-review-stars" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <Star key={i} />)}</span>
      <span>Google Maps</span><ExternalLink aria-hidden="true" />
    </a>
    <Art className="home-v5-review-collage" file="reviews-wave.webp" x={0} y={228} width={1440} height={391} />
    {googleFeaturedReviews.map((review) => {
      const text = isRu ? review.excerpt : review.englishTranslation || review.excerpt;
      return <article key={review.reviewUrl} className="home-v5-review">
        <blockquote><span className="home-v5-review-copy" lang={isRu ? review.language : "en"}>{text}</span></blockquote>
        <div className="home-v5-review-author home-v5-review-author-with-photo">
          <div className="home-v5-review-author-details">
            <span className="home-v5-review-author-name">{review.name}</span>
            {!isRu && review.englishTranslation && <span className="home-v5-review-translation">Translated from Russian</span>}
            <a href={review.reviewUrl} target="_blank" rel="noopener noreferrer" aria-label={isRu ? `Полный отзыв ${review.name} в Google Maps` : `${review.name}'s full review on Google Maps`}>{isRu ? "Полный отзыв" : "Full review"} <ExternalLink aria-hidden="true" /></a>
          </div>
          <span className="home-v5-review-avatar" aria-hidden="true"><Image src={review.avatarUrl} alt="" width={88} height={104} unoptimized /></span>
        </div>
      </article>;
    })}
  </div>;
}
