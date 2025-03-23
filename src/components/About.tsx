'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Image from 'next/image';

export default function About() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
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
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { number: "10+", label: "Év tapasztalat" },
    { number: "800", label: "Tonna záróerő" },
    { number: "2500g", label: "Terméksúly" },
    { number: "100%", label: "Ügyfél elégedettség" }
  ];

  return (
    <section id="about" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,0.4),rgba(0,0,0,1))]" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Rólunk
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Több mint egy évtizedes tapasztalattal a műanyagiparban, folyamatos fejlődésre és innovációra törekszünk.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                  className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 flex items-center justify-center backdrop-blur-sm"
                >
                  <span className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {stat.number}
                  </span>
                </motion.div>
                <p className="text-sm sm:text-base text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Column - Image */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay" />
                <div className="relative w-full h-full">
                  <Image
                    src="/img/dv_facility-1.jpg"
                    alt="Gyártási folyamat"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -right-8 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center"
              >
                <span className="text-2xl sm:text-4xl">🏭</span>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-8 -left-8 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center"
              >
                <span className="text-2xl sm:text-4xl">♻️</span>
              </motion.div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              variants={containerVariants}
              className="space-y-6 sm:space-y-8"
            >
              <motion.div
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Cégünk
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Műanyag rekeszek, ládák, egyéb műanyag termékek gyártásával, kereskedelmével, valamint műanyag felvásárlással foglalkozunk.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Piacképességünk
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Megőrzése céljából termékeinket direktben értékesítjük, viszonteladó partnerek nélkül, így tudjuk termékeink árát folyamatosan versenyképesen tartani.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Folyamatos fejlődés
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Fejlődő gépparkunknak köszönhetően egyedülállóan állandó, nagy raktárkészlettel rendelkezünk, ezáltal nagyon rövid határidőn belül eleget tudunk tenni a megrendeléseknek. Igény esetén pedig saját autóinkkal ki tudjuk szállítani a megrendelt termékeinket.
                </p>
              </motion.div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
} 