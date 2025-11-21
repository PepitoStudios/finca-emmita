# Ecoturismo Villafeliche - Website

Sitio web moderno para Ecoturismo Villafeliche, un alojamiento rural ecológico en el Delta del Ebro.

## Stack Tecnológico

- **Frontend**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod
- **Iconos**: Lucide React
- **i18n**: next-intl v4.3.12 (English/Spanish)
- **Hosting**: Vercel (recomendado)

## Características Implementadas ✅

### FASE 1 - Setup Base

- ✅ Proyecto Next.js 15 con TypeScript
- ✅ Tailwind CSS v4 con tema personalizado (colores naturales)
- ✅ ESLint y Prettier configurados
- ✅ Estructura de carpetas organizada
- ✅ Dependencias instaladas (Framer Motion, React Hook Form, Lucide)

### Componentes UI Base

- ✅ Button (múltiples variantes, estados de loading)
- ✅ Card (con sub-componentes Header, Title, Description, Content, Footer)
- ✅ Input (con validación y errores)

### Layout Components

- ✅ Header (sticky con efecto scroll, pasa estado isScrolled a Navigation)
- ✅ Navigation (hash-based con smooth scroll, Intersection Observer, responsive mobile menu)
- ✅ Footer (multi-columna con enlaces hash, contacto, redes sociales)
- ✅ WhatsAppButton (flotante con animaciones)
- ✅ LanguageSwitcher (desktop/mobile, cookie-based locale storage)

### Arquitectura de Navegación

- ✅ Single-page application con secciones (#hero, #accommodations, #location, #contact)
- ✅ Hash-based anchors con smooth scrolling
- ✅ Intersection Observer para detección de sección activa
- ✅ Colores adaptativos según estado de scroll (blanco cuando transparente, oscuro cuando scrolled)
- ✅ Soporte para deep linking con URL hash
- ✅ Gestión de foco para accesibilidad y navegación por teclado

### Páginas

- ✅ Home (single-page con secciones Hero, Accommodations, Location, Contact)
- ⏳ Páginas adicionales (si se necesitan en el futuro)

## Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Estructura del Proyecto

```
ecoturismo-web/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Estilos globales + tema
│   ├── components/
│   │   ├── ui/                # Componentes UI base
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── AccommodationCard.tsx
│   │   ├── layout/            # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── WhatsAppButton.tsx
│   │   ├── sections/          # Secciones de página
│   │   │   ├── Hero.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── LocationSection.tsx
│   │   └── forms/             # Formularios (pendiente)
│   ├── i18n/                  # Internationalization
│   │   ├── config.ts          # Locale configuration
│   │   ├── locale.ts          # Server actions
│   │   └── CLAUDE.md          # i18n documentation
│   ├── data/                  # Data files
│   │   ├── accommodations.ts  # Accommodation data
│   │   ├── testimonials.ts    # Testimonials data
│   │   └── content.ts         # Site content
│   └── lib/
│       ├── utils/             # Utilidades
│       │   └── cn.ts         # Clase merger
│       └── types/             # TypeScript types
│           └── index.ts
├── messages/                  # Translation files
│   ├── en.json               # English translations
│   └── es.json               # Spanish translations
├── public/                    # Assets estáticos
└── package.json
```

## Tema de Colores

El sitio usa una paleta natural inspirada en el ecosistema del Delta del Ebro:

- **Earth** (tonos tierra): Marrones cálidos (#9d7a58, etc.)
- **Nature** (tonos verdes): Verdes naturales (#4a9456, etc.)
- **Sage** (tonos salvia): Verde-gris suave (#6d8869, etc.)
- **Accent** (acento): Dorado/caramelo (#c89465)

Todos los colores están disponibles en Tailwind con escalas de 50-900.

## Arquitectura del Sistema de Navegación

Este proyecto implementa una arquitectura de **single-page application (SPA)** con navegación basada en hash anchors:

### Componentes Clave

**Header** (`src/components/layout/Header.tsx`)

- Detecta el estado de scroll (isScrolled) mediante window scroll events
- Pasa isScrolled como prop al componente Navigation
- Adapta colores del branding según estado de scroll

**Navigation** (`src/components/layout/Navigation.tsx`)

- Navegación hash-based con smooth scrolling (#hero, #accommodations, #location, #contact)
- Usa Intersection Observer API para detectar la sección activa visible
- Colores adaptativos: blanco cuando header transparente, oscuro cuando scrolled
- Indicador animado de sección activa con Framer Motion
- Mobile menu: overlay full-screen con animaciones slide-in
- Gestión de foco para accesibilidad (focus management en elementos target)
- Soporte para deep linking: detecta URL hash inicial
- Cleanup apropiado: disconnect() en Intersection Observer

**Footer** (`src/components/layout/Footer.tsx`)

- Enlaces de navegación convertidos a hash anchors
- Smooth scroll handlers con window.history.pushState para actualizar URL
- Mantiene consistencia con el sistema de navegación principal

**Page** (`src/app/page.tsx`)

- Secciones con IDs correspondientes: hero, accommodations, location, contact
- Los IDs permiten la navegación hash y detección por Intersection Observer

### Características de Accesibilidad

- Focus management: elementos target reciben focus después de scroll
- Keyboard navigation: navegación completa por teclado
- ARIA labels: botones de menu con labels descriptivos
- Error handling: console.error en development si sección no existe
- Mobile UX: cierre automático del menu al navegar, prevención de scroll del body

### Patrones Técnicos

- **State management**: useState para activeSection y mobileMenuOpen
- **Side effects**: useEffect para scroll listeners y Intersection Observer
- **Event handlers**: preventDefault + scrollIntoView + history.pushState
- **Conditional styling**: cn() utility para clases condicionales basadas en isScrolled
- **Memory management**: cleanup functions en todos los useEffect
- **Animation**: Framer Motion para active indicators y mobile menu transitions

Referencia de archivos modificados en tarea `m-refactor-remove-page-sections.md`

## Sistema de Internacionalización (i18n)

Este proyecto es completamente bilingüe (English/Spanish) usando **next-intl**:

### Características

- **Cookie-based locale selection**: La preferencia de idioma se guarda en cookie `NEXT_LOCALE`
- **Browser language detection**: Detecta automáticamente el idioma del navegador
- **Translation files**: `/messages/en.json` y `/messages/es.json` con estructura jerárquica
- **Component patterns**:
  - `useTranslations()` para client components
  - `getTranslations()` para server components
  - `t.raw()` para objetos complejos (arrays, nested objects)
- **Dynamic key lookup**: Helper `idToTranslationKey()` para contenido dinámico
- **Data separation**: Contenido traducible en `/messages`, datos agnósticos en `/src/data`

### Patrones Implementados

**AccommodationCard**: Usa `t.raw()` para amenities y `idToTranslationKey()` para lookup dinámico
**TestimonialsSection**: Array de testimonios completo en translation files
**LocationSection**: Tiempos de viaje e información de ubicación traducida
**LanguageSwitcher**: Badge "Active"/"Activo" usando `t('language.active')`

### Documentación Completa

Ver `/src/i18n/CLAUDE.md` para documentación detallada del sistema i18n, incluyendo:

- Arquitectura y flujo de detección de locale
- Estructura de archivos de traducción
- Patrones de implementación por tipo de componente
- Estrategia de separación de datos
- Mejores prácticas y limitaciones conocidas

## Próximos Pasos

1. **Páginas de Alojamientos**
   - Suite Premium
   - Yurta Mongola
   - Observatorio Ornitológico
   - Habitación Doble

2. **Componentes Adicionales**
   - ImageGallery con lightbox
   - TestimonialSlider
   - ServiceCard
   - AccommodationCard
   - ContactForm
   - BookingForm

3. **Funcionalidades**
   - Sistema de reservas
   - Integración con email (Resend)
   - Google Maps
   - Galería de imágenes
   - Blog sobre Delta del Ebro

4. **Optimizaciones**
   - Image optimization
   - SEO (structured data)
   - Performance (Lighthouse 90+)
   - Accessibility audit

5. **CMS Integration** (Fase posterior)
   - Sanity CMS setup
   - Schemas para contenido

## Deploy en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Este proyecto está optimizado para [Vercel Platform](https://vercel.com).

## 📚 Documentación

Para más información sobre la arquitectura del proyecto y futuras features:

- **[Documentación Técnica](./docs/README.md)** - Arquitectura, stack tecnológico, comandos útiles
- **[Roadmap](./docs/roadmap.md)** - Planificación de futuras features y mejoras

---

**Ecoturismo Villafeliche**
Teléfono: (+34) 606 39 64 32 | Licencia: PTE-000304
