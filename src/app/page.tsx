'use client';

import { useTranslations } from 'next-intl';
import Hero from '@/components/sections/Hero';
import AccommodationsShowcase from '@/components/sections/AccommodationsShowcase';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import HostProfile from '@/components/sections/HostProfile';
import LocationSection from '@/components/sections/LocationSection';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Leaf, VolumeX, Wifi, Dog } from 'lucide-react';
import { siteContent } from '@/data/content';
import { accommodations } from '@/data/accommodations';

export default function Home() {
  const t = useTranslations();

  // Combine all accommodation images for hero carousel
  const heroImages = accommodations.flatMap(acc => acc.images.map(img => img.url));

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctaText={t('hero.cta')}
        images={heroImages}
        quickFacts={[
          t('hero.quickFacts.selfSufficient'),
          t('hero.quickFacts.noNeighbors'),
          t('hero.quickFacts.peaceNature')
        ]}
      />

      {/* Welcome */}
      <section id="content" className="py-20 bg-earth-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-earth-600 mb-6 leading-relaxed">{t('about.intro')}</p>
            <p className="text-xl font-semibold text-nature-700 text-center my-8">
              {t('about.highlight')}
            </p>
            <p className="text-lg text-earth-600 leading-relaxed">{t('about.elPerello')}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-earth-800 mb-12">
            {t('features.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-nature-100 flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-nature-600" />
                </div>
                <h3 className="text-xl font-semibold text-earth-800 mb-2">{t('features.selfSufficient.title')}</h3>
                <p className="text-earth-600">
                  {t('features.selfSufficient.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-nature-100 flex items-center justify-center">
                  <VolumeX className="w-8 h-8 text-nature-600" />
                </div>
                <h3 className="text-xl font-semibold text-earth-800 mb-2">{t('features.peaceQuiet.title')}</h3>
                <p className="text-earth-600">
                  {t('features.peaceQuiet.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-nature-100 flex items-center justify-center">
                  <Wifi className="w-8 h-8 text-nature-600" />
                </div>
                <h3 className="text-xl font-semibold text-earth-800 mb-2">{t('features.internet.title')}</h3>
                <p className="text-earth-600">
                  {t('features.internet.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-nature-100 flex items-center justify-center">
                  <Dog className="w-8 h-8 text-nature-600" />
                </div>
                <h3 className="text-xl font-semibold text-earth-800 mb-2">{t('features.petFriendly.title')}</h3>
                <p className="text-earth-600">
                  {t('features.petFriendly.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Accommodations */}
      <AccommodationsShowcase />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Host Profile */}
      <HostProfile />

      {/* Location */}
      <LocationSection />

      {/* CTA Final */}
      <section className="py-20 bg-nature-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={`tel:${siteContent.contact.phone}`}>
              <Button size="lg" variant="secondary">
                {siteContent.contact.phone}
              </Button>
            </a>
            <a href={`https://wa.me/${siteContent.contact.whatsapp.replace('+', '').replace(' ', '')}`} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-nature-700 border-white hover:bg-earth-50"
              >
                {t('navigation.contactEmma')}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
