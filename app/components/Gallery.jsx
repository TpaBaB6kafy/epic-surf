"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Gallery({
  links,
  lang,
  eventGalleryGroups,
  activeGalleryKey,
  setActiveGalleryKey,
  activeGalleryGroup,
  galleryLayoutClasses,
  galleryPhotoSrc,
  InstagramIcon,
}) {
  const galleryAlt = (idx) =>
    `${activeGalleryGroup.label} photo ${idx + 1} - Epic Surf School Da Nang`;

  return (
    <section id="gallery" className="py-24 bg-epicDark px-6 scroll-mt-24 border-t border-white/5 overflow-visible">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="space-y-4 text-white">
            <div className="inline-block bg-white/5 text-epicRed px-4 py-1 rounded-full font-bold text-[11px] tracking-wide border border-white/10">
              Community & Vibe
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-normal leading-[0.98] break-words">
              Epic <br />
              <span className="text-epicRed">Moments</span>
            </h2>
          </div>
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white text-epicDark px-8 py-4 rounded-[20px] font-bold text-sm tracking-wide hover:bg-epicRed hover:text-white transition-all shadow-xl"
          >
            <span>{lang === "ru" ? "Следить за нашей серф-жизнью" : "Follow our surf life"}</span>
            <InstagramIcon />
          </a>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {eventGalleryGroups.map((group) => (
            <button
              key={group.key}
              onClick={() => setActiveGalleryKey(group.key)}
              className={`rounded-full px-5 py-3 text-[11px] font-bold tracking-wide leading-snug transition-all active:scale-95 ${
                activeGalleryKey === group.key
                  ? "bg-epicRed text-white"
                  : "bg-white/5 text-white/65 hover:bg-white/10 hover:text-white"
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>

        <div className="relative overflow-visible">
          <div className="hidden md:block relative max-h-[620px] lg:max-h-[720px] overflow-hidden">
            <div className="h-full max-h-[620px] lg:max-h-[720px] overflow-y-auto scrollbar-hide scroll-smooth pr-1">
              <div className="grid grid-cols-12 auto-rows-[220px] lg:auto-rows-[260px] gap-5 lg:gap-6 pb-24">
                {activeGalleryGroup.photos.map((photo, idx) => (
                  <motion.div
                    key={`${activeGalleryGroup.key}-desktop-${photo}-${idx}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04 }}
                    whileHover={{ scale: 1.02, zIndex: 30 }}
                    className={`relative ${galleryLayoutClasses[idx % galleryLayoutClasses.length]} group cursor-pointer overflow-hidden rounded-[32px] lg:rounded-[44px] border border-white/10 bg-white/5 shadow-2xl transition-shadow duration-500`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                    <Image
                      src={galleryPhotoSrc(photo)}
                      alt={galleryAlt(idx)}
                      fill
                      sizes="(min-width: 1024px) 50vw, 50vw"
                      className="object-cover grayscale-[0.18] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-epicDark/80 to-transparent"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-epicDark to-transparent"></div>
          </div>

          <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 gap-4 pb-4">
            {activeGalleryGroup.photos.map((photo, idx) => (
              <div
                key={`${activeGalleryGroup.key}-mobile-${photo}`}
                className="w-[85vw] h-[380px] sm:h-[440px] flex-shrink-0 snap-center relative overflow-hidden rounded-[34px] shadow-xl border border-white/10"
              >
                <Image src={galleryPhotoSrc(photo)} alt={galleryAlt(idx)} fill sizes="85vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
