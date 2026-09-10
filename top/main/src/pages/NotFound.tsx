import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  const inspirationalQuotes = [
    'Every journey begins with a single step.',
    'Lost? Sometimes the best discoveries happen when we wander.',
    'Education is the most powerful weapon which you can use to change the world.',
    'The beautiful thing about learning is nobody can take it away from you.',
    'A child without education is like a bird without wings.',
  ];

  const randomQuote =
    inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-teal-50 via-amber-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-teal-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-amber-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-purple-200/20 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-pink-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl w-full">
          <div className="text-center">
            {/* 404 Number */}
            <div className="mb-8 relative">
              <div className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-teal-600 via-amber-600 to-purple-600 bg-clip-text text-transparent">
                404
              </div>
              <div className="absolute inset-0 text-8xl sm:text-9xl font-bold text-gray-200 blur-3xl -z-10">
                404
              </div>
            </div>

            {/* Main Message */}
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                Even the brightest minds sometimes take a wrong turn. But don't
                worry - every journey, even the unexpected ones, leads to
                growth.
              </p>
            </div>

            {/* Inspirational Quote */}
            <div className="mb-12">
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50 max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <i className="ri-quote-left text-3xl text-teal-500"></i>
                </div>
                <p className="text-lg sm:text-xl text-gray-700 italic mb-4">
                  "{randomQuote}"
                </p>
                <p className="text-sm text-gray-500">- Nelson Mandela</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/"
                className="group px-8 py-4 bg-gradient-to-r from-teal-600 to-amber-600 text-white font-semibold rounded-2xl hover:from-teal-700 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3"
              >
                <i className="ri-home-line text-xl group-hover:rotate-12 transition-transform"></i>
                <span>Go Home</span>
                <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform"></i>
              </Link>

              <Link
                to="/contact"
                className="group px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3 border border-gray-200"
              >
                <i className="ri-heart-line text-xl group-hover:scale-110 transition-transform"></i>
                <span>Support Our Mission</span>
              </Link>
            </div>

            {/* Educational Impact Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">
                  500+
                </div>
                <div className="text-sm text-gray-600">Children Educated</div>
              </div>
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">
                  20+
                </div>
                <div className="text-sm text-gray-600">Schools Built</div>
              </div>
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  1000+
                </div>
                <div className="text-sm text-gray-600">Lives Changed</div>
              </div>
            </div>

            {/* Hopeful Message */}
            <div className="mt-12">
              <p className="text-sm text-gray-500 italic">
                While you're here, remember: every child deserves an education.
                Together, we can make that happen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6">
        <Link
          to="/about"
          className="text-gray-400 hover:text-teal-600 transition-colors"
        >
          <i className="ri-information-line text-xl"></i>
        </Link>
        <Link
          to="/programs"
          className="text-gray-400 hover:text-teal-600 transition-colors"
        >
          <i className="ri-book-open-line text-xl"></i>
        </Link>
        <Link
          to="/donate"
          className="text-gray-400 hover:text-teal-600 transition-colors"
        >
          <i className="ri-heart-line text-xl"></i>
        </Link>
        <Link
          to="/contact"
          className="text-gray-400 hover:text-teal-600 transition-colors"
        >
          <i className="ri-mail-line text-xl"></i>
        </Link>
      </div>
    </div>
  );
}
