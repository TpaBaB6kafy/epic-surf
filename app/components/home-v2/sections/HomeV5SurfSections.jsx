import Image from "next/image";
import Link from "next/link";

const root = "/design/home-v5/rentals-conditions-reviews";
const unit = (value) => `${value / 14.4}cqw`;
const box = (x, y, width, height) => ({ position: "absolute", left: unit(x), top: unit(y), width: unit(width), height: unit(height) });

function Art({ file, x, y, width, height, className = "" }) {
  return <Image src={`${root}/${file}`} alt="" aria-hidden="true" width={width} height={height} unoptimized className={`home-v5-surf-art ${className}`} style={box(x, y, width, height)} />;
}

function Text({ children, x, y, width, height, size, line = size, className = "", style }) {
  return <span className={`home-v5-surf-text ${className}`} style={{ ...box(x, y, width, height), fontSize: unit(size), lineHeight: unit(line), ...style }}>{children}</span>;
}

export function HomeV5Rentals({ lang, copy, catalogHref, onRent }) {
  const ru = lang === "ru";
  return <section id="rentals" data-home-v2-rentals-block data-home-v5-rentals data-lang={lang} aria-label={ru ? "Аренда досок" : "Board rentals"}>
    {/* Both background exports are clipped at their Figma section boundaries. */}
    <Art file="svg/rentals-background-shape.svg" x={0} y={0} width={1440} height={900} />
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
    <Link href={catalogHref} className="home-v5-surf-cta" style={box(986, 523, 258, 69)}>
      <Image src={`${root}/svg/choose-board-cta.svg`} alt="" width={258} height={69} unoptimized /><span>{copy.chooseBoard}</span>
    </Link>
    <Art file="svg/surf-school-marquee-artwork-2142-240.svg" x={0} y={694.072} width={1440} height={206} />
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
    <Art file="svg/vector.svg" x={0} y={0} width={1440} height={332} />
    <Art file="svg/surf-school-marquee-artwork.svg" x={155.664} y={0} width={1285} height={184} />
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

const reviewGeometry = [
  { base: [170.564, 60.508, 325, 171], file: "review-card-base-2142-57.svg", quote: [196, 84, 267.799, 81.144], name: [230, 165], date: [230.227, 177.312] },
  { base: [542.001, 65.001, 325, 171], file: "review-card-base-2142-51.svg", quote: [578.991, 84.901, 276.639, 79.867], name: [576.574, 190.615], date: [576.737, 203.737] },
  { base: [911.002, 22.523, 326, 210], file: "review-card-base.svg", quote: [955.634, 43.504, 267.492, 99.254], name: [954.061, 172.051], date: [953.997, 187.688] },
];

export function HomeV5Reviews({ reviews, isRu, googleMapsUrl }) {
  return <div data-home-v5-reviews data-lang={isRu ? "ru" : "en"}>
    <h2 className="sr-only">{isRu ? "Отзывы учеников" : "Student reviews"}</h2>
    <Art file="reviews-wave.webp" x={0} y={228} width={1440} height={391} />
    {reviews.slice(0, 3).map((review, index) => {
      const g = reviewGeometry[index];
      return <article key={review.name} className="home-v5-review">
        <Art file={`svg/${g.file}`} x={g.base[0]} y={g.base[1]} width={g.base[2]} height={g.base[3]} className="home-v5-review-surface" />
        <blockquote style={box(...g.quote)}><span>{review.text.split(/(🔥|👍|👌)/u).map((part, partIndex) => /^(🔥|👍|👌)$/u.test(part) ? <span className="home-v5-review-emoji" key={partIndex}>{part}</span> : part)}</span></blockquote>
        {index === 2 && <Art file="svg/card-divider.svg" x={953} y={152} width={261} height={8} />}
        <Text x={g.name[0]} y={g.name[1]} width={220} height={16} size={9.676} line={14} className="home-v5-review-name">{review.name}</Text>
        <Text x={g.date[0]} y={g.date[1]} width={150} height={16} size={9.676} line={14} className="home-v5-review-date">{review.date}</Text>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="home-v5-review-link" style={box(...g.base)} aria-label={isRu ? `Отзыв ${review.name} на Google Maps` : `Read ${review.name}'s review on Google Maps`} />
      </article>;
    })}
  </div>;
}
