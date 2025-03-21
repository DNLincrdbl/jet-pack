'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/jetpack-bg.jpg"
            alt="JetPack Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        
        {/* Animated gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 animate-gradient-xy" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_110%)] opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div
            variants={itemVariants}
            className="relative inline-block"
          >
            <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight drop-shadow-2xl">
              JetPack Hungary
              <span className="block mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 animate-gradient-x drop-shadow-2xl">
                Műanyag rekeszek gyártása, műanyag fröccsöntés
              </span>
            </h1>
          </motion.div>
          
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light tracking-wide drop-shadow-lg px-4"
          >
            Széles választékú ládák és csomagolási megoldások minden igényhez
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/20 min-w-[200px] sm:min-w-[250px]"
            >
              Ajánlatkérés 📦
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-semibold border border-white/20 transition-all duration-300 hover:border-white/30 shadow-lg shadow-black/20 min-w-[200px] sm:min-w-[250px]"
            >
              Bérgyártás 🏭
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
        >
          <span className="text-xl sm:text-2xl">⬇️</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 