"use client";

import { useState } from "react";
import Image from "next/image";
import "./poster-system.css";

const palette = [
  { name: "Dark canvas", value: "#2E2E2E", text: "#F6F6F6" },
  { name: "Paper white", value: "#F6F6F6", text: "#2E2E2E" },
  { name: "Coral action", value: "#FE746A", text: "#2E2E2E" },
  { name: "Deep teal", value: "#395962", text: "#F6F6F6" },
  { name: "Supporting gray", value: "#585858", text: "#F6F6F6" },
  { name: "Header neutral", value: "#777777", text: "#2E2E2E" },
];

const lessons = [
  {
    id: "group",
    title: "Group Lesson",
    audience: "Best for first-timers",
    description: "Perfect for those who want to learn in a relaxed, lively atmosphere with like-minded people.",
    price: "900.000 VND",
    image: "/design/home-v2/lessons/lesson-group-desktop.webp",
  },
  {
    id: "split",
    title: "Split Lesson",
    audience: "Best for pairs",
    description: "Two students and one instructor, with focused coaching and plenty of water time.",
    price: "2.500.000 VND",
    image: "/design/home-v2/lessons/lesson-split-desktop.webp",
  },
  {
    id: "private",
    title: "Private Lesson",
    audience: "Personal coaching",
    description: "One-on-one format with an instructor for maximum focus and fast progress.",
    price: "1.800.000 VND",
    image: "/design/home-v2/lessons/lesson-private-desktop.webp",
  },
  {
    id: "surf-skate",
    title: "Surf-skate",
    audience: "Land-based training",
    description: "The land-based training format for practicing turns, stance and surf movement.",
    price: "600.000 VND",
    image: "/design/home-v2/lessons/lesson-surf-skate-desktop.webp",
  },
  {
    id: "lineup-pro",
    title: "Line-up / Pro",
    audience: "Advanced surfers",
    description: "Coaching for green waves, trimming and riding down the line.",
    price: "2.400.000 VND",
    image: "/design/home-v2/lessons/lesson-line-up-pro-desktop.webp",
  },
];

const secondaryStories = [
  {
    title: "School birthday",
    description: "We celebrate together with students, instructors, and friends of Epic Surf.",
    image: "/gallery/events/school-birthday.webp",
  },
  {
    title: "Sunset surf sessions",
    description: "Evening rides, soft light, photo moments, and a relaxed after-lesson vibe.",
    image: "/gallery/events/sunset-surf.webp",
  },
];

const compositionIncluded = [
  { label: "Photos / videos", image: "/design/home-v2/included/included-icon-photos-videos.svg" },
  { label: "Zinc / SPF", image: "/design/home-v2/included/included-icon-zinc-spf.svg" },
  { label: "Board", image: "/design/home-v2/included/included-icon-board.svg", featured: true },
  { label: "Rashguard", image: "/design/home-v2/included/included-icon-rashguard.svg" },
];

const compositionGallery = [
  { image: "/gallery/events/danang-open-2025/danang-open-2025-1.webp", alt: "Da Nang Surfing Open at My Khe Beach" },
  { image: "/gallery/events/birthday/epic-birthday-4.webp", alt: "Epic Surf School birthday" },
  { image: "/gallery/13.webp", alt: "Epic Surf community sunset session" },
];

function SectionHeading({ lead, rest }) {
  return (
    <h2 className="poster-section-heading">
      <span className="poster-section-heading__lead">{lead}</span>
      <span className="poster-section-heading__rest">{rest}</span>
    </h2>
  );
}

export function PosterSystem() {
  const [activeLessonId, setActiveLessonId] = useState("group");
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId) || lessons[0];

  return (
    <main className="poster-system" data-poster-system>
      <header className="poster-intro">
        <div className="poster-shell poster-intro__content">
          <p className="poster-kicker">Epic Surf · Home V2 · Poster-only</p>
          <h1>Ride every day</h1>
          <p className="poster-intro__note">
            A living specimen extracted from the approved Home V2: dark full-bleed canvas, real surf imagery,
            split editorial type, coral decisions and deep-teal support.
          </p>
          <div className="poster-ownership" aria-label="Responsive ownership">
            <div className="poster-ownership__item poster-ownership__item--mobile">
              <strong>Mobile</strong>≤639
            </div>
            <div className="poster-ownership__item poster-ownership__item--adaptive">
              <strong>Adaptive</strong>640–1439
            </div>
            <div className="poster-ownership__item poster-ownership__item--desktop">
              <strong>Desktop anchor</strong>≥1440
            </div>
          </div>
        </div>
      </header>

      <section className="poster-section">
        <div className="poster-shell">
          <SectionHeading lead="System" rest="foundations" />
          <div className="poster-foundations">
            <div>
              <h3 className="poster-subheading">Canonical palette</h3>
              <div className="poster-palette">
                {palette.map((color) => (
                  <div
                    key={color.name}
                    className="poster-swatch"
                    style={{ "--swatch": color.value, "--swatch-text": color.text }}
                  >
                    <strong>{color.name}</strong>
                    <span>{color.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="poster-subheading">Typography roles</h3>
              <div className="poster-type-specimen">
                <p className="poster-type-display">Catch your epic wave</p>
                <p className="poster-type-heading">Choose your lesson</p>
                <p className="poster-type-body">
                  Best surf school on My Khe Beach. Expert coaching, top-tier gear, and the best community.
                </p>
                <p className="poster-type-meta">01 · Meet &amp; gear up · 10 min</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="poster-section">
        <div className="poster-shell">
          <SectionHeading lead="Actions" rest="and states" />
          <div className="poster-action-row">
            <button type="button" className="poster-action poster-action--primary">Book now</button>
            <button type="button" className="poster-action poster-action--secondary">Choose a board</button>
            <button type="button" className="poster-action poster-action--quiet">Ask Epic</button>
          </div>

          <div className="poster-state-matrix" aria-label="Action state matrix">
            <div className="poster-state-chip">
              <span>Default / hover / active</span>
              <button type="button" className="poster-action poster-action--primary">Rent now</button>
            </div>
            <div className="poster-state-chip">
              <span>Focus-visible</span>
              <button type="button" className="poster-action poster-action--secondary">Open forecast</button>
            </div>
            <div className="poster-state-chip">
              <span>Loading</span>
              <button type="button" className="poster-action poster-action--secondary" data-loading="true" aria-busy="true">
                Loading cam
              </button>
            </div>
            <div className="poster-state-chip">
              <span>Disabled</span>
              <button type="button" className="poster-action poster-action--primary" disabled>Sold out</button>
            </div>
          </div>
        </div>
      </section>

      <section className="poster-section">
        <div className="poster-shell">
          <SectionHeading lead="Surface" rest="rhythm" />
          <div className="poster-surfaces">
            <article className="poster-surface poster-surface--paper poster-surface--offset">
              <h3>No gear? No problem.</h3>
              <p>Selective hard offset marks one priority message; it is not a default card treatment.</p>
            </article>
            <article className="poster-surface poster-surface--dark">
              <h3>My Khe live cam</h3>
              <p>Dark utility surfaces keep controls and status readable before decoration.</p>
            </article>
            <article className="poster-surface poster-surface--teal">
              <h3>Current forecast</h3>
              <p>Deep teal supports price, utility and secondary decision surfaces.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="poster-section">
        <div className="poster-shell">
          <SectionHeading lead="Price" rest="and media" />
          <div className="poster-price-media">
            <figure className="poster-media-frame">
              <Image
                src="/design/home-v2/rentals/rentals-background-photo.jpg"
                alt="Epic Surf School rental boards on My Khe Beach"
                fill
                sizes="(min-width: 1440px) 58vw, (min-width: 640px) 50vw, 100vw"
              />
              <figcaption className="poster-media-frame__caption">Boards matched to your level and today&apos;s conditions</figcaption>
            </figure>
            <div className="poster-price-panel">
              <p className="poster-price-panel__from">From</p>
              <div className="poster-price" aria-label="250,000 VND for two hours">
                <span className="poster-price__amount">250.000</span>
                <span className="poster-price__currency">VND</span>
                <span className="poster-price__unit">/ 2 hours</span>
              </div>
              <p className="poster-price-panel__copy">
                Shortboards, funboards, softboards and more. Daily or long term.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="poster-section">
        <div className="poster-shell">
          <SectionHeading lead="Choose your" rest="lesson" />
          <div className="poster-lesson-pattern">
            <div className="poster-selector" aria-label="Lesson selector">
              {lessons.map((lesson, index) => {
                const active = lesson.id === activeLessonId;
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveLessonId(lesson.id)}
                  >
                    <span className="poster-selector__number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="poster-selector__title">{lesson.title}</span>
                    <span className="poster-selector__arrow" aria-hidden="true">{active ? "→" : ""}</span>
                  </button>
                );
              })}
            </div>

            <article className="poster-lesson-detail">
              <div className="poster-lesson-detail__photo">
                <Image
                  key={activeLesson.image}
                  src={activeLesson.image}
                  alt={`${activeLesson.title} at Epic Surf School`}
                  fill
                  sizes="(min-width: 1440px) 44vw, (min-width: 900px) 40vw, 100vw"
                />
              </div>
              <div className="poster-lesson-detail__body">
                <h3>{activeLesson.title}</h3>
                <p className="poster-lesson-detail__audience">{activeLesson.audience}</p>
                <p className="poster-lesson-detail__description">{activeLesson.description}</p>
                <p className="poster-lesson-detail__price">{activeLesson.price}</p>
                <button type="button" className="poster-action poster-action--primary poster-lesson-detail__action">Book now</button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="poster-section">
        <div className="poster-shell">
          <SectionHeading lead="Calm" rest="utility" />
          <article className="poster-utility">
            <div className="poster-utility__header">
              <div>
                <h3>Live <span>cam</span> / Forecast</h3>
                <p>My Khe Beach · Da Nang</p>
              </div>
              <button type="button" className="poster-action poster-action--quiet">Ask Epic about conditions</button>
            </div>
            <div className="poster-utility__stats">
              <div className="poster-stat poster-stat--wave"><span>Wave height</span><strong>0.26 <em>m</em></strong></div>
              <div className="poster-stat"><span>Period</span><strong>4.35s</strong></div>
              <div className="poster-stat"><span>Wind</span><strong>7 km/h</strong></div>
              <div className="poster-stat"><span>Water</span><strong>26°C</strong></div>
            </div>
          </article>
        </div>
      </section>

      <section className="poster-section">
        <div className="poster-shell">
          <SectionHeading lead="Our" rest="events" />
          <div className="poster-editorial">
            <article className="poster-story poster-story--featured">
              <div className="poster-story__photo">
                <Image
                  src="/gallery/events/danang-open-2026.webp"
                  alt="Da Nang Surfing Open 2025"
                  fill
                  sizes="(min-width: 1440px) 62vw, (min-width: 900px) 60vw, 100vw"
                />
              </div>
              <div className="poster-story__body">
                <h3>Da Nang Surfing Open 2025</h3>
                <p>A full beach day with surf contests, music, photos, school friends, and plenty of waves.</p>
              </div>
              <span className="poster-story__label">View photos</span>
            </article>

            <div className="poster-editorial__secondary">
              {secondaryStories.map((story) => (
                <article key={story.title} className="poster-story poster-story--secondary">
                  <div className="poster-story__photo">
                    <Image src={story.image} alt={story.title} fill sizes="(min-width: 1440px) 180px, 42vw" />
                  </div>
                  <div className="poster-story__body">
                    <h3>{story.title}</h3>
                    <p>{story.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="poster-section poster-composition-section" aria-labelledby="poster-composition-title">
        <div className="poster-shell">
          <header className="poster-composition-lede">
            <p>How · Included · Reviews · Gallery · Footer</p>
            <h2 id="poster-composition-title">
              <span>Composition</span>
              <span>grammar</span>
            </h2>
            <p>
              Reusable rules for silhouette, controlled asymmetry and density. Each composition keeps one leading
              poster device; borders, rotation and overlap are never defaults.
            </p>
          </header>

          <div className="poster-composition-stack">
            <article className="poster-grammar poster-grammar--process">
              <header className="poster-grammar-heading poster-grammar-heading--framed">
                <span>Editorial / photo-led</span>
                <h3>How it works</h3>
              </header>
              <div className="poster-process-planes">
                <figure className="poster-process-photo">
                  <Image
                    src="/design/home-v2/how-it-works/how-it-works-meet.jpg"
                    alt="Meeting the Epic Surf instructor before a lesson"
                    fill
                    sizes="(min-width: 1440px) 62vw, (min-width: 640px) 58vw, 100vw"
                  />
                  <figcaption>01 · Meet &amp; gear up</figcaption>
                </figure>
                <div className="poster-process-note poster-process-note--theory">
                  <span>02</span>
                  <strong>Quick theory</strong>
                  <p>Safety, stance and the first movement pattern stay readable on their own plane.</p>
                </div>
                <div className="poster-process-note poster-process-note--practice">
                  <Image
                    src="/design/home-v2/how-it-works/how-it-works-practice.jpg"
                    alt="Practicing surf movement on My Khe Beach"
                    fill
                    sizes="(min-width: 1440px) 28vw, (min-width: 640px) 34vw, 100vw"
                  />
                  <span>03 · Practice on the beach</span>
                </div>
              </div>
              <p className="poster-grammar-rule">One media plane leads; supporting text overlaps lightly and returns to a clean stack on mobile.</p>
            </article>

            <div className="poster-collage-devices" aria-labelledby="poster-collage-devices-title">
              <header className="poster-collage-devices__header">
                <p>Layering recipes / real Epic Surf assets</p>
                <h3 id="poster-collage-devices-title">
                  <span>Poster collage</span>
                  <span>devices</span>
                </h3>
                <p>
                  Three repeatable arrangements for editorial stories, surf-spot information and rental inventory.
                  Each one keeps a single visual lead and a short, readable path through the layers.
                </p>
              </header>

              <div className="poster-collage-devices__stack">
                <article className="poster-collage poster-collage--scrapbook">
                  <header className="poster-collage__heading">
                    <span>01 / Story device</span>
                    <h4>Editorial scrapbook</h4>
                  </header>
                  <div className="poster-scrapbook-stage">
                    <figure className="poster-scrapbook-lead poster-torn-edge-a">
                      <Image
                        src="/gallery/13.webp"
                        alt="Epic Surf students carrying a board on My Khe Beach"
                        fill
                        sizes="(min-width: 1440px) 52vw, (min-width: 640px) 58vw, 100vw"
                      />
                      <figcaption>My Khe · after the session</figcaption>
                    </figure>
                    <figure className="poster-scrapbook-support poster-irregular-print">
                      <Image
                        src="/design/home-v2/how-it-works/how-it-works-meet.jpg"
                        alt="The beach approach where Epic Surf lessons begin"
                        fill
                        sizes="(min-width: 1440px) 24vw, (min-width: 640px) 30vw, 82vw"
                      />
                    </figure>
                    <div className="poster-scrapbook-note poster-torn-note">
                      <span>Local note / My Khe</span>
                      <strong>Meet on the sand. Leave with a surf story.</strong>
                      <p>
                        Epic Surf brings the board, the coaching and the crew; the beach sets the pace for the day.
                      </p>
                    </div>
                    <span className="poster-sticker poster-sticker--coral">Local tip</span>
                  </div>
                </article>

                <article className="poster-collage poster-collage--spot-file">
                  <header className="poster-collage__heading">
                    <span>02 / Information device</span>
                    <h4>Surf spot file</h4>
                  </header>
                  <div className="poster-spot-stage">
                    <figure className="poster-spot-photo poster-torn-edge-b">
                      <Image
                        src="/design/home-v2/rentals/rentals-background-photo.jpg"
                        alt="Rental boards set on My Khe Beach"
                        fill
                        sizes="(min-width: 1440px) 68vw, (min-width: 640px) 64vw, 100vw"
                      />
                      <figcaption>Visual reference / beach access</figcaption>
                    </figure>
                    <dl className="poster-spot-meta">
                      <div><dt>Location</dt><dd>My Khe Beach</dd></div>
                      <div><dt>City</dt><dd>Da Nang</dd></div>
                      <div><dt>Conditions</dt><dd>Check before paddling out</dd></div>
                    </dl>
                    <aside className="poster-spot-note poster-torn-note">
                      <span>Field note</span>
                      <p>Ask the Epic Surf team about today&apos;s conditions before choosing a board.</p>
                    </aside>
                    <span className="poster-sticker poster-sticker--teal">Check conditions</span>
                  </div>
                </article>

                <article className="poster-collage poster-collage--contact-sheet">
                  <header className="poster-collage__heading">
                    <span>03 / Rental device</span>
                    <h4>Board contact sheet</h4>
                  </header>
                  <div className="poster-board-stage">
                    <figure className="poster-board-print poster-board-print--hero poster-irregular-print">
                      <Image
                        src="/design/home-v2/rentals/rental-board-beach-composite.png"
                        alt="Epic Surf rental board photographed on the beach"
                        fill
                        sizes="(min-width: 1440px) 38vw, (min-width: 640px) 46vw, 100vw"
                      />
                      <figcaption><span>01</span> Full silhouette</figcaption>
                    </figure>
                    <figure className="poster-board-print poster-board-print--detail poster-torn-edge-a">
                      <Image
                        src="/design/home-v2/rentals/rental-board-beach-composite.png"
                        alt=""
                        fill
                        sizes="(min-width: 1440px) 26vw, (min-width: 640px) 34vw, 84vw"
                      />
                      <figcaption><span>02</span> Rail / deck detail</figcaption>
                    </figure>
                    <figure className="poster-board-print poster-board-print--nose poster-torn-edge-b">
                      <Image
                        src="/design/home-v2/rentals/rental-scene-board-top.png"
                        alt=""
                        fill
                        sizes="(min-width: 1440px) 20vw, (min-width: 640px) 25vw, 70vw"
                      />
                      <figcaption><span>03</span> Nose profile</figcaption>
                    </figure>
                    <div className="poster-board-index" aria-label="Contact sheet notes">
                      <span>Rental file / Epic Surf</span>
                      <p>Board match depends on your level and the day&apos;s conditions.</p>
                    </div>
                    <span className="poster-price-sticker">From 250.000 VND · 2 hours</span>
                  </div>
                </article>
              </div>
            </div>

            <article className="poster-grammar poster-grammar--product">
              <header className="poster-grammar-heading poster-grammar-heading--split">
                <span>Everything</span>
                <span>included</span>
                <small>Conversion / product</small>
              </header>
              <div className="poster-product-composition">
                <div className="poster-product-icons">
                  {compositionIncluded.map((item) => (
                    <div key={item.label} className={item.featured ? "poster-product-icon poster-product-icon--featured" : "poster-product-icon"}>
                      <Image src={item.image} alt="" width={210} height={210} />
                      <strong>{item.label}</strong>
                    </div>
                  ))}
                </div>
                <div className="poster-product-callout">
                  <span aria-hidden="true" />
                  <p>No gear?<br />No problem.</p>
                  <small>Board, rashguard, sun protection and photos/videos are ready for your lesson.</small>
                  <button type="button" className="poster-action poster-action--primary">Book a lesson</button>
                </div>
              </div>
              <p className="poster-grammar-rule">The raised board is the product hero; the callout receives the section&apos;s only hard offset.</p>
            </article>

            <article className="poster-grammar poster-grammar--mosaic">
              <header className="poster-grammar-heading poster-grammar-heading--editorial">
                <span>Collage / mosaic</span>
                <h3>Epic <em>moments</em></h3>
                <div className="poster-mosaic-filters" aria-label="Gallery filter examples">
                  <button type="button" aria-pressed="true">All</button>
                  <button type="button" aria-pressed="false">Surf fest</button>
                  <button type="button" aria-pressed="false">Birthday</button>
                </div>
              </header>
              <div className="poster-mosaic">
                {compositionGallery.map((item, index) => (
                  <figure key={item.image} className={`poster-mosaic__photo poster-mosaic__photo--${index + 1}`}>
                    <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1440px) 55vw, (min-width: 640px) 50vw, 100vw" />
                  </figure>
                ))}
                <blockquote className="poster-review-note">
                  <p>“Great lessons! The team made us fall in love with surfing!”</p>
                  <footer>Evgenia · Google reviews</footer>
                </blockquote>
              </div>
              <p className="poster-grammar-rule">Image scale creates the mosaic; one human review crosses the photo grid without turning every image into a card.</p>
            </article>

            <article className="poster-grammar poster-grammar--endcap">
              <div className="poster-endcap-copy">
                <header className="poster-grammar-heading poster-grammar-heading--compact">
                  <span>Calm utility / end-cap</span>
                  <h3>Ride every day</h3>
                </header>
                <p>Best surf school on My Khe Beach. Expert coaching, top-tier gear, and the best community.</p>
                <div className="poster-endcap-actions">
                  <button type="button">My Khe Beach · Da Nang</button>
                  <button type="button">+84 383 880 164</button>
                </div>
              </div>
              <Image
                className="poster-endcap-board"
                src="/design/home-v2/footer/footer-surfboard-artwork.svg"
                alt=""
                width={163}
                height={163}
              />
            </article>
          </div>
        </div>
      </section>

      <section className="poster-section">
        <div className="poster-shell">
          <SectionHeading lead="EN + RU" rest="wrapping" />
          <div className="poster-wrap-fixtures">
            <article className="poster-wrap-fixture" lang="en">
              <span>English fixture</span>
              <strong>How it works</strong>
              <p>We meet, prepare for the lesson, and choose the right surfboard.</p>
            </article>
            <article className="poster-wrap-fixture" lang="ru">
              <span>Русский fixture</span>
              <strong>Как проходят уроки</strong>
              <p>Встречаемся, знакомимся, готовимся к уроку и подбираем доску под ваш уровень.</p>
            </article>
          </div>
          <p className="poster-decision-note">
            NEEDS DECISION: Montserrat and Bebas Neue are preserved only as preferred family names. This specimen does not load new fonts.
          </p>
        </div>
      </section>
    </main>
  );
}

const meta = {
  title: "Epic Surf/Poster System",
  component: PosterSystem,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const CurrentHomeV2Language = {};
