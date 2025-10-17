'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Check, Users, Home, Euro, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const isEven = index % 2 === 0;
  const imageAnimation = isEven ? fadeInLeft : fadeInRight;
  const contentAnimation = isEven ? fadeInRight : fadeInLeft;

  // Get translation key for this accommodation
  const accommodationKey = idToTranslationKey(accommodation.id);

  // Get amenities from translations as an array
  const amenitiesObj = t.raw(`${accommodationKey}.amenities`) as Record<string, string>;
  const amenities = Object.values(amenitiesObj);

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isEven ? '' : 'lg:flex-row-reverse'
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
          {/* Real Image */}
          <img
            src={accommodation.images[0]?.url || '/images/placeholder.jpg'}
            alt={accommodation.images[0]?.alt || accommodation.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

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
          className={`hidden lg:block absolute -z-10 w-72 h-72 bg-gradient-to-br from-nature-100 to-earth-100 rounded-full blur-3xl opacity-60 ${
            isEven ? '-right-20 -bottom-20' : '-left-20 -bottom-20'
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
          <div className="flex justify-between items-center pt-3 border-t border-earth-200">
            <span className="text-earth-600">{t('highSeason')}</span>
            <span className="text-2xl font-bold text-nature-700">
              €{accommodation.pricing.highSeason}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/${accommodation.slug}`} className="flex-1">
            <Button
              size="lg"
              variant="primary"
              className="w-full group"
            >
              {t('learnMore')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="flex-1"
            onClick={() => {
              document.querySelector('body')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('checkAvailability')}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
