"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RentalCaravanIcon, RentalSurfboardIcon, RentalTshirtIcon, RentalUvIcon } from "./Icons";
import { trackEvent } from "../utils/tracking";

export default function Rentals({ t, lang, setRentalModalOpen }) {
  const [activeBoard, setActiveBoard] = useState(0);
  const boardSliderRef = useRef(null);
  const boards = [1, 2, 3, 4];
  const featureItems = [
    { k: "featureDelivery", desc: "featureDeliveryDesc", svg: <RentalCaravanIcon className="h-full w-full" /> },
    { k: "featureSizes", desc: "featureSizesDesc", svg: <RentalSurfboardIcon className="h-full w-full" /> },
    { k: "featureLycra", desc: "featureLycraDesc", svg: <RentalUvIcon className="h-full w-full" /> },
    { k: "featureWetsuits", desktopK: "featureWetsuitsDesktop", desc: "featureWetsuitsDesc", svg: <RentalTshirtIcon className="h-full w-full" /> }
  ];

  const scrollBoardSlider = (direction) => {
    const slider = boardSliderRef.current;
    if (!slider) return;

    slider.scrollBy({ left: slider.clientWidth * direction, behavior: "smooth" });
  };

  const scrollToBoard = (index) => {
    const slider = boardSliderRef.current;
    if (!slider) return;

    slider.scrollTo({ left: slider.clientWidth * index, behavior: "smooth" });
  };

  const updateActiveBoard = () => {
    const slider = boardSliderRef.current;
    if (!slider) return;

    setActiveBoard(Math.max(0, Math.min(3, Math.round(slider.scrollLeft / slider.clientWidth))));
  };

  return (
    <section id="rentals" className="mt-20 scroll-mt-24 overflow-hidden bg-epicDark py-6 text-epicWhite md:py-14 lg:py-[59px]">
      <div className="mx-auto grid w-[342px] grid-cols-1 items-start lg:w-[1216px] lg:grid-cols-[600px_504px] lg:grid-rows-[auto_auto_auto_auto] lg:gap-x-28">
        <div className="mb-[34px] lg:col-start-2 lg:row-start-1 lg:mb-[44px]">
          <div className="mb-[34px] flex h-10 w-[164px] items-center justify-center rounded-xl bg-epicMint text-[13px] font-black uppercase leading-none tracking-[0.1em] text-epicDark lg:mb-[42px]">
            BOARD RENTAL
          </div>
          <h2 className="text-[54px] font-black uppercase leading-[0.95] tracking-normal text-epicWhite lg:text-[86px] lg:leading-[0.92]">
            {t.rentalTitle}
            <span className="block text-epicRed">{t.rentalTitleSurf}</span>
          </h2>
        </div>

        <div className="mb-[36px] lg:col-start-1 lg:row-start-1 lg:row-end-5 lg:mb-0 lg:mt-8">
          <div className="relative h-[390px] w-[342px] overflow-hidden rounded-[34px] bg-epicWhite/8 shadow-2xl shadow-black/20 md:h-[640px] md:w-[600px] lg:h-[760px] lg:rounded-[60px]">
            <div
              ref={boardSliderRef}
              id="board-slider"
              onScroll={updateActiveBoard}
              className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
              style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
            >
              {boards.map((num, idx) => (
                <div key={num} className="relative h-full min-w-full snap-center">
                  <Image
                    src={`/gallery/board-${num}.webp`}
                    alt={t.boardTypes[idx]}
                    fill
                    sizes="(min-width: 1280px) 600px, (min-width: 768px) 600px, 342px"
                    className="object-cover"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>

            <div className="absolute bottom-[22px] left-9 hidden w-[282px] rounded-[24px] border border-epicWhite/12 bg-epicDark/82 px-6 py-4 shadow-xl backdrop-blur-md lg:block">
              <p className="text-sm font-black leading-none tracking-[0.12em] text-epicMint">EPIC SURF RENTAL</p>
              <p className="mt-2 text-sm font-medium leading-[1.1] text-epicWhite/75">Boards, rashguards & local advice</p>
            </div>

            <button
              type="button"
              onClick={() => scrollBoardSlider(-1)}
              aria-label="Previous board"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-epicWhite/15 bg-epicDark/45 text-epicWhite shadow-xl backdrop-blur-md transition-all hover:bg-epicRed active:scale-95 md:left-5 md:h-12 md:w-12"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              type="button"
              onClick={() => scrollBoardSlider(1)}
              aria-label="Next board"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-epicWhite/15 bg-epicDark/45 text-epicWhite shadow-xl backdrop-blur-md transition-all hover:bg-epicRed active:scale-95 md:right-5 md:h-12 md:w-12"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-epicWhite/10 bg-epicDark/45 px-3 py-2 backdrop-blur-md md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
              {boards.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToBoard(idx)}
                  aria-label={t.boardTypes[idx]}
                  className={`h-2 rounded-full transition-all ${activeBoard === idx ? "w-7 bg-epicRed" : "w-2 bg-epicWhite/50 hover:bg-epicWhite"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mb-[40px] text-[17px] font-medium leading-[1.35] text-epicWhite/88 lg:col-start-2 lg:row-start-2 lg:mb-[66px] lg:text-xl lg:leading-[1.28]">
          <p className="flex items-center gap-4">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-epicMint" />
            <span>{t.rentalDescPrimary || t.rentalDesc}</span>
          </p>
        </div>

        <div className="mb-4 grid gap-4 lg:col-start-2 lg:row-start-3 lg:mb-[70px] lg:grid-cols-2 lg:gap-x-[66px] lg:gap-y-[22px]">
          {featureItems.map((feat) => (
            <div key={feat.k} className="group flex h-[104px] w-[342px] items-center gap-5 rounded-[26px] border border-epicWhite/10 bg-epicWhite/5 px-5 transition-colors hover:border-epicRed/30 lg:h-[100px] lg:w-[204px] lg:gap-4 lg:px-3">
              <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-epicRed p-3 text-epicDark transition-transform group-hover:scale-105 lg:h-[64px] lg:w-[64px]">
                {feat.svg}
              </div>
              <div className="min-w-0">
                <p className="text-lg font-black leading-[1.05] text-epicWhite lg:hidden">{t[feat.k]}</p>
                <p className="hidden whitespace-pre-line break-words text-base font-semibold leading-tight text-epicWhite lg:block">{t[feat.desktopK] || t[feat.k]}</p>
                <p className="mt-2 text-[13px] font-medium leading-[1.25] text-epicWhite/65 lg:hidden">{t[feat.desc]}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="box-border min-h-[142px] w-[342px] rounded-[26px] border border-epicWhite/10 bg-epicWhite/5 px-6 pt-[22px] pb-6 lg:col-start-2 lg:row-start-4 lg:flex lg:min-h-[102px] lg:w-[490px] lg:items-center lg:justify-between lg:gap-4 lg:px-5 lg:py-0">
          <div>
            <p className="whitespace-nowrap text-[28px] font-normal leading-none text-epicWhite lg:text-[34px]">{t.rentalPrice}</p>
            <p className="mt-2 text-[15px] font-bold leading-none text-epicWhite/80 lg:text-xl lg:font-semibold">{t.rentalUnit}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              trackEvent("rental_cta_click", {
                language: lang,
                service_type: "board_rental",
                cta_location: "rental_section",
                cta_label: "rent_now",
              });
              setRentalModalOpen(true);
            }}
            className="mx-auto mt-[21px] flex h-14 w-full items-center justify-center rounded-[18px] bg-epicRed px-7 text-center text-sm font-black uppercase leading-none text-epicWhite shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 lg:mx-0 lg:mt-0 lg:h-[72px] lg:w-[141px] lg:min-w-[141px] lg:shrink-0 lg:px-0 lg:text-base lg:font-semibold"
          >
            {t.rentalBtn}
          </button>
        </div>
      </div>
    </section>
  );
}
