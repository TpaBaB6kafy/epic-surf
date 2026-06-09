"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  GraduationCap,
  MapPin,
  MessageCircle,
  Smile,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import Footer from "./Footer";
import RentalModal from "./RentalModal";
import { FacebookIcon, InstagramIcon } from "./Icons";
import { links } from "../data/links";
import {
  boardLevelLabels,
  boardTypeLabels,
  formatBoardPrice,
  getBoardTrackingPayload,
  rentalBoards,
} from "../data/rentalBoards";
import { translations } from "../data/translations";
import {
  buildTelegramUrl,
  buildWhatsAppUrl,
  buildZaloUrl,
  storeAttributionFromUrl,
  trackEvent,
} from "../utils/tracking";

const navItems = [
  { href: "/surf-lessons-danang", label: "Surf lessons" },
  { href: "/surfing-danang", label: "Surfing in Da Nang" },
  { href: "/my-khe-beach-surfing", label: "My Khe Beach Surfing" },
  { href: "/surf-guide", label: "Surf guide" },
];

const infoCards = [
  {
    icon: BadgeDollarSign,
    title: "Rental price",
    text: "From 250,000 VND for a two-hour session. Message Epic Surf School to confirm availability and board choice.",
  },
  {
    icon: Users,
    title: "Who rental is for",
    text: "Perfect for surfers who can paddle, catch green waves, avoid reefs, and want more freedom.",
  },
  {
    icon: Sparkles,
    title: "Board options",
    text: "Softboards, longboards, funboards, shortboards. Availability depends on the day and conditions.",
  },
  {
    icon: Waves,
    title: "How rental works",
    text: "Choose your board, show ID, pay the rental, get quick rules, and go surf. We are here if you need help.",
  },
  {
    icon: MapPin,
    title: "Pickup & location",
    text: "Epic Surf School is connected to the My Khe Beach surf area. Pickup confirmed by message.",
  },
  {
    icon: GraduationCap,
    title: "Take a lesson",
    text: "Not confident? Start with a lesson, learn the basics, and rent with support whenever you are ready.",
  },
];

const faqItems = [
  ["How much is surfboard rental in Da Nang?", "Surfboard rental starts from 250,000 VND for 2 hours. Message Epic Surf School to confirm the current board availability, pickup point, and conditions before you go."],
  ["What boards can I rent?", "Options include softboards, longboards, malibus, funboards, fish, and shortboards. Availability changes by day, so the team confirms the best board for your level by messenger."],
  ["Can beginners rent a board?", "First-timers should take a lesson instead of renting alone. Rental is for surfers who can paddle, control the board, stop safely, and avoid collisions."],
  ["Where do I pick up the board?", "Pickup is connected to the My Khe Beach surf area in Da Nang. The exact spot is confirmed through WhatsApp, Telegram, or Zalo because beach setup can change."],
  ["Do I need to book in advance?", "Booking in advance is recommended so Epic can reserve a suitable board, confirm timing, and check whether the surf conditions match your level."],
  ["What if conditions are not suitable?", "Check conditions before rental. If the sea is too strong or unclear, the team can suggest another time, another board, or a lesson instead."],
  ["Should I rent or take a lesson?", "Rent if you can paddle, turn, stop, and judge conditions safely. Take a lesson if you are new, inconsistent, or want instructor support before surfing independently."],
  ["Can I ask about waves before renting?", "Yes. Send a message on WhatsApp, Telegram, or Zalo and the Epic team can advise on waves, board choice, timing, and pickup details."],
];

const relatedItems = [
  { href: "/surf-lessons-danang", title: "Surf Lessons", text: "Beginner-friendly coaching near My Khe Beach." },
  { href: "/surfing-danang", title: "Surfing in Da Nang", text: "Where to surf, when to go, and how it works." },
  { href: "/my-khe-beach-surfing", title: "My Khe Beach Surfing", text: "Best waves in Da Nang for learners and riders." },
  { href: "/surf-guide", title: "Surf Guide", text: "Equipment, tips, safety, waves, and local know-how." },
];

function boardAssetPath(board, index, asset) {
  const fallbackId = `board-${String(index + 1).padStart(2, "0")}`;
  const slug = /^board-\d{2}$/.test(board.id) ? board.id : fallbackId;
  return `/rentals/boards/processed/${slug}/${asset}.webp`;
}

function boardWithAssets(board, index) {
  return {
    ...board,
    processedImages: {
      main: boardAssetPath(board, index, "main"),
      nose: boardAssetPath(board, index, "nose"),
      tail: boardAssetPath(board, index, "tail"),
      fins: boardAssetPath(board, index, "fins"),
      thumb: boardAssetPath(board, index, "thumb"),
    },
  };
}

function compactPrice(price) {
  return price.amount.toLocaleString("en-US");
}

function readableLevels(board) {
  return board.level.map((level) => boardLevelLabels[level] || level).join(" / ");
}

function boardSpecs(board) {
  return [
    `Length: ${board.size}`,
    `Type: ${boardTypeLabels[board.type] || board.type}`,
    `Best for: ${readableLevels(board)} surfers`,
    `Conditions: ${board.bestFor[0] || "Check with Epic team"}`,
    "Includes: Leash",
  ];
}

function rentalMessage(board) {
  return `Hi! I want to rent: ${board.name}.`;
}

function ActionPill({ href, children, onClick, className = "" }) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className={`inline-flex h-12 items-center justify-center rounded-full px-8 text-[11px] font-black uppercase tracking-wide transition-all active:scale-95 ${className}`}
    >
      {children}
    </a>
  );
}

export default function RentalDesignTestPage() {
  const boards = useMemo(() => rentalBoards.map(boardWithAssets), []);
  const initialBoard = boards.find((board) => board.recommended) || boards[0];
  const [activeBoardId, setActiveBoardId] = useState(initialBoard.id);
  const [isRentalModalOpen, setRentalModalOpen] = useState(false);
  const activeBoard = boards.find((board) => board.id === activeBoardId) || initialBoard;
  const t = translations.en;

  useEffect(() => {
    storeAttributionFromUrl({ includePartner: true });
    trackEvent("page_view", {
      language: "en",
      page_type: "design_test",
      page_slug: "/surfboard-rental-danang/design-test",
    });
  }, []);

  const openRentalModal = (ctaLocation) => {
    trackEvent("rental_cta_click", {
      language: "en",
      service_type: "board_rental",
      cta_location: ctaLocation,
      cta_label: activeBoard.id,
      ...getBoardTrackingPayload(activeBoard),
    });
    setRentalModalOpen(true);
  };

  const handleMessengerClick = (event, eventName, label, hrefBuilder) => {
    if (hrefBuilder) {
      event.currentTarget.href = hrefBuilder();
    }

    trackEvent(eventName, {
      language: "en",
      service_type: "board_rental",
      cta_location: "rental_design_test",
      cta_label: label,
      ...getBoardTrackingPayload(activeBoard),
    });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-epicWhite font-sans text-epicDark">
      <main>
        <section data-section="rental-design-hero" className="relative overflow-hidden bg-[#101313] text-epicWhite">
          <div className="absolute inset-0">
            <Image
              src="/gallery/events/danang-open-2025/danang-open-2025-3.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30 grayscale"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(170,255,199,0.16),transparent_28%),linear-gradient(90deg,#101313_0%,rgba(16,19,19,0.95)_34%,rgba(16,19,19,0.66)_65%,#101313_100%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-5 sm:px-8 md:pb-32 md:pt-8 lg:px-10">
            <header className="flex items-start justify-between gap-5">
              <Link href="/" className="shrink-0" aria-label="Epic Surf School home">
                <Image
                  src="/epic-logo-v-ksu-v4.png"
                  alt="EPIC Surf School"
                  width={132}
                  height={96}
                  priority
                  loading="eager"
                />
              </Link>
              <nav className="hidden items-center gap-9 pt-4 lg:flex">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="text-[11px] font-black uppercase tracking-wide text-white/90 transition-colors hover:text-epicMint">
                    {item.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => openRentalModal("design_test_header")}
                  className="h-11 rounded-full bg-epicRed px-6 text-[11px] font-black uppercase tracking-wide text-white shadow-lg shadow-epicRed/20"
                >
                  Book / Message
                </button>
              </nav>
            </header>

            <div className="grid min-h-[500px] items-center gap-8 py-16 md:min-h-[620px] lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
              <div className="max-w-[560px]">
                <p className="mb-8 inline-flex rounded-md bg-epicMint px-4 py-1.5 text-[11px] font-black uppercase tracking-wide text-epicDark">
                  Da Nang, Vietnam
                </p>
                <h1 className="font-heading text-[48px] uppercase leading-[0.92] tracking-normal text-white sm:text-[64px] md:text-[86px] lg:text-[90px]">
                  Surfboard rental in Da Nang
                </h1>
                <p className="mt-7 max-w-[500px] text-sm font-bold leading-6 text-white/78 md:text-base md:leading-7">
                  Rent a surfboard in Da Nang near My Khe Beach from 250,000 VND / 2 hours. Epic Surf School offers top choices to boost your surf level and find joy.
                </p>
                <div className="mt-9 grid max-w-[440px] grid-cols-2 gap-5">
                  <div className="flex gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/35">
                      <Waves size={22} />
                    </span>
                    <div>
                      <p className="text-[11px] font-black uppercase">Quality boards</p>
                      <p className="mt-1 text-xs font-bold leading-4 text-white/60">Well maintained for performance</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/35">
                      <Smile size={22} />
                    </span>
                    <div>
                      <p className="text-[11px] font-black uppercase">Local knowledge</p>
                      <p className="mt-1 text-xs font-bold leading-4 text-white/60">Best spots and advice from Epic team</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative hidden min-h-[420px] lg:block">
                <div className="absolute left-[20%] top-[18%] rotate-[-12deg] rounded-xl border-[5px] border-epicMint px-9 py-6 text-center text-3xl font-black uppercase leading-tight tracking-normal text-epicMint shadow-[0_0_36px_rgba(170,255,199,0.12)]">
                  Ride more
                  <br />
                  Pay less
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-section="rental-board-showroom" className="relative bg-[#101313] px-5 pb-10 text-epicWhite sm:px-8 lg:px-10">
          <div className="mx-auto -mt-24 max-w-7xl md:-mt-36">
            <div className="grid gap-1 lg:grid-cols-[1.28fr_0.72fr_1.45fr]">
              <div className="relative min-h-[560px] overflow-hidden rounded-t-[28px] bg-epicDark md:min-h-[720px] lg:rounded-l-[28px] lg:rounded-tr-none">
                <Image
                  src={activeBoard.processedImages.main}
                  alt={`${activeBoard.name} main view`}
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
                <div className="absolute left-0 top-24 rounded-r-lg bg-epicMint px-4 py-5 text-[11px] font-black uppercase leading-none tracking-wide text-epicDark [writing-mode:vertical-rl]">
                  Selected board
                </div>
                <div className="absolute bottom-0 left-0 h-28 w-28 rounded-tr-[80px] border-r border-t border-epicMint/40 bg-epicMint/10" />
              </div>

              <div className="grid grid-cols-3 gap-1 lg:grid-cols-1">
                {[
                  ["nose", "Nose detail"],
                  ["tail", "Tail detail"],
                  ["fins", "Fin setup"],
                ].map(([asset, label]) => (
                  <div key={asset} className="relative min-h-[150px] overflow-hidden bg-epicDark md:min-h-[190px] lg:min-h-0">
                    <Image
                      src={activeBoard.processedImages[asset]}
                      alt={`${activeBoard.name} ${label}`}
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 260px, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <article className="flex min-h-[520px] flex-col bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.09),transparent_32%),#202020] px-7 py-9 md:px-12 md:py-12 lg:rounded-r-[28px]">
                <span className="w-fit rounded-md bg-epicMint px-4 py-1.5 text-[11px] font-black uppercase text-epicDark">
                  {readableLevels(activeBoard)}
                </span>
                <h2 className="mt-7 font-heading text-4xl uppercase leading-none tracking-normal text-white md:text-6xl">
                  {activeBoard.name}
                </h2>
                <div className="mt-7 h-1 w-20 bg-epicRed" />
                <div className="mt-9">
                  <p className="text-xs font-black uppercase text-white/70">from</p>
                  <p className="mt-1 flex flex-wrap items-end gap-3 font-heading text-5xl leading-none text-epicMint">
                    {compactPrice(activeBoard.price)}
                    <span className="pb-1 text-base font-black text-white">VND</span>
                    <span className="pb-1 text-base font-black text-white/45">/</span>
                    <span className="pb-1 text-base font-black text-white">{activeBoard.price.unit}</span>
                  </p>
                </div>
                <p className="mt-7 max-w-[460px] text-sm font-bold leading-6 text-white/78">{activeBoard.description}</p>
                <ul className="mt-8 grid gap-2.5">
                  {boardSpecs(activeBoard).map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-bold leading-5 text-white/86">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-epicRed" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-auto">
                  <button
                    type="button"
                    onClick={() => openRentalModal("design_test_showroom")}
                    className="inline-flex h-14 min-w-[240px] items-center justify-center rounded-lg bg-epicRed px-8 text-[12px] font-black uppercase tracking-wide text-white shadow-xl shadow-epicRed/20 transition-all hover:brightness-105 active:scale-95"
                  >
                    Rent this board
                  </button>
                  <ActionPill
                    href={links.whatsapp}
                    onClick={(event) => handleMessengerClick(
                      event,
                      "whatsapp_click",
                      "whatsapp_to_book",
                      () => buildWhatsAppUrl(links.whatsapp, rentalMessage(activeBoard), { language: "en" }),
                    )}
                    className="gap-3 border border-white/40 bg-transparent text-white hover:border-epicMint hover:text-epicMint"
                  >
                    <ArrowRight size={20} />
                    WhatsApp to book
                  </ActionPill>
                </div>
              </article>
            </div>

            <div className="flex flex-col gap-5 bg-[#101313] px-2 py-6 md:flex-row md:items-center md:px-8">
              <p className="w-24 shrink-0 border-b border-white/50 pb-3 text-center text-[11px] font-black uppercase leading-tight text-white">
                Other
                <br />
                boards
              </p>
              <div className="scrollbar-hide flex min-w-0 flex-1 gap-5 overflow-x-auto pb-2">
                {boards.map((board) => {
                  const isActive = board.id === activeBoard.id;
                  return (
                    <button
                      key={board.id}
                      type="button"
                      onClick={() => setActiveBoardId(board.id)}
                      aria-label={`Show ${board.name}`}
                      aria-current={isActive ? "true" : undefined}
                      className="w-[88px] shrink-0 text-left text-white"
                    >
                      <span className={`relative block h-[88px] overflow-hidden rounded-lg border-2 bg-epicDark ${isActive ? "border-epicRed" : "border-transparent"}`}>
                        <Image
                          src={board.processedImages.thumb}
                          alt=""
                          fill
                          unoptimized
                          sizes="88px"
                          className="object-cover"
                        />
                      </span>
                      <span className="mt-2 block truncate text-[10px] font-bold leading-tight">{board.name}</span>
                    </button>
                  );
                })}
              </div>
              <Link href="/surfboard-rental-danang" className="hidden items-center gap-4 text-sm font-bold text-white/85 md:flex">
                View all boards
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40">
                  <ArrowRight size={17} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-epicWhite px-5 py-10 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div data-section="rental-info-cards" className="grid gap-0 divide-y divide-epicDark/10 md:grid-cols-3 md:divide-x md:divide-y-0 lg:grid-cols-6">
              {infoCards.map(({ icon: Icon, title, text }) => (
                <article key={title} className="px-5 py-8 text-center">
                  <Icon className="mx-auto h-10 w-10 text-epicMint [stroke:#4bb174]" strokeWidth={1.8} />
                  <h3 className="mt-7 text-sm font-black uppercase leading-tight tracking-normal">{title}</h3>
                  <p className="mt-4 text-xs font-medium leading-5 text-epicDark/66">{text}</p>
                </article>
              ))}
            </div>

            <section data-section="rental-faq" className="mt-10 rounded-lg bg-white px-5 py-7 shadow-xl shadow-epicDark/5 md:px-8">
              <h2 className="font-heading text-3xl uppercase leading-none">FAQ</h2>
              <div className="mt-6 grid gap-x-16 md:grid-cols-2">
                {faqItems.map(([question, answer]) => (
                  <details key={question} className="group border-b border-epicDark/12 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-black leading-snug">
                      {question}
                      <span className="text-xl font-normal transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 max-w-[560px] text-sm font-medium leading-6 text-epicDark/65">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section data-section="rental-related" className="relative mt-8 overflow-hidden rounded-2xl bg-epicDark px-6 py-7 text-white md:px-10">
              <div className="absolute inset-y-0 right-0 hidden w-[34%] md:block">
                <Image
                  src="/gallery/events/danang-open-2025/danang-open-2025-17.webp"
                  alt=""
                  fill
                  sizes="420px"
                  className="object-cover opacity-35 grayscale"
                />
              </div>
              <div className="relative z-10">
                <h2 className="font-heading text-2xl uppercase leading-tight text-epicMint">Surf info for Da Nang</h2>
                <div className="mt-7 grid gap-4 md:grid-cols-4">
                  {relatedItems.map((item) => (
                    <Link key={item.href} href={item.href} className="rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:border-epicMint/60">
                      <h3 className="text-sm font-black leading-tight">{item.title}</h3>
                      <p className="mt-2 text-xs font-medium leading-5 text-white/58">{item.text}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section data-section="rental-final-cta" className="mt-8 bg-epicMint px-6 py-7 md:px-24">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <h2 className="font-heading text-3xl uppercase leading-none md:text-4xl">
                  Book or
                  <br />
                  message Epic
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <ActionPill
                    href={links.whatsapp}
                    onClick={(event) => handleMessengerClick(
                      event,
                      "whatsapp_click",
                      "final_whatsapp",
                      () => buildWhatsAppUrl(links.whatsapp, rentalMessage(activeBoard), { language: "en" }),
                    )}
                    className="bg-epicRed text-white"
                  >
                    WhatsApp
                  </ActionPill>
                  <ActionPill
                    href={links.telegram}
                    onClick={(event) => handleMessengerClick(
                      event,
                      "telegram_click",
                      "final_telegram",
                      () => buildTelegramUrl(links.telegram, rentalMessage(activeBoard), { language: "en" }),
                    )}
                    className="bg-epicDark text-white"
                  >
                    Telegram
                  </ActionPill>
                  <ActionPill
                    href={links.zalo}
                    onClick={(event) => handleMessengerClick(
                      event,
                      "zalo_click",
                      "final_zalo",
                      () => buildZaloUrl(links.zalo, rentalMessage(activeBoard), { language: "en" }),
                    )}
                    className="bg-epicDark text-white"
                  >
                    Zalo
                  </ActionPill>
                  <ActionPill href="tel:+84905012198" className="bg-epicDark text-white">
                    Call
                  </ActionPill>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer t={t} lang="en" links={links} InstagramIcon={InstagramIcon} FacebookIcon={FacebookIcon} />
      <RentalModal
        isRentalModalOpen={isRentalModalOpen}
        setRentalModalOpen={setRentalModalOpen}
        t={t}
        links={links}
        selectedBoard={activeBoard}
      />
    </div>
  );
}
