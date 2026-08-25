"use client";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Events({ t, openEventGallery }) {
  return (      <section id="events" className="bg-epicWhite px-4 py-16 scroll-mt-24 border-t border-epicDark/10 sm:px-6 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-7xl font-black tracking-normal leading-tight text-epicDark break-words">{t.eventsTitle}</h2>
            </div>
          </div>

          <div data-events-grid className="grid items-stretch gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-6">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              data-event-card="featured"
              className="h-full overflow-hidden rounded-[32px] border border-white/10 bg-epicDark text-white shadow-2xl lg:col-span-7 lg:rounded-[44px]"
            >
              <div className="grid h-full min-h-[500px] md:min-h-[520px] md:grid-cols-[0.9fr_1.1fr]">
                <div data-event-media className="relative min-h-[280px] bg-white/5 md:h-full md:min-h-[320px]">
                  <Image src={t.eventsItems[0].image} alt={t.eventsItems[0].title} fill sizes="(min-width: 1024px) 40vw, 100vw" className={t.eventsItems[0].imageClass} />
                </div>
                <div className="flex flex-col justify-end p-6 md:p-10">
                  <div className="mb-3 text-[11px] font-bold leading-snug tracking-wide text-epicRed md:mb-5">{t.eventsItems[0].type}</div>
                  <h3 className="mb-4 break-words text-4xl font-black leading-tight tracking-normal md:mb-5 md:text-5xl">{t.eventsItems[0].title}</h3>
                  <p className="text-white/65 text-base md:text-lg font-medium leading-relaxed break-words">{t.eventsItems[0].desc}</p>
                  <button onClick={() => openEventGallery(t.eventsItems[0].galleryKey)} className="mt-6 self-start rounded-full bg-white px-6 py-3 text-[11px] font-bold leading-snug tracking-wide text-epicDark transition-all hover:bg-epicRed hover:text-white active:scale-95 md:mt-8">{t.eventsItems[0].buttonLabel}</button>
                </div>
              </div>
            </motion.article>

            <div className="grid gap-4 sm:grid-cols-3 sm:gap-5 lg:col-span-5 lg:grid-cols-1 lg:gap-6">
              {t.eventsItems.slice(1).map((event, idx) => (
                <motion.article
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  data-event-card="secondary"
                  className="overflow-hidden rounded-[28px] border border-white/20 bg-epicDark text-epicWhite shadow-sm sm:rounded-[32px]"
                >
                  <div className="grid h-full grid-cols-[120px_1fr] sm:grid-cols-1 lg:grid-cols-[180px_1fr]">
                    <div data-event-media className="relative h-full min-h-[220px] bg-epicDark sm:h-44 sm:min-h-[180px] lg:h-full">
                      <Image src={event.image} alt={event.title} fill sizes="(min-width: 1024px) 180px, 100vw" className={event.imageClass} />
                    </div>
                    <div className="flex min-w-0 flex-col justify-center p-4 sm:p-5 lg:p-6">
                      <div className="text-epicRed text-[10px] font-bold tracking-wide leading-snug mb-3">{event.type}</div>
                      <h3 className="text-xl md:text-2xl font-black leading-tight tracking-normal text-epicWhite mb-3 break-words">{event.title}</h3>
                      <p className="break-words text-[13px] font-medium leading-relaxed text-epicWhite/70 sm:text-sm">{event.desc}</p>
                      <button onClick={() => openEventGallery(event.galleryKey)} className="mt-4 self-start rounded-full bg-epicWhite px-4 py-2.5 text-[10px] font-bold leading-snug tracking-wide text-epicDark transition-all hover:bg-epicRed hover:text-epicWhite active:scale-95 sm:mt-5 sm:px-5 sm:py-3">{event.buttonLabel}</button>
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
