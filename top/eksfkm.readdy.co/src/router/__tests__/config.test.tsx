import { describe, it, expect } from 'vitest';
import routes, { routeMeta } from '../config';

describe('Route Configuration', () => {
  it('should have the correct number of routes', () => {
    expect(routes).toHaveLength(7); // Current actual routes
  });

  it('should include all expected routes', () => {
    const paths = routes.map(route => route.path);
    const expectedPaths = [
      '/',
      '/about',
      '/programs',
      '/get-involved',
      '/donate',
      '/contact',
      '/stock-gifts',
    ];

    expectedPaths.forEach(path => {
      expect(paths).toContain(path);
    });
  });

  it('should have stock-gifts as the last route', () => {
    const lastRoute = routes[routes.length - 1];
    expect(lastRoute.path).toBe('/stock-gifts');
  });

  it('should have metadata for all routes', () => {
    Object.keys(routeMeta).forEach(path => {
      const meta = routeMeta[path as keyof typeof routeMeta];
      expect(meta).toHaveProperty('title');
      expect(meta).toHaveProperty('description');
      expect(typeof meta.title).toBe('string');
      expect(typeof meta.description).toBe('string');
    });
  });

  it('should have proper SEO titles', () => {
    Object.values(routeMeta).forEach(meta => {
      expect(meta.title).toContain('Educate an Orphan Uganda');
    });
  });

  it('should have meaningful descriptions', () => {
    Object.values(routeMeta).forEach(meta => {
      expect(meta.description.length).toBeGreaterThan(10);
      expect(meta.description.length).toBeLessThan(200);
    });
  });
});
