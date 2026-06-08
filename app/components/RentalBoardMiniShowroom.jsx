"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { boardTypeLabels } from "../data/rentalBoards";

export default function RentalBoardMiniShowroom({ boards }) {
  const showcaseBoards = useMemo(() => boards.filter((board) => board.recommended).slice(0, 5), [boards]);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStateRef = useRef(null);
  const activeBoard = showcaseBoards[activeIndex] || showcaseBoards[0];
  const visualOffsetX = activeBoard?.visualOffsetX || 0;
  const visualOffsetY = activeBoard?.visualOffsetY || 0;
  const visualScale = activeBoard?.visualScale || 1;
  const frontTransformVars = {
    "--front-mobile-transform": `translate(${visualOffsetX - 2}px, ${visualOffsetY + 62}px) rotate(-1deg) scale(${visualScale * 1.32})`,
    "--front-desktop-transform": `translate(${visualOffsetX - 34}px, ${visualOffsetY + 56}px) rotate(-1deg) scale(${visualScale * 1.19})`,
  };
  const backTransformVars = {
    "--back-mobile-transform": `translate(${visualOffsetX + 28}px, ${visualOffsetY + 88}px) rotate(2deg) scale(${visualScale * 0.98})`,
    "--back-desktop-transform": `translate(${visualOffsetX + 56}px, ${visualOffsetY + 74}px) rotate(4deg) scale(${visualScale * 1.04})`,
  };

  if (!activeBoard) return null;

  const goToBoard = (index) => {
    setActiveIndex((index + showcaseBoards.length) % showcaseBoards.length);
  };

  const goPrevious = () => goToBoard(activeIndex - 1);
  const goNext = () => goToBoard(activeIndex + 1);
  const isMobileViewport = () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

  const startDragPoint = (clientX, clientY) => {
    dragStateRef.current = {
      x: clientX,
      y: clientY,
    };
  };

  const startDrag = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (event.pointerType === "mouse" && !isMobileViewport()) return;

    startDragPoint(event.clientX, event.clientY);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const finishDragPoint = (clientX, clientY) => {
    if (!dragStateRef.current) return;

    const deltaX = clientX - dragStateRef.current.x;
    const deltaY = clientY - dragStateRef.current.y;
    dragStateRef.current = null;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.1) return;

    if (deltaX < 0) {
      goNext();
    } else {
      goPrevious();
    }
  };

  const finishDrag = (event) => {
    finishDragPoint(event.clientX, event.clientY);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const cancelDrag = () => {
    dragStateRef.current = null;
  };

  const handleStageClick = (event) => {
    if (event.target.closest?.("button") || isMobileViewport()) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    if (clickX >= rect.width / 2) {
      goNext();
    } else {
      goPrevious();
    }
  };

  return (
    <div
      id="rental-mini-showroom"
      data-mini-showroom-variant="homepage-promo"
      className="relative h-full min-h-[340px] touch-pan-y select-none overflow-hidden rounded-[30px] border border-epicWhite/10 bg-epicWhite/5 shadow-2xl shadow-black/20 lg:min-h-[360px] lg:rounded-[38px]"
      onPointerDown={startDrag}
      onPointerUp={finishDrag}
      onPointerCancel={cancelDrag}
      onMouseDown={(event) => {
        if (isMobileViewport()) startDragPoint(event.clientX, event.clientY);
      }}
      onMouseUp={(event) => finishDragPoint(event.clientX, event.clientY)}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        if (touch) startDragPoint(touch.clientX, touch.clientY);
      }}
      onTouchEnd={(event) => {
        const touch = event.changedTouches[0];
        if (touch) finishDragPoint(touch.clientX, touch.clientY);
      }}
      onClick={handleStageClick}
    >
      <div
        aria-label={`Preview ${activeBoard.name}`}
        className="absolute inset-x-0 bottom-12 top-4 md:bottom-16 md:top-8"
      >
        <div className="absolute inset-x-10 bottom-0 h-16 rounded-full bg-epicDark/35 blur-2xl md:inset-x-14" />
        <div
          data-mini-board
          data-mini-board-pair={activeBoard.backImage ? "true" : undefined}
          className="relative mx-auto h-full max-h-[455px] w-[86%] max-w-[330px] md:w-[78%] md:max-h-[520px] md:max-w-[330px]"
        >
          {activeBoard.backImage && (
            <div
              data-mini-board-back
              className="absolute inset-0 z-0 hidden opacity-35 brightness-75 saturate-50 md:block md:[transform:var(--back-desktop-transform)]"
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
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-48 bg-gradient-to-t from-epicDark via-epicDark/74 to-transparent md:h-44 md:via-epicDark/62" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-32 bg-gradient-to-t from-epicDark/82 to-transparent md:h-24 md:from-epicDark/72" />

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
                onClick={() => goToBoard(index)}
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
