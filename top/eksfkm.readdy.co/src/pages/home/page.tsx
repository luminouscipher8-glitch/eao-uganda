import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import OptimizedImage from '../../components/common/OptimizedImage';
import { preloadCriticalImages } from '../../utils/imagePreloader';
import {
  Counter,
  SlideIn,
  FadeIn,
} from '../../components/common/MicroInteractions';

export default function HomePage() {
  useEffect(() => {
    // Preload critical images
    preloadCriticalImages();
  }, []);

  return (
    <div className="pt-20">
      <div className="min-h-screen bg-white">
        {/* Hero Section with Video Background */}
        <section className="relative h-screen w-full overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <OptimizedImage
              src="https://public.readdy.ai/ai/img_res/3cc681e6458229e2005588fa41cbc6a6.jpg"
              alt="Ugandan school children learning in a bright classroom with educational materials"
              className="w-full h-full object-cover"
              priority={true}
              loading="eager"
              placeholder="blur"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
          </div>

          {/* Hero Content */}
          <div className="relative h-full flex items-center justify-center px-4 sm:px-6">
            <div className="max-w-4xl text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
                Empowering Uganda's Future Through Education
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 sm:mb-12 font-light max-w-3xl mx-auto leading-relaxed px-4">
                Every child deserves the opportunity to learn, grow, and
                transform their community through quality education
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                <Link
                  to="/donate"
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-amber-500 text-white text-base sm:text-lg font-semibold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-2xl hover:shadow-amber-500/50 hover:scale-105 whitespace-nowrap cursor-pointer text-center"
                >
                  Donate Now
                </Link>
                <a
                  href="#impact"
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-3 border-white text-white text-base sm:text-lg font-semibold rounded-full hover:bg-white hover:text-amber-600 transition-all duration-300 whitespace-nowrap cursor-pointer text-center"
                >
                  Our Impact
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <i className="ri-arrow-down-line text-3xl sm:text-4xl text-white/80"></i>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 sm:gap-16">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-full flex items-center justify-center">
                    <i className="ri-compass-3-line text-xl sm:text-2xl text-white"></i>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Our Mission
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  To provide comprehensive educational support to orphaned and
                  vulnerable children in Uganda, ensuring they have access to
                  quality education, essential school materials, and the
                  resources needed to build a brighter future for themselves and
                  their communities.
                </p>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-600 rounded-full flex items-center justify-center">
                    <i className="ri-eye-line text-xl sm:text-2xl text-white"></i>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Our Vision
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  A Uganda where every child, regardless of their circumstances,
                  has equal access to quality education and the opportunity to
                  reach their full potential, breaking the cycle of poverty
                  through knowledge and empowerment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers Section */}
        <section id="impact" className="relative overflow-hidden">
          <div id="impact-section" className="grid md:grid-cols-2">
            {/* Left Side - Dark */}
            <div className="bg-teal-700 py-16 sm:py-24 px-4 sm:px-6 flex items-center justify-center">
              <div className="text-center max-w-lg w-full">
                <FadeIn delay={200}>
                  <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6">
                    <Counter end={2847} duration={2000} delay={500} />
                  </div>
                  <div className="text-lg sm:text-xl uppercase tracking-wider text-teal-200 mb-8">
                    Children Educated
                  </div>
                </FadeIn>
                <FadeIn delay={400}>
                  <div className="text-2xl sm:text-3xl uppercase tracking-wider text-teal-200">
                    Across <Counter end={12} duration={1500} delay={700} />{' '}
                    Districts
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Right Side - Light */}
            <div className="bg-amber-50 py-16 sm:py-24 px-4 sm:px-6 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-8 sm:gap-12 max-w-xl w-full">
                <SlideIn direction="up" delay={600}>
                  <div className="text-center w-16">
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-teal-700 mb-2 sm:mb-3">
                      <Counter end={8} duration={1000} delay={800} />
                    </div>
                    <div className="text-xs sm:text-sm uppercase tracking-wider text-teal-600">
                      Years of Service
                    </div>
                  </div>
                </SlideIn>
                <SlideIn direction="up" delay={800}>
                  <div className="text-center w-24">
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-teal-700 mb-2 sm:mb-3">
                      <Counter
                        end={94}
                        duration={1200}
                        delay={1000}
                        suffix="%"
                      />
                    </div>
                    <div className="text-xs sm:text-sm uppercase tracking-wider text-teal-600">
                      Transparency Score
                    </div>
                  </div>
                </SlideIn>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Showcase */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 sm:mb-16">
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-book-open-line text-lg sm:text-xl text-amber-500"></i>
                <span className="text-xs sm:text-sm uppercase tracking-wider text-amber-600 font-semibold">
                  What We Do
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Transforming Lives Through Education
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed flex items-center">
                  We provide comprehensive support programs that address the
                  educational needs of orphaned and vulnerable children across
                  Uganda, from school fees to essential materials and beyond.
                </p>
              </div>
            </div>

            {/* Programs Grid */}
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {/* Education Support Card */}
              <Link
                to="/programs#education"
                className="group relative h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-102 cursor-pointer"
              >
                <OptimizedImage
                  src="https://readdy.ai/api/search-image?query=Ugandan%20school%20children%20in%20clean%20uniforms%20with%20new%20textbooks%20and%20school%20supplies%20on%20wooden%20desk%2C%20bright%20classroom%20setting%2C%20natural%20lighting%2C%20authentic%20African%20educational%20materials%20including%20notebooks%20pencils%20and%20rulers%2C%20warm%20hopeful%20atmosphere%2C%20close-up%20documentary%20style%20photography%20showing%20details%20of%20scholastic%20materials&width=600&height=800&seq=program-education-001&orientation=portrait"
                  alt="Ugandan school children in clean uniforms with new textbooks and school supplies in a bright classroom setting"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <div className="w-12 sm:w-16 h-1 bg-amber-500 mb-3 sm:mb-4"></div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
                    Education Support
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 mb-3 sm:mb-4 leading-relaxed">
                    School fees, scholastic materials, uniforms, and sanitary
                    support for vulnerable children
                  </p>
                  <span className="inline-flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-4 transition-all text-sm sm:text-base">
                    Learn More <i className="ri-arrow-right-line"></i>
                  </span>
                </div>
              </Link>

              {/* Runs & Events Card */}
              <Link
                to="/programs#events"
                className="group relative h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-102 cursor-pointer"
              >
                <OptimizedImage
                  src="https://readdy.ai/api/search-image?query=vibrant%20charity%20run%20event%20in%20Uganda%20with%20diverse%20participants%20running%20together%20wearing%20colorful%20athletic%20wear%20and%20event%20t-shirts%2C%20energetic%20atmosphere%2C%20community%20gathering%2C%20outdoor%20setting%20with%20Ugandan%20landscape%2C%20action%20photography%20capturing%20movement%20and%20joy%2C%20people%20of%20all%20ages%20participating%20in%20fundraising%20marathon&width=600&height=800&seq=program-events-001&orientation=portrait"
                  alt="Vibrant charity run event in Uganda with diverse participants running together in colorful athletic wear"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  placeholder="blur"
                />
                <div className="absolute top-0 left-0 right-0 h-2 bg-amber-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <div className="w-12 sm:w-16 h-1 bg-teal-400 mb-3 sm:mb-4"></div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
                    Runs & Events
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 mb-3 sm:mb-4 leading-relaxed">
                    Annual fundraising runs and community events that bring
                    people together for education
                  </p>
                  <span className="inline-flex items-center gap-2 text-teal-400 font-semibold group-hover:gap-4 transition-all text-sm sm:text-base">
                    Learn More <i className="ri-arrow-right-line"></i>
                  </span>
                </div>
              </Link>

              {/* School-Building Initiative Card */}
              <Link
                to="/programs#school-building"
                className="group relative h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-102 cursor-pointer"
              >
                <OptimizedImage
                  src="https://readdy.ai/api/search-image?query=construction%20progress%20of%20modern%20school%20building%20in%20Uganda%2C%20architectural%20development%20showing%20new%20classroom%20blocks%20with%20large%20windows%2C%20construction%20site%20with%20workers%2C%20hopeful%20future%20vision%2C%20bright%20daylight%2C%20professional%20architectural%20photography%2C%20building%20materials%20and%20scaffolding%20visible%2C%20educational%20infrastructure%20development%20in%20rural%20African%20setting&width=600&height=800&seq=program-building-001&orientation=portrait"
                  alt="Construction progress of modern school building in Uganda showing new classroom blocks with large windows and construction workers"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <div className="w-12 sm:w-16 h-1 bg-amber-500 mb-3 sm:mb-4"></div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
                    School-Building Initiative
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 mb-3 sm:mb-4 leading-relaxed">
                    Our vision to own and operate a school that serves as a
                    model for quality education
                  </p>
                  <span className="inline-flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-4 transition-all text-sm sm:text-base">
                    Learn More <i className="ri-arrow-right-line"></i>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=beautiful%20Uganda%20landscape%20with%20rolling%20green%20hills%20and%20scattered%20acacia%20trees%20at%20golden%20hour%2C%20peaceful%20rural%20African%20scenery%2C%20wide%20open%20spaces%2C%20natural%20beauty%2C%20slightly%20desaturated%20colors%20for%20elegant%20look%2C%20cinematic%20landscape%20photography%2C%20serene%20atmosphere%20representing%20hope%20and%20possibility&width=1920&height=800&seq=cta-background-001&orientation=landscape"
              alt="Uganda Landscape"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-700 mb-4 sm:mb-6">
                Every Child Deserves Education
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
                Your support can transform a child's life forever. Join us in
                building a brighter future for Uganda's most vulnerable children
                through the power of education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Link
                  to="/donate"
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-amber-500 text-white text-base sm:text-lg font-semibold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap cursor-pointer text-center"
                >
                  Donate Monthly
                </Link>
                <Link
                  to="/donate"
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-teal-700 text-teal-700 text-base sm:text-lg font-semibold rounded-full hover:bg-teal-700 hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer text-center"
                >
                  One-Time Gift
                </Link>
                <Link
                  to="/get-involved"
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-teal-700 text-base sm:text-lg font-semibold rounded-full hover:bg-teal-50 transition-all duration-300 whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  Volunteer <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
