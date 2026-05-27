import localFont from "next/font/local";
import Script from "next/script";
import { buildStructuredData } from "../data/siteConfig";

const robotoFlex = localFont({
  variable: "--font-roboto-flex",
  src: [
    {
      path: "../../public/fonts/ChesterSans-Light.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/ChesterSans-Bold.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export default function RootLayoutShell({ children, locale }) {
  const structuredData = buildStructuredData(locale);
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html
      lang={locale}
      className={`${robotoFlex.variable} scroll-smooth antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://n1304231.alteg.io" />
        <link rel="dns-prefetch" href="https://n1304231.alteg.io" />
      </head>
      <body className="min-h-screen">
        {gtmId && (
          <>
            <Script id="gtm-data-layer" strategy="beforeInteractive">
              {`window.dataLayer = window.dataLayer || [];`}
            </Script>
            <Script
              id="gtm-loader"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        )}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
