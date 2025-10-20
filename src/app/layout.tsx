import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getLocale } from '@/i18n/locale';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import BookingWidget from '@/components/ui/BookingWidget';

export async function generateMetadata() {
  const locale = await getLocale();
  const isSpanish = locale === 'es';

  return {
    title: isSpanish
      ? 'Finca Emmita - Casas Rurales | Paz, Naturaleza y Sostenibilidad'
      : 'Finca Emmita - Casas Rurales | Peace, Nature & Sustainability',
    description: isSpanish
      ? 'Finca 100% autosuficiente en valle tranquilo cerca de El Perello, Tarragona. Energía solar, recolección de agua de lluvia, sin vecinos. Alojamientos La Casita y La Olivita. Perfecta para desconexión.'
      : '100% self-sufficient finca in peaceful valley near El Perello, Tarragona. Solar powered, rainwater collection, no neighbors. La Casita & La Olivita accommodations. Perfect for disconnection.',
    keywords: isSpanish
      ? [
          'finca emmita',
          'casas rurales',
          'alojamiento rural españa',
          'finca autosuficiente',
          'el perello',
          'tarragona',
          'turismo sostenible',
          'alojamiento ecológico',
          'retiro tranquilo',
          'escapada naturaleza',
        ]
      : [
          'finca emmita',
          'casas rurales',
          'rural accommodation spain',
          'self-sufficient finca',
          'el perello',
          'tarragona',
          'sustainable tourism',
          'eco-friendly accommodation',
          'peaceful retreat',
          'nature escape',
        ],
    authors: [{ name: 'Emma Rault' }],
    openGraph: {
      title: 'Finca Emmita - Casas Rurales',
      description: isSpanish
        ? 'Paz, Tranquilidad y Naturaleza en Finca Autosuficiente'
        : 'Peace, Quiet & Nature in Self-Sufficient Finca',
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_GB',
      alternateLocale: locale === 'es' ? 'en_GB' : 'es_ES',
      images: [
        {
          url: '/images/hero/finca-emmita-hero.jpg',
          width: 1200,
          height: 630,
          alt: 'Finca Emmita - Rural Accommodation',
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className="antialiased min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppButton />
          {/* <BookingWidget /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
