import Image from "next/image";

const headingToneClasses = {
  coral: "bg-epicRed text-epicDark",
  paper: "bg-epicWhite text-epicDark",
  teal: "text-epicWhite",
};

export function HomeV2SectionHeading({
  eyebrow,
  title,
  lines,
  lineTones = [],
  detail,
  variant = "label",
  className = "",
  titleClassName = "",
}) {
  const visualLines = lines?.length ? lines : [title];

  if (variant === "strip") {
    return (
      <div
        data-home-v2-section-heading="strip"
        className={`border-y border-epicDark/25 bg-epicWhite/70 text-epicDark ${className}`}
      >
        <div className="mx-auto grid w-full max-w-7xl gap-2 px-4 py-3 md:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] md:items-center md:gap-8 md:px-6 md:py-3.5">
          <h2 className={`text-[40px] font-black uppercase leading-[0.88] tracking-tight sm:text-[52px] md:text-[60px] lg:text-[66px] ${titleClassName}`}>
            {visualLines.map((line, index) => (
              <span key={`${line}-${index}`} className={`block sm:inline ${lineTones[index] === "paper" ? "text-epicWhite" : "text-epicDark"}`}>
                {line}{index < visualLines.length - 1 ? " " : ""}
              </span>
            ))}
          </h2>
          {detail ? <p className="max-w-[420px] text-[11px] font-semibold leading-[1.4] text-epicDark/78 md:ml-auto md:text-xs">{detail}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div data-home-v2-section-heading="label" className={`relative w-fit max-w-full pb-2 pr-2 ${className}`}>
      <span className="absolute inset-0 bg-[var(--home-v2-deep-teal)]" aria-hidden="true" />
      <div className="relative max-w-full">
        {eyebrow ? <p className="mb-1 w-fit bg-epicDark px-2 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-epicWhite md:text-[10px]">{eyebrow}</p> : null}
        <h2 className={`max-w-[13ch] text-[40px] font-black uppercase leading-[0.86] tracking-tight sm:text-[52px] md:text-[60px] lg:text-[66px] ${titleClassName}`}>
          {visualLines.map((line, index) => {
            const tone = lineTones[index] || "coral";
            return (
              <span
                key={`${line}-${index}`}
                data-home-v2-heading-line
                className={`block w-fit max-w-full px-3 py-1 md:px-4 ${headingToneClasses[tone] || headingToneClasses.coral}`}
                style={tone === "teal" ? { backgroundColor: "var(--home-v2-deep-teal)" } : undefined}
              >
                {line}
              </span>
            );
          })}
        </h2>
      </div>
    </div>
  );
}

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
  const isTeal = tone === "teal";

  return (
    <span
      className={`inline-flex items-center border-2 border-epicDark px-4 py-2 text-[11px] font-black uppercase leading-none shadow-[5px_5px_0_#2E2E2E] ${isTeal ? "text-epicWhite" : "bg-epicRed text-epicDark"} ${className}`}
      style={isTeal ? { backgroundColor: "var(--home-v2-deep-teal)" } : undefined}
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
      className={`inline-flex min-h-12 items-center justify-center border-2 border-epicDark bg-epicWhite px-6 py-3 text-center text-sm font-black uppercase leading-tight text-epicDark shadow-[6px_6px_0_#2E2E2E] transition hover:-translate-y-0.5 hover:bg-epicWhite/85 active:translate-y-0 active:scale-95 ${className}`}
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
