// Background images for idle screen customization
import mosqueBackground1 from '@/assets/mosque-background-1.jpg';
import mosqueBackground2 from '@/assets/mosque-background-2.jpg';
import bgCelestial from '@/assets/bg-celestial.jpg';
import bgDesert from '@/assets/bg-desert.jpg';
import bgMountains from '@/assets/bg-mountains.jpg';
import bgOcean from '@/assets/bg-ocean.jpg';
import bgParadise from '@/assets/bg-paradise.jpg';
import bgLight from '@/assets/bg-light.jpg';

export type BackgroundCategory = 'mosque' | 'nature' | 'celestial';

export type BackgroundId = 
  | 'mosque-1' 
  | 'mosque-2' 
  | 'celestial' 
  | 'desert' 
  | 'mountains' 
  | 'ocean' 
  | 'paradise' 
  | 'light';

export interface BackgroundOption {
  id: BackgroundId;
  name: string;
  description: string;
  image: string;
  category: BackgroundCategory;
}

export const backgroundOptions: BackgroundOption[] = [
  { 
    id: 'mosque-1', 
    name: 'Grand Mosque', 
    description: 'Serene mosque at dusk', 
    image: mosqueBackground1, 
    category: 'mosque' 
  },
  { 
    id: 'mosque-2', 
    name: 'Mosque Interior', 
    description: 'Beautiful mosque interior', 
    image: mosqueBackground2, 
    category: 'mosque' 
  },
  { 
    id: 'celestial', 
    name: 'Celestial', 
    description: 'Starry night sky', 
    image: bgCelestial, 
    category: 'celestial' 
  },
  { 
    id: 'desert', 
    name: 'Desert', 
    description: 'Golden desert dunes', 
    image: bgDesert, 
    category: 'nature' 
  },
  { 
    id: 'mountains', 
    name: 'Mountains', 
    description: 'Majestic mountain peaks', 
    image: bgMountains, 
    category: 'nature' 
  },
  { 
    id: 'ocean', 
    name: 'Ocean', 
    description: 'Peaceful ocean waves', 
    image: bgOcean, 
    category: 'nature' 
  },
  { 
    id: 'paradise', 
    name: 'Paradise', 
    description: 'Tropical paradise', 
    image: bgParadise, 
    category: 'nature' 
  },
  { 
    id: 'light', 
    name: 'Light', 
    description: 'Soft light theme', 
    image: bgLight, 
    category: 'celestial' 
  },
];

/**
 * Get a background option by its ID
 */
export function getBackgroundById(id: BackgroundId): BackgroundOption | undefined {
  return backgroundOptions.find(bg => bg.id === id);
}

/**
 * Get all backgrounds in a specific category
 */
export function getBackgroundsByCategory(category: BackgroundCategory): BackgroundOption[] {
  return backgroundOptions.filter(bg => bg.category === category);
}

/**
 * Get all available backgrounds
 */
export function getAllBackgrounds(): BackgroundOption[] {
  return backgroundOptions;
}

/**
 * Get the default background
 */
export function getDefaultBackground(): BackgroundOption {
  return backgroundOptions[0];
}
