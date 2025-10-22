import { Accommodation } from '@/lib/types';
import { getAccommodationImages } from '@/assets/photos';

// Load images automatically
const casitaImages = getAccommodationImages('la-casita');
const olivitaImages = getAccommodationImages('la-olivita');
const lunaImages = getAccommodationImages('casa-luna');

export const accommodations: Accommodation[] = [
  {
    id: 'la-casita',
    title: 'La Casita',
    slug: 'la-casita',
    shortDescription:
      'Newly built log cabin with well-equipped kitchen, living room with sofa bed, and private terrace.',
    longDescription: `The Casita is newly built log cabin and offers a well-equipped small kitchen, a living room with a sofa bed and a pellet stove, a separated double bedroom. The bathroom has a large shower. There is a nice terrace with a table and chairs, sunloungers.`,
    type: 'habitacion',
    capacity: 2,
    size: 30,
    images: casitaImages.length > 0 ? casitaImages : [
      {
        url: 'https://static.wixstatic.com/media/922666_1dfe8c983bb940a3b142055475d3724d~mv2.jpg/v1/fill/w_1200,h_900,q_90/922666_1dfe8c983bb940a3b142055475d3724d~mv2.jpg',
        alt: 'La Casita - Log cabin exterior with terrace',
        width: 1200,
        height: 900,
      },
    ],
    amenities: [
      'Well-equipped kitchen',
      'Living room with sofa bed',
      'Pellet stove',
      'Separated double bedroom',
      'Towels and bedding provided',
      'Large shower',
      'Private terrace',
      'Table and chairs',
      'Sunloungers',
      'Free WiFi',
      'Pets allowed',
    ],
    pricing: {
      weekday: 80, // Sunday to Thursday
      weekend: 85, // Friday and Saturday
      highSeason: 95, // July, August, Christmas, Easter
      cleaning: 35,
      pets: 10,
    },
    featured: true,
    order: 1,
  },
  {
    id: 'la-olivita',
    title: 'La Olivita',
    slug: 'la-olivita',
    shortDescription:
      'Newly renovated with mezzanine sleeping loft, wood burner, and terrace with BBQ.',
    longDescription: `The Olivita is newly renovated and offers a well-equipped small kitchen, a living room with a sofa bed and a wood burner, the mezzanine sleeping loft has a double bed and is accessible by stairs. The bathroom has a large shower and a composting toilet. There is a nice terrace with a table and chairs, sunloungers and BBQ (not used from June to September due fire risks and it is replaced by a plancha)`,
    type: 'habitacion',
    capacity: 2,
    size: 25,
    images: olivitaImages.length > 0 ? olivitaImages : [
      {
        url: 'https://static.wixstatic.com/media/922666_61d6eb7d424c425e80d1cd6b51f0be98~mv2.jpg/v1/fill/w_1200,h_900,q_90/922666_61d6eb7d424c425e80d1cd6b51f0be98~mv2.jpg',
        alt: 'La Olivita - Exterior view with terrace',
        width: 1200,
        height: 900,
      },
    ],
    amenities: [
      'Well-equipped kitchen',
      'Living room with sofa bed',
      'Wood burner',
      'Mezzanine sleeping loft (double bed)',
      'Towels and bedding provided',
      'Accessible by stairs',
      'Large shower',
      'Private terrace',
      'BBQ / Plancha',
      'Table and chairs',
      'Sunloungers',
      'Free WiFi',
      'Pets allowed',
    ],
    pricing: {
      weekday: 85,
      weekend: 90,
      highSeason: 100,
      cleaning: 35,
      pets: 10,
    },
    featured: true,
    order: 2,
  },
  {
    id: 'casa-luna',
    title: 'Casa Luna',
    slug: 'casa-luna',
    shortDescription:
      'Eco-friendly wooden house with 2 bedrooms, 2 bathrooms, shared pool, and stunning valley views.',
    longDescription: `Casa Luna is a peaceful retreat nestled between valleys and mountains. This eco-friendly wooden house, built 20 years ago, is completely self-sufficient with solar energy and rainwater collection. With 2 bedrooms and 2 bathrooms, it can accommodate up to 4 guests. Enjoy the shared pool (June-September), outdoor terrace with grill, and the company of friendly resident animals. Located 10 minutes from El Perelló and 20 minutes from the sea, accessible via a scenic dirt road.`,
    type: 'habitacion',
    capacity: 4,
    size: 65,
    images: lunaImages.length > 0 ? lunaImages : [
      {
        url: 'https://img.alohacamp.com/s4eAvzDotIWtmrzej48Z627rS223BCDg5_XPCNkrrzM/resize:fit:1920:1246/enlarge:1/czM6Ly9hbG9oYS5pbWFnZXMvcHJvcGVydGllcy81N2FiNDVjZDA1ZWY1OTg2YjQ1OWVhMTdkOWQxNjRjNmJiOTUzNjU5LmpwZw',
        alt: 'Casa Luna - Exterior view with valley backdrop',
        width: 1200,
        height: 900,
      },
    ],
    amenities: [
      '2 bedrooms',
      '2 bathrooms (one with composting toilet)',
      'Towels and bedding provided',
      'Well-equipped kitchen',
      'Fireplace',
      'Outdoor terrace',
      'Grill',
      'High-speed WiFi',
      'Child-friendly (mini-crib available)',
      'Pets allowed',
    ],
    pricing: {
      weekday: 95, // Sunday to Thursday
      weekend: 110, // Friday and Saturday
      highSeason: 120, // July, August, Christmas, Easter
      cleaning: 50,
      pets: 10,
    },
    featured: true,
    order: 3,
  },
];

export const accommodationNotes = {
  cleaningFee: 35,
  discount7Nights: 10, // 10% discount for 7 nights (except high season)
  checkIn: '15:00',
  checkOut: '11:00',
  petsPolicy: 'Pets travel for free',
  highSeasonMonths: 'July, August, Christmas and Easter',
};
