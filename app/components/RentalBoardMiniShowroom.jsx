"use client";

import Image from "next/image";

const showroomImages = [
  { slot: "main", src: "/rentals/boards/processed/board-01/main.webp", alt: "Epic rental surfboard" },
  { slot: "nose", src: "/rentals/boards/processed/board-01/back-nose.webp", alt: "Surfboard nose detail" },
  { slot: "middle", src: "/rentals/boards/processed/board-01/back-middle.webp", alt: "Surfboard middle detail" },
  { slot: "tail-fins", src: "/rentals/boards/processed/board-01/back-tail-fins.webp", alt: "Surfboard tail and fins detail" },
];

export default function RentalBoardMiniShowroom({ lang = "en" }) {
  const [mainImage, ...detailImages] = showroomImages;
  const visualCopy = lang === "ru"
    ? { eyebrow: "Аренда Epic", title: "Для волн Май Кхе" }
    : { eyebrow: "Epic rental", title: "Ready for My Khe" };

  return (
    <div
      id="rental-mini-showroom"
      data-mini-showroom-variant="homepage-photo-grid"
      className="relative grid h-full grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-2 overflow-hidden rounded-[28px] border border-epicWhite/10 bg-epicWhite/5 p-2 shadow-2xl shadow-black/25 md:gap-3 md:rounded-[34px] md:p-3"
    >
      <div
        data-mini-cell="main"
        className="relative min-h-0 overflow-hidden rounded-l-[20px] bg-epicDark md:rounded-l-[25px]"
      >
        <Image
          data-mini-image-slot={mainImage.slot}
          src={mainImage.src}
          alt={mainImage.alt}
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 768px) 290px, 56vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-epicDark via-epicDark/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5">
          <p className="text-[10px] font-black uppercase tracking-wide text-epicMint">{visualCopy.eyebrow}</p>
          <p className="mt-1 text-sm font-black uppercase leading-tight text-epicWhite md:text-base">{visualCopy.title}</p>
        </div>
      </div>

      <div className="grid min-h-0 grid-rows-3 gap-2 md:gap-3">
        {detailImages.map((image) => {
          const outerRadius = image.slot === "nose"
            ? "rounded-tr-[16px] md:rounded-tr-[20px]"
            : image.slot === "tail-fins"
              ? "rounded-br-[16px] md:rounded-br-[20px]"
              : "";

          return (
          <div
            key={image.slot}
            data-mini-cell={image.slot}
            className={`relative min-h-0 overflow-hidden bg-epicDark ${outerRadius}`}
          >
            <Image
              data-mini-image-slot={image.slot}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 190px, (min-width: 768px) 180px, 36vw"
              className="object-cover"
            />
          </div>
          );
        })}
      </div>

      <span className="pointer-events-none absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-epicRed shadow-[0_0_0_5px_rgba(255,255,255,0.08)]" />
    </div>
  );
}
