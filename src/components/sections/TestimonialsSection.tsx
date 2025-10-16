'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { featuredTestimonials } from '@/data/testimonials';

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-rotate every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 7000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? featuredTestimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="section-padding bg-gradient-to-br from-earth-50 via-white to-nature-50">
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

        {/* Testimonial Carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 text-nature-100 opacity-50 z-0">
              <Quote className="w-24 h-24" fill="currentColor" />
            </div>

            {/* Carousel Content */}
            <div className="relative min-h-[400px] md:min-h-[350px] flex items-center justify-center p-8 md:p-16">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="relative z-10"
                >
                  {/* Rating Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(featuredTestimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-accent fill-accent"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-center">
                    <p className="text-lg md:text-xl lg:text-2xl text-earth-700 leading-relaxed mb-8 italic">
                      &ldquo;{featuredTestimonials[currentIndex].content}&rdquo;
                    </p>
                    <footer>
                      <cite className="not-italic">
                        <p className="text-xl font-bold text-earth-900 mb-1">
                          {featuredTestimonials[currentIndex].author}
                        </p>
                        <p className="text-sm text-earth-500">
                          {t('via')} {featuredTestimonials[currentIndex].source}
                        </p>
                      </cite>
                    </footer>
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110 z-20"
              aria-label={t('previous')}
            >
              <ChevronLeft className="w-6 h-6 text-earth-700" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110 z-20"
              aria-label={t('next')}
            >
              <ChevronRight className="w-6 h-6 text-earth-700" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 pb-8">
              {featuredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-8 bg-nature-600'
                      : 'w-2.5 bg-earth-300 hover:bg-earth-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          >
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl font-bold text-nature-600 mb-2">5.0</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-sm text-earth-600">{t('averageRating')}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl font-bold text-nature-600 mb-2">100%</div>
              <p className="text-lg font-medium text-earth-700 mb-1">
                {t('guestSatisfaction')}
              </p>
              <p className="text-sm text-earth-600">{t('wouldRecommend')}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl font-bold text-nature-600 mb-2">50+</div>
              <p className="text-lg font-medium text-earth-700 mb-1">
                {t('happyGuests')}
              </p>
              <p className="text-sm text-earth-600">{t('since')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
