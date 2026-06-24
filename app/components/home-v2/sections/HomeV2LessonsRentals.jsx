"use client";

import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppUrl, trackEvent } from "../../../utils/tracking";
import { PhotoPoster, PosterButton, PosterLink } from "../PosterPrimitives";

const bookingLessonIds = new Set(["group", "private", "split"]);

const lessonPaperAssets = {
  group: "/design/home-v2/lessons/ASSET__lesson-card-paper-group.png",
  split: "/design/home-v2/lessons/ASSET__lesson-card-paper-split.png",
  private: "/design/home-v2/lessons/ASSET__lesson-card-paper-private.png",
  surf_skate: "/design/home-v2/lessons/ASSET__lesson-card-paper-surf-skate.png",
  lineup_pro: "/design/home-v2/lessons/ASSET__lesson-card-paper-lineup-pro.png",
};

const lessonIconAssets = {
  group: "/design/home-v2/lessons/SVG__lesson-icon-group.svg",
  split: "/design/home-v2/lessons/SVG__lesson-icon-split.svg",
  private: "/design/home-v2/lessons/SVG__lesson-icon-private.svg",
  surf_skate: "/design/home-v2/lessons/SVG__lesson-icon-surf-skate.svg",
  lineup_pro: "/design/home-v2/lessons/SVG__lesson-icon-lineup-pro.svg",
};

const lessonMessages = {
  ru: {
    surf_skate: "Здравствуйте! Хочу записаться на surf-skate урок.",
    lineup_pro: "Здравствуйте! Хочу записаться на Line-up / Pro урок.",
  },
  en: {
    surf_skate: "Hi! I'd like to book a surf-skate lesson.",
    lineup_pro: "Hi! I'd like to book a Line-up / Pro lesson.",
  },
};

const rentalPromoCopy = {
  en: {
    description: "Board rental in Da Nang with delivery or pickup in a convenient city spot. We help match the board to your level and the day's conditions.",
    viewAll: "View all boards",
  },
  ru: {
    description: "Аренда досок в Дананге от 250,000 VND / 2 часа. Помогаем выбрать доску под уровень и условия.",
    viewAll: "Выбрать доску",
  },
};

export function HomeV2Lessons({ t, lang, links, openBookingModal }) {
  const getBookingUrl = (item) => links.booking?.[lang]?.[item.id];

  const handleBookingClick = (item) => {
    const bookingUrl = getBookingUrl(item);
    if (!bookingUrl) return;

    openBookingModal(bookingUrl, {
      serviceType: item.id,
      ctaLocation: "home_v2_lessons",
      ctaLabel: item.title,
      lessonId: item.id,
    });
  };

  const handleMessengerClick = (event, item) => {
    const message = lessonMessages[lang]?.[item.id] || lessonMessages.en[item.id] || item.title;

    trackEvent("whatsapp_click", {
      language: lang,
      service_type: item.id,
      cta_location: "home_v2_lessons",
      cta_label: item.title,
      lesson_id: item.id,
    });
    event.currentTarget.href = buildWhatsAppUrl(links.whatsapp, message, {
      language: lang,
      includePartnerCode: false,
    });
  };

  return (
    <section
      id="lessons"
      data-home-v2-lessons-block
      className="relative isolate overflow-hidden bg-[#2E2E2E] px-4 py-14 text-epicWhite scroll-mt-24 md:px-6 md:py-20"
    >
      <div className="relative mx-auto max-w-[1448px]">
        <div className="relative mb-9 grid gap-6 lg:mb-12 lg:grid-cols-[minmax(0,0.66fr)_minmax(280px,0.34fr)] lg:items-center">
          <div className="relative h-[188px] w-full max-w-[840px] sm:h-[240px] md:h-[280px] lg:-ml-4 lg:h-[300px] lg:max-w-[900px]">
            <Image
              data-lessons-heading-asset
              src="/design/home-v2/lessons/ASSET__lessons-heading-mint-paper.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 900px, 94vw"
              className="object-fill"
            />
            <h2 className="absolute left-[10%] top-[22%] z-10 max-w-[680px] text-[42px] font-black uppercase leading-[0.88] tracking-normal text-epicDark sm:text-[62px] md:text-[82px] lg:text-[clamp(74px,5.7vw,104px)]">
              {t.sectionTitle} {t.sectionTitleRide}
            </h2>
          </div>
          <div className="relative max-w-md lg:justify-self-end">
            <Image
              data-lessons-corner-brush
              src="/design/home-v2/lessons/SVG__lessons-corner-mint-brush.svg"
              alt=""
              width={300}
              height={120}
              sizes="300px"
              className="pointer-events-none absolute -right-16 -top-16 hidden h-auto w-[260px] opacity-90 lg:block"
            />
            <p className="relative text-base font-black leading-7 text-epicWhite md:text-lg md:leading-8">
              {t.heroSub}
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {t.cards.map((item, index) => (
          <article
            key={item.id}
            data-home-v2-lesson-card
            className={`group relative flex min-h-[570px] flex-col px-5 pb-8 pt-7 text-epicDark ${index % 2 === 0 ? "lg:translate-y-2" : "lg:-translate-y-1"}`}
          >
            <Image
              data-lesson-paper-asset={item.id}
              src={lessonPaperAssets[item.id] || lessonPaperAssets.group}
              alt=""
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 768px) 46vw, 92vw"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-fill"
            />
            <div className="relative z-10 h-44 overflow-hidden bg-epicDark md:h-48 xl:h-40">
              <Image
                data-lessons-photo
                src={`/gallery/lesson-${index + 1}.webp`}
                alt={item.title}
                fill
                sizes="(min-width: 1280px) 18vw, (min-width: 768px) 45vw, 90vw"
                className="object-cover grayscale contrast-110 transition duration-300 ease-out group-hover:grayscale-0 group-hover:contrast-105 group-active:grayscale-0 group-active:contrast-105 group-focus-within:grayscale-0 group-focus-within:contrast-105"
              />
            </div>
            <div className="relative z-10 flex flex-1 flex-col px-1 pt-7 text-center">
              <Image
                data-lesson-icon-asset={item.id}
                src={lessonIconAssets[item.id] || lessonIconAssets.group}
                alt=""
                width={64}
                height={64}
                sizes="64px"
                className="mx-auto mb-5 h-16 w-16 object-contain"
              />
              <h3 className="min-h-[3.8rem] text-[28px] font-black uppercase leading-[0.96] text-epicDark xl:text-[25px]">{item.title}</h3>
              <Image
                data-lesson-divider-asset
                src="/design/home-v2/lessons/SVG__lesson-card-divider.svg"
                alt=""
                width={112}
                height={18}
                sizes="112px"
                className="mx-auto mt-5 h-auto w-28 object-contain"
              />
              <p className="mt-5 flex-1 text-sm font-bold leading-6 text-epicGray">{item.desc}</p>
              <p className="mt-6 text-[28px] font-black leading-none text-epicRed xl:text-[25px]">{item.price}</p>
              {bookingLessonIds.has(item.id) ? (
                <PosterButton
                  data-home-v2-booking-cta
                  onClick={() => handleBookingClick(item)}
                  className="mt-5 w-full border-0 bg-epicRed text-epicDark shadow-none"
                >
                  {t.btnBook}
                </PosterButton>
              ) : (
                <PosterLink
                  href={links.whatsapp}
                  onClick={(event) => handleMessengerClick(event, item)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 w-full border-0 bg-epicRed text-epicDark shadow-none"
                >
                  {t.btnBook}
                </PosterLink>
              )}
            </div>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}

export function HomeV2Rentals({ lang, setRentalModalOpen }) {
  const catalogHref = lang === "ru" ? "/ru/surfboard-rental-danang" : "/surfboard-rental-danang";

  const handleGenericRentalClick = () => {
    trackEvent("rental_cta_click", {
      language: lang,
      service_type: "board_rental",
      cta_location: "home_v2_rental_section",
      cta_label: "rent_now",
    });
    setRentalModalOpen(true);
  };

  return (
    <section
      id="rentals"
      data-home-v2-rentals-block
      className="relative isolate overflow-hidden bg-[#2E2E2E] px-4 py-8 text-epicWhite scroll-mt-24 md:px-6 md:py-12 lg:py-0"
    >
      <div
        data-rentals-artboard
        className="relative mx-auto flex w-full max-w-[1448px] flex-col gap-8 overflow-hidden lg:aspect-[1448/1086] lg:block"
      >
        <div
          data-rentals-heading
          className="relative z-20 h-[172px] w-full max-w-[760px] sm:h-[232px] md:h-[292px] lg:absolute lg:left-[4%] lg:top-[4%] lg:h-[36%] lg:w-[74%] lg:max-w-none"
        >
          <Image
            data-rentals-heading-asset
            src="/design/home-v2/rentals/torn-paper-heading-wide.svg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 74vw, 94vw"
            className="scale-[1.1] object-fill lg:-translate-x-[5%] lg:scale-x-[1.16] lg:scale-y-[1.1]"
          />
          <div className="absolute left-[9%] top-[24%] z-10 sm:top-[23%] lg:left-[8%] lg:top-[22%]">
            <h2 className="max-w-[800px] text-[37px] font-black uppercase leading-[0.92] tracking-normal text-epicDark sm:text-[54px] md:text-[74px] lg:text-[clamp(58px,5.95vw,96px)]">
              SURF BOARD RENTALS
            </h2>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-8 lg:h-full lg:block">
          <div
            data-rentals-content
            className="order-3 z-20 max-w-[310px] pb-2 sm:max-w-[360px] lg:absolute lg:left-[8%] lg:top-[44%] lg:w-[31%] lg:max-w-none lg:pb-0"
          >
            <div className="font-black uppercase leading-none">
              <p className="text-3xl text-epicWhite/80 md:text-4xl">FROM</p>
              <p className="mt-3 text-[76px] text-epicRed sm:text-[88px] lg:text-[clamp(74px,6.4vw,92px)]">250.000</p>
              <p className="text-4xl text-epicRed md:text-5xl">VND</p>
            </div>

            <p className="mt-8 max-w-[270px] text-2xl font-medium leading-[1.18] text-epicWhite/78">
              Shortboards, funboards, softboards and more
            </p>
            <p className="mt-5 text-2xl font-medium leading-tight text-epicWhite/78">
              Daily or long term.
            </p>

            <div className="mt-7 flex flex-col items-start gap-4">
              <button
                type="button"
                data-home-v2-rental-cta
                onClick={handleGenericRentalClick}
                className="inline-flex min-h-16 w-full max-w-[274px] items-center justify-between gap-5 bg-epicRed px-7 text-2xl font-black uppercase leading-none text-epicDark transition hover:brightness-105 active:scale-95"
              >
                RENT NOW
                <span aria-hidden="true" className="text-3xl leading-none">-&gt;</span>
              </button>
              <Link
                href={catalogHref}
                className="inline-flex min-h-16 w-full max-w-[274px] items-center justify-center bg-epicWhite px-5 text-2xl font-black uppercase leading-none text-epicDark transition hover:bg-epicMint active:scale-95"
              >
                CHOOSE A BOARD
              </Link>
            </div>
          </div>

          <div
            id="rentals-board-scene"
            data-rentals-scene
            className="relative order-2 z-10 aspect-[949/988] w-full max-w-[520px] self-center overflow-visible sm:max-w-[620px] md:max-w-[700px] lg:absolute lg:bottom-[-3%] lg:right-0 lg:h-[88%] lg:w-auto lg:max-w-none"
          >
            <Image
              data-rentals-layer="scene-bg"
              src="/design/home-v2/rentals/rental-scene-bg.png"
              alt="Surfboard on My Khe beach"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 94vw"
              className="absolute inset-0 z-[1] h-full w-full object-contain"
            />
            <Image
              data-rentals-layer="scene-mint"
              src="/design/home-v2/rentals/rental-scene-mint.svg"
              alt=""
              fill
              sizes="(min-width: 1024px) 58vw, 94vw"
              className="rental-mint-wave-animated absolute inset-0 z-[2] h-full w-full object-contain"
            />
            <Image
              data-rentals-layer="scene-board-top"
              src="/design/home-v2/rentals/rental-scene-board-top.png"
              alt="Surfboard rental cutout"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 94vw"
              className="absolute inset-0 z-[3] h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeV2Included({ t }) {
  return (
    <section data-home-v2-included className="relative isolate overflow-hidden bg-epicWhite px-4 py-14 text-epicDark md:px-6 md:py-20">
      <div className="relative mx-auto max-w-[1448px]">
        <div className="absolute -right-20 top-12 hidden h-28 w-[44%] -rotate-3 bg-epicMint lg:block" aria-hidden="true" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-center">
          <div className="relative overflow-hidden bg-epicDark p-6 text-epicWhite shadow-[12px_12px_0_#AAFFC7] md:p-8">
            <div className="relative h-72 overflow-hidden bg-epicGray md:h-[430px]">
              <Image
                src="/gallery/incl-1.webp"
                alt={t.includedTitle}
                fill
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="object-cover grayscale contrast-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-epicDark/80 p-5">
                <p className="text-[11px] font-black uppercase text-epicMint">Included</p>
                <h2 className="mt-2 text-4xl font-black uppercase leading-[0.9] tracking-normal md:text-6xl">
                  {t.includedTitle}
                </h2>
              </div>
            </div>
            <p className="mt-6 text-base font-bold leading-7 text-epicWhite/74">{t.includedSubtitle}</p>
          </div>

          <div className="relative">
            <div className="mb-6 bg-epicMint px-6 py-5 shadow-[8px_8px_0_#2E2E2E] lg:-ml-12">
              <h3 className="whitespace-pre-line text-4xl font-black uppercase leading-[0.95] text-epicDark md:text-5xl">{t.includedAccentTitle}</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.includedItems.map((item, index) => (
                <article
                  key={item.icon}
                  className={`relative min-h-[190px] overflow-hidden bg-epicWhite p-6 shadow-[7px_7px_0_#585858] ring-2 ring-epicDark ${index % 2 ? "lg:translate-y-5" : ""}`}
                >
                  <div className="absolute -right-7 -top-4 h-14 w-24 rotate-[-8deg] bg-epicMint" aria-hidden="true" />
                  <p className="relative z-10 text-[11px] font-black uppercase text-epicRed">0{index + 1}</p>
                  <h3 className="relative z-10 mt-3 text-2xl font-black uppercase leading-tight text-epicDark">{item.label}</h3>
                  <p className="relative z-10 mt-3 text-sm font-bold leading-6 text-epicGray">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeV2PhotoBreak() {
  return (
    <div className="relative overflow-hidden bg-epicDark px-4 py-14 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        <PhotoPoster src="/gallery/1.webp" alt="Surf community" className="h-72 -rotate-2" />
        <PhotoPoster src="/gallery/lesson-3.webp" alt="Surf lesson practice" className="h-72 rotate-2 md:translate-y-10" />
        <PhotoPoster src="/gallery/events/community-rides.webp" alt="Epic Surf community rides" className="h-72 -rotate-1" />
      </div>
    </div>
  );
}
