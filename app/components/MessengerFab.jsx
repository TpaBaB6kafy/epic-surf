"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { buildTelegramUrl, buildWhatsAppUrl, buildZaloUrl, trackEvent } from "../utils/tracking";

export default function MessengerFab({ links, lang = "en", ChatWhatsAppIcon, ChatTelegramIcon, ChatZaloIcon, variant = "default" }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isHomeV2Variant = variant === "homeV2";
  const message = lang === "ru"
    ? "Привет! Хочу задать вопрос про Epic Surf School."
    : "Hi! I have a question about Epic Surf School.";
  const handleMessengerClick = (event, eventName, label, hrefBuilder) => {
    if (hrefBuilder) {
      event.currentTarget.href = hrefBuilder();
    }
    trackEvent(eventName, {
      language: lang,
      service_type: "general_question",
      cta_location: "floating_messenger",
      cta_label: label,
    });
  };

  return (
    <>
      {/* MESSENGERS FAB */}
      <div data-home-v2-messenger-fab={isHomeV2Variant ? "true" : undefined} className={`fixed z-[60] flex flex-col-reverse items-end ${isHomeV2Variant ? "bottom-3 right-3 gap-3 sm:bottom-5 sm:right-5" : "bottom-6 right-6 gap-4"}`}>
        <button
          type="button"
          aria-label={isChatOpen ? "Close messenger options" : "Open messenger options"}
          aria-expanded={isChatOpen}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`flex items-center justify-center rounded-full transition-all duration-300 active:scale-90 ${isHomeV2Variant ? "h-12 w-12 shadow-[3px_4px_0_rgba(0,0,0,0.28)] sm:h-14 sm:w-14" : "h-16 w-16 shadow-2xl"} ${isChatOpen ? 'bg-epicDark rotate-[135deg]' : 'bg-epicRed rotate-0'}`}
        >
          {isChatOpen ? <X size={isHomeV2Variant ? 23 : 32} color="white" /> : <MessageCircle size={isHomeV2Variant ? 23 : 32} color="white" />}
        </button>
        <AnimatePresence>{isChatOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }} className="flex flex-col gap-4 mb-2">
            <a href={links.whatsapp} onClick={(event) => handleMessengerClick(event, "whatsapp_click", "whatsapp", () => buildWhatsAppUrl(links.whatsapp, message, { language: lang }))} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center rounded-full active:scale-95 shadow-xl overflow-hidden" aria-label="WhatsApp chat">
              <ChatWhatsAppIcon className="w-full h-full" />
            </a>
            <a href={links.telegram} onClick={(event) => handleMessengerClick(event, "telegram_click", "telegram", () => buildTelegramUrl(links.telegram, message, { language: lang }))} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center rounded-full active:scale-95 shadow-xl overflow-hidden" aria-label="Telegram chat">
              <ChatTelegramIcon className="w-full h-full" />
            </a>
            <a href={links.zalo} onClick={(event) => handleMessengerClick(event, "zalo_click", "zalo", () => buildZaloUrl(links.zalo, message, { language: lang }))} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center rounded-full active:scale-95 shadow-xl overflow-hidden" aria-label="Zalo chat">
              <ChatZaloIcon className="w-full h-full" />
            </a>
          </motion.div>
        )}</AnimatePresence>
        {isChatOpen && <div onClick={() => setIsChatOpen(false)} className="fixed inset-0 z-[-1] bg-black/5 backdrop-blur-[2px]" />}
      </div>
    </>
  );
}
