// Helper utility for migrating external images to use ImageWithFallback
// This script identifies all external images and provides replacement patterns

export const EXTERNAL_IMAGE_PATTERNS = {
  // Readdy.ai API patterns
  readdyApi: /https:\/\/readdy\.ai\/api\/search-image\?[^"'\s)]+/g,
  readdyPublic: /https:\/\/public\.readdy\.ai\/ai\/img_res\/[^"'\s)]+/g,

  // Common external image patterns
  httpsImages: /https:\/\/[^"'\s)]+\.(jpg|jpeg|png|gif|webp|svg)/gi,
};

export const generateImageReplacement = (
  originalSrc: string,
  alt: string,
  className: string = ''
) => {
  return `<ImageWithFallback
    src="${originalSrc}"
    alt="${alt}"
    className="${className}"
    fallbackType="gradient"
    fallbackColor="bg-gradient-to-br from-teal-100 to-amber-100"
    onError={(error) => console.warn('Image failed to load:', error)}
  />`;
};

export const IMAGE_IMPORT_STATEMENT = `import { ImageWithFallback, CardImage, AvatarImage, HeroImage } from '../../components/common/ImageWithFallback';`;

// Common image replacement patterns for different use cases
export const REPLACEMENT_PATTERNS = {
  // Hero images (full width, important)
  hero: (src: string, alt: string) => `<HeroImage
    src="${src}"
    alt="${alt}"
    fallbackColor="bg-gradient-to-br from-teal-600 to-amber-600"
  />`,

  // Card images (rounded corners)
  card: (src: string, alt: string) => `<CardImage
    src="${src}"
    alt="${alt}"
    className="w-full h-48 object-cover"
  />`,

  // Avatar images (circular)
  avatar: (src: string, alt: string) => `<AvatarImage
    src="${src}"
    alt="${alt}"
    className="w-16 h-16"
  />`,

  // Gallery images
  gallery: (src: string, alt: string) => `<ImageWithFallback
    src="${src}"
    alt="${alt}"
    className="w-full h-full object-cover rounded-xl"
    fallbackType="gradient"
    fallbackColor="bg-gradient-to-br from-gray-100 to-gray-200"
  />`,
};

// Files that need image migration
export const FILES_TO_MIGRATE = [
  'src/pages/programs/page.tsx',
  'src/pages/get-involved/page.tsx',
  'src/pages/donate/page.tsx',
  'src/pages/partners/page.tsx',
  'src/pages/planned-giving/page.tsx',
  'src/pages/corporate-sponsorship/page.tsx',
  'src/pages/financial-reports/page.tsx',
  'src/pages/contact/page.tsx',
  'src/pages/about/page.tsx',
  'src/pages/home/page.tsx',
];

// Migration checklist
export const MIGRATION_CHECKLIST = [
  '✅ Import ImageWithFallback component',
  '✅ Replace hero images with HeroImage component',
  '✅ Replace card images with CardImage component',
  '✅ Replace avatar images with AvatarImage component',
  '✅ Add proper alt text for accessibility',
  '✅ Add error handling for failed loads',
  '✅ Test fallback rendering',
  '✅ Verify loading states work correctly',
];
