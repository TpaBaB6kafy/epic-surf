import Image from "next/image";

export function PosterSection({ id, eyebrow, title, children, dark = false, className = "" }) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden px-4 py-16 scroll-mt-24 md:px-6 md:py-24 ${dark ? "bg-epicDark text-epicWhite" : "bg-epicWhite text-epicDark"} ${className}`}
    >
      <div className="relative mx-auto max-w-7xl">
        {(eyebrow || title) && (
          <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-4xl">
              {eyebrow && <TornLabel>{eyebrow}</TornLabel>}
              {title && (
                <h2 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-normal md:text-7xl">
                  {title}
                </h2>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function TornLabel({ children, tone = "red", className = "" }) {
  const toneClass = tone === "mint" ? "bg-epicMint text-epicDark" : "bg-epicRed text-epicWhite";

  return (
    <span
      className={`inline-flex -rotate-2 items-center border-2 border-epicDark px-4 py-2 text-[11px] font-black uppercase leading-none shadow-[5px_5px_0_#2E2E2E] ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}

export function PosterButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-12 items-center justify-center border-2 border-epicDark bg-epicRed px-6 py-3 text-center text-sm font-black uppercase leading-tight text-epicWhite shadow-[6px_6px_0_#2E2E2E] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#2E2E2E] active:translate-y-0 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function PosterLink({ children, className = "", ...props }) {
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center border-2 border-epicDark bg-epicWhite px-6 py-3 text-center text-sm font-black uppercase leading-tight text-epicDark shadow-[6px_6px_0_#2E2E2E] transition hover:-translate-y-0.5 hover:bg-epicMint active:translate-y-0 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export function PhotoPoster({ src, alt, className = "", imageClassName = "", priority = false }) {
  return (
    <div className={`relative overflow-hidden border-4 border-epicDark bg-epicWhite shadow-[10px_10px_0_#2E2E2E] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 36vw, 88vw"
        className={`object-cover grayscale ${imageClassName}`}
      />
    </div>
  );
}

export function WaveStripe({ className = "" }) {
  return (
    <svg viewBox="0 0 420 90" aria-hidden="true" className={`pointer-events-none ${className}`}>
      <path d="M6 55 C56 8 106 8 156 55 S256 102 306 55 S406 8 456 55" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <path d="M-24 75 C36 30 96 30 156 75 S276 120 336 75 S456 30 516 75" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
