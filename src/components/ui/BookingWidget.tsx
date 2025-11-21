'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Home, ChevronDown, ChevronUp, Phone, X, PawPrint, Minus, Plus } from 'lucide-react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import 'react-day-picker/style.css';
import Button from './Button';
import { accommodations } from '@/data/accommodations';
import { useLocale } from 'next-intl';
import { useBookingPrice } from '@/hooks/useBookingPrice';
import { useClickOutside } from '@/hooks/useClickOutside';
import { isWeekend, isHighSeason } from '@/lib/pricing/dateUtils';

export default function BookingWidget() {
  const t = useTranslations('booking');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(true)
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(2);
  const [pets, setPets] = useState(0);
  const [selectedAccommodation, setSelectedAccommodation] = useState(accommodations[0].id);
  
  // Ref for datepicker to detect outside clicks
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Get date-fns locale based on current locale
  const dateLocale = locale === 'es' ? es : enUS;
  
  // Close datepicker when clicking outside
  useClickOutside(datePickerRef, () => setShowDatePicker(false), showDatePicker);

  // Show widget after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight - 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get selected accommodation
  const selectedAccommodationData = accommodations.find(a => a.id === selectedAccommodation);

  // Use pricing hook
  const { priceBreakdown, totalNights, isValid } = useBookingPrice(
    selectedAccommodationData,
    dateRange,
    pets
  );
  
  // Reset guests if they exceed the new accommodation's capacity
  useEffect(() => {
    if (selectedAccommodationData && guests > selectedAccommodationData.capacity) {
      setGuests(selectedAccommodationData.capacity);
    }
  }, [selectedAccommodation, selectedAccommodationData, guests]);

  const handleBooking = () => {
    if (!priceBreakdown || !selectedAccommodationData) return;
    
    const checkIn = dateRange?.from ? format(dateRange.from, 'dd/MM/yyyy') : '';
    const checkOut = dateRange?.to ? format(dateRange.to, 'dd/MM/yyyy') : '';
    
    const message = encodeURIComponent(
      t('whatsappMessage', {
        accommodation: selectedAccommodationData.title || '',
        checkIn,
        checkOut,
        guests: guests.toString(),
        pets: pets.toString(),
        nights: totalNights.toString(),
        totalPrice: priceBreakdown.total.toString()
      })
    );
    window.open(`https://wa.me/34681315149?text=${message}`, '_blank');
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen)
  }

  const formatDateRange = () => {
    if (!dateRange?.from) return t('selectDateRange');
    if (!dateRange?.to) return format(dateRange.from, 'dd MMM', { locale: dateLocale });
    return `${format(dateRange.from, 'dd MMM', { locale: dateLocale })} - ${format(dateRange.to, 'dd MMM', { locale: dateLocale })}`;
  };
  
  // Modifiers for visual price indicators
  const modifiers = {
    weekend: (date: Date) => isWeekend(date) && !isHighSeason(date),
    highSeason: (date: Date) => isHighSeason(date),
  };
  
  const modifiersClassNames = {
    weekend: 'rdp-day_weekend',
    highSeason: 'rdp-day_highseason',
  };

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

            {/* Date Range Picker */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-earth-700 mb-2">
                <Calendar className="w-4 h-4" />
                {t('checkIn')} - {t('checkOut')}
              </label>
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent transition-all text-left"
              >
                {formatDateRange()}
              </button>
              
              {showDatePicker && (
                <motion.div
                  ref={datePickerRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-4 border border-earth-200 rounded-lg bg-white shadow-lg"
                >
                  <DayPicker
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    disabled={{ before: new Date() }}
                    locale={dateLocale}
                    className="booking-datepicker"
                    modifiers={modifiers}
                    modifiersClassNames={modifiersClassNames}
                  />
                  
                  {/* Price legend */}
                  <div className="mt-3 pt-3 border-t border-earth-200 flex flex-wrap gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-white border border-earth-300"></div>
                      <span className="text-earth-600">{t('priceIndicator.weekday')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-accent-100 border border-accent-300"></div>
                      <span className="text-earth-600">{t('priceIndicator.weekend')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-nature-100 border border-nature-300"></div>
                      <span className="text-earth-600">{t('priceIndicator.highSeason')}</span>
                    </div>
                  </div>
                </motion.div>
              )}
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
                {Array.from({ length: selectedAccommodationData?.capacity || 6 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {t(num === 1 ? 'guest' : 'guestsPlural')}
                  </option>
                ))}
              </select>
            </div>

            {/* Pets */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-earth-700 mb-2">
                <PawPrint className="w-4 h-4" />
                {t('pets')}
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPets(Math.max(0, pets - 1))}
                  disabled={pets === 0}
                  className="p-2 border border-earth-200 rounded-lg hover:bg-earth-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 px-4 py-3 border border-earth-200 rounded-lg text-center font-medium">
                  {pets} {t(pets === 1 ? 'pet' : 'petsPlural')}
                </div>
                <button
                  onClick={() => setPets(Math.min(4, pets + 1))}
                  disabled={pets === 4}
                  className="p-2 border border-earth-200 rounded-lg hover:bg-earth-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price Summary */}
            {totalNights > 0 && priceBreakdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-earth-50 rounded-lg p-4 border border-earth-100 space-y-2"
              >
                {/* Nights breakdown */}
                {priceBreakdown.nightsBreakdown.weekday.count > 0 && (
                  <div className="flex justify-between text-sm text-earth-600">
                    <span>{priceBreakdown.nightsBreakdown.weekday.count} {t('weekdayNights')} × €{priceBreakdown.nightsBreakdown.weekday.pricePerNight}</span>
                    <span>€{priceBreakdown.nightsBreakdown.weekday.total}</span>
                  </div>
                )}
                {priceBreakdown.nightsBreakdown.weekend.count > 0 && (
                  <div className="flex justify-between text-sm text-earth-600">
                    <span>{priceBreakdown.nightsBreakdown.weekend.count} {t('weekendNights')} × €{priceBreakdown.nightsBreakdown.weekend.pricePerNight}</span>
                    <span>€{priceBreakdown.nightsBreakdown.weekend.total}</span>
                  </div>
                )}
                {priceBreakdown.nightsBreakdown.highSeason.count > 0 && (
                  <div className="flex justify-between text-sm text-earth-600">
                    <span>{priceBreakdown.nightsBreakdown.highSeason.count} {t('highSeasonNights')} × €{priceBreakdown.nightsBreakdown.highSeason.pricePerNight}</span>
                    <span>€{priceBreakdown.nightsBreakdown.highSeason.total}</span>
                  </div>
                )}
                
                {/* Pets fee */}
                {pets > 0 && (
                  <div className="flex justify-between text-sm text-earth-600">
                    <span>{pets} {t('petsFee')}</span>
                    <span>€{priceBreakdown.petsTotal}</span>
                  </div>
                )}
                
                {/* Cleaning fee */}
                <div className="flex justify-between text-sm text-earth-600">
                  <span>{t('cleaningFee')}</span>
                  <span>€{priceBreakdown.cleaningFee}</span>
                </div>
                
                {/* Total */}
                <div className="flex justify-between font-bold text-nature-700 text-lg pt-2 border-t border-earth-200">
                  <span>{t('total')}</span>
                  <span>€{priceBreakdown.total}</span>
                </div>
              </motion.div>
            )}

            {/* Book Button */}
            <Button
              onClick={handleBooking}
              disabled={!dateRange?.from || !dateRange?.to || totalNights <= 0}
              className="w-full"
              size="lg"
            >
              {totalNights > 0 ? `${t('bookNow')} - €${priceBreakdown?.total || 0}` : t('selectDates')}
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
                {totalNights > 0 && (
                  <p className="text-sm text-earth-600">
                    {totalNights} {t('nights', { count: totalNights })} · €{priceBreakdown?.total || 0}
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

                  {/* Date Range Picker Mobile */}
                  <div>
                    <label className="text-xs font-medium text-earth-600 mb-1 block">
                      {t('checkIn')} - {t('checkOut')}
                    </label>
                    <button
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="w-full px-3 py-3 border border-earth-200 rounded-lg text-sm text-left"
                    >
                      {formatDateRange()}
                    </button>
                    
                    {showDatePicker && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 p-2 border border-earth-200 rounded-lg bg-white"
                      >
                        <DayPicker
                          mode="range"
                          selected={dateRange}
                          onSelect={setDateRange}
                          disabled={{ before: new Date() }}
                          locale={dateLocale}
                          className="booking-datepicker text-sm"
                        />
                      </motion.div>
                    )}
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

                  {/* Pets Mobile */}
                  <div>
                    <label className="text-xs font-medium text-earth-600 mb-1 block">
                      {t('pets')}
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPets(Math.max(0, pets - 1))}
                        disabled={pets === 0}
                        className="p-2 border border-earth-200 rounded-lg hover:bg-earth-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="flex-1 px-3 py-3 border border-earth-200 rounded-lg text-center text-sm font-medium">
                        {pets} {t(pets === 1 ? 'pet' : 'petsPlural')}
                      </div>
                      <button
                        onClick={() => setPets(Math.min(4, pets + 1))}
                        disabled={pets === 4}
                        className="p-2 border border-earth-200 rounded-lg hover:bg-earth-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button
                    onClick={handleBooking}
                    disabled={!dateRange?.from || !dateRange?.to || totalNights <= 0}
                    className="w-full"
                    size="lg"
                  >
                    {totalNights > 0 ? `${t('book')} - €${priceBreakdown?.total || 0}` : t('selectDates')}
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
