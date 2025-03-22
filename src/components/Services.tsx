'use client';

import { motion } from 'framer-motion';

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="services" className="section">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Main Services */}
          <div className="text-center space-y-4">
            <motion.p variants={itemVariants} className="text-blue-400 font-semibold">
              JetPack
            </motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white">
              Szolgáltatásaink
            </motion.h2>
          </div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white mb-4">Műanyag rekeszek gyártása</h3>
              <p className="text-gray-300 leading-relaxed">
                Cégünk 10 éve foglalkozik műanyag fröccsöntéssel, eközben gépparkunkat folyamatosan növeltük, hogy minden piaci igényt ki tudjunk elégíteni. A technológiai fejlesztéseinkkel, valamint energiatakarékos gyártó gépeinkkel biztosítani tudjuk a gyors, pontos, kiváló minőségű termékek rövid határidőn belüli gyártását.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white mb-4">Fröccsöntés, bérgyártás</h3>
              <p className="text-gray-300 leading-relaxed">
                Saját termékeink mellett bérgyártással is foglalkozunk piacképes árakon, akár nagy szériás termékeket is rövid határidőn belül szállítani tudunk. Vállaljuk hőre lágyuló műanyagok fröccsöntését, összeszerelését, csomagolását. Szakembereinkkel, beszállítóinkkal, partnereinkkel, valamint kialakult szerviz hátterünkkel garantálni tudjuk a gyors és folyamatos termék előállítást, legyen szó bármilyen műanyag termékről. 800 tonna záróerőig, valamint 2500g terméksúlyig vállalunk bérmunkát.
              </p>
            </div>
          </motion.div>

          {/* Company Info */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-blue-400 text-3xl mb-4">
                <i className='bx bx-mobile-alt'></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Cégünk</h3>
              <p className="text-gray-300">
                műanyag rekeszek, ládák, egyéb műanyag termékek gyártásával, kereskedelmével, valamint műanyag felvásárlással foglalkozik.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-blue-400 text-3xl mb-4">
                <i className='bx bx-code-alt'></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Piacképességünk</h3>
              <p className="text-gray-300">
                megőrzése céljából termékeinket direktben értékesítjük, viszonteladó partnerek nélkül, így tudjuk termékeink árát folyamatosan versenyképesen tartani.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-blue-400 text-3xl mb-4">
                <i className='bx bx-edit-alt'></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Folyamatosan</h3>
              <p className="text-gray-300">
                fejlődő gépparkunknak köszönhetően egyedülállóan állandó, nagy raktárkészlettel rendelkezünk, ezáltal nagyon rövid határidőn belül eleget tudunk tenni a megrendeléseknek. Igény esetén pedig saját autóinkkal ki tudjuk szállítani a megrendelt termékeinket.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 