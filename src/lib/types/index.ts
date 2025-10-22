export interface Accommodation {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  type: 'suite' | 'yurta' | 'observatorio' | 'habitacion';
  capacity: number;
  size: number;
  images: Image[];
  amenities: string[];
  pricing: Pricing;
  featured?: boolean;
  order: number;
}

export interface Image {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Pricing {
  weekday: number;
  weekend: number;
  highSeason: number;
  august?: number;
  cleaning: number;
  pets?: number;
  badge?: {
    color: 'amber' | 'green' | 'blue' | 'purple';
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration?: string;
  image: Image;
  category: string;
  order: number;
}

export interface Testimonial {
  id: string;
  author: string;
  content: string;
  rating: number;
  source: string;
  accommodationId?: string;
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  dates?: {
    checkIn?: string;
    checkOut?: string;
  };
  accommodation?: string;
}

export interface BookingFormData extends ContactFormData {
  guests: number;
  services?: string[];
}
