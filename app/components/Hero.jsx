"use client";

import { motion } from "framer-motion";

export default function Hero({ t, lang }) {
  return (
    <section className="relative h-screen flex items-center justify-center bg-epicDark overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
        <source src="/hero-surf.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-[1] bg-epicDark/40"></div>
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-epicDark/50 via-transparent to-epicDark/70 pointer-events-none"></div>

      <div className="relative z-10 text-center px-4 pt-20 flex flex-col items-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="text-[10vw] sm:text-5xl md:text-8xl font-extrabold text-white tracking-normal mb-8 leading-[0.95] text-center flex flex-col items-center break-words"
        >
          <motion.span variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="block">
            {t.heroTitle}
          </motion.span>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-wrap items-center justify-center gap-x-3 md:gap-x-5 py-2 text-[#EF233C]"
          >
            <span className="font-black">Epic</span>
            <span className="text-white font-extrabold">{lang === "ru" ? "волну" : "wave"}</span>
          </motion.div>

          <motion.span variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="block">
            {lang === "ru" ? "в Дананге" : "in Da Nang"}
          </motion.span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="text-white/90 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          {t.heroSub}
        </motion.p>
      </div>
    </section>
  );
}
