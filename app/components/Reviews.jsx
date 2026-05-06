"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function Reviews({ t, googleMapsUrl }) {
  return (
    <section id="reviews" className="py-24 bg-epicPink border-y border-white/50 scroll-mt-24 text-center text-epicDark px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-7xl font-black mb-20 tracking-normal leading-tight break-words">{t.reviewsTitle}</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {t.reviewsList.map((rev, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-10 rounded-[40px] shadow-xl text-left flex flex-col justify-between border border-white">
              <p className="font-medium leading-relaxed text-base md:text-lg mb-8 break-words">{rev.text}</p>
              <div className="flex items-center gap-4 border-t border-epicPink pt-6">
                <div className="w-14 h-14 bg-epicDark text-white rounded-full flex items-center justify-center font-black overflow-hidden border-2 border-white shadow-sm relative">
                  {rev.img ? <Image src={rev.img} fill sizes="56px" className="object-cover" alt={rev.name} /> : rev.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold tracking-wide leading-snug break-words">{rev.name}</div>
                  <div className="text-[11px] opacity-45 font-bold leading-snug">{rev.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-epicRed font-bold text-sm tracking-wide leading-snug break-words">{t.reviewsLink} <Globe size={14} /></a>
      </div>
    </section>
  );
}
