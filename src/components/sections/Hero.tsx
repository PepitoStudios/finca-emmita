'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import { ChevronDown, VolumeX, Sparkles, Sprout, PawPrint } from 'lucide-react';
import { useIsMobile } from "@/hooks/useIsMobile";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  images?: string[];
  quickFacts?: string[];
}

export default function Hero({
  title,
  // subtitle is part of the interface but not currently used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  subtitle,
  ctaText,
  ctaLink = '#content',
  backgroundImage = '/images/hero-default.jpg',
  images = [backgroundImage],
  quickFacts = [],
}: HeroProps) {
  const t = useTranslations('hero');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const isMobile = useIsMobile();

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const scrollToContent = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#content');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const quickFactIcons = [Sprout, VolumeX, PawPrint];

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full max-w-full flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image Carousel with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        {images.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentImageIndex === index ? 1 : 0,
              scale: currentImageIndex === index ? 1 : 1.05
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
              style={{ 
                objectPosition: 'center center',
                minHeight: '100vh',
                minWidth: '100%'
              }}
            />
          </motion.div>
        ))}

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </motion.div>

      {/* Quick Facts Badges - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute top-24 right-4 md:right-8 z-20 flex flex-col gap-3"
      >
        {quickFacts.map((fact, index) => {
          const Icon = quickFactIcons[index] || Sparkles;
          return (
            <motion.div
              key={fact}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
              className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
            >
              <Icon className="w-4 h-4 text-nature-600" />
              {!isMobile && (<span className="text-sm font-medium text-earth-800 whitespace-nowrap">
                {fact}
              </span>)}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Carousel Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentImageIndex === index
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-accent-100 text-sm md:text-base font-medium tracking-wider uppercase mb-4"
          >
            {t('overline')}
          </motion.p>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-10xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            {title}
          </h1>

          {/* Subtitle 
          <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {subtitle}
          </p>*/}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="primary"
              onClick={ctaLink === '#content' ? scrollToContent : undefined}
              className="shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {ctaText || t('cta')}
            </Button>
            <a href="tel:+34681315149">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-nature-700 shadow-xl hover:scale-105 transition-all duration-300"
              >
                {t('contactEmma')}
              </Button>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
        }}
        aria-label={t('scrollLabel')}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-wider mb-1 opacity-75 group-hover:opacity-100 transition-opacity">
            {t('scroll')}
          </span>
          <ChevronDown className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </div>
      </motion.button>
    </section>
  );
}
