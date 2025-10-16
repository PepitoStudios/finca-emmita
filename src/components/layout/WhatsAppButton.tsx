'use client';

import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('whatsapp');
  const phoneNumber = '34681315149';
  const message = encodeURIComponent(t('defaultMessage'));
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20BA5A] transition-all duration-300 hover:scale-110 group"
      aria-label={t('ariaLabel')}
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {t('tooltip')}
      </span>
      <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
    </a>
  );
}
