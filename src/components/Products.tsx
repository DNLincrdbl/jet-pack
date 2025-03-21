'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const Products = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const products = [
    {
      name: "M30 rekesz",
      description: "Méretek: 600 x 400 x 300 mm\nSúly: 2,2kg\nTeherbírás: 30kg",
      image: "/img/portfolio1.jpg",
    },
    {
      name: "M5 rekesz",
      description: "Méretek: 600 x 400 x 100 mm\nSúly: 1 kg\nTeherbírás: 15kg",
      image: "/img/portfolio2.jpg",
    },
    {
      name: "Export egyutas rekesz",
      description: "Méretek: 400 x 300 x 150 mm\nTerhelhetőség: 6kg",
      image: "/img/portfolio3.jpg",
    },
    {
      name: "M10 rekesz",
      description: "Méretek: 600 x 400 x 150 mm\nSúly: 1,2kg\nTeherbírás: 15kg",
      image: "/img/portfolio4.jpg",
    },
    {
      name: "Műanyag konténer perforált JET785E",
      description: "Méret: 1000x1200x785mm\nTára: 31kg\nTeherbírás: 500kg (5000kg egymásra pakolva)\n4 talpas vagy csúszótalpas kivitel",
      image: "/img/JET785e_1.jpg",
    },
    {
      name: "Műanyag konténer perforált JET580",
      description: "Méret: 1000x1200x580mm\nTára: 26kg\nTeherbírás: 500kg (5000kg egymásra pakolva)\n4 talpas vagy csúszótalpas kivitel",
      image: "/img/JET580_1.jpg",
    },
    {
      name: "Műanyag konténer zárt JET785Z",
      description: "Méret: 1000x1200x785mm\nTára: 33kg\nTeherbírás: 500kg (5000kg egymásra pakolva)\n4 talpas vagy csúszótalpas kivitel",
      image: "/img/JET785z_1.jpg",
    }
  ];

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
    <section id="products" className="relative py-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.p variants={itemVariants} className="text-blue-400 font-semibold mb-2">
            JetPack
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Termé<span className="text-blue-400">keink</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Amennyiben termékeink felkeltették érdeklődését, kérje <a href="#contact" className="text-blue-400 hover:text-blue-300 transition-colors">árajánlatunkat</a>.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500/80 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-medium"
                >
                  Részletek
                </motion.button>
              </div>
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-300 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Products; 