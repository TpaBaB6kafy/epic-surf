This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production env

Set `NEXT_PUBLIC_GTM_ID` in Vercel to enable Google Tag Manager. Leave it empty for local development or previews where GTM should not load.

Set both Umami variables to enable Umami Cloud or an external Umami script:

```bash
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
NEXT_PUBLIC_UMAMI_WEBSITE_ID=b5edd093-75f9-45bf-bbc5-b2cfbc494743
```

Set `NEXT_PUBLIC_GTM_ID` together with the two Umami variables to send events to both systems. If any analytics env is missing, the site still runs and `trackEvent()` skips that provider safely.

Optional canonical override:

```bash
NEXT_PUBLIC_SITE_URL=https://www.surfdanang.com
```

The default canonical domain is already `https://www.surfdanang.com`.

You can start editing the page by modifying files in `app/`. The page auto-updates as you edit the files.

## Typography

The project uses two font roles:

- Headings: `"Arial Black", Arial, "Helvetica Neue", Helvetica, sans-serif`
- Body/UI: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Local font loading through `next/font/local` is not currently used.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
