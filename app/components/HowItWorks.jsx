"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HowItWorks({ t }) {
  return (
    <section id="how-it-works" className="py-32 bg-epicWhite scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-24 space-y-6">
          <h2 className="text-4xl md:text-7xl font-black tracking-normal text-epicDark leading-[0.98] break-words">
            {t.howTitle} <span className="text-epicRed">{t.howTitleEnd}</span>
          </h2>
          <p className="text-epicDark/50 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            {t.howIntro}
          </p>
        </div>

        <div className="space-y-32">
          {t.howSteps.map((step, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-24`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <div className="aspect-[4/3] w-full rounded-[40px] overflow-hidden shadow-2xl bg-gray-100 relative">
                  <Image
                    src={`/gallery/process-${idx + 1}.webp`}
                    alt={step.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <div className="w-full lg:w-1/2">
                <div className="flex flex-col items-center lg:items-start space-y-6">
                  <div className="bg-epicRed text-white px-4 py-1 rounded-full text-[11px] font-bold tracking-wide leading-snug shadow-md">
                    {step.time}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black tracking-normal text-epicDark leading-tight text-center lg:text-left break-words hyphens-auto">
                    {step.title}
                  </h3>
                  <p className="text-epicDark/70 text-base md:text-lg leading-relaxed font-medium text-center lg:text-left max-w-lg">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
