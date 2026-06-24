"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const HERO_OCEAN_SRC = "/design/home-v2/why-epic/why-epic-bg-ocean.webp";
const HERO_EPIC_MASK_SRC = "/brand/epic-logo.svg";
const HERO_SURF_SCHOOL_MASK_SRC = "/brand/surf-school-hero-logo.svg";

const benefitPaperAssets = [
  "/design/home-v2/why-epic/why-epic-card-paper-certified.svg",
  "/design/home-v2/why-epic/why-epic-card-paper-personal.svg",
  "/design/home-v2/why-epic/why-epic-card-paper-conditions.svg",
  "/design/home-v2/why-epic/why-epic-card-paper-start.svg",
];

const benefitIconAssets = [
  "/design/home-v2/why-epic/why-epic-icon-certified.svg",
  "/design/home-v2/why-epic/why-epic-icon-personal.svg",
  "/design/home-v2/why-epic/why-epic-icon-conditions.svg",
  "/design/home-v2/why-epic/why-epic-icon-start.svg",
];

function MovingOceanPan({ grayscale = false, scrollProps = {}, panProps = {}, imageProps = {} }) {
  return (
    <div
      {...scrollProps}
      className={`absolute inset-x-0 top-0 h-[136%] ${scrollProps.className || ""}`}
      style={{
        transform: "translate3d(0, calc(var(--hero-progress, 0) * 0%), 0)",
        ...(scrollProps.style || {}),
      }}
    >
      <div {...panProps} className={`home-v2-hero-ocean-pan absolute inset-0 ${panProps.className || ""}`}>
        <Image
          {...imageProps}
          src={HERO_OCEAN_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`h-full w-full object-cover object-center ${grayscale ? "grayscale contrast-125" : "saturate-125 contrast-110"} ${imageProps.className || ""}`}
        />
      </div>
    </div>
  );
}

export default function HomeV2Hero({ lang, whyItems = [] }) {
  const sectionRef = useRef(null);
  const title = lang === "ru"
    ? ["Epic", "surf", "Da Nang"]
    : ["Epic", "surf", "Da Nang"];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let frame = 0;
    const updateHeroProgress = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const travel = rect.height + viewport;
      const progress = Math.min(1, Math.max(0, (viewport - rect.top) / travel));
      section.style.setProperty("--hero-progress", progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateHeroProgress);
      }
    };

    updateHeroProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-home-v2-hero
      className="relative isolate overflow-hidden bg-epicDark px-4 pb-12 pt-24 text-epicWhite md:px-6 md:pb-16 md:pt-28"
      style={{ "--hero-progress": 0 }}
    >
      <style>{`
        @keyframes homeV2HeroOceanPan {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(0, -26.5%, 0); }
        }

        .home-v2-hero-epic-mask,
        .home-v2-hero-surf-school-mask {
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
          -webkit-mask-size: contain;
          mask-size: contain;
        }

        .home-v2-hero-epic-mask {
          -webkit-mask-image: url("${HERO_EPIC_MASK_SRC}");
          mask-image: url("${HERO_EPIC_MASK_SRC}");
          -webkit-mask-size: min(78vw, 360px) auto;
          mask-size: min(78vw, 360px) auto;
          -webkit-mask-position: center 27%;
          mask-position: center 27%;
        }

        .home-v2-hero-surf-school-mask {
          -webkit-mask-image: url("${HERO_SURF_SCHOOL_MASK_SRC}");
          mask-image: url("${HERO_SURF_SCHOOL_MASK_SRC}");
          -webkit-mask-size: min(76vw, 340px) auto;
          mask-size: min(76vw, 340px) auto;
          -webkit-mask-position: center 45%;
          mask-position: center 45%;
        }

        @media (min-width: 768px) {
          .home-v2-hero-epic-mask {
            -webkit-mask-size: min(58vw, 680px) auto;
            mask-size: min(58vw, 680px) auto;
            -webkit-mask-position: center 32%;
            mask-position: center 32%;
          }

          .home-v2-hero-surf-school-mask {
            -webkit-mask-size: min(50vw, 600px) auto;
            mask-size: min(50vw, 600px) auto;
            -webkit-mask-position: center 56%;
            mask-position: center 56%;
          }
        }

        @media (min-width: 1024px) {
          .home-v2-hero-epic-mask {
            -webkit-mask-size: min(54vw, 760px) auto;
            mask-size: min(54vw, 760px) auto;
            -webkit-mask-position: center 33%;
            mask-position: center 33%;
          }

          .home-v2-hero-surf-school-mask {
            -webkit-mask-size: min(48vw, 640px) auto;
            mask-size: min(48vw, 640px) auto;
            -webkit-mask-position: center 57%;
            mask-position: center 57%;
          }
        }

        .home-v2-hero-ocean-pan {
          animation: homeV2HeroOceanPan 18s ease-in-out infinite alternate;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .home-v2-hero-ocean-pan {
            animation: none;
          }
        }
      `}</style>

      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <MovingOceanPan
          grayscale
          panProps={{ "data-home-v2-hero-ocean-base-pan": true }}
          imageProps={{ "data-home-v2-hero-ocean-base": true }}
        />
        <div className="absolute inset-0 bg-epicDark/58" />
        <div
          data-home-v2-hero-logo-mask
          data-epic-mask-src={HERO_EPIC_MASK_SRC}
          data-surf-school-mask-src={HERO_SURF_SCHOOL_MASK_SRC}
          className="pointer-events-none absolute inset-0"
        />
        <div
          data-home-v2-hero-logo-epic-mask
          data-hero-mask-src={HERO_EPIC_MASK_SRC}
          className="home-v2-hero-epic-mask pointer-events-none absolute inset-0 overflow-hidden opacity-95"
        >
          <MovingOceanPan panProps={{ "data-home-v2-hero-logo-color-pan": true }} />
        </div>
        <div
          data-home-v2-hero-logo-surf-school-mask
          data-hero-mask-src={HERO_SURF_SCHOOL_MASK_SRC}
          className="home-v2-hero-surf-school-mask pointer-events-none absolute inset-0 overflow-hidden opacity-95"
        >
          <MovingOceanPan panProps={{ "data-home-v2-hero-logo-color-pan": true }} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-epicDark/68 to-epicDark" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-96px)] max-w-[1448px] flex-col justify-between gap-10 lg:min-h-[calc(110svh-112px)]">
        <div className="flex flex-1 items-start justify-center pt-[34vh] sm:pt-[35vh] md:pt-[38vh] lg:pt-[42vh]">
          <h1 className="sr-only">
            {title.join(" ")}
          </h1>
        </div>

        <div
          data-home-v2-hero-benefits
          className="grid grid-cols-2 gap-x-3 gap-y-7 pb-3 pt-3 sm:gap-x-5 sm:gap-y-10 xl:grid-cols-4 xl:gap-x-7 xl:pt-0"
        >
          {whyItems.map((item, index) => {
            const paperAsset = benefitPaperAssets[index] || benefitPaperAssets[0];
            const iconAsset = benefitIconAssets[index] || benefitIconAssets[0];

            return (
              <article
                key={item.title}
                data-home-v2-benefit-card
                className={`relative mx-auto flex min-h-[168px] w-full max-w-[188px] flex-col items-center justify-center px-3 pb-5 pt-11 text-center text-epicDark sm:min-h-[220px] sm:max-w-[300px] sm:px-6 sm:pb-7 sm:pt-14 xl:min-h-[242px] xl:max-w-[330px] xl:px-7 xl:pb-8 ${index % 2 === 0 ? "xl:-rotate-1" : "xl:rotate-1"} ${index === 1 || index === 3 ? "xl:translate-y-3" : ""}`}
              >
                <Image
                  data-why-epic-paper-asset={index}
                  src={paperAsset}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 46vw, 90vw"
                  className="pointer-events-none absolute inset-0 z-0 h-full w-full object-fill"
                />
                <Image
                  data-why-epic-icon-asset={index}
                  src={iconAsset}
                  alt=""
                  aria-hidden="true"
                  width={88}
                  height={88}
                  sizes="88px"
                  className="absolute -top-8 left-1/2 z-10 h-16 w-16 -translate-x-1/2 object-contain sm:-top-10 sm:h-20 sm:w-20 md:-top-11 md:h-[88px] md:w-[88px]"
                />
                <h3 className="relative z-10 mt-2 text-[16px] font-black leading-tight text-epicDark sm:text-[21px] md:text-[23px]">
                  {item.title}
                </h3>
                <p className="relative z-10 mt-3 max-w-[220px] text-[11px] font-bold leading-5 text-epicGray sm:mt-4 sm:text-sm sm:leading-6">
                  {item.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
