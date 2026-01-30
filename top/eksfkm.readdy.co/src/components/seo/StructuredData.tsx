import { useEffect } from 'react';
import { useStructuredData } from '../../hooks/useStructuredData';

interface StructuredDataProps {
  type:
    | 'organization'
    | 'website'
    | 'article'
    | 'event'
    | 'program'
    | 'donation'
    | 'breadcrumb'
    | 'faq';
  data?: any;
  id?: string;
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  type,
  data,
  id,
}) => {
  const {
    generateOrganizationData,
    generateWebsiteData,
    generateArticleData,
    generateEventData,
    generateProgramData,
    generateDonationData,
    generateBreadcrumbData,
    generateFAQData,
  } = useStructuredData();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let structuredData: any;

    switch (type) {
      case 'organization':
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          ...generateOrganizationData,
        };
        break;

      case 'website':
        structuredData = generateWebsiteData;
        break;

      case 'article':
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          ...generateArticleData(data || {}),
        };
        break;

      case 'event':
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Event',
          ...generateEventData(data || {}),
        };
        break;

      case 'program':
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'EducationalOccupationalProgram',
          ...generateProgramData(data || {}),
        };
        break;

      case 'donation':
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'DonateAction',
          ...generateDonationData(data || {}),
        };
        break;

      case 'breadcrumb':
        structuredData = generateBreadcrumbData(data || []);
        break;

      case 'faq':
        structuredData = generateFAQData(data || []);
        break;

      default:
        return;
    }

    // Create or update script tag
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);

    if (id) {
      script.id = id;
      // Remove existing script with same ID
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
    } else {
      script.id = `structured-data-${type}`;
    }

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById(
        id || `structured-data-${type}`
      );
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [
    type,
    data,
    id,
    generateOrganizationData,
    generateWebsiteData,
    generateArticleData,
    generateEventData,
    generateProgramData,
    generateDonationData,
    generateBreadcrumbData,
    generateFAQData,
  ]);

  return null;
};

// Predefined structured data components
export const OrganizationStructuredData: React.FC = () => (
  <StructuredData type="organization" id="organization-structured-data" />
);

export const WebsiteStructuredData: React.FC = () => (
  <StructuredData type="website" id="website-structured-data" />
);

export const HomeStructuredData: React.FC = () => {
  const homeData = {
    headline: 'Educate an Orphan Uganda - Transforming Lives Through Education',
    description:
      'Join us in our mission to provide quality education, healthcare, and support to orphaned and vulnerable children in Uganda. Together, we can break the cycle of poverty through education.',
    image: [
      'https://educateanorphan.org/images/hero-education.jpg',
      'https://educateanorphan.org/images/children-learning.jpg',
    ],
    articleSection: 'Nonprofit Education',
    wordCount: 1200,
  };

  return (
    <>
      <OrganizationStructuredData />
      <WebsiteStructuredData />
      <StructuredData
        type="article"
        data={homeData}
        id="home-structured-data"
      />
    </>
  );
};

export const ProgramsStructuredData: React.FC = () => {
  const programsData = [
    {
      name: 'Education Support Program',
      description:
        'Comprehensive education support program providing quality education, school supplies, and mentorship to orphaned and vulnerable children in Uganda.',
      offers: {
        type: 'Educational Program',
        name: 'Full Education Support',
        description:
          'Complete educational support including tuition, supplies, and mentorship',
      },
    },
  ];

  return (
    <>
      {programsData.map((program, index) => (
        <StructuredData
          key={index}
          type="program"
          data={program}
          id={`program-structured-data-${index}`}
        />
      ))}
    </>
  );
};

export const DonateStructuredData: React.FC = () => {
  const donateData = {
    name: "Support a Child's Education",
    description:
      "Your donation helps provide quality education, school supplies, and support to orphaned children in Uganda. Every contribution makes a difference in a child's life.",
    amount: {
      minValue: 10,
      maxValue: 100000,
      currency: 'USD',
    },
  };

  return (
    <StructuredData
      type="donation"
      data={donateData}
      id="donate-structured-data"
    />
  );
};

export const ContactStructuredData: React.FC = () => {
  const breadcrumbData = [
    { name: 'Home', url: 'https://educateanorphan.org' },
    { name: 'Contact', url: 'https://educateanorphan.org/contact' },
  ];

  return (
    <StructuredData
      type="breadcrumb"
      data={breadcrumbData}
      id="contact-breadcrumb-data"
    />
  );
};

export const GetInvolvedStructuredData: React.FC = () => {
  const breadcrumbData = [
    { name: 'Home', url: 'https://educateanorphan.org' },
    { name: 'Get Involved', url: 'https://educateanorphan.org/get-involved' },
  ];

  return (
    <StructuredData
      type="breadcrumb"
      data={breadcrumbData}
      id="get-involved-breadcrumb-data"
    />
  );
};

export const FAQStructuredData: React.FC = () => {
  const faqData = [
    {
      question: 'How can I donate to Educate an Orphan Uganda?',
      answer:
        "You can donate through our secure online donation platform, bank transfer, or by visiting our office. All donations are tax-deductible and directly support children's education.",
    },
    {
      question: 'Where does my donation go?',
      answer:
        "Your donation goes directly to support children's education, including school fees, uniforms, books, supplies, and healthcare. We maintain full transparency with regular reports on how funds are used.",
    },
    {
      question: 'Can I sponsor a specific child?',
      answer:
        "Yes, we offer child sponsorship programs where you can support a specific child's educational journey. You'll receive regular updates and progress reports on your sponsored child.",
    },
    {
      question: 'How can I volunteer with Educate an Orphan Uganda?',
      answer:
        'We welcome volunteers in various capacities including teaching, mentoring, administrative support, and fundraising. Please contact us to learn more about current volunteer opportunities.',
    },
    {
      question: 'What impact has Educate an Orphan Uganda made?',
      answer:
        'Since 2015, we have supported over 500 orphaned and vulnerable children, with 95% completing primary education and 85% continuing to secondary school. Our programs have significantly improved educational outcomes in the communities we serve.',
    },
  ];

  return <StructuredData type="faq" data={faqData} id="faq-structured-data" />;
};
