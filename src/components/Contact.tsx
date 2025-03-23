'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBuilding, FaIdCard } from 'react-icons/fa';

export default function Contact() {
  const [formType, setFormType] = useState<'contact' | 'quote'>('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    product: '',
    quantity: '',
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
      setFormData({ name: '', email: '', phone: '', message: '', product: '', quantity: '' });
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
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4"
          >
            Lépjen kapcsolatba <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">velünk!</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400"
          >
            Kérjen árajánlatot még ma!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Elérhetőségek */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 lg:min-h-[600px] hover:border-blue-500/50 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Elérhetőségeink
            </h3>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Cím</h4>
                  <p className="text-gray-400">
                    1234 Budapest,<br />
                    Példa utca 123.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Telefon</h4>
                  <p className="text-gray-400">+36 (1) 123-4567</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">✉️</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Email</h4>
                  <p className="text-gray-400">info@jetpack.hu</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-start space-x-4"
              >
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <label className="block text-sm font-medium mb-2">Név</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-0 transition-all duration-300"
                    placeholder="Az Ön neve"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-0 transition-all duration-300"
                    placeholder="pelda@email.com"
                  />
                </motion.div>
              </div>

              {formType === 'quote' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">Termék típusa</label>
                    <select
                      name="productType"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 focus:ring-0 transition-all duration-300"
                    >
                      <option value="">Válasszon terméket</option>
                      <option value="rekesz">Műanyag rekesz</option>
                      <option value="lada">Műanyag láda</option>
                      <option value="egyeb">Egyéb termék</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mennyiség</label>
                    <input
                      type="number"
                      name="quantity"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-0 transition-all duration-300"
                      placeholder="Mennyiség (db)"
                    />
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label className="block text-sm font-medium mb-2">Üzenet</label>
                <textarea
                  name="message"
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-0 transition-all duration-300"
                  placeholder={formType === 'quote' ? 'Részletek az árajánlatkéréshez...' : 'Az Ön üzenete...'}
                ></textarea>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-end"
              >
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
                >
                  {formType === 'quote' ? 'Árajánlat kérése' : 'Üzenet küldése'} →
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
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
      </div>
    </section>
  );
}