'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Home, ChevronDown, ChevronUp, Phone, X } from 'lucide-react';
import Button from './Button';
import { accommodations } from '@/data/accommodations';

export default function BookingWidget() {
  const t = useTranslations('booking');
  const [isOpen, setIsOpen] = useState(true) //NEW
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedAccommodation, setSelectedAccommodation] = useState(accommodations[0].id);

  // Show widget after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight - 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  // Calculate total price (simplified)
  const calculatePrice = () => {
    const nights = calculateNights();
    const accommodation = accommodations.find(a => a.id === selectedAccommodation);
    return nights * (accommodation?.pricing.weekday || 75);
  };

  const nights = calculateNights();
  const totalPrice = calculatePrice();

  const handleBooking = () => {
    const accommodation = accommodations.find(a => a.id === selectedAccommodation);
    const message = encodeURIComponent(
      t('whatsappMessage', {
        accommodation: accommodation?.title || '',
        checkIn,
        checkOut,
        guests: guests.toString(),
        nights: nights.toString(),
        totalPrice: totalPrice.toString()
      })
    );
    window.open(`https://wa.me/34681315149?text=${message}`, '_blank');
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen)
  }

  if (!isVisible) return null;

  if (!isOpen) return (
    <>
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="hidden lg:block fixed top-24 right-6 z-50 p-4 bg-nature-600 rounded-full"
        onClick={ () => toggleWidget() }><Calendar color='white'/>
      </motion.button>
    </>)

  return (
    <>
      {/* Desktop Version - Sticky Sidebar */}
      <motion.div

        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block fixed top-24 right-8 z-40 w-80"
      >
        
        <div className="bg-white rounded-2xl shadow-2xl border border-earth-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-nature-600 to-nature-700 text-white p-6">
            <button className='absolute right-6  z-50' 
        onClick={ () => toggleWidget() }><X /></button>
            <h3 className="text-xl font-bold mb-1">{t('title')}</h3>
            <p className="text-sm text-nature-100">{t('guarantee')}</p>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">
            {/* Accommodation Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-earth-700 mb-2">
                <Home className="w-4 h-4" />
                {t('accommodation')}
              </label>
              <select
                value={selectedAccommodation}
                onChange={(e) => setSelectedAccommodation(e.target.value)}
                className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent transition-all"
              >
                {accommodations.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.title} - {t('from')} €{acc.pricing.weekday}{t('perNight')}
                  </option>
                ))}
              </select>
            </div>

            {/* Check-in */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-earth-700 mb-2">
                <Calendar className="w-4 h-4" />
                {t('checkIn')}
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Check-out */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-earth-700 mb-2">
                <Calendar className="w-4 h-4" />
                {t('checkOut')}
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-earth-700 mb-2">
                <Users className="w-4 h-4" />
                {t('guests')}
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent transition-all"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {t(num === 1 ? 'guest' : 'guestsPlural')}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Summary */}
            {nights > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-earth-50 rounded-lg p-4 border border-earth-100"
              >
                <div className="flex justify-between text-sm text-earth-600 mb-1">
                  <span>€{accommodations.find(a => a.id === selectedAccommodation)?.pricing.weekday} × {nights} {t('nights', { count: nights })}</span>
                  <span>€{totalPrice}</span>
                </div>
                <div className="flex justify-between font-bold text-nature-700 text-lg pt-2 border-t border-earth-200">
                  <span>{t('total')}</span>
                  <span>€{totalPrice}</span>
                </div>
              </motion.div>
            )}

            {/* Book Button */}
            <Button
              onClick={handleBooking}
              disabled={!checkIn || !checkOut || nights <= 0}
              className="w-full"
              size="lg"
            >
              {nights > 0 ? `${t('bookNow')} - €${totalPrice}` : t('selectDates')}
            </Button>

            {/* Contact Alternative */}
            <div className="text-center">
              <p className="text-xs text-earth-500 mb-2">{t('orContact')}</p>
              <a
                href="tel:+34681315149"
                className="inline-flex items-center gap-2 text-sm text-nature-600 hover:text-nature-700 font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                +34 681 315 149
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Version - Bottom Sheet */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', damping: 30 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-earth-100 shadow-2xl"
        >
          {/* Collapsed Header */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between px-4 py-4 hover:bg-earth-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-nature-100 rounded-lg">
                <Calendar className="w-5 h-5 text-nature-700" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-earth-800">{t('title')}</p>
                {nights > 0 && (
                  <p className="text-sm text-earth-600">
                    {nights} {t('nights', { count: nights })} · €{totalPrice}
                  </p>
                )}
              </div>
            </div>
            {isExpanded ? (
              <ChevronDown className="w-6 h-6 text-earth-600" />
            ) : (
              <ChevronUp className="w-6 h-6 text-earth-600" />
            )}
          </button>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-3 max-h-[60vh] overflow-y-auto">
                  {/* Accommodation Selection */}
                  <div>
                    <label className="text-xs font-medium text-earth-600 mb-1 block">
                      {t('accommodation')}
                    </label>
                    <select
                      value={selectedAccommodation}
                      onChange={(e) => setSelectedAccommodation(e.target.value)}
                      className="w-full px-3 py-3 border border-earth-200 rounded-lg text-sm"
                    >
                      {accommodations.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.title} - €{acc.pricing.weekday}{t('perNight')}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-earth-600 mb-1 block">
                        {t('checkIn')}
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-3 border border-earth-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-earth-600 mb-1 block">
                        {t('checkOut')}
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn || new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-3 border border-earth-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="text-xs font-medium text-earth-600 mb-1 block">
                      {t('guests')}
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3 py-3 border border-earth-200 rounded-lg text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {t(num === 1 ? 'guest' : 'guestsPlural')}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Book Button */}
                  <Button
                    onClick={handleBooking}
                    disabled={!checkIn || !checkOut || nights <= 0}
                    className="w-full"
                    size="lg"
                  >
                    {nights > 0 ? `${t('book')} - €${totalPrice}` : t('selectDates')}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
