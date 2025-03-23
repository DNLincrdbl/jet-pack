'use client';

import { Sora, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CookieConsent from '@/components/CookieConsent';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kis késleltetés a stabil betöltéshez
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="hu" className={`scroll-smooth ${sora.variable} ${outfit.variable}`}>
      <head>
        <title>JetPack - Műanyag rekeszek és konténerek</title>
        <meta name="description" content="Prémium minőségű műanyag rekeszek és konténerek minden logisztikai kihívásra." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={`${outfit.className} bg-[#0a0a0a] text-white overflow-x-hidden`}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0B0B1E] z-50 flex items-center justify-center"
            >
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Navbar />
              {children}
              <CookieConsent />
            </motion.div>
          )}
        </AnimatePresence>
      </body>
    </html>
  );
}
