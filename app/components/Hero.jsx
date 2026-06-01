"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero({ lang = "en" }) {
  const heroTitle = lang === "ru"
    ? "Поймай свою EPIC волну в Дананге"
    : "Catch your EPIC wave in Da Nang";
  const heroSubtitle = lang === "ru"
    ? "ШКОЛА СЕРФИНГА В ДА НАНГЕ - МЕСТО, ГДЕ ЖИВУТ СЕРФИНГОМ"
    : "SURF SCHOOL IN DA NANG — A PLACE BUILT AROUND SURFING";

  return (
    <section className="relative isolate h-screen bg-epicDark overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
        <source src="/hero-surf.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-[1] bg-epicDark/40"></div>
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-epicDark/50 via-transparent to-epicDark/70 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-x-0 top-[25vh] z-[5] mx-auto flex w-full flex-col items-center gap-6 px-4 mix-blend-difference opacity-65 sm:top-[24vh] md:top-[20vh] md:gap-10"
        aria-hidden="true"
      >
        <Image
          src="/brand/epic-logo.svg"
          alt=""
          width={998}
          height={446}
          priority
          className="h-auto max-h-[32vh] w-[66vw] max-w-[280px] object-contain text-white sm:w-[min(58vw,500px)] sm:max-w-none md:w-[min(50vw,660px)] md:max-h-[38vh]"
        />
        <Image
          src="/brand/surf-school-hero-logo.svg"
          alt=""
          width={1115}
          height={155}
          priority
          className="h-auto w-[52vw] max-w-[220px] object-contain text-white sm:w-[min(42vw,340px)] sm:max-w-none md:w-[min(40vw,420px)]"
        />
      </motion.div>

      <div className="absolute inset-x-0 top-[calc(25vh+215px)] z-10 flex flex-col items-center px-4 text-center sm:top-[calc(24vh+360px)] md:top-[calc(20vh+500px)]">
        <h1 className="sr-only">{heroTitle}</h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-subtitle text-2xl sm:text-3xl md:text-5xl max-w-5xl mx-auto uppercase text-epicWhite leading-[1.3]"
        >
          {heroSubtitle}
        </motion.div>
      </div>
    </section>
  );
}
