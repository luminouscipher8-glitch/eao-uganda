import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import SuspenseWrapper from '../components/common/SuspenseWrapper.tsx';

// Lazy loaded components with error boundaries
const HomePage = lazy(() => import('../pages/home/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const ProgramsPage = lazy(() => import('../pages/programs/page'));
const GetInvolvedPage = lazy(() => import('../pages/get-involved/page'));
const DonatePage = lazy(() => import('../pages/donate/page'));
const DonationSuccessPage = lazy(() => import('../pages/donation/success'));
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
const ShopPage = lazy(() => import('../pages/shop/page'));
const BlogPage = lazy(() => import('../pages/blog/page'));
const BlogPostPage = lazy(() => import('../pages/blog/[id]/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

// Admin routes
const AdminLogin = lazy(() => import('../pages/admin/login/page'));
const AdminDashboard = lazy(() => import('../pages/admin/dashboard/page'));
const AdminPrograms = lazy(() => import('../pages/admin/programs/page'));
const AdminNews = lazy(() => import('../pages/admin/news/page'));
const AdminContacts = lazy(() => import('../pages/admin/contacts/page'));
const AdminDonations = lazy(() => import('../pages/admin/donations/page'));
const AdminVolunteers = lazy(() => import('../pages/admin/volunteers/page'));

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
  '/donation/success': {
    title: 'Donation Success | Educate an Orphan Uganda',
    description: 'Thank you for your generous donation',
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
  '/shop': {
    title: 'Shop | Educate an Orphan Uganda',
    description: 'Support our mission through meaningful merchandise',
  },
  '/blog': {
    title: 'Blog | Educate an Orphan Uganda',
    description: 'Stories of hope, transformation, and educational impact across Uganda',
  },
  '/notfound': {
    title: 'Page Not Found | Educate an Orphan Uganda',
    description: 'Lost? Every journey leads to growth and education.',
  },
  // Admin routes
  '/admin/login': {
    title: 'Admin Login | Educate an Orphan Uganda',
    description: 'Secure admin login portal',
  },
  // Admin routes
  '/admin': {
    title: 'Admin Dashboard | Educate an Orphan Uganda',
    description: 'Admin dashboard for content management',
  },
  '/admin/programs': {
    title: 'Programs Management | Admin',
    description: 'Manage educational programs',
  },
  '/admin/news': {
    title: 'News Management | Admin',
    description: 'Manage news and updates',
  },
  '/admin/contacts': {
    title: 'Contacts Management | Admin',
    description: 'Manage contact submissions',
  },
  '/admin/donations': {
    title: 'Donations Management | Admin',
    description: 'Manage donation records',
  },
  '/admin/volunteers': {
    title: 'Volunteers Management | Admin',
    description: 'Manage volunteer applications',
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
  createRoute('/donation/success', DonationSuccessPage),
  createRoute('/contact', ContactPage),
  createRoute('/stock-gifts', StockGiftsPage),
  createRoute('/planned-giving', PlannedGivingPage),
  createRoute('/corporate-sponsorship', CorporateSponsorshipPage),
  createRoute('/financial-reports', FinancialReportsPage),
  createRoute('/partners', PartnersPage),
  createRoute('/shop', ShopPage),
  createRoute('/blog', BlogPage),
  createRoute('/blog/:id', BlogPostPage),
  createRoute('/notfound', NotFoundPage),
  // Admin routes
  createRoute('/admin/login', AdminLogin),
  createRoute('/admin', AdminDashboard),
  createRoute('/admin/programs', AdminPrograms),
  createRoute('/admin/news', AdminNews),
  createRoute('/admin/contacts', AdminContacts),
  createRoute('/admin/donations', AdminDonations),
  createRoute('/admin/volunteers', AdminVolunteers),
];

export { routeMeta };
export default routes;
