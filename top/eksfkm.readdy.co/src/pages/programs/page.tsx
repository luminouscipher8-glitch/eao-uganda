import { Link } from 'react-router-dom';

export default function ProgramsPage() {

  const educationServices = [
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'School Fees',
      items: [
        'Full tuition coverage for primary and secondary education',
        'Exam registration fees',
        'School development funds',
        'Parent-teacher association contributions'
      ],
      impact: 'Over 2,000 children currently enrolled in school'
    },
    {
      icon: 'ri-book-2-line',
      title: 'Scholastic Materials',
      items: [
        'Textbooks and exercise books',
        'Pens, pencils, and writing materials',
        'Mathematical instruments and calculators',
        'Art supplies and science materials'
      ],
      impact: '15,000+ books distributed annually'
    },
    {
      icon: 'ri-shirt-line',
      title: 'School Uniforms',
      items: [
        'Complete uniform sets (shirts, trousers/skirts)',
        'School shoes and socks',
        'Sports uniforms for physical education',
        'Seasonal replacements as children grow'
      ],
      impact: '3,500+ uniforms provided each year'
    },
    {
      icon: 'ri-heart-pulse-line',
      title: 'Sanitary Support',
      items: [
        'Monthly sanitary pad supplies for girls',
        'Hygiene education and workshops',
        'Reusable sanitary products',
        'Private changing facilities advocacy'
      ],
      impact: '95% improvement in girls\' school attendance'
    }
  ];

  const eventGallery = [
    {
      title: '2023 Annual Run',
      participants: '850+',
      raised: 'UGX 45M',
      image: 'https://public.readdy.ai/ai/img_res/a5c06f7bdd7e432e599ac1ef54d09652.jpg'
    },
    {
      title: 'Community Celebration',
      participants: '500+',
      raised: 'UGX 12M',
      image: 'https://readdy.ai/api/search-image?query=vibrant%20community%20celebration%20event%20in%20Uganda%20with%20families%20and%20children%2C%20colorful%20decorations%20and%20banners%2C%20outdoor%20gathering%20with%20food%20and%20activities%2C%20joyful%20atmosphere%2C%20people%20dancing%20and%20celebrating%20together%2C%20documentary%20photography%20showing%20community%20unity&width=600&height=400&seq=event-gallery-002&orientation=landscape'
    },
    {
      title: 'School Fundraiser',
      participants: '300+',
      raised: 'UGX 8M',
      image: 'https://readdy.ai/api/search-image?query=school%20fundraising%20event%20in%20Uganda%20with%20students%20and%20parents%2C%20educational%20activities%20and%20displays%2C%20outdoor%20school%20compound%20setting%2C%20children%20showcasing%20their%20work%2C%20community%20engagement%2C%20warm%20atmosphere%20of%20support%20and%20encouragement&width=600&height=400&seq=event-gallery-003&orientation=landscape'
    },
    {
      title: 'Corporate Partnership Day',
      participants: '200+',
      raised: 'UGX 25M',
      image: 'https://readdy.ai/api/search-image?query=professional%20corporate%20partnership%20event%20in%20Uganda%2C%20business%20people%20and%20community%20leaders%20networking%2C%20formal%20outdoor%20setting%20with%20branded%20materials%2C%20handshakes%20and%20collaboration%2C%20professional%20event%20photography%20showing%20partnership%20building&width=600&height=400&seq=event-gallery-004&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[400px] sm:h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=wide%20angle%20view%20of%20bright%20Ugandan%20classroom%20filled%20with%20engaged%20students%20learning%2C%20teacher%20at%20blackboard%2C%20natural%20sunlight%20streaming%20through%20large%20windows%2C%20authentic%20African%20educational%20environment%2C%20slightly%20blurred%20background%20for%20text%20overlay%2C%20warm%20and%20inviting%20atmosphere&width=1920&height=800&seq=programs-hero-001&orientation=landscape"
            alt="Our Programs"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl">
            <div className="text-white/80 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
              <Link to="/" className="hover:text-white transition-colors cursor-pointer">Home</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span>Programs</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">Our Programs</h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light">Building Futures, One Child at a Time</p>
          </div>
        </div>
      </section>

      {/* Education Support Section */}
      <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <div className="inline-block px-4 sm:px-6 py-2 bg-teal-600 text-white text-sm sm:text-base font-semibold rounded-full mb-4 sm:mb-6">
              Core Program
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Education Support</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl">
              Our comprehensive education support program addresses every barrier that prevents vulnerable children from accessing quality education. From school fees to essential materials, we ensure that financial constraints never stand between a child and their dreams.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {educationServices.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-teal-600 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <i className={`${service.icon} text-xl sm:text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{service.title}</h3>
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <i className="ri-check-line text-teal-600 mt-1 flex-shrink-0 text-sm sm:text-base"></i>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 sm:pt-6 border-t border-gray-200">
                  <p className="text-xs sm:text-sm font-semibold text-teal-700">{service.impact}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <Link
              to="/donate"
              className="inline-block w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-amber-500 text-white text-base sm:text-lg font-semibold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              Support Education Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Runs & Events Section */}
      <section id="events" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
            {/* Left Column - Sticky Content */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Educate an Orphan Run</h2>
                <p className="text-base sm:text-lg md:text-xl text-teal-100 mb-6 sm:mb-8 leading-relaxed">
                  Our annual flagship fundraising event brings together runners, walkers, and supporters from across Uganda and beyond. Every step taken is a step toward educational opportunity for vulnerable children.
                </p>
                
                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full">
                      <span className="text-xl sm:text-2xl font-bold text-white">850+</span>
                    </div>
                    <span className="text-sm sm:text-base text-teal-100">Participants in 2023</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full">
                      <span className="text-xl sm:text-2xl font-bold text-white">UGX 45M</span>
                    </div>
                    <span className="text-sm sm:text-base text-teal-100">Raised Last Year</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 rounded-full">
                      <span className="text-xl sm:text-2xl font-bold text-white">4 Years</span>
                    </div>
                    <span className="text-sm sm:text-base text-teal-100">Running Strong</span>
                  </div>
                </div>

                <Link
                  to="/get-involved"
                  className="inline-block w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-teal-700 text-base sm:text-lg font-semibold rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer text-center"
                >
                  Register for Next Event
                </Link>
              </div>
            </div>

            {/* Right Column - Photo Gallery */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {eventGallery.map((event, index) => (
                  <div
                    key={index}
                    className="group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="aspect-[4/3]">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                      <div className="text-white">
                        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{event.title}</h3>
                        <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm">
                          <span className="flex items-center gap-1">
                            <i className="ri-user-line"></i> {event.participants}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-money-dollar-circle-line"></i> {event.raised}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School-Building Initiative */}
      <section id="school-building" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Our Vision: A School of Our Own</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              We envision owning and operating a model school that provides world-class education to vulnerable children while serving as a training ground for innovative teaching methods across Uganda.
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="mb-12 sm:mb-16">
            <div className="bg-gray-100 rounded-full h-5 sm:h-6 overflow-hidden mb-3 sm:mb-4">
              <div className="bg-gradient-to-r from-teal-600 to-amber-500 h-full rounded-full" style={{ width: '35%' }}></div>
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-gray-600">
              <span className="font-semibold text-teal-700">35% Complete</span>
              <span>Target: UGX 2.5 Billion</span>
            </div>
          </div>

          {/* Three-Column Breakdown */}
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="bg-teal-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-teal-200">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <i className="ri-checkbox-circle-line text-2xl sm:text-3xl text-white"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Current Status</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-700 mb-4 sm:mb-6">
                <li className="flex items-start gap-2 text-sm sm:text-base">
                  <i className="ri-check-line text-teal-600 mt-1 flex-shrink-0"></i>
                  <span>Land acquired (5 acres)</span>
                </li>
                <li className="flex items-start gap-2 text-sm sm:text-base">
                  <i className="ri-check-line text-teal-600 mt-1 flex-shrink-0"></i>
                  <span>Architectural plans completed</span>
                </li>
                <li className="flex items-start gap-2 text-sm sm:text-base">
                  <i className="ri-check-line text-teal-600 mt-1 flex-shrink-0"></i>
                  <span>Government approvals secured</span>
                </li>
                <li className="flex items-start gap-2 text-sm sm:text-base">
                  <i className="ri-check-line text-teal-600 mt-1 flex-shrink-0"></i>
                  <span>Foundation work begun</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-amber-200">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <i className="ri-roadster-line text-2xl sm:text-3xl text-white"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Next Steps</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-700 mb-4 sm:mb-6">
                <li className="flex items-start gap-2 text-sm sm:text-base">
                  <i className="ri-arrow-right-line text-amber-600 mt-1 flex-shrink-0"></i>
                  <span>Complete classroom blocks</span>
                </li>
                <li className="flex items-start gap-2 text-sm sm:text-base">
                  <i className="ri-arrow-right-line text-amber-600 mt-1 flex-shrink-0"></i>
                  <span>Install water and sanitation</span>
                </li>
                <li className="flex items-start gap-2 text-sm sm:text-base">
                  <i className="ri-arrow-right-line text-amber-600 mt-1 flex-shrink-0"></i>
                  <span>Build library and computer lab</span>
                </li>
                <li className="flex items-start gap-2 text-sm sm:text-base">
                  <i className="ri-arrow-right-line text-amber-600 mt-1 flex-shrink-0"></i>
                  <span>Recruit qualified teachers</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-gray-200">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <i className="ri-hand-heart-line text-2xl sm:text-3xl text-white"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">How to Help</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-700 mb-4 sm:mb-6">
                <li className="flex items-start gap-2 text-sm sm:text-base">
                  <i className="ri-heart-line text-gray-600 mt-1 flex-shrink-0"></i>
                  <span>Make a one-time donation</span>
                </li>
                <li className="flex items-start gap-2 text-sm sm:text-base">
                  <i className="ri-heart-line text-gray-600 mt-1 flex-shrink-0"></i>
                  <span>Become a monthly supporter</span>
                </li>
                <li className="flex items-start gap-2 text-sm sm:text-base">
                  <i className="ri-heart-line text-gray-600 mt-1 flex-shrink-0"></i>
                  <span>Sponsor a classroom</span>
                </li>
                <li className="flex items-start gap-2 text-sm sm:text-base">
                  <i className="ri-heart-line text-gray-600 mt-1 flex-shrink-0"></i>
                  <span>Partner with your company</span>
                </li>
              </ul>
              <Link
                to="/donate"
                className="block w-full text-center px-4 sm:px-6 py-2.5 sm:py-3 bg-teal-600 text-white text-sm sm:text-base font-semibold rounded-full hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Contribute Now
              </Link>
            </div>
          </div>

          {/* Vision Image */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://readdy.ai/api/search-image?query=architectural%20rendering%20of%20modern%20African%20school%20building%20with%20large%20windows%20and%20open%20spaces%2C%20contemporary%20educational%20facility%20design%20in%20Uganda%2C%20bright%20and%20welcoming%20structure%20with%20green%20surroundings%2C%20professional%20architectural%20visualization%20showing%20classrooms%20and%20outdoor%20learning%20areas%2C%20hopeful%20vision%20of%20future%20education&width=1200&height=600&seq=school-vision-001&orientation=landscape"
              alt="School Vision"
              className="w-full h-64 sm:h-80 md:h-96 object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Transform Lives Through Education</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
            Your support makes all of these programs possible. Join us in creating lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              to="/donate"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-amber-500 text-white text-base sm:text-lg font-semibold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap cursor-pointer text-center"
            >
              Donate Today
            </Link>
            <Link
              to="/get-involved"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-white text-white text-base sm:text-lg font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 whitespace-nowrap cursor-pointer text-center"
            >
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
