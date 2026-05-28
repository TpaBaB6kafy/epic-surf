"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { buildTelegramUrl, buildWhatsAppUrl, buildZaloUrl, trackEvent } from "../utils/tracking";

export default function MessengerFab({ links, lang = "en", ChatWhatsAppIcon, ChatTelegramIcon, ChatZaloIcon }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
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
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col-reverse items-end gap-4">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-16 h-16 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 active:scale-90 ${isChatOpen ? 'bg-epicDark rotate-[135deg]' : 'bg-epicRed rotate-0'}`}>{isChatOpen ? <X size={32} color="white" /> : <MessageCircle size={32} color="white" />}</button>
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
