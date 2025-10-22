# 🚀 Guía Rápida: Agregar Fotos a los Carousels

## ✨ SUPER SIMPLE - Solo 2 pasos

### 1️⃣ Coloca tus fotos en las carpetas
```
src/assets/photos/
├── hero/         ← Carousel principal
├── la-casita/    ← Galería La Casita
├── la-olivita/   ← Galería La Olivita
└── casa-luna/    ← Galería Casa Luna
```

**Nómbralas con números para controlar el orden:**
```
hero/
  01-vista-principal.jpg
  02-atardecer.jpg
  03-piscina.jpg
```

### 2️⃣ Ejecuta el escáner
```bash
npm run scan-images
```

### ¡Listo! ✅

## 💡 Cómo funciona

El sistema es **completamente automático**:

1. **Solo pasas el nombre de la carpeta** → Obtienes todas las fotos
2. Las fotos se ordenan alfabéticamente (por eso usar 01-, 02-)
3. No necesitas importar nada manualmente
4. No necesitas escribir código

### Ejemplo de uso interno

```typescript
// El sistema ya hace esto automáticamente:
import { heroImages, getImagesFromFolder } from './photos';

// heroImages tiene todas las fotos de hero/
// Orden: 01-vista.jpg, 02-atardecer.jpg, 03-piscina.jpg

// O puedes obtener de cualquier carpeta:
const casitaPhotos = getImagesFromFolder('la-casita');
```

## 🔄 Cuando agregues/quites fotos

Simplemente ejecuta de nuevo:
```bash
npm run scan-images
```

## 💡 Tips
- **Orden**: Usa `01-`, `02-`, `03-` al inicio del nombre
- **Tamaño**: Mínimo 1920x1080px
- **Peso**: Comprime antes (TinyPNG) - máx 500KB
- **Formato**: JPG, PNG o WebP
