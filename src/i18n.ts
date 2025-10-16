import { getRequestConfig } from 'next-intl/server';
import { getLocale } from '@/i18n/locale';

export default getRequestConfig(async () => {
  // Get locale from cookie or browser detection
  const locale = await getLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'Europe/Madrid',
    now: new Date(),
  };
});
