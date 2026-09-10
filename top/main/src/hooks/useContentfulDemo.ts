import { useState, useEffect } from 'react';

// Demo Contentful interfaces (for when CMS is not yet implemented)
export interface ContentfulAsset {
  sys: {
    id: string;
    type: string;
  };
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface ContentfulEntry {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: Record<string, any>;
}

// Demo content data (simulating CMS content)
const demoHomePage = {
  sys: {
    id: 'home-1',
    type: 'Entry',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-30',
  },
  fields: {
    title: 'Educate an Orphan Uganda',
    heroTitle: 'Transform Lives Through Education',
    heroSubtitle:
      'Join us in our mission to provide quality education, healthcare, and support to orphaned and vulnerable children in Uganda.',
    heroImage: {
      sys: { id: 'hero-img', type: 'Asset' },
      fields: {
        title: 'Children Learning',
        file: {
          url: '/images/hero-education.jpg',
          details: { size: 250000, image: { width: 1200, height: 630 } },
          fileName: 'hero-education.jpg',
          contentType: 'image/jpeg',
        },
      },
    },
    callToAction: 'Donate Now',
    impactStats: [
      { label: 'Children Educated', value: '500+' },
      { label: 'Schools Supported', value: '15' },
      { label: 'Communities Reached', value: '25' },
    ],
  },
};

const demoPrograms = [
  {
    sys: {
      id: 'program-1',
      type: 'Entry',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-30',
    },
    fields: {
      title: 'Education Support Program',
      description:
        'Comprehensive education support including school fees, uniforms, and learning materials.',
      image: {
        sys: { id: 'program-img-1', type: 'Asset' },
        fields: {
          title: 'Education Program',
          file: {
            url: '/images/programs-hero.jpg',
            details: { size: 180000, image: { width: 800, height: 600 } },
            fileName: 'programs-hero.jpg',
            contentType: 'image/jpeg',
          },
        },
      },
      order: 1,
      impactMetrics: [
        { metric: 'Students Supported', value: '250' },
        { metric: 'School Fees Paid', value: '100%' },
        { metric: 'Pass Rate', value: '95%' },
      ],
    },
  },
  {
    sys: {
      id: 'program-2',
      type: 'Entry',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-30',
    },
    fields: {
      title: 'Healthcare Support',
      description:
        'Medical care, health screenings, and nutrition support for healthy development.',
      image: {
        sys: { id: 'program-img-2', type: 'Asset' },
        fields: {
          title: 'Healthcare Program',
          file: {
            url: '/images/healthcare-program.jpg',
            details: { size: 160000, image: { width: 800, height: 600 } },
            fileName: 'healthcare-program.jpg',
            contentType: 'image/jpeg',
          },
        },
      },
      order: 2,
      impactMetrics: [
        { metric: 'Children Served', value: '300' },
        { metric: 'Health Checkups', value: '100%' },
        { metric: 'Nutrition Support', value: '200' },
      ],
    },
  },
];

const demoBlogPosts = [
  {
    sys: {
      id: 'blog-1',
      type: 'Entry',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-30',
    },
    fields: {
      title: '500 Children Graduate: A Milestone Celebration',
      slug: '500-children-graduate-milestone',
      author: {
        sys: { id: 'author-1', type: 'Entry' },
        fields: { name: 'Educate an Orphan Uganda Team' },
      },
      publishDate: '2024-01-15T10:00:00Z',
      featuredImage: {
        sys: { id: 'blog-img-1', type: 'Asset' },
        fields: {
          title: 'Graduation Ceremony',
          file: {
            url: '/images/graduation-ceremony.jpg',
            details: { size: 200000, image: { width: 1200, height: 800 } },
            fileName: 'graduation-ceremony.jpg',
            contentType: 'image/jpeg',
          },
        },
      },
      content:
        'We are thrilled to announce that 500 children have successfully graduated from our education program...',
      tags: ['education', 'graduation', 'impact', 'success'],
    },
  },
  {
    sys: {
      id: 'blog-2',
      type: 'Entry',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-30',
    },
    fields: {
      title: 'New School Opening in Rural Uganda',
      slug: 'new-school-opening-rural-uganda',
      author: {
        sys: { id: 'author-1', type: 'Entry' },
        fields: { name: 'Educate an Orphan Uganda Team' },
      },
      publishDate: '2024-01-10T10:00:00Z',
      featuredImage: {
        sys: { id: 'blog-img-2', type: 'Asset' },
        fields: {
          title: 'New School Building',
          file: {
            url: '/images/new-school.jpg',
            details: { size: 180000, image: { width: 1200, height: 800 } },
            fileName: 'new-school.jpg',
            contentType: 'image/jpeg',
          },
        },
      },
      content:
        'We are excited to announce the opening of our newest school in rural Uganda...',
      tags: ['education', 'infrastructure', 'community', 'growth'],
    },
  },
];

const demoEvents = [
  {
    sys: {
      id: 'event-1',
      type: 'Entry',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-30',
    },
    fields: {
      title: 'Annual Fundraising Gala',
      description:
        'Join us for an evening of celebration and fundraising to support our mission.',
      startDate: '2024-03-15T18:00:00Z',
      location: 'Kampala Serena Hotel',
      registrationLink: '/events/gala-2024',
      image: {
        sys: { id: 'event-img-1', type: 'Asset' },
        fields: {
          title: 'Fundraising Gala',
          file: {
            url: '/images/fundraising-gala.jpg',
            details: { size: 190000, image: { width: 800, height: 600 } },
            fileName: 'fundraising-gala.jpg',
            contentType: 'image/jpeg',
          },
        },
      },
    },
  },
];

const demoSuccessStories = [
  {
    sys: {
      id: 'story-1',
      type: 'Entry',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-30',
    },
    fields: {
      title: "Sarah's Journey to Medical School",
      childName: 'Sarah',
      story:
        "Sarah came to us at age 8, having lost both parents. Today, she's studying to become a doctor...",
      beforePhoto: {
        sys: { id: 'before-img-1', type: 'Asset' },
        fields: {
          title: 'Sarah Before',
          file: {
            url: '/images/sarah-before.jpg',
            details: { size: 150000, image: { width: 600, height: 800 } },
            fileName: 'sarah-before.jpg',
            contentType: 'image/jpeg',
          },
        },
      },
      afterPhoto: {
        sys: { id: 'after-img-1', type: 'Asset' },
        fields: {
          title: 'Sarah After',
          file: {
            url: '/images/sarah-after.jpg',
            details: { size: 160000, image: { width: 600, height: 800 } },
            fileName: 'sarah-after.jpg',
            contentType: 'image/jpeg',
          },
        },
      },
      featured: true,
      impactMetrics: [
        { metric: 'Years in Program', value: '10' },
        { metric: 'Academic Achievement', value: 'Top 5%' },
        { metric: 'Current Goal', value: 'Medical School' },
      ],
    },
  },
];

const demoFAQ = [
  {
    sys: {
      id: 'faq-1',
      type: 'Entry',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-30',
    },
    fields: {
      question: 'How can I sponsor a child?',
      answer:
        'You can sponsor a child through our monthly donation program. Visit our donate page to learn more about sponsorship options.',
      order: 1,
    },
  },
  {
    sys: {
      id: 'faq-2',
      type: 'Entry',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-30',
    },
    fields: {
      question: 'What percentage of donations goes directly to programs?',
      answer:
        '85% of all donations go directly to our programs, with only 15% covering administrative costs.',
      order: 2,
    },
  },
];

// Generic demo hook
export const useContentfulDemo = <T = any>(
  contentType: string,
  options: {
    limit?: number;
    order?: string;
    include?: number;
    query?: Record<string, any>;
    preview?: boolean;
  } = {}
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let mockData: any[] = [];

        switch (contentType) {
          case 'homePage':
            mockData = [demoHomePage];
            break;
          case 'program':
            mockData = demoPrograms;
            break;
          case 'blogPost':
            mockData = demoBlogPosts.slice(0, options.limit || 10);
            break;
          case 'event':
            mockData = demoEvents;
            break;
          case 'successStory':
            mockData = demoSuccessStories;
            break;
          case 'faq':
            mockData = demoFAQ;
            break;
          default:
            mockData = [];
        }

        setData(mockData as T[]);
      } catch (err) {
        console.error(`Failed to fetch ${contentType}:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentType, options.limit]);

  return { data, loading, error, refetch: () => setLoading(true) };
};

// Specific demo hooks
export const useHomePageDemo = (preview = false) => {
  return useContentfulDemo('homePage', {
    limit: 1,
    include: 3,
    preview,
  });
};

export const useProgramsDemo = (preview = false) => {
  return useContentfulDemo('program', {
    order: 'fields.order',
    include: 2,
    preview,
  });
};

export const useBlogPostsDemo = (limit = 10, preview = false) => {
  return useContentfulDemo('blogPost', {
    limit,
    order: '-fields.publishDate',
    include: 2,
    preview,
  });
};

export const useEventsDemo = (preview = false) => {
  return useContentfulDemo('event', {
    order: 'fields.startDate',
    include: 2,
    preview,
  });
};

export const useSuccessStoriesDemo = (preview = false) => {
  return useContentfulDemo('successStory', {
    order: '-fields.featured',
    include: 2,
    preview,
  });
};

export const useFAQDemo = (preview = false) => {
  return useContentfulDemo('faq', {
    order: 'fields.order',
    include: 1,
    preview,
  });
};

// Utility functions
export const getImageUrlDemo = (
  asset: ContentfulAsset,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
) => {
  if (!asset?.fields?.file?.url) return '';

  const { width, height, quality = 80, format = 'webp' } = options;
  let url = asset.fields.file.url;

  // Add query parameters for image optimization (demo)
  const params = new URLSearchParams();

  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (quality !== 100) params.append('q', quality.toString());
  if (format) params.append('fm', format);

  const paramString = params.toString();
  return paramString ? `${url}?${paramString}` : url;
};

export const getOptimizedImageUrlDemo = (
  asset: ContentfulAsset,
  maxWidth = 1200
) => {
  if (!asset?.fields?.file?.details?.image) return getImageUrlDemo(asset);

  const { width } = asset.fields.file.details.image;
  const optimizedWidth = Math.min(width, maxWidth);

  return getImageUrlDemo(asset, {
    width: optimizedWidth,
    quality: 80,
    format: 'webp',
  });
};

// Content validation utilities
export const validateContentfulEntryDemo = (
  entry: any,
  requiredFields: string[]
) => {
  const errors: string[] = [];

  if (!entry?.fields) {
    errors.push('Entry has no fields');
    return { isValid: false, errors };
  }

  requiredFields.forEach(field => {
    if (!entry.fields[field]) {
      errors.push(`Required field '${field}' is missing`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Content caching utilities
const contentCacheDemo = new Map<string, { data: any; timestamp: number }>();

export const getCachedContentDemo = (key: string, ttl = 5 * 60 * 1000) => {
  const cached = contentCacheDemo.get(key);

  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }

  return null;
};

export const setCachedContentDemo = (key: string, data: any) => {
  contentCacheDemo.set(key, {
    data,
    timestamp: Date.now(),
  });
};

export const clearContentCacheDemo = () => {
  contentCacheDemo.clear();
};

// Preview mode utilities
export const isPreviewModeDemo = () => {
  if (typeof window === 'undefined') return false;

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('preview') === 'true';
};

export const getPreviewTokenDemo = () => {
  if (typeof window === 'undefined') return null;

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('token');
};

// Error handling utilities
export const handleContentfulErrorDemo = (error: any) => {
  console.error('Contentful Demo Error:', error);

  // Log to analytics (demo)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'contentful_error', {
      error_message: error?.message || 'Unknown error',
      error_code: error?.status || 'unknown',
    });
  }

  // Show user-friendly error
  return {
    message: 'Failed to load content. Please try again later.',
    details: error?.message || 'Unknown error',
  };
};
