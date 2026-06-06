"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function BookingModal({ bookingModalUrl, setBookingModalUrl, title }) {
  return (
    <>
      {/* Booking modal */}
      <AnimatePresence>{bookingModalUrl && (
        <BookingModalFrame key={bookingModalUrl} bookingModalUrl={bookingModalUrl} setBookingModalUrl={setBookingModalUrl} title={title} />
      )}</AnimatePresence>
    </>
  );
}

function BookingModalFrame({ bookingModalUrl, setBookingModalUrl, title }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const pathname = usePathname();
  const isRussian = pathname ? pathname.startsWith("/ru") : title !== "Booking";
  const loadingText = isRussian ? "Загружаем форму записи..." : "Loading booking form...";
  const timeoutText = isRussian
    ? "Загрузка занимает больше времени? Откройте запись в новой вкладке."
    : "Taking longer than usual? Open booking in a new tab.";

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setHasTimedOut(true);
    }, 7000);

    return () => window.clearTimeout(timeoutId);
  }, [bookingModalUrl, isLoading]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasTimedOut(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 md:p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBookingModalUrl(null)} className="absolute inset-0 z-0 bg-epicDark/95 backdrop-blur-md cursor-pointer" />
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative z-10 w-full max-w-5xl h-[85vh] bg-epicWhite rounded-[28px] md:rounded-[40px] overflow-hidden flex flex-col shadow-2xl border border-white/20">
        <div className="flex justify-between items-center gap-3 p-4 md:p-6 border-b border-epicDark/10 bg-epicWhite text-epicDark font-bold uppercase text-[11px] tracking-wide leading-snug">
          <span>{title}</span>
          <div className="flex items-center gap-2">
            <a href={bookingModalUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-epicDark px-3 py-2 text-[10px] font-bold uppercase leading-none text-white transition-colors hover:bg-epicRed">
              Open booking in new tab
            </a>
            <button onClick={() => setBookingModalUrl(null)} className="p-2 bg-epicMint rounded-full text-epicDark" aria-label="Close booking modal"><X size={18} /></button>
          </div>
        </div>
        <div className="flex-1 bg-white relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white px-6 text-center text-epicDark">
              <div className="h-10 w-10 rounded-full border-4 border-epicDark/10 border-t-epicRed animate-spin" />
              <p className="text-sm font-bold leading-snug text-epicDark">{loadingText}</p>
              {hasTimedOut && (
                <p className="max-w-sm text-sm font-medium leading-relaxed text-epicDark/70">{timeoutText}</p>
              )}
              <a href={bookingModalUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-epicRed underline underline-offset-4">
                Open booking in new tab
              </a>
            </div>
          )}
          <iframe src={bookingModalUrl} onLoad={handleIframeLoad} className="w-full h-full border-none" title="Booking" />
        </div>
      </motion.div>
    </div>
  );
}
