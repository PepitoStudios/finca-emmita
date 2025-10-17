---
name: m-fix-language-text-inconsistencies
branch: fix/language-text-inconsistencies
status: pending
created: 2025-10-17
---

# Fix Language Text Inconsistencies

## Problem/Goal
Some pages contain text that doesn't match the currently selected language. We need to find all instances where content is displayed in a different language than what the user has selected and correct them to ensure consistent language throughout the application.

## Success Criteria
- [ ] All pages audited and text inconsistencies identified where content doesn't match selected language
- [ ] Language detection/selection mechanism verified to be working correctly across all pages
- [ ] All hardcoded text strings replaced with appropriate language-specific content
- [ ] Testing completed on all affected pages to confirm text displays in the correct language based on user selection

## Context Manifest
<!-- Added by context-gathering agent -->

### How the Language System Currently Works

This application uses **next-intl** (v4.3.12) for internationalization with a cookie-based locale selection system. The architecture is designed for a bilingual site supporting English (en) and Spanish (es), with English as the default fallback language.

#### Locale Detection and Storage Flow

When a user visits the site, the system determines their language preference through a three-tier hierarchy:

1. **Cookie Check First** - The system looks for a cookie named `NEXT_LOCALE` (defined in `/src/i18n/config.ts`). If this cookie exists and contains a valid locale ('en' or 'es'), that locale is used immediately. This cookie is set with a 1-year expiration, httpOnly: false (allowing client-side access), and secure flag in production.

2. **Browser Detection** - If no cookie exists, the system reads the `Accept-Language` header from the incoming request. It parses this header (format: "es-ES,es;q=0.9,en;q=0.8") and extracts language codes, checking each one against the supported locales array. The first match wins.

3. **Default Fallback** - If neither cookie nor browser preference provides a valid locale, the system defaults to 'en'.

This detection happens in `/src/i18n/locale.ts` via the `getLocale()` server action, which is called by the i18n configuration in `/src/i18n.ts`. The configuration uses `next-intl/server`'s `getRequestConfig` to load the appropriate message file from `/messages/{locale}.json` and sets timezone to 'Europe/Madrid'.

#### Language Switching Mechanism

The `LanguageSwitcher` component (`/src/components/ui/LanguageSwitcher.tsx`) provides both desktop and mobile UI for changing languages. When a user clicks a language option:

1. Component calls `setLocale(newLocale)` - a server action from `/src/i18n/locale.ts`
2. Server action validates the locale and sets the `NEXT_LOCALE` cookie with proper security flags
3. Component uses `useTransition()` to wrap the operation, providing `isPending` state for loading indicators
4. After cookie is set, `router.refresh()` is called to reload the page with the new locale
5. The mobile menu closes automatically (if open)

The switcher displays language flags (UK flag for English, Spanish flag for Spanish) and shows an "Active" badge on the currently selected language. During the transition, a loading spinner (⏳ emoji) appears on the language being switched to.

#### Translation File Structure and Loading

Translation keys are organized hierarchically in JSON files at `/messages/en.json` and `/messages/es.json`. The structure mirrors the component organization:

- `navigation.*` - Header/Footer navigation links
- `hero.*` - Hero section with quick facts
- `about.*` - About/intro text
- `features.*` - Feature cards (self-sufficient, peace, internet, pets)
- `accommodations.*` - Accommodation cards, pricing, calls-to-action (includes nested objects for laCasita and laOlivita)
- `testimonials.*` - Testimonial section headers
- `host.*` - Host profile section
- `location.*` - Location section with nearby places
- `booking.*` - Booking widget labels
- `cta.*` - Call-to-action sections
- `footer.*` - Footer content
- `common.*` - Shared strings (brand name, read more, close, etc.)
- `whatsapp.*` - WhatsApp button tooltips and messages

Messages support interpolation using `{variableName}` syntax. For example: `"fromPerNight": "From €{price}/night"` or `"minutesDrive": "{minutes} minutes drive"`.

#### How Components Access Translations

Components use two primary hooks from `next-intl`:

**Client Components** use `useTranslations(namespace)`:
```typescript
const t = useTranslations('accommodations');
const title = t('title'); // Access top-level key
const amenity = t('laCasita.amenities.wifi'); // Access nested key
```

**Server Components** use `getTranslations` from `next-intl/server` (seen in `layout.tsx` for metadata).

The root layout (`/src/app/layout.tsx`) wraps the entire application in `NextIntlClientProvider`, passing the current locale and loaded messages. This makes translations available throughout the component tree.

#### Metadata Generation

The `generateMetadata` function in `/src/app/layout.tsx` creates locale-specific metadata by:
1. Calling `getLocale()` to determine the current language
2. Using conditional logic (`isSpanish = locale === 'es'`) to select appropriate title, description, and keywords
3. Setting OpenGraph locale and alternateLocale for social sharing
4. This approach is NOT using the translation files - it's hardcoded conditionals

### Identified Issues: Where Language Inconsistencies Occur

#### 1. Hardcoded Strings Not Using Translations

**LanguageSwitcher.tsx Line 49**: The "Active" badge text is hardcoded in English:
```typescript
<span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded">Active</span>
```
This should use a translation key so Spanish users see "Activo" instead.

**LocationSection.tsx Lines 38, 48-59**: City names and travel times are hardcoded directly in component:
```typescript
const directions = [
  { from: 'Barcelona', time: '2 hours', icon: Car },
  { from: 'Valencia', time: '1.5 hours', icon: Car },
  { from: 'Tarragona', time: '45 minutes', icon: Car },
];
```
While city names might be proper nouns that don't translate, the time descriptions should use translation keys for consistency (e.g., "2 horas" in Spanish).

**LocationSection.tsx Line 38**: Building the distance string with JavaScript concatenation:
```typescript
distance: '10-15 ' + t('minutesDrive', { minutes: '' }).toLowerCase(),
```
This approach is fragile and creates grammatically incorrect output. Should use a proper translation key with interpolation.

#### 2. Data Files with English-Only Content

**accommodations.ts** (`/src/data/accommodations.ts`): All accommodation data is in English only:
- `title`: "La Casita", "La Olivita", "Casa Luna" (proper nouns, OK)
- `shortDescription`: English text
- `longDescription`: English text
- `amenities`: Array of English strings like "Well-equipped kitchen", "Living room with sofa bed"
- `image.alt`: English alt text

This data is NOT using the translation system. The `AccommodationCard` component displays these values directly without translation, meaning Spanish users see English descriptions even when other UI elements are in Spanish.

**content.ts** (`/src/data/content.ts`): Contains hardcoded English text:
- `siteContent.location.distances`: "10 minutes drive", "20 minutes drive"
- `siteContent.hero.description`: English text
- `siteContent.about`: All English
- `siteContent.features`: Array with English titles and descriptions
- `metaTags`: English metadata

These values are imported and used in components like Footer (lines 95-97) and LocationSection, displaying English text regardless of selected language.

**testimonials.ts** (`/src/data/testimonials.ts`): Contains customer testimonials in English only (except testimonial #4 which is in Spanish). The `TestimonialsSection` component displays `testimonial.content` and `testimonial.author` directly without translation. When a Spanish user browses, they see English testimonials in a Spanish UI.

#### 3. Translation Key Inconsistencies

The translation files are complete and well-structured, but some components may not be using them correctly:

- Footer uses `siteContent.location.distances` directly (line 95-97) instead of translation keys
- AccommodationCard displays accommodation data from the data file instead of using translation keys
- Some translation keys exist but aren't being used (redundancy between similar keys like `accommodations.cantDecideText` and `accommodations.cantDecideDescription`)

### Architecture Patterns and Constraints

#### Why Data Files Aren't Using Translations

The current architecture separates "data" (in `/src/data/`) from "translations" (in `/messages/`). Data files export TypeScript objects/arrays representing content entities (accommodations, testimonials, site metadata). These are imported directly into components.

This separation may have been intentional for several reasons:
- Accommodation data includes complex nested structures (images, pricing, amenities arrays)
- Type safety: TypeScript types from `/src/lib/types.ts` define the data structure
- Easy to extend with new accommodations without touching translation files
- Image URLs and pricing are truly language-agnostic

However, this creates the inconsistency: UI chrome (buttons, labels) translates correctly, but content (descriptions, amenities) remains in English.

#### Component Rendering Patterns

Most components follow this pattern:
1. Import `useTranslations` hook
2. Call `const t = useTranslations('namespace')`
3. Render UI with `t('key')` for translated text
4. Import data files for content entities
5. Map over data arrays to render cards/sections

The issue is step 4+5 - when data files contain English strings, those strings bypass the translation system entirely.

#### Cookie vs URL-based Locale

The system uses **cookie-based** locale storage rather than URL-based (like `/en/page` or `/es/page`). This means:
- No route changes needed when switching language
- `router.refresh()` reloads the current page with new locale
- No URL prefix to manage
- Deep linking preserves language preference via cookie
- SEO considerations: search engines see same URLs regardless of language

### Solution Approaches to Consider

#### Option 1: Move Data File Content to Translation Files

**Pros:**
- Centralized translation management
- Consistent with existing UI translations
- Easy to verify completeness (both languages in same file structure)

**Cons:**
- Translation files become very large
- Nested structures can be complex to navigate
- Type safety is harder (translation keys are strings, not typed objects)
- Must duplicate image URLs and other non-translatable data

**Implementation:**
- Move accommodation descriptions/amenities to `messages/{locale}.json` under new namespace
- Move testimonials to translation files
- Update components to use `t()` for all content
- Keep truly language-agnostic data (images, pricing, IDs) in data files

#### Option 2: Create Locale-Specific Data Files

**Pros:**
- Maintains data file structure and type safety
- Clear separation of concerns
- Easy to add new accommodations with all languages together

**Cons:**
- Data duplication across language files
- Must keep multiple files in sync for structural changes
- More files to manage (`accommodations.en.ts`, `accommodations.es.ts`)

**Implementation:**
- Create `/src/data/accommodations.en.ts` and `/src/data/accommodations.es.ts`
- Create similar for testimonials and content
- Add a selection mechanism in components based on locale
- Keep shared data (IDs, types, pricing) in common file

#### Option 3: Hybrid Approach - Data Files with Translation Key References

**Pros:**
- Maintains current structure mostly intact
- Keeps type safety
- Clear which text should be translated vs hardcoded

**Cons:**
- More complex lookup logic in components
- Need to change how components consume data
- Translation keys become another layer of indirection

**Implementation:**
- Data files store translation key references: `{ description: 'accommodations.laCasita.description' }`
- Translation files contain the actual text
- Components lookup translation using the key reference
- Use TypeScript to enforce key references are valid

#### Option 4: Server-Side Content Selection

**Pros:**
- Leverage Next.js server components
- Can generate appropriate content at build time
- No client-side language switching overhead

**Cons:**
- Requires refactoring many client components
- Loses interactive benefits of current implementation
- More complex data flow

### Current Issues Summary for Quick Reference

**Files requiring changes:**

1. `/src/components/ui/LanguageSwitcher.tsx` - Line 49: "Active" → translation key
2. `/src/components/sections/LocationSection.tsx` - Lines 38, 48-59: Hardcoded city travel times
3. `/src/data/accommodations.ts` - All descriptions and amenities (English only)
4. `/src/data/testimonials.ts` - All testimonial content (mostly English)
5. `/src/data/content.ts` - All site content (English only)
6. Components consuming data files need to adapt to whichever solution is chosen

**Translation keys to add (if choosing Option 1):**
- `accommodations.laCasita.longDescription`
- `accommodations.laCasita.amenities.*` (10 keys)
- `accommodations.laOlivita.longDescription`
- `accommodations.laOlivita.amenities.*` (12 keys)
- `accommodations.casaLuna.longDescription`
- `accommodations.casaLuna.amenities.*` (9 keys)
- `testimonials.*` (6+ testimonial entries)
- `content.about.*` (various about section text)
- `content.features.*` (feature descriptions)
- `language.active` (for switcher badge)
- `location.directions.*` (city travel times)

**Testing checklist:**
- Switch language and verify ALL text updates (not just UI chrome)
- Check accommodation descriptions change language
- Verify testimonials are in selected language
- Confirm location/distance text translates
- Test language switcher badge text
- Verify metadata changes with language
- Check WhatsApp messages use correct language
- Test booking widget messages in both languages

### Related Files Reference

**Core i18n Infrastructure:**
- `/src/i18n.ts` - next-intl configuration entry point
- `/src/i18n/config.ts` - Locale type, array, default, cookie name
- `/src/i18n/locale.ts` - getLocale() and setLocale() server actions
- `/messages/en.json` - English translations (229 lines)
- `/messages/es.json` - Spanish translations (229 lines)
- `/next.config.ts` - next-intl plugin integration

**Components Using Translations:**
- `/src/app/layout.tsx` - Root provider, metadata generation
- `/src/app/page.tsx` - Main page sections
- `/src/components/ui/LanguageSwitcher.tsx` - Language selection UI
- `/src/components/layout/Header.tsx` - Brand name from translations
- `/src/components/layout/Footer.tsx` - Navigation, about text
- `/src/components/layout/Navigation.tsx` - Nav links
- `/src/components/sections/AccommodationsShowcase.tsx` - Section headers
- `/src/components/ui/AccommodationCard.tsx` - Accommodation display
- `/src/components/sections/TestimonialsSection.tsx` - Testimonials
- `/src/components/sections/HostProfile.tsx` - Host bio
- `/src/components/sections/LocationSection.tsx` - Location details
- `/src/components/ui/BookingWidget.tsx` - Booking form
- `/src/components/layout/WhatsAppButton.tsx` - Contact button

**Data Files (Currently English Only):**
- `/src/data/accommodations.ts` - Accommodation details
- `/src/data/testimonials.ts` - Customer reviews
- `/src/data/content.ts` - Site content
- `/src/lib/types.ts` - TypeScript type definitions

**Dependencies:**
- `next-intl` v4.3.12 - Main i18n library
- `next` v15.5.5 - Framework
- React 19.1.0 - UI library

## User Notes
<!-- Any specific notes or requirements from the developer -->

## Work Log
<!-- Updated as work progresses -->
- [YYYY-MM-DD] Started task, initial research
