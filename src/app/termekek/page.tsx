'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
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
  isNew?: boolean;
  isPopular?: boolean;
}

const preloadImage = (src: string): Promise<void> => {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
};

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

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
      isPopular: true,
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
      isNew: true,
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

  // Helper function to get next/previous product
  const getAdjacentProduct = (direction: 'next' | 'prev') => {
    if (!selectedProduct) return null;
    const currentIndex = filteredProducts.findIndex(p => p.name === selectedProduct.name);
    if (direction === 'next') {
      return filteredProducts[currentIndex + 1] || filteredProducts[0];
    }
    return filteredProducts[currentIndex - 1] || filteredProducts[filteredProducts.length - 1];
  };

  // Helper function to toggle product comparison
  const toggleCompare = (product: Product) => {
    setCompareProducts(prev => {
      const isAlreadyComparing = prev.some(p => p.name === product.name);
      if (isAlreadyComparing) {
        return prev.filter(p => p.name !== product.name);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, product];
    });
  };

  // Simulate loading for images and optimize initial load
  useEffect(() => {
    const loadImages = async () => {
      // Only preload the first 4 images on mobile
      const imagesToPreload = typeof window !== 'undefined' && window.innerWidth < 768 
        ? products.slice(0, 4) 
        : products;
        
      const imagePromises = imagesToPreload.map(product => preloadImage(product.image));

      await Promise.all(imagePromises);
      setIsLoading(false);
      setIsPageLoaded(true);
    };

    loadImages();

    return () => {
      setIsLoading(true);
      setIsPageLoaded(false);
    };
  }, []);

  // Reduce animation complexity on mobile
  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        // Default to desktop stagger, will be overridden on mobile by useEffect
        staggerChildren: 0.2
      }
    }
  };

  // Add state for mobile animation settings
  const [mobileVariants, setMobileVariants] = useState(containerVariants);

  // Update variants based on window size
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMobileVariants({
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: {
            ...containerVariants.visible.transition,
            staggerChildren: window.innerWidth < 768 ? 0.1 : 0.2
          }
        }
      });
    }
  }, []);

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

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

  // Add useEffect for body scroll lock
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  return (
    <main className="min-h-screen py-24 sm:py-32 relative">
      {/* Simplified background for mobile */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0B0B1E]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        {/* Reduce number of gradient blooms on mobile */}
        <div className="absolute w-[600px] h-[600px] -top-[100px] -right-[100px] bg-blue-500/10 rounded-full blur-[100px] opacity-20" />
        <div className="absolute w-[400px] h-[400px] bottom-[20%] left-[10%] bg-purple-500/10 rounded-full blur-[80px] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative h-[40vh] mb-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6">
              Termékkatalógus
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-gray-300 max-w-2xl mx-auto">
              Fedezze fel prémium minőségű műanyag rekeszeinket és konténereinket, amelyek tökéletes megoldást nyújtanak minden logisztikai kihívásra.
            </motion.p>
          </motion.div>
        </div>

        {/* Back to Home Button */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isPageLoaded ? "visible" : "hidden"}
          className="mb-12 opacity-0"
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
          variants={containerVariants}
          initial="hidden"
          animate={isPageLoaded ? "visible" : "hidden"}
          className="text-center mb-16 opacity-0"
        >
          {/* Removing the background "Termékek" text */}
        </motion.div>

        {/* Category Filter - Moved up */}
        <div className="relative w-full px-2 -mt-8 mb-8">
          <motion.div
            variants={mobileVariants}
            initial="hidden"
            animate={isPageLoaded ? "visible" : "hidden"}
            className="flex justify-center overflow-x-auto scrollbar-hide"
          >
            <div className="bg-white/5 backdrop-blur-sm p-1 rounded-2xl border border-white/10 flex gap-1.5 w-full justify-center">
              {categories.map((category) => {
                const productCount = category.id === 'all' 
                  ? products.length 
                  : products.filter(p => p.category === category.id).length;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`relative group px-2 sm:px-6 py-1.5 sm:py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between space-x-1.5 sm:space-x-2">
                      <span className="text-xs sm:text-base font-medium">{category.name}</span>
                      <span className={`px-1 sm:px-2 py-0.5 rounded-lg text-[10px] sm:text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-gray-400 group-hover:bg-white/10'
                      }`}>
                        {productCount}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isPageLoaded ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 opacity-0"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.name}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 cursor-pointer backdrop-blur-sm"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative h-64 overflow-hidden">
                {isLoading ? (
                  <div className="absolute inset-0 bg-white/5 animate-pulse" />
                ) : (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 6}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      Új
                    </span>
                  )}
                  {product.isPopular && (
                    <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      Népszerű
                    </span>
                  )}
                </div>
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
                <div className="flex gap-2 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg font-medium transition-colors border border-blue-500/20 hover:border-blue-500/30"
                  >
                    Részletek
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      toggleCompare(product);
                    }}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors border ${
                      compareProducts.some(p => p.name === product.name)
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Product Modal */}
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/90 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl bg-white/[0.02] rounded-2xl overflow-y-auto max-h-[90vh] backdrop-blur-xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)]"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              {/* Close button - making it more prominent on mobile */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute top-2 right-2 z-50 bg-black/20 p-2 rounded-full text-white/80 hover:text-white transition-colors"
              >
                <IoClose className="w-6 h-6" />
              </motion.button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
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

        {/* Comparison Modal */}
        {isCompareModalOpen && compareProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center p-4 bg-[#0a0a0a]/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setIsCompareModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#0B0B1E]/95 rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10 p-4 sm:p-6 my-20 shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)]"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCompareModalOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white transition-colors z-10"
              >
                <IoClose className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Termékek összehasonlítása</h2>

              <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr>
                      <th className="text-left p-3 sm:p-4 text-gray-400 font-medium border-b border-white/10 w-[140px]"></th>
                      {compareProducts.map((product) => (
                        <th key={product.name} className="p-3 sm:p-4 border-b border-white/10">
                          <div className="relative w-full aspect-square max-w-[120px] mx-auto mb-3">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-white">{product.name}</h3>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="p-3 sm:p-4 text-gray-400 font-medium">Méretek</td>
                      {compareProducts.map((product) => (
                        <td key={product.name} className="p-3 sm:p-4 text-white text-center text-sm sm:text-base">
                          {product.details.dimensions}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 text-gray-400 font-medium">Súly</td>
                      {compareProducts.map((product) => (
                        <td key={product.name} className="p-3 sm:p-4 text-white text-center text-sm sm:text-base">
                          {product.details.weight}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 text-gray-400 font-medium">Teherbírás</td>
                      {compareProducts.map((product) => (
                        <td key={product.name} className="p-3 sm:p-4 text-white text-center text-sm sm:text-base">
                          {product.details.capacity}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 text-gray-400 font-medium">Jellemzők</td>
                      {compareProducts.map((product) => (
                        <td key={product.name} className="p-3 sm:p-4">
                          <div className="flex flex-col gap-1.5 sm:gap-2">
                            {product.details.features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-white text-xs sm:text-sm bg-white/5 rounded-lg p-2"
                              >
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4"></td>
                      {compareProducts.map((product) => (
                        <td key={product.name} className="p-3 sm:p-4">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 sm:px-4 rounded-lg font-medium text-sm sm:text-base transition-colors hover:from-blue-600 hover:to-blue-700"
                            onClick={() => {
                              setIsCompareModalOpen(false);
                              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            Árajánlatot kérek
                          </motion.button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Comparison Bar */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: compareProducts.length > 0 ? 0 : 100,
            opacity: compareProducts.length > 0 ? 1 : 0
          }}
          transition={{ type: "spring", bounce: 0.2 }}
          className="fixed bottom-0 left-0 right-0 bg-[#0B0B1E]/95 backdrop-blur-xl border-t border-white/10 py-3 px-4 sm:py-4 sm:px-6 z-40"
        >
          <div className="max-w-7xl mx-auto">
            {/* Mobile Layout */}
            <div className="sm:hidden flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-medium">
                  Összehasonlítás ({compareProducts.length}/3)
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCompareProducts([])}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Törlés
                </motion.button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {compareProducts.map((product) => (
                  <div
                    key={product.name}
                    className="relative bg-white/5 rounded-lg p-2 border border-white/10 flex-shrink-0"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded object-cover"
                    />
                    <button
                      onClick={() => toggleCompare(product)}
                      className="absolute -top-2 -right-2 bg-red-500/80 text-white rounded-full p-1 hover:bg-red-600/80 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                onClick={() => setIsCompareModalOpen(true)}
              >
                Összehasonlítás
              </motion.button>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">
                  Összehasonlítás ({compareProducts.length}/3)
                </span>
                <div className="flex gap-2">
                  {compareProducts.map((product) => (
                    <div
                      key={product.name}
                      className="relative bg-white/5 rounded-lg p-2 border border-white/10"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="rounded object-cover"
                      />
                      <button
                        onClick={() => toggleCompare(product)}
                        className="absolute -top-2 -right-2 bg-red-500/80 text-white rounded-full p-1 hover:bg-red-600/80 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCompareProducts([])}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Törlés
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  onClick={() => setIsCompareModalOpen(true)}
                >
                  Összehasonlítás
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

// Add this to your global CSS file
const styles = `
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
`; 