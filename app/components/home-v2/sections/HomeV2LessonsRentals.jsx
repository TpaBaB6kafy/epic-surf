"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { buildWhatsAppUrl, trackEvent } from "../../../utils/tracking";
import { PhotoPoster, PosterButton, PosterLink } from "../PosterPrimitives";

const bookingLessonIds = new Set(["group", "private", "split"]);

const lessonMessages = {
  ru: {
    surf_skate: "Здравствуйте! Хочу записаться на surf-skate урок.",
    lineup_pro: "Здравствуйте! Хочу записаться на Line-up / Pro урок.",
  },
  en: {
    surf_skate: "Hi! I'd like to book a surf-skate lesson.",
    lineup_pro: "Hi! I'd like to book a Line-up / Pro lesson.",
  },
};

const rentalPromoCopy = {
  en: {
    description: "Board rental in Da Nang with delivery or pickup in a convenient city spot. We help match the board to your level and the day's conditions.",
    viewAll: "View all boards",
  },
  ru: {
    description: "Аренда досок в Дананге от 250,000 VND / 2 часа. Помогаем выбрать доску под уровень и условия.",
    viewAll: "Выбрать доску",
  },
};

const rentalPosterCopy = {
  en: {
    from: "FROM",
    description: "Shortboards, funboards, softboards and more",
    term: "Daily or long term.",
    rentNow: "RENT NOW",
    chooseBoard: "CHOOSE A BOARD",
  },
  ru: {
    from: "ОТ",
    description: "Шортборды, фанборды, софтборды и другие",
    term: "На день или долгий срок.",
    rentNow: "АРЕНДОВАТЬ",
    chooseBoard: "ВЫБРАТЬ ДОСКУ",
  },
};

const surfStackAssets = {
  rentalHeading: "/design/home-v2/surf-stack/Rentals%20block%20assets/rental-heading-paper.svg",
  rentalPriceCard: "/design/home-v2/surf-stack/Rentals%20block%20assets/rental-price-card.svg",
  rentalPhotoFrame: "/design/home-v2/surf-stack/Rentals%20block%20assets/rental-photo-frame.svg",
  rentalBeachPhoto: "/design/home-v2/surf-stack/Rentals%20block%20assets/rental-beach-photo.webp",
  rentalMintBrush: "/design/home-v2/surf-stack/Rentals%20block%20assets/rental-mint-brush.svg",
};

const lessonCardFrameClasses = [
  "[clip-path:polygon(1%_0,99%_0.4%,100%_98.5%,2%_100%,0_2%)] lg:rotate-[-0.15deg]",
  "[clip-path:polygon(0.5%_1%,98.5%_0,100%_99%,1.5%_100%,0_2.5%)] lg:rotate-[0.35deg]",
  "[clip-path:polygon(1.5%_0,100%_0.8%,99.2%_100%,0.8%_99.2%,0_1%)] lg:-rotate-[0.22deg]",
  "[clip-path:polygon(0_0.8%,99%_0,100%_97.8%,1%_100%,0.8%_3%)] lg:rotate-[0.18deg]",
  "[clip-path:polygon(1%_0.5%,100%_0,99%_99%,2%_100%,0_1.5%)] lg:rotate-[-0.12deg]",
];

const lessonBadgeFrameClasses = [
  "rotate-[-1.5deg] [clip-path:polygon(4%_0,100%_6%,96%_100%,0_94%)]",
  "rotate-180 [clip-path:polygon(4%_0,100%_6%,96%_100%,0_94%)]",
  "rotate-90 [clip-path:polygon(4%_0,100%_6%,96%_100%,0_94%)]",
  "rotate-[-90deg] [clip-path:polygon(4%_0,100%_6%,96%_100%,0_94%)]",
  "rotate-180 [clip-path:polygon(2%_4%,96%_0,100%_96%,4%_100%)]",
];

const lessonBadgeGlyphClasses = [
  "rotate-[1.5deg]",
  "rotate-180",
  "rotate-[-90deg]",
  "rotate-90",
  "rotate-180",
];

function LessonIconGlyph({ id, className = "" }) {
  const strokeProps = {
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 3,
  };

  if (id === "split") {
    return (
      <svg data-lesson-icon-asset={id} viewBox="0 0 73 73" fill="none" aria-hidden="true" className={className}>
        <path d="M15 53V51C15 47.287 16.475 43.726 19.1005 41.1006C21.726 38.475 25.287 37 29 37C32.713 37 36.274 38.475 38.8994 41.1006C41.525 43.726 43 47.287 43 51V53" {...strokeProps} />
        <path d="M39 41C39 38.3478 40.0536 35.8042 41.929 33.929C43.8042 32.0536 46.3478 31 49 31C50.3132 31 51.6136 31.2587 52.8268 31.7612C54.04 32.2638 55.1424 33.0004 56.071 33.929C56.9996 34.8576 57.7362 35.96 58.2388 37.1732C58.7414 38.3864 59 39.6868 59 41V42" {...strokeProps} />
        <path d="M29 37C31.1217 37 33.1566 36.1572 34.6568 34.6568C36.1572 33.1566 37 31.1217 37 29C37 26.8783 36.1572 24.8434 34.6568 23.3431C33.1566 21.8429 31.1217 21 29 21C26.8783 21 24.8434 21.8429 23.3431 23.3431C21.8429 24.8434 21 26.8783 21 29C21 31.1217 21.8429 33.1566 23.3431 34.6568C24.8434 36.1572 26.8783 37 29 37ZM49 31C50.5912 31 52.1174 30.3679 53.2426 29.2426C54.3678 28.1174 55 26.5913 55 25C55 23.4087 54.3678 21.8826 53.2426 20.7574C52.1174 19.6321 50.5912 19 49 19C47.4088 19 45.8826 19.6321 44.7574 20.7574C43.6322 21.8826 43 23.4087 43 25C43 26.5913 43.6322 28.1174 44.7574 29.2426C45.8826 30.3679 47.4088 31 49 31Z" {...strokeProps} />
      </svg>
    );
  }

  if (id === "private") {
    return (
      <svg data-lesson-icon-asset={id} viewBox="0 0 73 73" fill="none" aria-hidden="true" className={className}>
        <path d="M23 52V50C23 46.287 24.475 42.726 27.1005 40.1006C29.726 37.475 33.287 36 37 36C40.713 36 44.274 37.475 46.8994 40.1006C49.525 42.726 51 46.287 51 50V52" {...strokeProps} />
        <path d="M37 36C39.1218 36 41.1566 35.1572 42.6568 33.6568C44.1572 32.1566 45 30.1217 45 28C45 25.8783 44.1572 23.8434 42.6568 22.3431C41.1566 20.8429 39.1218 20 37 20C34.8782 20 32.8434 20.8429 31.3431 22.3431C29.8429 23.8434 29 25.8783 29 28C29 30.1217 29.8429 32.1566 31.3431 33.6568C32.8434 35.1572 34.8782 36 37 36Z" {...strokeProps} />
      </svg>
    );
  }

  if (id === "surf_skate") {
    return (
      <svg data-lesson-icon-asset={id} viewBox="0 0 73 73" fill="none" aria-hidden="true" className={className}>
        <path fillRule="evenodd" clipRule="evenodd" d="M18.248 26.1719L19.874 28.6099C20.4674 29.4998 21.2712 30.2296 22.2142 30.7344C23.1573 31.2392 24.2103 31.5035 25.28 31.5039H48.716C49.786 31.5039 50.8394 31.2397 51.7828 30.7349C52.7262 30.23 53.5304 29.5001 54.124 28.6099L55.75 26.1719L58.246 27.8359L56.622 30.2739C55.7542 31.5753 54.5786 32.6424 53.1994 33.3802C51.8202 34.1182 50.2802 34.5042 48.716 34.5038H25.282C23.7181 34.5038 22.1784 34.1178 20.7996 33.3798C19.4208 32.6419 18.2455 31.575 17.378 30.2739L15.752 27.8359L18.248 26.1719ZM27 40.5038C26.3369 40.5038 25.701 40.7672 25.2322 41.2362C24.7633 41.705 24.5 42.3408 24.5 43.0038C24.5 43.667 24.7633 44.3028 25.2322 44.7716C25.701 45.2404 26.3369 45.5038 27 45.5038C27.663 45.5038 28.2989 45.2404 28.7677 44.7716C29.2366 44.3028 29.5 43.667 29.5 43.0038C29.5 42.3408 29.2366 41.705 28.7677 41.2362C28.2989 40.7672 27.663 40.5038 27 40.5038ZM21.5 43.0038C21.5 41.5452 22.0794 40.1462 23.1109 39.1148C24.1423 38.0834 25.5413 37.5038 27 37.5038C28.4586 37.5038 29.8576 38.0834 30.889 39.1148C31.9205 40.1462 32.5 41.5452 32.5 43.0038C32.5 44.4626 31.9205 45.8616 30.889 46.893C29.8576 47.9244 28.4586 48.5038 27 48.5038C25.5413 48.5038 24.1423 47.9244 23.1109 46.893C22.0794 45.8616 21.5 44.4626 21.5 43.0038ZM47 40.5038C46.337 40.5038 45.701 40.7672 45.2322 41.2362C44.7634 41.705 44.5 42.3408 44.5 43.0038C44.5 43.667 44.7634 44.3028 45.2322 44.7716C45.701 45.2404 46.337 45.5038 47 45.5038C47.663 45.5038 48.2988 45.2404 48.7678 44.7716C49.2366 44.3028 49.5 43.667 49.5 43.0038C49.5 42.3408 49.2366 41.705 48.7678 41.2362C48.2988 40.7672 47.663 40.5038 47 40.5038ZM41.5 43.0038C41.5 41.5452 42.0794 40.1462 43.1108 39.1148C44.1424 38.0834 45.5412 37.5038 47 37.5038C48.4586 37.5038 49.8576 38.0834 50.889 39.1148C51.9204 40.1462 52.5 41.5452 52.5 43.0038C52.5 44.4626 51.9204 45.8616 50.889 46.893C49.8576 47.9244 48.4586 48.5038 47 48.5038C45.5412 48.5038 44.1424 47.9244 43.1108 46.893C42.0794 45.8616 41.5 44.4626 41.5 43.0038Z" fill="currentColor" />
      </svg>
    );
  }

  if (id === "lineup_pro") {
    return (
      <svg data-lesson-icon-asset={id} viewBox="0 0 73 73" fill="none" aria-hidden="true" className={className}>
        <path d="M56.5 37.5H37C37.2386 35.1865 37.9815 32.9534 39.1762 30.9579C40.3709 28.9624 41.9884 27.253 43.915 25.95C44.5015 26.3478 45.1677 26.6129 45.8672 26.7269C46.5666 26.8409 47.2825 26.801 47.965 26.61C48.8016 26.3818 49.5373 25.8792 50.0541 25.1829C50.5709 24.4866 50.8388 23.6369 50.815 22.77C50.8018 21.9739 50.6071 21.1912 50.2458 20.4815C49.8845 19.7719 49.3661 19.1541 48.73 18.675C47.365 17.535 44.23 15.825 38.44 17.04C23.215 20.28 16.375 37.725 16.105 38.46C16.0166 38.6884 15.9853 38.9349 16.0141 39.1781C16.0429 39.4212 16.1307 39.6536 16.27 39.855C16.4078 40.0537 16.5917 40.2162 16.8059 40.3285C17.02 40.4408 17.2582 40.4996 17.5 40.5H56.5C56.8978 40.5 57.2794 40.342 57.5607 40.0607C57.842 39.7794 58 39.3979 58 39C58 38.6022 57.842 38.2207 57.5607 37.9394C57.2794 37.6581 56.8978 37.5 56.5 37.5ZM39.1 19.98C43.825 18.99 46.09 20.34 46.855 20.97C47.1379 21.1672 47.3744 21.4236 47.548 21.7216C47.7216 22.0195 47.8281 22.3517 47.86 22.695C47.86 23.43 47.545 23.625 47.215 23.715C47.0603 23.7295 46.9047 23.7295 46.75 23.715C46.8372 23.432 46.8386 23.1294 46.7541 22.8456C46.6696 22.5617 46.5029 22.3092 46.2751 22.1199C46.0473 21.9306 45.7686 21.813 45.474 21.7819C45.1795 21.7508 44.8823 21.8075 44.62 21.945C41.6462 23.3854 39.1013 25.5791 37.2381 28.308C35.375 31.0369 34.2586 34.2059 34 37.5H19.825C22 33 28.345 22.26 39.1 19.98ZM31.48 28.5C31.3758 28.6677 31.2396 28.8132 31.0791 28.9281C30.9186 29.0431 30.737 29.1252 30.5447 29.1698C30.3523 29.2144 30.1531 29.2206 29.9584 29.188C29.7637 29.1555 29.5773 29.0848 29.41 28.98C29.0954 28.7711 28.8713 28.4511 28.7823 28.084C28.6933 27.717 28.746 27.3299 28.93 27C30.6802 24.2411 33.4527 22.2885 36.64 21.57C37.0197 21.4916 37.4151 21.5632 37.7432 21.7699C38.0713 21.9766 38.3066 22.3023 38.3997 22.6787C38.4928 23.0551 38.4366 23.453 38.2427 23.7888C38.0489 24.1247 37.7325 24.3724 37.36 24.48C36.1638 24.7309 35.0288 25.215 34.0199 25.9048C33.011 26.5946 32.1479 27.4765 31.48 28.5ZM25 48C25 48.3979 24.842 48.7794 24.5607 49.0607C24.2794 49.342 23.8978 49.5 23.5 49.5H17.5C17.1022 49.5 16.7206 49.342 16.4393 49.0607C16.158 48.7794 16 48.3979 16 48C16 47.6022 16.158 47.2207 16.4393 46.9394C16.7206 46.6581 17.1022 46.5 17.5 46.5H23.5C23.8978 46.5 24.2794 46.6581 24.5607 46.9394C24.842 47.2207 25 47.6022 25 48ZM40 48C40 48.3979 39.842 48.7794 39.5607 49.0607C39.2794 49.342 38.8978 49.5 38.5 49.5H32.5C32.1022 49.5 31.7206 49.342 31.4393 49.0607C31.158 48.7794 31 48.3979 31 48C31 47.6022 31.158 47.2207 31.4393 46.9394C31.7206 46.6581 32.1022 46.5 32.5 46.5H38.5C38.8978 46.5 39.2794 46.6581 39.5607 46.9394C39.842 47.2207 40 47.6022 40 48ZM31 45H25C24.6022 45 24.2206 44.842 23.9393 44.5607C23.658 44.2794 23.5 43.8979 23.5 43.5C23.5 43.1022 23.658 42.7207 23.9393 42.4394C24.2206 42.1581 24.6022 42 25 42H31C31.3978 42 31.7794 42.1581 32.0607 42.4394C32.342 42.7207 32.5 43.1022 32.5 43.5C32.5 43.8979 32.342 44.2794 32.0607 44.5607C31.7794 44.842 31.3978 45 31 45ZM46 45H40C39.6022 45 39.2206 44.842 38.9393 44.5607C38.658 44.2794 38.5 43.8979 38.5 43.5C38.5 43.1022 38.658 42.7207 38.9393 42.4394C39.2206 42.1581 39.6022 42 40 42H46C46.3978 42 46.7794 42.1581 47.0607 42.4394C47.342 42.7207 47.5 43.1022 47.5 43.5C47.5 43.8979 47.342 44.2794 47.0607 44.5607C46.7794 44.842 46.3978 45 46 45ZM55 48C55 48.3979 54.842 48.7794 54.5607 49.0607C54.2794 49.342 53.8978 49.5 53.5 49.5H47.5C47.1022 49.5 46.7206 49.342 46.4393 49.0607C46.158 48.7794 46 48.3979 46 48C46 47.6022 46.158 47.2207 46.4393 46.9394C46.7206 46.6581 47.1022 46.5 47.5 46.5H53.5C53.8978 46.5 54.2794 46.6581 54.5607 46.9394C54.842 47.2207 55 47.6022 55 48Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg data-lesson-icon-asset={id} viewBox="0 0 73 73" fill="none" aria-hidden="true" className={className}>
      <path d="M23 52V50C23 46.287 24.475 42.726 27.1005 40.1006C29.726 37.475 33.287 36 37 36C40.713 36 44.274 37.475 46.8994 40.1006C49.525 42.726 51 46.287 51 50V52" {...strokeProps} />
      <path d="M47 40C47 37.3478 48.0536 34.8042 49.929 32.929C51.8042 31.0536 54.3478 30 57 30C58.3132 30 59.6136 30.2587 60.8268 30.7612C62.04 31.2638 63.1424 32.0004 64.071 32.929C64.9996 33.8576 65.7362 34.96 66.2388 36.1732C66.7414 37.3864 67 38.6868 67 40V41" {...strokeProps} />
      <path d="M27 40C27 37.3478 25.9464 34.8042 24.0711 32.929C22.1957 31.0536 19.6522 30 17 30C15.6868 30 14.3864 30.2587 13.1732 30.7612C11.9599 31.2638 10.8575 32.0004 9.92894 32.929C9.00034 33.8576 8.26376 34.96 7.7612 36.1732C7.25866 37.3864 7 38.6868 7 40V41" {...strokeProps} />
      <path d="M37 36C39.1218 36 41.1566 35.1572 42.6568 33.6568C44.1572 32.1566 45 30.1217 45 28C45 25.8783 44.1572 23.8434 42.6568 22.3431C41.1566 20.8429 39.1218 20 37 20C34.8782 20 32.8434 20.8429 31.3431 22.3431C29.8429 23.8434 29 25.8783 29 28C29 30.1217 29.8429 32.1566 31.3431 33.6568C32.8434 35.1572 34.8782 36 37 36Z" {...strokeProps} />
      <path d="M17 30C15.4087 30 13.8826 29.3679 12.7574 28.2426C11.6321 27.1174 11 25.5913 11 24C11 22.4087 11.6321 20.8826 12.7574 19.7574C13.8826 18.6321 15.4087 18 17 18C18.5913 18 20.1174 18.6321 21.2426 19.7574C22.3679 20.8826 23 22.4087 23 24C23 25.5913 22.3679 27.1174 21.2426 28.2426C20.1174 29.3679 18.5913 30 17 30Z" {...strokeProps} />
      <path d="M57 30C55.4088 30 53.8826 29.3679 52.7574 28.2426C51.6322 27.1174 51 25.5913 51 24C51 22.4087 51.6322 20.8826 52.7574 19.7574C53.8826 18.6321 55.4088 18 57 18C58.5912 18 60.1174 18.6321 61.2426 19.7574C62.3678 20.8826 63 22.4087 63 24C63 25.5913 62.3678 27.1174 61.2426 28.2426C60.1174 29.3679 58.5912 30 57 30Z" {...strokeProps} />
    </svg>
  );
}

export function HomeV2Lessons({ t, lang, links, openBookingModal }) {
  const lessonsScrollRef = useRef(null);
  const lessonsDragRef = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const interactiveSelector = "button, a, input, select, textarea, [role='button']";

  const handleLessonsWheel = (event) => {
    const scroller = lessonsScrollRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;

    const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroller.clientWidth : 1;
    const deltaX = event.deltaX * scale;
    const deltaY = event.deltaY * scale;
    const rawDelta = Math.abs(deltaX) >= Math.abs(deltaY) ? deltaX : event.shiftKey ? deltaY : 0;
    if (!rawDelta) return;

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    const canScroll =
      (rawDelta < 0 && scroller.scrollLeft > 0) ||
      (rawDelta > 0 && scroller.scrollLeft < maxScrollLeft - 1);
    if (!canScroll) return;

    const maxDelta = scroller.clientWidth * 0.32;
    const delta = Math.max(-maxDelta, Math.min(maxDelta, rawDelta * 0.72));

    event.preventDefault();
    scroller.scrollBy({ left: delta, behavior: "smooth" });
  };

  const handleLessonsPointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    if (event.target.closest(interactiveSelector)) return;

    const scroller = lessonsScrollRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;

    lessonsDragRef.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: scroller.scrollLeft,
      moved: false,
    };
    scroller.setPointerCapture?.(event.pointerId);
  };

  const handleLessonsPointerMove = (event) => {
    const scroller = lessonsScrollRef.current;
    const drag = lessonsDragRef.current;
    if (!scroller || !drag.isDragging) return;

    const diff = event.clientX - drag.startX;
    if (Math.abs(diff) > 4) drag.moved = true;
    scroller.scrollLeft = drag.scrollLeft - diff * 0.82;
  };

  const stopLessonsDrag = (event) => {
    const scroller = lessonsScrollRef.current;
    if (scroller?.hasPointerCapture?.(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
    lessonsDragRef.current.isDragging = false;
  };

  const handleLessonsClickCapture = (event) => {
    if (!lessonsDragRef.current.moved) return;

    lessonsDragRef.current.moved = false;
    if (event.target.closest(interactiveSelector)) return;

    event.preventDefault();
    event.stopPropagation();
  };

  const getBookingUrl = (item) => links.booking?.[lang]?.[item.id];
  const lessonsHeading = lang === "ru" ? "Выбери урок" : "Choose Your Lesson";

  const handleBookingClick = (item) => {
    const bookingUrl = getBookingUrl(item);
    if (!bookingUrl) return;

    openBookingModal(bookingUrl, {
      serviceType: item.id,
      ctaLocation: "home_v2_lessons",
      ctaLabel: item.title,
      lessonId: item.id,
    });
  };

  const handleMessengerClick = (event, item) => {
    const message = lessonMessages[lang]?.[item.id] || lessonMessages.en[item.id] || item.title;

    trackEvent("whatsapp_click", {
      language: lang,
      service_type: item.id,
      cta_location: "home_v2_lessons",
      cta_label: item.title,
      lesson_id: item.id,
    });
    event.currentTarget.href = buildWhatsAppUrl(links.whatsapp, message, {
      language: lang,
      includePartnerCode: false,
    });
  };

  return (
    <section
      id="lessons"
      data-home-v2-lessons-block
      className="relative isolate overflow-hidden bg-[#2E2E2E] px-4 py-14 text-epicWhite scroll-mt-24 md:px-6 md:py-16 lg:pb-40 lg:pt-28"
    >
      <div data-home-v2-lessons-grid className="relative mx-auto max-w-7xl">
        <div className="relative mx-auto mb-10 flex max-w-[1180px] flex-col items-center gap-7 text-center lg:mb-20 lg:gap-9">
          <div className="relative aspect-[1120/118] w-full max-w-[1120px]">
            <div className="absolute inset-x-[7%] bottom-[22%] top-[18%] bg-epicMint" aria-hidden="true" />
            <Image
              data-lessons-heading-asset
              src="/design/home-v2/lessons/ASSET__lessons-heading-mint-paper.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 900px, 94vw"
              className="object-fill"
            />
            <h2 className="absolute left-[6%] right-[5%] top-[24%] z-10 text-center text-[34px] font-black uppercase leading-[0.88] tracking-normal text-epicDark sm:text-[52px] md:text-[68px] lg:top-[24%] lg:whitespace-nowrap lg:text-[clamp(50px,4.35vw,68px)]">
              {lessonsHeading}
            </h2>
          </div>
          <div className="relative max-w-[680px]">
            <Image
              data-lessons-corner-brush
              src="/design/home-v2/lessons/SVG__lessons-corner-mint-brush.svg"
              alt=""
              width={300}
              height={120}
              sizes="300px"
              className="pointer-events-none absolute -right-16 -top-16 hidden h-auto w-[260px] opacity-0 lg:block"
            />
            <p className="relative text-base font-black leading-7 text-epicWhite md:text-[22px] md:leading-[1.18] lg:text-[25px]">
              {t.heroSub}
            </p>
          </div>
        </div>

        <div
          ref={lessonsScrollRef}
          data-home-v2-lessons-scroller
          onWheel={handleLessonsWheel}
          onPointerDown={handleLessonsPointerDown}
          onPointerMove={handleLessonsPointerMove}
          onPointerUp={stopLessonsDrag}
          onPointerCancel={stopLessonsDrag}
          onPointerLeave={stopLessonsDrag}
          onClickCapture={handleLessonsClickCapture}
          className="scrollbar-hide -mx-4 cursor-grab touch-pan-x select-none overflow-x-auto scroll-smooth overscroll-x-contain px-4 pb-4 active:cursor-grabbing snap-x snap-proximity md:-mx-6 md:px-6 lg:mx-0 lg:px-0"
        >
        <div className="flex w-max items-stretch gap-5 pb-3 lg:gap-10">
        {t.cards.map((item, index) => {
          const frameClass = lessonCardFrameClasses[index % lessonCardFrameClasses.length];
          const badgeFrameClass = lessonBadgeFrameClasses[index % lessonBadgeFrameClasses.length];
          const glyphClass = lessonBadgeGlyphClasses[index % lessonBadgeGlyphClasses.length];

          return (
          <article
            key={item.id}
            data-home-v2-lesson-card
            className={`group relative flex w-[84vw] max-w-[390px] shrink-0 snap-start flex-col border-[8px] border-epicWhite bg-epicDark px-5 pb-8 pt-5 text-epicWhite shadow-[9px_9px_0_rgba(0,0,0,0.28)] sm:w-[350px] lg:w-[340px] lg:border-[8px] lg:px-7 lg:pb-9 lg:pt-6 ${frameClass}`}
          >
            <div className="relative z-10 aspect-[1.52] overflow-hidden bg-epicGray ring-[5px] ring-epicDark lg:ring-[6px]">
              <Image
                data-lessons-photo
                src={`/gallery/lesson-${index + 1}.webp`}
                alt={item.title}
                fill
                sizes="(min-width: 1280px) 18vw, (min-width: 768px) 45vw, 90vw"
                className="object-cover grayscale contrast-110 transition duration-300 ease-out group-hover:grayscale-0 group-hover:contrast-105 group-active:grayscale-0 group-active:contrast-105 group-focus-within:grayscale-0 group-focus-within:contrast-105"
              />
            </div>
            <div className="relative z-10 flex flex-1 flex-col px-3 pt-6 text-center lg:px-5 lg:pt-6">
              <span className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-epicMint lg:mb-5 lg:h-[58px] lg:w-[58px] ${badgeFrameClass}`} aria-hidden="true">
                <LessonIconGlyph id={item.id} className={`h-[50px] w-[50px] text-epicGray lg:h-[52px] lg:w-[52px] ${glyphClass}`} />
              </span>
              <h3 className="mx-auto max-w-[220px] text-[27px] font-black uppercase leading-[0.9] text-epicWhite lg:text-[30px]">{item.title}</h3>
              <span
                data-lesson-divider-asset
                className="mx-auto mt-5 block h-[3px] w-36 rotate-[-1.5deg] bg-epicMint lg:mt-5 lg:h-1 lg:w-44"
                aria-hidden="true"
              />
              <p className="mx-auto mt-5 flex-1 text-sm font-bold leading-7 text-epicWhite/62 lg:mt-5 lg:text-[15px] lg:leading-7">{item.desc}</p>
              <p className="mt-7 text-[28px] font-black leading-none text-epicWhite lg:mt-8 lg:text-[31px]">{item.price}</p>
              {bookingLessonIds.has(item.id) ? (
                <PosterButton
                  data-home-v2-booking-cta
                  onClick={() => handleBookingClick(item)}
                  className="mx-auto mt-5 w-full max-w-[220px] border-0 bg-epicRed text-epicDark shadow-none lg:mt-5"
                >
                  {t.btnBook}
                </PosterButton>
              ) : (
                <PosterLink
                  href={links.whatsapp}
                  onClick={(event) => handleMessengerClick(event, item)}
                  target="_blank"
                  rel="noreferrer"
                  className="mx-auto mt-5 w-full max-w-[220px] border-0 bg-epicRed text-epicDark shadow-none lg:mt-5"
                >
                  {t.btnBook}
                </PosterLink>
              )}
            </div>
          </article>
          );
        })}
        </div>
        </div>
      </div>
    </section>
  );
}

export function HomeV2Rentals({ lang, setRentalModalOpen }) {
  const catalogHref = lang === "ru" ? "/ru/surfboard-rental-danang" : "/surfboard-rental-danang";
  const copy = rentalPosterCopy[lang] || rentalPosterCopy.en;

  const handleGenericRentalClick = () => {
    trackEvent("rental_cta_click", {
      language: lang,
      service_type: "board_rental",
      cta_location: "home_v2_rental_section",
      cta_label: "rent_now",
    });
    setRentalModalOpen(true);
  };

  return (
    <section
      id="rentals"
      data-home-v2-rentals-block
      data-surf-stack-scene="rental"
      className="relative isolate overflow-visible bg-transparent px-4 py-14 text-epicWhite scroll-mt-24 md:px-6 md:py-0"
    >
      <div data-rentals-mobile-content className="mx-auto mb-8 max-w-md md:hidden">
        <h2 className="inline bg-epicWhite px-2 text-[42px] font-black uppercase leading-[0.98] text-epicDark shadow-[6px_6px_0_#585858]">
          SURF BOARD RENTALS
        </h2>
        <div className="mt-8 bg-epicGray/35 p-6 text-center ring-2 ring-epicGray">
          <p className="text-sm font-black uppercase text-epicWhite/72">{copy.from}</p>
          <p className="mt-2 text-5xl font-black leading-none text-epicRed">250.000</p>
          <p className="mt-1 text-2xl font-black leading-none text-epicWhite">VND</p>
          <p className="mx-auto mt-5 max-w-[260px] text-base font-bold leading-6 text-epicWhite/84">
            {copy.description}
          </p>
          <p className="mt-3 text-sm font-bold text-epicWhite/72">{copy.term}</p>
          <div className="mt-6 grid gap-3">
            <button
              type="button"
              data-home-v2-rental-cta
              onClick={handleGenericRentalClick}
              className="inline-flex min-h-12 items-center justify-center bg-epicRed px-5 text-sm font-black uppercase text-epicDark shadow-[5px_5px_0_#2E2E2E] active:scale-95"
            >
              {copy.rentNow}
            </button>
            <Link
              href={catalogHref}
              className="inline-flex min-h-12 items-center justify-center bg-epicWhite px-5 text-sm font-black uppercase text-epicDark shadow-[5px_5px_0_#2E2E2E] active:scale-95"
            >
              {copy.chooseBoard}
            </Link>
          </div>
        </div>
      </div>
      <div data-rental-visual-composition className="relative mx-auto aspect-[1448/1086] w-full max-w-7xl overflow-hidden">
        <div
          data-rentals-artboard
          className="relative aspect-[1448/1086] w-full overflow-hidden"
        >
        <Image
          data-rentals-heading-asset
          src={surfStackAssets.rentalHeading}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 1340px, 100vw"
          className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full object-contain opacity-0 md:block"
        />
        <Image
          data-rentals-layer="scene-bg"
          src={surfStackAssets.rentalPhotoFrame}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 1340px, 100vw"
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full object-contain md:origin-center md:scale-[1.025]"
        />
        <Image
          data-rentals-layer="beach-photo"
          src={surfStackAssets.rentalBeachPhoto}
          alt="Surfboard on My Khe beach"
          fill
          priority
          sizes="(min-width: 1024px) 1340px, 100vw"
          className="pointer-events-none absolute inset-0 z-[3] h-full w-full object-contain contrast-105"
        />
        <Image
          data-rentals-layer="scene-mint"
          src={surfStackAssets.rentalMintBrush}
          alt=""
          fill
          sizes="(min-width: 1024px) 1340px, 100vw"
          className="pointer-events-none absolute inset-0 z-[4] hidden h-full w-full object-contain opacity-0 md:block"
        />
        <Image
          data-rentals-price-card-asset
          src={surfStackAssets.rentalPriceCard}
          alt=""
          fill
          sizes="(min-width: 1024px) 1340px, 100vw"
          className="pointer-events-none absolute inset-0 z-[5] hidden h-full w-full object-contain md:block"
        />
        <div
          className="absolute left-[2.3%] top-[38.7%] z-[6] hidden h-[57%] w-[30.5%] bg-epicGray/80 md:block [clip-path:polygon(0_0,100%_0,100%_100%,4%_100%)]"
          aria-hidden="true"
        />

        <div data-rentals-heading className="absolute left-[2.1%] top-[7.2%] z-20 hidden text-epicDark md:block">
          <h2 className="text-[clamp(44px,5.9vw,82px)] font-black uppercase leading-[0.94] tracking-normal">
            <span className="block w-fit bg-epicWhite px-[0.08em] pb-[0.02em] pt-[0.04em]">SURF BOARD</span>
            <span className="mt-[0.13em] block w-fit bg-epicWhite px-[0.08em] pb-[0.02em] pt-[0.04em]">RENTALS</span>
          </h2>
        </div>

        <div
          data-rentals-content
          className="absolute left-[3.3%] top-[43.7%] z-20 hidden w-[28.5%] text-center md:block"
        >
          <div className="font-black uppercase leading-none">
            <p className="text-[clamp(18px,2.05vw,29px)] text-epicWhite">{copy.from}</p>
            <p className="mt-[9%] text-[clamp(54px,6.5vw,92px)] text-epicRed">250.000</p>
            <p className="text-[clamp(30px,3.2vw,45px)] text-epicWhite">VND</p>
          </div>

          <span className="mx-auto mt-[8%] block h-1 w-[78%] bg-epicMint" aria-hidden="true" />

          <p className="mx-auto mt-[8%] max-w-[88%] text-[clamp(15px,1.55vw,22px)] font-medium leading-[1.08] text-epicWhite">
            {copy.description}
          </p>
          <p className="mt-[13%] text-[clamp(12px,1.18vw,17px)] font-medium leading-tight text-epicWhite">
            {copy.term}
          </p>

          <div className="mx-auto mt-[7%] flex w-[76%] flex-col items-stretch gap-4">
            <button
              type="button"
              data-home-v2-rental-cta
              onClick={handleGenericRentalClick}
              className="inline-flex min-h-9 items-center justify-center bg-epicRed px-4 text-[clamp(13px,1.35vw,19px)] font-black uppercase leading-none text-epicDark transition hover:brightness-105 active:scale-95 md:min-h-12 lg:min-h-[58px]"
            >
              {copy.rentNow}
            </button>
            <Link
              href={catalogHref}
              className="inline-flex min-h-9 items-center justify-center bg-epicWhite px-4 text-[clamp(13px,1.35vw,19px)] font-black uppercase leading-none text-epicDark transition hover:bg-epicMint active:scale-95 md:min-h-12 lg:min-h-[58px]"
            >
              {copy.chooseBoard}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-30 hidden w-full translate-y-[86%] md:hidden">
          <div
            data-rentals-content-mobile-fallback
            className="mx-auto w-full max-w-[330px] text-center"
          >
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export function HomeV2Included({ t }) {
  return (
    <section data-home-v2-included className="relative isolate overflow-hidden bg-epicWhite px-4 py-14 text-epicDark md:px-6 md:py-16 lg:pb-36 lg:pt-36">
      <div data-home-v2-included-grid className="relative mx-auto max-w-7xl">
        <div className="absolute -right-20 top-12 hidden h-28 w-[44%] -rotate-3 bg-epicMint lg:block" aria-hidden="true" />
        <div className="relative grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:items-center">
          <div className="relative overflow-hidden bg-epicDark p-6 text-epicWhite shadow-[12px_12px_0_#AAFFC7] md:p-8 lg:p-9">
            <div className="relative aspect-[5/4] overflow-hidden bg-epicGray">
              <Image
                src="/gallery/incl-1.webp"
                alt={t.includedTitle}
                fill
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="object-cover grayscale contrast-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-epicDark/80 p-5">
                <p className="text-[11px] font-black uppercase text-epicMint">Included</p>
                <h2 className="mt-2 max-w-full text-4xl font-black uppercase leading-[0.9] tracking-normal md:text-6xl lg:text-[56px]">
                  {t.includedTitle}
                </h2>
              </div>
            </div>
            <p className="mt-6 text-base font-bold leading-7 text-epicWhite/74 lg:text-base lg:leading-7">{t.includedSubtitle}</p>
          </div>

          <div className="relative">
            <div className="mb-6 bg-epicMint px-6 py-5 shadow-[8px_8px_0_#2E2E2E] lg:mb-6 lg:px-6 lg:py-5">
              <h3 className="whitespace-pre-line text-4xl font-black uppercase leading-[0.95] text-epicDark md:text-5xl lg:text-5xl">{t.includedAccentTitle}</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.includedItems.map((item, index) => (
                <article
                  key={item.icon}
                  className={`relative overflow-hidden bg-epicWhite p-6 shadow-[7px_7px_0_#585858] ring-2 ring-epicDark lg:p-6 ${index % 2 ? "lg:translate-y-3" : ""}`}
                >
                  <div className="absolute -right-7 -top-4 h-14 w-24 rotate-[-8deg] bg-epicMint" aria-hidden="true" />
                  <p className="relative z-10 text-[11px] font-black uppercase text-epicRed">0{index + 1}</p>
                  <h3 className="relative z-10 mt-3 text-2xl font-black uppercase leading-tight text-epicDark lg:text-2xl">{item.label}</h3>
                  <p className="relative z-10 mt-3 text-sm font-bold leading-6 text-epicGray lg:text-sm lg:leading-6">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeV2PhotoBreak() {
  return (
    <div className="relative overflow-hidden bg-epicDark px-4 py-14 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        <PhotoPoster src="/gallery/1.webp" alt="Surf community" className="h-72 -rotate-2" />
        <PhotoPoster src="/gallery/lesson-3.webp" alt="Surf lesson practice" className="h-72 rotate-2 md:translate-y-10" />
        <PhotoPoster src="/gallery/events/community-rides.webp" alt="Epic Surf community rides" className="h-72 -rotate-1" />
      </div>
    </div>
  );
}
