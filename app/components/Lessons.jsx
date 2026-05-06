"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Star, Target, Waves, Wind } from "lucide-react";

export default function Lessons({ t, links, openBookingModal }) {
  const lessonsScrollRef = useRef(null);
  const lessonsDragRef = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    moved: false
  });

  const handleLessonsWheel = (event) => {
    const scroller = lessonsScrollRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    const canScroll =
      (delta < 0 && scroller.scrollLeft > 0) ||
      (delta > 0 && scroller.scrollLeft < maxScrollLeft - 1);

    if (!delta || !canScroll) return;

    event.preventDefault();
    scroller.scrollBy({ left: delta, behavior: "smooth" });
  };

  const handleLessonsPointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const scroller = lessonsScrollRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;

    lessonsDragRef.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: scroller.scrollLeft,
      moved: false
    };
    scroller.setPointerCapture?.(event.pointerId);
  };

  const handleLessonsPointerMove = (event) => {
    const scroller = lessonsScrollRef.current;
    const drag = lessonsDragRef.current;
    if (!scroller || !drag.isDragging) return;

    const diff = event.clientX - drag.startX;
    if (Math.abs(diff) > 4) drag.moved = true;
    scroller.scrollLeft = drag.scrollLeft - diff;
  };

  const stopLessonsDrag = (event) => {
    const scroller = lessonsScrollRef.current;
    if (scroller?.hasPointerCapture?.(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
    lessonsDragRef.current.isDragging = false;
  };

  const handleLessonsClickCapture = (event) => {
    if (!lessonsDragRef.current.moved) return;

    event.preventDefault();
    event.stopPropagation();
    lessonsDragRef.current.moved = false;
  };

  return (
    <section id="lessons" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
      <h2 className="text-4xl md:text-6xl font-black text-center mb-12 md:mb-16 tracking-normal leading-tight text-epicDark break-words">
        {t.sectionTitle} <span className="text-epicRed">{t.sectionTitleRide}</span>
      </h2>

      <div
        ref={lessonsScrollRef}
        onWheel={handleLessonsWheel}
        onPointerDown={handleLessonsPointerDown}
        onPointerMove={handleLessonsPointerMove}
        onPointerUp={stopLessonsDrag}
        onPointerCancel={stopLessonsDrag}
        onPointerLeave={stopLessonsDrag}
        onClickCapture={handleLessonsClickCapture}
        className="relative left-1/2 w-screen -translate-x-1/2 px-6 md:left-auto md:w-full md:-mx-6 md:translate-x-0 md:px-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none touch-auto snap-x snap-mandatory md:snap-none scroll-px-6"
      >
        <div className="flex gap-4 sm:gap-6 md:gap-8 pb-8 w-max">
          {t.cards.map((item, i) => (
            <motion.div
              key={i}
              className="w-[76vw] max-w-[300px] sm:w-[300px] flex-shrink-0 snap-start bg-epicPink rounded-[40px] overflow-hidden shadow-lg flex flex-col border border-white/50 group"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={`/gallery/lesson-${i + 1}.webp`}
                  alt={item.title}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-4 text-epicRed">
                  {i === 0 ? <Waves size={32} /> :
                    i === 1 ? <Award size={32} /> :
                      i === 2 ? <Star size={32} /> :
                        i === 3 ? <Wind size={32} /> : <Target size={32} />}
                </div>
                <div className="text-[11px] text-epicRed font-bold mb-2 tracking-wide leading-snug">{item.badge}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-epicDark leading-snug break-words hyphens-auto">{item.title}</h3>
                <p className="text-epicDark/70 mb-6 text-sm flex-1">{item.desc}</p>
                <div className="text-2xl font-black mb-8 text-epicDark">{item.price}</div>
                <button onClick={() => openBookingModal(links.group)} className="w-full bg-epicDark text-white py-5 rounded-[20px] font-black uppercase text-xs tracking-wide shadow-lg transition-all duration-300 group-hover:bg-epicRed hover:bg-epicRed hover:-translate-y-0.5 active:translate-y-0 active:scale-95">{t.btnBook}</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
