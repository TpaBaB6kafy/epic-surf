"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { boardTypeLabels } from "../data/rentalBoards";

export default function RentalBoardMiniShowroom({ boards, catalogHref = "/surfboard-rental-danang" }) {
  const showcaseBoards = useMemo(() => boards.filter((board) => board.recommended).slice(0, 5), [boards]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBoard = showcaseBoards[activeIndex] || showcaseBoards[0];
  const visualOffsetX = activeBoard?.visualOffsetX || 0;
  const visualOffsetY = activeBoard?.visualOffsetY || 0;
  const visualScale = activeBoard?.visualScale || 1;
  const frontTransformVars = {
    "--front-mobile-transform": `translate(${visualOffsetX - 6}px, ${visualOffsetY + 70}px) rotate(-1deg) scale(${visualScale * 1.13})`,
    "--front-desktop-transform": `translate(${visualOffsetX - 8}px, ${visualOffsetY + 56}px) rotate(-1deg) scale(${visualScale * 1.15})`,
  };
  const backTransformVars = {
    "--back-mobile-transform": `translate(${visualOffsetX + 42}px, ${visualOffsetY + 86}px) rotate(2deg) scale(${visualScale * 0.99})`,
    "--back-desktop-transform": `translate(${visualOffsetX + 82}px, ${visualOffsetY + 74}px) rotate(4deg) scale(${visualScale * 1.02})`,
  };

  if (!activeBoard) return null;

  return (
    <div
      id="rental-mini-showroom"
      data-mini-showroom-variant="homepage-promo"
      className="relative h-full min-h-[360px] overflow-hidden rounded-[30px] border border-epicWhite/10 bg-epicWhite/5 shadow-2xl shadow-black/20 lg:rounded-[38px]"
    >
      <Link
        href={catalogHref}
        aria-label="Open full rental board catalog"
        className="absolute inset-x-5 top-5 z-10 flex items-center justify-between rounded-full border border-epicWhite/12 bg-epicDark/82 px-4 py-3 text-epicWhite backdrop-blur-md transition-colors hover:border-epicMint md:inset-x-6"
      >
        <span>
          <span className="block text-[10px] font-black uppercase tracking-wide text-epicMint">Rental quiver</span>
          <span className="mt-1 block text-sm font-black uppercase leading-none">{showcaseBoards.length} recommended boards</span>
        </span>
        <ArrowRight size={17} className="text-epicRed" />
      </Link>

      <Link
        href={catalogHref}
        aria-label={`View ${activeBoard.name} in full rental board catalog`}
        className="absolute inset-x-0 bottom-12 top-16 md:bottom-16 md:top-20"
      >
        <div className="absolute inset-x-10 bottom-0 h-16 rounded-full bg-epicDark/35 blur-2xl md:inset-x-14" />
        <div
          data-mini-board
          data-mini-board-pair={activeBoard.backImage ? "true" : undefined}
          className="relative mx-auto h-full max-h-[455px] w-[78%] max-w-[300px] md:max-h-[520px] md:max-w-[330px]"
        >
          {activeBoard.backImage && (
            <div
              data-mini-board-back
              className="absolute inset-0 z-0 opacity-35 brightness-75 saturate-50 [transform:var(--back-mobile-transform)] md:[transform:var(--back-desktop-transform)]"
              style={backTransformVars}
            >
              <Image
                src={activeBoard.backImage}
                alt={`${activeBoard.name} back side`}
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 290px, 270px"
                className="object-contain"
                draggable={false}
              />
            </div>
          )}
          <div
            data-mini-board-front
            className="absolute inset-0 z-[1] [transform:var(--front-mobile-transform)] md:[transform:var(--front-desktop-transform)]"
            style={frontTransformVars}
          >
            <Image
              src={activeBoard.image}
              alt={activeBoard.name}
              fill
              sizes="(min-width: 1024px) 330px, (min-width: 768px) 320px, 300px"
              className="object-contain"
              draggable={false}
            />
          </div>
        </div>
      </Link>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-epicDark via-epicDark/74 to-transparent md:h-44 md:via-epicDark/62" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-epicDark/82 to-transparent md:h-24 md:from-epicDark/72" />

      <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4 md:left-6 md:right-6">
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-wide text-epicMint">{boardTypeLabels[activeBoard.type]}</p>
          <p className="mt-1 text-lg font-black uppercase leading-none text-epicWhite md:text-xl">{activeBoard.name}</p>
        </div>
        <div className="flex shrink-0 gap-1.5">
          {showcaseBoards.map((board, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={board.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Preview ${board.name}`}
                aria-current={isActive ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all active:scale-95 ${
                  isActive ? "w-7 bg-epicRed" : "w-2.5 bg-epicWhite/35 hover:bg-epicMint"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
