"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function FAQ({ title, titleEnd, items }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="py-32 bg-epicWhite px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16 tracking-normal leading-tight break-words">{title} <span className="text-epicRed">{titleEnd}</span></h2>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="border-b border-epicPink pb-4">
              <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex justify-between items-center py-6 text-left group">
                <span className="font-bold text-lg md:text-2xl text-epicDark group-hover:text-epicRed transition-colors leading-snug break-words">{item.q}</span>
                <div className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-45' : ''}`}><X size={24} className="text-epicRed" /></div>
              </button>
              <AnimatePresence>{openFaq === idx && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="pb-6 text-epicDark/60 text-lg leading-relaxed">{item.a}</p></motion.div>}</AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
