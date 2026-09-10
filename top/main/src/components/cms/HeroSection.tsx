import React from 'react';
import { Link } from 'react-router-dom';
import { useHomePageDemo } from '../../hooks/useContentfulDemo.ts';
import { ImageWithFallback } from '../common/ImageWithFallback.tsx';

const HeroSection: React.FC = () => {
  const { data, loading, error } = useHomePageDemo();

  if (loading) {
    return (
      <section className="relative w-full bg-gray-200 animate-pulse">
        <div className="w-full h-96 bg-gray-300"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="h-8 bg-gray-400 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-400 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data.length) {
    return (
      <section className="relative w-full bg-teal-700">
        <div className="w-full grid lg:grid-cols-2">
          <div className="bg-teal-700 py-16 sm:py-20 md:py-24 lg:py-32 px-6 sm:px-8 md:px-12 flex items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                Transform Lives Through Education
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-teal-100 mb-8 sm:mb-10 md:mb-12 leading-relaxed">
                Join us in our mission to provide quality education to orphaned
                children in Uganda.
              </p>
              <Link
                to="/donate"
                className="inline-flex items-center px-8 py-4 bg-white text-teal-700 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Donate Now
              </Link>
            </div>
          </div>
          <div className="bg-teal-600 py-16 sm:py-20 md:py-24 lg:py-32 px-6 sm:px-8 md:px-12 flex items-center">
            <div className="w-full h-64 sm:h-80 md:h-96 lg:h-full min-h-[300px] rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="/images/hero-education.jpg"
                alt="Children learning in classroom"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const homePage = data[0];

  return (
    <section className="relative w-full bg-teal-700">
      <div className="w-full grid lg:grid-cols-2">
        <div className="bg-teal-700 py-16 sm:py-20 md:py-24 lg:py-32 px-6 sm:px-8 md:px-12 flex items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              {homePage.fields.heroTitle}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-teal-100 mb-8 sm:mb-10 md:mb-12 leading-relaxed">
              {homePage.fields.heroSubtitle}
            </p>
            <Link
              to="/donate"
              className="inline-flex items-center px-8 py-4 bg-white text-teal-700 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              {homePage.fields.callToAction}
            </Link>
          </div>
        </div>
        <div className="bg-teal-600 py-16 sm:py-20 md:py-24 lg:py-32 px-6 sm:px-8 md:px-12 flex items-center">
          <div className="w-full h-64 sm:h-80 md:h-96 lg:h-full min-h-[300px] rounded-lg overflow-hidden shadow-2xl">
            <ImageWithFallback
              src={
                homePage.fields.heroImage?.fields?.file?.url ||
                '/images/hero-education.jpg'
              }
              alt={
                homePage.fields.heroImage?.fields?.description ||
                'Children learning in classroom'
              }
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      {homePage.fields.impactStats && (
        <div className="bg-white py-12 px-6 sm:px-8 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {homePage.fields.impactStats.map((stat: any, index: number) => (
                <div key={index} className="group">
                  <div className="text-4xl sm:text-5xl font-bold text-teal-700 mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-lg group-hover:text-gray-800 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
