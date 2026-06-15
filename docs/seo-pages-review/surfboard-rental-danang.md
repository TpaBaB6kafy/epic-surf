# Surfboard Rental in Da Nang

## 1. Page basics

- English route: `/surfboard-rental-danang`
- Russian route: `/ru/surfboard-rental-danang`
- Page purpose: Commercial landing page for surfboard rental in Da Nang.
- Primary search intent: Rent a surfboard in Da Nang near My Khe Beach.
- Primary keywords: surfboard rental Da Nang, rent surfboard Da Nang, surf board rental Da Nang
- Secondary keywords: My Khe Beach board rental, softboard rental Da Nang, longboard rental Da Nang, surf rental Da Nang
- Target audience: Independent surfers, improving surfers, visitors who already know how to handle a surfboard safely.
- CTA goal: Open rental flow or contact Epic Surf School through messenger.

## 2. Current SEO metadata

- Title: Surfboard Rental in Da Nang | Epic Surf School
- Description: Rent a surfboard in Da Nang near My Khe Beach. Softboards, longboards, malibus and shortboards from 250,000 VND / 2 hours. Message Epic Surf School to confirm availability.
- Canonical URL: `https://www.surfdanang.com/surfboard-rental-danang`
- Russian canonical URL: `https://www.surfdanang.com/ru/surfboard-rental-danang`
- Hreflang: reciprocal `en` and `ru` alternates, with the English route as `x-default`.
- Open Graph title: Surfboard Rental in Da Nang | Epic Surf School
- Open Graph URL and copy are locale-specific on the EN and RU pages.
- Sitemap: both rental routes are included with reciprocal language alternates.

## 3. Current visible page content

### Hero

- Badge: Board rental
- H1: Surfboard Rental in Da Nang
- Intro / hero text: Rent a surfboard in Da Nang with Epic Surf School. We help you choose a board for your level and the day's conditions, then keep booking simple through WhatsApp, Telegram, or Zalo.
- Primary button: Rent a board
- Secondary button: Ask about conditions

### Section: Who rental is for

Rental is best for surfers who already know how to paddle, control the board, avoid collisions, and judge whether the conditions are suitable for their level.

### Section: Board options

The current rental range includes softboards for easier learning, longboards, malibus, and shortboards for more confident riders.

Cards:

- Softboards: A forgiving choice for newer surfers and smaller waves.
- Longboards and malibus: Stable options for relaxed rides and easier wave catching.
- Shortboards: For experienced surfers when conditions and ability match.

### Section: Rental price

Current site pricing starts from 250,000 VND for a two-hour session. Message the team to confirm the best board and current availability before you go.

### Section: Pickup and location

Epic Surf School is connected to the My Khe Beach surf area. Exact pickup details should be confirmed by messenger when you book.

### Section: When to take a lesson instead

If you have never surfed, cannot confidently control a board, or are unsure about the sea conditions, a lesson is safer and more useful than rental.

### FAQ

#### Can beginners rent a board?

Beginners can rent only when the conditions and their ability are suitable. First-timers should book a lesson.

#### What boards are available?

The site lists softboards, longboards, malibus, and shortboards. Availability should be confirmed by messenger.

#### How do I book rental?

Use WhatsApp, Telegram, or Zalo so the team can confirm timing, board choice, and pickup details.

### Related block

- Eyebrow: Explore more
- Heading: Surf info for Da Nang

Related cards:

- Surf Lessons: Beginner-friendly coaching near My Khe Beach.
- Surfing in Da Nang: Where to surf, when to go, and how to start.
- My Khe Beach Surfing: A local guide to Da Nang's main beach surf area.
- Surf Guide: Beginner tips, safety notes, and Da Nang surf info.

### Final CTA block

- Eyebrow: Ready to surf?
- Heading: Book or message Epic
- Buttons / CTA labels:
  - Rent a board
  - WhatsApp
  - Telegram
  - Zalo

### Footer internal SEO links

Footer Surf Info links:

- Surf Lessons
- Surfing in Da Nang
- Surfboard Rental
- My Khe Beach Surfing
- Surf Guide

## 4. Current internal links

- Homepage rental block:
  - English `View all boards` links to `/surfboard-rental-danang`.
  - Russian localized catalog CTA links to `/ru/surfboard-rental-danang`.

- Anchor text: Surf Lessons
  - URL: `/surf-lessons-danang`
  - Location: related block
- Anchor text: Surfing in Da Nang
  - URL: `/surfing-danang`
  - Location: related block
- Anchor text: My Khe Beach Surfing
  - URL: `/my-khe-beach-surfing`
  - Location: related block
- Anchor text: Surf Guide
  - URL: `/surf-guide`
  - Location: related block
- Anchor text: Surf Lessons
  - URL: `/surf-lessons-danang`
  - Location: footer Surf Info
- Anchor text: Surfing in Da Nang
  - URL: `/surfing-danang`
  - Location: footer Surf Info
- Anchor text: Surfboard Rental
  - URL: `/surfboard-rental-danang`
  - Location: footer Surf Info
- Anchor text: My Khe Beach Surfing
  - URL: `/my-khe-beach-surfing`
  - Location: footer Surf Info
- Anchor text: Surf Guide
  - URL: `/surf-guide`
  - Location: footer Surf Info

## 5. Current CTA and tracking

- Book / lesson CTA:
  - No page-specific lesson booking CTA in hero or final CTA for this page.
  - Existing `trackEvent`: `booking_cta_click` is available in `SeoPage.jsx`, but this page sets `primaryAction: "rental"`.
- Rental CTA:
  - Label: Rent a board
  - Locations: hero, final CTA block
  - Action: opens rental modal.
  - Existing `trackEvent`: `rental_cta_click`
  - Event properties visible in code: `language: "en"`, `service_type: "board_rental"`, `cta_location: "seo_page_hero"`, `cta_label: "/surfboard-rental-danang"`.
- WhatsApp:
  - Label: Ask about conditions in hero; WhatsApp in final CTA.
  - URL: `https://wa.me/84383880164`
  - Message text: Hi! I have a question about Surfboard Rental in Da Nang at Epic Surf School.
  - Existing `trackEvent`: `whatsapp_click`
- Telegram:
  - Label: Telegram in final CTA.
  - URL: `https://t.me/danangsurf`
  - Message text: Hi! I have a question about Surfboard Rental in Da Nang at Epic Surf School.
  - Existing `trackEvent`: `telegram_click`
- Zalo:
  - Label: Zalo in final CTA.
  - URL: `https://zalo.me/84383880164`
  - Message text: Hi! I have a question about Surfboard Rental in Da Nang at Epic Surf School.
  - Existing `trackEvent`: `zalo_click`

## 6. Needs confirmation

- Current rental prices, including whether 250,000 VND for a two-hour session is still accurate.
- Current availability of softboards, longboards, malibus, and shortboards.
- Exact pickup details and location.
- Whether public spot delivery is promised or not.
- Safety rules and eligibility for beginners renting boards.
- Current surf conditions and seasonality.
- Support for UTM/partner passthrough in rental or messenger flows.
- Production verification of reciprocal hreflang output and indexing for both rental routes.

## 7. Notes for SEO review

- Page type: Commercial.
- FAQ: Yes.
- CTA: Yes.
- Internal links: Yes.
- Related pages: Yes.
- Metadata: Yes.
- EN/RU canonical and hreflang: Yes in code and sitemap; production indexing still needs verification.
