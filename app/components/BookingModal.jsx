"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function BookingModal({ bookingModalUrl, setBookingModalUrl, title }) {
  return (
    <>
      {/* Booking modal */}
      <AnimatePresence>{bookingModalUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBookingModalUrl(null)} className="absolute inset-0 bg-epicDark/95 backdrop-blur-md cursor-pointer" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative w-full max-w-5xl h-[85vh] bg-epicWhite rounded-[40px] overflow-hidden z-10 flex flex-col shadow-2xl border border-white/20">
            <div className="flex justify-between items-center p-6 border-b border-epicPink bg-epicWhite text-epicDark font-bold uppercase text-[11px] tracking-wide leading-snug"><span>{title}</span><button onClick={() => setBookingModalUrl(null)} className="p-2 bg-epicPink rounded-full text-epicDark"><X size={18} /></button></div>
            <div className="flex-1 bg-white relative"><iframe src={bookingModalUrl} className="w-full h-full border-none" title="Booking" /></div>
          </motion.div>
        </div>
      )}</AnimatePresence>
    </>
  );
}
