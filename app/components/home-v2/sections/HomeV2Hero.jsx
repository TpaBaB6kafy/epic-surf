"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { Dithering } from "@paper-design/shaders-react";

const HERO_OCEAN_SRC = "/design/home-v2/why-epic/why-epic-bg-ocean.webp";
const HERO_VIDEO_SRC = "/hero-surf.mp4";
const HERO_EPIC_MASK_SRC = "/brand/epic-logo.svg";
const HERO_SURF_SCHOOL_MASK_SRC = "/brand/surf-school-hero-logo.svg";
const HERO_MOBILE_EPIC_ARTWORK_SRC = "/design/home-v2/hero/mobile-epic-logo-artwork.svg";
const HERO_MOBILE_EPIC_ACCENT_SRC = "/design/home-v2/hero/mobile-epic-logo-accent-dot.svg";
const HERO_MOBILE_SURF_SCHOOL_SRC = "/design/home-v2/hero/mobile-surf-school-logo.svg";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_HERO_QUERY = "(max-width: 639px)";

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

function subscribeToReducedMotion(onChange) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function subscribeToMobileHero(onChange) {
  const mediaQuery = window.matchMedia(MOBILE_HERO_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getMobileHeroSnapshot() {
  return window.matchMedia(MOBILE_HERO_QUERY).matches;
}

function HeroDitheringWave() {
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => false);
  const mobileHero = useSyncExternalStore(subscribeToMobileHero, getMobileHeroSnapshot, () => false);

  return (
    <div data-home-v2-hero-dithering-wave className="home-v2-hero-dithering-wave" aria-hidden="true">
      <Dithering
        data-home-v2-hero-dithering-shader
        data-home-v2-dithering-motion={reducedMotion ? "paused" : "running"}
        width="100%"
        height="100%"
        colorBack="#2E2E2E"
        colorFront="#395962"
        shape="wave"
        type="8x8"
        size={3}
        speed={reducedMotion ? 0 : 0.6}
        fit="cover"
        scale={0.65}
        offsetY={mobileHero ? 0.32 : 0.22}
        maxPixelCount={640000}
      />
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
        <div
          data-home-v2-hero-grid
          className="home-v2-fluid-frame home-v2-fluid-grid home-v2-hero-desktop-grid"
        >
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
        </div>
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

      <div data-home-v2-hero-mobile-benefits className="home-v2-hero-mobile-benefits z-[3]">
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
      <HeroDitheringWave />
    </section>
  );
}
