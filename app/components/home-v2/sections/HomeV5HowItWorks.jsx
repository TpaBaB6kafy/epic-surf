import Image from "next/image";

const root = "/design/home-v5/how-it-works";

const cards = [
  {
    surface: "card-description-surface-2142-497.svg",
    photo: "photo-content-2142-499@2x.png",
    titleSurface: "card-title-surface-2142-502.svg",
    enCopy: "We meet, get to\nknow you, prepare\nfor the lesson, and\nchoose the right\nsurfboard.",
    panel: [196, 141, 478, 234], photoBox: [143, 136, 252, 234],
    label: [179.286, 336.218, 180, 44.1], copy: [420, 191, 177, 134],
  },
  {
    surface: "card-description-surface-2179-30.svg",
    photo: "photo-content-2142-490@2x.png",
    titleSurface: "card-title-surface-2142-494.svg",
    enCopy: "We cover the basics of surfing\nand ocean safety, then\npractice key movements on\nthe beach: take-off,\nturns, and speed generation.",
    panel: [851, 136, 472, 234], photoBox: [733, 136.418, 252, 234],
    label: [769, 336.218, 180, 44.1], copy: [1011, 181, 283, 144],
  },
  {
    surface: "card-description-surface-2179-36.svg",
    photo: "photo-content@2x.png",
    titleSurface: "card-title-surface-2142-485.svg",
    enCopy: "Your instructor stays\nwith you in the water,\nhelps you catch waves,\nand gives quick feedback\nafter each attempt.",
    panel: [232, 442, 442, 223], photoBox: [143.286, 441.718, 252, 234],
    label: [179.286, 642.418, 180, 44.1], copy: [420, 486, 239, 135],
  },
  {
    surface: "card-description-surface.svg",
    photo: "photo-artwork@2x.png",
    titleSurface: "card-title-surface.svg",
    enCopy: "After the session,\nwe review your progress\nand give simple tips for\nyour next surf lesson or\nrental session.",
    panel: [791, 442, 532, 228], photoBox: [733, 442, 252, 234],
    label: [769, 637, 180, 44.1], copy: [1011, 484, 259, 144],
  },
];

const geometry = ([x, y, width, height]) => ({
  left: `${x / 14.4}cqw`, top: `${y / 14.4}cqw`,
  width: `${width / 14.4}cqw`, height: `${height / 14.4}cqw`,
});

export default function HomeV5HowItWorks({ steps, title, titleEnd, lang }) {
  return (
    <div data-home-v5-how data-lang={lang}>
      <h2 data-home-v5-how-heading>
        <span>{title}</span> <span>{titleEnd}</span>
      </h2>
      {steps.map((step, index) => {
        const card = cards[index];
        return (
          <article data-home-v5-how-card={index + 1} key={step.title}>
            <Image data-home-v5-panel src={`${root}/${card.surface}`} alt="" aria-hidden="true"
              width={card.panel[2]} height={card.panel[3]} unoptimized style={geometry(card.panel)} />
            <Image data-home-v5-photo src={`${root}/${card.photo}`} alt="" aria-hidden="true"
              width={504} height={468} unoptimized style={geometry(card.photoBox)} />
            <Image data-home-v5-label-surface src={`${root}/${card.titleSurface}`} alt="" aria-hidden="true"
              width={180} height={44.1} unoptimized style={geometry(card.label)} />
            <h3 data-home-v5-card-title style={geometry(card.label)}>{step.title}</h3>
            <p data-home-v5-card-copy style={geometry(card.copy)}>{lang === "en" ? card.enCopy : step.desc}</p>
          </article>
        );
      })}
    </div>
  );
}
