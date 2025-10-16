'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import AccommodationCard from '@/components/ui/AccommodationCard';
import { accommodations } from '@/data/accommodations';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' } as const,
  transition: { duration: 0.6 },
};

export default function AccommodationsShowcase() {
  const t = useTranslations('accommodations');

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.whileInView}
          viewport={fadeInUp.viewport}
          transition={fadeInUp.transition}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-block text-sm font-semibold text-nature-600 tracking-wider uppercase mb-3">
            {t('sectionTitle')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-earth-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-earth-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Accommodations - Alternating Layout */}
        <div className="space-y-24 md:space-y-32">
          {accommodations.map((accommodation, index) => (
            <AccommodationCard
              key={accommodation.id}
              accommodation={accommodation}
              index={index}
            />
          ))}
        </div>

        {/* Comparison CTA */}
        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.whileInView}
          viewport={fadeInUp.viewport}
          transition={fadeInUp.transition}
          className="mt-24 text-center bg-gradient-to-br from-nature-600 to-nature-700 text-white rounded-2xl p-12 shadow-2xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            {t('cantDecide')}
          </h3>
          <p className="text-lg md:text-xl text-nature-100 mb-8 max-w-2xl mx-auto">
            {t('cantDecideText')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+34681315149">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-nature-700 hover:bg-earth-50"
              >
                {t('callEmma')}
              </Button>
            </a>
            <a
              href={`https://wa.me/34681315149?text=${encodeURIComponent(t('whatsappMessage'))}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                {t('whatsappEmma')}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
