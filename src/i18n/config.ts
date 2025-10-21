/**
 * i18n configuration (types and constants only)
 * This file doesn't use 'use server' so we can export constants
 */

export type Locale = 'en' | 'es' | 'fr';

export const locales: Locale[] = ['en', 'es', 'fr'];
export const defaultLocale: Locale = 'en';
export const COOKIE_NAME = 'NEXT_LOCALE';
