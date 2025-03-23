'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

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
    hidden: { 
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0"
        >
          {/* Existing background effects */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20"
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Rólunk
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Ismerje meg cégünket és szolgáltatásainkat
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group relative bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-500"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300"
              >
                🏢
              </motion.div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Cégünk
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Műanyag rekeszek, ládák, egyéb műanyag termékek gyártásával,
                kereskedelmével, valamint műanyag felvásárlással foglalkozik.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group relative bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-500"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300"
              >
                💪
              </motion.div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Piacképességünk
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Megőrzése céljából termékeinket direktben értékesítjük, viszonteladó
                partnerek nélkül, így tudjuk termékeink árát folyamatosan versenyképesen tartani.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group relative bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-500"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300"
              >
                🚀
              </motion.div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Folyamatosan
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Fejlődő gépparkunknak köszönhetően egyedülállóan állandó, nagy
                raktárkészlettel rendelkezünk, ezáltal nagyon rövid határidőn belül eleget tudunk tenni a
                megrendeléseknek.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 