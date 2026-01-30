import { useMemo } from 'react';

export interface SocialMediaMeta {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    url: string;
    image: string;
    imageAlt: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    site: string;
  };
}

export const useSocialMediaMeta = (path: string = '/'): SocialMediaMeta => {
  const baseUrl = 'https://educateanorphan.org';
  const siteName = 'Educate an Orphan Uganda';

  return useMemo(() => {
    const configs: Record<string, SocialMediaMeta> = {
      '/': {
        title:
          'Educate an Orphan Uganda - Transforming Lives Through Education',
        description:
          'Join us in our mission to provide quality education to orphaned children in Uganda.',
        canonical: baseUrl,
        openGraph: {
          title:
            'Educate an Orphan Uganda - Transforming Lives Through Education',
          description:
            'Join us in our mission to provide quality education to orphaned children in Uganda.',
          type: 'website',
          url: baseUrl,
          image: `${baseUrl}/images/og-home.jpg`,
          imageAlt:
            'Children learning in classroom at Educate an Orphan Uganda',
          siteName,
        },
        twitter: {
          card: 'summary_large_image',
          title:
            'Educate an Orphan Uganda - Transforming Lives Through Education',
          description:
            'Join us in our mission to provide quality education to orphaned children in Uganda.',
          image: `${baseUrl}/images/twitter-home.jpg`,
          imageAlt:
            'Children learning in classroom at Educate an Orphan Uganda',
          site: '@educateorphanug',
        },
      },
      '/programs': {
        title: 'Our Programs - Educate an Orphan Uganda',
        description:
          'Discover our comprehensive education support programs for orphaned children in Uganda.',
        canonical: `${baseUrl}/programs`,
        openGraph: {
          title: 'Our Programs - Educate an Orphan Uganda',
          description:
            'Discover our comprehensive education support programs for orphaned children in Uganda.',
          type: 'website',
          url: `${baseUrl}/programs`,
          image: `${baseUrl}/images/og-programs.jpg`,
          imageAlt:
            'Students receiving educational materials at Educate an Orphan Uganda',
          siteName,
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Our Programs - Educate an Orphan Uganda',
          description:
            'Discover our comprehensive education support programs for orphaned children in Uganda.',
          image: `${baseUrl}/images/twitter-programs.jpg`,
          imageAlt:
            'Students receiving educational materials at Educate an Orphan Uganda',
          site: '@educateorphanug',
        },
      },
      '/donate': {
        title: 'Donate - Educate an Orphan Uganda',
        description:
          "Transform a child's life through education. Your donation provides school fees and support to orphaned children.",
        canonical: `${baseUrl}/donate`,
        openGraph: {
          title: 'Donate - Educate an Orphan Uganda',
          description:
            "Transform a child's life through education. Your donation provides school fees and support to orphaned children.",
          type: 'website',
          url: `${baseUrl}/donate`,
          image: `${baseUrl}/images/og-donate.jpg`,
          imageAlt: 'Child receiving educational support through donations',
          siteName,
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Donate - Educate an Orphan Uganda',
          description:
            "Transform a child's life through education. Your donation provides school fees and support to orphaned children.",
          image: `${baseUrl}/images/twitter-donate.jpg`,
          imageAlt: 'Child receiving educational support through donations',
          site: '@educateorphanug',
        },
      },
      '/get-involved': {
        title: 'Get Involved - Educate an Orphan Uganda',
        description:
          'Join our mission as a volunteer, fundraiser, or partner. Make a difference in the lives of orphaned children in Uganda.',
        canonical: `${baseUrl}/get-involved`,
        openGraph: {
          title: 'Get Involved - Educate an Orphan Uganda',
          description:
            'Join our mission as a volunteer, fundraiser, or partner. Make a difference in the lives of orphaned children in Uganda.',
          type: 'website',
          url: `${baseUrl}/get-involved`,
          image: `${baseUrl}/images/og-get-involved.jpg`,
          imageAlt:
            'Volunteers working with children at Educate an Orphan Uganda',
          siteName,
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Get Involved - Educate an Orphan Uganda',
          description:
            'Join our mission as a volunteer, fundraiser, or partner. Make a difference in the lives of orphaned children in Uganda.',
          image: `${baseUrl}/images/twitter-get-involved.jpg`,
          imageAlt:
            'Volunteers working with children at Educate an Orphan Uganda',
          site: '@educateorphanug',
        },
      },
      '/contact': {
        title: 'Contact Us - Educate an Orphan Uganda',
        description:
          'Get in touch with Educate an Orphan Uganda. Learn how you can support our mission to transform lives through education.',
        canonical: `${baseUrl}/contact`,
        openGraph: {
          title: 'Contact Us - Educate an Orphan Uganda',
          description:
            'Get in touch with Educate an Orphan Uganda. Learn how you can support our mission to transform lives through education.',
          type: 'website',
          url: `${baseUrl}/contact`,
          image: `${baseUrl}/images/og-contact.jpg`,
          imageAlt: 'Educate an Orphan Uganda office and contact information',
          siteName,
        },
        twitter: {
          card: 'summary',
          title: 'Contact Us - Educate an Orphan Uganda',
          description:
            'Get in touch with Educate an Orphan Uganda. Learn how you can support our mission.',
          image: `${baseUrl}/images/twitter-contact.jpg`,
          imageAlt: 'Educate an Orphan Uganda office and contact information',
          site: '@educateorphanug',
        },
      },
    };

    return configs[path] || configs['/'];
  }, [path]);
};
