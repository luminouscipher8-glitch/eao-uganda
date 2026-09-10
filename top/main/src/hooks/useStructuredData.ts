import { useMemo } from 'react';

// Organization structured data
export interface OrganizationData {
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint: {
    telephone: string;
    contactType: string;
    availableLanguage: string[];
  };
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs: string[];
  foundingDate: string;
  taxID?: string;
  nonprofitStatus?: string;
}

// Article structured data
export interface ArticleData {
  headline: string;
  description: string;
  image: string[];
  author: {
    name: string;
    url: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage: string;
  articleSection?: string;
  wordCount?: number;
}

// Event structured data
export interface EventData {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
  };
  image: string[];
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
  organizer: {
    name: string;
    url: string;
  };
}

// Program structured data
export interface ProgramData {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  educationalLevel: string;
  about: string[];
  teaches: string[];
  offers: {
    type: string;
    name: string;
    description: string;
  };
  duration?: string;
  inLanguage: string[];
  audience: {
    audienceType: string;
  };
}

// Donation structured data
export interface DonationData {
  name: string;
  description: string;
  recipient: {
    name: string;
    url: string;
    taxID?: string;
  };
  typeOfGood: string;
  areaServed: string;
  eligibilityRequirement?: string[];
  amount?: {
    minValue: number;
    maxValue: number;
    currency: string;
  };
  url: string;
}

// Structured data hook
export const useStructuredData = () => {
  // Generate organization structured data
  const generateOrganizationData = useMemo(
    (): OrganizationData => ({
      name: 'Educate an Orphan Uganda',
      description:
        'Transforming lives through education in Uganda by providing quality education, healthcare, and support to orphaned and vulnerable children.',
      url: 'https://educateanorphan.org',
      logo: 'https://educateanorphan.org/logo.png',
      contactPoint: {
        telephone: '+256 700 000 000',
        contactType: 'customer service',
        availableLanguage: ['English', 'Luganda'],
      },
      address: {
        streetAddress: 'Plot 123, Kampala Road',
        addressLocality: 'Kampala',
        addressRegion: 'Central Region',
        postalCode: '256',
        addressCountry: 'Uganda',
      },
      sameAs: [
        'https://facebook.com/educateanorphanuganda',
        'https://twitter.com/educateorphanug',
        'https://instagram.com/educateanorphanuganda',
        'https://linkedin.com/company/educate-an-orphan-uganda',
      ],
      foundingDate: '2015-01-15',
      nonprofitStatus: '501(c)(3) Equivalent',
      taxID: 'UG-NGO-123456',
    }),
    []
  );

  // Generate article structured data
  const generateArticleData = (data: Partial<ArticleData>): ArticleData => ({
    headline:
      data.headline ||
      'Educate an Orphan Uganda - Transforming Lives Through Education',
    description:
      data.description ||
      'Learn how Educate an Orphan Uganda is making a difference in the lives of orphaned and vulnerable children through quality education and comprehensive support.',
    image: data.image || [
      'https://educateanorphan.org/images/hero-education.jpg',
      'https://educateanorphan.org/images/children-learning.jpg',
    ],
    author: data.author || {
      name: 'Educate an Orphan Uganda Team',
      url: 'https://educateanorphan.org',
    },
    publisher: data.publisher || {
      name: 'Educate an Orphan Uganda',
      logo: 'https://educateanorphan.org/logo.png',
    },
    datePublished: data.datePublished || new Date().toISOString(),
    dateModified: data.dateModified || new Date().toISOString(),
    mainEntityOfPage: data.mainEntityOfPage || 'https://educateanorphan.org',
    articleSection: data.articleSection || 'Education',
    wordCount: data.wordCount || 800,
  });

  // Generate event structured data
  const generateEventData = (data: Partial<EventData>): EventData => ({
    name: data.name || 'Educate an Orphan Uganda Fundraising Event',
    description:
      data.description ||
      "Join us for an inspiring evening of hope and generosity as we raise funds to support orphaned children's education in Uganda.",
    startDate: data.startDate || new Date().toISOString(),
    endDate: data.endDate,
    location: data.location || {
      name: 'Educate an Orphan Uganda Headquarters',
      address: {
        streetAddress: 'Plot 123, Kampala Road',
        addressLocality: 'Kampala',
        addressRegion: 'Central Region',
        postalCode: '256',
        addressCountry: 'Uganda',
      },
    },
    image: data.image || [
      'https://educateanorphan.org/images/event-banner.jpg',
    ],
    offers: data.offers,
    organizer: data.organizer || {
      name: 'Educate an Orphan Uganda',
      url: 'https://educateanorphan.org',
    },
  });

  // Generate program structured data
  const generateProgramData = (data: Partial<ProgramData>): ProgramData => ({
    name: data.name || 'Education Support Program',
    description:
      data.description ||
      'Comprehensive education support program providing quality education, school supplies, and mentorship to orphaned and vulnerable children in Uganda.',
    provider: data.provider || {
      name: 'Educate an Orphan Uganda',
      url: 'https://educateanorphan.org',
    },
    educationalLevel: 'Primary and Secondary Education',
    about: ['Education', 'Child Welfare', 'Orphan Support', 'Uganda'],
    teaches: [
      'Academic Excellence',
      'Life Skills',
      'Leadership Development',
      'Character Building',
    ],
    offers: data.offers || {
      type: 'Educational Program',
      name: 'Full Education Support',
      description:
        'Complete educational support including tuition, supplies, and mentorship',
    },
    duration: data.duration || 'Academic Year',
    inLanguage: ['English', 'Luganda'],
    audience: {
      audienceType: 'Orphaned and Vulnerable Children',
    },
  });

  // Generate donation structured data
  const generateDonationData = (data: Partial<DonationData>): DonationData => ({
    name: data.name || "Support a Child's Education",
    description:
      data.description ||
      'Your donation helps provide quality education, school supplies, and support to orphaned children in Uganda.',
    recipient: data.recipient || {
      name: 'Educate an Orphan Uganda',
      url: 'https://educateanorphan.org',
      taxID: 'UG-NGO-123456',
    },
    typeOfGood: 'Educational Support',
    areaServed: 'Uganda',
    eligibilityRequirement: data.eligibilityRequirement || [
      'Donor must be 18 years or older',
      'Valid payment method required',
    ],
    amount: data.amount || {
      minValue: 10,
      maxValue: 100000,
      currency: 'USD',
    },
    url: data.url || 'https://educateanorphan.org/donate',
  });

  // Generate breadcrumb structured data
  const generateBreadcrumbData = (
    breadcrumbs: Array<{
      name: string;
      url: string;
    }>
  ) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  });

  // Generate website structured data
  const generateWebsiteData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Educate an Orphan Uganda',
      url: 'https://educateanorphan.org',
      description:
        'Transforming lives through education in Uganda by providing quality education, healthcare, and support to orphaned and vulnerable children.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://educateanorphan.org/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Educate an Orphan Uganda',
        url: 'https://educateanorphan.org',
        logo: {
          '@type': 'ImageObject',
          url: 'https://educateanorphan.org/logo.png',
          width: 512,
          height: 512,
        },
      },
    }),
    []
  );

  // Generate FAQ structured data
  const generateFAQData = (
    faqs: Array<{
      question: string;
      answer: string;
    }>
  ) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });

  return {
    generateOrganizationData,
    generateArticleData,
    generateEventData,
    generateProgramData,
    generateDonationData,
    generateBreadcrumbData,
    generateWebsiteData,
    generateFAQData,
  };
};

// Helper function to inject JSON-LD into head
export const injectStructuredData = (data: any, id?: string) => {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);

  if (id) {
    script.id = id;
    // Remove existing script with same ID
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }
  }

  document.head.appendChild(script);
};

// Helper function to remove JSON-LD from head
export const removeStructuredData = (id: string) => {
  if (typeof window === 'undefined') return;

  const script = document.getElementById(id);
  if (script) {
    script.remove();
  }
};
