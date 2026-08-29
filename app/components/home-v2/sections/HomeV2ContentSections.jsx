"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { PosterButton, PosterLink } from "../PosterPrimitives";

const whyEpicPaperAssets = [
  "/design/home-v2/why-epic/why-epic-card-paper-certified.svg",
  "/design/home-v2/why-epic/why-epic-card-paper-personal.svg",
  "/design/home-v2/why-epic/why-epic-card-paper-conditions.svg",
  "/design/home-v2/why-epic/why-epic-card-paper-start.svg",
];

const whyEpicIconAssets = [
  "/design/home-v2/why-epic/why-epic-icon-certified.svg",
  "/design/home-v2/why-epic/why-epic-icon-personal.svg",
  "/design/home-v2/why-epic/why-epic-icon-conditions.svg",
  "/design/home-v2/why-epic/why-epic-icon-start.svg",
];

export function HomeV2Why({ items }) {
  return (
    <section
      data-home-v2-why
      data-why-epic-section
      className="relative isolate overflow-hidden border-y-4 border-epicDark bg-epicDark px-4 py-12 text-epicWhite md:px-6 md:py-16 lg:py-20"
    >
      <Image
        data-why-epic-bg
        src="/design/home-v2/why-epic/why-epic-bg-ocean.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover object-center grayscale contrast-110"
      />
      <div className="absolute inset-0 z-0 bg-epicDark/38" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[330px] max-w-[1448px] items-center md:min-h-[370px] lg:min-h-[410px]">
        <div className="grid w-full gap-x-7 gap-y-12 pt-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
          {items.map((item, index) => {
            const paperAsset = whyEpicPaperAssets[index] || whyEpicPaperAssets[0];
            const iconAsset = whyEpicIconAssets[index] || whyEpicIconAssets[0];

            return (
              <article
                key={item.title}
                data-why-epic-card
                className={`relative mx-auto flex min-h-[270px] w-full max-w-[330px] flex-col items-center justify-center px-7 pb-9 pt-16 text-center text-epicDark ${index % 2 === 0 ? "xl:-rotate-1" : "xl:rotate-1"} ${index === 1 || index === 3 ? "xl:translate-y-3" : ""}`}
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
                  className="absolute -top-10 left-1/2 z-10 h-20 w-20 -translate-x-1/2 object-contain md:-top-11 md:h-[88px] md:w-[88px]"
                />
                <h3 className="relative z-10 mt-3 text-[22px] font-black leading-tight text-epicDark md:text-2xl">
                  {item.title}
                </h3>
                <p className="relative z-10 mt-5 max-w-[220px] text-sm font-bold leading-6 text-epicGray">
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

const howMobileAssets = [
  {
    src: "/design/home-v2/how-it-works/how-it-works-meet.jpg",
    border: "/design/home-v2/how-it-works/mobile-card-border-01.svg",
    top: 118,
    photoSide: "left",
    objectPosition: "50% 53%",
    title: { top: 21, right: 28, width: 131, height: 18 },
    description: { top: 74, right: 23.267, width: 138.733, height: 62.7 },
    descriptionLines: ["We meet, get to know", "you, prepare for the", "lesson, and choose the", "right surfboard."],
  },
  {
    src: "/design/home-v2/how-it-works/how-it-works-theory.jpg",
    border: "/design/home-v2/how-it-works/mobile-card-border-02.svg",
    top: 312,
    photoSide: "right",
    objectPosition: "50% 50%",
    title: { top: 19, left: 34, width: 112, height: 18 },
    description: { top: 58, left: 5, width: 169, height: 104 },
    descriptionLines: ["We cover the basics of surfing", "and ocean safety, then", "practice key movements on", "the beach: take-off,", "turns, and speed generation."],
  },
  {
    src: "/design/home-v2/how-it-works/how-it-works-practice.jpg",
    border: "/design/home-v2/how-it-works/mobile-card-border-03.svg",
    top: 507,
    photoSide: "left",
    objectPosition: "50% 50%",
    title: { top: 21, right: 23, width: 124, height: 18 },
    description: { top: 57, right: 8, width: 154, height: 102 },
    descriptionLines: ["Your instructor stays with", "you in the water, helps you", "catch waves, and gives", "quick feedback after each", "attempt."],
  },
  {
    src: "/design/home-v2/how-it-works/how-it-works-review.png",
    border: "/design/home-v2/how-it-works/mobile-card-border-04.svg",
    top: 701,
    photoSide: "right",
    objectPosition: "50% 50%",
    title: { top: 20, left: 32, width: 115, height: 18 },
    description: { top: 61, left: 13, width: 153, height: 97 },
    descriptionLines: ["After the session, we review", "your progress and give", "simple tips", "for your next surf lesson", "or rental session."],
  },
];

function HomeV2HowItWorksMobileEn({ steps, title, titleEnd }) {
  return (
    <div data-home-v2-how-mobile-en className="relative h-[933px] w-full overflow-hidden bg-epicDark sm:hidden">
      <h2
        data-home-v2-how-mobile-heading
        className="absolute left-0 top-[30px] h-[66px] w-full bg-[#242424] font-black uppercase"
        style={{ fontFamily: "Montserrat, var(--font-heading)" }}
      >
        <span
          data-home-v2-how-mobile-heading-line="how-it"
          className="absolute left-[35px] top-[20px] flex h-[25px] w-[150px] items-center text-epicWhite"
          style={{ fontSize: 36, lineHeight: "23.1809px", transform: "skewX(-0.55deg)" }}
        >
          {title}
        </span>
        <span
          data-home-v2-how-mobile-heading-line="works"
          className="absolute left-[204px] top-[20px] flex h-[25.304px] w-[152px] items-center text-epicGray"
          style={{ fontSize: 36, lineHeight: "23.1809px", transform: "rotate(-0.203deg) skewX(-0.48deg)" }}
        >
          {titleEnd}
        </span>
      </h2>

      <div data-home-v2-how-mobile-process-cards className="absolute left-5 top-0 h-full w-[calc(100%-40px)]">
        {steps.map((step, index) => {
          const asset = howMobileAssets[index];
          const photoIsLeft = asset.photoSide === "left";
          return (
            <article
              key={step.title}
              data-how-card
              data-home-v2-how-mobile-card={index + 1}
              className="absolute left-0 h-[172px] w-full text-epicWhite"
              style={{ top: asset.top }}
            >
              <Image
                data-home-v2-how-mobile-card-border
                src={asset.border}
                alt=""
                aria-hidden="true"
                fill
                unoptimized
                sizes="calc(100vw - 40px)"
                className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              />

              <div
                data-home-v2-how-mobile-photo
                className={`absolute top-0 z-10 h-[172px] w-[47.428571%] overflow-hidden bg-black ${photoIsLeft ? "left-0 rounded-l-[3px]" : "right-0 rounded-r-[3px]"}`}
              >
                <Image
                  data-how-step-photo={index}
                  src={asset.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  unoptimized
                  sizes="47vw"
                  className="object-cover"
                  style={{ objectPosition: asset.objectPosition }}
                />
              </div>

              <div
                data-home-v2-how-mobile-text
                className={`absolute top-0 z-20 h-[172px] w-[52.571429%] ${photoIsLeft ? "right-0" : "left-0"}`}
              >
                <h3
                  className="absolute flex items-center justify-center whitespace-nowrap text-center font-normal leading-none"
                  style={{ ...asset.title, fontFamily: "Arial, sans-serif", fontSize: 18 }}
                >
                  {step.title}
                </h3>
                <p
                  className="absolute flex items-center justify-center text-center font-normal text-epicWhite"
                  style={{ ...asset.description, fontFamily: '"Century Gothic", Montserrat, var(--font-body)', fontSize: 11, lineHeight: "18px" }}
                >
                  <span>
                    {asset.descriptionLines.map((line, lineIndex) => (
                      <span key={line} className="block">
                        {line}
                        {lineIndex < asset.descriptionLines.length - 1 ? " " : null}
                      </span>
                    ))}
                  </span>
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function HomeV2HowItWorksFluidDesktop({ steps, title, titleEnd, lang }) {
  const isRu = lang === "ru";

  return (
    <div
      data-home-v2-how-adaptive
      data-home-v2-how-fluid-desktop
      className={`relative overflow-hidden ${isRu ? "block" : "hidden min-[640px]:block"}`}
    >
      <div
        data-home-v2-how-fluid-wave
        className="pointer-events-none absolute left-1/2 top-[clamp(315px,24.8vw,357px)] hidden w-[calc(100%+104px)] -translate-x-1/2 min-[900px]:block"
        aria-hidden="true"
      >
        <Image
          data-home-v2-how-wave-contour
          src="/design/home-v2/how-it-works/how-it-works-wave-contour.svg"
          alt=""
          width={1540}
          height={195}
          unoptimized
          sizes="calc(100vw + 104px)"
          className="h-auto w-full rotate-[177.43deg] -scale-y-100"
        />
      </div>

      <div className="home-v2-container relative z-10 pb-[var(--home-v2-space-standard)] pt-[var(--home-v2-space-heading)] min-[900px]:pt-[clamp(72px,7.5vw,108px)] min-[1200px]:px-[clamp(16px,1.4vw,20px)] min-[1440px]:h-[720px] min-[1440px]:!w-[calc(100%-(2*var(--home-v2-fluid-gutter)))] min-[1440px]:!max-w-none min-[1440px]:px-0 min-[1440px]:pb-0 min-[1440px]:pt-[112px]">
        <h2
          data-home-v2-how-fluid-heading
          className="flex items-baseline justify-center gap-[clamp(14px,2.35vw,34px)] whitespace-nowrap font-black uppercase leading-[1.08]"
          style={{ fontFamily: "Montserrat, var(--font-heading)" }}
        >
          <span className="text-[clamp(30px,5vw,48px)] text-epicWhite">{title}</span>
          <span className="text-[clamp(30px,5vw,48px)] text-epicGray">{titleEnd}</span>
        </h2>

        <div
          data-home-v2-how-fluid-grid
          className="mt-[var(--home-v2-space-heading)] grid gap-[var(--home-v2-space-internal)] min-[900px]:mt-[clamp(50px,4.2vw,60px)] min-[900px]:grid-cols-2 min-[1200px]:grid-cols-[repeat(4,minmax(0,clamp(238px,calc(238px+((100vw-1200px)*0.067)),254px)))] min-[1200px]:justify-between min-[1200px]:gap-0 min-[1440px]:mx-auto min-[1440px]:mt-[64px] min-[1440px]:w-[clamp(1240px,calc(56vw+440px),1875px)] min-[1440px]:grid-cols-[repeat(4,minmax(0,clamp(264px,calc(8vw+149px),354px)))]"
        >
          {steps.map((step, index) => {
            const asset = howMobileAssets[index];
            const photoIsLeft = index % 2 === 0;
            return (
              <article
                key={step.title}
                data-how-card
                data-home-v2-how-fluid-card={index + 1}
                data-home-v2-how-adaptive-card={index + 1}
                className="grid min-h-[210px] min-w-0 grid-cols-[minmax(0,47%)_minmax(0,53%)] overflow-hidden rounded-[3px] border-[3px] border-epicWhite/70 bg-[#1f1f1f] text-epicWhite min-[900px]:relative min-[900px]:h-[394px] min-[900px]:grid-cols-1 min-[1440px]:h-[var(--home-v2-how-card-height)]"
                style={{ "--home-v2-how-card-height": "clamp(444px, calc(2.5vw + 408px), 472px)" }}
              >
                <div
                  data-home-v2-how-fluid-photo
                  className={`relative min-h-0 min-w-0 overflow-hidden bg-black ${photoIsLeft ? "order-1" : "order-2"} min-[900px]:absolute min-[900px]:inset-x-0 min-[900px]:top-0 min-[900px]:order-1 min-[900px]:h-[clamp(216px,calc(150px+7.333vw),238px)] min-[1200px]:h-[clamp(238px,18.1vw,260px)]`}
                >
                  <Image
                    data-how-step-photo={index}
                    src={asset.src}
                    alt=""
                    aria-hidden="true"
                    fill
                    unoptimized
                    sizes="(min-width: 2560px) 354px, (min-width: 1920px) 303px, (min-width: 1440px) 264px, (min-width: 1200px) 254px, 25vw"
                    className="object-cover"
                    style={{ objectPosition: asset.objectPosition }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-[clamp(58px,calc(34px+2.667vw),66px)] bg-black/55 min-[1200px]:h-[clamp(66px,5.1vw,73px)] min-[1440px]:h-[clamp(78px,calc(1.25vw+60px),92px)]" aria-hidden="true" />
                  <h3
                    data-home-v2-how-card-title
                    className={`absolute bottom-[clamp(15px,1.6vw,23px)] right-[clamp(10px,1.1vw,16px)] flex h-[27px] max-w-[calc(100%-24px)] items-center justify-end text-right font-normal leading-none ${isRu ? "text-[clamp(13px,1.33vw,16px)]" : "text-[clamp(15px,1.5vw,19.1px)]"} min-[1440px]:bottom-0 min-[1440px]:left-0 min-[1440px]:right-0 min-[1440px]:h-[clamp(78px,calc(1.25vw+60px),92px)] min-[1440px]:max-w-none min-[1440px]:justify-center min-[1440px]:px-[clamp(16px,1.2vw,24px)] min-[1440px]:py-[clamp(14px,1vw,20px)] min-[1440px]:text-center min-[1440px]:text-[clamp(20px,calc(0.42vw+14px),25px)] min-[1440px]:leading-[1.15]`}
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    {step.title}
                  </h3>
                </div>

                <div
                  data-home-v2-how-fluid-text
                  className={`relative flex min-h-0 min-w-0 items-center justify-center px-[clamp(18px,3vw,34px)] py-5 text-center ${photoIsLeft ? "order-2" : "order-1"} min-[900px]:absolute min-[900px]:inset-x-0 min-[900px]:bottom-0 min-[900px]:order-2 min-[900px]:h-[clamp(134px,calc(222px-7.333vw),156px)] min-[900px]:px-[clamp(12px,1.55vw,22px)] min-[900px]:py-3 min-[1200px]:h-[clamp(134px,10.84vw,156px)] min-[1440px]:h-[calc(var(--home-v2-how-card-height)-260px)] min-[1440px]:px-[clamp(22px,calc(1vw+8px),30px)] min-[1440px]:py-[clamp(16px,calc(0.833vw+4px),24px)]`}
                >
                  <p
                    className={`font-normal ${isRu ? "text-[clamp(9px,0.875vw,10.5px)] leading-[clamp(15px,1.5vw,18px)] min-[1440px]:text-[clamp(13px,calc(0.55vw+5px),17px)]" : "text-[clamp(10px,1vw,12px)] leading-[clamp(18px,2vw,24px)] min-[1440px]:text-[clamp(14px,calc(0.625vw+5px),18px)]"} min-[1440px]:leading-[clamp(24px,calc(0.625vw+15px),31px)]`}
                    style={{ fontFamily: "Montserrat, var(--font-body)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function HomeV2HowItWorks({ t, lang }) {
  return (
    <section
      id="how-it-works"
      data-home-v2-how
      data-home-v2-how-it-works
      data-how-section
      className={`relative isolate bg-epicDark text-epicWhite scroll-mt-24 min-[1440px]:h-[720px] min-[1440px]:overflow-hidden ${lang === "en" ? "-mt-8 min-[640px]:mt-0" : ""}`}
      data-desktop-approved="true"
    >
      {lang === "en" && <HomeV2HowItWorksMobileEn steps={t.howSteps} title={t.howTitle} titleEnd={t.howTitleEnd} />}

      <HomeV2HowItWorksFluidDesktop steps={t.howSteps} title={t.howTitle} titleEnd={t.howTitleEnd} lang={lang} />
    </section>
  );
}

const reviewsAssetRoot = "/design/home-v2/reviews";

const desktopEnReviews = [
  { name: "Evgenia", text: "Great lessons! The team made us fall in love with surfing! 🔥.", date: "1 week ago" },
  { name: "Dmitry Kharlamov", text: "Excellent team!\nPasha is a very cool instructor! 👍", date: "2 week ago" },
  { name: "Peter Thanh", text: "Despite of the bad weather the instructor was friendly. 👌", date: "1 month ago" },
];

const desktopReviewGeometry = [
  {
    left: 0.074, top: 15.66, width: 320.556, height: 172.313,
    base: { left: 0.699, top: 1.332, width: 319.158, height: 169.649, rawWidth: 317.579, rawHeight: 166.619, rotation: 0.548 },
    quote: { left: 22.925, top: 24.34, width: 267.799, height: 81.144 },
    divider: { left: 23.959, top: 115.376, width: 260, height: 6, src: `${reviewsAssetRoot}/card-divider-left.svg` },
    name: { left: 23.635, top: 131.625, width: 47.027, height: 13.363 },
    date: { left: 23.86, top: 143.938, width: 65.968, height: 13.665 },
  },
  {
    left: 379.101, top: 14.129, width: 327.522, height: 176.503,
    base: { left: 1.932, top: 3.738, width: 323.658, height: 169.028, rawWidth: 322.442, rawHeight: 166.663, rotation: 0.421 },
    quote: { left: 26.889, top: 26.772, width: 276.639, height: 79.867 },
    divider: { left: 24.45, top: 116.615, width: 260, height: 5, src: `${reviewsAssetRoot}/card-divider-center.svg` },
    name: { left: 24.472, top: 132.486, width: 113.077, height: 13.832 },
    date: { left: 24.635, top: 145.608, width: 65.907, height: 13.325 },
  },
  {
    left: 752.676, top: 5.788, width: 335.294, height: 184.092,
    base: { left: 0.002, top: 0.001, width: 335.291, height: 184.09, rawWidth: 324.629, rawHeight: 162.789, rotation: 0.727 },
    quote: { left: 29.94, top: 32.524, width: 267.499, height: 80.055 },
    divider: { left: 28.322, top: 121.212, width: 261, height: 7, src: `${reviewsAssetRoot}/card-divider.svg` },
    name: { left: 28.379, top: 136.212, width: 74.514, height: 13.18 },
    date: { left: 28.317, top: 148.828, width: 72.069, height: 13.162 },
  },
];

const mobileEnReviewGeometry = [
  {
    group: { left: 28.987, top: 42, width: 333.218, height: 179.12 },
    outline: { left: 2.313, top: 4.436, width: 328.592, height: 170.248, rotation: -1.068 },
    quote: { left: 23.83, top: 25.301, width: 278.377, height: 84.349, rotation: 0.912 },
    divider: { left: 24.904, top: 119.933, width: 267.105, height: 3.354, imageLeft: -1.118, imageTop: -1.118, imageWidth: 270, imageHeight: 6, src: `${reviewsAssetRoot}/mobile-card-divider-01.svg` },
    name: { left: 24.568, top: 136.824, width: 48.885, height: 13.891, rotation: 0.912 },
    date: { left: 24.802, top: 149.623, width: 68.574, height: 14.205, rotation: 0.912 },
  },
  {
    group: { left: 24.722, top: 235.001, width: 340.459, height: 183.475 },
    outline: { left: 3.405, top: 6.616, width: 333.647, height: 170.244, rotation: -0.941 },
    quote: { left: 27.951, top: 27.83, width: 287.566, height: 83.022, rotation: 0.616 },
    divider: { left: 25.416, top: 121.221, width: 267.662, height: 2.794, imageLeft: -1.118, imageTop: -1.118, imageWidth: 270, imageHeight: 6, src: `${reviewsAssetRoot}/mobile-card-divider-02.svg` },
    name: { left: 25.439, top: 137.719, width: 117.543, height: 14.378, rotation: 0.616 },
    date: { left: 25.608, top: 151.359, width: 68.511, height: 13.851, rotation: 0.616 },
  },
  {
    group: { left: 21, top: 432, width: 348.538, height: 191.364 },
    outline: { left: 5.212, top: 10.536, width: 338.114, height: 170.292, rotation: 2.133 },
    quote: { left: 31.122, top: 33.81, width: 278.065, height: 83.217, rotation: 0.678 },
    divider: { left: 29.44, top: 126, width: 268.305, height: 4.145, imageLeft: -1.118, imageTop: -1.118, imageWidth: 271, imageHeight: 7, src: `${reviewsAssetRoot}/mobile-card-divider-03.svg` },
    name: { left: 29.5, top: 141.592, width: 77.458, height: 13.701, rotation: -0.432 },
    date: { left: 29.435, top: 154.707, width: 74.916, height: 13.682, rotation: -0.432 },
  },
];

function MobileEnReviewCard({ review, index }) {
  const geometry = mobileEnReviewGeometry[index];
  const quoteLines = [
    <>Great lessons! The team made us<br />fall in love with surfing! <span className="text-[25.803px]">🔥</span>.</>,
    <>Excellent team!<br />Pasha is a very cool instructor! <span className="text-[25.803px]">👍</span></>,
    <>Despite of the bad weather the<br />instructor was friendly. <span className="text-[25.803px]">👌</span></>,
  ];

  return (
    <article
      data-home-v2-review-card
      data-mobile-review-card={index + 1}
      className="absolute"
      style={{ left: `calc(${geometry.group.left}px + (100% - 390px) / 2)`, top: geometry.group.top, width: geometry.group.width, height: geometry.group.height }}
    >
      <span
        data-review-card-layer="outline"
        aria-hidden="true"
        className="absolute rounded-[2.495px] border-[3.1185px] border-epicWhite"
        style={{ left: geometry.outline.left, top: geometry.outline.top, width: geometry.outline.width, height: geometry.outline.height, transform: `rotate(${geometry.outline.rotation}deg)` }}
      />
      <p
        data-review-quote
        className="absolute z-10 flex items-center justify-center text-center text-[15.052px] font-bold leading-[24.948px] text-epicWhite"
        style={{ left: geometry.quote.left, top: geometry.quote.top, width: geometry.quote.width, height: geometry.quote.height, transform: `rotate(${geometry.quote.rotation}deg)` }}
      >
        <span>{quoteLines[index] ?? review.text}</span>
      </p>
      <span
        data-card-divider
        className="absolute z-10 block"
        style={{ left: geometry.divider.left, top: geometry.divider.top, width: geometry.divider.width, height: geometry.divider.height }}
      >
        <Image
          src={geometry.divider.src}
          alt=""
          width={geometry.divider.imageWidth}
          height={geometry.divider.imageHeight}
          className="absolute max-w-none"
          style={{ left: geometry.divider.imageLeft, top: geometry.divider.imageTop, width: geometry.divider.imageWidth, height: geometry.divider.imageHeight }}
        />
      </span>
      <p data-reviewer-name className="absolute z-10 whitespace-nowrap text-[10.058px] font-black uppercase leading-[14px] text-epicRed" style={{ left: geometry.name.left, top: geometry.name.top, width: geometry.name.width, height: geometry.name.height, transform: `rotate(${geometry.name.rotation}deg)` }}>{review.name}</p>
      <p data-review-date className="absolute z-10 whitespace-nowrap text-[10.058px] font-normal uppercase leading-[14px] text-epicWhite/35" style={{ left: geometry.date.left, top: geometry.date.top, width: geometry.date.width, height: geometry.date.height, transform: `rotate(${geometry.date.rotation}deg)` }}>{review.date}</p>
    </article>
  );
}

function HomeV2ReviewsMobileEn({ googleMapsUrl, title }) {
  const [headingLead, ...headingRest] = title.split(" ");

  return (
    <div data-home-v2-reviews-mobile data-home-v2-reviews-mobile-en className="relative mx-auto h-[925px] w-full max-w-[390px] overflow-visible font-['Montserrat',var(--font-body)]">
      <h2 className="absolute inset-x-0 top-[12px] text-center text-[34px] font-black uppercase leading-[1.05]">
        <span className="text-epicWhite">{headingLead}</span>{" "}<span className="text-epicGray">{headingRest.join(" ")}</span>
      </h2>

      <div className="absolute inset-x-0 top-[72px] h-[853px]">
        {desktopEnReviews.map((review, index) => (
          <MobileEnReviewCard key={review.name} review={review} index={index} />
        ))}

        <div
          data-google-rating-summary-mobile
          className="absolute"
          style={{ left: "calc(111.396px + (100% - 390px) / 2)", top: 637.517, width: 168.876, height: 49.524 }}
        >
          <p data-rating-label className="absolute left-[10.604px] top-[2.483px] h-[16.672px] w-[146.773px] text-right text-[15.052px] font-bold uppercase leading-[17.202px] text-epicGray">Google reviews</p>
          <p data-rating-value className="absolute left-[0.022px] top-[28.832px] h-[17.309px] w-[41.274px] text-right text-[25.803px] font-bold leading-[17.202px] text-epicWhite">5.0</p>
          <div data-rating-stars className="absolute left-[45.361px] top-[27.138px] flex h-[22.385px] w-[123.096px] items-center justify-between" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} data-rating-star className="flex size-[20.749px] items-center justify-center" aria-hidden="true">
                <span className="block h-[16.16px] w-[16.847px] bg-gradient-to-br from-[#FFCD0F] to-[#FF6F47]" style={{ clipPath: "polygon(50% 3%, 61% 36%, 96% 36%, 68% 56%, 79% 91%, 50% 70%, 21% 91%, 32% 56%, 4% 36%, 39% 36%)" }} />
              </span>
            ))}
          </div>
        </div>

        <a
          data-google-maps-cta-mobile
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute block text-epicWhite outline-none focus-visible:ring-2 focus-visible:ring-epicWhite"
          style={{ left: "calc(106px + (100% - 390px) / 2)", top: 725, width: 189.821, height: 71.132 }}
        >
          <Image data-cta-surface src={`${reviewsAssetRoot}/mobile-cta-surface.svg`} alt="" width={173} height={61} className="absolute left-0 top-[0.841px] h-[61px] w-[173px] max-w-none rotate-[1.348deg]" />
          <span data-cta-label className="absolute left-[21.952px] top-0 flex h-[70.693px] w-[167.868px] items-center text-left text-[15.052px] font-black uppercase leading-[19.352px]">
            Read more on<br />Google Maps
          </span>
        </a>
      </div>
    </div>
  );
}

function FluidDesktopReviewCard({ review, index, isRu }) {
  const geometry = desktopReviewGeometry[index];

  return (
    <article
      data-home-v2-review-card
      data-home-v2-review-fluid-card={index + 1}
      className="relative flex h-full min-w-0 flex-col px-[clamp(24px,1.8vw,36px)] pb-[20px] pt-[24px] text-epicWhite"
    >
      <div
        data-review-card-layer="outline"
        className="absolute inset-[4px] rounded-[2.4px] border-[3px] border-epicWhite"
        style={{
          transform: `rotate(${geometry.base.rotation}deg)`,
        }}
        aria-hidden="true"
      />
      <p
        data-review-quote
        className={`relative z-10 mx-auto flex w-full max-w-[440px] flex-1 items-center justify-center whitespace-pre-line text-center font-bold text-epicWhite ${isRu ? "text-[clamp(15px,calc(0.42vw+9px),19px)] leading-[1.45]" : "text-[clamp(16px,calc(0.52vw+8.5px),21px)] leading-[1.45]"}`}
      >
        {review.text}
      </p>
      <Image
        data-card-divider
        src={geometry.divider.src}
        alt=""
        width={320}
        height={geometry.divider.height}
        className="relative z-10 mt-3 h-auto w-full max-w-[440px] self-center"
      />
      <div className="relative z-10 mx-auto mt-2.5 w-full max-w-[440px]">
        <p data-reviewer-name className="whitespace-nowrap text-[clamp(11px,0.45vw,12px)] font-black uppercase leading-[15px] text-epicRed">{review.name}</p>
        <p data-review-date className="mt-0.5 whitespace-nowrap text-[clamp(10px,0.42vw,11px)] font-normal uppercase leading-[14px] text-epicWhite/40">{review.date}</p>
      </div>
    </article>
  );
}

function AdaptiveReviewCard({ review, index }) {
  return (
    <article
      data-home-v2-review-card
      data-home-v2-review-adaptive-card={index + 1}
      className={`flex min-h-[230px] min-w-0 flex-col rounded-[3px] border-[3px] border-epicWhite bg-epicDark px-6 py-6 text-epicWhite ${index === 2 ? "min-[900px]:col-span-2 min-[900px]:mx-auto min-[900px]:w-[min(100%,560px)] min-[1200px]:col-span-1 min-[1200px]:mx-0 min-[1200px]:w-auto" : ""}`}
    >
      <p data-review-quote className="flex flex-1 items-center justify-center whitespace-pre-line text-center text-[clamp(16px,2vw,20px)] font-bold leading-[1.55]">
        {review.text}
      </p>
      <div data-card-divider className="mt-5 h-[3px] w-full bg-[var(--home-v2-deep-teal)]" aria-hidden="true" />
      <p data-reviewer-name className="mt-4 text-[12px] font-black uppercase text-epicRed">{review.name}</p>
      <p data-review-date className="mt-1 text-[11px] font-normal uppercase text-epicWhite/40">{review.date}</p>
    </article>
  );
}

function HomeV2ReviewsAdaptive({ reviews, title, googleMapsUrl, isRu }) {
  const headingWords = title.split(" ");
  const headingLead = isRu ? headingWords[0] : headingWords.slice(0, 2).join(" ");
  const headingRest = isRu ? headingWords.slice(1).join(" ") : headingWords.slice(2).join(" ");

  return (
    <div data-home-v2-reviews-adaptive data-home-v2-reviews-mobile={isRu ? "true" : undefined} className={`${isRu ? "block" : "hidden min-[640px]:block"} min-[900px]:!hidden`}>
      <div className="home-v2-container py-[var(--home-v2-space-standard)]">
        <h2 className="text-center font-['Montserrat',var(--font-heading)] text-[clamp(34px,5vw,48px)] font-black uppercase leading-[1.05]">
          <span className="text-epicWhite">{headingLead}</span>{" "}<span className="text-epicGray">{headingRest}</span>
        </h2>
        <div data-review-cards className="mt-[var(--home-v2-space-heading)] grid gap-6 min-[900px]:grid-cols-2 min-[1200px]:grid-cols-3">
          {reviews.map((review, index) => <AdaptiveReviewCard key={`${review.name}-${index}`} review={review} index={index} />)}
        </div>
        <div data-home-v2-reviews-trust-row className="mt-[var(--home-v2-space-heading)] flex flex-col items-center justify-center gap-5 min-[640px]:flex-row">
          <div data-google-rating-summary className="flex items-center gap-3">
            <span className="text-[28px] font-bold text-epicWhite">5.0</span>
            <span className="flex gap-1" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, index) => <span key={index} className="block size-5 bg-[#F8972D]" style={{ clipPath: "polygon(50% 3%, 61% 36%, 96% 36%, 68% 56%, 79% 91%, 50% 70%, 21% 91%, 32% 56%, 4% 36%, 39% 36%)" }} aria-hidden="true" />)}
            </span>
          </div>
          <a data-google-maps-cta href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-[3px] border-2 border-epicWhite px-6 text-center text-[13px] font-black uppercase leading-tight text-epicWhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicRed">
            {isRu ? "Читать отзывы на Google Maps" : "Read more on Google Maps"}
          </a>
        </div>
      </div>
    </div>
  );
}

export function HomeV2Reviews({ t, googleMapsUrl }) {
  const isRu = t.reviewsTitle !== "The best surf vibes";
  const headingWords = t.reviewsTitle.split(" ");
  const headingLead = isRu ? headingWords[0] : headingWords.slice(0, 2).join(" ");
  const headingRest = isRu ? headingWords.slice(1) : headingWords.slice(2);
  const desktopReviews = isRu ? t.reviewsList : desktopEnReviews;

  return (
    <section id="reviews" data-home-v2-reviews className="relative z-20 overflow-visible bg-epicDark text-epicWhite scroll-mt-24">
        <div data-home-v2-reviews-grid className="relative mx-auto hidden h-[684px] w-full min-[900px]:block">
          <div
            data-home-v2-reviews-desktop
            data-home-v2-reviews-desktop-en
            className="relative mx-auto hidden h-[684px] w-[calc(100%-(2*var(--home-v2-fluid-gutter)))] min-[900px]:block"
          >
            <div
              data-surf-family-bridge-illustration
              aria-hidden="true"
              className="pointer-events-none absolute left-[63%] top-[-139px] z-10 h-auto w-[clamp(364px,20vw,397px)] overflow-visible"
            >
              <Image src={`${reviewsAssetRoot}/surf-family-bridge-full-v2.svg`} alt="" width={364} height={337} className="block h-auto w-full max-w-none" />
            </div>

            <div data-reviews-section-heading className="absolute left-1/2 top-[102px] z-20 h-[38.592px] w-[clamp(1150px,calc(49vw+444px),1640px)] -translate-x-1/2">
              <div className="relative h-[38.592px] w-[min(100%,710px)]">
                <div data-heading-teal-offset className="absolute inset-0" aria-hidden="true" />
                <span data-heading-the-best className={`absolute left-0 top-0 h-[38.592px] whitespace-nowrap font-black uppercase leading-[42.152px] text-epicWhite ${isRu ? "w-[210px] text-[42px]" : "w-[252.311px] text-[48px]"}`}>{headingLead}</span>
                <span data-heading-surf-vibes className={`absolute top-[1px] h-[35.412px] whitespace-nowrap font-black uppercase leading-[42.152px] text-epicGray ${isRu ? "left-[240px] w-[470px] text-[38px]" : "left-[271px] w-[312.228px] text-[48px]"}`}>{headingRest.join(" ")}</span>
              </div>
            </div>

            <div data-review-cards className="absolute left-1/2 top-[230px] z-20 grid h-[220px] w-[clamp(1150px,calc(49vw+444px),1640px)] -translate-x-1/2 grid-cols-3 gap-[clamp(40px,3vw,56px)]">
              {desktopReviews.map((review, index) => (
                <FluidDesktopReviewCard key={review.name} review={review} index={index} isRu={isRu} />
              ))}
            </div>

            <div data-home-v2-reviews-trust-row className="absolute left-1/2 top-[503px] z-20 flex -translate-x-1/2 items-center gap-[clamp(48px,5vw,96px)]">
              <div data-google-rating-summary className="relative h-[61.301px] w-[211.249px] shrink-0">
                <p data-rating-label className="absolute left-[0.873px] top-[2.908px] h-[20.839px] w-[183.467px] text-[18.815px] font-bold uppercase leading-[21.503px] text-epicGray">{isRu ? "Отзывы Google" : "Google reviews"}</p>
                <p data-rating-value className="absolute left-[0.191px] top-[35.437px] h-[21.636px] w-[51.593px] text-[32.254px] font-bold leading-[21.503px] text-epicWhite">5.0</p>
                <div data-rating-stars className="absolute left-[56.864px] top-[33.32px] flex h-[27.982px] w-[153.87px] items-center gap-[6.044px]">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      data-rating-star
                      className="block size-[25.936px] shrink-0 bg-[#F8972D]"
                      style={{ clipPath: "polygon(50% 3%, 61% 36%, 96% 36%, 68% 56%, 79% 91%, 50% 70%, 21% 91%, 32% 56%, 4% 36%, 39% 36%)" }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <a
                data-google-maps-cta
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-[88.915px] w-[237.276px] shrink-0 text-epicWhite outline-none focus-visible:ring-2 focus-visible:ring-epicWhite"
              >
                <span data-cta-surface className="absolute left-[0.019px] top-[1.051px] block h-[82.881px] w-[214.684px]" aria-hidden="true">
                  <Image src={`${reviewsAssetRoot}/cta-surface.svg`} alt="" width={216} height={76} className="absolute left-0 top-[4px] h-[76px] w-[216px] max-w-none" />
                </span>
                <span data-cta-label className="absolute left-[27.44px] top-0 flex h-[88.367px] w-[209.835px] items-center text-left text-[18.815px] font-black uppercase leading-[24.19px]">
                  {isRu ? <>Читать отзывы<br />на Google Maps</> : <>Read more on<br />Google Maps</>}
                </span>
              </a>
            </div>
          </div>
        </div>

      {!isRu && <div className="min-[640px]:hidden"><HomeV2ReviewsMobileEn googleMapsUrl={googleMapsUrl} title={t.reviewsTitle} /></div>}
      <HomeV2ReviewsAdaptive reviews={desktopReviews} title={t.reviewsTitle} googleMapsUrl={googleMapsUrl} isRu={isRu} />
    </section>
  );
}

const faqAssetRoot = "/design/home-v2/faq";
const faqControlAssets = [
  `${faqAssetRoot}/control-surface-01.svg`,
  `${faqAssetRoot}/control-surface-02.svg`,
  `${faqAssetRoot}/control-surface-03.svg`,
  `${faqAssetRoot}/control-surface-04.svg`,
];

const mobileFaqGeometry = [
  {
    rowHeight: 71,
    gapAfter: 47,
    questionWidth: 213,
    questionHeight: 52,
    control: { left: 296, top: 12, width: 33.759, height: 28.614 },
    surface: `${faqAssetRoot}/mobile-control-surface-01.svg`,
    plus: `${faqAssetRoot}/mobile-plus-icon-01.svg`,
    plusPosition: { left: 5.04, top: 1.513 },
    divider: `${faqAssetRoot}/mobile-divider-01.svg`,
  },
  {
    rowHeight: 76,
    gapAfter: 50,
    questionWidth: 181,
    questionHeight: 60,
    control: { left: 297, top: 16, width: 32.858, height: 27.531 },
    surface: `${faqAssetRoot}/mobile-control-surface-02.svg`,
    plus: `${faqAssetRoot}/mobile-plus-icon-02.svg`,
    plusPosition: { left: 4.589, top: 0.97 },
    divider: `${faqAssetRoot}/mobile-divider-02.svg`,
  },
  {
    rowHeight: 67,
    gapAfter: 49,
    questionWidth: 194,
    questionHeight: 50,
    control: { left: 296, top: 11, width: 33.759, height: 28.614 },
    surface: `${faqAssetRoot}/mobile-control-surface-03.svg`,
    plus: `${faqAssetRoot}/mobile-plus-icon-03.svg`,
    plusPosition: { left: 5.04, top: 1.513 },
    divider: `${faqAssetRoot}/mobile-divider-03.svg`,
  },
  {
    rowHeight: 71,
    gapAfter: 76,
    questionWidth: 281,
    questionHeight: 54,
    control: { left: 297, top: 13, width: 32.858, height: 27.531 },
    surface: `${faqAssetRoot}/mobile-control-surface-04.svg`,
    plus: `${faqAssetRoot}/mobile-plus-icon-04.svg`,
    plusPosition: { left: 4.032, top: 1.513 },
    divider: `${faqAssetRoot}/mobile-divider-04.svg`,
  },
];

export function HomeV2FAQ({ lang = "en", title, titleEnd, items }) {
  const [openFaq, setOpenFaq] = useState(null);
  const reduceMotion = useReducedMotion();
  const isRu = lang === "ru";

  const renderItems = ({ desktop = false } = {}) => items.map((item, index) => {
    const isOpen = openFaq === index;
    const answerId = `home-v2-faq-answer-${desktop ? "desktop-" : ""}${index}`;

    return (
      <div
        key={item.q}
        data-faq-item
        className={desktop
          ? `relative box-border border-b-[0.9px] border-epicWhite transition-colors ${isOpen ? "bg-epicWhite/[0.04]" : ""}`
          : `border-b border-epicWhite/40 transition-colors ${isOpen ? "bg-epicWhite/[0.035]" : ""}`}
      >
        <button
          type="button"
          data-faq-control
          onClick={() => setOpenFaq(isOpen ? null : index)}
          aria-expanded={isOpen}
          aria-controls={answerId}
          className={desktop
            ? "group relative z-10 grid min-h-[88.2px] w-full grid-cols-[minmax(0,1fr)_49px] items-center gap-6 py-[18px] text-left text-epicWhite outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-epicRed"
            : "group grid min-h-[80px] w-full grid-cols-[minmax(0,1fr)_44px] items-center gap-5 py-4 text-left text-epicWhite outline-none transition focus-visible:bg-epicWhite/8 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-epicRed md:min-h-[88px] md:grid-cols-[minmax(0,1fr)_48px]"}
        >
          {desktop ? (
            <>
              <span
                data-faq-question
                className={`min-w-0 pr-2 font-['Segoe_UI',var(--font-body)] font-bold leading-[1.375] ${isRu ? "text-[18px]" : "text-[21.6px]"}`}
              >
                {item.q}
              </span>
              <span data-faq-expand-control className="relative h-[61px] w-[49px] self-center" aria-hidden="true">
                <Image src={faqControlAssets[index]} alt="" width={49} height={62} className="absolute inset-0 h-auto w-[49px] max-w-none" />
                <Image
                  data-faq-plus-icon
                  src={`${faqAssetRoot}/plus-icon.svg`}
                  alt=""
                  width={22}
                  height={22}
                  className={`absolute left-[14.1px] top-[3.3px] h-[21.6px] w-[21.6px] max-w-none transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                />
              </span>
            </>
          ) : (
            <>
              <span data-faq-question className="text-[17px] font-bold normal-case leading-[1.45] md:text-xl">{item.q}</span>
              <span data-faq-expand-control className="flex h-9 w-9 items-center justify-center rounded-[2px] border border-epicWhite/55 transition-colors group-hover:border-epicWhite md:h-10 md:w-10">
                <Plus data-faq-plus-icon className={`h-5 w-5 shrink-0 text-epicWhite transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`} />
              </span>
            </>
          )}
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={answerId}
              role="region"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduceMotion ? { display: "none" } : { height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.2, 0.7, 0.2, 1] }}
              className="overflow-hidden"
            >
              <p className={desktop
                ? "max-w-[610px] pb-6 pr-8 font-['Segoe_UI',var(--font-body)] text-[16px] font-semibold leading-6 text-epicWhite/80"
                : "max-w-4xl pb-6 pr-16 text-[15px] font-semibold leading-6 text-epicWhite/78 md:pb-8 md:leading-6"}
              >
                {item.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  });

  const renderMobileEnItems = () => items.map((item, index) => {
    const geometry = mobileFaqGeometry[index];
    const isOpen = openFaq === index;
    const answerId = `home-v2-faq-answer-mobile-en-${index}`;

    return (
      <div
        key={item.q}
        data-faq-item
        data-faq-mobile-item={index + 1}
        className={`relative transition-colors ${isOpen ? "bg-epicWhite/[0.04]" : ""}`}
        style={{ marginBottom: geometry.gapAfter }}
      >
        <button
          type="button"
          data-faq-control
          onClick={() => setOpenFaq(isOpen ? null : index)}
          aria-expanded={isOpen}
          aria-controls={answerId}
          className="group relative block w-[330px] text-left text-epicWhite outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-epicRed"
          style={{ height: geometry.rowHeight }}
        >
          <span
            data-faq-question
            className="absolute left-0 top-0 flex items-center font-['Segoe_UI',var(--font-body)] text-[18px] font-bold normal-case leading-[32px] text-epicWhite"
            style={{ width: geometry.questionWidth, height: geometry.questionHeight }}
          >
            {item.q}
          </span>
          <span
            data-faq-expand-control
            className="absolute"
            style={geometry.control}
            aria-hidden="true"
          >
            <Image
              src={geometry.surface}
              alt=""
              width={55}
              height={70}
              unoptimized
              className="pointer-events-none absolute left-[-10.84px] top-[-2.167px] h-auto w-[55px] max-w-none"
            />
            <Image
              data-faq-plus-icon
              src={geometry.plus}
              alt=""
              width={25}
              height={25}
              unoptimized
              className={`pointer-events-none absolute h-[24.192px] w-[24.192px] max-w-none transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
              style={geometry.plusPosition}
            />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={answerId}
              role="region"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduceMotion ? { display: "none" } : { height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.2, 0.7, 0.2, 1] }}
              className="overflow-hidden"
            >
              <p className="w-[281px] pb-[18px] pt-2 font-['Segoe_UI',var(--font-body)] text-[15px] font-semibold leading-6 text-epicWhite/80">
                {item.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <Image
          data-faq-divider
          src={geometry.divider}
          alt=""
          width={330}
          height={1}
          unoptimized
          className="pointer-events-none absolute bottom-[-1px] left-0 h-px w-[330px] max-w-none"
        />
      </div>
    );
  });

  return (
    <section id="faq" data-home-v2-faq className="relative bg-epicDark text-epicWhite scroll-mt-24">
        <div data-home-v2-faq-desktop data-home-v2-faq-desktop-en className="relative hidden min-h-[619px] w-full min-[900px]:block">
          <div
            data-home-v2-faq-composition
            className="relative mx-auto grid w-fit grid-cols-[268px_clamp(691.2px,calc(691.2px+((100vw-1440px)*0.13)),760px)] gap-[clamp(197px,calc(197px+((100vw-1440px)*0.03)),220px)] pb-[100px] pt-[123px]"
          >
            <div data-home-v2-faq-art-column className="relative min-h-[396px] w-[268px]">
              <h2
                data-faq-heading
                className={`absolute left-[78px] top-[-18px] font-['Montserrat',var(--font-heading)] font-black uppercase ${isRu ? "w-[360px] text-[36px] leading-[38px]" : "w-[111.386px] text-[48px] leading-[42.152px]"}`}
              >
                {isRu ? `${title} ${titleEnd || ""}` : title}
              </h2>
              <Image
                data-faq-illustration
                src={`${faqAssetRoot}/faq-illustration.svg`}
                alt=""
                width={268}
                height={338}
                className="pointer-events-none absolute left-0 top-[58px] h-[337.622px] w-[268px] max-w-none"
              />
              <Image
                data-faq-epic-logo
                src={`${faqAssetRoot}/faq-epic-logo.svg`}
                alt=""
                width={40}
                height={18}
                className="pointer-events-none absolute left-[151px] top-[235px] h-[17.696px] w-[39.6px] max-w-none"
              />
            </div>
            <div data-faq-accordion className="min-w-0 space-y-[14.4px]">
              {renderItems({ desktop: true })}
            </div>
          </div>
        </div>

      {!isRu && (
        <div data-home-v2-faq-mobile-en className="relative min-h-[617px] w-full overflow-hidden bg-epicDark sm:hidden">
          <div
            data-faq-heading
            data-faq-mobile-heading
            className="absolute left-1/2 top-[19px] h-[42.999px] w-[82.289px] -translate-x-1/2"
          >
            <h2
              className="absolute left-[0.289px] top-[-13px] font-['Montserrat',var(--font-heading)] text-[36px] font-black uppercase leading-[42.152px] text-epicWhite"
            >
              {title}
            </h2>
          </div>
          <div data-faq-mobile-accordion className="relative ml-[23px] w-[330px] pt-[110px]">
            {renderMobileEnItems()}
          </div>
        </div>
      )}

      <div data-home-v2-faq-adaptive className={`min-[900px]:!hidden ${isRu ? "block" : "hidden min-[640px]:block"}`}>
        <div className="home-v2-container py-[var(--home-v2-space-standard)]">
          <h2 data-faq-heading className="text-center font-['Montserrat',var(--font-heading)] text-[clamp(34px,5vw,48px)] font-black uppercase leading-none text-epicWhite">{title} {titleEnd || ""}</h2>
          <div className="mt-[var(--home-v2-space-heading)] grid items-start gap-[var(--home-v2-space-heading)] min-[900px]:grid-cols-[minmax(220px,0.34fr)_minmax(0,0.66fr)]">
            <div className="relative mx-auto hidden h-[clamp(260px,30vw,338px)] w-[clamp(206px,24vw,268px)] min-[900px]:block">
              <Image data-faq-illustration src={`${faqAssetRoot}/faq-illustration.svg`} alt="" fill sizes="268px" className="object-contain" />
            </div>
            <div data-faq-accordion className="border-t border-epicWhite/40">
              {renderItems()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeV2Events({ t, openEventGallery }) {
  const isRu = t.eventsTitle === "Наши эвенты";
  const [leadEvent, ...secondaryEvents] = t.eventsItems;
  const [headingLead, ...headingRest] = t.eventsTitle.split(" ");
  const desktopCards = [
    {
      frame: "min-[1440px]:rotate-[-0.501deg]",
      imagePosition: "50% 54.31%",
      cta: "min-[1440px]:rotate-[3.002deg]",
      surface: "/design/home-v2/events/cta-surface-384-493.svg",
    },
    {
      frame: "min-[1440px]:rotate-[1.22deg]",
      imagePosition: "50% 56.43%",
      cta: "min-[1440px]:rotate-[-0.44deg]",
      surface: "/design/home-v2/events/cta-surface-384-484.svg",
    },
    {
      frame: "min-[1440px]:rotate-[0.088deg]",
      imagePosition: "50% 84.87%",
      cta: "min-[1440px]:rotate-[1.824deg]",
      surface: "/design/home-v2/events/cta-surface.svg",
    },
  ];

  const cardShadow = {
    boxShadow: "0 8.735px 19.487px rgba(0,0,0,.10), 0 34.942px 34.942px rgba(0,0,0,.09), 0 78.619px 47.037px rgba(0,0,0,.05)",
  };

  const mobileCards = [
    {
      event: secondaryEvents[0],
      key: "school-birthday",
      frame: "left-[20.848px] top-[518.53px] h-[258.001px] w-[351.032px]",
      photo: "left-[-2.848px] top-[-1.53px] h-[136.299px] w-[350.545px]",
      objectPosition: "50% 54.31%",
      title: "left-[9.708px] top-[139.06px] h-[40.817px] w-[271.049px]",
      description: "left-[9.488px] top-[179.877px] h-[55.223px] w-[325.13px]",
      cta: "left-[249.678px] top-[241.342px] h-[26.012px] w-[86.387px] rotate-[2.501deg]",
      ctaSurface: "/design/home-v2/events/mobile-cta-school-birthday.svg",
    },
    {
      event: secondaryEvents[1],
      key: "sunset",
      frame: "left-[17.433px] top-[827.283px] h-[258.975px] w-[353.225px]",
      photo: "left-[-1.999px] top-[-1.981px] h-[129.985px] w-[353.252px]",
      objectPosition: "50% 56.43%",
      title: "left-[11.077px] top-[131.922px] h-[41.667px] w-[311.612px]",
      description: "left-[11.651px] top-[177.5px] h-[56.11px] w-[325.598px]",
      cta: "left-[251.742px] top-[243.305px] h-[26.271px] w-[86.635px] rotate-[0.78deg]",
      ctaSurface: "/design/home-v2/events/mobile-cta-sunset.svg",
    },
    {
      event: secondaryEvents[2],
      key: "community",
      frame: "left-[19px] top-[1138.448px] h-[258.552px] w-[350.592px]",
      photo: "left-[-4.069px] top-[-1.468px] h-[129.079px] w-[353.75px]",
      objectPosition: "50% 84.87%",
      title: "left-[9.72px] top-[135.52px] h-[41.294px] w-[299.792px]",
      description: "left-[9.832px] top-[184.1px] h-[55.74px] w-[325.036px]",
      cta: "left-[248.412px] top-[242.988px] h-[26.151px] w-[86.484px] rotate-[1.912deg]",
      ctaSurface: "/design/home-v2/events/mobile-cta-community.svg",
    },
  ];

  return (
    <section id="events" data-home-v2-events className={`scroll-mt-24 bg-epicDark px-4 py-16 text-epicWhite md:px-6 md:py-20 min-[1440px]:!px-0 min-[1440px]:pb-[96px] min-[1440px]:pt-[124px] ${isRu ? "" : "max-[639px]:h-[1420px] max-[639px]:!px-0 max-[639px]:!py-0"}`}>
      {!isRu && (
        <div data-home-v2-events-mobile className="relative mx-auto h-[1420px] w-full max-w-[390px] overflow-hidden sm:hidden">
          <article
            data-home-v2-mobile-event-card="featured"
            className="absolute left-[19px] top-[23px] h-[459.991px] w-[352.803px] overflow-visible rounded-[1.617px] border-[1.617px] border-epicWhite"
            style={{ boxShadow: "0 12.312px 27.16px rgba(0,0,0,.10), 0 49.25px 49.25px rgba(0,0,0,.09), 0 110.812px 66.632px rgba(0,0,0,.05)" }}
          >
            <div data-home-v2-mobile-event-photo className="absolute left-[-1px] top-[-1px] h-[311.994px] w-[351.5px] overflow-hidden rounded-t-[1.617px]">
              <Image src={leadEvent.image} alt={leadEvent.title} fill sizes="352px" className="object-cover" style={{ objectPosition: "50% 61.51%" }} />
            </div>
            <h3 data-home-v2-mobile-event-title className="absolute left-[9.89px] top-[337.919px] flex h-[44.283px] w-[259.395px] items-center font-['Arial',sans-serif] text-[17.382px] font-bold leading-[21.728px] text-epicWhite">{leadEvent.title}</h3>
            <p data-home-v2-mobile-event-description className="absolute left-[9.731px] top-[406.304px] flex h-[37.361px] w-[334.953px] items-center font-['Segoe_UI',Arial,sans-serif] text-[13.037px] font-normal leading-[16.296px] text-epicWhite">{leadEvent.desc}</p>
            <button
              data-home-v2-mobile-event-cta
              type="button"
              onClick={() => openEventGallery(leadEvent.galleryKey)}
              className="absolute left-[251.4px] top-[446.244px] h-[25.999px] w-[86.482px] rotate-[1.655deg] border-0 bg-transparent p-0 text-epicDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicWhite"
            >
              <Image aria-hidden="true" src="/design/home-v2/events/mobile-cta-featured.svg" alt="" fill sizes="88px" className="object-fill" />
              <span className="absolute left-[3.559px] top-[5.958px] z-10 h-[16.918px] w-[79.419px] text-left font-['Montserrat',var(--font-heading)] text-[9.72px] font-black uppercase leading-[15.644px]">{leadEvent.buttonLabel}</span>
            </button>
          </article>

          {mobileCards.map(({ event, key, frame, photo, objectPosition, title, description, cta, ctaSurface }) => (
            <article key={key} data-home-v2-mobile-event-card={key} className={`absolute overflow-visible rounded-[2.68px] border-[2.68px] border-epicWhite ${frame}`} style={cardShadow}>
              <div data-home-v2-mobile-event-photo className={`absolute overflow-hidden rounded-t-[2.68px] ${photo}`}>
                <Image src={event.image} alt={event.title} fill sizes="354px" className="object-cover" style={{ objectPosition }} />
              </div>
              <h3 data-home-v2-mobile-event-title className={`absolute flex items-center font-['Arial',sans-serif] text-[21.609px] font-bold leading-[25.091px] text-epicWhite ${title}`}>{event.title}</h3>
              <p data-home-v2-mobile-event-description className={`absolute flex items-center font-['Segoe_UI',Arial,sans-serif] text-[16.807px] font-normal leading-[16.68px] text-epicWhite ${description}`}>{event.desc}</p>
              <button
                data-home-v2-mobile-event-cta
                type="button"
                onClick={() => openEventGallery(event.galleryKey)}
                className={`absolute border-0 bg-transparent p-0 text-epicDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicWhite ${cta}`}
              >
                <Image aria-hidden="true" src={ctaSurface} alt="" fill sizes="88px" className="object-fill" />
                <span className="absolute left-[3.6px] top-[5.9px] z-10 h-[18px] w-[79.5px] text-left font-['Montserrat',var(--font-heading)] text-[9.724px] font-black uppercase leading-[19.448px]">{event.buttonLabel}</span>
              </button>
            </article>
          ))}
        </div>
      )}
      <div data-home-v2-events-canvas className="relative mx-auto max-w-7xl min-[1440px]:w-[calc(100%-(2*var(--home-v2-fluid-gutter)))] min-[1440px]:!max-w-none">
        <div data-home-v2-events-heading className={`${isRu ? "" : "hidden min-[640px]:block min-[1440px]:flex"} text-center font-['Montserrat',var(--font-heading)] text-[clamp(34px,5vw,48px)] font-black uppercase leading-none min-[1440px]:mx-auto min-[1440px]:flex min-[1440px]:w-[clamp(1236px,80vw,1680px)] min-[1440px]:items-start min-[1440px]:pl-[clamp(82px,6vw,118px)] min-[1440px]:text-left min-[1440px]:text-[48px] min-[1440px]:leading-[42.152px]`}>
          <h2 className="text-epicWhite min-[1440px]:hidden">{t.eventsTitle}</h2>
          <span className="hidden text-epicWhite min-[1440px]:block">{headingLead}</span>
          <span className="hidden text-epicGray min-[1440px]:block">&nbsp;{headingRest.join(" ")}</span>
        </div>

        <div data-home-v2-events-layout data-home-v2-events-adaptive className={`${isRu ? "grid" : "hidden min-[640px]:grid"} mt-12 gap-6 min-[900px]:mt-16 min-[900px]:grid-cols-12 min-[900px]:items-stretch min-[1440px]:mx-auto min-[1440px]:mt-[84px] min-[1440px]:w-[clamp(1236px,80vw,1680px)] min-[1440px]:grid-cols-[minmax(0,1fr)_clamp(395px,22vw,440px)] min-[1440px]:items-start min-[1440px]:gap-[clamp(118px,8vw,220px)]`}>
          <article
            data-home-v2-event-card="featured"
            className="flex h-full flex-col rounded-[3px] border-[3px] border-epicWhite bg-epicDark text-epicWhite min-[900px]:col-span-7 min-[1440px]:col-span-1 min-[1440px]:h-[clamp(860px,48vw,960px)] min-[1440px]:min-w-0 min-[1440px]:rotate-[0.344deg] min-[1440px]:overflow-visible min-[1440px]:bg-transparent"
            style={{ boxShadow: "0 22.846px 50.397px rgba(0,0,0,.10), 0 91.386px 91.386px rgba(0,0,0,.09), 0 205.618px 123.64px rgba(0,0,0,.05)" }}
          >
            <div data-home-v2-event-photo className="relative h-72 overflow-hidden border-b border-epicWhite/35 bg-epicGray md:h-[520px] min-[1440px]:!h-[clamp(590px,32vw,650px)] min-[1440px]:w-full min-[1440px]:shrink-0 min-[1440px]:rounded-t-[3px] min-[1440px]:border-0">
              <Image src={leadEvent.image} alt={leadEvent.title} fill sizes="(min-width: 2560px) 1020px, (min-width: 1920px) 900px, (min-width: 1440px) 700px, (min-width: 1024px) 58vw, 90vw" className={leadEvent.imageClass} />
            </div>
            <div className="relative flex flex-1 flex-col p-6 min-[1440px]:min-h-0 min-[1440px]:px-[24px] min-[1440px]:pb-[28px] min-[1440px]:pt-[32px]">
              <h3 data-home-v2-event-title className="text-3xl font-black leading-tight text-epicWhite min-[1440px]:max-w-[760px] min-[1440px]:font-['Montserrat',var(--font-heading)] min-[1440px]:text-[32.254px] min-[1440px]:leading-[40.317px]">{leadEvent.title}</h3>
              <p data-home-v2-event-description className="mt-3 max-w-xl text-sm font-normal leading-6 text-epicWhite/82 min-[1440px]:mt-[28px] min-[1440px]:max-w-[760px] min-[1440px]:text-[24.19px] min-[1440px]:leading-[30.238px] min-[1440px]:text-epicWhite">{leadEvent.desc}</p>
              <button
                data-home-v2-event-cta
                type="button"
                onClick={() => openEventGallery(leadEvent.galleryKey)}
                className="mt-5 w-fit rounded-[3px] bg-epicRed px-5 py-3 text-xs font-black uppercase text-epicDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-epicWhite min-[1440px]:absolute min-[1440px]:bottom-[-15px] min-[1440px]:right-[-32px] min-[1440px]:mt-0 min-[1440px]:h-[43.309px] min-[1440px]:w-[130.29px] min-[1440px]:rotate-[1.311deg] min-[1440px]:bg-transparent min-[1440px]:p-0"
              >
                <Image aria-hidden="true" src="/design/home-v2/events/cta-surface-384-502.svg" alt="" fill sizes="131px" className="hidden min-[1440px]:block" />
                <span className="relative z-10 min-[1440px]:font-['Montserrat',var(--font-heading)] min-[1440px]:text-[14.514px] min-[1440px]:leading-[29.028px]">{leadEvent.buttonLabel}</span>
              </button>
            </div>
          </article>

          <div data-home-v2-events-column className="grid gap-6 min-[900px]:col-span-5 min-[900px]:h-full min-[900px]:grid-rows-3 min-[1440px]:col-span-1 min-[1440px]:h-auto min-[1440px]:grid-rows-[repeat(3,minmax(0,1fr))] min-[1440px]:gap-[clamp(42px,3vw,58px)]">
            {secondaryEvents.map((event, index) => {
              const geometry = desktopCards[index];
              return (
              <article
                key={event.title}
                data-home-v2-event-card={`secondary-${index + 1}`}
                className={`grid h-full overflow-hidden rounded-[3px] border-[3px] border-epicWhite bg-epicDark text-epicWhite sm:grid-cols-[0.4fr_0.6fr] min-[900px]:grid-cols-[0.42fr_0.58fr] min-[1440px]:relative min-[1440px]:h-[clamp(292px,16vw,310px)] min-[1440px]:!grid-cols-1 min-[1440px]:!grid-rows-[clamp(145px,8.2vw,160px)_minmax(0,1fr)] min-[1440px]:overflow-visible min-[1440px]:bg-transparent ${geometry.frame}`}
                style={cardShadow}
              >
                <div data-home-v2-event-photo className="relative min-h-[210px] overflow-hidden border-b border-epicWhite/35 bg-epicGray sm:min-h-0 sm:border-b-0 sm:border-r sm:border-epicWhite/35 min-[1440px]:rounded-t-[3px] min-[1440px]:border-0">
                  <Image src={event.image} alt={event.title} fill sizes="(min-width: 1440px) 440px, (min-width: 1024px) 18vw, (min-width: 640px) 38vw, 90vw" className={`${event.imageClass} min-[1440px]:object-cover`} style={{ objectPosition: geometry.imagePosition }} />
                </div>
                <div className="relative flex min-h-0 flex-col p-5 min-[1440px]:px-[14px] min-[1440px]:pb-[18px] min-[1440px]:pt-[10px]">
                  <h3 data-home-v2-event-title className={`text-xl font-black leading-tight text-epicWhite min-[1440px]:font-['Montserrat',var(--font-heading)] min-[1440px]:text-[24.19px] min-[1440px]:leading-[28.088px] ${isRu ? "min-[1440px]:!text-[21px] min-[1440px]:!leading-[23px]" : ""}`}>{event.title}</h3>
                  <p data-home-v2-event-description className={`mt-2 text-xs font-normal leading-5 text-epicWhite/82 min-[1440px]:mt-[8px] min-[1440px]:pr-[8px] min-[1440px]:text-[18.815px] min-[1440px]:leading-[18.672px] min-[1440px]:text-epicWhite ${isRu ? "min-[1440px]:!text-[16.5px] min-[1440px]:!leading-[17px]" : ""}`}>{event.desc}</p>
                  <button
                    data-home-v2-event-cta
                    type="button"
                    onClick={() => openEventGallery(event.galleryKey)}
                    className={`mt-auto min-h-10 w-fit rounded-[3px] border-0 bg-epicRed px-4 py-2 text-[10px] font-black uppercase text-epicDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-epicWhite min-[1440px]:absolute min-[1440px]:bottom-[-14px] min-[1440px]:right-[-9px] min-[1440px]:m-0 min-[1440px]:h-[36.116px] min-[1440px]:min-h-0 min-[1440px]:w-[108.793px] min-[1440px]:bg-transparent min-[1440px]:p-0 min-[1440px]:ring-offset-2 min-[1440px]:ring-offset-epicDark ${geometry.cta}`}
                  >
                    <Image aria-hidden="true" src={geometry.surface} alt="" fill sizes="109px" className="hidden min-[1440px]:block" />
                    <span className="relative z-10 min-[1440px]:font-['Montserrat',var(--font-heading)] min-[1440px]:text-[12.095px] min-[1440px]:leading-[24.19px]">{event.buttonLabel}</span>
                  </button>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeV2Gallery({ lang, links, t, eventGalleryGroups, activeGalleryKey, setActiveGalleryKey, activeGalleryGroup, galleryPhotoSrc, InstagramIcon }) {
  const isEnglish = lang === "en";
  const filterGeometry = {
    all: {
      frame: "max-[639px]:left-0 max-[639px]:top-0 max-[639px]:h-[27.041px] max-[639px]:w-[33.257px] min-[1440px]:left-0 min-[1440px]:top-0 min-[1440px]:h-[45.068px] min-[1440px]:w-[55.429px]",
      border: null,
      mobileBorder: null,
    },
    "surf-fest": {
      frame: "max-[639px]:left-[41.824px] max-[639px]:top-[0.763px] max-[639px]:h-[25.144px] max-[639px]:w-[184.066px] min-[1440px]:left-[69.708px] min-[1440px]:top-[1.284px] min-[1440px]:h-[41.907px] min-[1440px]:w-[306.777px]",
      border: "/design/home-v2/gallery/filter-border-384-517.svg",
      mobileBorder: "/design/home-v2/gallery/mobile-filter-border-surf-fest.svg",
    },
    birthday: {
      frame: "max-[639px]:left-[1.001px] max-[639px]:top-[45.237px] max-[639px]:h-[24.473px] max-[639px]:w-[79.835px] min-[1440px]:left-[416.281px] min-[1440px]:top-[2.243px] min-[1440px]:h-[40.788px] min-[1440px]:w-[133.059px]",
      border: "/design/home-v2/gallery/filter-border-384-521.svg",
      mobileBorder: "/design/home-v2/gallery/mobile-filter-border-birthday.svg",
    },
    sunset: {
      frame: "max-[639px]:left-[99.01px] max-[639px]:top-[45.028px] max-[639px]:h-[24.405px] max-[639px]:w-[79.922px] min-[1440px]:left-[579.635px] min-[1440px]:top-[1.897px] min-[1440px]:h-[40.675px] min-[1440px]:w-[133.203px]",
      border: "/design/home-v2/gallery/filter-border-384-527.svg",
      mobileBorder: "/design/home-v2/gallery/mobile-filter-border-sunset.svg",
    },
    community: {
      frame: "max-[639px]:left-[196.871px] max-[639px]:top-[45px] max-[639px]:h-[24.407px] max-[639px]:w-[92.296px] min-[1440px]:left-[742.733px] min-[1440px]:top-[1.855px] min-[1440px]:h-[40.678px] min-[1440px]:w-[153.826px]",
      border: "/design/home-v2/gallery/filter-border.svg",
      mobileBorder: "/design/home-v2/gallery/mobile-filter-border-community.svg",
    },
  };

  const tileGeometry = [
    {
      frame: "col-span-2 row-span-2 min-[1440px]:col-span-1 min-[1440px]:row-span-2",
      photo: "min-[1440px]:object-[47%_50%]",
      mobileFrame: "max-[639px]:left-0 max-[639px]:top-0 max-[639px]:h-[310px] max-[639px]:w-full",
      mobilePhoto: "max-[639px]:!left-[-100px] max-[639px]:!top-0 max-[639px]:!h-[345px] max-[639px]:!w-[522px]",
    },
    {
      frame: "",
      photo: "min-[1440px]:object-[35%_40%]",
      mobileFrame: "max-[639px]:left-0 max-[639px]:top-[320px] max-[639px]:h-[175px] max-[639px]:w-[calc((100%_-_9.722px)/2)]",
      mobilePhoto: "max-[639px]:!left-[-28px] max-[639px]:!top-[-9px] max-[639px]:!h-[186.6px] max-[639px]:!w-[331.733px]",
    },
    {
      frame: "",
      photo: "min-[1440px]:object-[28%_20%]",
      mobileFrame: "max-[639px]:left-[calc((100%_+_9.722px)/2)] max-[639px]:top-[320px] max-[639px]:h-[175px] max-[639px]:w-[calc((100%_-_9.722px)/2)]",
      mobilePhoto: "max-[639px]:!left-[-29px] max-[639px]:!top-[-32px] max-[639px]:!h-[272.481px] max-[639px]:!w-[204.36px]",
    },
    {
      frame: "",
      photo: "min-[1440px]:object-[35%_15%]",
      mobileFrame: "max-[639px]:left-0 max-[639px]:top-[505px] max-[639px]:h-[175px] max-[639px]:w-[calc((100%_-_9.722px)/2)]",
      mobilePhoto: "max-[639px]:!left-[-15.436px] max-[639px]:!top-[-45.236px] max-[639px]:!h-[272.481px] max-[639px]:!w-[204.36px]",
    },
    {
      frame: "",
      photo: "min-[1440px]:object-[23%_23%]",
      mobileFrame: "max-[639px]:left-[calc((100%_+_9.722px)/2)] max-[639px]:top-[505px] max-[639px]:h-[175px] max-[639px]:w-[calc((100%_-_9.722px)/2)]",
      mobilePhoto: "max-[639px]:!left-[-37px] max-[639px]:!top-[-13px] max-[639px]:!h-[319.8px] max-[639px]:!w-[211.8px]",
    },
  ];

  return (
    <section id="gallery" data-home-v2-gallery className={`scroll-mt-24 bg-epicDark px-4 py-16 text-epicWhite md:px-6 md:py-20 min-[1440px]:!px-0 min-[1440px]:pb-[120px] min-[1440px]:pt-[88px] ${isEnglish ? "max-[639px]:h-[1058px] max-[639px]:!px-0 max-[639px]:!py-0" : ""}`}>
      <div data-home-v2-gallery-canvas className={`relative mx-auto max-w-7xl min-[1440px]:w-[calc(100%-(2*var(--home-v2-fluid-gutter)))] min-[1440px]:!max-w-none ${isEnglish ? "max-[639px]:h-full max-[639px]:w-full" : ""}`}>
      <div data-home-v2-gallery-heading className={`${isEnglish ? "max-[639px]:absolute max-[639px]:left-1/2 max-[639px]:top-[68px] max-[639px]:flex max-[639px]:h-[25.291px] max-[639px]:w-[316px] max-[639px]:-translate-x-1/2 max-[639px]:items-center max-[639px]:justify-center max-[639px]:font-['Montserrat',var(--font-heading)] max-[639px]:text-[36px] max-[639px]:font-black max-[639px]:uppercase max-[639px]:leading-[25.291px]" : ""} text-center font-['Montserrat',var(--font-heading)] text-[clamp(34px,5vw,48px)] font-black uppercase leading-none min-[1440px]:flex min-[1440px]:items-start min-[1440px]:justify-center min-[1440px]:text-[48px] min-[1440px]:leading-[42.152px]`}>
        <h2 className={`${isEnglish ? "max-[639px]:hidden" : ""} text-epicWhite min-[1440px]:hidden`}>Epic <span className="text-epicGray">moments</span></h2>
        <span className={`${isEnglish ? "max-[639px]:block" : ""} hidden text-epicWhite min-[1440px]:block`}>EPIC</span>
        <span className={`${isEnglish ? "max-[639px]:block" : ""} hidden text-epicGray min-[1440px]:block`}>&nbsp;MOMENTS</span>
      </div>
      <div data-home-v2-gallery-filters className={`mb-8 mt-12 flex flex-wrap gap-2 md:mt-16 min-[1440px]:relative min-[1440px]:mx-auto min-[1440px]:mb-0 min-[1440px]:mt-[48px] min-[1440px]:h-[45.068px] min-[1440px]:w-[896.559px] min-[1440px]:block ${isEnglish ? "max-[639px]:absolute max-[639px]:left-[20px] max-[639px]:top-[120px] max-[639px]:m-0 max-[639px]:h-[69.709px] max-[639px]:w-[289.167px] max-[639px]:block" : ""}`}>
        {eventGalleryGroups.map((group) => (
          <button
            key={group.key}
            data-home-v2-gallery-filter={group.key}
            type="button"
            onClick={() => setActiveGalleryKey(group.key)}
            aria-pressed={activeGalleryKey === group.key}
            className={`relative min-h-11 px-4 py-2 font-['Montserrat',var(--font-body)] text-[11px] font-normal uppercase text-epicWhite outline-none focus-visible:ring-2 focus-visible:ring-epicRed focus-visible:ring-offset-2 focus-visible:ring-offset-epicDark min-[640px]:border min-[1440px]:absolute min-[1440px]:min-h-0 min-[1440px]:border-0 min-[1440px]:p-0 min-[1440px]:text-[16px] min-[1440px]:leading-[29.028px] ${activeGalleryKey === group.key ? "min-[640px]:border-epicRed max-[639px]:border-epicRed" : "min-[640px]:border-epicWhite/70 max-[639px]:border-epicWhite/70"} ${isEnglish ? "max-[639px]:absolute max-[639px]:min-h-0 max-[639px]:border-0 max-[639px]:p-0 max-[639px]:text-[9.6px] max-[639px]:leading-[17.417px]" : "max-[639px]:border"} ${filterGeometry[group.key].frame}`}
          >
            {filterGeometry[group.key].border ? (
              <>
                {isEnglish && <span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-epicWhite transition-colors max-[639px]:block" style={{ backgroundColor: activeGalleryKey === group.key ? "#FE746A" : "#F6F6F6", mask: `url(${filterGeometry[group.key].mobileBorder}) center / 100% 100% no-repeat`, WebkitMask: `url(${filterGeometry[group.key].mobileBorder}) center / 100% 100% no-repeat` }} />}
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-epicWhite transition-colors min-[1440px]:block" style={{ backgroundColor: activeGalleryKey === group.key ? "#FE746A" : "#F6F6F6", mask: `url(${filterGeometry[group.key].border}) center / 100% 100% no-repeat`, WebkitMask: `url(${filterGeometry[group.key].border}) center / 100% 100% no-repeat` }} />
              </>
            ) : (
              <span aria-hidden="true" className={`pointer-events-none absolute left-[1px] top-[1.9px] h-[41.322px] w-[52.997px] rotate-[0.448deg] rounded-[3px] border-2 transition-colors ${isEnglish ? "max-[639px]:left-[0.73px] max-[639px]:top-[1.124px] max-[639px]:h-[24.793px] max-[639px]:w-[31.798px] max-[639px]:rounded-[1.8px] max-[639px]:border-[1.2px]" : ""} ${activeGalleryKey === group.key ? "border-epicRed" : "border-epicWhite"}`} />
            )}
            <span className="relative z-10">{group.label}</span>
          </button>
        ))}
      </div>
      <div data-home-v2-gallery-grid className={`grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[240px] min-[1440px]:mx-auto min-[1440px]:mt-[44px] min-[1440px]:aspect-[2.067/1] min-[1440px]:w-[clamp(1241px,calc(100vw-192px),1900px)] min-[1440px]:grid-cols-[minmax(0,1fr)_minmax(0,0.483fr)_minmax(0,0.483fr)] min-[1440px]:grid-rows-2 min-[1440px]:gap-[clamp(20px,1.65vw,32px)] ${isEnglish ? "max-[639px]:absolute max-[639px]:left-[20px] max-[639px]:top-[207px] max-[639px]:block max-[639px]:h-[680px] max-[639px]:w-[calc(100%_-_40px)]" : ""}`}>
        {activeGalleryGroup.photos.slice(0, 5).map((photo, index) => (
          <div key={`${activeGalleryGroup.key}-${photo}-${index}`} data-home-v2-gallery-item={index + 1} className={`group relative overflow-hidden bg-epicGray ${isEnglish ? `max-[639px]:absolute ${tileGeometry[index].mobileFrame}` : ""} ${tileGeometry[index].frame}`}>
            <Image
              src={galleryPhotoSrc(photo)}
              alt={`${activeGalleryGroup.label} photo ${index + 1} - Epic Surf School Da Nang`}
              width={907}
              height={600}
              sizes={index === 0 ? "(min-width: 2560px) 930px, (min-width: 1920px) 840px, (min-width: 1440px) 600px, (max-width: 639px) 522px, 100vw" : "(min-width: 2560px) 450px, (min-width: 1920px) 400px, (min-width: 1440px) 290px, (max-width: 639px) 332px, 50vw"}
              className={`absolute inset-0 h-full w-full max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.025] ${isEnglish ? tileGeometry[index].mobilePhoto : ""} ${tileGeometry[index].photo}`}
            />
          </div>
        ))}
      </div>
      <PosterLink data-home-v2-gallery-instagram href={links.instagram} target="_blank" rel="noopener noreferrer" className={`mt-10 min-[1440px]:hidden ${isEnglish ? "max-[639px]:absolute max-[639px]:left-1/2 max-[639px]:top-[921px] max-[639px]:m-0 max-[639px]:h-[56px] max-[639px]:min-h-0 max-[639px]:w-[280px] max-[639px]:-translate-x-1/2 max-[639px]:justify-between max-[639px]:rounded-[3px] max-[639px]:border-0 max-[639px]:px-[18px] max-[639px]:py-0 max-[639px]:font-['Segoe_UI',sans-serif] max-[639px]:text-[14px] max-[639px]:leading-[21.638px] max-[639px]:tracking-[0.379px] max-[639px]:shadow-none max-[639px]:hover:translate-y-0 max-[639px]:hover:bg-epicWhite max-[639px]:active:scale-100 max-[639px]:[&_svg]:h-8 max-[639px]:[&_svg]:w-8 max-[639px]:[&_svg]:stroke-[3]" : ""}`}>
        {t.galleryInstagram}
        <InstagramIcon />
      </PosterLink>
      </div>
    </section>
  );
}
