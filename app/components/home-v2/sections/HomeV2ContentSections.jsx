"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus } from "lucide-react";
import { PosterButton, PosterLink, PosterSection, TornLabel } from "../PosterPrimitives";

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

const howPaperAssets = [
  "/design/home-v2/how-it-works/ASSET__how-card-paper-meet.svg",
  "/design/home-v2/how-it-works/ASSET__how-card-paper-theory.svg",
  "/design/home-v2/how-it-works/ASSET__how-card-paper-practice.svg",
  "/design/home-v2/how-it-works/ASSET__how-card-paper-review.svg",
];

const howNumberBgAssets = [
  "/design/home-v2/how-it-works/ASSET__how-step-number-bg-meet.svg",
  "/design/home-v2/how-it-works/ASSET__how-step-number-bg-theory.svg",
  "/design/home-v2/how-it-works/ASSET__how-step-number-bg-practice.svg",
  "/design/home-v2/how-it-works/ASSET__how-step-number-bg-review.svg",
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

export function HomeV2HowItWorks({ t }) {
  return (
    <section
      id="how-it-works"
      data-home-v2-how
      data-home-v2-how-it-works
      data-how-section
      className="relative isolate overflow-hidden bg-epicDark px-4 py-14 text-epicWhite scroll-mt-24 md:px-6 md:py-20"
    >
      <div className="relative mx-auto max-w-[1448px]">
        <div className="mb-12 grid gap-7 lg:grid-cols-[minmax(0,0.48fr)_minmax(360px,0.52fr)] lg:items-start">
          <h2 className="max-w-3xl text-[56px] font-black uppercase leading-[0.86] tracking-normal text-epicWhite sm:text-[72px] md:text-[112px] lg:text-[clamp(96px,8.2vw,132px)]">
            <span className="block">{t.howTitle}</span>
            <span className="block text-epicRed">{t.howTitleEnd}</span>
          </h2>
          <p className="max-w-2xl text-lg font-medium leading-8 text-epicWhite/82 md:text-2xl md:leading-10 lg:pt-2">
            {t.howIntro}
          </p>
        </div>

        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
        {t.howSteps.map((step, index) => {
          const paperAsset = howPaperAssets[index] || howPaperAssets[0];
          const numberBgAsset = howNumberBgAssets[index] || howNumberBgAssets[0];

          return (
            <article
              key={step.title}
              data-how-card
              className={`group relative mx-auto flex min-h-[560px] w-full max-w-[370px] flex-col px-7 pb-8 pt-8 text-center text-epicDark ${index % 2 === 0 ? "xl:-rotate-1" : "xl:rotate-1"} ${index === 1 || index === 3 ? "xl:translate-y-2" : ""}`}
            >
              <Image
                data-how-paper-asset={index}
                src={paperAsset}
                alt=""
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 46vw, 92vw"
                className="pointer-events-none absolute inset-0 z-0 h-full w-full object-fill"
              />
              <div className="absolute -top-2 left-2 z-20 h-[72px] w-[72px] md:-top-3 md:left-1 md:h-20 md:w-20">
                <Image
                  data-how-number-bg-asset={index}
                  src={numberBgAsset}
                  alt=""
                  fill
                  sizes="112px"
                  className="pointer-events-none absolute inset-0 h-full w-full object-fill"
                />
                <span className="relative z-10 flex h-full w-full items-center justify-center pb-1 text-[42px] font-black leading-none text-epicDark md:text-[52px]">
                  {index + 1}
                </span>
              </div>

              <div className="relative z-10 h-44 overflow-hidden bg-epicGray sm:h-48 xl:h-44">
                <Image
                  data-how-step-photo={index}
                  src={`/gallery/process-${index + 1}.webp`}
                  alt={step.title}
                  fill
                  sizes="(min-width: 1280px) 22vw, (min-width: 640px) 44vw, 88vw"
                  className="object-cover grayscale contrast-110 transition duration-300 group-hover:grayscale-0 group-active:grayscale-0 group-focus-within:grayscale-0"
                />
              </div>

              <div className="relative z-10 flex flex-1 flex-col items-center px-2 pt-7">
                <h3 className="text-[32px] font-black leading-[0.98] text-epicDark md:text-[36px]">
                  {step.title}
                </h3>
                <p className="mt-7 flex-1 text-base font-medium leading-7 text-epicGray">
                  {step.desc}
                </p>
              </div>
            </article>
          );
        })}
      </div>
      </div>
    </section>
  );
}

export function HomeV2Reviews({ t, googleMapsUrl }) {
  return (
    <PosterSection id="reviews" eyebrow="Reviews" title={t.reviewsTitle}>
      <div className="grid gap-5 md:grid-cols-3">
        {t.reviewsList.map((review, index) => (
          <article key={`${review.name}-${index}`} className={`border-4 border-epicDark bg-epicWhite p-6 shadow-[7px_7px_0_#2E2E2E] ${index === 1 ? "md:translate-y-8 rotate-1" : "-rotate-1"}`}>
            <p className="text-base font-black leading-7 text-epicDark">{review.text}</p>
            <div className="mt-6 border-t-4 border-epicDark pt-4">
              <p className="text-sm font-black uppercase text-epicRed">{review.name}</p>
              <p className="mt-1 text-[11px] font-bold uppercase text-epicGray">{review.date}</p>
            </div>
          </article>
        ))}
      </div>
      <PosterLink href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-12">
        {t.reviewsLink}
      </PosterLink>
    </PosterSection>
  );
}

export function HomeV2FAQ({ title, titleEnd, items }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <PosterSection eyebrow="FAQ" title={`${title} ${titleEnd || ""}`} dark>
      <div className="mx-auto max-w-4xl border-4 border-epicWhite bg-epicDark">
        {items.map((item, index) => (
          <div key={item.q} className="border-b-4 border-epicWhite last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="flex w-full items-center justify-between gap-5 px-5 py-6 text-left text-epicWhite"
            >
              <span className="text-lg font-black uppercase leading-tight md:text-2xl">{item.q}</span>
              <Plus className={`shrink-0 text-epicRed ${openFaq === index ? "rotate-45" : ""}`} />
            </button>
            {openFaq === index && (
              <p className="px-5 pb-6 text-base font-bold leading-7 text-epicWhite/72">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </PosterSection>
  );
}

export function HomeV2Events({ t, openEventGallery }) {
  return (
    <PosterSection id="events" eyebrow="Events" title={t.eventsTitle}>
      <div className="grid gap-5 lg:grid-cols-12">
        {t.eventsItems.map((event, index) => (
          <article key={event.title} className={`border-4 border-epicDark bg-epicWhite shadow-[8px_8px_0_#2E2E2E] ${index === 0 ? "lg:col-span-6 lg:row-span-2" : "lg:col-span-3"} ${index % 2 ? "rotate-1" : "-rotate-1"}`}>
            <div className={`${index === 0 ? "h-72 md:h-96" : "h-56"} relative border-b-4 border-epicDark bg-epicGray`}>
              <Image src={event.image} alt={event.title} fill sizes="(min-width: 1024px) 45vw, 90vw" className={`${event.imageClass} grayscale`} />
            </div>
            <div className="p-6">
              <TornLabel>{event.type}</TornLabel>
              <h3 className="mt-5 text-2xl font-black uppercase leading-tight text-epicDark">{event.title}</h3>
              <p className="mt-3 text-sm font-bold leading-6 text-epicGray">{event.desc}</p>
              <PosterButton onClick={() => openEventGallery(event.galleryKey)} className="mt-5">
                {event.buttonLabel}
              </PosterButton>
            </div>
          </article>
        ))}
      </div>
    </PosterSection>
  );
}

export function HomeV2Gallery({ links, t, eventGalleryGroups, activeGalleryKey, setActiveGalleryKey, activeGalleryGroup, galleryPhotoSrc, InstagramIcon }) {
  return (
    <PosterSection id="gallery" dark eyebrow="Gallery" title="Epic moments">
      <div className="mb-8 flex flex-wrap gap-3">
        {eventGalleryGroups.map((group) => (
          <button
            key={group.key}
            type="button"
            onClick={() => setActiveGalleryKey(group.key)}
            className={`border-2 border-epicWhite px-4 py-2 text-[11px] font-black uppercase ${activeGalleryKey === group.key ? "bg-epicRed text-epicWhite" : "bg-epicDark text-epicWhite"}`}
          >
            {group.label}
          </button>
        ))}
      </div>
      <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4 lg:auto-rows-[260px]">
        {activeGalleryGroup.photos.slice(0, 12).map((photo, index) => (
          <div key={`${activeGalleryGroup.key}-${photo}-${index}`} className={`relative overflow-hidden border-4 border-epicWhite bg-epicGray ${index % 5 === 0 ? "col-span-2 row-span-2" : ""}`}>
            <Image
              src={galleryPhotoSrc(photo)}
              alt={`${activeGalleryGroup.label} photo ${index + 1} - Epic Surf School Da Nang`}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover grayscale"
            />
          </div>
        ))}
      </div>
      <PosterLink href={links.instagram} target="_blank" rel="noopener noreferrer" className="mt-10">
        {t.galleryInstagram}
        <InstagramIcon />
      </PosterLink>
    </PosterSection>
  );
}
