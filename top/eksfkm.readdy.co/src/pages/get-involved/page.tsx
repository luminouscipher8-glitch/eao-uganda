import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLoading } from '../../components/providers/LoadingProvider';
import { InlineLoader } from '../../components/common/Loader';
import { toast } from '../../components/common/Toast';
import { GetInvolvedStructuredData } from '../../components/seo/StructuredData';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';

export default function GetInvolvedPage() {
  const [activeTab, setActiveTab] = useState('local');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const { setLoading, setLoadingMessage } = useLoading();

  const handleRegister = async () => {
    // Show inline loading state
    setIsRegistering(true);

    // Show full page loader for processing
    setLoadingMessage('Processing your registration...');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Success
      toast.success(
        'Registration Successful!',
        'Thank you for registering! We will contact you soon with more details.'
      );
    } catch (error) {
      toast.error(
        'Registration Failed',
        'Error processing registration. Please try again or contact support.'
      );
    } finally {
      setLoading(false);
      setIsRegistering(false);
    }
  };

  const localOpportunities = [
    {
      icon: 'ri-book-open-line',
      title: 'Teaching Assistant',
      description:
        'Help children with homework and reading in our after-school programs',
      commitment: '4-8 hours/week',
      location: 'Kampala & Districts',
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Mentorship Program',
      description: 'Become a mentor to guide and inspire vulnerable children',
      commitment: '2-4 hours/week',
      location: 'All Districts',
    },
    {
      icon: 'ri-camera-line',
      title: 'Event Photography',
      description: 'Document our programs and events to share our impact',
      commitment: 'Flexible',
      location: 'Event-based',
    },
    {
      icon: 'ri-team-line',
      title: 'Community Outreach',
      description:
        'Help identify and enroll vulnerable children in our programs',
      commitment: '6-10 hours/week',
      location: 'Rural Districts',
    },
  ];

  const internationalOpportunities = [
    {
      icon: 'ri-global-line',
      title: 'Virtual Tutoring',
      description: 'Provide online tutoring in English, Math, or Science',
      commitment: '2-4 hours/week',
      location: 'Remote',
    },
    {
      icon: 'ri-funds-line',
      title: 'Fundraising Coordinator',
      description: 'Organize fundraising events in your country',
      commitment: 'Flexible',
      location: 'Remote',
    },
    {
      icon: 'ri-article-line',
      title: 'Content Creator',
      description: 'Write blog posts and create social media content',
      commitment: '3-5 hours/week',
      location: 'Remote',
    },
    {
      icon: 'ri-translate-2',
      title: 'Translation Services',
      description: 'Help translate materials for international donors',
      commitment: 'Flexible',
      location: 'Remote',
    },
  ];

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
        'Our Annual Charity Run is the highlight of our fundraising calendar! This family-friendly event features multiple race categories, live entertainment, refreshment stations, and amazing finisher medals. Every step you take helps provide education to vulnerable children across Uganda.',
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
    {
      id: 4,
      date: { day: '28', month: 'Apr' },
      title: 'Donor Appreciation Dinner',
      time: '6:00 PM - 9:00 PM',
      location: 'Serena Hotel, Kampala',
      type: 'Networking',
      description:
        'An elegant evening celebrating our generous donors and showcasing the impact of their contributions to education in Uganda.',
      fullDescription:
        'Join us for an unforgettable evening of gratitude and celebration at the prestigious Serena Hotel. This exclusive event honors our incredible donors who make our work possible. Enjoy fine dining, inspiring success stories, and networking with fellow changemakers.',
      image:
        'https://readdy.ai/api/search-image?query=elegant%20charity%20dinner%20event%20at%20Serena%20Hotel%20Kampala%2C%20formal%20dining%20setting%2C%20people%20networking%2C%20gala%20event%2C%20upscale%20restaurant%2C%20celebration%20dinner%2C%20professional%20event%2C%20sophisticated%20atmosphere&width=600&height=400&seq=event-004&orientation=landscape',
      highlights: [
        '3-Course Gourmet Dinner',
        'Success Story Presentations',
        'Live Entertainment',
        'Silent Auction',
        'Networking Session',
      ],
      registration: 'By Invitation Only',
      contact: 'donors@eao-uganda.org | +256 789 123459',
      capacity: '150 guests',
      whatToBring: [
        'Formal attire',
        'Business cards',
        'Your inspiring stories!',
      ],
    },
    {
      id: 5,
      date: { day: '15', month: 'May' },
      title: 'Education Summit',
      time: '9:00 AM - 4:00 PM',
      location: 'Makerere University',
      type: 'Conference',
      description:
        'Bringing together educators, policymakers, and community leaders to discuss the future of education in Uganda.',
      fullDescription:
        'The premier education conference in Uganda! This summit features keynote speakers from the Ministry of Education, successful education innovators, and interactive workshops on improving educational outcomes. Network with stakeholders and shape the future of Ugandan education.',
      image:
        'https://readdy.ai/api/search-image?query=education%20summit%20conference%20at%20Makerere%20University%20Uganda%2C%20professional%20conference%20setting%2C%20educators%20and%20policymakers%2C%20presentation%20stage%2C%20audience%20listening%2C%20academic%20environment%2C%20professional%20development%20event%2C%20university%20setting&width=600&height=400&seq=event-005&orientation=landscape',
      highlights: [
        'Keynote Speakers',
        'Interactive Workshops',
        'Panel Discussions',
        'Networking Lunch',
        'Certificate of Participation',
      ],
      registration: 'Students: UGX 20,000 | Professionals: UGX 50,000',
      contact: 'summit@eao-uganda.org | +256 789 123460',
      capacity: '300 participants',
      whatToBring: [
        'Laptop or tablet',
        'Business cards',
        'Notebook',
        'Ideas to share!',
      ],
    },
    {
      id: 6,
      date: { day: '01', month: 'Jun' },
      title: "Children's Day Celebration",
      time: '10:00 AM - 3:00 PM',
      location: 'Program Schools',
      type: 'Celebration',
      description:
        'A joyous celebration of our children with performances, games, and activities showcasing their talents and achievements.',
      fullDescription:
        'The most heartwarming event of our calendar! Join us as we celebrate the incredible progress and talents of the children in our programs. Enjoy cultural performances, art exhibitions, sports activities, and the sheer joy of childhood dreams coming true.',
      image:
        'https://readdy.ai/api/search-image?query=children%27s%20day%20celebration%20in%20Ugandan%20school%2C%20happy%20children%20performing%2C%20cultural%20dances%2C%20school%20celebration%2C%20colorful%20decorations%2C%20kids%20playing%20games%2C%20joyful%20atmosphere%2C%20community%20celebration%2C%20education%20success%20stories&width=600&height=400&seq=event-006&orientation=landscape',
      highlights: [
        'Cultural Performances',
        'Art Exhibition',
        'Sports Activities',
        'Awards Ceremony',
        'Family Fun Activities',
      ],
      registration: 'Free for All',
      contact: 'celebration@eao-uganda.org | +256 789 123461',
      capacity: '500+ attendees',
      whatToBring: [
        'Comfortable clothes',
        'Camera',
        'Your smile!',
        'Gifts for children (optional)',
      ],
    },
  ];

  const volunteerProfiles = [
    {
      id: 1,
      name: 'Sarah Nalubega',
      role: 'Teaching Assistant',
      location: 'Kampala',
      hours: 450,
      story:
        "I started volunteering as a teaching assistant 2 years ago. Seeing children who once struggled with reading now excelling brings me so much joy. Every hour spent is an investment in Uganda's future.",
      impact: 'Helped 23 students improve their reading skills',
      image:
        'https://readdy.ai/api/search-image?query=portrait%20of%20young%20Ugandan%20woman%20volunteer%20teaching%20assistant%2C%20warm%20smile%2C%20classroom%20setting%2C%25%20years%20old%2C%20passionate%20educator%2C%20natural%20lighting%2C%20authentic%20teaching%20environment&width=400&height=400&seq=volunteer-001&orientation=squarish',
      skills: ['Teaching', 'Mentoring', 'Child Development'],
    },
    {
      id: 2,
      name: 'David Muwanga',
      role: 'Event Photographer',
      location: 'Entebbe',
      hours: 320,
      story:
        "As a professional photographer, I wanted to use my skills to give back. Capturing the joy and hope in these children's faces during our events reminds me why I started this journey.",
      impact: 'Documented 15+ events and created awareness campaigns',
      image:
        'https://readdy.ai/api/search-image?query=portrait%20of%20Ugandan%20male%20photographer%20volunteer%2C%20professional%20camera%20equipment%2C%30%20years%20old%2C%20creative%20and%20passionate%2C%20outdoor%20event%20setting%2C%20natural%20lighting&width=400&height=400&seq=volunteer-002&orientation=squarish',
      skills: ['Photography', 'Event Documentation', 'Social Media'],
    },
    {
      id: 3,
      name: 'Grace Nakato',
      role: 'Mentor',
      location: 'Jinja',
      hours: 280,
      story:
        'Being a mentor has been incredibly rewarding. I guide teenage girls through challenges and help them build confidence. Seeing them grow into strong young women is the best reward.',
      impact: 'Mentored 12 girls, 8 now in university',
      image:
        'https://readdy.ai/api/search-image?query=portrait%20of%20Ugandan%20woman%20mentor%2C%28%20years%20old%2C%20professional%20and%20caring%20expression%2C%20community%20setting%2C%20empowerment%20and%20guidance%20focus%2C%20natural%20lighting&width=400&height=400&seq=volunteer-003&orientation=squarish',
      skills: ['Mentoring', 'Counseling', "Girls' Empowerment"],
    },
    {
      id: 4,
      name: 'Peter Ssebaggala',
      role: 'Community Outreach',
      location: 'Mukono',
      hours: 380,
      story:
        'I connect with families in rural areas to identify children who need our support. Every home visit reveals stories of hope and resilience that inspire me to do more.',
      impact: 'Enrolled 45+ children in our programs',
      image:
        'https://readdy.ai/api/search-image?query=portrait%20of%20Ugandan%20man%20community%20outreach%20coordinator%2C%32%20years%20old%2C%20friendly%20and%20approachable%2C%20rural%20community%20setting%2C%20grassroots%20organizing%2C%20natural%20lighting&width=400&height=400&seq=volunteer-004&orientation=squarish',
      skills: ['Community Engagement', 'Home Visits', 'Needs Assessment'],
    },
    {
      id: 5,
      name: 'Rebecca Atim',
      role: 'Virtual Tutor',
      location: 'Remote (USA)',
      hours: 200,
      story:
        "Though I'm in the US, technology lets me make a difference. I tutor students in English and Math online. The dedication of these children despite challenges is truly inspiring.",
      impact: 'Provided 150+ online tutoring sessions',
      image:
        'https://readdy.ai/api/search-image?query=portrait%20of%20African%20woman%20virtual%20tutor%2C%20home%20office%20setting%20with%20computer%2C%27%20years%20old%2C%20international%20volunteer%2C%20online%20education%2C%20professional%20remote%20work%20environment&width=400&height=400&seq=volunteer-005&orientation=squarish',
      skills: ['Online Tutoring', 'English', 'Mathematics'],
    },
    {
      id: 6,
      name: 'John Okello',
      role: 'Fundraising Coordinator',
      location: 'Gulu',
      hours: 260,
      story:
        "Organizing fundraising events in my community has brought people together for a common cause. Every shilling raised directly impacts children's education and futures.",
      impact: 'Raised UGX 2.5M through local events',
      image:
        'https://readdy.ai/api/search-image?query=portrait%20of%20Ugandan%20man%20fundraising%20coordinator%2C%35%20years%20old%2C%20event%20planning%20setting%2C%20community%20leadership%2C%20professional%20and%20enthusiastic%2C%20natural%20lighting&width=400&height=400&seq=volunteer-006&orientation=squarish',
      skills: ['Event Planning', 'Fundraising', 'Community Relations'],
    },
  ];

  const searchedVolunteers = searchQuery
    ? volunteerProfiles.filter(
        volunteer =>
          volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          volunteer.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          volunteer.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
          volunteer.location
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          volunteer.skills.some(skill =>
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : volunteerProfiles;

  const displayVolunteers = searchedVolunteers.slice(0, 3);

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
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Volunteer Opportunities
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Join our team of dedicated volunteers making a real difference
                in children's lives
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
              {(activeTab === 'local'
                ? localOpportunities
                : internationalOpportunities
              ).map((opportunity, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-teal-600 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i
                        className={`${opportunity.icon} text-2xl sm:text-3xl text-white`}
                      ></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                        {opportunity.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                        {opportunity.description}
                      </p>
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
                Join us at our events and be part of the change
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedEvent(event)}
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
                      <div className="mt-3 flex items-center gap-2 text-teal-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>View Details</span>
                        <i className="ri-arrow-right-line"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100">
              {/* Modal Header with Image */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg hover:scale-110"
                >
                  <i className="ri-close-line text-2xl text-gray-800"></i>
                </button>

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl px-6 py-3 shadow-xl">
                  <div className="text-3xl font-bold">
                    {selectedEvent.date.day}
                  </div>
                  <div className="text-sm uppercase tracking-wide">
                    {selectedEvent.date.month}
                  </div>
                </div>

                {/* Event Type Badge */}
                <div className="absolute top-4 left-32 bg-white/90 backdrop-blur-sm text-teal-700 rounded-full px-4 py-2 shadow-lg">
                  <span className="text-sm font-semibold">
                    {selectedEvent.type}
                  </span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 text-white/90 text-sm">
                    <div className="flex items-center gap-2">
                      <i className="ri-time-line text-amber-400"></i>
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-map-pin-line text-amber-400"></i>
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-22rem)]">
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                      <i className="ri-information-line text-teal-600 text-xl"></i>
                    </div>
                    About This Event
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedEvent.fullDescription}
                  </p>
                </div>

                {/* Event Highlights */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <i className="ri-star-line text-amber-600 text-xl"></i>
                    </div>
                    Event Highlights
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedEvent.highlights.map(
                      (highlight: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 bg-gradient-to-r from-teal-50 to-amber-50 rounded-xl p-4 border border-teal-100"
                        >
                          <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="ri-check-line text-white text-sm"></i>
                          </div>
                          <span className="text-gray-700 font-medium">
                            {highlight}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Practical Information */}
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  {/* Registration */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <i className="ri-ticket-line text-teal-600 text-xl"></i>
                      Registration
                    </h4>
                    <p className="text-gray-700 font-medium mb-2">
                      {selectedEvent.registration}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="ri-group-line text-amber-500"></i>
                      <span>Capacity: {selectedEvent.capacity}</span>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <i className="ri-phone-line text-teal-600 text-xl"></i>
                      Contact
                    </h4>
                    <p className="text-gray-700 text-sm mb-2">
                      {selectedEvent.contact}
                    </p>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
                        <i className="ri-mail-line mr-1"></i>
                        Email
                      </button>
                      <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors">
                        <i className="ri-phone-line mr-1"></i>
                        Call
                      </button>
                    </div>
                  </div>
                </div>

                {/* What to Bring */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <i className="ri-shopping-bag-line text-amber-600 text-xl"></i>
                    </div>
                    What to Bring
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.whatToBring.map(
                      (item: string, index: number) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 pb-12 border-t border-gray-200">
                  <button
                    onClick={handleRegister}
                    disabled={isRegistering}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold rounded-2xl hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    {isRegistering ? (
                      <InlineLoader />
                    ) : (
                      <>
                        <i className="ri-calendar-check-line mr-2"></i>
                        Register Now
                      </>
                    )}
                  </button>
                  <button className="flex-1 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                    <i className="ri-share-line mr-2"></i>
                    Share Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Volunteer Profiles Section */}
        <section
          id="volunteer-profiles"
          className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Meet Our Volunteers
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Dedicated individuals making a real difference in children's
                lives across Uganda and beyond
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayVolunteers.map(volunteer => (
                <div
                  key={volunteer.id}
                  className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={volunteer.image}
                      alt={volunteer.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-semibold shadow-md">
                      {volunteer.hours}+ hours
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                        {volunteer.name}
                      </h3>
                      <p className="text-base sm:text-lg text-teal-600 font-semibold mb-2">
                        {volunteer.role}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <i className="ri-map-pin-line"></i>
                        <span>{volunteer.location}</span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 line-clamp-4">
                      "{volunteer.story}"
                    </p>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-teal-600 mb-2">
                        <i className="ri-trophy-line text-lg"></i>
                        <span className="text-sm font-semibold">
                          {volunteer.impact}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {volunteer.skills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 sm:mt-16">
              {searchedVolunteers.length > 3 && (
                <button
                  onClick={() => setShowSearchModal(true)}
                  className="inline-block w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-teal-600 text-white text-base sm:text-lg font-semibold rounded-full hover:bg-teal-700 transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap cursor-pointer mb-4"
                >
                  View All Volunteers ({searchedVolunteers.length} total)
                </button>
              )}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Join Our Volunteer Community
                </h3>
                <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                  Become part of our growing team of dedicated volunteers.
                  Whether you have a few hours a week or want to contribute
                  regularly, there's a place for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                  <Link
                    to="/contact"
                    className="inline-block w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-amber-500 text-white text-base sm:text-lg font-semibold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap cursor-pointer text-center"
                  >
                    Start Volunteering
                  </Link>
                  <Link
                    to="/donate"
                    className="inline-block w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-teal-700 text-base sm:text-lg font-semibold rounded-full hover:bg-teal-50 transition-all duration-300 border-2 border-teal-600 whitespace-nowrap cursor-pointer text-center"
                  >
                    Support Our Volunteers
                  </Link>
                </div>
              </div>
            </div>

            {/* Search Modal */}
            {showSearchModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        All Volunteer Profiles
                      </h3>
                      <button
                        onClick={() => {
                          setShowSearchModal(false);
                          setSearchQuery('');
                        }}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <i className="ri-close-line text-xl text-gray-600"></i>
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search volunteers by name, role, location, or skills..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                      <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                    </div>
                  </div>
                  <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchedVolunteers.map(volunteer => (
                        <div
                          key={volunteer.id}
                          className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-teal-600 hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                          <div className="aspect-square relative overflow-hidden bg-gray-50">
                            <img
                              src={volunteer.image}
                              alt={volunteer.name}
                              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-semibold shadow-md">
                              {volunteer.hours}+ hours
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="text-lg font-bold text-gray-900 mb-1">
                              {volunteer.name}
                            </h4>
                            <p className="text-sm text-teal-600 font-semibold mb-2">
                              {volunteer.role}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                              <i className="ri-map-pin-line"></i>
                              <span>{volunteer.location}</span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-3">
                              "{volunteer.story}"
                            </p>
                            <div className="flex items-center gap-2 text-teal-600 text-sm mb-3">
                              <i className="ri-trophy-line"></i>
                              <span className="font-semibold">
                                {volunteer.impact}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {volunteer.skills.map(
                                (skill: string, index: number) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium"
                                  >
                                    {skill}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {searchedVolunteers.length === 0 && (
                      <div className="text-center py-12">
                        <i className="ri-search-line text-4xl text-gray-300 mb-4"></i>
                        <p className="text-gray-500">
                          No volunteers found matching "{searchQuery}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-teal-700 to-teal-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-teal-100 mb-8 sm:mb-12 leading-relaxed">
              Every action counts. Whether you volunteer, fundraise, or attend
              events, you're helping transform lives through education.
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
