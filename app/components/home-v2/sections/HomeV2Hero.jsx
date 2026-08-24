"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const HERO_OCEAN_SRC = "/design/home-v2/why-epic/why-epic-bg-ocean.webp";
const HERO_VIDEO_SRC = "/hero-surf.mp4";
const HERO_EPIC_MASK_SRC = "/brand/epic-logo.svg";
const HERO_SURF_SCHOOL_MASK_SRC = "/brand/surf-school-hero-logo.svg";
const HERO_MOBILE_EPIC_ARTWORK_SRC = "/design/home-v2/hero/mobile-epic-logo-artwork.svg";
const HERO_MOBILE_EPIC_ACCENT_SRC = "/design/home-v2/hero/mobile-epic-logo-accent-dot.svg";
const HERO_MOBILE_SURF_SCHOOL_SRC = "/design/home-v2/hero/mobile-surf-school-logo.svg";

const SURF_SCHOOL_LETTERS = [
  ["letter-s-surf", "Letter S — Surf"],
  ["letter-u-surf", "Letter U — Surf"],
  ["letter-r-surf", "Letter R — Surf"],
  ["letter-f-surf", "Letter F — Surf"],
  ["letter-s-school", "Letter S — School"],
  ["letter-c-school", "Letter C — School"],
  ["letter-h-school", "Letter H — School"],
  ["letter-o1-school", "Letter O1 — School"],
  ["letter-o2-school", "Letter O2 — School"],
  ["letter-l-school", "Letter L — School"],
];

const HERO_WAVES = [
  {
    fill: "#34474d",
    path: "M0 42C58 9 101-6 160 3C240 10 297 41 360 43C432 45 492 10 560 9C650-5 722 14 800 29C901 49 990 49 1080 36C1163 10 1228 1 1300 15C1362 25 1410 39 1440 47V191H0Z",
  },
  {
    fill: "#365057",
    path: "M0 68C69 43 113 11 180 11C254 11 302 51 377 51C451 51 503 14 584 17C668 20 721 51 809 47C909 44 956 40 1047 58C1125 73 1182 95 1259 91C1331 87 1386 71 1440 70V191H0Z",
  },
  {
    fill: "#37555c",
    path: "M0 92C68 69 108 46 166 46C236 46 280 91 357 94C430 97 470 61 548 59C624 57 672 96 756 96C840 96 892 90 971 91C1058 91 1110 122 1191 130C1275 138 1333 101 1440 92V191H0Z",
  },
  {
    fill: "#4c5960",
    path: "M0 118C66 96 110 58 171 58C248 58 285 102 355 103C427 105 460 64 534 60C610 57 659 94 744 95C838 96 886 84 969 89C1050 94 1104 126 1185 133C1262 140 1327 96 1440 103V191H0Z",
  },
  {
    fill: "#516867",
    path: "M0 136C74 117 116 103 178 103C251 103 294 137 365 137C445 137 492 115 565 117C645 119 685 143 763 143C851 143 897 122 976 125C1054 128 1101 153 1175 154C1257 155 1323 130 1440 139V191H0Z",
  },
  {
    fill: "#606a66",
    path: "M0 190C65 166 118 150 183 150C253 150 301 178 369 181C445 184 500 166 573 168C650 171 695 188 773 188C852 188 913 179 982 183C1053 188 1097 164 1166 148C1240 131 1301 147 1366 173C1396 184 1420 190 1440 191V191H0Z",
  },
];

function SurfSchoolArtwork() {
  return (
    <svg
      data-home-v2-hero-logo-surf-school
      viewBox="0 0 1115 155"
      width="304"
      height="42.26"
      aria-hidden="true"
    >
      {SURF_SCHOOL_LETTERS.map(([id, label]) => (
        <use
          key={id}
          data-home-v2-surf-school-letter={label}
          href={`${HERO_SURF_SCHOOL_MASK_SRC}#${id}`}
        />
      ))}
    </svg>
  );
}

function HeroWaveStack() {
  return (
    <div data-home-v2-hero-wave-stack className="home-v2-hero-wave-stack" aria-hidden="true">
      {HERO_WAVES.map((wave, index) => (
        <svg
          key={wave.path}
          data-home-v2-hero-wave-layer={`Wave Layer ${String(index + 1).padStart(2, "0")}`}
          viewBox="0 0 1440 191"
          preserveAspectRatio="none"
        >
          <path d={wave.path} fill={wave.fill} />
        </svg>
      ))}
    </div>
  );
}

function DesktopHero({ t, whyItems }) {
  const benefits = whyItems.slice(-3);

  return (
    <div data-home-v2-hero-desktop data-home-v2-hero-desktop-en className="home-v2-hero-desktop-en">
      <h1 className="sr-only">
        {t.heroTitle} {t.heroTitleEpic} {t.heroTitleEnd}
      </h1>

      <div data-home-v2-hero-video-strip className="home-v2-hero-video-strip">
        <video autoPlay muted loop playsInline preload="auto" aria-label="Epic Surf School ocean video">
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      <div className="home-v2-hero-desktop-body">
        <div data-home-v2-hero-logo-lockup className="home-v2-hero-desktop-lockup">
          <span data-home-v2-hero-logo-accent-dot className="home-v2-hero-accent-dot" aria-hidden="true" />
          <Image
            data-home-v2-hero-logo-epic
            src={HERO_EPIC_MASK_SRC}
            alt=""
            width={198}
            height={88.47}
            priority
            className="home-v2-hero-epic-artwork"
          />
          <SurfSchoolArtwork />
        </div>

        <div data-home-v2-hero-benefits className="home-v2-hero-desktop-benefits">
          {benefits.map((item, index) => (
            <article key={item.title} data-home-v2-benefit-card data-benefit-index={index + 1}>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>

        <HeroWaveStack />
      </div>
    </div>
  );
}

function MobileEnHero({ t, whyItems }) {
  const benefits = whyItems.slice(-3);

  return (
    <div data-home-v2-hero-mobile-en className="home-v2-hero-mobile-en">
      <h1 className="sr-only">
        {t.heroTitle} {t.heroTitleEpic} {t.heroTitleEnd}
      </h1>

      <div data-home-v2-hero-mobile-logo-lockup className="home-v2-hero-mobile-logo-lockup">
        <Image
          data-home-v2-hero-mobile-logo-epic
          src={HERO_MOBILE_EPIC_ARTWORK_SRC}
          alt=""
          width={111}
          height={50}
          priority
        />
        <Image
          data-home-v2-hero-mobile-logo-accent-dot
          src={HERO_MOBILE_EPIC_ACCENT_SRC}
          alt=""
          width={15}
          height={15}
          priority
        />
      </div>

      <Image
        data-home-v2-hero-mobile-logo-surf-school
        src={HERO_MOBILE_SURF_SCHOOL_SRC}
        alt=""
        width={171}
        height={24}
        priority
        className="home-v2-hero-mobile-surf-school"
      />

      <div data-home-v2-hero-mobile-benefits className="home-v2-hero-mobile-benefits">
        {benefits.map((item, index) => (
          <article key={item.title} data-home-v2-mobile-benefit data-benefit-index={index + 1}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>

      <div data-home-v2-hero-mobile-video-strip className="home-v2-hero-mobile-video-strip">
        <video autoPlay muted loop playsInline preload="auto" aria-label="Epic Surf School ocean video">
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

function AdaptiveHero({ t, whyItems }) {
  const benefits = whyItems.slice(-3);

  return (
    <div data-home-v2-hero-adaptive className="home-v2-hero-adaptive">
      <div data-home-v2-hero-adaptive-media className="home-v2-hero-adaptive-media" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="auto">
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="home-v2-hero-adaptive-media-overlay" />
      </div>

      <div
        data-home-v2-hero-grid
        className="home-v2-hero-adaptive-grid"
      >
        <div data-home-v2-hero-lockup className="home-v2-hero-adaptive-lockup">
          <h1 className="sr-only">
            {t.heroTitle} {t.heroTitleEpic} {t.heroTitleEnd}
          </h1>
          <div
            data-home-v2-hero-logo-mask
            data-epic-mask-src={HERO_EPIC_MASK_SRC}
            data-surf-school-mask-src={HERO_SURF_SCHOOL_MASK_SRC}
            aria-hidden="true"
          >
            <div
              data-home-v2-hero-logo-epic-mask
              data-hero-mask-src={HERO_EPIC_MASK_SRC}
              className="home-v2-hero-epic-mark relative aspect-[998/446] w-full overflow-hidden"
            >
              <div data-home-v2-logo-ocean-layer className="home-v2-hero-epic-ocean absolute -inset-[8%]" />
            </div>
            <div
              data-home-v2-hero-logo-surf-school-mask
              data-hero-mask-src={HERO_SURF_SCHOOL_MASK_SRC}
              className="home-v2-hero-school-mark mx-auto mt-3 aspect-[1115/155] w-[94%]"
            />
          </div>
        </div>

        <div data-home-v2-hero-benefits className="home-v2-hero-adaptive-benefits">
          {benefits.map((item, index) => (
            <article key={item.title} data-home-v2-benefit-card data-benefit-index={index + 1}>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>

      <HeroWaveStack />
    </div>
  );
}

export default function HomeV2Hero({ t, lang = "en", whyItems = [] }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let heroIsVisible = true;

    const updateLogoMotion = () => {
      section.dataset.homeV2LogoMotion = !reducedMotion && heroIsVisible && !document.hidden ? "running" : "paused";
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        heroIsVisible = entry.isIntersecting;
        updateLogoMotion();
      },
      { threshold: 0.08 },
    );

    const updateHeroProgress = () => {
      frame = 0;
      if (reducedMotion) return;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      if (rect.bottom <= 0 || rect.top >= viewport) return;

      const progress = Math.min(1, Math.max(0, (viewport - rect.top) / (rect.height + viewport)));
      section.style.setProperty("--hero-progress", progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeroProgress);
    };

    observer.observe(section);
    updateHeroProgress();
    updateLogoMotion();
    document.addEventListener("visibilitychange", updateLogoMotion);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateLogoMotion);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-home-v2-hero
      data-home-v2-hero-locale={lang}
      data-home-v2-logo-motion="paused"
      className="relative isolate overflow-hidden bg-epicDark px-4 pb-20 pt-24 text-epicWhite md:px-6 md:pb-24 md:pt-28 lg:pb-20 lg:pt-24"
      style={{ "--hero-progress": 0 }}
    >
      <style>{`
        .home-v2-hero-epic-mark,
        .home-v2-hero-school-mark {
          -webkit-mask-position: center;
          mask-position: center;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: contain;
          mask-size: contain;
        }

        .home-v2-hero-epic-mark {
          -webkit-mask-image: url("${HERO_EPIC_MASK_SRC}");
          mask-image: url("${HERO_EPIC_MASK_SRC}");
          filter: saturate(1.22) contrast(1.08);
        }

        .home-v2-hero-epic-ocean {
          background-image: url("${HERO_OCEAN_SRC}");
          background-position: 50% 27%;
          background-size: 126% auto;
          animation: homeV2EpicOceanDrift 22s cubic-bezier(.45,.05,.55,.95) infinite;
          animation-play-state: paused;
          transform: translate3d(-1%, -1%, 0) scale(1.06);
          will-change: auto;
        }

        [data-home-v2-logo-motion="running"] .home-v2-hero-epic-ocean {
          animation-play-state: running;
          will-change: transform;
        }

        .home-v2-hero-school-mark {
          -webkit-mask-image: url("${HERO_SURF_SCHOOL_MASK_SRC}");
          mask-image: url("${HERO_SURF_SCHOOL_MASK_SRC}");
          background: var(--color-epicWhite);
        }

        @keyframes homeV2EpicOceanDrift {
          0%, 100% { transform: translate3d(-1%, -1%, 0) scale(1.06); }
          50% { transform: translate3d(2%, 1.4%, 0) scale(1.09); }
        }

        @media (prefers-reduced-motion: no-preference) {
          [data-home-v2-client-ready="true"] [data-home-v2-hero-adaptive] [data-home-v2-hero-lockup],
          [data-home-v2-client-ready="true"] [data-home-v2-hero-adaptive] [data-home-v2-benefit-card] {
            animation: homeV2HeroEnter 620ms cubic-bezier(.2,.7,.2,1) both;
          }

          @keyframes homeV2HeroEnter {
            from { opacity: 0; transform: translate3d(0, 18px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-v2-hero-ocean-pan,
          .home-v2-hero-epic-ocean { animation: none !important; transform: none !important; }
        }
      `}</style>

      <DesktopHero t={t} whyItems={whyItems} />
      {lang === "en" ? <MobileEnHero t={t} whyItems={whyItems} /> : null}
      <AdaptiveHero t={t} whyItems={whyItems} />
    </section>
  );
}
