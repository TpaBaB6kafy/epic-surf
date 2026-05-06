"use client";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Events({ t, openEventGallery }) {
  return (      <section id="events" className="py-24 bg-epicWhite px-6 scroll-mt-24 border-t border-epicPink/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-14">
            <div className="max-w-3xl">
              <div className="inline-block bg-epicRed/10 text-epicRed px-4 py-1 rounded-full font-bold text-[11px] tracking-wide border border-epicRed/10 mb-5">Community Calendar</div>
              <h2 className="text-4xl md:text-7xl font-black tracking-normal leading-tight text-epicDark break-words">{t.eventsTitle}</h2>
            </div>
            <p className="max-w-xl text-base md:text-lg font-medium leading-relaxed text-epicDark/60 break-words">{t.eventsIntro}</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 h-full rounded-[36px] lg:rounded-[44px] overflow-hidden bg-epicDark text-white border border-white/10 shadow-2xl"
            >
              <div className="grid md:grid-cols-[0.9fr_1.1fr] min-h-[520px] h-full">
                <div className="relative min-h-[320px] md:h-full bg-white/5">
                  <Image src={t.eventsItems[0].image} alt={t.eventsItems[0].title} fill sizes="(min-width: 1024px) 40vw, 100vw" className={t.eventsItems[0].imageClass} />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-end">
                  <div className="text-epicRed text-[11px] font-bold tracking-wide leading-snug mb-5">{t.eventsItems[0].type}</div>
                  <h3 className="text-4xl md:text-5xl font-black leading-tight tracking-normal mb-5 break-words">{t.eventsItems[0].title}</h3>
                  <p className="text-white/65 text-base md:text-lg font-medium leading-relaxed break-words">{t.eventsItems[0].desc}</p>
                  <button onClick={() => openEventGallery(t.eventsItems[0].galleryKey)} className="mt-8 self-start rounded-full bg-white px-6 py-3 text-[11px] font-bold tracking-wide leading-snug text-epicDark transition-all hover:bg-epicRed hover:text-white active:scale-95">{t.eventsItems[0].buttonLabel}</button>
                </div>
              </div>
            </motion.article>

            <div className="lg:col-span-5 grid sm:grid-cols-3 lg:grid-cols-1 gap-5 lg:gap-6">
              {t.eventsItems.slice(1).map((event, idx) => (
                <motion.article
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-white rounded-[32px] overflow-hidden border border-epicPink shadow-sm"
                >
                  <div className="grid lg:grid-cols-[180px_1fr] h-full">
                    <div className="relative h-52 sm:h-44 lg:h-full min-h-[180px] bg-epicPink">
                      <Image src={event.image} alt={event.title} fill sizes="(min-width: 1024px) 180px, 100vw" className={event.imageClass} />
                    </div>
                    <div className="p-6 flex flex-col justify-center min-w-0">
                      <div className="text-epicRed text-[10px] font-bold tracking-wide leading-snug mb-3">{event.type}</div>
                      <h3 className="text-xl md:text-2xl font-black leading-tight tracking-normal text-epicDark mb-3 break-words">{event.title}</h3>
                      <p className="text-epicDark/55 text-sm font-medium leading-relaxed break-words">{event.desc}</p>
                      <button onClick={() => openEventGallery(event.galleryKey)} className="mt-5 self-start rounded-full bg-epicDark px-5 py-3 text-[10px] font-bold tracking-wide leading-snug text-white transition-all hover:bg-epicRed active:scale-95">{event.buttonLabel}</button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}
