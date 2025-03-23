'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Scene from '@/components/Scene';

const Products = () => {
  return (
    <section id="products" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content - Show first on mobile */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Fedezze fel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">innovatív</span> termékeinket
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Prémium minőségű műanyag rekeszeink és konténereink tökéletes megoldást nyújtanak minden logisztikai kihívásra.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/termekek"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium transition-all duration-300 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-1 text-sm sm:text-base"
                >
                  További termékeink
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-medium border border-white/20 transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 text-sm sm:text-base"
                >
                  Kapcsolatfelvétel
                </button>
              </div>

              {/* Feature badges */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-12">
                {[
                  { label: 'Teherbírás', value: '30 kg' },
                  { label: 'Rakásolható', value: '300 kg' },
                  { label: 'Élettartam', value: '10+ év' },
                  { label: 'UV-álló', value: '100%' },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 sm:p-4 text-center"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-blue-400">{feature.value}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{feature.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 3D Model Display */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-sm order-2 lg:order-1">
            <div className="absolute inset-0">
              <Scene />
            </div>
            {/* Floating badges */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
              <span className="text-white/80 text-xs sm:text-sm">360° Forgatható</span>
            </div>
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-gradient-to-r from-blue-500 to-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
              <span className="text-white text-xs sm:text-sm font-medium">M30</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products; 