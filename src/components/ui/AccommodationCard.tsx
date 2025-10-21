'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check, Users, Home, Euro, ArrowRight, ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import type { Accommodation } from '@/lib/types';

interface AccommodationCardProps {
  accommodation: Accommodation;
  index: number;
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' } as const,
  transition: { duration: 0.7 },
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' } as const,
  transition: { duration: 0.7 },
};

// Helper to convert accommodation id to translation key (la-casita -> laCasita)
function idToTranslationKey(id: string): string {
  return id.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export default function AccommodationCard({ accommodation, index }: AccommodationCardProps) {
  const t = useTranslations('accommodations');
  const tCommon = useTranslations('common');
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isEven = index % 2 === 0;
  const imageAnimation = isEven ? fadeInLeft : fadeInRight;
  const contentAnimation = isEven ? fadeInRight : fadeInLeft;

  // Get translation key for this accommodation
  const accommodationKey = idToTranslationKey(accommodation.id);

  // Get amenities from translations as an array
  const amenitiesObj = t.raw(`${accommodationKey}.amenities`) as Record<string, string>;
  const amenities = Object.values(amenitiesObj);

  const previousImage = () => {
    if (currentImageIndex > 0)
      setCurrentImageIndex(currentImageIndex - 1);
    else
      setCurrentImageIndex(accommodation.images.length - 1);
  }

  const nextImage = () => {
    if (currentImageIndex < accommodation.images.length - 1)
      setCurrentImageIndex(currentImageIndex + 1);
    else
      setCurrentImageIndex(0)
  }

  const sendAvailabilityRequest = () => {
    const message = encodeURIComponent(t('whatsappMessage', { casita: t(`${accommodationKey}.title`), guests: accommodation.capacity }));
    window.open(`https://wa.me/34681315149?text=${message}`, '_blank');
  }

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'
        }`}
    >
      {/* Image Side */}
      <motion.div
        initial={imageAnimation.initial}
        whileInView={imageAnimation.whileInView}
        viewport={imageAnimation.viewport}
        transition={imageAnimation.transition}
        className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
          {/* Background Image Carousel */}
          <motion.div
            className="absolute inset-0"
          >
            {accommodation.images.map((image, index) => (
              <motion.div
                key={image.url}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentImageIndex === index ? 1 : 0,
                  scale: currentImageIndex === index ? 1 : 1.1
                }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              />
            ))}
          </motion.div>
          {/* Navigation Arrows */}
          <button
            onClick={previousImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110 z-20"
            aria-label={tCommon('previous')}
          >
            <ChevronLeft className="w-4 h-4 text-earth-700" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110 z-20"
            aria-label={tCommon('next')}
          >
            <ChevronRight className="w-4 h-4 text-earth-700" />
          </button>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

          {/* Quick Info Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <Euro className="w-4 h-4 text-nature-600" />
              <span className="font-bold text-earth-900">
                {t('from')} €{accommodation.pricing.weekday}
              </span>
              <span className="text-earth-600 text-sm">{t('perNight')}</span>
            </div>
          </div>

          {/* Capacity Badge */}
          <div className="absolute bottom-4 left-4 bg-nature-600 text-white rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="font-medium text-sm">
                {t('upTo')} {accommodation.capacity} {t('guests')}
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div
          className={`hidden lg:block absolute -z-10 w-72 h-72 bg-gradient-to-br from-nature-100 to-earth-100 rounded-full blur-3xl opacity-60 ${isEven ? '-right-20 -bottom-20' : '-left-20 -bottom-20'
            }`}
        />
      </motion.div>

      {/* Content Side */}
      <motion.div
        initial={contentAnimation.initial}
        whileInView={contentAnimation.whileInView}
        viewport={contentAnimation.viewport}
        transition={contentAnimation.transition}
        className={`space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
      >
        {/* Title */}
        <div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-earth-900 mb-3">
            {t(`${accommodationKey}.title`)}
          </h3>
          <p className="text-lg md:text-xl text-earth-600 leading-relaxed">
            {t(`${accommodationKey}.shortDescription`)}
          </p>
        </div>

        {/* Key Stats */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-earth-50 px-4 py-2 rounded-lg">
            <Home className="w-5 h-5 text-nature-600" />
            <span className="text-earth-700 font-medium">
              {accommodation.size}m² {t('space')}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-earth-50 px-4 py-2 rounded-lg">
            <Users className="w-5 h-5 text-nature-600" />
            <span className="text-earth-700 font-medium">
              {t('upTo')} {accommodation.capacity} {t('guestsCapital')}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-earth-600 leading-relaxed">
          {t(`${accommodationKey}.longDescription`)}
        </p>

        {/* Amenities */}
        <div>
          <h4 className="text-sm font-semibold text-earth-800 uppercase tracking-wider mb-3">
            {t('keyFeatures')}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(showAllAmenities ? amenities : amenities.slice(0, 6)).map((amenity, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-nature-600 flex-shrink-0 mt-0.5" />
                <span className="text-earth-700 text-sm">{amenity}</span>
              </div>
            ))}
          </div>
          {amenities.length > 6 && (
            <button
              onClick={() => setShowAllAmenities(!showAllAmenities)}
              className="flex items-center gap-2 text-sm text-nature-600 hover:text-nature-700 font-medium mt-3 transition-colors"
            >
              {showAllAmenities ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>{t('showLess')}</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>+ {amenities.length - 6} {t('moreFeatures')}</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Pricing Summary */}
        <div className="bg-gradient-to-br from-earth-50 to-nature-50 rounded-xl p-6 border border-earth-100">
          <div className="flex justify-between items-center mb-3">
            <span className="text-earth-600">{t('weekday')}</span>
            <span className="text-2xl font-bold text-earth-900">
              €{accommodation.pricing.weekday}
            </span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-earth-600">{t('weekend')}</span>
            <span className="text-2xl font-bold text-earth-900">
              €{accommodation.pricing.weekend}
            </span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-earth-600">{t('highSeason')}</span>
            <span className="text-2xl font-bold text-nature-700">
              €{accommodation.pricing.highSeason}
            </span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-earth-200">
            <span className="text-earth-600">{t('cleaning')}</span>
            <span className="text-2xl font-bold text-earth-900">
              €{accommodation.pricing.cleaning}
            </span>
          </div>
          <div className="flex justify-between items-center pt-3">
            <span className="text-earth-600">{t('pets')}</span>
            <span className="text-2xl font-bold text-earth-900">
              €{accommodation.pricing.pets}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            variant="primary"
            className="flex-1"
            onClick={() =>
              sendAvailabilityRequest()
            }
          >
            {t('checkAvailability')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
