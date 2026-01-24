import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function GetInvolvedPage() {
  const [activeTab, setActiveTab] = useState('local');

  const localOpportunities = [
    {
      icon: 'ri-book-open-line',
      title: 'Teaching Assistant',
      description: 'Help children with homework and reading in our after-school programs',
      commitment: '4-8 hours/week',
      location: 'Kampala & Districts'
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Mentorship Program',
      description: 'Become a mentor to guide and inspire vulnerable children',
      commitment: '2-4 hours/week',
      location: 'All Districts'
    },
    {
      icon: 'ri-camera-line',
      title: 'Event Photography',
      description: 'Document our programs and events to share our impact',
      commitment: 'Flexible',
      location: 'Event-based'
    },
    {
      icon: 'ri-team-line',
      title: 'Community Outreach',
      description: 'Help identify and enroll vulnerable children in our programs',
      commitment: '6-10 hours/week',
      location: 'Rural Districts'
    }
  ];

  const internationalOpportunities = [
    {
      icon: 'ri-global-line',
      title: 'Virtual Tutoring',
      description: 'Provide online tutoring in English, Math, or Science',
      commitment: '2-4 hours/week',
      location: 'Remote'
    },
    {
      icon: 'ri-funds-line',
      title: 'Fundraising Coordinator',
      description: 'Organize fundraising events in your country',
      commitment: 'Flexible',
      location: 'Remote'
    },
    {
      icon: 'ri-article-line',
      title: 'Content Creator',
      description: 'Write blog posts and create social media content',
      commitment: '3-5 hours/week',
      location: 'Remote'
    },
    {
      icon: 'ri-translate-2',
      title: 'Translation Services',
      description: 'Help translate materials for international donors',
      commitment: 'Flexible',
      location: 'Remote'
    }
  ];

  const fundraisingSteps = [
    {
      number: '1',
      title: 'Choose Your Cause',
      description: 'Select a specific program or initiative you want to support - education support, school building, or general operations.',
      icon: 'ri-heart-line'
    },
    {
      number: '2',
      title: 'Set Your Goal',
      description: 'Decide how much you want to raise and create your personal fundraising page with your story and motivation.',
      icon: 'ri-flag-line'
    },
    {
      number: '3',
      title: 'Share Your Page',
      description: 'Spread the word through social media, email, and personal networks. We provide templates and support materials.',
      icon: 'ri-share-line'
    },
    {
      number: '4',
      title: 'Track Your Impact',
      description: 'Watch your donations grow and see exactly how your efforts are transforming children\'s lives in real-time.',
      icon: 'ri-line-chart-line'
    }
  ];

  const upcomingEvents = [
    {
      date: { day: '15', month: 'Mar' },
      title: 'Annual Charity Run 2024',
      time: '7:00 AM - 12:00 PM',
      location: 'Kololo Independence Grounds',
      type: 'Fundraising'
    },
    {
      date: { day: '22', month: 'Mar' },
      title: 'Volunteer Orientation',
      time: '2:00 PM - 5:00 PM',
      location: 'Main Office, Kampala',
      type: 'Training'
    },
    {
      date: { day: '10', month: 'Apr' },
      title: 'School Supply Drive',
      time: 'All Day',
      location: 'Multiple Locations',
      type: 'Community'
    },
    {
      date: { day: '28', month: 'Apr' },
      title: 'Donor Appreciation Dinner',
      time: '6:00 PM - 9:00 PM',
      location: 'Serena Hotel, Kampala',
      type: 'Networking'
    },
    {
      date: { day: '15', month: 'May' },
      title: 'Education Summit',
      time: '9:00 AM - 4:00 PM',
      location: 'Makerere University',
      type: 'Conference'
    },
    {
      date: { day: '01', month: 'Jun' },
      title: 'Children\'s Day Celebration',
      time: '10:00 AM - 3:00 PM',
      location: 'Program Schools',
      type: 'Celebration'
    }
  ];

  return (
    <div className="pt-16 md:pt-0">
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative w-full">
        <div className="w-full grid lg:grid-cols-2">
          {/* Left Half */}
          <div className="bg-teal-700 py-16 sm:py-20 md:py-24 lg:py-32 px-6 sm:px-8 md:px-12 flex items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">Join Our Mission</h1>
              <p className="text-lg sm:text-xl md:text-2xl text-teal-100 mb-8 sm:mb-10 md:mb-12 leading-relaxed">
                There are many ways to make a difference. Whether you volunteer your time, raise funds, or participate in events, your contribution transforms lives.
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

          {/* Right Half - Photo Collage */}
          <div className="relative h-[500px] sm:h-[600px] lg:h-auto lg:min-h-[600px] bg-gray-100">
            <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2 sm:p-4">
              <img
                src="https://public.readdy.ai/ai/img_res/9876ce4b0f9a5322109bcc39ab11d8e8.jpg"
                alt="Volunteers"
                className="w-full h-full object-cover object-top rounded-xl sm:rounded-2xl shadow-lg"
              />
              <img
                src="https://readdy.ai/api/search-image?query=diverse%20group%20of%20people%20at%20charity%20fundraising%20event%20in%20Uganda%2C%20colorful%20atmosphere%2C%20community%20gathering%2C%20people%20of%20different%20ages%20participating%20together%2C%20joyful%20expressions%2C%20event%20photography&width=400&height=400&seq=volunteer-collage-002&orientation=squarish"
                alt="Events"
                className="w-full h-full object-cover object-top rounded-xl sm:rounded-2xl shadow-lg mt-4 sm:mt-8"
              />
              <img
                src="https://readdy.ai/api/search-image?query=volunteers%20distributing%20school%20supplies%20to%20Ugandan%20children%2C%20books%20and%20materials%20being%20handed%20out%2C%20grateful%20expressions%2C%20community%20service%20in%20action%2C%20warm%20atmosphere%2C%20documentary%20style&width=400&height=400&seq=volunteer-collage-003&orientation=squarish"
                alt="Community"
                className="w-full h-full object-cover object-top rounded-xl sm:rounded-2xl shadow-lg -mt-4 sm:-mt-8"
              />
              <img
                src="https://readdy.ai/api/search-image?query=group%20of%20international%20and%20local%20volunteers%20together%20in%20Uganda%2C%20diverse%20team%20working%20on%20education%20project%2C%20collaborative%20atmosphere%2C%20outdoor%20setting%2C%20professional%20photography%20showing%20unity%20and%20purpose&width=400&height=400&seq=volunteer-collage-004&orientation=squarish"
                alt="Team"
                className="w-full h-full object-cover object-top rounded-xl sm:rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section id="volunteer" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Volunteer Opportunities</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Join our team of dedicated volunteers making a real difference in children's lives
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-10 sm:mb-12">
            <div className="inline-flex bg-gray-100 rounded-full p-1 w-full max-w-md">
              <button
                onClick={() => setActiveTab('local')}
                className={`flex-1 px-4 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === 'local'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Local Volunteers
              </button>
              <button
                onClick={() => setActiveTab('international')}
                className={`flex-1 px-4 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === 'international'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                International
              </button>
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {(activeTab === 'local' ? localOpportunities : internationalOpportunities).map((opportunity, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-teal-600 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`${opportunity.icon} text-2xl sm:text-3xl text-white`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{opportunity.title}</h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">{opportunity.description}</p>
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-100 text-amber-700 rounded-full text-xs sm:text-sm font-medium">
                        <i className="ri-time-line mr-1"></i>
                        {opportunity.commitment}
                      </span>
                      <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-100 text-teal-700 rounded-full text-xs sm:text-sm font-medium">
                        <i className="ri-map-pin-line mr-1"></i>
                        {opportunity.location}
                      </span>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-teal-600 text-sm sm:text-base font-semibold hover:gap-4 transition-all cursor-pointer"
                    >
                      Apply Now <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fundraising Section */}
      <section id="fundraise" className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Start Your Fundraising Campaign</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Create your own fundraising page and rally your network to support education in Uganda
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
                    <span className="text-4xl sm:text-5xl font-bold text-white">{step.number}</span>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg w-full">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className={`${step.icon} text-xl sm:text-2xl text-amber-600`}></i>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{step.title}</h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">{step.description}</p>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Upcoming Events</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Join us at our events and be part of the change
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl border-2 border-gray-200 hover:border-teal-600 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div className="flex">
                  <div className="w-20 sm:w-24 bg-teal-700 flex flex-col items-center justify-center p-3 sm:p-4 flex-shrink-0">
                    <div className="text-3xl sm:text-4xl font-bold text-white">{event.date.day}</div>
                    <div className="text-xs sm:text-sm uppercase text-teal-200">{event.date.month}</div>
                  </div>
                  <div className="flex-1 p-4 sm:p-6">
                    <div className="inline-block px-2.5 sm:px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-2 sm:mb-3">
                      {event.type}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <i className="ri-time-line text-teal-600"></i>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-map-pin-line text-teal-600"></i>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-teal-700 to-teal-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Ready to Make a Difference?</h2>
          <p className="text-base sm:text-lg md:text-xl text-teal-100 mb-8 sm:mb-12 leading-relaxed">
            Every action counts. Whether you volunteer, fundraise, or attend events, you're helping transform lives through education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-teal-700 text-base sm:text-lg font-semibold rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap cursor-pointer text-center"
            >
              Contact Us Today
            </Link>
            <Link
              to="/donate"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-amber-500 text-white text-base sm:text-lg font-semibold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap cursor-pointer text-center"
            >
              Donate Instead
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}