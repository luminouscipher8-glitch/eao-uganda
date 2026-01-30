import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Loader,
  FullPageLoader,
  InlineLoader,
  CardSkeletonLoader,
} from '../../components/common/Loader';
import { useLoading } from '../../components/providers/LoadingProvider';

export default function LoaderDemoPage() {
  const { setLoading, setLoadingMessage } = useLoading();
  const [showFullPage, setShowFullPage] = useState(false);

  const demonstrateFullPageLoader = () => {
    setLoadingMessage('Loading educational resources...');
    setLoading(true);
    setShowFullPage(true);
    setTimeout(() => {
      setLoading(false);
      setShowFullPage(false);
    }, 3000);
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-teal-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Loader Components
              </h1>
              <p className="text-gray-600 mt-2">
                Beautiful, context-aware loading animations for Educate an
                Orphan Uganda
              </p>
            </div>
            <Link
              to="/"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Educational-Themed Loaders
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our custom loaders feature graduation caps, books, and pencils -
            perfect symbols of education and empowerment for Uganda's children.
          </p>
        </div>

        {/* Loader Sizes */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
            Loader Sizes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-600 mb-4">Small</h4>
              <Loader size="sm" text="Loading data..." />
            </div>
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-600 mb-4">Medium</h4>
              <Loader size="md" text="Processing..." />
            </div>
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-600 mb-4">Large</h4>
              <Loader size="lg" text="Preparing content..." />
            </div>
          </div>
        </div>

        {/* Inline Loader */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
            Inline Loader
          </h3>
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Submitting donation...</span>
              <InlineLoader />
            </div>
          </div>
        </div>

        {/* Card Skeleton Loader */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
            Card Skeleton Loader
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardSkeletonLoader />
            <CardSkeletonLoader />
            <CardSkeletonLoader />
          </div>
        </div>

        {/* Full Page Loader Demo */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-8">
            Full Page Loader
          </h3>
          <button
            onClick={demonstrateFullPageLoader}
            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-amber-500 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Demonstrate Full Page Loader
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Click to see the full-page loader in action (3 seconds)
          </p>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <i className="ri-graduation-cap-line text-2xl text-teal-600"></i>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Educational Theme
            </h4>
            <p className="text-sm text-gray-600">
              Graduation caps, books, and pencils symbolize learning
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <i className="ri-palette-line text-2xl text-amber-600"></i>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Brand Colors</h4>
            <p className="text-sm text-gray-600">
              Teal and amber colors match site branding
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <i className="ri-magic-line text-2xl text-purple-600"></i>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Smooth Animations
            </h4>
            <p className="text-sm text-gray-600">
              Multiple rings with staggered animations
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <i className="ri-responsive-line text-2xl text-green-600"></i>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Multiple Sizes</h4>
            <p className="text-sm text-gray-600">
              Small, medium, and large variants
            </p>
          </div>
        </div>
      </div>

      {/* Full Page Loader Overlay */}
      {showFullPage && (
        <FullPageLoader message="Loading educational resources..." />
      )}
    </div>
  );
}
