import { Link } from 'react-router-dom';

export default function PartnersPage() {
  const platinumPartners = [
    { name: 'Partner 1', logo: 'https://picsum.photos/200/100?random=1' },
    { name: 'Partner 2', logo: 'https://picsum.photos/200/100?random=2' }
  ];

  const goldPartners = [
    { name: 'Partner 3', logo: 'https://picsum.photos/180/90?random=3' },
    { name: 'Partner 4', logo: 'https://picsum.photos/180/90?random=4' },
    { name: 'Partner 5', logo: 'https://picsum.photos/180/90?random=5' }
  ];

  const silverPartners = [
    { name: 'Partner 6', logo: 'https://picsum.photos/160/80?random=6' },
    { name: 'Partner 7', logo: 'https://picsum.photos/160/80?random=7' },
    { name: 'Partner 8', logo: 'https://picsum.photos/160/80?random=8' },
    { name: 'Partner 9', logo: 'https://picsum.photos/160/80?random=9' }
  ];

  return (
    <div className="pt-16 md:pt-0">
      <div className="min-h-screen bg-white">
        {/* Hero Introduction */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">Our Partners in Impact</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8">
            We are deeply grateful to our partners and sponsors who share our vision of transforming lives through education. Together, we are building a brighter future for Uganda's children.
          </p>
          <div className="w-24 sm:w-32 h-0.5 bg-teal-600 mx-auto"></div>
        </div>
      </section>

      {/* Partner Logos Grid */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Platinum Tier */}
          <div className="mb-16 sm:mb-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-teal-600 text-white text-sm sm:text-base font-bold rounded-full whitespace-nowrap">Platinum Partners</div>
              <div className="flex-1 h-px bg-gray-300 w-full"></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {platinumPartners.map((partner, index) => (
                <div
                  key={index}
                  className="aspect-[2/1] bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center p-6 sm:p-8 cursor-pointer"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gold Tier */}
          <div className="mb-16 sm:mb-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-amber-500 text-white text-sm sm:text-base font-bold rounded-full whitespace-nowrap">Gold Partners</div>
              <div className="flex-1 h-px bg-gray-300 w-full"></div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {goldPartners.map((partner, index) => (
                <div
                  key={index}
                  className="aspect-[2/1] bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center p-6 sm:p-8 cursor-pointer"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Silver Tier */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gray-500 text-white text-sm sm:text-base font-bold rounded-full whitespace-nowrap">Silver Partners</div>
              <div className="flex-1 h-px bg-gray-300 w-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {silverPartners.map((partner, index) => (
                <div
                  key={index}
                  className="aspect-square bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center p-4 sm:p-6 cursor-pointer"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Partner With Us</h2>
          <p className="text-base sm:text-lg md:text-xl text-teal-100 mb-8 sm:mb-12 leading-relaxed">
            Join our network of committed partners making a lasting difference in children's education. Together, we can achieve more and create sustainable impact across Uganda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a
              href="#"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-teal-700 text-base sm:text-lg font-semibold rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap cursor-pointer text-center"
            >
              Download Partnership Prospectus
            </a>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-white text-white text-base sm:text-lg font-semibold rounded-full hover:bg-white hover:text-teal-700 transition-all duration-300 whitespace-nowrap cursor-pointer text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Partnership Benefits</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              When you partner with us, you gain more than just brand visibility
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-teal-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-teal-200">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <i className="ri-heart-line text-2xl sm:text-3xl text-white"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Meaningful Impact</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Your partnership directly transforms children's lives through education, creating measurable and lasting change in communities.
              </p>
            </div>

            <div className="bg-amber-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-amber-200">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <i className="ri-team-line text-2xl sm:text-3xl text-white"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Brand Alignment</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Associate your brand with a trusted NGO committed to transparency, integrity, and proven impact in education.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-gray-200">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <i className="ri-trophy-line text-2xl sm:text-3xl text-white"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Recognition</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Receive prominent recognition across our platforms, events, and communications reaching thousands of supporters.
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}