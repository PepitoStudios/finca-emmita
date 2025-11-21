# Finca Emmita - Feature Roadmap

## 🎯 Upcoming Implementations

### 1. Admin Panel

**Priority**: Medium  
**Complexity**: Medium-High

**Description**:
Create a simple admin panel to manage configurations without needing to modify code.

**Features**:

- ✅ High season date management
  - Add/edit/delete high season periods
  - Configure Easter dynamically by year
  - Configure San Juan, Christmas, etc.
- ✅ Pricing management
  - Update prices per accommodation
  - Configure cleaning fees
  - Configure pet pricing
- ✅ Availability management
  - Manually block dates
  - View booking calendar

**Suggested Technology**:

- Firebase (Firestore + Authentication)
- Alternative: Supabase
- Interface: Simple panel with Next.js

**Benefits**:

- Emma can update prices and dates without technical help
- Real-time changes
- Change history

---

### 2. Calendar Synchronization

**Priority**: High  
**Complexity**: High

**Description**:
Integrate Airbnb and Alohacamp calendars to show real-time availability.

**Features**:

- ✅ Airbnb Calendar API integration
  - Import blocked dates
  - Bidirectional sync (optional)
- ✅ Alohacamp integration
  - Import calendar
  - Automatic updates
- ✅ Disable dates in datepicker
  - Show unavailable dates
  - Explanatory message to user
- ✅ Automatic synchronization
  - Webhook or polling every X hours
  - Cache for performance

**Prepared Structure**:

```typescript
// We already have the base in dateUtils.ts
export function getDisabledDates(accommodationId: string): Date[] {
  // Load from DB/API
}
```

**APIs to Investigate**:

- Airbnb iCal feed
- Alohacamp API/iCal
- Google Calendar (optional)

---

### 3. Complete Booking System

**Priority**: Low (Future)  
**Complexity**: Very High

**Description**:
Complete booking system with online payment (currently WhatsApp only).

**Features**:

- ✅ Complete booking form
- ✅ Payment integration (Stripe/PayPal)
- ✅ Automatic email confirmation
- ✅ Booking management in admin panel
- ✅ Automatic invoicing
- ✅ Cancellations and refunds

**Considerations**:

- Requires legal compliance (GDPR, etc.)
- Payment gateway costs
- Customer support

---

### 4. BookingWidget Improvements

**Priority**: Medium  
**Complexity**: Low-Medium

**Pending Features**:

- ✅ Long stay discounts
  - 10% discount for 7+ nights (except high season)
  - Show in price breakdown
- ✅ Improved validations
  - Minimum stay (e.g., 2 nights)
  - Maximum stay
  - Seasonal restrictions
- ✅ Smart suggestions
  - "Add 1 more night and save 10%"
  - Alternative dates if unavailable
- ✅ Accommodation comparison
  - Show price differences
  - Recommendations based on guests/pets

---

### 5. Performance Optimizations

**Priority**: Low  
**Complexity**: Medium

**Features**:

- ✅ Image lazy loading
- ✅ Bundle size optimization
- ✅ Improved server-side rendering
- ✅ Calculated price caching
- ✅ CDN for static assets

---

### 6. Analytics and Metrics

**Priority**: Medium  
**Complexity**: Low

**Features**:

- ✅ Google Analytics 4
- ✅ Conversion tracking
  - "Book" button clicks
  - WhatsApp messages sent
  - Time on page
- ✅ Heatmaps (Hotjar/Microsoft Clarity)
- ✅ Metrics dashboard in admin panel

---

### 7. Enhanced Multilingual

**Priority**: Low  
**Complexity**: Low

**Current Features**:

- ✅ Spanish
- ✅ English

**Future Features**:

- ✅ French
- ✅ German
- ✅ Catalan
- ✅ Automatic language detection
- ✅ Improved language selector

---

### 8. SEO and Marketing

**Priority**: High  
**Complexity**: Low-Medium

**Features**:

- ✅ Integrated blog
  - Articles about the area
  - Recommended activities
  - Sustainable living
- ✅ Enhanced schema markup
  - LocalBusiness
  - LodgingBusiness
  - Reviews
- ✅ Dynamic sitemap
- ✅ Enhanced Open Graph
- ✅ Newsletter

---

### 9. User Experience

**Priority**: Medium  
**Complexity**: Low

**Features**:

- ✅ 360° virtual tour
- ✅ Enhanced photo gallery
  - Filters by accommodation
  - Improved lightbox
- ✅ Verified testimonials
  - Google Reviews integration
  - Airbnb reviews
- ✅ Interactive FAQ
- ✅ Live chat (optional)

---

### 10. Sustainability and Transparency

**Priority**: Medium  
**Complexity**: Low

**Features**:

- ✅ Sustainability dashboard
  - Solar energy generated
  - Rainwater collected
  - CO2 saved
- ✅ Certifications
  - Display eco certificates
  - Awards and recognitions
- ✅ Education
  - How self-sufficiency works
  - Tips for guests

---

## 📊 Recommended Prioritization

### Short Term (1-3 months)

1. Calendar Synchronization (Airbnb/Alohacamp)
2. Analytics and Tracking
3. Basic SEO and Schema markup

### Medium Term (3-6 months)

1. Admin Panel (Firebase/Supabase)
2. BookingWidget improvements (discounts, validations)
3. Blog and content

### Long Term (6+ months)

1. Complete Booking System
2. 360° virtual tour
3. Complete multilingual

---

## 🛠️ Technical Considerations

### Database

**Option 1: Firebase**

- ✅ Pros: Easy setup, real-time, auth included
- ❌ Cons: Vendor lock-in, scalable costs

**Option 2: Supabase**

- ✅ Pros: Open source, PostgreSQL, more control
- ❌ Cons: Requires more configuration

**Recommendation**: Start with Firebase for admin panel MVP

### Hosting and Deployment

- Current: Vercel (Next.js)
- Consider: CDN for images (Cloudinary/Imgix)

### Monitoring

- Sentry for error tracking
- Vercel Analytics for performance

---

## 📝 Notes

- This roadmap is flexible and can be adjusted based on needs
- Priorities may change based on user feedback
- Some features can be implemented in parallel
- Always maintain focus on UX and performance

---

**Last updated**: November 20, 2025  
**Version**: 1.0
