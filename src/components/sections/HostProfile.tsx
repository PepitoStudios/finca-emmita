'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MessageCircle, Heart, Leaf, Users, Award } from 'lucide-react';
import Button from '@/components/ui/Button';
import { siteContent } from '@/data/content';

export default function HostProfile() {
  const t = useTranslations('host');

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Host Image Placeholder */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-nature-200 to-earth-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/80 flex items-center justify-center">
                      <Users className="w-16 h-16 text-nature-600" />
                    </div>
                    <p className="text-earth-600 font-medium text-lg">Emma</p>
                    <p className="text-earth-500 text-sm">{t('sectionTitle')}</p>
                  </div>
                </div>

                {/* Verified Host Badge */}
                <div className="absolute top-4 right-4 bg-nature-600 text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span className="font-semibold text-sm">{t('superhost')}</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="hidden lg:block absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-nature-100 to-accent-100 rounded-full blur-3xl opacity-60 -z-10" />
              <div className="hidden lg:block absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-br from-earth-100 to-sage-100 rounded-full blur-3xl opacity-60 -z-10" />
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              {/* Header */}
              <div>
                <span className="inline-block text-sm font-semibold text-nature-600 tracking-wider uppercase mb-3">
                  {t('sectionTitle')}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-earth-900 mb-4">
                  {t('title')}
                </h2>
                <p className="text-xl text-nature-600 font-medium">
                  {t('subtitle')}
                </p>
              </div>

              {/* Bio */}
              <div className="space-y-4 text-earth-600 leading-relaxed">
                <p>{t('bio1')}</p>
                <p>{t('bio2')}</p>
                <p>{t('bio3')}</p>
              </div>

              {/* Stats 
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-earth-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-nature-600 mb-1">6+</div>
                  <p className="text-sm text-earth-600">{t('yearsHosting')}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-nature-600 mb-1">5.0</div>
                  <p className="text-sm text-earth-600">{t('rating')}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-nature-600 mb-1">50+</div>
                  <p className="text-sm text-earth-600">{t('happyGuests')}</p>
                </div>
              </div>*/}

              {/* Values */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-earth-800 mb-4">{t('careAbout')}</h3>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-nature-100 rounded-lg flex-shrink-0">
                    <Leaf className="w-5 h-5 text-nature-600" />
                  </div>
                  <div>
                    <p className="font-medium text-earth-800">{t('sustainability')}</p>
                    <p className="text-sm text-earth-600">{t('sustainabilityDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-nature-100 rounded-lg flex-shrink-0">
                    <Heart className="w-5 h-5 text-nature-600" />
                  </div>
                  <div>
                    <p className="font-medium text-earth-800">{t('hospitality')}</p>
                    <p className="text-sm text-earth-600">{t('hospitalityDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-nature-100 rounded-lg flex-shrink-0">
                    <Users className="w-5 h-5 text-nature-600" />
                  </div>
                  <div>
                    <p className="font-medium text-earth-800">{t('community')}</p>
                    <p className="text-sm text-earth-600">{t('communityDesc')}</p>
                  </div>
                </div>
              </div>

              {/* Contact Methods */}
              <div className="bg-gradient-to-br from-earth-50 to-nature-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-earth-800 mb-3">{t('getInTouch')}</h3>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-nature-600 flex-shrink-0" />
                  <a
                    href={`tel:${siteContent.contact.phone}`}
                    className="text-earth-700 hover:text-nature-600 transition-colors"
                  >
                    {siteContent.contact.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-nature-600 flex-shrink-0" />
                  <a
                    href={`mailto:${siteContent.contact.email}`}
                    className="text-earth-700 hover:text-nature-600 transition-colors"
                  >
                    {siteContent.contact.email}
                  </a>
                </div>

                <div className="pt-4 border-t border-earth-200">
                  <a
                    href={`https://wa.me/${siteContent.contact.whatsapp.replace(/\s/g, '').replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full" variant="primary">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      {t('messageEmma')}
                    </Button>
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-3 text-sm text-earth-600">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span>{t('typicallyResponds')}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
