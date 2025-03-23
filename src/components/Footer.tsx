'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-white"
            >
              JetPack 📦
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-gray-400"
            >
              Minőségi műanyag rekeszek és konténerek minden logisztikai igényhez
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex space-x-4"
            >
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-2xl hover:text-blue-400 transition-colors"
              >
                📦
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-2xl hover:text-blue-400 transition-colors"
              >
                🏭
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-2xl hover:text-blue-400 transition-colors"
              >
                🚛
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.h4
              variants={itemVariants}
              className="text-lg font-semibold text-white"
            >
              Gyors linkek
            </motion.h4>
            <motion.ul
              variants={itemVariants}
              className="space-y-2"
            >
              <li>
                <Link href="#home" className="text-gray-400 hover:text-white transition-colors">
                  Kezdőlap
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                  Rólunk
                </Link>
              </li>
              <li>
                <Link href="#products" className="text-gray-400 hover:text-white transition-colors">
                  Termékek
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Kapcsolat
                </Link>
              </li>
            </motion.ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.h4
              variants={itemVariants}
              className="text-lg font-semibold text-white"
            >
              Termékek
            </motion.h4>
            <motion.ul
              variants={itemVariants}
              className="space-y-2"
            >
              <li>
                <Link href="/termekek" className="text-gray-400 hover:text-white transition-colors">
                  Műanyag rekeszek
                </Link>
              </li>
              <li>
                <Link href="/termekek" className="text-gray-400 hover:text-white transition-colors">
                  Műanyag konténerek
                </Link>
              </li>
            </motion.ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.h4
              variants={itemVariants}
              className="text-lg font-semibold text-white"
            >
              Kapcsolat
            </motion.h4>
            <motion.ul
              variants={itemVariants}
              className="space-y-2"
            >
              <li className="flex items-center space-x-2">
                <span className="text-xl">📍</span>
                <span className="text-gray-400">6787 Zákányszék, Külterület 419.</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-xl">📞</span>
                <span className="text-gray-400">+36 70 422 5834</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-xl">✉️</span>
                <span className="text-gray-400">muanyagrekesz@gmail.com</span>
              </li>
            </motion.ul>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mt-12 pt-8 border-t border-white/10 text-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-gray-400"
          >
            © {new Date().getFullYear()} JetFruit kft. Minden jog fenntartva. 🚀
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 