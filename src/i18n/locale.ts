'use server';

import { cookies, headers } from 'next/headers';
import { type Locale, locales, defaultLocale, COOKIE_NAME } from './config';

/**
 * Get user's locale from cookie or detect from browser
 */
export async function getLocale(): Promise<Locale> {
  // 1. Check cookie first (user preference)
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get(COOKIE_NAME)?.value as Locale | undefined;

  if (savedLocale && locales.includes(savedLocale)) {
    return savedLocale;
  }

  // 2. Detect from Accept-Language header
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');

  if (acceptLanguage) {
    // Parse accept-language header (e.g., "es-ES,es;q=0.9,en;q=0.8")
    const preferredLanguages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().split('-')[0]);

    for (const lang of preferredLanguages) {
      if (locales.includes(lang as Locale)) {
        return lang as Locale;
      }
    }
  }

  // 3. Default fallback
  return defaultLocale;
}

/**
 * Set user's locale preference in cookie
 */
export async function setLocale(locale: Locale): Promise<void> {
  debugger
  if (!locales.includes(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale, {
    httpOnly: false, // Allow client-side access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });
}
