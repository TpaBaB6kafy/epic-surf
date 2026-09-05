import Image from "next/image";
import { useSyncExternalStore } from "react";

const assets = "/design/home-v2/mobile-top";
const query = "(max-width: 639px)";
const subscribe = (callback) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
// One subscription boundary also controls video ownership; scrolling never remounts it.
export function useHomeV2MobileTop() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}

const unit = (value) => `${value / 3.9}cqw`;
const bounds = (x, y, width, height) => ({ left: unit(x), top: unit(y), width: unit(width), height: unit(height) });
function Artwork({ name, style, className, ...props }) {
  return <Image src={`${assets}/${name}`} alt="" aria-hidden="true" width={390} height={390} unoptimized className={`home-v2-top-art ${className || ""}`} style={style} {...props} />;
}

export function HomeV2MobileHeaderVideo() {
  return (
    <div className="home-v2-top-header-media" aria-hidden="true">
      <video data-home-v2-header-video autoPlay muted loop playsInline preload="auto" poster="/design/home-v2/hero/hero-video-strip.png">
        <source src="/hero-surf.mp4" type="video/mp4" />
      </video>
      <div className="home-v2-top-header-overlay" />
    </div>
  );
}

export function HomeV2MobileHero({ t, whyItems, lang }) {
  return (
    <div data-home-v2-mobile-top-hero className="home-v2-top-hero" lang={lang}>
      <h1 className="sr-only">{t.heroTitle} {t.heroTitleEpic} {t.heroTitleEnd}</h1>
      <Artwork name="epic-logo.svg" style={bounds(24, 24.524, 110.859, 68.577)} priority />
      <Artwork name="surf-word.svg" style={bounds(197, 56, 63.759, 22.719)} priority />
      <Artwork name="school-word.svg" style={bounds(275, 56, 96.355, 23.492)} priority />
      {/* Export includes the mint underlay, surfer mask and both original image fills. */}
      <Artwork name="hero-collage-artwork.svg" data-home-v2-top-collage style={bounds(0, 213, 356, 250)} priority />
      <div data-home-v2-hero-benefits className="home-v2-top-benefits">
        {whyItems.slice(-3).map((item, index) => (
          <article data-home-v2-benefit-card key={item.title} style={{ top: unit([118, 184, 259][index]) }}>
            <h2>{item.title}</h2>
            <p>{lang === "en" ? item.desc.replace("student, with", "student,\nwith").replace("based on", "based\non").replace("wave during", "wave\nduring") : item.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

// Coordinates relative to How It Works, taken from the 390px handoff.
const cards = [
  { top:120, height:205, plate:[140,0,230,46], paper:[20.72,43,350,150], shadow:[13,46.108,363.978,155.033], title:[190,8,164,28], text:[198,74,160,88], photo:[20,25,165.6,180], crop:[0,-85.2,168,360], image:"meet.jpg" },
  { top:358, height:200, plate:[18,0,232.5,46], paper:[18,43,350,150], shadow:[13,49,364,150], title:[41,6,146,28], text:[29,50,170,132], photo:[204,20,165.6,180], crop:[-79.2,0.4,325,189], image:"theory.jpg" },
  { top:592, height:206, plate:[144,0,230,46], paper:[24,41,350,150], shadow:[13,46,365.5,154.5], title:[200,4,160,28], text:[195,56,170,110], photo:[17,26,168,180], crop:[-94.8,-4.8,358.4,201.6], image:"practice.jpg" },
  { top:831, height:208, plate:[19,0,230,46], paper:[19,43,350,150], shadow:[13,50,366,152.52], title:[42,6,149,28], text:[28,63,176,110], photo:[208,28,165.6,180], crop:[-8.4,-12,174,217.2], image:"review.png" },
];

export function HomeV2MobileHow({ steps, title, titleEnd, lang }) {
  return (
    <div data-home-v2-how-mobile-en data-home-v2-mobile-top-how className="home-v2-top-how" lang={lang}>
      <div data-home-v2-heading-stripe="upper" className="home-v2-top-stripe" style={{...bounds(-11,43,410,7), background:"#383838"}} />
      <div data-home-v2-heading-stripe="lower" className="home-v2-top-stripe" style={{...bounds(-11,66.1525,410.131,14.759), background:"#242424", transform:"rotate(-2deg)"}} />
      <h2 data-home-v2-how-mobile-heading className="home-v2-top-how-heading">
        <span style={bounds(99,35,100.23,24)}>{title}</span>
        <span style={bounds(139.048,57,152.096,30.048)}>{titleEnd}</span>
      </h2>
      {steps.map((step,index) => {
        const card=cards[index], number=String(index+1).padStart(2,"0");
        return (
          <article key={step.title} data-home-v2-how-mobile-card={index+1} className="home-v2-top-card" style={{top:unit(card.top),height:unit(card.height)}}>
            <Artwork name={`title-${number}.svg`} data-home-v2-title-pattern style={{...bounds(...card.plate),transform:index%2 ? "scaleX(-1)" : undefined}} />
            <div data-home-v2-paper-shadow className="home-v2-top-paper-shadow" style={bounds(...card.shadow)}>
              {index === 0 ? <div className="home-v2-top-first-shadow" /> : <Artwork name={`shadow-${number}.svg`} style={{width:unit(card.shadow[3]),height:unit(card.shadow[2]),left:"50%",top:"50%",transform:`translate(-50%, -50%) rotate(-90deg)${index===3 ? " scaleY(-1)" : ""}`}} />}
            </div>
            <Artwork name={`card-description-paper-${number}@2x.png`} data-home-v2-paper-surface style={bounds(...card.paper)} />
            {/* Handoff reports strokes: [] on these panels; keep the border layer separate. */}
            <div data-home-v2-card-border className="home-v2-top-card-border" style={bounds(...card.paper)} />
            <div data-home-v2-how-mobile-photo className="home-v2-top-photo" style={{...bounds(...card.photo),"--shadow-direction":index%2 ? -1 : 1}}>
              <div className={`home-v2-top-photo-mask ${index===1 ? "home-v2-top-photo-mask-reverse" : ""}`} style={{maskImage:`url(${assets}/mask-${number}.svg)`}}>
                <Image alt="" aria-hidden="true" unoptimized width={400} height={400} src={`/design/home-v2/how-it-works/how-it-works-${card.image}`} style={bounds(...card.crop)} className="home-v2-top-photo-image" />
              </div>
            </div>
            <h3 data-home-v2-how-mobile-title style={bounds(...card.title)}>{step.title}</h3>
            <p data-home-v2-how-mobile-description style={bounds(...card.text)}>{lang === "en" && index === 1 ? step.desc.replace("basics of", "basics\nof").replace("key movements", "key\nmovements").replace("beach: take-off", "beach:\ntake-off") : lang === "en" && index === 3 ? step.desc.replace("we review", "we\nreview").replace("and give", "and\ngive").replace("your next", "your\nnext").replace("lesson or", "lesson\nor") : step.desc}</p>
          </article>
        );
      })}
    </div>
  );
}
