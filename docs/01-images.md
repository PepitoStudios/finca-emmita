# 📸 Image Management System

Automatic system for managing images in carousels and galleries on the website.

## 🚀 Quick Guide - Just 2 Steps

### 1️⃣ Place your photos in the folders

```
src/assets/photos/
├── hero/         ← Main carousel
├── la-casita/    ← La Casita gallery
├── la-olivita/   ← La Olivita gallery
└── casa-luna/    ← Casa Luna gallery
```

**Name photos with numbers to control the order:**

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

### ✅ Done!

Images will automatically load in the carousels.

---

## 💡 How It Works

The system is **completely automatic**:

1. **Just pass the folder name** → Get all photos
2. Photos are sorted alphabetically (that's why you use 01-, 02-)
3. No need to import anything manually
4. No need to write code

### Internal usage example

```typescript
// The system does this automatically:
import { heroImages, getAccommodationImages } from '@/assets/photos';

// heroImages has all photos from hero/
// Order: 01-view.jpg, 02-sunset.jpg, 03-pool.jpg

// Or you can get from any folder:
const casitaPhotos = getAccommodationImages('la-casita');
```

---

## 📂 Current Integration

### Modified Files

**`src/app/page.tsx`**

- Hero carousel uses `getHeroImages()` automatically
- Loads all photos from `src/assets/photos/hero/`

**`src/data/accommodations.ts`**

- La Casita uses `getAccommodationImages('la-casita')`
- La Olivita uses `getAccommodationImages('la-olivita')`
- Casa Luna uses `getAccommodationImages('casa-luna')`
- Each accommodation loads its photos automatically

### Current Status

| Carousel   | Images | Folder        |
| ---------- | ------ | ------------- |
| Hero       | 7      | `hero/`       |
| La Casita  | 13     | `la-casita/`  |
| La Olivita | 13     | `la-olivita/` |
| Casa Luna  | 16     | `casa-luna/`  |

**Total: 49 images working automatically** ✨

---

## 🔄 Adding or Changing Photos

1. **Place/remove photos** in the corresponding folders
2. **Run**: `npm run scan-images`
3. **Done!** Carousels update automatically

---

## 🎨 Features

- ✅ **Zero configuration**: Just add photos and scan
- ✅ **Alphabetical order**: Use 01-, 02-, 03- in names
- ✅ **Fallback included**: If no photos, uses default images
- ✅ **Fully automatic**: No need to edit code manually
- ✅ **Works in Hero and AccommodationCards**

---

## 💡 Best Practices

### File Names

- **Order**: Use `01-`, `02-`, `03-` at the beginning of the name
- **No special characters**: Avoid accents, ñ, etc.
  - ✅ Correct: `habitacion`, `bano`, `vista-general`
  - ❌ Incorrect: `habitación`, `baño`, `vista general`
- **Only use**: letters (a-z), numbers (0-9), hyphens (-) and underscores (\_)

### Image Specifications

- **Minimum size**: 1920x1080px
- **Maximum weight**: 500KB (compress with TinyPNG)
- **Supported formats**: JPG, PNG, WebP

---

## 📝 Technical Notes

- Images are served from `/public/photos/` (copied during build)
- Manifest is generated in `public/images-manifest.json`
- Components import from `@/assets/photos`
- Support for JPG, PNG, WebP
- Filenames should not contain special characters to ensure compatibility

---

## 🛠️ Troubleshooting

### Images don't appear

1. Verify you ran `npm run scan-images`
2. Check that photos are in the correct folder
3. Make sure names don't have special characters

### Order is incorrect

- Use numeric prefixes: `01-`, `02-`, `03-`
- Photos are sorted alphabetically

### Scan error

- Verify that filenames are valid
- Remove spaces and special characters
- Use only letters, numbers, hyphens and underscores
