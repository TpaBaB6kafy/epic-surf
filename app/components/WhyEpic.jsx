"use client";

import { motion } from "framer-motion";

export default function WhyEpic({ items }) {
  return (
    <section className="py-24 bg-epicWhite px-6 border-b border-epicPink/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-12 text-center">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-epicPink rounded-[24px] md:rounded-[30px] flex items-center justify-center text-epicRed shadow-sm border border-white/50 mb-6">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-sm md:text-lg font-bold text-epicDark leading-snug break-words hyphens-auto">{item.title}</h3>
                <p className="text-epicDark/60 text-[11px] md:text-sm max-w-[160px] md:max-w-[280px] mx-auto leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
