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
const PlannedGivingPage = lazy(() => import('../pages/planned-giving/page'));
const CorporateSponsorshipPage = lazy(
  () => import('../pages/corporate-sponsorship/page')
);
const FinancialReportsPage = lazy(
  () => import('../pages/financial-reports/page')
);
const PartnersPage = lazy(() => import('../pages/partners/page'));
const LoaderDemoPage = lazy(() => import('../pages/loader-demo/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

// Route metadata for SEO and analytics
const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Home | Educate an Orphan Uganda',
    description: "Empowering Uganda's children through education",
  },
  '/about': {
    title: 'About Us | Educate an Orphan Uganda',
    description: 'Learn about our mission and vision',
  },
  '/programs': {
    title: 'Programs | Educate an Orphan Uganda',
    description: 'Our educational support programs',
  },
  '/get-involved': {
    title: 'Get Involved | Educate an Orphan Uganda',
    description: 'Join us in making a difference',
  },
  '/donate': {
    title: 'Donate | Educate an Orphan Uganda',
    description: "Support children's education in Uganda",
  },
  '/contact': {
    title: 'Contact | Educate an Orphan Uganda',
    description: 'Get in touch with us',
  },
  '/stock-gifts': {
    title: 'Stock Gifts | Educate an Orphan Uganda',
    description: 'Donate stocks and securities',
  },
  '/planned-giving': {
    title: 'Planned Giving | Educate an Orphan Uganda',
    description: 'Leave a lasting legacy through planned giving',
  },
  '/corporate-sponsorship': {
    title: 'Corporate Sponsorship | Educate an Orphan Uganda',
    description: 'Partner with us to create meaningful impact',
  },
  '/financial-reports': {
    title: 'Financial Reports | Educate an Orphan Uganda',
    description: 'View our transparent financial reports',
  },
  '/partners': {
    title: 'Partners | Educate an Orphan Uganda',
    description: 'Meet our valued partners and sponsors',
  },
  '/loader-demo': {
    title: 'Loader Demo | Educate an Orphan Uganda',
    description: 'Beautiful loading animations demonstration',
  },
  '/notfound': {
    title: 'Page Not Found | Educate an Orphan Uganda',
    description: 'Lost? Every journey leads to growth and education.',
  },
};

const createRoute = (
  path: string,
  element: React.ComponentType
): RouteObject => ({
  path,
  element: <SuspenseWrapper>{React.createElement(element)}</SuspenseWrapper>,
});

const routes: RouteObject[] = [
  createRoute('/', HomePage),
  createRoute('/about', AboutPage),
  createRoute('/programs', ProgramsPage),
  createRoute('/get-involved', GetInvolvedPage),
  createRoute('/donate', DonatePage),
  createRoute('/contact', ContactPage),
  createRoute('/stock-gifts', StockGiftsPage),
  createRoute('/planned-giving', PlannedGivingPage),
  createRoute('/corporate-sponsorship', CorporateSponsorshipPage),
  createRoute('/financial-reports', FinancialReportsPage),
  createRoute('/partners', PartnersPage),
  createRoute('/loader-demo', LoaderDemoPage),
  createRoute('/notfound', NotFoundPage),
];

export { routeMeta };
export default routes;
