# 🚀 Quick Guide: Adding Photos to Carousels

## ✨ SUPER SIMPLE - Just 2 steps

### 1️⃣ Place your photos in the folders
```
src/assets/photos/
├── hero/         ← Main carousel
├── la-casita/    ← La Casita gallery
├── la-olivita/   ← La Olivita gallery
└── casa-luna/    ← Casa Luna gallery
```

**Name them with numbers to control the order:**
```
hero/
  01-main-view.jpg
  02-sunset.jpg
  03-pool.jpg
```

### 2️⃣ Run the scanner
```bash
npm run scan-images
```

### Done! ✅

## 💡 How it works

The system is **completely automatic**:

1. **Just pass the folder name** → Get all photos
2. Photos are sorted alphabetically (that's why you use 01-, 02-)
3. No need to import anything manually
4. No need to write code

### Internal usage example

```typescript
// The system does this automatically:
import { heroImages, getImagesFromFolder } from './photos';

// heroImages has all photos from hero/
// Order: 01-view.jpg, 02-sunset.jpg, 03-pool.jpg

// Or you can get from any folder:
const casitaPhotos = getImagesFromFolder('la-casita');
```

## 🔄 When you add/remove photos

Simply run again:
```bash
npm run scan-images
```

## 💡 Tips
- **Order**: Use `01-`, `02-`, `03-` at the beginning of the name
- **Size**: Minimum 1920x1080px
- **Weight**: Compress beforehand (TinyPNG) - max 500KB
- **Format**: JPG, PNG or WebP
- **⚠️ Important**: Avoid special characters (accents, ñ, etc.) in filenames. Use only letters (a-z), numbers (0-9), hyphens (-) and underscores (_). Example: use `habitacion` instead of `habitación`, `bano` instead of `baño`.
