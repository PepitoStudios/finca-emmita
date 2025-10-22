'use client';

import { useTranslations } from 'next-intl';
import { Phone, Mail, Instagram, Facebook, MapPin } from 'lucide-react';
import { siteContent } from '@/data/content';

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="bg-earth-800 text-earth-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {t('footer.accommodations')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#hero');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState(null, '', '#hero');
                    }
                  }}
                  className="hover:text-nature-300 transition-colors text-sm"
                >
                  {t('navigation.home')}
                </a>
              </li>
              <li>
                <a
                  href="#accommodations"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#accommodations');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState(null, '', '#accommodations');
                    }
                  }}
                  className="hover:text-nature-300 transition-colors text-sm"
                >
                  {t('navigation.accommodations')}
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#location');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState(null, '', '#location');
                    }
                  }}
                  className="hover:text-nature-300 transition-colors text-sm"
                >
                  {t('navigation.location')}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState(null, '', '#contact');
                    }
                  }}
                  className="hover:text-nature-300 transition-colors text-sm"
                >
                  {t('navigation.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.about')}</h3>
            <p className="text-sm mb-4">
              {t('footer.aboutText')}
            </p>
            <p className="text-sm">
              {t('footer.location', {
                distance: siteContent.location.distances.elPerello,
                seaDistance: siteContent.location.distances.sea
              })}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a
                  href={`tel:${siteContent.contact.phone}`}
                  className="hover:text-nature-300 transition-colors"
                >
                  {siteContent.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a
                  href={`mailto:${siteContent.contact.email}`}
                  className="hover:text-nature-300 transition-colors"
                >
                  {siteContent.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                <span>{siteContent.location.region}</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-3">{t('footer.followUs')}</p>
              <div className="flex gap-3">
                <a
                  href={siteContent.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-earth-700 rounded-full hover:bg-nature-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={siteContent.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-earth-700 rounded-full hover:bg-nature-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-earth-700">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-4">
            <p className="text-sm text-earth-300">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="text-sm text-earth-300 md:text-right">
              <p className="mb-1 md:mb-0">
                {t('footer.touristLicense')}:
              </p>
              <p className="text-xs md:text-sm break-all md:break-normal">
                {siteContent.touristLicense}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
