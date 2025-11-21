# Documentation - Finca Emmita

This folder contains the technical documentation for the project.

## 📚 Available Documents

### 1️⃣ [Image System](./01-images.md) 🔧

**Priority: Essential** - Complete guide to the automatic image management system.

**Includes**:

- How to add/change photos
- Folder structure
- Best practices
- Troubleshooting

> 💡 **Start here** if you need to add or modify images on the website.

---

### 2️⃣ [Roadmap](./02-roadmap.md) 🗺️

**Priority: Planning** - Planning for future features and website improvements.

**Includes**:

- Admin panel
- Calendar synchronization (Airbnb/Alohacamp)
- Complete booking system
- UX and SEO improvements
- Phased prioritization

> 📋 **Review this** to understand upcoming features and project direction.

---

## 🏗️ Project Architecture

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel

### Folder Structure

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── [locale]/          # Internationalized routes
│   └── globals.css        # Global styles
├── components/
│   └── ui/                # Reusable components
├── data/                  # Static data (accommodations, etc.)
├── lib/
│   ├── pricing/           # Pricing logic
│   └── types.ts           # Global TypeScript types
├── hooks/                 # Custom React hooks
└── assets/                # Images and resources
```

### Pricing System

The pricing system is implemented with a modular architecture:

- **`lib/pricing/types.ts`**: TypeScript types
- **`lib/pricing/dateUtils.ts`**: Utilities for date classification
- **`lib/pricing/calculateBookingPrice.ts`**: Calculation logic
- **`hooks/useBookingPrice.ts`**: Reactive hook for UI

**Features**:

- Pricing by day type (weekday, weekend, high season)
- Pet fee calculation (€10/pet/stay)
- Cleaning fee included
- Detailed breakdown in UI

---

## 🚀 Useful Commands

```bash
# Development
npm run dev

# Build
npm run build

# Validate translations
npm run validate:translations

# Scan images
npm run scan-images

# Lint
npm run lint
```

---

## 📝 Contributing

If you're adding new features, please:

1. Check the [Roadmap](./roadmap.md) to see if it's already planned
2. Maintain the modular architecture
3. Add translations in both Spanish and English
4. Document significant changes here

---

**Last updated**: November 20, 2025
