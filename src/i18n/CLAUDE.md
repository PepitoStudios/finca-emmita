# Internationalization (i18n) System

This application uses **next-intl** (v4.3.12) for internationalization with a cookie-based locale selection system. The site is bilingual, supporting English (en) and Spanish (es), with English as the default fallback language.

## Architecture Overview

### Core Files

- `/src/i18n.ts` - next-intl configuration entry point
- `/src/i18n/config.ts` - Locale type, supported locales array, default locale, cookie name
- `/src/i18n/locale.ts` - `getLocale()` and `setLocale()` server actions for locale management
- `/messages/en.json` - English translations
- `/messages/es.json` - Spanish translations
- `/next.config.ts` - next-intl plugin integration

### Locale Detection Flow

When a user visits the site, the system determines their language preference through a three-tier hierarchy:

1. **Cookie Check First** - Looks for `NEXT_LOCALE` cookie (1-year expiration, httpOnly: false, secure in production)
2. **Browser Detection** - Parses `Accept-Language` header if no cookie exists
3. **Default Fallback** - Defaults to 'en' if neither cookie nor browser preference provides a valid locale

This detection happens in `/src/i18n/locale.ts` via the `getLocale()` server action, called by the i18n configuration in `/src/i18n.ts`.

### Language Switching

The `LanguageSwitcher` component (`/src/components/ui/LanguageSwitcher.tsx`) provides both desktop and mobile UI:

1. Calls `setLocale(newLocale)` server action
2. Server action validates locale and sets the `NEXT_LOCALE` cookie
3. Component uses `useTransition()` for loading states
4. Calls `router.refresh()` to reload page with new locale
5. Mobile menu closes automatically (if open)

## Translation File Structure

Translation keys are organized hierarchically in JSON files at `/messages/en.json` and `/messages/es.json`. The structure mirrors component organization:

### Namespace Organization

- `navigation.*` - Header/Footer navigation links
- `hero.*` - Hero section with quick facts
- `about.*` - About/intro text
- `features.*` - Feature cards (self-sufficient, peace, internet, pets)
- `accommodations.*` - Accommodation cards, pricing, CTAs
  - `accommodations.laCasita.*` - La Casita property details
  - `accommodations.laOlivita.*` - La Olivita property details
  - `accommodations.casaLuna.*` - Casa Luna property details
- `testimonials.*` - Testimonial section headers and items array
- `host.*` - Host profile section
- `location.*` - Location section with nearby places and directions
- `booking.*` - Booking widget labels
- `cta.*` - Call-to-action sections
- `footer.*` - Footer content
- `common.*` - Shared strings (brand name, read more, close, etc.)
- `whatsapp.*` - WhatsApp button tooltips and messages
- `language.*` - Language switcher UI text

### Interpolation Support

Messages support interpolation using `{variableName}` syntax:

```json
"fromPerNight": "From €{price}/night"
"minutesDrive": "{minutes} minutes drive"
"fromCity": "From {city}"
```

## Component Implementation Patterns

### Client Components

Use `useTranslations(namespace)` hook:

```typescript
import { useTranslations } from 'next-intl';

const t = useTranslations('accommodations');
const title = t('title'); // Access top-level key
const amenity = t('laCasita.amenities.wifi'); // Access nested key
```

### Server Components

Use `getTranslations` from `next-intl/server`:

```typescript
import { getTranslations } from 'next-intl/server';

const t = await getTranslations('accommodations');
const title = t('title');
```

### Root Provider

The root layout (`/src/app/layout.tsx`) wraps the application in `NextIntlClientProvider`, passing the current locale and loaded messages. This makes translations available throughout the component tree.

## Advanced Patterns

### Using t.raw() for Complex Objects

When translations contain arrays or nested objects, use `t.raw()` to access the raw structure:

```typescript
// For testimonials array
const testimonials = t.raw('items') as Array<{ author: string; content: string }>;

// For amenities object
const amenitiesObj = t.raw(`${accommodationKey}.amenities`) as Record<string, string>;
const amenities = Object.values(amenitiesObj);
```

**Important**: `t.raw()` bypasses type safety. The structure must match what's in the translation files, or runtime errors will occur.

### Dynamic Key Lookup

For dynamic content like accommodations, use a helper function to convert IDs to translation keys:

```typescript
// Helper to convert accommodation id to translation key (la-casita -> laCasita)
function idToTranslationKey(id: string): string {
  return id.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Usage in component
const accommodationKey = idToTranslationKey(accommodation.id); // 'la-casita' -> 'laCasita'
const title = t(`${accommodationKey}.title`);
const description = t(`${accommodationKey}.longDescription`);
```

This pattern allows storing language-agnostic data (IDs, images, pricing) in data files while keeping translatable content in translation files.

## Data Separation Strategy

### What Goes in Translation Files

**Translatable content** that changes by language:
- UI labels and button text
- Descriptions and marketing copy
- Amenity lists
- Testimonial content
- Location descriptions
- Error messages

### What Goes in Data Files

**Language-agnostic data** that stays the same:
- Accommodation IDs and slugs
- Image URLs and dimensions
- Pricing (numbers)
- Capacity (numbers)
- Size/measurements
- Data structure and relationships

### Example: Accommodation Data

**Data file** (`/src/data/accommodations.ts`):
```typescript
{
  id: 'la-casita',
  slug: 'la-casita',
  capacity: 4,
  size: 35,
  pricing: {
    weekday: 70,
    weekend: 80,
    highSeason: 90
  },
  images: [
    { url: '/images/la-casita-1.jpg', alt: 'La Casita exterior' }
  ]
}
```

**Translation file** (`/messages/en.json`):
```json
{
  "accommodations": {
    "laCasita": {
      "title": "La Casita",
      "shortDescription": "Newly built log cabin...",
      "longDescription": "The Casita is newly built...",
      "amenities": {
        "kitchen": "Well-equipped kitchen",
        "livingRoom": "Living room with sofa bed",
        // ... more amenities
      }
    }
  }
}
```

## Common Patterns by Component Type

### Accommodation Cards

- Use `idToTranslationKey()` helper for dynamic key lookup
- Use `t.raw()` for amenities object, then `Object.values()` to get array
- Reference data file for pricing, capacity, images
- Reference translations for all text content

Example: `/src/components/ui/AccommodationCard.tsx` (lines 30-47)

### Testimonials

- Store entire testimonials array in translation files under `testimonials.items`
- Use `t.raw('items')` to access as typed array
- Each item has `author` and `content` properties

Example: `/src/components/sections/TestimonialsSection.tsx` (line 12)

### Location Information

- City names (proper nouns) can be translatable or not depending on context
- Travel times and descriptions always translatable
- Use interpolation for dynamic values like minutes

Example: `/src/components/sections/LocationSection.tsx` (lines 46-62)

### Language Switcher

- Uses `language` namespace for UI text
- Mobile and desktop variants share same translation keys
- Shows "Active" badge on current language using `t('active')`

Example: `/src/components/ui/LanguageSwitcher.tsx` (line 50)

## Best Practices

### DO:
- Keep all user-facing text in translation files
- Use nested namespaces to organize related translations
- Use interpolation for dynamic values
- Use `t.raw()` sparingly and only for complex structures
- Convert IDs to translation keys dynamically rather than hardcoding
- Separate translatable content from language-agnostic data

### DON'T:
- Hardcode text strings in components (except proper nouns where appropriate)
- Mix data and translations in the same file
- Duplicate translation logic across components
- Use `t.raw()` without proper type assertions
- Build translation keys with string concatenation for simple values (use interpolation instead)
- Store language-specific content in data files

## Known Limitations

### Type Safety with t.raw()

`t.raw()` returns `any`, losing TypeScript type checking. The structure must match what's in translation files or runtime errors will occur. Consider adding runtime validation for production code if needed.

### Dynamic Key Generation

The `idToTranslationKey()` pattern can break silently if:
- Accommodation IDs change but translation keys don't update
- Translation structure doesn't match expected format

Maintain consistency between data file IDs and translation file structure.

### Metadata Generation

The `generateMetadata` function in `/src/app/layout.tsx` uses hardcoded conditionals (`isSpanish = locale === 'es'`) rather than translation files. This is intentional for Next.js metadata generation but creates a small inconsistency with the rest of the i18n system.

## Cookie vs URL-based Locale

The system uses **cookie-based** locale storage rather than URL-based (like `/en/page` or `/es/page`):

**Benefits:**
- No route changes needed when switching language
- `router.refresh()` reloads current page with new locale
- No URL prefix to manage
- Deep linking preserves language preference via cookie

**Trade-offs:**
- SEO considerations: search engines see same URLs regardless of language
- Users can't share language-specific URLs
- Cookie must persist for language preference to work

## Testing Translation Changes

When adding or modifying translations:

1. Update both `/messages/en.json` and `/messages/es.json`
2. Ensure nested structure matches exactly
3. Test language switching in browser
4. Verify all affected components display correctly
5. Check for console errors about missing translation keys
6. Test with browser language preferences

## Related Files

**Components Using Translations:**
- `/src/components/ui/LanguageSwitcher.tsx` - Language selection UI
- `/src/components/ui/AccommodationCard.tsx` - Dynamic accommodation display
- `/src/components/sections/TestimonialsSection.tsx` - Testimonials carousel
- `/src/components/sections/LocationSection.tsx` - Location details
- `/src/components/layout/Header.tsx` - Brand name
- `/src/components/layout/Navigation.tsx` - Navigation links
- `/src/components/layout/Footer.tsx` - Footer navigation and text

**Data Files (Language-Agnostic):**
- `/src/data/accommodations.ts` - Accommodation structure and non-translatable data
- `/src/data/content.ts` - Site configuration
- `/src/lib/types.ts` - TypeScript type definitions
