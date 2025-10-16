'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MapPin, Car, Waves, ShoppingBag, Mountain, Utensils, Compass } from 'lucide-react';
import { siteContent } from '@/data/content';

export default function LocationSection() {
  const t = useTranslations('location');

  const nearbyPlaces = [
    {
      name: t('elPerello'),
      distance: t('minutesDrive', { minutes: '10' }),
      icon: ShoppingBag,
      description: t('elPerelloDesc'),
      color: 'text-nature-600',
      bg: 'bg-nature-100',
    },
    {
      name: t('theSea'),
      distance: t('minutesDrive', { minutes: '20' }),
      icon: Waves,
      description: t('theSeaDesc'),
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      name: t('mountains'),
      distance: t('minutesWalk', { minutes: '5' }),
      icon: Mountain,
      description: t('mountainsDesc'),
      color: 'text-earth-600',
      bg: 'bg-earth-100',
    },
    {
      name: t('restaurants'),
      distance: '10-15 ' + t('minutesDrive', { minutes: '' }).toLowerCase(),
      icon: Utensils,
      description: t('restaurantsDesc'),
      color: 'text-accent-600',
      bg: 'bg-accent-100',
    },
  ];

  const directions = [
    {
      from: 'Barcelona',
      time: '2 hours',
      icon: Car,
    },
    {
      from: 'Valencia',
      time: '1.5 hours',
      icon: Car,
    },
    {
      from: 'Tarragona',
      time: '45 minutes',
      icon: Car,
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-sage-50 via-earth-25 to-nature-25">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-nature-600 tracking-wider uppercase mb-3">
            {t('sectionTitle')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-earth-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-earth-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
              {/* Map Container */}
              <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] bg-gradient-to-br from-earth-100 to-nature-100">
                {/* Map Placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 mb-4 rounded-full bg-nature-600 flex items-center justify-center">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-earth-900 mb-2">
                    Finca Emmita
                  </h3>
                  <p className="text-earth-600 mb-4">
                    {siteContent.location.region}
                  </p>
                  <p className="text-sm text-earth-500 max-w-xs">
                    {t('subtitle')}
                  </p>
                </div>

                {/* Distance Markers */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Compass className="w-4 h-4 text-nature-600" />
                    <span className="font-medium text-earth-800">{t('sectionTitle')}</span>
                  </div>
                  <p className="text-xs text-earth-600 mt-1">
                    {t('elPerello')}, Tarragona
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Nearby Places */}
            <div>
              <h3 className="text-2xl font-bold text-earth-900 mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-nature-600" />
                {t('whatsNearby')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nearbyPlaces.map((place, index) => {
                  const Icon = place.icon;
                  return (
                    <motion.div
                      key={place.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 ${place.bg} rounded-lg flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${place.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-earth-900 mb-1">
                            {place.name}
                          </h4>
                          <p className="text-sm text-nature-600 font-medium mb-1">
                            {place.distance}
                          </p>
                          <p className="text-xs text-earth-600">
                            {place.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* How to Get Here */}
            <div>
              <h3 className="text-2xl font-bold text-earth-900 mb-6 flex items-center gap-3">
                <Car className="w-6 h-6 text-nature-600" />
                {t('howToGetHere')}
              </h3>

              <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
                {directions.map((direction, index) => {
                  const Icon = direction.icon;
                  return (
                    <motion.div
                      key={direction.from}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between py-3 border-b border-earth-100 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-nature-600" />
                        <span className="font-medium text-earth-800">
                          {t('fromCity', { city: direction.from })}
                        </span>
                      </div>
                      <span className="text-nature-600 font-semibold">
                        {direction.time}
                      </span>
                    </motion.div>
                  );
                })}

                <div className="mt-6 pt-4 border-t border-earth-200">
                  <p className="text-sm text-earth-600 mb-3">
                    {t('gettingHere')}
                  </p>
                  <p className="text-xs text-earth-500">
                    {t('publicTransport')}
                  </p>
                </div>
              </div>
            </div>

            {/* Special Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-nature-600 to-nature-700 text-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-lg flex-shrink-0">
                  <Mountain className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">
                    {t('offGridNote')}
                  </h4>
                  <p className="text-nature-50 text-sm leading-relaxed">
                    {t('offGridDescription')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
