"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RentalBoardMiniShowroom from "./RentalBoardMiniShowroom";
import { trackEvent } from "../utils/tracking";

const rentalPromoCopy = {
  en: {
    badge: "Board rental",
    description: "Board rental in Da Nang with delivery or pickup in a convenient city spot. We help match the board to your level and the day's conditions.",
    viewAll: "View all boards",
  },
  ru: {
    badge: "Аренда досок",
    description: "Аренда досок в Дананге от 250,000 VND / 2 часа. Привозим в удобную точку в пределах города и помогаем выбрать доску под уровень и условия.",
    viewAll: "Выбрать доску",
  },
};

export default function Rentals({ t, lang, setRentalModalOpen }) {
  const copy = rentalPromoCopy[lang === "ru" ? "ru" : "en"];
  const catalogHref = lang === "ru" ? "/ru/surfboard-rental-danang" : "/surfboard-rental-danang";
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
      <div className="mx-auto grid w-[min(100%-32px,360px)] gap-9 md:w-[min(100%-48px,760px)] lg:w-[min(100%-64px,1160px)] lg:grid-cols-[minmax(380px,500px)_minmax(0,1fr)] lg:items-center lg:gap-16">
        <div className="order-2 mx-auto h-[340px] w-full max-w-[360px] md:h-[420px] md:max-w-[500px] lg:order-1 lg:h-[460px]">
          <RentalBoardMiniShowroom />
        </div>

        <div className="order-1 mx-auto max-w-[640px] text-center lg:order-2 lg:mx-0 lg:text-left">
          <h2 className="mx-auto max-w-2xl text-[48px] font-black uppercase leading-[0.95] tracking-normal text-epicWhite md:text-[66px] lg:mx-0 lg:text-[82px] lg:leading-[0.9]">
            {t.rentalTitle}
            <span className="block text-epicRed">{t.rentalTitleSurf}</span>
          </h2>

          <p className="mx-auto mt-7 max-w-[560px] text-[16px] font-medium leading-8 text-epicWhite/82 md:mt-8 md:text-lg md:leading-9 lg:mx-0">
            {copy.description}
          </p>

          <div className="mt-9 border-y border-epicWhite/10 py-6 md:mt-10 md:flex md:items-center md:justify-between md:gap-8">
            <div className="space-y-2">
              <p className="text-[30px] font-normal leading-none text-epicWhite md:text-[34px]">{t.rentalPrice}</p>
              <p className="text-[15px] font-bold leading-tight text-epicWhite/75">{t.rentalUnit}</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-0 md:flex md:shrink-0">
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

        </div>
      </div>
    </section>
  );
}
