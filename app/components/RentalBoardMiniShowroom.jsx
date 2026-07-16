"use client";

import Image from "next/image";

export default function RentalBoardMiniShowroom({ board }) {
  const boardName = board.displayName || board.name;
  const imageRoot = `/rentals/boards/processed/${board.id}`;
  const showroomImages = [
    { slot: "front", src: `${imageRoot}/front.webp`, alt: `${boardName} front view` },
    { slot: "back", src: `${imageRoot}/back.webp`, alt: `${boardName} back view` },
    { slot: "fins", src: `${imageRoot}/fins.webp`, alt: `${boardName} tail and fins detail` },
  ];
  const [mainImage, ...detailImages] = showroomImages;

  return (
    <div
      id="rental-mini-showroom"
      data-mini-showroom-variant="homepage-editorial-grid"
      data-board-id={board.id}
      className="relative h-full pb-8"
    >
      <div className="grid h-full grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-2 overflow-hidden rounded-[24px] border border-epicWhite/15 bg-epicWhite/5 p-2 shadow-lg shadow-black/25 md:gap-3 md:rounded-[28px] md:p-3">
        <div
          data-mini-cell="front"
          className="relative min-h-0 overflow-hidden rounded-l-[18px] bg-epicDark md:rounded-l-[22px]"
        >
          <Image
            data-mini-image-slot={mainImage.slot}
            src={mainImage.src}
            alt={mainImage.alt}
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 768px) 290px, 56vw"
            className="object-cover"
          />
        </div>

        <div className="grid min-h-0 grid-rows-2 gap-2 md:gap-3">
          {detailImages.map((image) => (
            <div
              key={image.slot}
              data-mini-cell={image.slot}
              className={`relative min-h-0 overflow-hidden border-l border-epicWhite/15 bg-epicDark ${image.slot === "back" ? "rounded-tr-[18px] md:rounded-tr-[22px]" : "rounded-br-[18px] md:rounded-br-[22px]"}`}
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
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-4 z-10 max-w-[calc(100%-32px)] rounded-lg border border-epicWhite/20 bg-epicDark/95 px-4 py-2 text-epicWhite shadow-lg md:left-6 md:px-5">
        <p className="truncate text-[11px] font-black uppercase leading-none text-epicGray">{boardName}</p>
        <p className="mt-1 text-sm font-black uppercase leading-tight md:text-base">{board.size}</p>
      </div>
    </div>
  );
}
