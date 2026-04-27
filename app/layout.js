import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Epic Surf School | Da Nang",
  description: "Best surfing lessons and board rentals on My Khe Beach, Vietnam.",
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="ru" 
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}