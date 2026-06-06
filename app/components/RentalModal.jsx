"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { buildTelegramUrl, buildWhatsAppUrl, buildZaloUrl, trackEvent } from "../utils/tracking";
import { getBoardTrackingPayload } from "../data/rentalBoards";

export default function RentalModal({ isRentalModalOpen, setRentalModalOpen, t, links, selectedBoard = null }) {
  const language = t.btnBook === "Book Now" ? "en" : "ru";
  const baseMessage = language === "ru"
    ? "Привет! Хочу арендовать доску для серфинга."
    : "Hi! I want to rent a surfboard.";
  const selectedBoardMessage = selectedBoard ? ` I want to rent: ${selectedBoard.name}.` : "";
  const message = `${baseMessage}${selectedBoardMessage}`;
  const boardPayload = getBoardTrackingPayload(selectedBoard);
  const handleMessengerClick = (event, eventName, label, hrefBuilder) => {
    if (hrefBuilder) {
      event.currentTarget.href = hrefBuilder();
    }
    trackEvent(eventName, {
      language,
      service_type: "board_rental",
      cta_location: "rental_modal",
      cta_label: label,
      ...boardPayload,
    });
  };

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
              className="relative w-full max-w-sm rounded-[50px] border border-epicDark/10 bg-epicWhite p-10 text-center shadow-2xl"
            >
              <button onClick={() => setRentalModalOpen(false)} className="absolute top-8 right-8 text-epicDark/20 hover:text-epicRed transition-colors">
                <X size={24} />
              </button>

              <div className="mb-10 pt-4 text-epicDark">
                <div className="w-20 h-20 bg-epicMint rounded-[30px] flex items-center justify-center text-epicRed mx-auto mb-6 shadow-sm">
                  <MessageCircle size={40} />
                </div>
                <h3 className="text-3xl font-black tracking-normal leading-tight break-words mb-3">{t.rentalModalTitle}</h3>
                <p className="opacity-60 text-sm leading-relaxed">{t.rentalModalSub}</p>
                {selectedBoard && (
                  <div className="mt-5 rounded-[24px] border border-epicDark/10 bg-epicDark px-5 py-4 text-left text-epicWhite">
                    <p className="text-[11px] font-black uppercase tracking-wide text-epicMint">Selected board</p>
                    <p className="mt-2 text-base font-black leading-tight">Selected board: {selectedBoard.name}</p>
                    <p className="mt-1 text-sm font-medium leading-snug text-epicWhite/65">{selectedBoard.size} - {selectedBoard.level.join(", ")}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <a href={links.whatsapp} onClick={(event) => handleMessengerClick(event, "whatsapp_click", "whatsapp", () => buildWhatsAppUrl(links.whatsapp, message, { language }))} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-epicDark px-8 py-5 text-[11px] font-bold uppercase leading-snug tracking-wide text-epicWhite shadow-lg transition-all hover:scale-[1.02] hover:bg-epicRed active:scale-95">
                  WhatsApp <MessageCircle size={20} />
                </a>
                <a href={links.telegram} onClick={(event) => handleMessengerClick(event, "telegram_click", "telegram", () => buildTelegramUrl(links.telegram, message, { language }))} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-epicDark px-8 py-5 text-[11px] font-bold uppercase leading-snug tracking-wide text-epicWhite shadow-lg transition-all hover:scale-[1.02] hover:bg-epicRed active:scale-95">
                  Telegram <ArrowUp size={20} className="rotate-45" />
                </a>
                <a href={links.zalo} onClick={(event) => handleMessengerClick(event, "zalo_click", "zalo", () => buildZaloUrl(links.zalo, message, { language }))} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-epicDark px-8 py-5 text-[11px] font-bold uppercase leading-snug tracking-wide text-epicWhite shadow-lg transition-all hover:scale-[1.02] hover:bg-epicRed active:scale-95">
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
