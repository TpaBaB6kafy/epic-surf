import Script from "next/script";
import { buildStructuredData } from "../data/siteConfig";

export default function RootLayoutShell({ children, locale }) {
  const structuredData = buildStructuredData(locale);
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const analyticsEnvMarker = `${gtmId ? "gtm:on" : "gtm:off"};${umamiScriptUrl && umamiWebsiteId ? "umami:on" : "umami:off"}`;

  return (
    <html
      lang={locale}
      className="scroll-smooth antialiased"
    >
      <head>
        <link rel="preconnect" href="https://n1304231.alteg.io" />
        <link rel="dns-prefetch" href="https://n1304231.alteg.io" />
        <link rel="preconnect" href="https://n1435323.alteg.io" />
        <link rel="dns-prefetch" href="//n1435323.alteg.io" />
        <link rel="preconnect" href="https://n1435324.alteg.io" />
        <link rel="dns-prefetch" href="//n1435324.alteg.io" />
        <meta name="analytics-env" content={analyticsEnvMarker} />
        {umamiScriptUrl && umamiWebsiteId && (
          <script
            defer
            src={umamiScriptUrl}
            data-website-id={umamiWebsiteId}
          />
        )}
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
