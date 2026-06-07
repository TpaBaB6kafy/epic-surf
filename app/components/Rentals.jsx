"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RentalCaravanIcon, RentalSurfboardIcon, RentalTshirtIcon, RentalUvIcon } from "./Icons";
import RentalBoardMiniShowroom from "./RentalBoardMiniShowroom";
import { rentalBoards } from "../data/rentalBoards";
import { trackEvent } from "../utils/tracking";

const rentalPromoCopy = {
  en: {
    badge: "Board rental",
    description: "Board rental in Da Nang with delivery or pickup in a convenient city spot. We help match the board to your level and the day's conditions.",
    viewAll: "View all boards",
    benefits: ["Spot delivery", "All sizes", "Rashguards & zinc", "Local advice"],
  },
  ru: {
    badge: "Аренда досок",
    description: "Аренда досок в Дананге от 250,000 VND / 2 часа. Привозим в удобную точку в пределах города и помогаем выбрать доску под уровень и условия.",
    viewAll: "Выбрать доску",
    benefits: ["Привозим по Данангу", "Все размеры", "Лайкры и цинк", "Поможем выбрать"],
  },
};

export default function Rentals({ t, lang, setRentalModalOpen }) {
  const copy = rentalPromoCopy[lang === "ru" ? "ru" : "en"];
  const catalogHref = lang === "ru" ? "/ru/surfboard-rental-danang" : "/surfboard-rental-danang";
  const featureItems = [
    { label: copy.benefits[0], svg: <RentalCaravanIcon className="h-full w-full" /> },
    { label: copy.benefits[1], svg: <RentalSurfboardIcon className="h-full w-full" /> },
    { label: copy.benefits[2], svg: <RentalUvIcon className="h-full w-full" /> },
    { label: copy.benefits[3], svg: <RentalTshirtIcon className="h-full w-full" /> },
  ];

  const handleGenericRentalClick = () => {
    trackEvent("rental_cta_click", {
      language: lang,
      service_type: "board_rental",
      cta_location: "rental_section",
      cta_label: "rent_now",
    });
    setRentalModalOpen(true);
  };

  return (
    <section id="rentals" className="mt-20 scroll-mt-24 overflow-hidden bg-epicDark py-14 text-epicWhite md:py-20 lg:py-24">
      <div className="mx-auto grid w-[min(100%-32px,360px)] gap-9 md:w-[min(100%-48px,760px)] lg:w-[min(100%-64px,1160px)] lg:grid-cols-[minmax(300px,380px)_minmax(0,1fr)] lg:items-center lg:gap-16">
        <div className="order-2 mx-auto h-[390px] w-full max-w-[340px] md:h-[470px] md:max-w-[380px] lg:order-1 lg:h-[560px]">
          <RentalBoardMiniShowroom boards={rentalBoards} catalogHref={catalogHref} />
        </div>

        <div className="order-1 lg:order-2">
          <div className="mb-5 inline-flex h-10 items-center justify-center rounded-xl bg-epicMint px-4 text-[12px] font-black uppercase leading-none tracking-wide text-epicDark">
            {copy.badge}
          </div>
          <h2 className="max-w-2xl text-[48px] font-black uppercase leading-[0.95] tracking-normal text-epicWhite md:text-[66px] lg:text-[82px] lg:leading-[0.9]">
            {t.rentalTitle}
            <span className="block text-epicRed">{t.rentalTitleSurf}</span>
          </h2>

          <p className="mt-6 max-w-xl text-[16px] font-medium leading-7 text-epicWhite/78 md:text-lg md:leading-8">
            {copy.description}
          </p>

          <div className="mt-7 rounded-[24px] border border-epicWhite/10 bg-epicWhite/5 p-5 md:flex md:items-center md:justify-between md:gap-6">
            <div>
              <p className="text-[30px] font-normal leading-none text-epicWhite md:text-[34px]">{t.rentalPrice}</p>
              <p className="mt-2 text-[15px] font-bold leading-none text-epicWhite/75">{t.rentalUnit}</p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 md:mt-0 md:flex md:shrink-0">
              <button
                type="button"
                onClick={handleGenericRentalClick}
                className="flex h-14 items-center justify-center rounded-[18px] bg-epicRed px-7 text-center text-sm font-black uppercase leading-none text-epicWhite shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95"
              >
                {t.rentalBtn}
              </button>
              <Link
                href={catalogHref}
                className="flex h-14 items-center justify-center gap-2 rounded-[18px] border border-epicWhite/15 bg-epicWhite/5 px-6 text-center text-sm font-black uppercase leading-none text-epicWhite transition-all hover:border-epicMint hover:text-epicMint active:scale-95"
              >
                {copy.viewAll}
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
            {featureItems.map((feat) => (
              <div key={feat.label} className="flex min-h-[70px] items-center gap-3 rounded-[18px] border border-epicWhite/10 bg-epicWhite/5 px-3 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-epicRed p-2 text-epicDark">
                  {feat.svg}
                </div>
                <p className="text-[13px] font-black leading-tight text-epicWhite md:text-sm">{feat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
