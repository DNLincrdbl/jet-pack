'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Mindig true, nem lehet kikapcsolni
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Ellenőrizzük, hogy már döntött-e a cookie-król
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Ha még nem döntött, megjelenítjük a bannert
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });
    localStorage.setItem('cookieConsent', 'all');
    setShowConsent(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowConsent(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
    localStorage.setItem('cookieConsent', 'necessary');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.2 }}
          className="fixed bottom-0 left-0 right-0 bg-[#0B0B1E]/95 backdrop-blur-xl border-t border-white/10 p-4 sm:p-6 z-50"
        >
          <div className="max-w-7xl mx-auto">
            {!showSettings ? (
              // Alap cookie banner
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-white/90 text-sm sm:text-base">
                    Az oldal cookie-kat használ a felhasználói élmény javítása érdekében. 
                    <button 
                      onClick={() => setShowSettings(true)}
                      className="text-blue-400 hover:text-blue-300 underline ml-1 transition-colors"
                    >
                      Cookie beállítások
                    </button>
                  </p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRejectAll}
                    className="flex-1 sm:flex-initial px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm transition-colors"
                  >
                    Elutasítom
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAcceptAll}
                    className="flex-1 sm:flex-initial px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl text-sm transition-all"
                  >
                    Elfogadom
                  </motion.button>
                </div>
              </div>
            ) : (
              // Részletes cookie beállítások
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Cookie Beállítások</h3>
                  <p className="text-gray-300 text-sm">
                    Az alábbiakban testreszabhatja, hogy milyen típusú cookie-kat engedélyez az oldalon.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Szükséges cookie-k */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <h4 className="text-white font-medium">Szükséges cookie-k</h4>
                      <p className="text-sm text-gray-400">Ezek a cookie-k szükségesek a weboldal működéséhez.</p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                        className="appearance-none w-12 h-6 bg-white/20 rounded-full checked:bg-blue-500 transition-colors duration-300 cursor-not-allowed"
                      />
                      <div className="absolute inset-0 flex items-center pointer-events-none">
                        <motion.div 
                          initial={false}
                          animate={{ x: preferences.necessary ? 24 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="w-5 h-5 rounded-full bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Analitikai cookie-k */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <h4 className="text-white font-medium">Analitikai cookie-k</h4>
                      <p className="text-sm text-gray-400">Segítenek megérteni, hogyan használják a látogatók a weboldalt.</p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                        className="appearance-none w-12 h-6 bg-white/20 rounded-full checked:bg-blue-500 transition-colors duration-300 cursor-pointer"
                      />
                      <div className="absolute inset-0 flex items-center pointer-events-none">
                        <motion.div 
                          initial={false}
                          animate={{ x: preferences.analytics ? 24 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="w-5 h-5 rounded-full bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Marketing cookie-k */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <h4 className="text-white font-medium">Marketing cookie-k</h4>
                      <p className="text-sm text-gray-400">Személyre szabott hirdetések megjelenítéséhez használjuk.</p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                        className="appearance-none w-12 h-6 bg-white/20 rounded-full checked:bg-blue-500 transition-colors duration-300 cursor-pointer"
                      />
                      <div className="absolute inset-0 flex items-center pointer-events-none">
                        <motion.div 
                          initial={false}
                          animate={{ x: preferences.marketing ? 24 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="w-5 h-5 rounded-full bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowSettings(false)}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm transition-colors"
                  >
                    Vissza
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSavePreferences}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl text-sm transition-all"
                  >
                    Beállítások mentése
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent; 