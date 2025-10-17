---
name: m-refactor-remove-page-sections
branch: feature/m-refactor-remove-page-sections
status: pending
created: 2025-10-17
---

# Remove Page Sections and Update Navigation

## Problem/Goal
The navigation currently has links to non-existent pages (/la-casita, /la-olivita, /activities, /contact) that result in 404 errors. Since this is a single-page website, these should be converted to smooth scroll anchors to existing sections. Additionally, the topbar text is not visible when transparent over the hero image due to dark text colors.

## Success Criteria
- [ ] Remove navigation links to non-existent pages (La Casita, La Olivita, Activities, Contact)
- [ ] Add smooth scroll anchors to existing page sections (Accommodations, Location, Contact/CTA)
- [ ] Update navigation items to scroll to these anchors instead of routing to pages
- [ ] Fix topbar text colors to be white/visible when transparent over hero
- [ ] Text colors properly transition to dark when scrolled/background becomes white
- [ ] Both desktop and mobile navigation updated
- [ ] Smooth scroll behavior implemented

## Context Manifest

### How This Currently Works: Navigation & Routing System

**The Current Broken State:**

The website is a Next.js 15 application using the App Router with a single-page architecture, but the navigation system is incorrectly configured for multi-page routing. When a user clicks on navigation items, the system attempts to route to non-existent pages using Next.js Link components with href values like `/la-casita`, `/la-olivita`, `/activities`, and `/contact`. These pages don't exist in the codebase, resulting in 404 errors.

**Navigation Component Architecture:**

The navigation is split across two main components:

1. **Header Component** (`/Users/vssnake/pagina/ecoturismo-web/src/components/layout/Header.tsx`): This is the top-level container that implements scroll-based styling changes. It uses a `useState` hook to track scroll position via `window.scrollY > 20`. When not scrolled (`isScrolled === false`), the header has:
   - `bg-transparent` background
   - Brand subtitle: `text-earth-100` (very light, almost white)
   - Brand name: `text-white`

   When scrolled (`isScrolled === true`), it transitions to:
   - `bg-white/95 backdrop-blur-sm shadow-md` (white semi-transparent background)
   - Brand subtitle: `text-earth-600` (dark earth tone)
   - Brand name: `text-nature-700` (dark green tone)

2. **Navigation Component** (`/Users/vssnake/pagina/ecoturismo-web/src/components/layout/Navigation.tsx`): This component is rendered inside the Header and contains both desktop and mobile navigation. The navigation items are defined in an array (lines 18-24):

```typescript
const navigationItems = [
  { name: t('home'), href: '/' },
  { name: t('laCasita'), href: '/la-casita' },
  { name: t('laOlivita'), href: '/la-olivita' },
  { name: t('activities'), href: '/activities' },
  { name: t('contact'), href: '/contact', highlight: true },
];
```

**The Text Visibility Problem:**

The Navigation component does NOT inherit or respond to the Header's `isScrolled` state. Desktop navigation items (lines 54-59) use these color classes:
- Highlighted items (contact): `bg-nature-600 text-white` (always green background with white text)
- Active items: `text-nature-700 bg-nature-50` (dark green text on light green background)
- Default items: `text-earth-700` (dark brown text)

Mobile navigation uses similar dark text colors: `text-earth-700` (line 80 for menu button, line 126 for close button).

The problem is that when the header is transparent and overlaying the Hero section's dark image, the `text-earth-700` and `text-nature-700` colors are dark and become invisible against the dark hero background. The header component changes its own brand colors based on scroll, but the Navigation component is not aware of this state and always uses dark colors.

**Page Structure & Section IDs:**

The main page (`/Users/vssnake/pagina/ecoturismo-web/src/app/page.tsx`) is structured as a single-page layout with the following sections:

1. **Hero Section** (lines 23-34): Full-screen hero with carousel, no ID attribute
2. **Welcome Section** (lines 37-47): Has `id="content"` - this is the primary scroll target from Hero's CTA
3. **Features Section** (lines 50-105): No ID, displays 4 feature cards
4. **AccommodationsShowcase** (line 108): Imported component, displays both La Casita and La Olivita
5. **TestimonialsSection** (line 111): Imported component
6. **HostProfile** (line 114): Imported component, displays Emma's profile
7. **LocationSection** (line 117): Imported component, displays map and location details
8. **CTA Final Section** (lines 120-143): No ID, final call-to-action with phone and WhatsApp buttons

Currently, only the `#content` section has an ID. The AccommodationsShowcase component does not have section IDs for individual accommodations, LocationSection does not have an ID, and there's no dedicated contact section.

**Existing Smooth Scroll Implementation:**

The site already has smooth scroll configured globally in `globals.css` (line 118):
```css
html {
  scroll-behavior: smooth;
}
```

The Hero component implements smooth scrolling to `#content` (lines 46-50):
```typescript
const scrollToContent = (e: React.MouseEvent) => {
  e.preventDefault();
  const element = document.querySelector('#content');
  element?.scrollIntoView({ behavior: 'smooth' });
};
```

**Translation System:**

The application uses `next-intl` for internationalization with two languages:
- English: `/Users/vssnake/pagina/ecoturismo-web/messages/en.json`
- Spanish: `/Users/vssnake/pagina/ecoturismo-web/messages/es.json`

Navigation translations are under the `navigation` key:
- `home`: "Home" / "Inicio"
- `laCasita`: "La Casita" (same in both)
- `laOlivita`: "La Olivita" (same in both)
- `activities`: "Activities" / "Actividades"
- `contact`: "Contact" / "Contacto"

The Navigation component uses `useTranslations('navigation')` to access these values.

**Footer Component Issue:**

The Footer component (`/Users/vssnake/pagina/ecoturismo-web/src/components/layout/Footer.tsx`) also contains the same broken navigation links (lines 21-48), including links to `/la-casita`, `/la-olivita`, `/activities`, and a contact button linking to `/contact` (lines 121-126). These will also need to be updated to match the new anchor-based navigation approach.

**Styling System:**

The project uses:
- **Tailwind CSS v4** with custom theme configuration
- **Color Palette** defined in `globals.css` CSS variables:
  - Earth tones: `earth-{25-950}` (browns/beiges)
  - Nature tones: `nature-{25-950}` (greens)
  - Sage tones: `sage-{25-950}` (muted greens)
  - Accent colors: `accent-{50-900}` (warm orange-browns)
- **Utility function** `cn()` from `/Users/vssnake/pagina/ecoturismo-web/src/lib/utils/cn.ts` combines `clsx` and `tailwind-merge` for conditional class merging
- **Framer Motion** for animations throughout the site

### For This Implementation: What Needs to Connect

**1. Navigation Component Refactoring:**

The `navigationItems` array in Navigation.tsx needs to be transformed from Next.js routing links to hash-based anchor links. The new structure should be:

```typescript
const navigationItems = [
  { name: t('home'), href: '#hero' },  // Scroll to top/hero
  { name: t('accommodations'), href: '#accommodations' },  // NEW - scroll to accommodations section
  { name: t('location'), href: '#location' },  // NEW - scroll to location section
  { name: t('contact'), href: '#contact', highlight: true },  // NEW - scroll to contact/CTA section
];
```

This requires:
- Adding new translation keys for "accommodations" and "location" in both en.json and es.json
- Removing the obsolete `laCasita`, `laOlivita`, and `activities` keys
- Updating the component to use hash links instead of Next.js routing

**2. Section ID Implementation:**

The page.tsx file needs ID attributes added to enable anchor scrolling:

- Hero section: Add `id="hero"` or handle scroll-to-top
- AccommodationsShowcase section: Add `id="accommodations"` wrapper
- LocationSection: Add `id="location"` wrapper or update component to include ID
- Final CTA section: Add `id="contact"` wrapper

**3. Header/Navigation Color Integration:**

The Navigation component needs to receive and respond to scroll state to fix text visibility. Two approaches are possible:

**Approach A (Props Drilling):** Pass `isScrolled` state from Header to Navigation as a prop, then conditionally apply text colors:
- When NOT scrolled (transparent header over hero): Use `text-white` or `text-earth-100` for visibility
- When scrolled (white background): Use existing `text-earth-700` colors

**Approach B (Context or Shared Hook):** Create a shared scroll detection hook or context that both Header and Navigation can consume independently.

The mobile menu button and navigation items need the same treatment. Example conditional classes:
```typescript
className={cn(
  'transition-colors',
  isScrolled ? 'text-earth-700' : 'text-white'
)}
```

**4. Link Component Selection:**

Since these will be hash-based anchors on the same page, we should replace Next.js `<Link>` components with native `<a>` tags with smooth scroll handlers, or keep `<Link>` but with hash hrefs. The Hero component already demonstrates the pattern:

```typescript
const handleClick = (e: React.MouseEvent) => {
  e.preventDefault();
  const element = document.querySelector(href);
  element?.scrollIntoView({ behavior: 'smooth' });
};
```

This ensures smooth scrolling even if the global CSS smooth scroll is disabled by user preferences.

**5. Footer Component Updates:**

The Footer component currently has the same navigation structure and will need matching updates:
- Remove links to `/la-casita`, `/la-olivita`, `/activities`
- Update to use hash anchors or potentially keep a simplified footer navigation
- Update the "Contact Emma" button from `/contact` route to `#contact` anchor or direct communication links (phone/WhatsApp)

**6. Mobile Menu Behavior:**

The mobile menu already has logic to close when pathname changes (Navigation.tsx lines 39-41). With hash navigation, we need to ensure the menu closes when a hash link is clicked. The current implementation:

```typescript
useEffect(() => {
  setMobileMenuOpen(false);
}, [pathname]);
```

This won't fire for hash changes within the same page. We'll need to add an `onClick` handler to close the menu manually when navigation items are clicked (similar to what's already done on line 151 for mobile links).

**7. Active State Management:**

The current navigation uses `pathname === item.href` to determine active state (lines 48, 133). With hash-based navigation, we'll need to implement scroll-based active state detection - tracking which section is currently in the viewport. This could use:
- Intersection Observer API to detect which section is visible
- Scroll position calculations to determine the current section
- Or simply remove active state indicators for hash links

**8. Accessibility Considerations:**

- Ensure aria-labels are appropriate for anchor links vs route links
- Maintain keyboard navigation support
- Update focus management for hash navigation
- Test with screen readers

### Technical Reference Details

#### Component Files to Modify

**Primary Files:**
- `/Users/vssnake/pagina/ecoturismo-web/src/components/layout/Navigation.tsx` - Main navigation logic and UI
- `/Users/vssnake/pagina/ecoturismo-web/src/components/layout/Header.tsx` - Add scroll state passing or refactor
- `/Users/vssnake/pagina/ecoturismo-web/src/app/page.tsx` - Add section IDs
- `/Users/vssnake/pagina/ecoturismo-web/src/components/layout/Footer.tsx` - Update footer navigation links

**Translation Files:**
- `/Users/vssnake/pagina/ecoturismo-web/messages/en.json` - Add/update navigation keys
- `/Users/vssnake/pagina/ecoturismo-web/messages/es.json` - Add/update navigation keys

**Potentially Affected:**
- `/Users/vssnake/pagina/ecoturismo-web/src/components/sections/AccommodationsShowcase.tsx` - May need ID wrapper
- `/Users/vssnake/pagina/ecoturismo-web/src/components/sections/LocationSection.tsx` - May need ID wrapper

#### Key Dependencies

```json
{
  "next": "15.5.5",
  "next-intl": "^4.3.12",
  "framer-motion": "^12.23.24",
  "lucide-react": "^0.545.0",
  "tailwind-merge": "^3.3.1",
  "clsx": "^2.1.1"
}
```

#### Color Variables for Text Visibility

From `/Users/vssnake/pagina/ecoturismo-web/src/app/globals.css`:

**Light colors (for transparent header over dark hero):**
- `text-white` - Pure white
- `text-earth-100` - `#f5f0ea` Very light beige (currently used for brand subtitle)
- `text-nature-100` - `#e9f4ea` Very light green

**Dark colors (for scrolled white header):**
- `text-earth-700` - `#5c4a37` Dark brown (currently used)
- `text-nature-700` - `#2d5834` Dark green

#### Helper Utility

```typescript
// /Users/vssnake/pagina/ecoturismo-web/src/lib/utils/cn.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Use this for all conditional className logic to prevent Tailwind class conflicts.

#### Smooth Scroll Pattern (from Hero.tsx)

```typescript
const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
  e.preventDefault();
  const element = document.querySelector(sectionId);
  element?.scrollIntoView({ behavior: 'smooth' });
};

// Usage:
<a href="#accommodations" onClick={(e) => scrollToSection(e, '#accommodations')}>
  Accommodations
</a>
```

#### Section IDs to Add

Suggested ID naming convention (matching existing `#content` pattern):

```tsx
// In page.tsx:
<section id="hero">...</section>  // Hero component or wrapper
<section id="content">...</section>  // Already exists
<section id="accommodations">...</section>  // Wrap AccommodationsShowcase
<section id="location">...</section>  // Wrap LocationSection
<section id="contact">...</section>  // Wrap final CTA section
```

## User Notes
<!-- Any specific notes or requirements from the developer -->

## Work Log
<!-- Updated as work progresses -->
- [2025-10-17] Task created
