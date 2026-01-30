import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  useSocialMediaMeta,
  type SocialMediaMeta,
} from '../../hooks/useSocialMediaMeta';

interface SocialMediaMetaProps {
  customMeta?: Partial<SocialMediaMeta>;
}

const SocialMediaMeta: React.FC<SocialMediaMetaProps> = ({ customMeta }) => {
  const location = useLocation();
  const meta = useSocialMediaMeta(location.pathname);
  const finalMeta = { ...meta, ...customMeta };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let tag =
        document.querySelector(`meta[property="${property}"]`) ||
        document.querySelector(`meta[name="${property}"]`);

      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(
          property.startsWith('og:') ? 'property' : 'name',
          property
        );
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Update title
    document.title = finalMeta.title;

    // Update canonical link
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalMeta.canonical);

    // Update description
    updateMetaTag('description', finalMeta.description);

    // Update Open Graph tags
    updateMetaTag('og:title', finalMeta.openGraph.title);
    updateMetaTag('og:description', finalMeta.openGraph.description);
    updateMetaTag('og:type', finalMeta.openGraph.type);
    updateMetaTag('og:url', finalMeta.openGraph.url);
    updateMetaTag('og:image', finalMeta.openGraph.image);
    updateMetaTag('og:image:alt', finalMeta.openGraph.imageAlt);
    updateMetaTag('og:site_name', finalMeta.openGraph.siteName);

    // Update Twitter Card tags
    updateMetaTag('twitter:card', finalMeta.twitter.card);
    updateMetaTag('twitter:title', finalMeta.twitter.title);
    updateMetaTag('twitter:description', finalMeta.twitter.description);
    updateMetaTag('twitter:image', finalMeta.twitter.image);
    updateMetaTag('twitter:image:alt', finalMeta.twitter.imageAlt);
    updateMetaTag('twitter:site', finalMeta.twitter.site);

    // Update additional meta tags
    updateMetaTag(
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('author', 'Educate an Orphan Uganda');
    updateMetaTag(
      'keywords',
      'education, orphan support, Uganda, charity, nonprofit, children, donate, volunteer'
    );
  }, [finalMeta]);

  return null;
};

export default SocialMediaMeta;
