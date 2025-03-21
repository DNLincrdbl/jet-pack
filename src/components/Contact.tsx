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
    <section id="contact" className="relative py-20 bg-black/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Lépjen kapcsolatba <span className="text-blue-500">velünk!</span></h2>
          <p className="text-gray-400">Kérjen árajánlatot még ma!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Elérhetőségek */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 lg:min-h-[600px]"
          >
            <h3 className="text-2xl font-semibold mb-6">Elérhetőségeink</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FaPhone size={24} color="#3b82f6" />
                <p>+36 70 422 5834</p>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope size={24} color="#3b82f6" />
                <p>muanyagrekesz@gmail.com</p>
              </div>
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt size={24} color="#3b82f6" />
                <p>6787 Zákányszék, Külterület 419. - előzetes egyeztetés szükséges</p>
              </div>
              <div className="border-t border-white/10 my-4"></div>
              <div className="flex items-center space-x-4">
                <FaBuilding size={24} color="#3b82f6" />
                <div>
                  <p className="font-semibold">Jet Fruit Kft.</p>
                  <p className="text-sm text-gray-400">Székhely: 2600 Vác, Szent László út 10.</p>
                  <p className="text-sm text-gray-400">Telephely: 6787 Zákányszék, Külterület 419.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaIdCard size={24} color="#3b82f6" />
                <div>
                  <p className="text-sm">Adószám: 25165773-2-13</p>
                  <p className="text-sm">Cégjegyzékszám: 13-09-185502</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 lg:min-h-[600px]"
          >
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setFormType('contact')}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  formType === 'contact'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                Kapcsolat
              </button>
              <button
                onClick={() => setFormType('quote')}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  formType === 'quote'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                Árajánlatkérés
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Név"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail cím"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefonszám"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>

              {formType === 'quote' && (
                <>
                  <div>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                    >
                      <option value="">Válasszon terméket</option>
                      <optgroup label="Rekeszek">
                        <option value="M30">M30 rekesz</option>
                        <option value="M5">M5 rekesz</option>
                        <option value="Export">Export egyutas rekesz</option>
                        <option value="M10">M10 rekesz</option>
                        <option value="JET785E">JET785E</option>
                        <option value="JET580">JET580</option>
                        <option value="JET785Z">JET785Z</option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="Mennyiség"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                    />
                  </div>
                </>
              )}

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={formType === 'quote' ? "Megjegyzés" : "Üzenet"}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>

              {status === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500">
                  Köszönjük megkeresését! Hamarosan felvesszük Önnel a kapcsolatot.
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Küldés...' : formType === 'quote' ? 'Árajánlat kérése' : 'Üzenet küldése'}
              </button>
            </form>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 lg:min-h-[600px]"
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
      </div>
    </section>
  );
}