import Image from "next/image";

const HERO_ARTWORK_SRC = "/design/home-v2/hero/hero-collage-artwork.png";
const HERO_DESKTOP_ARTWORK_SRC = "/design/home-v2/hero/hero-collage-composition-v3.svg";
const HERO_STRIP_SRC = "/design/home-v2/hero/hero-video-strip.png";
const HERO_VIDEO_SRC = "/hero-surf.mp4";
const HERO_EPIC_LOGO_SRC = "/design/home-v2/hero/epic-logo.svg";
const HERO_SURF_SCHOOL_SRC = "/design/home-v2/hero/surf-school-logo.svg";

function HeroBenefits({ items, className }) {
  return (
    <div data-home-v2-hero-benefits className={className}>
      {items.slice(-3).map((item, index) => (
        <article key={item.title} data-home-v2-benefit-card data-benefit-index={index + 1}>
          <h2>{item.title}</h2>
          <p>{item.desc}</p>
        </article>
      ))}
    </div>
  );
}

function HeroLogo({ mobile = false }) {
  return (
    <div
      data-home-v2-hero-logo-lockup
      className={mobile ? "home-v2-hero-mobile-logo" : "home-v2-hero-desktop-lockup"}
    >
      <Image
        data-home-v2-hero-logo-epic
        src={HERO_EPIC_LOGO_SRC}
        alt=""
        width={198}
        height={123}
        priority
        unoptimized
        className="home-v2-hero-epic-logo"
      />
      <Image
        data-home-v2-hero-logo-surf-school
        src={HERO_SURF_SCHOOL_SRC}
        alt=""
        width={304}
        height={43}
        priority
        unoptimized
        className="home-v2-hero-school-logo"
      />
    </div>
  );
}

function HeroArtwork({ desktop = false }) {
  const src = desktop ? HERO_DESKTOP_ARTWORK_SRC : HERO_ARTWORK_SRC;
  const width = desktop ? 1244 : 1440;
  const height = desktop ? 387 : 514;

  return (
    <Image
      data-home-v2-hero-collage-artwork
      src={src}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      priority
      unoptimized
      className="home-v2-hero-collage-artwork"
    />
  );
}

function DesktopHero({ t, whyItems }) {
  return (
    <div data-home-v2-hero-desktop data-home-v2-hero-desktop-en className="home-v2-hero-desktop-en">
      <h1 className="sr-only">{t.heroTitle} {t.heroTitleEpic} {t.heroTitleEnd}</h1>
      <video
        data-home-v2-hero-video-strip
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_STRIP_SRC}
        aria-label="Epic Surf School ocean video"
        className="home-v2-hero-video-strip"
        style={{
          height: "12.222cqw",
          objectFit: "cover",
          objectPosition: "50% 50%",
          filter: "grayscale(1)",
        }}
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <HeroArtwork desktop />
      <HeroLogo />
      <HeroBenefits items={whyItems} className="home-v2-hero-desktop-benefits" />
    </div>
  );
}

function CompactHero({ t, whyItems }) {
  return (
    <div data-home-v2-hero-compact className="home-v2-hero-compact">
      <h1 className="sr-only">{t.heroTitle} {t.heroTitleEpic} {t.heroTitleEnd}</h1>
      <video
        data-home-v2-hero-video-strip
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_STRIP_SRC}
        aria-label="Epic Surf School ocean video"
        className="home-v2-hero-compact-strip"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <HeroArtwork />
      <HeroLogo mobile />
      <HeroBenefits items={whyItems} className="home-v2-hero-compact-benefits" />
    </div>
  );
}

export default function HomeV2Hero({ t, lang = "en", whyItems = [] }) {
  return (
    <section
      data-home-v2-hero
      data-home-v2-hero-locale={lang}
      className="relative isolate overflow-hidden text-epicWhite"
    >
      <DesktopHero t={t} whyItems={whyItems} />
      <CompactHero t={t} whyItems={whyItems} />
    </section>
  );
}
