import { Plugin } from 'vite';
import { generateAllSitemaps, validateSitemap } from './src/utils/sitemapGenerator';

interface SitemapPluginOptions {
  outputDir?: string;
  baseUrl?: string;
  generateRobots?: boolean;
  generateImageSitemap?: boolean;
  generateNewsSitemap?: boolean;
}

export function sitemapPlugin(options: SitemapPluginOptions = {}): Plugin {
  const {
    outputDir = 'dist',
    generateRobots = true,
    generateImageSitemap = true,
    generateNewsSitemap = true,
  } = options;

  return {
    name: 'vite-plugin-sitemap',
    apply: 'build',
    generateBundle() {
      console.log('🗺️  Generating sitemaps...');
      
      try {
        const sitemaps = generateAllSitemaps();
        
        // Main sitemap
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: sitemaps.main,
        });
        
        if (generateImageSitemap) {
          this.emitFile({
            type: 'asset',
            fileName: 'sitemap-images.xml',
            source: sitemaps.images,
          });
        }
        
        if (generateNewsSitemap) {
          this.emitFile({
            type: 'asset',
            fileName: 'sitemap-news.xml',
            source: sitemaps.news,
          });
        }
        
        if (generateRobots) {
          this.emitFile({
            type: 'asset',
            fileName: 'robots.txt',
            source: sitemaps.robots,
          });
        }
        
        // Validate main sitemap
        if (validateSitemap(sitemaps.main)) {
          console.log('✅ Sitemap validation passed');
        } else {
          console.warn('⚠️  Sitemap validation failed');
        }
        
        console.log('✅ Sitemaps generated successfully');
        console.log(`📁 Output directory: ${outputDir}`);
        console.log(`📄 Generated files: sitemap.xml${generateImageSitemap ? ', sitemap-images.xml' : ''}${generateNewsSitemap ? ', sitemap-news.xml' : ''}${generateRobots ? ', robots.txt' : ''}`);
        
      } catch (error) {
        console.error('❌ Failed to generate sitemaps:', error);
      }
    },
  };
}
