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

  const detailedServices = [
    {
      title: "Műanyag rekeszek gyártása",
      description: "Cégünk 10 éve foglalkozik műanyag fröccsöntéssel, eközben gépparkunkat folyamatosan növeltük, hogy minden piaci igényt ki tudjunk elégíteni. A technológiai fejlesztéseinkkel, valamint energiatakarékos gyártó gépeinkkel biztosítani tudjuk a gyors, pontos, kiváló minőségű termékek rövid határidőn belüli gyártását."
    },
    {
      title: "Fröccsöntés, bérgyártás",
      description: "Saját termékeink mellett bérgyártással is foglalkozunk piacképes árakon, akár nagy szériás termékeket is rövid határidőn belül szállítani tudunk. Vállaljuk hőre lágyuló műanyagok fröccsöntését, összeszerelését, csomagolását. Szakembereinkkel, beszállítóinkkal, partnereinkkel, valamint kialakult szerviz hátterünkkel garantálni tudjuk a gyors és folyamatos termék előállítást, legyen szó bármilyen műanyag termékről. 800 tonna záróerőig, valamint 2500g terméksúlyig vállalunk bérmunkát."
    }
  ];

  const companyFeatures = [
    {
      icon: "🏢",
      title: "Cégünk",
      description: "Műanyag rekeszek, ládák, egyéb műanyag termékek gyártásával, kereskedelmével, valamint műanyag felvásárlással foglalkozik."
    },
    {
      icon: "💰",
      title: "Piacképességünk",
      description: "Megőrzése céljából termékeinket direktben értékesítjük, viszonteladó partnerek nélkül, így tudjuk termékeink árát folyamatosan versenyképesen tartani."
    },
    {
      icon: "🏭",
      title: "Folyamatosan",
      description: "Fejlődő gépparkunknak köszönhetően egyedülállóan állandó, nagy raktárkészlettel rendelkezünk, ezáltal nagyon rövid határidőn belül eleget tudunk tenni a megrendeléseknek. Igény esetén pedig saját autóinkkal ki tudjuk szállítani a megrendelt termékeinket."
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

          {/* Company Features */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {companyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-4xl mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed Services */}
          <div className="pt-16 border-t border-white/10">
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {detailedServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Services; 