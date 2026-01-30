// Image optimization utilities
export const CRITICAL_IMAGES = [
  'https://public.readdy.ai/ai/img_res/3cc681e6458229e2005588fa41cbc6a6.jpg',
  'https://readdy.ai/api/search-image?query=Ugandan%20school%20children%20in%20clean%20uniforms%20with%20new%20textbooks%20and%20school%20supplies%20on%20wooden%20desk%2C%20bright%20classroom%20setting%2C%20natural%20lighting%2C%20authentic%20African%20educational%20materials%20including%20notebooks%20pencils%20and%20rulers%2C%20warm%20hopeful%20atmosphere%2C%20close-up%20documentary%20style%20photography%20showing%20details%20of%20scholastic%20materials&width=600&height=800&seq=program-education-001&orientation=portrait',
  'https://readdy.ai/api/search-image?query=vibrant%20charity%20run%20event%20in%20Uganda%20with%20diverse%20participants%20running%20together%20wearing%20colorful%20athletic%20wear%20and%20event%20t-shirts%2C%20energetic%20atmosphere%2C%20community%20gathering%2C%20outdoor%20setting%20with%20Ugandan%20landscape%2C%20action%20photography%20capturing%20movement%20and%20joy%2C%20people%20of%20all%20ages%20participating%20in%20fundraising%20marathon&width=600&height=800&seq=program-events-001&orientation=portrait',
];

// Image breakpoints for responsive design
export const IMAGE_BREAKPOINTS = [320, 640, 768, 1024, 1280, 1536];

// Preload critical images
export async function preloadCriticalImages() {
  // Simple preloading without hook usage
  const promises = CRITICAL_IMAGES.map(src => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    console.warn('Failed to preload critical images:', error);
  }
}

// Generate responsive srcset
export function generateSrcSet(
  src: string,
  breakpoints: number[] = IMAGE_BREAKPOINTS
): string {
  return breakpoints
    .map(breakpoint => {
      const optimizedSrc = `${src}&w=${breakpoint}&q=75&fm=webp`;
      return `${optimizedSrc} ${breakpoint}w`;
    })
    .join(', ');
}

// Generate sizes attribute for responsive images
export function generateSizes(
  breakpoints: number[] = IMAGE_BREAKPOINTS
): string {
  return breakpoints
    .map((breakpoint, index) => {
      if (index === 0) return `(max-width: ${breakpoint}px) 100vw`;
      if (index === breakpoints.length - 1) return `${breakpoint}px`;
      return `(max-width: ${breakpoint}px) ${breakpoint}px`;
    })
    .join(', ');
}

// WebP detection
export function supportsWebP(): Promise<boolean> {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

// Image optimization utilities
export const imageUtils = {
  preloadCriticalImages,
  generateSrcSet,
  generateSizes,
  supportsWebP,
  CRITICAL_IMAGES,
  IMAGE_BREAKPOINTS,
};
