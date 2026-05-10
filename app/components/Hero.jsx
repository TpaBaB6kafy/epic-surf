"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero({ t }) {
  return (
    <section className="relative h-screen flex items-center justify-center bg-epicDark overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
        <source src="/hero-surf.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-[1] bg-epicDark/40"></div>
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-epicDark/50 via-transparent to-epicDark/70 pointer-events-none"></div>

      <div className="relative z-10 text-center px-4 pt-20 flex flex-col items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="mb-2 md:mb-3 flex justify-center"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="w-[78vw] max-w-[720px]"
          >
            <Image
              src="/epic-logo-v-ksu-v6-big.png"
              alt="EPIC"
              width={1024}
              height={768}
              priority
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="hero-subtitle text-3xl md:text-5xl max-w-5xl mx-auto uppercase">
          {t.heroSub}
        </motion.p>
      </div>
    </section>
  );
}
