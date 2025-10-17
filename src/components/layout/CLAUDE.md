# Layout Components Documentation

This directory contains the core layout components for the application.

## Navigation System Architecture

The application uses a **single-page architecture** with hash-based navigation instead of Next.js routing.

### Component Relationships

```
Header (scroll detection)
  └─> Navigation (receives isScrolled prop)
        ├─> Desktop nav items (hash links with smooth scroll)
        ├─> Mobile menu button
        └─> Mobile menu overlay (full-screen)

Footer
  └─> Navigation links (hash anchors, same pattern as Navigation)

Page (src/app/page.tsx)
  └─> Sections with IDs: #hero, #accommodations, #location, #contact
```

### Header Component

**Location**: `src/components/layout/Header.tsx`

**Responsibilities**:
- Detects scroll position using `window.addEventListener('scroll', handleScroll)`
- Maintains `isScrolled` state (boolean, triggers at scrollY > 20px)
- Passes `isScrolled` to Navigation component
- Adapts visual styling: transparent background when at top, white/blurred when scrolled
- Brand text colors: white when transparent, earth/nature tones when scrolled

**Key Implementation**:
- useEffect hook for scroll listener with cleanup
- cn() utility for conditional Tailwind classes

### Navigation Component

**Location**: `src/components/layout/Navigation.tsx`

**Props**:
- `isScrolled: boolean` - Received from Header, controls color scheme

**State Management**:
- `mobileMenuOpen: boolean` - Mobile menu visibility
- `activeSection: string` - Currently visible section ID (detected by Intersection Observer)

**Navigation Items**:
```typescript
[
  { name: t('home'), href: '#hero' },
  { name: t('accommodations'), href: '#accommodations' },
  { name: t('location'), href: '#location' },
  { name: t('contact'), href: '#contact' }
]
```

**Core Features**:

1. **Hash-based Navigation**:
   - Uses `<a>` tags with href="#section-id"
   - onClick handler: preventDefault + scrollIntoView + window.history.pushState
   - Smooth scroll behavior
   - URL updates for deep linking support

2. **Active Section Detection**:
   - Intersection Observer API with rootMargin: '-50% 0px -50% 0px'
   - Detects which section is centered in viewport
   - Updates `activeSection` state automatically
   - Initial hash detection on mount

3. **Adaptive Styling**:
   - Text colors: white (transparent header) / dark (scrolled header)
   - Active indicator: animated underline with Framer Motion layoutId="activeTab"
   - Background colors for active state adapt to isScrolled

4. **Accessibility**:
   - Focus management: target element receives focus after scroll
   - Keyboard navigation fully supported
   - ARIA labels on mobile menu button (aria-label, aria-expanded)
   - Error handling with console.error in development

5. **Mobile Menu**:
   - Full-screen overlay with slide-in animation (Framer Motion)
   - Backdrop with blur effect
   - Auto-close on navigation
   - Body scroll prevention when open
   - Contact info footer with phone/email links
   - Language switcher integration

**Memory Management**:
- Intersection Observer cleanup: unobserve all sections + disconnect()
- Scroll prevention cleanup: restore body overflow
- All useEffect hooks include cleanup functions

### Footer Component

**Location**: `src/components/layout/Footer.tsx`

**Navigation Implementation**:
- All navigation links converted to hash anchors
- Smooth scroll pattern matches Navigation component
- Each link has onClick handler: preventDefault + querySelector + scrollIntoView + history.pushState
- Maintains consistency with main navigation system

### Page Structure

**Location**: `src/app/page.tsx`

**Section IDs**:
- `<section id="hero">` - Hero carousel with CTA
- `<section id="accommodations">` - Accommodations showcase
- `<section id="location">` - Location information with map
- `<section id="contact">` - Contact CTA with phone/WhatsApp

These IDs are the anchors for all hash-based navigation.

## Translation Keys

Navigation uses next-intl for i18n. Translation keys are stored in `/messages/en.json` and `/messages/es.json`.

**Navigation namespace** contains all navigation-related text:
- `home`, `accommodations`, `location`, `contact` - Main navigation links
- `menu`, `closeMenu` - Mobile menu controls
- `contactEmma` - Contact CTA

**Language switcher** uses the `language` namespace:
- `language.active` - "Active" badge shown on currently selected language

For comprehensive i18n documentation, see `/src/i18n/CLAUDE.md`.

## Technical Patterns

### Scroll Handler Pattern
```typescript
// In Header component
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Smooth Scroll Pattern
```typescript
// In Navigation and Footer
const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, '', href);
    
    // Accessibility: focus management
    const targetElement = element as HTMLElement;
    targetElement.setAttribute('tabindex', '-1');
    targetElement.focus();
    
    setMobileMenuOpen(false); // Close mobile menu if open
  }
};
```

### Intersection Observer Pattern
```typescript
// In Navigation component
useEffect(() => {
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  const sections = document.querySelectorAll('section[id]');
  sections.forEach((section) => observer.observe(section));

  return () => {
    sections.forEach((section) => observer.unobserve(section));
    observer.disconnect();
  };
}, []);
```

## Design Decisions

### Why Hash-based Navigation?

1. **Single-page architecture**: All content on one page, no need for separate routes
2. **Performance**: No page reloads, instant navigation
3. **SEO**: Single page easier to optimize than multiple routes
4. **User experience**: Smooth scrolling feels more natural for this content type
5. **Simplicity**: Fewer components, no route management complexity

### Why Intersection Observer?

1. **Automatic detection**: No manual scroll calculations needed
2. **Performance**: Browser-native API, highly optimized
3. **Accuracy**: Always knows which section is visible
4. **Responsive**: Works correctly with any viewport size

### Styling Approach

- **Adaptive colors**: Navigation text must be visible on both transparent (over hero image) and white backgrounds
- **Framer Motion**: Provides smooth, professional animations for active states
- **Tailwind conditional classes**: cn() utility keeps component code clean
- **Design system colors**: Uses project color palette (earth, nature, sage)

## Future Considerations

If the site needs to expand beyond single-page:

1. Consider Next.js App Router for additional pages
2. Keep hash navigation for homepage sections
3. Modify Navigation to support both hash links and route links
4. Update Intersection Observer to only run on homepage

## Related Files

- `/src/components/layout/Header.tsx` - Header with scroll detection
- `/src/components/layout/Navigation.tsx` - Main navigation component
- `/src/components/layout/Footer.tsx` - Footer with navigation links
- `/src/app/page.tsx` - Main page with section IDs
- `/messages/en.json` - English translations
- `/messages/es.json` - Spanish translations
- `/src/lib/utils/cn.ts` - Class name utility
- `/sessions/tasks/m-refactor-remove-page-sections.md` - Implementation task file
