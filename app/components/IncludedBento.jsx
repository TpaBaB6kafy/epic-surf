"use client";

import { motion } from "framer-motion";

const iconClass = "h-9 w-9";

const icons = {
  board: (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={iconClass}>
      <path d="M31 7C20 17 15 34 18 53c18 3 35-2 39-13C48 36 38 23 31 7Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M31 13c2 11 8 21 20 27" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M18 53l10-10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="34" cy="31" r="3.5" className="fill-epicDark" />
    </svg>
  ),
  rashguard: (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={iconClass}>
      <path d="M23 12h18l5 7 10 5-6 13-7-3v19H21V34l-7 3-6-13 10-5 5-7Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M24 12c2 5 14 5 16 0" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M24 39h16M32 25v22" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M18 22l-5 11M46 22l5 11" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 25v22" fill="none" className="stroke-epicDark" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  zinc: (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={iconClass}>
      <path d="M20 10h24v9H20z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M18 19h28l5 8-5 27H18l-5-27 5-8Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M21 35h22" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M27 45h10M32 40v10" fill="none" className="stroke-epicDark" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={iconClass}>
      <path d="M12 24h11l4-6h11l4 6h10a6 6 0 0 1 6 6v17a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V30a6 6 0 0 1 6-6Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="32" cy="39" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M49 32h3M27 39a5 5 0 0 1 5-5" fill="none" className="stroke-epicDark" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
};

export default function IncludedBento({ label, title, description, accentTitle, accentDesc, items }) {
  return (
    <section className="bg-epicWhite px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-epicRed">
              {label}
            </p>
            <h3 className="text-3xl font-black leading-tight tracking-normal text-epicDark md:text-5xl">
              {title}
            </h3>
            <p className="mt-4 max-w-xl text-base font-bold leading-snug text-epicDark/60">
              {description}
            </p>

            <div className="mt-6 rounded-[28px] bg-epicRed p-5 text-epicWhite shadow-[0_14px_35px_rgba(46,46,46,0.10)]">
              <p className="whitespace-pre-line text-2xl font-black leading-tight tracking-normal">
                {accentTitle}
              </p>
              <p className="mt-3 max-w-sm text-sm font-bold leading-snug text-epicWhite/85">
                {accentDesc}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
            {items.map((item, index) => (
              <motion.article
                key={item.icon}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-[28px] bg-epicDark p-5 text-epicWhite shadow-[0_14px_35px_rgba(46,46,46,0.08)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-epicMint text-epicDark">
                    {icons[item.icon]}
                  </div>

                  <div className="min-w-0 pt-1">
                    <h4 className="text-lg font-black leading-tight text-epicWhite">
                      {item.label}
                    </h4>
                    <p className="mt-2 text-sm font-bold leading-snug text-epicWhite/75">
                      {item.desc}
                    </p>
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
