# Ecoturismo Villafeliche - Website

Sitio web moderno para Ecoturismo Villafeliche, un alojamiento rural ecológico en el Delta del Ebro.

## Stack Tecnológico

- **Frontend**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod
- **Iconos**: Lucide React
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
- ✅ Header (sticky con efecto scroll)
- ✅ Navigation (responsive con dropdown menus)
- ✅ Footer (multi-columna con enlaces, contacto, redes sociales)
- ✅ WhatsAppButton (flotante con animaciones)

### Páginas
- ✅ Home (con Hero, secciones de filosofía, CTAs)
- ⏳ Alojamientos (pendiente)
- ⏳ Servicios (pendiente)
- ⏳ Contacto (pendiente)
- ⏳ Delta del Ebro (pendiente)
- ⏳ Retiros de Yoga (pendiente)

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
│   │   │   └── Input.tsx
│   │   ├── layout/            # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── WhatsAppButton.tsx
│   │   ├── sections/          # Secciones de página
│   │   │   └── Hero.tsx
│   │   └── forms/             # Formularios (pendiente)
│   └── lib/
│       ├── utils/             # Utilidades
│       │   └── cn.ts         # Clase merger
│       └── types/             # TypeScript types
│           └── index.ts
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

---

**Ecoturismo Villafeliche**
Teléfono: (+34) 606 39 64 32 | Licencia: PTE-000304
