"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Included({ title, items, includedImages }) {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl md:text-6xl font-black mb-12 tracking-normal leading-tight text-epicDark text-center break-words">
          {title}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-[1.24fr_0.96fr_0.96fr_0.84fr] md:grid-rows-2 gap-4 md:gap-6 md:auto-rows-[250px]">
          {items.map((item, idx) => {
            const titleSize = "text-2xl md:text-2xl font-black leading-tight mb-2 break-words";
            const descSize = "text-[11px] md:text-sm font-bold tracking-wide leading-snug break-words";

            // Manual card tuning: card = tile size/grid, img/secondaryImg = image position, text = position/alignment, titleClass/descClass = text width, wrapping, hyphenation.
            const styles = [
              {
                card: "col-span-2 md:col-span-1 md:row-span-2 md:col-start-1 bg-[#EDF2F4] justify-end min-h-[270px] md:min-h-[520px]",
                img: "absolute top-16 right-1 w-[55%] md:top-26 md:right-2 md:w-[105%] object-contain rotate-8",
                text: "absolute left-8 bottom-46 md:left-8 md:bottom-100 max-w-[60%] md:max-w-[62%] z-10",
                titleClass: "whitespace-normal break-words hyphens-auto",
                descClass: "whitespace-normal break-words hyphens-auto",
                title: "text-epicDark", desc: "text-epicDark/40"
              },
              {
                card: "col-span-2 md:col-span-2 md:row-span-1 md:col-start-2 bg-[#EDF2F4] justify-center min-h-[240px] md:min-h-[250px]",
                img: "absolute -bottom-18 -right-2 w-[50%] md:-bottom-28 md:right-88 md:w-[42%] object-contain rotate-3 md:rotate-5",
                secondaryImg: "absolute -bottom-8 right-[42%] w-[28%] -md:bottom-6 md:right-[-10%] md:w-[38%] object-contain -rotate-6",
                text: "absolute left-8 top-4 md:left-42 md:top-6 max-w-[56%] md:max-w-[45%] z-10 text-left md:text-center",
                titleClass: "whitespace-normal break-words hyphens-auto",
                descClass: "whitespace-normal break-words hyphens-auto",
                title: "text-epicDark", desc: "text-epicDark/40"
              },
              {
                card: "col-span-2 md:col-span-2 md:row-span-1 md:col-start-2 bg-[#EDF2F4] justify-center min-h-[240px] md:min-h-[250px]",
                img: "absolute -bottom-0 -right-12 w-[68%] md:bottom-0 -md:right-2 md:w-[58%] object-contain rotate-0 md:rotate-0",
                text: "absolute left-8 top-4 md:left-8 md:top-6 max-w-[54%] md:max-w-[50%] z-10",
                titleClass: "whitespace-normal break-words hyphens-auto",
                descClass: "whitespace-normal break-words hyphens-auto",
                title: "text-epicDark", desc: "text-epicDark/40"
              },
              {
                card: "col-span-2 md:col-span-1 md:row-span-2 md:col-start-4 md:row-start-1 bg-[#EDF2F4] justify-end min-h-[180px] md:min-h-[520px]",
                img: "absolute -bottom-12 -right-1 w-[44%] md:-bottom-6 md:-right-8 md:w-[110%] object-contain rotate-6 md:rotate-8",
                text: "absolute left-8 bottom-27 md:left-8 md:bottom-105 max-w-[56%] md:max-w-[82%] z-10",
                titleClass: "whitespace-normal break-words hyphens-auto",
                descClass: "whitespace-normal break-words hyphens-auto",
                title: "text-epicDark", desc: "text-epicDark/40"
              }
            ][idx];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-[40px] p-8 relative overflow-hidden group shadow-sm border border-gray-100 flex flex-col transition-all duration-300 ${styles.card}`}
              >
                <Image
                  src={includedImages[idx].primary}
                  alt={item.label}
                  width={420}
                  height={300}
                  className={`!max-w-none drop-shadow-xl transition-all duration-500 z-0 ${styles.img}`}
                />
                {includedImages[idx].secondary && (
                  <Image
                    src={includedImages[idx].secondary}
                    alt=""
                    width={320}
                    height={260}
                    className={`!max-w-none drop-shadow-xl transition-all duration-500 z-0 ${styles.secondaryImg}`}
                  />
                )}
                <div className={styles.text}>
                  <h4 className={`${styles.title} ${titleSize} ${styles.titleClass || ""}`}>{item.label}</h4>
                  <p className={`${styles.desc} ${descSize} ${styles.descClass || ""}`}>{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
