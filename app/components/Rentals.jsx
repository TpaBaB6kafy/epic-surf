"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RentalCaravanIcon, RentalSurfboardIcon, RentalTshirtIcon, RentalUvIcon } from "./Icons";

export default function Rentals({ t, setRentalModalOpen }) {
  const [activeBoard, setActiveBoard] = useState(0);
  const boardSliderRef = useRef(null);

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
    <>
      {/* 4. RENTALS (FULL-WIDTH DARK) */}
      <section id="rentals" className="bg-epicDark text-white py-24 mt-20 relative overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
            <div className="lg:w-1/2 flex items-center justify-center relative group">
              <div className="relative w-full aspect-[4/3] min-h-[300px] sm:min-h-[380px] lg:aspect-auto lg:min-h-[620px] xl:min-h-[680px] overflow-hidden rounded-[36px] md:rounded-[60px] border border-white/10 shadow-2xl shadow-black/20 bg-[#1a1c2c]">
                <div ref={boardSliderRef} id="board-slider" onScroll={updateActiveBoard} className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                  {[1, 2, 3, 4].map((num, idx) => (
                    <div key={num} className="min-w-full h-full snap-center relative">
                      <Image src={`/gallery/board-${num}.webp`} alt={t.boardTypes[idx]} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-90" />
                      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8"><div className="bg-black/55 backdrop-blur-md border border-white/10 text-white px-4 md:px-5 py-2 rounded-full text-[11px] font-bold tracking-wide leading-snug shadow-xl">{t.boardTypes[idx]}</div></div>
                    </div>
                  ))}
                </div>
                <button onClick={() => scrollBoardSlider(-1)} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/12 backdrop-blur-md rounded-full flex items-center justify-center border border-white/15 hover:bg-epicRed transition-all opacity-90 hover:opacity-100 shadow-xl"><ChevronLeft className="w-5 h-5 md:w-7 md:h-7" /></button>
                <button onClick={() => scrollBoardSlider(1)} className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/12 backdrop-blur-md rounded-full flex items-center justify-center border border-white/15 hover:bg-epicRed transition-all opacity-90 hover:opacity-100 shadow-xl"><ChevronRight className="w-5 h-5 md:w-7 md:h-7" /></button>
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex items-center gap-2 rounded-full bg-black/35 backdrop-blur-md border border-white/10 px-3 py-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToBoard(idx)}
                      aria-label={`${t.boardTypes[idx]}`}
                      className={`h-2 rounded-full transition-all ${activeBoard === idx ? 'w-7 bg-epicRed' : 'w-2 bg-white/45 hover:bg-white/80'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="mb-12">
                <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-normal leading-[0.98] text-white break-words">{t.rentalTitle} <br /><span className="text-epicRed">{t.rentalTitleSurf}</span></h2>
                <p className="text-white/55 text-base md:text-lg max-w-lg leading-relaxed">{t.rentalDesc}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6 mb-12">
                {[{ k: 'featureLycra', svg: <RentalUvIcon className="h-full w-full" /> }, { k: 'featureSizes', svg: <RentalSurfboardIcon className="h-full w-full" /> }, { k: 'featureWetsuits', svg: <RentalTshirtIcon className="h-full w-full" /> }, { k: 'featureDelivery', svg: <RentalCaravanIcon className="h-full w-full" /> }].map((feat) => (
                  <div key={feat.k} className="flex items-center gap-3 md:gap-4 p-4 md:p-6 rounded-[28px] md:rounded-[32px] bg-white/5 border border-white/5 hover:border-epicRed/30 transition-all group backdrop-blur-sm min-w-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 text-epicRed group-hover:scale-110 transition-transform">{feat.svg}</div>
                    <span className="min-w-0 text-[10px] md:text-[11px] font-bold text-white/75 leading-snug tracking-normal break-words hyphens-auto">{t[feat.k]}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-10 border-t border-white/10">
                <div className="text-center sm:text-left"><div className="text-4xl md:text-5xl font-black text-white leading-tight">{t.rentalPrice}</div><div className="text-[11px] opacity-35 tracking-wide font-bold mt-2">{t.rentalUnit}</div></div>
                <button onClick={() => setRentalModalOpen(true)} className="w-full sm:w-auto px-12 py-6 bg-epicRed text-white rounded-[20px] font-black uppercase text-sm tracking-wide hover:bg-white hover:text-epicRed transition-all shadow-xl active:scale-95">{t.rentalBtn}</button>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
