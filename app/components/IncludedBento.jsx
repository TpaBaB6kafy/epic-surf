"use client";

import { motion } from "framer-motion";
import { RentalSurfboardIcon, RentalTshirtIcon, RentalUvIcon } from "./Icons";

const iconClass = "h-9 w-9";

const icons = {
  board: <RentalSurfboardIcon className={iconClass} />,
  rashguard: <RentalTshirtIcon className={iconClass} />,
  zinc: <RentalUvIcon className={iconClass} />,
  camera: (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={iconClass}>
      <path d="M12 24h11l4-6h11l4 6h10a6 6 0 0 1 6 6v17a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V30a6 6 0 0 1 6-6Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="32" cy="39" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M49 32h3M27 39a5 5 0 0 1 5-5" fill="none" className="stroke-epicDark" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
};

export default function IncludedBento({ title, description, accentTitle, accentDesc, items }) {
  return (
    <section className="bg-epicWhite px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <h3 className="text-3xl font-black leading-tight tracking-normal text-epicDark md:text-5xl">
              {title}
            </h3>
            <p className="mt-4 max-w-xl text-base font-medium leading-snug text-epicDark/70">
              {description}
            </p>

            <div className="mt-6 border-l-4 border-epicRed pl-4">
              <p className="whitespace-pre-line text-xl font-black leading-tight tracking-normal text-epicDark md:text-2xl">
                {accentTitle}
              </p>
              <p className="mt-2 max-w-sm text-sm font-medium leading-snug text-epicDark/70">
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
                className="rounded-[24px] border border-epicDark/10 bg-white p-5 text-epicDark shadow-[0_10px_24px_rgba(46,46,46,0.05)]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-epicMint text-epicDark">
                    {icons[item.icon]}
                  </div>

                  <div className="min-w-0 pt-1">
                    <h4 className="text-lg font-black leading-tight text-epicDark">
                      {item.label}
                    </h4>
                    <p className="mt-2 text-sm font-semibold leading-snug text-epicDark/70">
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
