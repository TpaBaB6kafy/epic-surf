"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RentalBoardMiniShowroom from "./RentalBoardMiniShowroom";
import { getLocalizedBoard, rentalBoards } from "../data/rentalBoards";
import { trackEvent } from "../utils/tracking";

const rentalPromoCopy = {
  en: {
    badge: "Board rental",
    description: "Board rental in Da Nang with delivery or pickup in a convenient city spot. We help match the board to your level and the day's conditions.",
    viewAll: "View all boards",
  },
  ru: {
    badge: "Аренда досок",
    description: "Аренда досок в Дананге с доставкой или получением в удобной точке города. Поможем выбрать доску под ваш уровень и условия.",
    viewAll: "Выбрать доску",
  },
};

export default function Rentals({ t, lang, setRentalModalOpen }) {
  const copy = rentalPromoCopy[lang === "ru" ? "ru" : "en"];
  const catalogHref = lang === "ru" ? "/ru/surfboard-rental-danang" : "/surfboard-rental-danang";
  const featuredBoard = getLocalizedBoard(rentalBoards.find((board) => board.id === "board-02") || rentalBoards[0], lang);
  const handleGenericRentalClick = () => {
    trackEvent("rental_cta_click", {
      language: lang,
      service_type: "board_rental",
      cta_location: "rental_section",
      cta_label: "rent_now",
    });
    setRentalModalOpen(true);
  };
  const handleCatalogClick = () => {
    trackEvent("rental_cta_click", {
      language: lang,
      service_type: "board_rental",
      cta_location: "rental_section",
      cta_label: "view_all_boards",
    });
  };

  return (
    <section id="rentals" className="mt-20 scroll-mt-24 overflow-hidden bg-epicDark py-14 text-epicWhite md:py-20 lg:py-24">
      <div className="mx-auto grid w-[min(100%-32px,360px)] gap-9 md:w-[min(100%-48px,760px)] lg:w-[min(100%-64px,1160px)] lg:grid-cols-[minmax(380px,500px)_minmax(0,1fr)] lg:items-center lg:gap-16">
        <div className="order-2 mx-auto h-[360px] w-full max-w-[360px] md:h-[440px] md:max-w-[500px] lg:order-1 lg:h-[480px]">
          <RentalBoardMiniShowroom board={featuredBoard} />
        </div>

        <div className="order-1 mx-auto max-w-[640px] text-center lg:order-2 lg:mx-0 lg:text-left">
          <h2 className="mx-auto max-w-2xl text-[48px] font-black uppercase leading-[0.95] tracking-normal text-epicWhite md:text-[66px] lg:mx-0 lg:text-[82px] lg:leading-[0.9]">
            {t.rentalTitle}
            <span className="block text-epicRed">{t.rentalTitleSurf}</span>
          </h2>

          <p className="mx-auto mt-7 max-w-[560px] text-[16px] font-medium leading-8 text-epicWhite/82 md:mt-8 md:text-lg md:leading-9 lg:mx-0">
            {copy.description}
          </p>

          <div className="mt-9 border-y-2 border-epicWhite/25 py-6 md:mt-10 md:flex md:items-center md:justify-between md:gap-8">
            <div className="space-y-2">
              <p data-rental-price className="text-[clamp(23px,2.4vw,34px)] font-black uppercase leading-none text-epicMint">
                <span className="block whitespace-nowrap">{lang === "ru" ? "от" : "from"} {featuredBoard.price.amount.toLocaleString(lang === "ru" ? "ru-RU" : "en-US")} {featuredBoard.price.currency}</span>
                <span className="mt-1 block whitespace-nowrap text-[0.75em]">/ {lang === "ru" ? "2 часа" : featuredBoard.price.unit}</span>
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-0 md:flex md:shrink-0">
              <Link
                href={catalogHref}
                onClick={handleCatalogClick}
                className="flex h-14 items-center justify-center gap-2 rounded-[18px] bg-epicRed px-6 text-center text-sm font-black uppercase leading-none text-epicWhite shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95"
              >
                {copy.viewAll}
                <ArrowRight size={17} />
              </Link>
              <button
                type="button"
                onClick={handleGenericRentalClick}
                className="flex h-14 items-center justify-center rounded-[18px] border border-epicWhite/15 bg-epicWhite/5 px-7 text-center text-sm font-black uppercase leading-none text-epicWhite transition-all hover:border-epicMint hover:bg-epicWhite/10 hover:text-epicMint active:scale-95"
              >
                {t.rentalBtn}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
