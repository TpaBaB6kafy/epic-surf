"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RentalCaravanIcon, RentalSurfboardIcon, RentalTshirtIcon, RentalUvIcon } from "./Icons";
import RentalBoardMiniShowroom from "./RentalBoardMiniShowroom";
import { rentalBoards } from "../data/rentalBoards";
import { trackEvent } from "../utils/tracking";

export default function Rentals({ t, lang, setRentalModalOpen }) {
  const featureItems = [
    { k: "featureDelivery", svg: <RentalCaravanIcon className="h-full w-full" /> },
    { k: "featureSizes", svg: <RentalSurfboardIcon className="h-full w-full" /> },
    { k: "featureLycra", svg: <RentalUvIcon className="h-full w-full" /> },
    { k: "featureWetsuits", desktopK: "featureWetsuitsDesktop", svg: <RentalTshirtIcon className="h-full w-full" /> },
  ];
  const viewAllLabel = lang === "ru" ? "Выбрать из 12 досок" : "View all boards";

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
    <section id="rentals" className="mt-20 scroll-mt-24 overflow-hidden bg-epicDark py-8 text-epicWhite md:py-12 lg:py-16">
      <div className="mx-auto grid w-[342px] gap-8 md:w-[720px] lg:w-[1216px] lg:grid-cols-[520px_1fr] lg:items-center lg:gap-16">
        <div className="order-2 h-[330px] md:h-[420px] lg:order-1 lg:h-[520px]">
          <RentalBoardMiniShowroom boards={rentalBoards} />
        </div>

        <div className="order-1 lg:order-2">
          <div className="mb-5 flex h-10 w-[164px] items-center justify-center rounded-xl bg-epicMint text-[13px] font-black uppercase leading-none tracking-[0.1em] text-epicDark">
            BOARD RENTAL
          </div>
          <h2 className="text-[50px] font-black uppercase leading-[0.95] tracking-normal text-epicWhite md:text-[68px] lg:text-[88px] lg:leading-[0.9]">
            {t.rentalTitle}
            <span className="block text-epicRed">{t.rentalTitleSurf}</span>
          </h2>

          <p className="mt-6 max-w-2xl text-[17px] font-medium leading-[1.45] text-epicWhite/82 md:text-xl">
            {t.rentalDescPrimary || t.rentalDesc}
          </p>

          <div className="mt-6 rounded-[26px] border border-epicWhite/10 bg-epicWhite/5 p-5 md:flex md:items-center md:justify-between md:gap-6">
            <div>
              <p className="text-[30px] font-normal leading-none text-epicWhite md:text-[36px]">{t.rentalPrice}</p>
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
                href="/surfboard-rental-danang"
                className="flex h-14 items-center justify-center gap-2 rounded-[18px] border border-epicWhite/15 bg-epicWhite/5 px-6 text-center text-sm font-black uppercase leading-none text-epicWhite transition-all hover:border-epicMint hover:text-epicMint active:scale-95"
              >
                {viewAllLabel}
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {featureItems.map((feat) => (
              <div key={feat.k} className="flex min-h-[78px] items-center gap-3 rounded-[20px] border border-epicWhite/10 bg-epicWhite/5 px-3 py-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-epicRed p-2 text-epicDark">
                  {feat.svg}
                </div>
                <p className="text-[13px] font-black leading-tight text-epicWhite md:text-sm">{t[feat.desktopK] || t[feat.k]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
