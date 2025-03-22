'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { IoClose } from 'react-icons/io5';
import { FaRuler, FaWeight, FaBoxes } from 'react-icons/fa';
import React from 'react';

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
  category: string;
  details: ProductDetails;
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Összes termék' },
    { id: 'rekesz', name: 'Rekeszek' },
    { id: 'kontener', name: 'Konténerek' }
  ];

  const products: Product[] = [
    {
      name: "M30 rekesz",
      description: "Méretek: 600 x 400 x 300 mm\nSúly: 2,2kg\nTeherbírás: 30kg",
      image: "/img/portfolio1.jpg",
      category: "rekesz",
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
      category: "rekesz",
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
      category: "rekesz",
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
      category: "rekesz",
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
      category: "kontener",
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
      category: "kontener",
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
      category: "kontener",
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

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

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
    <main className="min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.02, x: -4 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
          >
            <svg
              className="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Vissza a főoldalra
          </motion.a>
        </motion.div>

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

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-xl p-1">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 cursor-pointer backdrop-blur-sm"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-400 text-sm">
                    <FaRuler className="w-4 h-4 text-blue-400 mr-2" />
                    {product.details.dimensions}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <FaWeight className="w-4 h-4 text-blue-400 mr-2" />
                    {product.details.weight}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <FaBoxes className="w-4 h-4 text-blue-400 mr-2" />
                    {product.details.capacity}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg font-medium transition-colors border border-blue-500/20 hover:border-blue-500/30"
                >
                  Részletek
                </motion.button>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl bg-white/10 rounded-2xl overflow-hidden backdrop-blur-xl border border-white/20 my-4"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  setSelectedProduct(null);
                }}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
              >
                <IoClose className="w-6 h-6" />
              </motion.button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6 md:p-8">
                <div className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-xl overflow-hidden">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{selectedProduct.name}</h3>
                    <div className="h-1 w-20 bg-blue-500 rounded-full mb-4 sm:mb-6"></div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <FaRuler className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Méretek</div>
                        <div className="text-white">{selectedProduct.details.dimensions}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <FaWeight className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Súly</div>
                        <div className="text-white">{selectedProduct.details.weight}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <FaBoxes className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Teherbírás</div>
                        <div className="text-white">{selectedProduct.details.capacity}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 sm:mb-4">Jellemzők</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {selectedProduct.details.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-gray-300 bg-white/5 rounded-lg p-2 sm:p-3 text-sm"
                        >
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-colors hover:from-blue-600 hover:to-blue-700 text-sm sm:text-base"
                      onClick={() => {
                        setSelectedProduct(null);
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Árajánlatot kérek
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/10 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium border border-white/20 hover:bg-white/20 transition-colors text-sm sm:text-base"
                      onClick={() => setSelectedProduct(null)}
                    >
                      Bezárás
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
} 