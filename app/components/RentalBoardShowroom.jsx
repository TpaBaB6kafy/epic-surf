"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  formatBoardPrice,
  getBoardLevelLabel,
  getBoardTypeLabel,
  getLocalizedBoard,
} from "../data/rentalBoards";

const showroomCopy = {
  en: {
    eyebrow: "Board showroom",
    title: "Choose your board",
    description: "Browse the available shapes, choose a board, and message Epic Surf School with the board already attached to your request.",
    recommended: "Recommended",
    choose: "Choose this board",
    chooseAria: (name) => `Choose ${name}`,
    previousAria: "Previous board",
    nextAria: "Next board",
    showBoardAria: (index) => `Show board ${index + 1}`,
  },
  ru: {
    eyebrow: "ВИТРИНА ДОСОК",
    title: "ВЫБЕРИТЕ ДОСКУ",
    description: "Выберите подходящую доску и напишите Epic Surf School — доска будет уже указана в сообщении.",
    recommended: "РЕКОМЕНДУЕМ",
    choose: "Выбрать эту доску",
    chooseAria: (name) => `Выбрать ${name}`,
    previousAria: "Предыдущая доска",
    nextAria: "Следующая доска",
    showBoardAria: (index) => `Показать доску ${index + 1}`,
  },
};

function boardVisualStyle(board, scaleBoost = 1, offset = {}) {
  const x = (board.visualOffsetX || 0) + (offset.x || 0);
  const y = (board.visualOffsetY || 0) + (offset.y || 0);

  return {
    transform: `translate(${x}px, ${y}px) scale(${(board.visualScale || 1) * scaleBoost})`,
  };
}

export default function RentalBoardShowroom({ boards, onChooseBoard, lang = "en" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStateRef = useRef(null);
  const wheelLockRef = useRef(false);
  const language = lang === "ru" ? "ru" : "en";
  const copy = showroomCopy[language];
  const activeBoardSource = boards[activeIndex] || boards[0];
  const activeBoard = getLocalizedBoard(activeBoardSource, language);
  const previousBoard = boards[(activeIndex - 1 + boards.length) % boards.length];
  const nextBoard = boards[(activeIndex + 1) % boards.length];
  const activeBoardName = activeBoard.displayName || activeBoard.name;

  const activeLevel = useMemo(
    () => activeBoard.level.map((level) => getBoardLevelLabel(level, language)).join(" / "),
    [activeBoard, language],
  );

  const goToBoard = (index) => {
    setActiveIndex((index + boards.length) % boards.length);
  };

  const goPrevious = () => goToBoard(activeIndex - 1);
  const goNext = () => goToBoard(activeIndex + 1);

  const startDrag = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (event.target.closest?.("button, a")) return;

    dragStateRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const finishDrag = (event) => {
    if (!dragStateRef.current) return;

    const deltaX = event.clientX - dragStateRef.current.x;
    const deltaY = event.clientY - dragStateRef.current.y;
    dragStateRef.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.1) return;
    if (deltaX < 0) {
      goNext();
    } else {
      goPrevious();
    }
  };

  const cancelDrag = () => {
    dragStateRef.current = null;
  };

  const handleWheel = (event) => {
    if (wheelLockRef.current || Math.abs(event.deltaX) < 30 || Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;

    wheelLockRef.current = true;
    if (event.deltaX > 0) {
      goNext();
    } else {
      goPrevious();
    }

    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 420);
  };

  if (!activeBoard) return null;

  return (
    <section
      id="rental-board-showroom"
      data-showroom-theme="dark-integrated"
      className="bg-epicDark px-4 pb-12 pt-2 text-epicWhite md:px-6 md:pb-20 md:pt-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex flex-col gap-4 md:mb-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-black uppercase tracking-wide text-epicRed">{copy.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-black uppercase leading-tight tracking-normal md:mt-3 md:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-2 hidden text-sm font-medium leading-6 text-epicWhite/68 md:mt-3 md:block md:text-base">
              {copy.description}
            </p>
          </div>
          <p className="w-fit rounded-full border border-epicWhite/12 bg-epicWhite/5 px-4 py-2 text-[12px] font-black uppercase tracking-wide text-epicMint">
            {activeIndex + 1} / {boards.length}
          </p>
        </div>

        <div className="rounded-[30px] border border-epicWhite/12 bg-epicWhite/5 p-3 shadow-2xl shadow-black/20 md:rounded-[42px] md:p-4 lg:grid lg:grid-cols-[minmax(0,62%)_minmax(400px,1fr)] lg:items-stretch lg:gap-7 lg:p-5">
          <div
            data-showroom-stage
            className="relative min-h-[280px] overflow-hidden rounded-[24px] bg-epicDark text-epicWhite md:min-h-[620px] lg:min-h-[650px] lg:rounded-[34px]"
            onPointerDown={startDrag}
            onPointerUp={finishDrag}
            onPointerCancel={cancelDrag}
            onWheel={handleWheel}
          >
            <div className="absolute inset-x-8 bottom-8 h-12 rounded-full bg-epicWhite/6 blur-2xl md:inset-x-8 md:bottom-11 md:h-20" />
            <div className="absolute inset-x-16 bottom-12 h-8 rounded-full bg-epicDark/70 blur-xl shadow-2xl shadow-black/25 md:inset-x-14 md:bottom-[68px] md:h-10" />

            <div className="absolute inset-0 hidden items-end justify-center gap-24 px-0 pb-14 opacity-40 md:flex lg:gap-36">
              <div className="relative h-[450px] w-[200px] md:h-[550px] md:w-[240px]">
                <Image
                  src={previousBoard.image}
                  alt={previousBoard.displayName || previousBoard.name}
                  fill
                  sizes="240px"
                  className="object-contain"
                  draggable={false}
                  style={boardVisualStyle(previousBoard, 0.98, { y: 28 })}
                />
              </div>
              <div className="relative h-[450px] w-[200px] md:h-[540px] md:w-[230px]">
                <Image
                  src={nextBoard.image}
                  alt={nextBoard.displayName || nextBoard.name}
                  fill
                  sizes="230px"
                  className="object-contain"
                  draggable={false}
                  style={boardVisualStyle(nextBoard, 0.94, { y: 30 })}
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[24%] bg-gradient-to-l from-epicDark via-epicDark/72 to-transparent lg:block" />

            <div className="absolute inset-0 z-[2] flex items-end justify-center px-10 pb-8 pt-5 md:px-20 md:pb-12">
              <div
                data-showroom-board
                className="relative h-[270px] w-full max-w-[400px] md:h-[590px] md:max-w-[520px] lg:h-[620px]"
                style={boardVisualStyle(activeBoard, 1.1, { y: 76 })}
              >
                <Image
                  src={activeBoard.image}
                  alt={activeBoardName}
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, 82vw"
                  className="object-contain"
                  draggable={false}
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-epicDark via-epicDark/92 to-transparent md:h-40" />

            <button
              type="button"
              onClick={goPrevious}
              aria-label={copy.previousAria}
              className="absolute left-4 top-[46%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-epicWhite/15 bg-epicDark/76 text-epicWhite transition-all hover:bg-epicRed active:scale-95 md:left-5 md:top-[48%] md:h-11 md:w-11"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={copy.nextAria}
              className="absolute right-4 top-[46%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-epicWhite/15 bg-epicDark/76 text-epicWhite transition-all hover:bg-epicRed active:scale-95 md:right-5 md:top-[48%] md:h-11 md:w-11"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <aside
            data-showroom-panel
            className="relative z-10 -mt-3 flex flex-col rounded-[22px] border border-epicWhite/10 bg-epicDark/88 p-5 text-epicWhite shadow-2xl shadow-black/20 md:-mt-5 md:p-7 lg:mt-0 lg:h-full lg:rounded-[30px]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-epicWhite px-3 py-1 text-[11px] font-black uppercase tracking-wide text-epicDark">
                {getBoardTypeLabel(activeBoard.type, language)}
              </span>
              {activeBoard.recommended && (
                <span className="rounded-full bg-epicMint px-3 py-1 text-[11px] font-black uppercase tracking-wide text-epicDark">
                  {copy.recommended}
                </span>
              )}
            </div>

            <h3 className="mt-4 text-3xl font-black uppercase leading-none tracking-normal text-epicWhite md:mt-5 md:text-5xl">
              {activeBoardName}
            </h3>

            <div className="mt-3 flex flex-wrap gap-2 text-sm font-black text-epicWhite/70 md:mt-5">
              <span>{activeBoard.size}</span>
              <span className="text-epicRed">/</span>
              <span>{activeLevel}</span>
            </div>

            <p className="mt-4 text-[22px] font-black leading-tight text-epicMint md:mt-6 md:text-[32px]">
              {formatBoardPrice(activeBoard.price, language)}
            </p>
            <p className="mt-3 hidden text-sm font-medium leading-6 text-epicWhite/68 md:mt-4 md:block md:text-base">{activeBoard.description}</p>

            <ul className="mt-4 grid gap-2 md:mt-6 md:gap-3">
              {activeBoard.bestFor.slice(0, 3).map((item, index) => (
                <li
                  key={item}
                  data-board-best-for={index < 2 ? "true" : undefined}
                  className={`gap-3 text-sm font-bold leading-6 text-epicWhite/72 ${index < 2 ? "flex" : "hidden md:flex"}`}
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-epicRed" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => onChooseBoard(activeBoard)}
              aria-label={copy.chooseAria(activeBoardName)}
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-[16px] bg-epicRed px-7 text-sm font-black uppercase tracking-wide text-epicWhite shadow-lg transition-all hover:brightness-105 active:scale-95 md:mt-7 md:h-14 lg:mt-auto"
            >
              {copy.choose}
            </button>
          </aside>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-1.5 md:mt-5 md:gap-2">
          {boards.map((board, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={board.id}
                type="button"
                onClick={() => goToBoard(index)}
                aria-label={copy.showBoardAria(index)}
                aria-current={isActive ? "true" : undefined}
                data-board-nav-item
                className={`flex h-8 min-w-8 items-center justify-center rounded-full border px-2.5 text-[11px] font-black transition-all active:scale-95 ${
                  isActive
                    ? "border-epicRed bg-epicRed text-epicWhite"
                    : "border-epicWhite/10 bg-epicWhite/5 text-epicWhite/55 hover:border-epicMint/45 hover:text-epicWhite"
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
