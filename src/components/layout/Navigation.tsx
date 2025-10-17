'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { siteContent } from '@/data/content';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

interface NavigationProps {
  isScrolled: boolean;
}

export default function Navigation({ isScrolled }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1);
      return hash || 'hero';
    }
    return 'hero';
  });
  const pathname = usePathname();
  const t = useTranslations('navigation');

  const navigationItems = [
    { name: t('home'), href: '#hero' },
    { name: t('accommodations'), href: '#accommodations' },
    { name: t('location'), href: '#location' },
    { name: t('contact'), href: '#contact' },
  ];

  // Smooth scroll handler
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);

      // Focus management for accessibility
      const targetElement = element as HTMLElement;
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus();

      setMobileMenuOpen(false);
    } else if (process.env.NODE_ENV === 'development') {
      console.error(`Section ${href} not found`);
    }
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Intersection Observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="relative z-50">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-center space-x-2">
        {navigationItems.map((item) => {
          const isActive = activeSection === item.href.replace('#', '');
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={cn(
                'relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg',
                isActive
                  ? isScrolled
                    ? 'text-nature-700 bg-nature-50'
                    : 'text-white bg-white/10'
                  : isScrolled
                  ? 'text-earth-700 hover:text-nature-600 hover:bg-earth-50'
                  : 'text-white hover:text-earth-100 hover:bg-white/10'
              )}
            >
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className={cn(
                    'absolute bottom-0 left-0 right-0 h-0.5',
                    isScrolled ? 'bg-nature-600' : 'bg-white'
                  )}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          );
        })}
        <LanguageSwitcher />
      </div>

      {/* Mobile Menu Button - Improved Touch Target */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            'p-3 rounded-xl transition-all active:scale-95',
            isScrolled
              ? 'text-earth-700 hover:bg-earth-50'
              : 'text-white hover:bg-white/10'
          )}
          aria-label={mobileMenuOpen ? t('closeMenu') : t('menu')}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-earth-100">
                <div>
                  <p className="text-sm text-earth-600">{t('menu')}</p>
                  <p className="text-xl font-bold text-nature-700">Finca Emmita</p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 hover:bg-earth-50 rounded-xl transition-colors active:scale-95"
                  aria-label={t('closeMenu')}
                >
                  <X className="w-6 h-6 text-earth-700" />
                </button>
              </div>

              {/* Navigation Links - Large Touch Targets */}
              <div className="flex-1 overflow-y-auto py-6">
                {navigationItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className={cn(
                          'block mx-4 my-2 px-6 py-4 text-lg font-medium rounded-xl transition-all active:scale-98',
                          isActive
                            ? 'bg-nature-50 text-nature-700'
                            : 'text-earth-700 hover:bg-earth-50'
                        )}
                      >
                        {item.name}
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              {/* Contact Info Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="border-t border-earth-100 p-6 space-y-4 bg-earth-50"
              >
                {/* Language Switcher */}
                <div className="pb-4 border-b border-earth-200">
                  <LanguageSwitcher isMobile={true} />
                </div>

                <p className="text-sm font-semibold text-earth-800 uppercase tracking-wider">
                  {t('contactEmma')}
                </p>
                <a
                  href={`tel:${siteContent.contact.phone}`}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-earth-100 transition-colors active:scale-98"
                >
                  <div className="p-2 bg-nature-100 rounded-lg">
                    <Phone className="w-5 h-5 text-nature-600" />
                  </div>
                  <span className="text-earth-700 font-medium">
                    {siteContent.contact.phone}
                  </span>
                </a>
                <a
                  href={`mailto:${siteContent.contact.email}`}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-earth-100 transition-colors active:scale-98"
                >
                  <div className="p-2 bg-nature-100 rounded-lg">
                    <Mail className="w-5 h-5 text-nature-600" />
                  </div>
                  <span className="text-earth-700 font-medium text-sm">
                    {siteContent.contact.email}
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
