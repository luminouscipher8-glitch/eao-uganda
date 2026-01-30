import routes from '../router/config';
import { RouteObject } from 'react-router-dom';

// Sitemap URL interface
export interface SitemapUrl {
  url: string;
  lastModified: string;
  changeFreq:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority: number;
}

// Sitemap configuration
export const SITEMAP_CONFIG = {
  baseUrl: 'https://educateanorphan.org',
  defaultChangeFreq: 'monthly' as const,
  defaultPriority: 0.7,
  lastModified: new Date().toISOString(),
};

// Page-specific configurations
export const PAGE_CONFIGS: Record<string, Partial<SitemapUrl>> = {
  '/': {
    changeFreq: 'weekly',
    priority: 1.0,
  },
  '/programs': {
    changeFreq: 'monthly',
    priority: 0.9,
  },
  '/donate': {
    changeFreq: 'monthly',
    priority: 0.9,
  },
  '/get-involved': {
    changeFreq: 'weekly',
    priority: 0.8,
  },
  '/contact': {
    changeFreq: 'monthly',
    priority: 0.7,
  },
  '/partners': {
    changeFreq: 'monthly',
    priority: 0.6,
  },
  '/planned-giving': {
    changeFreq: 'monthly',
    priority: 0.6,
  },
  '/stock-gifts': {
    changeFreq: 'monthly',
    priority: 0.6,
  },
  '/impact': {
    changeFreq: 'monthly',
    priority: 0.7,
  },
  '/about': {
    changeFreq: 'monthly',
    priority: 0.7,
  },
  '/faq': {
    changeFreq: 'monthly',
    priority: 0.8,
  },
  '/privacy': {
    changeFreq: 'yearly',
    priority: 0.3,
  },
  '/terms': {
    changeFreq: 'yearly',
    priority: 0.3,
  },
};

// Generate sitemap URLs from routes
export const generateSitemapUrls = (): SitemapUrl[] => {
  const urls: SitemapUrl[] = [];

  routes.forEach((route: RouteObject) => {
    const path = route.path;
    if (!path) return; // Skip routes without paths

    const config = PAGE_CONFIGS[path] || {};

    urls.push({
      url: `${SITEMAP_CONFIG.baseUrl}${path}`,
      lastModified: SITEMAP_CONFIG.lastModified,
      changeFreq: config.changeFreq || SITEMAP_CONFIG.defaultChangeFreq,
      priority: config.priority || SITEMAP_CONFIG.defaultPriority,
    });
  });

  return urls;
};

// Generate sitemap XML
export const generateSitemapXML = (): string => {
  const urls = generateSitemapUrls();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `  <url>
    <loc>${escapeXml(url.url)}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
};

// Generate sitemap index (for multiple sitemaps)
export const generateSitemapIndex = (sitemapUrls: string[]): string => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    url => `  <sitemap>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${SITEMAP_CONFIG.lastModified}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  return xml;
};

// Escape XML special characters
const escapeXml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Generate robots.txt
export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITEMAP_CONFIG.baseUrl}/sitemap.xml

# Crawl-delay (optional, adjust based on server capacity)
Crawl-delay: 1

# Disallow specific paths if needed
# Disallow: /admin/
# Disallow: /private/

# Allow specific important paths
Allow: /programs/
Allow: /donate/
Allow: /get-involved/
Allow: /contact/

# Social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Image crawlers
User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /`;
};

// Generate sitemap for images
export const generateImageSitemap = (): string => {
  const images = [
    {
      url: `${SITEMAP_CONFIG.baseUrl}/`,
      images: [
        {
          loc: `${SITEMAP_CONFIG.baseUrl}/images/hero-education.jpg`,
          title: 'Children Learning in Classroom',
          caption:
            'Ugandan children engaged in educational activities at Educate an Orphan Uganda',
        },
        {
          loc: `${SITEMAP_CONFIG.baseUrl}/images/children-learning.jpg`,
          title: 'Students Studying Together',
          caption: 'Orphaned children receiving quality education support',
        },
      ],
    },
    {
      url: `${SITEMAP_CONFIG.baseUrl}/programs`,
      images: [
        {
          loc: `${SITEMAP_CONFIG.baseUrl}/images/programs-hero.jpg`,
          title: 'Education Programs',
          caption:
            'Comprehensive education support programs for vulnerable children',
        },
      ],
    },
    {
      url: `${SITEMAP_CONFIG.baseUrl}/donate`,
      images: [
        {
          loc: `${SITEMAP_CONFIG.baseUrl}/images/donation-impact.jpg`,
          title: 'Donation Impact',
          caption:
            "See how your donations transform children's lives through education",
        },
      ],
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images
  .map(
    page => `  <url>
    <loc>${escapeXml(page.url)}</loc>
${page.images
  .map(
    img => `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`
  )
  .join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
};

// Generate news sitemap (if applicable)
export const generateNewsSitemap = (): string => {
  const news = [
    {
      url: `${SITEMAP_CONFIG.baseUrl}/impact`,
      title: 'Educate an Orphan Uganda Celebrates 500 Children Graduating',
      publication: {
        name: 'Educate an Orphan Uganda News',
        language: 'en',
      },
      publicationDate: new Date().toISOString(),
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${news
  .map(
    item => `  <url>
    <loc>${escapeXml(item.url)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(item.publication.name)}</news:name>
        <news:language>${item.publication.language}</news:language>
      </news:publication>
      <news:title>${escapeXml(item.title)}</news:title>
      <news:publication_date>${item.publicationDate}</news:publication_date>
    </news:news>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
};

// Sitemap validation
export const validateSitemap = (xml: string): boolean => {
  try {
    // Basic validation checks
    if (!xml.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
      return false;
    }
    if (!xml.includes('<urlset')) {
      return false;
    }
    if (!xml.includes('</urlset>')) {
      return false;
    }

    // Check for required elements in each URL
    const urlMatches = xml.match(/<url>[\s\S]*?<\/url>/g);
    if (!urlMatches) return false;

    for (const urlBlock of urlMatches) {
      if (!urlBlock.includes('<loc>') || !urlBlock.includes('</loc>')) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Sitemap validation error:', error);
    return false;
  }
};

// Ping search engines with new sitemap
export const pingSearchEngines = async (): Promise<void> => {
  const sitemapUrl = `${SITEMAP_CONFIG.baseUrl}/sitemap.xml`;

  const searchEngines = [
    `https://www.google.com/webmasters/tools/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/webmaster/ping.aspx?siteMap=${encodeURIComponent(sitemapUrl)}`,
  ];

  const pingPromises = searchEngines.map(async url => {
    try {
      const response = await fetch(url);
      console.log(`Pinged ${url}: ${response.status}`);
    } catch (error) {
      console.error(`Failed to ping ${url}:`, error);
    }
  });

  await Promise.allSettled(pingPromises);
};

// Generate all sitemaps
export const generateAllSitemaps = () => {
  return {
    main: generateSitemapXML(),
    images: generateImageSitemap(),
    news: generateNewsSitemap(),
    robots: generateRobotsTxt(),
  };
};

// Get sitemap statistics
export const getSitemapStats = () => {
  const urls = generateSitemapUrls();

  return {
    totalUrls: urls.length,
    averagePriority:
      urls.reduce((sum, url) => sum + url.priority, 0) / urls.length,
    highPriorityUrls: urls.filter(url => url.priority >= 0.8).length,
    mediumPriorityUrls: urls.filter(
      url => url.priority >= 0.5 && url.priority < 0.8
    ).length,
    lowPriorityUrls: urls.filter(url => url.priority < 0.5).length,
    changeFreqDistribution: urls.reduce(
      (acc, url) => {
        acc[url.changeFreq] = (acc[url.changeFreq] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
  };
};
