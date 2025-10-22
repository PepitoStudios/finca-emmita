/**
 * Automatic image loading system
 * 
 * SUPER SIMPLE:
 * 1. Place your photos in the folders
 * 2. Name them with numbers: 01-photo.jpg, 02-photo.jpg
 * 3. Run: npm run scan-images
 * 4. Done! Images load automatically
 */

interface ImageData {
  url: string;
  alt: string;
}

// Import the automatically generated manifest
import imagesManifest from '../../../public/images-manifest.json';

function pathsToImages(paths: string[]): ImageData[] {
  return paths.map(url => ({ url, alt: '' }));
}

export const heroImages: ImageData[] = pathsToImages(imagesManifest.hero || []);

const casitaImages: ImageData[] = pathsToImages(imagesManifest['la-casita'] || []);
const olivitaImages: ImageData[] = pathsToImages(imagesManifest['la-olivita'] || []);
const lunaImages: ImageData[] = pathsToImages(imagesManifest['casa-luna'] || []);

export const accommodationImages = {
  'la-casita': casitaImages,
  'la-olivita': olivitaImages,
  'casa-luna': lunaImages,
};

export function getAccommodationImages(accommodationId: string): ImageData[] {
  return accommodationImages[accommodationId as keyof typeof accommodationImages] || [];
}

export function getHeroImages(): ImageData[] {
  return heroImages;
}

export function getImagesFromFolder(folderName: keyof typeof imagesManifest): ImageData[] {
  return pathsToImages(imagesManifest[folderName] || []);
}
