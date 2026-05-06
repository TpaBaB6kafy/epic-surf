"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, X } from "lucide-react";

export default function RentalModal({ isRentalModalOpen, setRentalModalOpen, t, links }) {
  return (
    <>
      {/* Rental modal */}
      <AnimatePresence>
        {isRentalModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRentalModalOpen(false)}
              className="absolute inset-0 bg-epicDark/95 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[50px] p-10 shadow-2xl text-center border border-white/20"
            >
              <button onClick={() => setRentalModalOpen(false)} className="absolute top-8 right-8 text-epicDark/20 hover:text-epicRed transition-colors">
                <X size={24} />
              </button>

              <div className="mb-10 pt-4 text-epicDark">
                <div className="w-20 h-20 bg-[#EDF2F4] rounded-[30px] flex items-center justify-center text-epicRed mx-auto mb-6 shadow-sm">
                  <MessageCircle size={40} />
                </div>
                <h3 className="text-3xl font-black tracking-normal leading-tight break-words mb-3">{t.rentalModalTitle}</h3>
                <p className="opacity-60 text-sm leading-relaxed">{t.rentalModalSub}</p>
              </div>

              <div className="flex flex-col gap-4">
                <a href={`${links.whatsapp}?text=${encodeURIComponent(t.msgRental)}`} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-[#25D366] text-white px-8 py-5 rounded-2xl font-bold uppercase text-[11px] tracking-wide leading-snug hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                  WhatsApp <MessageCircle size={20} />
                </a>
                <a href={links.telegram} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-[#0088cc] text-white px-8 py-5 rounded-2xl font-bold uppercase text-[11px] tracking-wide leading-snug hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                  Telegram <ArrowUp size={20} className="rotate-45" />
                </a>
                <a href={links.zalo} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-[#0068ff] text-white px-8 py-5 rounded-2xl font-bold uppercase text-[11px] tracking-wide leading-snug hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                  Zalo <span className="text-lg font-black">Z</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
