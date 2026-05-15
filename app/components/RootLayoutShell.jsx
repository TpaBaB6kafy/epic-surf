import { Roboto_Flex } from "next/font/google";
import { buildStructuredData } from "../data/siteConfig";

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin", "cyrillic"],
  weight: ["100", "400"],
});

export default function RootLayoutShell({ children, locale }) {
  const structuredData = buildStructuredData(locale);

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
