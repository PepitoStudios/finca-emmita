import { Testimonial } from '@/lib/types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Sarah & James',
    content: 'Our stay at La Casita was absolutely magical. The peace and quiet was exactly what we needed. Waking up to birdsong and no traffic noise was incredible. Emma is a wonderful host who made us feel so welcome. The self-sufficiency of the finca is impressive - solar power, rainwater collection - it felt good to stay somewhere so eco-friendly.',
    rating: 5,
    source: 'Booking.com',
    accommodationId: 'la-casita',
    featured: true,
  },
  {
    id: '2',
    author: 'Marie',
    content: 'Perfect spot for a digital detox! La Olivita is charming and cozy. The wood burner kept us warm in the evenings. We spent our days hiking in the valley and our nights stargazing - no light pollution at all! Emma gave us great recommendations for local spots. Will definitely come back.',
    rating: 5,
    source: 'Airbnb',
    accommodationId: 'la-olivita',
    featured: true,
  },
  {
    id: '3',
    author: 'Tom & Lisa',
    content: 'What a unique experience! Being completely off-grid but still having all the comforts was amazing. The kids loved exploring the land and we loved the peace. High-speed internet meant I could still work remotely for a few hours. Emma is incredibly knowledgeable about sustainable living.',
    rating: 5,
    source: 'Google Reviews',
    featured: true,
  },
  {
    id: '4',
    author: 'Carlos',
    content: 'Un lugar increíble para desconectar. La finca está en medio de un valle precioso, sin vecinos a la vista. Emma es muy atenta y te hace sentir como en casa. La Casita tiene todo lo necesario y más. Volveremos seguro.',
    rating: 5,
    source: 'Booking.com',
    accommodationId: 'la-casita',
    featured: false,
  },
  {
    id: '5',
    author: 'Anna & Peter',
    content: 'We were looking for somewhere truly peaceful and Finca Emmita exceeded our expectations. The sound of nothing is beautiful! La Olivita is beautifully renovated and the composting toilet is actually really nice. Emma\'s passion for sustainability is inspiring.',
    rating: 5,
    source: 'Airbnb',
    accommodationId: 'la-olivita',
    featured: true,
  },
  {
    id: '6',
    author: 'Julia',
    content: 'Best vacation rental we\'ve ever had. The location is stunning - mountains, valleys, and just 20 minutes from the sea. Emma is the perfect host - helpful but gives you privacy. The solar setup is impressive and worked perfectly even on cloudy days.',
    rating: 5,
    source: 'Google Reviews',
    featured: false,
  },
];

export const featuredTestimonials = testimonials.filter(t => t.featured);
