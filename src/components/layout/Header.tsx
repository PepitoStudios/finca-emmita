'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Navigation from './Navigation';
import { cn } from '@/lib/utils/cn';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations('common');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md py-3'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex flex-col">
              <span
                className={cn(
                  'text-sm font-light transition-colors',
                  isScrolled ? 'text-earth-600' : 'text-earth-100'
                )}
              >
                {t('brandSubtitle')}
              </span>
              <span
                className={cn(
                  'text-2xl font-bold transition-colors',
                  isScrolled ? 'text-nature-700' : 'text-white'
                )}
              >
                {t('brandName')}
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <Navigation />
        </div>
      </div>
    </header>
  );
}
