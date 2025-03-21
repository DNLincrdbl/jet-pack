'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 before:absolute before:inset-0 before:w-full before:h-full before:transition-colors before:duration-300 ${
        isScrolled
          ? 'py-4 before:bg-black/50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.3)]'
          : 'py-6 before:bg-black/20'
      } backdrop-blur-lg border-b border-white/10`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="relative w-10 h-10 bg-white/10 backdrop-blur-xl rounded-xl p-1.5 border border-white/20">
              <Image
                src="/jetpack-bg.png"
                alt="JetPack Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-white drop-shadow-lg">JetPack</span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Kezdőlap', href: 'home' },
              { name: 'Termékeink', href: 'products' },
              { name: 'Szolgáltatásaink', href: 'services' },
              { name: 'Rólunk', href: 'about' },
              { name: 'Kapcsolat', href: 'contact' }
            ].map((item) => (
              <motion.a
                key={item.name}
                href={`#${item.href}`}
                whileHover={{ scale: 1.1 }}
                className="text-gray-100 hover:text-white transition-colors relative group drop-shadow-lg"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/20 border border-white/10"
          >
            Ajánlatkérés 📦
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
          >
            <svg
              className="w-6 h-6 text-white drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 