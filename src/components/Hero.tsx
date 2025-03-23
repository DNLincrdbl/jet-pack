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

        {/* Modern gradient overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.6)_35%,rgba(0,0,0,0.75)_50%,rgba(0,0,0,0.85)_75%,rgba(0,0,0,1)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.7)_0%,transparent_50%,rgba(0,0,0,0.7)_100%)]" />
        
        {/* Animated gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 animate-gradient-xy mix-blend-soft-light" />
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-600/10 via-transparent to-purple-600/10 animate-gradient-xy mix-blend-soft-light" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_110%)] opacity-20" />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div className="absolute h-2 w-2 bg-blue-400/30 rounded-full blur-sm top-1/4 left-1/4 animate-float" />
          <div className="absolute h-3 w-3 bg-purple-400/20 rounded-full blur-sm top-1/3 right-1/3 animate-float-slow" />
          <div className="absolute h-2 w-2 bg-blue-300/20 rounded-full blur-sm bottom-1/4 right-1/4 animate-float" />
          <div className="absolute h-2.5 w-2.5 bg-purple-300/20 rounded-full blur-sm bottom-1/3 left-1/3 animate-float-slow" />
        </div>

        {/* Light Spots */}
        <div className="absolute inset-0">
          <div className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] top-1/4 -left-1/4 animate-pulse-slow" />
          <div className="absolute w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] bottom-1/4 -right-1/4 animate-pulse-slow" />
        </div>

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
            <h1 className="relative flex flex-col items-center gap-8 sm:gap-12">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight drop-shadow-xl font-sora">
                JetPack Hungary
              </span>
              <div className="flex flex-col gap-4 sm:gap-6">
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-400 animate-gradient-x drop-shadow-lg opacity-90 font-medium leading-relaxed pb-1 font-outfit">
                  Műanyag rekeszek gyártása
                </span>
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-blue-400 animate-gradient-x drop-shadow-lg opacity-80 font-medium leading-relaxed pb-1 font-outfit">
                  Műanyag fröccsöntés
                </span>
              </div>
            </h1>
            {/* Decorative elements */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-2xl" />
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center px-4 mt-12 sm:mt-16"
          >
            <motion.a
              href="/termekek"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-medium transition-all duration-300 hover:from-blue-700 hover:to-blue-800 shadow-md shadow-blue-500/20 min-w-[220px] sm:min-w-[240px] border border-white/10"
            >
              Termékeink 📦
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.12)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-white/8 backdrop-blur-md text-white px-10 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-medium border border-white/15 transition-all duration-300 hover:border-white/25 shadow-md shadow-black/15 min-w-[220px] sm:min-w-[240px]"
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
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
        >
          <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">⬇️</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 