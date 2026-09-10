import { Link } from 'react-router-dom';
import { GetInvolvedStructuredData } from '../../components/seo/StructuredData.tsx';
import { ImageWithFallback } from "../../components/common/ImageWithFallback.js";
import VolunteerForm from '../../components/forms/VolunteerForm.tsx';

export default function GetInvolvedPage() {

  const fundraisingSteps = [
    {
      number: '1',
      title: 'Choose Your Cause',
      description:
        'Select a specific program or initiative you want to support - education support, school building, or general operations.',
      icon: 'ri-heart-line',
    },
    {
      number: '2',
      title: 'Set Your Goal',
      description:
        'Decide how much you want to raise and create your personal fundraising page with your story and motivation.',
      icon: 'ri-flag-line',
    },
    {
      number: '3',
      title: 'Share Your Page',
      description:
        'Spread the word through social media, email, and personal networks. We provide templates and support materials.',
      icon: 'ri-share-line',
    },
    {
      number: '4',
      title: 'Track Your Impact',
      description:
        "Watch your donations grow and see exactly how your efforts are transforming children's lives in real-time.",
      icon: 'ri-line-chart-line',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      date: { day: '15', month: 'Mar' },
      title: 'Annual Charity Run 2024',
      time: '7:00 AM - 12:00 PM',
      location: 'Kololo Independence Grounds',
      type: 'Fundraising',
      description:
        'Join our flagship charity run bringing together thousands of supporters to raise funds for education. Choose from 5K, 10K, or half-marathon routes through scenic Kampala.',
      fullDescription:
        'Our Annual Charity Run is a highlight of our fundraising calendar! This family-friendly event features multiple race categories, live entertainment, refreshment stations, and amazing finisher medals. Every step you take helps provide education to vulnerable children across Uganda.',
      image:
        'https://readdy.ai/api/search-image?query=charity%20run%20event%20in%20Uganda%2C%20diverse%20group%20of%20runners%2C%20morning%20light%2C%20Kampala%20scenery%2C%20people%20wearing%20running%20clothes%2C%20event%20banners%2C%20community%20gathering%2C%20outdoor%20exercise%2C%20fundraising%20event&width=600&height=400&seq=event-001&orientation=landscape',
      highlights: [
        '5K/10K/Half Marathon Options',
        'Family Fun Run',
        'Live Music & Entertainment',
        'Finisher Medals for All',
        'Post-Run Celebration',
      ],
      registration: 'Early Bird: UGX 25,000 | Regular: UGX 35,000',
      contact: 'events@eao-uganda.org | +256 789 123456',
      capacity: '1000 participants',
      whatToBring: [
        'Running shoes',
        'Water bottle',
        'Sunscreen',
        'Positive energy!',
      ],
    },
    {
      id: 2,
      date: { day: '22', month: 'Mar' },
      title: 'Volunteer Orientation',
      time: '2:00 PM - 5:00 PM',
      location: 'Main Office, Kampala',
      type: 'Training',
      description:
        'New volunteer welcome session with training, team introductions, and program overview. Perfect for those looking to join our mission.',
      fullDescription:
        'Welcome to the EAO family! This comprehensive orientation session will introduce you to our programs, volunteer opportunities, and the incredible impact we make together. Meet our team, learn about child protection policies, and discover how your unique skills can transform lives.',
      image:
        'https://readdy.ai/api/search-image?query=volunteer%20orientation%20session%20in%20Uganda%2C%20diverse%20group%20of%20people%20in%20meeting%2C%20training%20session%2C%20community%20organization%20office%2C%20people%20learning%20together%2C%20presentation%20screen%2C%20collaborative%20environment%2C%20warm%20lighting&width=600&height=400&seq=event-002&orientation=landscape',
      highlights: [
        'Program Overview',
        'Meet the Team',
        'Training Materials',
        'Q&A Session',
        'Networking Opportunities',
      ],
      registration: 'Free - Registration Required',
      contact: 'volunteer@eao-uganda.org | +256 789 123457',
      capacity: '50 participants',
      whatToBring: [
        'Notebook and pen',
        'ID document',
        'Questions and enthusiasm!',
      ],
    },
    {
      id: 3,
      date: { day: '10', month: 'Apr' },
      title: 'School Supply Drive',
      time: 'All Day',
      location: 'Multiple Locations',
      type: 'Community',
      description:
        'Help us collect and distribute essential school supplies to children in need across Uganda. Drop-off locations available nationwide.',
      fullDescription:
        'Education starts with the right tools! Join us in our nationwide school supply drive to ensure every child has access to notebooks, pens, pencils, and other essential learning materials. Collection points available in major towns and cities.',
      image:
        'https://readdy.ai/api/search-image?query=school%20supply%20drive%20in%20Uganda%2C%20people%20donating%20books%20and%20stationery%2C%20children%20receiving%20school%20materials%2C%20community%20service%20event%2C%20boxes%20of%20supplies%2C%20happy%20children%20with%20new%20school%20items%2C%20education%20charity%20event&width=600&height=400&seq=event-003&orientation=landscape',
      highlights: [
        'Nationwide Collection Points',
        'Most Needed Items List',
        'Corporate Partnership Opportunities',
        'School Distribution Events',
        'Impact Tracking',
      ],
      registration: 'Free - Drop donations anytime',
      contact: 'supplies@eao-uganda.org | +256 789 123458',
      capacity: 'Unlimited participation',
      whatToBring: [
        'New school supplies',
        'Backpacks',
        'Math sets',
        'Art supplies',
        'Story books',
      ],
    },
  ];

  return (
    <div className="pt-20">
      <GetInvolvedStructuredData />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative w-full">
          <div className="w-full grid lg:grid-cols-2">
            {/* Left Half */}
            <div className="bg-teal-700 py-16 sm:py-20 md:py-24 lg:py-32 px-6 sm:px-8 md:px-12 flex items-center">
              <div className="max-w-xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                  Join Our Mission
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-teal-100 mb-8 sm:mb-10 md:mb-12 leading-relaxed">
                  There are many ways to make a difference. Whether you
                  volunteer your time, raise funds, or participate in events,
                  your contribution transforms lives.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <a
                    href="#volunteer"
                    className="block w-full px-6 sm:px-8 py-4 sm:py-5 bg-white text-teal-700 text-base sm:text-lg font-semibold rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 text-center cursor-pointer whitespace-nowrap"
                  >
                    Volunteer With Us
                  </a>
                  <a
                    href="#fundraise"
                    className="block w-full px-6 sm:px-8 py-4 sm:py-5 bg-white text-teal-700 text-base sm:text-lg font-semibold rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 text-center cursor-pointer whitespace-nowrap"
                  >
                    Start Fundraising
                  </a>
                </div>
              </div>
            </div>

            {/* Right Half - Enhanced Photo Collage */}
            <div className="relative h-[500px] sm:h-[600px] lg:h-auto lg:min-h-[600px] bg-gradient-to-br from-teal-50 to-amber-50 overflow-hidden">
              <div className="absolute inset-0 p-4 sm:p-6">
                {/* Main large image */}
                <div className="absolute top-4 left-4 right-4 bottom-1/2 sm:bottom-1/3">
                  <ImageWithFallback
                    src="https://public.readdy.ai/ai/img_res/9876ce4b0f9a5322109bcc39ab11d8e8.jpg"
                    alt="Volunteers in action"
                    className="w-full h-full object-cover object-center rounded-2xl shadow-2xl"
                    loading="eager"
                    fallbackType="gradient"
                    fallbackColor="bg-gradient-to-br from-teal-100 to-amber-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="bg-amber-500 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-2">
                      500+ Volunteers
                    </div>
                    <p className="text-lg font-bold">
                      Making a Difference Together
                    </p>
                  </div>
                </div>

                {/* Small floating images */}
                <div className="absolute bottom-4 left-4 w-1/3 h-32 sm:h-40">
                  <img
                    src="https://readdy.ai/api/search-image?query=volunteers%20distributing%20school%20supplies%20to%20Ugandan%20children%2C%20books%20and%20materials%20being%20handed%20out%2C%20grateful%20expressions%2C%20community%20service%20in%20action%2C%20warm%20atmosphere%2C%20documentary%20style&width=400&height=400&seq=volunteer-collage-003&orientation=squarish"
                    alt="Community service"
                    className="w-full h-full object-cover object-center rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="absolute bottom-4 right-4 w-1/3 h-32 sm:h-40">
                  <img
                    src="https://readdy.ai/api/search-image?query=diverse%20group%20of%20people%20at%20charity%20fundraising%20event%20in%20Uganda%2C%20colorful%20atmosphere%2C%20community%20gathering%2C%20people%20of%20different%20ages%20participating%20together%2C%20joyful%20expressions%2C%20event%20photography&width=400&height=400&seq=volunteer-collage-002&orientation=squarish"
                    alt="Fundraising event"
                    className="w-full h-full object-cover object-center rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Stats overlay */}
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">15+</div>
                    <div className="text-xs text-gray-600">Years Impact</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section
          id="volunteer"
          className="py-16 sm:py-24 px-4 sm:px-6 bg-white"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Become a Volunteer
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Join our team of dedicated volunteers making a real difference
                in children's lives
              </p>
            </div>

            {/* Volunteer Form */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full mb-6 text-sm font-medium">
                  <i className="ri-user-heart-line"></i>
                  Volunteer Application Form
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Join Our Mission
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  Thank you for your interest in volunteering with Educate an Orphan Uganda. 
                  Please fill out the form below and we'll contact you soon.
                </p>
              </div>
              
              <VolunteerForm />
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 text-center">
                  <strong>Next Steps:</strong> After submitting your application, our team will review it 
                  and contact you within 3-5 business days to discuss potential opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fundraising Section */}
        <section
          id="fundraise"
          className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Start Your Fundraising Campaign
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Create your own fundraising page and rally your network to
                support education in Uganda
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-10 sm:space-y-16">
              {fundraisingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-12 ${index % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center shadow-2xl">
                      <span className="text-4xl sm:text-5xl font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg w-full">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i
                          className={`${step.icon} text-xl sm:text-2xl text-amber-600`}
                        ></i>
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 sm:mt-16">
              <Link
                to="/contact"
                className="inline-block w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-5 bg-amber-500 text-white text-base sm:text-lg font-semibold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap cursor-pointer"
              >
                Start Your Campaign
              </Link>
            </div>
          </div>
        </section>

        {/* Event Calendar */}
        <section id="events" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Upcoming Events
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Join us at our events and be part of change
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {upcomingEvents.map((event: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl border-2 border-gray-200 hover:border-teal-600 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
                >
                  <div className="flex">
                    <div className="w-20 sm:w-24 bg-gradient-to-br from-teal-700 to-teal-600 flex flex-col items-center justify-center p-3 sm:p-4 flex-shrink-0 group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-300">
                      <div className="text-3xl sm:text-4xl font-bold text-white">
                        {event.date.day}
                      </div>
                      <div className="text-xs sm:text-sm uppercase text-teal-100">
                        {event.date.month}
                      </div>
                    </div>
                    <div className="flex-1 p-4 sm:p-6">
                      <div className="inline-block px-2.5 sm:px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-2 sm:mb-3">
                        {event.type}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-100 text-amber-700 rounded-full text-xs sm:text-sm font-medium">
                          <i className="ri-time-line mr-1"></i>
                          {event.time}
                        </span>
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-100 text-teal-700 rounded-full text-xs sm:text-sm font-medium">
                          <i className="ri-map-pin-line mr-1"></i>
                          {event.location}
                        </span>
                      </div>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-teal-600 text-sm sm:text-base font-semibold hover:gap-4 transition-all cursor-pointer"
                      >
                        Register Now <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
