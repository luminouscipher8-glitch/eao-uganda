import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import SuspenseWrapper from '../components/common/SuspenseWrapper.tsx';

// Lazy loaded components with error boundaries
const HomePage = lazy(() => import('../pages/home/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const ProgramsPage = lazy(() => import('../pages/programs/page'));
const GetInvolvedPage = lazy(() => import('../pages/get-involved/page'));
const DonatePage = lazy(() => import('../pages/donate/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const StockGiftsPage = lazy(() => import('../pages/stock-gifts/page'));

// Route metadata for SEO and analytics
const routeMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'Home | Educate an Orphan Uganda', description: 'Empowering Uganda\'s children through education' },
  '/about': { title: 'About Us | Educate an Orphan Uganda', description: 'Learn about our mission and vision' },
  '/programs': { title: 'Programs | Educate an Orphan Uganda', description: 'Our educational support programs' },
  '/get-involved': { title: 'Get Involved | Educate an Orphan Uganda', description: 'Join us in making a difference' },
  '/donate': { title: 'Donate | Educate an Orphan Uganda', description: 'Support children\'s education in Uganda' },
  '/contact': { title: 'Contact | Educate an Orphan Uganda', description: 'Get in touch with us' },
  '/stock-gifts': { title: 'Stock Gifts | Educate an Orphan Uganda', description: 'Donate stocks and securities' },
};

const createRoute = (path: string, element: React.ComponentType): RouteObject => ({
  path,
  element: (
    <SuspenseWrapper>
      {React.createElement(element)}
    </SuspenseWrapper>
  ),
});

const routes: RouteObject[] = [
  createRoute('/', HomePage),
  createRoute('/about', AboutPage),
  createRoute('/programs', ProgramsPage),
  createRoute('/get-involved', GetInvolvedPage),
  createRoute('/donate', DonatePage),
  createRoute('/contact', ContactPage),
  createRoute('/stock-gifts', StockGiftsPage),
];

export { routeMeta };
export default routes;