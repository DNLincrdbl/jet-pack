import type { Metadata } from "next";
import { Sora, Outfit } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "JetPack - Műanyag rekeszek és konténerek",
  description: "Prémium minőségű műanyag rekeszek és konténerek minden logisztikai kihívásra.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" className={`scroll-smooth ${sora.variable} ${outfit.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={`${outfit.className} bg-[#0a0a0a] text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
