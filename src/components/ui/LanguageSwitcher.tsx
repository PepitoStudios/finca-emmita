'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Locale } from '@/i18n/config';
import { setLocale } from '@/i18n/locale';
import { cn } from '@/lib/utils/cn';

const languages = [
  { code: 'es' as Locale, name: 'Español', flag: '🇪🇸' },
  { code: 'en' as Locale, name: 'English', flag: '🇬🇧' },
  { code: 'fr' as Locale, name: 'Français', flag: '🇫🇷' },
];

export default function LanguageSwitcher({ 
  isMobile = false, 
  isScrolled = false 
}: { 
  isMobile?: boolean;
  isScrolled?: boolean;
}) {
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const switchLanguage = (newLocale: Locale) => {
    setIsOpen(false);
    startTransition(async () => {
      await setLocale(newLocale);
      router.refresh(); // Refresh to apply new locale
    });
  };

  if (isMobile) {
    return (
      <div className="flex items-center justify-center gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            disabled={isPending}
            className={cn(
              'relative flex items-center justify-center w-12 h-12 rounded-xl transition-all active:scale-95 disabled:opacity-50',
              lang.code === locale
                ? 'bg-nature-200 shadow-md scale-110'
                : 'bg-white hover:bg-earth-50 border-2 border-earth-200 hover:border-nature-300'
            )}
            aria-label={`Switch to ${lang.name}`}
            title={lang.name}
          >
            <span className={cn(
              'transition-all',
              lang.code === locale ? 'text-3xl' : 'text-2xl'
            )}>
              {lang.flag}
            </span>
            {isPending && lang.code !== locale && (
              <span className="absolute -top-1 -right-1 text-xs animate-spin">⏳</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Desktop version
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg flex items-center gap-2',
          isScrolled
            ? 'text-earth-700 hover:text-nature-600 hover:bg-earth-50'
            : 'text-white hover:text-earth-100 hover:bg-white/10'
        )}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span>{currentLanguage.code.toUpperCase()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-earth-100 overflow-hidden z-50"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  disabled={isPending}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors disabled:opacity-50 ${
                    lang.code === locale
                      ? 'bg-nature-50 text-nature-700'
                      : 'hover:bg-earth-50 text-earth-700'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  {lang.code === locale && (
                    <svg
                      className="w-4 h-4 ml-auto text-nature-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {isPending && lang.code !== locale && (
                    <span className="ml-auto animate-spin text-sm">⏳</span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
