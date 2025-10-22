# Photos Directory

Este directorio contiene todas las imágenes locales del proyecto.

## Estructura recomendada

# 📸 Gestión Automática de Fotos

## ✨ Sistema dinámico super simple

Solo pasas el nombre de una carpeta y obtienes todas sus imágenes automáticamente.

### 1️⃣ Organiza las fotos por carpeta
```
src/assets/photos/
├── hero/         ← Carousel principal
├── la-casita/    ← Galería La Casita
├── la-olivita/   ← Galería La Olivita
└── casa-luna/    ← Galería Casa Luna
```

### 2️⃣ Nómbralas con números para orden
```
hero/
  01-primera-foto.jpg
  02-segunda-foto.jpg
  03-tercera-foto.jpg
```

### 3️⃣ Escanea las imágenes
```bash
npm run scan-images
```

Esto genera `public/images-manifest.json` con las rutas de todas las imágenes.

### 4️⃣ Úsalas automáticamente

El sistema carga las imágenes desde el manifest:
- No necesitas importar cada imagen
- Solo pasas el nombre de la carpeta
- Las imágenes se devuelven en orden alfabético
- Todo es automático ✨

## 🔄 Workflow

1. Agregar/quitar fotos en las carpetas
2. Ejecutar `npm run scan-images`
3. Las fotos aparecen automáticamente en los carousels

## ⚙️ Cómo funciona

1. El script `scripts/scan-images.js` escanea las carpetas
2. Genera `public/images-manifest.json` con las rutas
3. Crea un symlink `public/photos` → `src/assets/photos`
4. Las imágenes se sirven como `/photos/hero/01-foto.jpg`
5. `index.ts` lee el manifest y devuelve las URLs

## 💡 Recomendaciones
- **Tamaño**: Mínimo 1920x1080px
- **Peso**: Máximo 500KB (comprime con TinyPNG)
- **Nombres**: `01-descriptivo.jpg`, `02-otro.jpg`
- **Formato**: JPG (fotos), PNG (gráficos), WebP (mejor compresión)

## Cómo agregar imágenes

### 1. Organiza tus fotos
Coloca tus imágenes en las subcarpetas correspondientes según el alojamiento.

### 2. Importa en index.ts
Edita `/src/assets/photos/index.ts` y agrega los imports:

```typescript
// Hero images
import hero1 from './hero/hero-1.jpg';
import hero2 from './hero/hero-2.jpg';

// La Casita
import casitaExt1 from './la-casita/exterior-1.jpg';
import casitaInt1 from './la-casita/interior-living.jpg';

// Actualiza los objetos de configuración
export const heroImages = [
  { src: hero1, alt: 'Finca Emmita - Vista panorámica' },
  { src: hero2, alt: 'Finca Emmita - Atardecer' },
];

export const accommodationImages = {
  'la-casita': [
    { src: casitaExt1, alt: 'La Casita - Exterior' },
    { src: casitaInt1, alt: 'La Casita - Salón' },
  ],
  // ...
};
```

### 3. Next.js optimizará automáticamente
Next.js optimiza las imágenes importadas automáticamente, generando versiones WebP y responsive.

## Formatos recomendados

- **Formato**: JPG para fotos, PNG para gráficos
- **Tamaño**: Mínimo 1920x1080px para hero, 1200x900px para galerías
- **Peso**: Máximo 2MB por imagen (idealmente < 500KB)
- **Nombres**: Descriptivos, en minúsculas, con guiones

## Optimización

Las imágenes se optimizan automáticamente por Next.js, pero para mejores resultados:
- Usa herramientas como TinyPNG o Squoosh antes de subirlas
- Mantén un aspect ratio consistente (16:9 o 4:3)
- Considera usar WebP para mejor compresión
