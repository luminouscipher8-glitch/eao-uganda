import { describe, it, expect } from 'vitest';
import routes, { routeMeta } from '../config.tsx';

describe('Route Configuration', () => {
  it('matches the active route contract', () => {
    expect(routes.map(route => route.path)).toEqual([
      '/',
      '/about',
      '/programs',
      '/get-involved',
      '/donate',
      '/donation/success',
      '/contact',
      '/stock-gifts',
      '/planned-giving',
      '/corporate-sponsorship',
      '/financial-reports',
      '/partners',
      '/shop',
      '/shop/success',
      '/blog',
      '/blog/:id',
      '/notfound',
      '/admin/login',
      '/admin',
      '/admin/programs',
    ]);
  });

  it('defines metadata for every static route', () => {
    const staticPaths = routes.flatMap(route =>
      route.path && !route.path.includes(':') ? [route.path] : []
    );

    staticPaths.forEach(path => {
      expect(routeMeta).toHaveProperty(path);
    });
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

  it('should have meaningful titles and descriptions', () => {
    Object.values(routeMeta).forEach(meta => {
      expect(meta.title.length).toBeGreaterThan(10);
      expect(meta.description.length).toBeGreaterThan(10);
      expect(meta.description.length).toBeLessThan(200);
    });
  });
});
