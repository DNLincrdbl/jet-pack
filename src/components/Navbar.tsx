'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navItems = [
  { name: 'Kezdőlap', href: 'home' },
  { name: 'Termékeink', href: '/termekek' },
  { name: 'Szolgáltatásaink', href: 'services' },
  { name: 'Rólunk', href: 'about' },
  { name: 'Kapcsolat', href: 'contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 before:absolute before:inset-0 before:w-full before:h-full before:transition-colors before:duration-300 ${
          isScrolled
            ? 'py-4 before:bg-gradient-to-b before:from-black/95 before:via-black/95 before:to-black/90 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.5)]'
            : 'py-6 before:bg-gradient-to-b before:from-black/90 before:via-black/90 before:to-black/85'
        } backdrop-blur-2xl border-b border-white/10`}
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
                { name: 'Termékeink', href: '/termekek' },
                { name: 'Szolgáltatásaink', href: 'services' },
                { name: 'Rólunk', href: 'about' },
                { name: 'Kapcsolat', href: 'contact' }
              ].map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href.startsWith('/') ? item.href : `#${item.href}`}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-100 hover:text-white transition-colors relative group drop-shadow-lg"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/20 border border-white/10"
            >
              Ajánlatkérés 📦
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="relative w-6 h-5 flex flex-col justify-between"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 9 },
                  }}
                  className="absolute h-0.5 w-6 bg-white rounded-full transform origin-left"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="absolute h-0.5 w-6 bg-white rounded-full"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -9 },
                  }}
                  className="absolute h-0.5 w-6 bg-white rounded-full transform origin-left"
                  style={{ bottom: 0 }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="fixed inset-0 bg-black/90 backdrop-blur-lg" onClick={closeMobileMenu} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
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
                    <span className="text-2xl font-bold text-white">JetPack</span>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeMobileMenu}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-xl border border-white/20"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>
                <nav className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href.startsWith('/') ? item.href : `#${item.href}`}
                      onClick={closeMobileMenu}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="block text-lg font-medium text-white hover:text-blue-400 transition-colors"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl text-center font-semibold transition-all duration-300 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/20 border border-white/10"
                >
                  Ajánlatkérés 📦
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 