'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
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

  const processSteps = [
    {
      icon: "🏭",
      title: "Gyártás",
      description: "Modern géppark, hatékony gyártási folyamatok"
    },
    {
      icon: "⚡",
      title: "Gyors Átfutás",
      description: "Rövid határidők, pontos teljesítés"
    },
    {
      icon: "🚚",
      title: "Szállítás",
      description: "Saját fuvareszközökkel, rugalmas kiszállítás"
    },
    {
      icon: "🤝",
      title: "Ügyfélszolgálat",
      description: "Személyre szabott támogatás"
    }
  ];

  return (
    <section id="services" className="section relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-16 opacity-0"
        >
          {/* Section Header */}
          <div className="text-center space-y-4">
            <motion.p variants={itemVariants} className="text-blue-400 font-semibold">
              JetPack
            </motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white">
              Szolgáltatásaink
            </motion.h2>
          </div>

          {/* Process Flow */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
          >
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 hidden md:block transform -translate-y-1/2" />
            
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                
                {/* Card */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-4xl mb-4"
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Animated Dot */}
                <motion.div
                  animate={{
                    x: [0, 100, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5,
                  }}
                  className="absolute top-1/2 left-0 w-2 h-2 bg-blue-500 rounded-full hidden md:block"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Features */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-4xl mb-4"
              >
                🛠️
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Egyedi Gyártás
              </h3>
              <p className="text-gray-400">
                Vállaljuk egyedi méretű és formájú műanyag termékek gyártását az Ön igényei szerint. Modern gépparkunkon precíz és költséghatékony gyártást biztosítunk, legyen szó kis vagy nagy szériákról.
              </p>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  Egyedi méretezés és formák
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  Prototípus készítés
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  Kis és nagy szériás gyártás
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="text-4xl mb-4"
              >
                ♻️
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Újrahasznosítás
              </h3>
              <p className="text-gray-400">
                Elkötelezettek vagyunk a környezetvédelem mellett. Saját újrahasznosító üzemünkben dolgozzuk fel a műanyag hulladékot, amit új termékek gyártásához használunk fel.
              </p>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  Műanyag hulladék feldolgozása
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  Környezetbarát technológiák
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  Fenntartható gyártás
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300 lg:col-span-1 md:col-span-2 lg:col-span-1"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-4xl mb-4"
              >
                📦
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Raktározás és Logisztika
              </h3>
              <p className="text-gray-400">
                Nagy kapacitású raktárkészlettel és saját fuvareszközökkel biztosítjuk a gyors és rugalmas kiszolgálást az ország egész területén.
              </p>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  Készletraktározás
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  Országos kiszállítás
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">•</span>
                  Rugalmas szállítási feltételek
                </li>
              </ul>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Services; 