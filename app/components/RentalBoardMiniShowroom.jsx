"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { boardTypeLabels } from "../data/rentalBoards";

export default function RentalBoardMiniShowroom({ boards }) {
  const showcaseBoards = useMemo(() => boards.filter((board) => board.recommended).slice(0, 5), [boards]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBoard = showcaseBoards[activeIndex] || showcaseBoards[0];

  if (!activeBoard) return null;

  return (
    <div id="rental-mini-showroom" className="relative h-full min-h-[300px] overflow-hidden rounded-[34px] border border-epicWhite/10 bg-epicWhite/5 shadow-2xl shadow-black/20 lg:rounded-[48px]">
      <Link
        href="/surfboard-rental-danang"
        aria-label="Open full rental board catalog"
        className="absolute inset-x-8 top-6 z-10 flex items-center justify-between rounded-full border border-epicWhite/12 bg-epicDark/82 px-4 py-3 text-epicWhite backdrop-blur-md transition-colors hover:border-epicMint"
      >
        <span>
          <span className="block text-[10px] font-black uppercase tracking-wide text-epicMint">Rental quiver</span>
          <span className="mt-1 block text-sm font-black uppercase leading-none">{showcaseBoards.length} recommended boards</span>
        </span>
        <ArrowRight size={17} className="text-epicRed" />
      </Link>

      <Link
        href="/surfboard-rental-danang"
        aria-label={`View ${activeBoard.name} in full rental board catalog`}
        className="absolute inset-x-0 bottom-14 top-16"
      >
        <div className="absolute inset-x-8 bottom-7 h-10 rounded-full bg-epicDark/70 blur-sm" />
        <div
          data-mini-board
          className="relative mx-auto h-full max-h-[400px] w-[74%] max-w-[340px]"
          style={{
            transform: `translate(${activeBoard.visualOffsetX || 0}px, ${activeBoard.visualOffsetY || 0}px) scale(${activeBoard.visualScale || 1})`,
          }}
        >
          <Image
            src={activeBoard.image}
            alt={activeBoard.name}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 520px, 280px"
            className="object-contain"
            draggable={false}
          />
        </div>
      </Link>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-epicDark via-epicDark/85 to-transparent" />

      <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-wide text-epicMint">{boardTypeLabels[activeBoard.type]}</p>
          <p className="mt-1 text-xl font-black uppercase leading-none text-epicWhite">{activeBoard.name}</p>
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
