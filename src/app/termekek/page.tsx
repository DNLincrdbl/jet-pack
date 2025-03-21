'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaRuler, FaWeight, FaBoxes } from 'react-icons/fa';

interface ProductDetails {
  dimensions: string;
  weight: string;
  capacity: string;
  features: string[];
}

interface Product {
  name: string;
  description: string;
  image: string;
  details: ProductDetails;
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      name: "M30 rekesz",
      description: "Méretek: 600 x 400 x 300 mm\nSúly: 2,2kg\nTeherbírás: 30kg",
      image: "/img/portfolio1.jpg",
      details: {
        dimensions: "600 x 400 x 300 mm",
        weight: "2,2 kg",
        capacity: "30 kg",
        features: [
          "Strapabíró kivitel",
          "Egymásba rakható",
          "Könnyen tisztítható",
          "UV-álló anyag"
        ]
      }
    },
    {
      name: "M5 rekesz",
      description: "Méretek: 600 x 400 x 100 mm\nSúly: 1 kg\nTeherbírás: 15kg",
      image: "/img/portfolio2.jpg",
      details: {
        dimensions: "600 x 400 x 100 mm",
        weight: "1 kg",
        capacity: "15 kg",
        features: [
          "Könnyű súly",
          "Kompakt méret",
          "Egymásba rakható",
          "Ideális kisebb termékekhez"
        ]
      }
    },
    {
      name: "Export egyutas rekesz",
      description: "Méretek: 400 x 300 x 150 mm\nTerhelhetőség: 6kg",
      image: "/img/portfolio3.jpg",
      details: {
        dimensions: "400 x 300 x 150 mm",
        weight: "0,8 kg",
        capacity: "6 kg",
        features: [
          "Egyszer használatos",
          "Költséghatékony",
          "Környezetbarát",
          "Ideális exporthoz"
        ]
      }
    },
    {
      name: "M10 rekesz",
      description: "Méretek: 600 x 400 x 150 mm\nSúly: 1,2kg\nTeherbírás: 15kg",
      image: "/img/portfolio4.jpg",
      details: {
        dimensions: "600 x 400 x 150 mm",
        weight: "1,2 kg",
        capacity: "15 kg",
        features: [
          "Univerzális használat",
          "Tartós kivitel",
          "Egymásba rakható",
          "Optimális méret"
        ]
      }
    },
    {
      name: "Műanyag konténer perforált JET785E",
      description: "Méret: 1000x1200x785mm\nTára: 31kg\nTeherbírás: 500kg (5000kg egymásra pakolva)\n4 talpas vagy csúszótalpas kivitel",
      image: "/img/JET785e_1.jpg",
      details: {
        dimensions: "1000 x 1200 x 785 mm",
        weight: "31 kg",
        capacity: "500 kg (5000kg egymásra pakolva)",
        features: [
          "Perforált kivitel",
          "Nagy teherbírás",
          "4 talpas kivitel",
          "Ipari felhasználásra"
        ]
      }
    },
    {
      name: "Műanyag konténer perforált JET580",
      description: "Méret: 1000x1200x580mm\nTára: 26kg\nTeherbírás: 500kg (5000kg egymásra pakolva)\n4 talpas vagy csúszótalpas kivitel",
      image: "/img/JET580_1.jpg",
      details: {
        dimensions: "1000 x 1200 x 580 mm",
        weight: "26 kg",
        capacity: "500 kg (5000kg egymásra pakolva)",
        features: [
          "Perforált kivitel",
          "Kompakt magasság",
          "Nagy teherbírás",
          "Ipari felhasználásra"
        ]
      }
    },
    {
      name: "Műanyag konténer zárt JET785Z",
      description: "Méret: 1000x1200x785mm\nTára: 33kg\nTeherbírás: 500kg (5000kg egymásra pakolva)\n4 talpas vagy csúszótalpas kivitel",
      image: "/img/JET785z_1.jpg",
      details: {
        dimensions: "1000 x 1200 x 785 mm",
        weight: "33 kg",
        capacity: "500 kg (5000kg egymásra pakolva)",
        features: [
          "Zárt kivitel",
          "Maximális védelem",
          "Nagy teherbírás",
          "Ipari felhasználásra"
        ]
      }
    }
  ];

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Termékkatalógus
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Fedezze fel prémium minőségű műanyag rekeszeinket és konténereinket, amelyek tökéletes megoldást nyújtanak minden logisztikai kihívásra.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-blue-500/20"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 transform -translate-y-4 transition-transform duration-500 group-hover:translate-y-0 text-center px-6">
                    {product.name}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0"
                  >
                    Részletek
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Modal */}
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl overflow-hidden backdrop-blur-lg border border-white/20 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
              >
                <IoClose size={24} />
              </motion.button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{selectedProduct.name}</h3>
                    <div className="h-1 w-20 bg-blue-500 rounded-full mb-4"></div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <FaRuler className="text-blue-400 min-w-[20px]" size={20} />
                      <span className="text-sm md:text-base">Méretek: {selectedProduct.details.dimensions}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <FaWeight className="text-blue-400 min-w-[20px]" size={20} />
                      <span className="text-sm md:text-base">Súly: {selectedProduct.details.weight}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <FaBoxes className="text-blue-400 min-w-[20px]" size={20} />
                      <span className="text-sm md:text-base">Teherbírás: {selectedProduct.details.capacity}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-white mb-3">Jellemzők</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProduct.details.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-2 text-gray-300"
                        >
                          <span className="w-2 h-2 bg-blue-400 rounded-full min-w-[8px]"></span>
                          <span className="text-sm md:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors text-sm md:text-base"
                    onClick={() => {
                      setSelectedProduct(null);
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Árajánlatot kérek
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
} 