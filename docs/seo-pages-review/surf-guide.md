# Epic Surf Guide

## 1. Page basics

- Route: `/surf-guide`
- Page purpose: Informational surf guide hub for beginners and Da Nang surf planning.
- Primary search intent: Learn beginner surf basics and navigate to relevant Da Nang surf pages.
- Primary keywords: surf guide Da Nang, beginner surf guide, Epic Surf Guide
- Secondary keywords: surf safety beginners, how to pop up on a surfboard, surf etiquette, Da Nang surf tips, My Khe Beach surfing
- Target audience: Beginner surfers, first-time visitors, people choosing between lessons and rental.
- CTA goal: Book a lesson or ask a question.

## 2. Current SEO metadata

- Title: Epic Surf Guide | Beginner Surf Tips & Da Nang Surf Info
- Description: Beginner-friendly surf tips from Epic Surf School Da Nang. Learn about surf lessons, safety, etiquette, pop-up basics, and surfing at My Khe Beach.
- Canonical URL: `https://www.surfdanang.com/surf-guide`
- Open Graph title: Epic Surf Guide | Beginner Surf Tips & Da Nang Surf Info
- Open Graph description: Beginner-friendly surf tips from Epic Surf School Da Nang. Learn about surf lessons, safety, etiquette, pop-up basics, and surfing at My Khe Beach.

## 3. Current visible page content

### Hero

- Badge: Beginner surf tips
- H1: Epic Surf Guide
- Intro / hero text: A practical Da Nang surf hub from Epic Surf School: where to start, how to stay safer, what to know before renting, and how beginners can make their first sessions smoother.
- Primary button: Book a lesson
- Secondary button: Ask a question

### Hub cards

- Surf Lessons in Da Nang: Lesson formats, what is included, safety, and booking.
- Surfing in Da Nang: Where to surf, who conditions suit, and when to ask for local advice.
- Surfboard Rental: Board types, rental fit, safety, and when a lesson is better.
- My Khe Beach Surfing: Local notes for the beach area most visitors ask about.

### Section: Beginner surf guide

Start with a softboard, learn on manageable waves, and focus on position before speed. A good first goal is simple: understand where to lie on the board, how to paddle straight, and how to stand up safely.

- Keep your chest lifted and eyes forward when paddling.
- Practice the pop-up movement on sand before entering the water.
- Aim for controlled rides, not the biggest wave.

### Section: How to pop up on a surfboard

The pop-up should be quick but not rushed. Push through your hands, bring your feet under your body, stay low, and look where you want to go. If your feet land wrong, reset and try again instead of forcing the ride.

### Section: Surf safety for beginners

- Do not surf alone when you are new.
- Keep distance from swimmers, other surfers, and hard objects.
- Hold onto your board unless it puts someone else at risk.
- If the ocean feels too strong, stop and ask for guidance.

### Section: Surf etiquette

Respect the person closest to the breaking part of the wave, do not drop in, paddle around the riding zone when possible, and communicate clearly. Good etiquette keeps the session calmer for everyone.

### Section: Lessons or rental?

Book a lesson if you are new, inconsistent, or unsure about the conditions. Rent a board when you can safely paddle, turn, stop, and choose suitable waves without close supervision.

### FAQ

#### What should a beginner learn first?

Board control, safe positioning, the pop-up movement, and how to choose small suitable waves.

#### Can I learn from this guide alone?

The guide helps, but first-timers should still take a lesson for safety and faster feedback.

#### Is surf etiquette important for beginners?

Yes. Even simple rules help beginners avoid dangerous or frustrating situations in the water.

### Related block

- Eyebrow: Explore more
- Heading: Surf info for Da Nang

Related cards:

- Surf Lessons: Beginner-friendly coaching near My Khe Beach.
- Surfing in Da Nang: Where to surf, when to go, and how to start.
- Surfboard Rental: Boards, local advice, and easy messenger booking.
- My Khe Beach Surfing: A local guide to Da Nang's main beach surf area.

### Final CTA block

- Eyebrow: Ready to surf?
- Heading: Book or message Epic
- Buttons / CTA labels:
  - Book a lesson
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

- Anchor text: Surf Lessons in Da Nang
  - URL: `/surf-lessons-danang`
  - Location: hub card
- Anchor text: Surfing in Da Nang
  - URL: `/surfing-danang`
  - Location: hub card
- Anchor text: Surfboard Rental
  - URL: `/surfboard-rental-danang`
  - Location: hub card
- Anchor text: My Khe Beach Surfing
  - URL: `/my-khe-beach-surfing`
  - Location: hub card
- Anchor text: Surf Lessons
  - URL: `/surf-lessons-danang`
  - Location: related block
- Anchor text: Surfing in Da Nang
  - URL: `/surfing-danang`
  - Location: related block
- Anchor text: Surfboard Rental
  - URL: `/surfboard-rental-danang`
  - Location: related block
- Anchor text: My Khe Beach Surfing
  - URL: `/my-khe-beach-surfing`
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
  - Label: Book a lesson
  - Locations: hero, final CTA block
  - Action: opens booking modal with English group lesson booking URL.
  - URL used by modal: `https://n1434193.alteg.io/company/1248257/activity/select?o=act2026-06-01`
  - Existing `trackEvent`: `booking_cta_click`
  - Event properties visible in code: `language: "en"`, `service_type: "group"`, `cta_location: "seo_page_hero"`, `cta_label: "surf_guide_page"` for this page CTA.
- Rental CTA:
  - No page-specific rental CTA in hero or final CTA for this page.
  - Existing `trackEvent`: `rental_cta_click` is available in `SeoPage.jsx`, but this page does not set `primaryAction: "rental"` or `secondaryAction: "rental"`.
- WhatsApp:
  - Label: Ask a question in hero; WhatsApp in final CTA.
  - URL: `https://wa.me/84383880164`
  - Message text: Hi! I have a question about Epic Surf Guide at Epic Surf School.
  - Existing `trackEvent`: `whatsapp_click`
- Telegram:
  - Label: Telegram in final CTA.
  - URL: `https://t.me/danangsurf`
  - Message text: Hi! I have a question about Epic Surf Guide at Epic Surf School.
  - Existing `trackEvent`: `telegram_click`
- Zalo:
  - Label: Zalo in final CTA.
  - URL: `https://zalo.me/84383880164`
  - Message text: Hi! I have a question about Epic Surf Guide at Epic Surf School.
  - Existing `trackEvent`: `zalo_click`

## 6. Needs confirmation

- Seasonality and surf conditions.
- Beginner safety guidance for Da Nang and My Khe Beach.
- Whether the rental guidance matches current school policy.
- Current lesson and rental availability.
- Support for UTM/partner passthrough in Alteg/YClients.

## 7. Notes for SEO review

- Page type: Informational.
- FAQ: Yes.
- CTA: Yes.
- Internal links: Yes.
- Related pages: Yes.
- Metadata: Yes.
