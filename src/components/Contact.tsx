'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBuilding, FaIdCard } from 'react-icons/fa';

export default function Contact() {
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

  const [formType, setFormType] = useState<'contact' | 'quote'>('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    product: '',
    quantity: '',
    very_secret: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.details || 'Hiba történt az üzenet küldése során');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', product: '', quantity: '', very_secret: '' });
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Hiba történt az üzenet küldése során. Kérjük próbálja újra később.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_110%)] opacity-20" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12 opacity-0"
        >
          <div className="text-center">
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold mb-4"
            >
              Lépjen kapcsolatba <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">velünk!</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-400"
            >
              Kérjen árajánlatot még ma!
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Elérhetőségek */}
            <motion.div
              variants={itemVariants}
              className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 lg:min-h-[600px] hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Elérhetőségeink
              </h3>
              <div className="space-y-6">
                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Cím</h4>
                    <p className="text-gray-400">
                      6787 Zákányszék,<br />
                      Külterület 419.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Telefon</h4>
                    <p className="text-gray-400">+36 70 422 5834</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Email</h4>
                    <p className="text-gray-400">muanyagrekesz@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Nyitvatartás</h4>
                    <p className="text-gray-400">
                      H-P: 8:00 - 16:00<br />
                      Szo-V: Zárva
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-8">
                <button
                  onClick={() => setFormType('contact')}
                  className={`flex-1 py-3 px-6 rounded-xl text-center transition-all duration-300 ${
                    formType === 'contact'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Kapcsolatfelvétel
                </button>
                <button
                  onClick={() => setFormType('quote')}
                  className={`flex-1 py-3 px-6 rounded-xl text-center transition-all duration-300 ${
                    formType === 'quote'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Árajánlatkérés
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    variants={itemVariants}
                  >
                    <label className="block text-sm font-medium mb-2">Név</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-0 transition-all duration-300"
                      placeholder="Az Ön neve"
                    />
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                  >
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-0 transition-all duration-300"
                      placeholder="pelda@email.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  variants={itemVariants}
                >
                  <label className="block text-sm font-medium mb-2">Telefonszám</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-0 transition-all duration-300"
                    placeholder="+36 (xx) xxx-xxxx"
                  />
                </motion.div>

                {formType === 'quote' && (
                  <>
                    <motion.div
                      variants={itemVariants}
                    >
                      <label className="block text-sm font-medium mb-2">Válasszon terméket</label>
                      <select
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-0 transition-all duration-300"
                      >
                        <option value="">Válasszon terméket</option>
                        <option value="M30 rekesz">M30 rekesz (600 x 400 x 300 mm)</option>
                        <option value="M5 rekesz">M5 rekesz (600 x 400 x 100 mm)</option>
                        <option value="Export egyutas rekesz">Export egyutas rekesz (400 x 300 x 150 mm)</option>
                        <option value="M10 rekesz">M10 rekesz (600 x 400 x 150 mm)</option>
                        <option value="Műanyag konténer perforált JET785E">Műanyag konténer perforált JET785E (1000 x 1200 x 785 mm)</option>
                        <option value="Műanyag konténer perforált JET580">Műanyag konténer perforált JET580 (1000 x 1200 x 580 mm)</option>
                        <option value="Műanyag konténer zárt JET785Z">Műanyag konténer zárt JET785Z (1000 x 1200 x 785 mm)</option>
                      </select>
                    </motion.div>
                    <motion.div
                      variants={itemVariants}
                    >
                      <label className="block text-sm font-medium mb-2">Mennyiség (db)</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-0 transition-all duration-300"
                        placeholder="Kívánt mennyiség"
                      />
                    </motion.div>
                  </>
                )}

                <motion.div
                  variants={itemVariants}
                >
                  <label className="block text-sm font-medium mb-2">Üzenet</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-0 transition-all duration-300"
                    placeholder={formType === 'quote' ? 'Részletek az árajánlatkéréshez...' : 'Az Ön üzenete...'}
                  ></textarea>
                </motion.div>

                {/* Honeypot hidden field for bots */}
                <input
                  type="text"
                  name="very_secret"
                  value={formData.very_secret}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                  style={{ display: 'none' }}
                />

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div
                    variants={itemVariants}
                    className="p-6 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 flex items-center space-x-3"
                  >
                    <span className="text-2xl">✓</span>
                    <div className="flex-1">
                      <p className="font-medium">Sikeres küldés!</p>
                      <p className="text-sm opacity-90">Köszönjük megkeresését! Hamarosan felvesszük Önnel a kapcsolatot.</p>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    variants={itemVariants}
                    className="p-6 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 flex items-center space-x-3"
                  >
                    <span className="text-2xl">⚠️</span>
                    <div className="flex-1">
                      <p className="font-medium">Hiba történt!</p>
                      <p className="text-sm opacity-90">{errorMessage}</p>
                    </div>
                  </motion.div>
                )}

                <motion.div
                  variants={itemVariants}
                  className="flex justify-end"
                >
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Küldés...
                      </span>
                    ) : (
                      <>{formType === 'quote' ? 'Árajánlat kérése' : 'Üzenet küldése'} →</>
                    )}
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>

          {/* Google Maps */}
          <motion.div
            variants={itemVariants}
            className="mt-8 bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300 h-[400px] max-w-7xl mx-auto"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2725.227411523837!2d19.882725276772677!3d46.28606077901241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47447d8a1f1c82e5%3A0xc59f69d57040acd0!2sJet%20Fruit%20Kft.%20-%20JetPack%20m%C5%B1anyag%20rekeszek!5e0!3m2!1shu!2shu!4v1710799497811!5m2!1shu!2shu"
              width="100%"
              height="100%"
              style={{ 
                border: 0,
                filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(85%)'
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}