import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PartnersPage() {
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  const platinumPartners = [
    {
      id: 1,
      name: 'UNICEF Uganda',
      logo: 'https://readdy.ai/api/search-image?query=UNICEF%20Uganda%20official%20logo%2C%20blue%20and%20white%20branding%2C%20professional%20organization%20logo%2C%20United%20Nations%20Children%27s%20Fund%2C%20clean%20background%2C%20high%20resolution&width=400&height=200&seq=partner-unicef&orientation=landscape',
      tier: 'Platinum',
      since: '2018',
      description:
        "Leading global partner supporting children's education and welfare programs across Uganda.",
      fullDescription:
        "UNICEF Uganda has been our cornerstone partner since 2018, providing strategic support, funding, and technical expertise for our education initiatives. Their commitment to ensuring every child has access to quality education aligns perfectly with our mission. Through this partnership, we've reached over 50,000 children with educational support, school supplies, and learning materials.",
      website: 'https://www.unicef.org/uganda',
      impact: 'Reached 50,000+ children with educational support',
      projects: [
        'School Feeding Program',
        'Digital Learning Initiative',
        'Teacher Training Workshops',
        'Child Protection Systems',
      ],
      testimonial:
        'Our partnership with EAO has transformed educational outcomes for vulnerable children across Uganda. Their grassroots approach and commitment make them an ideal implementation partner.',
      contact: 'partnership@unicef.ug',
      image:
        'https://readdy.ai/api/search-image?query=UNICEF%20Uganda%20staff%20working%20with%20Ugandan%20children%20in%20classroom%2C%20education%20program%2C%20professional%20development%2C%20community%20outreach%2C%20international%20organization%20activities%2C%20authentic%20setting&width=600&height=400&seq=partner-unicef-work&orientation=landscape',
      achievements: [
        '50,000+ children reached',
        '120 schools supported',
        '500 teachers trained',
        'UGX 2B+ funding contributed',
      ],
    },
    {
      id: 2,
      name: 'World Bank Uganda',
      logo: 'https://readdy.ai/api/search-image?query=World%20Bank%20Uganda%20official%20logo%2C%20blue%20and%20white%20branding%2C%20international%20finance%20organization%2C%20professional%20logo%2C%20clean%20background%2C%20high%20resolution%20official%20emblem&width=400&height=200&seq=partner-worldbank&orientation=landscape',
      tier: 'Platinum',
      since: '2019',
      description:
        'Premier financial partner supporting infrastructure development and educational programs.',
      fullDescription:
        'The World Bank Uganda partnership focuses on building sustainable educational infrastructure and implementing large-scale learning programs. Their financial expertise and global best practices have helped us develop robust systems for educational delivery. This strategic partnership has enabled the construction of 15 new schools and renovation of 30 existing educational facilities.',
      website: 'https://www.worldbank.org/en/country/uganda',
      impact: '15 new schools built, 30 schools renovated',
      projects: [
        'School Infrastructure Development',
        'Education Technology Integration',
        'Teacher Capacity Building',
        'Community Engagement Programs',
      ],
      testimonial:
        'EAO demonstrates exceptional accountability and impact in educational development. Their work represents the kind of grassroots change we aim to support globally.',
      contact: 'uganda@worldbank.org',
      image:
        'https://readdy.ai/api/search-image?query=World%20Bank%20Uganda%20education%20project%20inauguration%2C%20new%20school%20building%2C%20ribbon%20cutting%20ceremony%2C%20officials%20and%20community%20members%2C%20development%20project%20launch%2C%20professional%20event&width=600&height=400&seq=partner-worldbank-project&orientation=landscape',
      achievements: [
        '45 schools improved',
        '25,000 students benefited',
        'UGX 5B+ infrastructure investment',
        '200+ jobs created',
      ],
    },
  ];

  const goldPartners = [
    {
      id: 3,
      name: 'Stanbic Bank Uganda',
      logo: 'https://readdy.ai/api/search-image?query=Stanbic%20Bank%20Uganda%20official%20logo%2C%20blue%20branding%2C%20commercial%20bank%20logo%2C%20professional%20financial%20institution%2C%20clean%20background%2C%20high%20resolution%20corporate%20logo&width=350&height=180&seq=partner-stanbic&orientation=landscape',
      tier: 'Gold',
      since: '2020',
      description:
        'Leading financial institution supporting financial literacy and educational entrepreneurship.',
      fullDescription:
        'Stanbic Bank Uganda brings financial expertise and resources to our educational programs. Their focus on financial literacy for students and support for educational entrepreneurship has created sustainable impact. Through their "Banking on Education" initiative, they\'ve helped us establish school banking programs and financial education curricula.',
      website: 'https://www.stanbicbank.co.ug',
      impact: 'Financial literacy programs in 40+ schools',
      projects: [
        'School Banking Program',
        'Financial Literacy Curriculum',
        'Education Scholarship Fund',
        'Teacher Financial Wellness',
      ],
      testimonial:
        "Partnering with EAO allows us to invest in Uganda's future by empowering young people with financial knowledge and skills for economic independence.",
      contact: 'partnerships@stanbicbank.co.ug',
      image:
        'https://readdy.ai/api/search-image?query=Stanbic%20Bank%20Uganda%20financial%20literacy%20program%2C%20students%20learning%20banking%2C%20educational%20workshop%2C%20bank%20staff%20teaching%20children%2C%20community%20education%20program%2C%20professional%20setting&width=600&height=400&seq=partner-stanbic-program&orientation=landscape',
      achievements: [
        '40+ schools reached',
        '10,000+ students trained',
        'UGX 500M+ in scholarships',
        '20 school banking branches',
      ],
    },
    {
      id: 4,
      name: 'MTN Uganda',
      logo: 'https://readdy.ai/api/search-image?query=MTN%20Uganda%20official%20logo%2C%20red%20and%20white%20branding%2C%20telecommunications%20company%20logo%2C%20professional%20tech%20company%2C%20clean%20background%2C%20high%20resolution%20corporate%20logo&width=350&height=180&seq=partner-mtn&orientation=landscape',
      tier: 'Gold',
      since: '2021',
      description:
        'Telecommunications leader enabling digital learning and connectivity solutions.',
      fullDescription:
        'MTN Uganda revolutionizes our educational delivery through digital innovation. Their support has enabled us to implement e-learning solutions, provide internet connectivity to rural schools, and develop digital learning platforms. The "MTN E-Learning Initiative" has bridged the digital divide for thousands of students.',
      website: 'https://www.mtn.co.ug',
      impact: 'Digital learning access for 30,000+ students',
      projects: [
        'E-Learning Platform',
        'School Connectivity Program',
        'Digital Skills Training',
        'Mobile Learning Apps',
      ],
      testimonial:
        'MTN is proud to power digital education in Uganda. Our partnership with EAO ensures no child is left behind in the digital age.',
      contact: 'foundation@mtn.co.ug',
      image:
        'https://readdy.ai/api/search-image?query=MTN%20Uganda%20digital%20learning%20program%2C%20students%20using%20tablets%20in%20classroom%2C%20technology%20in%20education%2C%20telecommunications%20company%20CSR%20project%2C%20children%20learning%20with%20devices%2C%20modern%20classroom&width=600&height=400&seq=partner-mtn-digital&orientation=landscape',
      achievements: [
        '30,000+ students connected',
        '50 schools with internet',
        '100+ teachers trained in digital skills',
        'UGX 300M+ tech investment',
      ],
    },
    {
      id: 5,
      name: 'Coca-Cola Uganda',
      logo: 'https://readdy.ai/api/search-image?query=Coca-Cola%20Uganda%20official%20logo%2C%20red%20and%20white%20branding%2C%20beverage%20company%20logo%2C%20professional%20corporate%20logo%2C%20clean%20background%2C%20high%20resolution%20brand%20logo&width=350&height=180&seq=partner-cocacola&orientation=landscape',
      tier: 'Gold',
      since: '2019',
      description:
        'Global beverage brand supporting youth education and community development programs.',
      fullDescription:
        'Coca-Cola Uganda\'s commitment to community development extends to education through their "Education for All" initiative. Their support focuses on school infrastructure, water and sanitation facilities, and youth empowerment programs. They\'ve been instrumental in creating conducive learning environments.',
      website: 'https://www.coca-colacompany.com/uganda',
      impact: 'School facilities improved for 20,000+ students',
      projects: [
        'School Water Systems',
        'Youth Empowerment Programs',
        'Sports and Education',
        'Community Learning Centers',
      ],
      testimonial:
        'Education is the foundation of community development. Our partnership with EAO helps build brighter futures, one child at a time.',
      contact: 'uganda.foundation@coca-cola.com',
      image:
        'https://readdy.ai/api/search-image?query=Coca-Cola%20Uganda%20education%20project%2C%20school%20water%20system%20inauguration%2C%20students%20with%20clean%20water%2C%20corporate%20social%20responsibility%20project%2C%20community%20development%20program%2C%20happy%20children&width=600&height=400&seq=partner-cocacola-project&orientation=landscape',
      achievements: [
        '25 schools with water systems',
        '15,000+ students with clean water',
        'UGX 400M+ facility investment',
        '50 youth empowerment workshops',
      ],
    },
  ];

  const silverPartners = [
    {
      id: 6,
      name: 'Uganda Breweries',
      logo: 'https://readdy.ai/api/search-image?query=Uganda%20Breweries%20official%20logo%2C%20beer%20company%20logo%2C%20professional%20brewery%20brand%2C%20corporate%20logo%2C%20clean%20background%2C%20high%20resolution%20beverage%20company%20logo&width=300&height=150&seq=partner-ugandabreweries&orientation=landscape',
      tier: 'Silver',
      since: '2020',
      description:
        'Leading brewery supporting vocational training and skills development programs.',
      fullDescription:
        'Uganda Breweries invests in skills development and vocational training for older students. Their "Skills for Life" program prepares students for employment and entrepreneurship. They provide equipment, training materials, and internship opportunities for technical skills development.',
      website: 'https://www.ugandabreweries.com',
      impact: 'Vocational training for 5,000+ youth',
      projects: [
        'Vocational Training Centers',
        'Skills Development Workshops',
        'Internship Programs',
        'Entrepreneurship Support',
      ],
      testimonial:
        'We believe in equipping young people with practical skills for employment. Our partnership with EAO creates pathways to economic independence.',
      contact: 'csr@ugandabreweries.com',
      image:
        'https://readdy.ai/api/search-image?query=Uganda%20Breweries%20vocational%20training%20program%2C%20students%20learning%20technical%20skills%2C%20skills%20development%20workshop%2C%20hands-on%20training%2C%20youth%20skills%20program%2C%20practical%20education&width=600&height=400&seq=partner-ubrew-skills&orientation=landscape',
      achievements: [
        '5,000+ youth trained',
        '10 vocational centers',
        '200+ internships provided',
        'UGX 150M+ skills investment',
      ],
    },
    {
      id: 7,
      name: 'TotalEnergies Uganda',
      logo: 'https://readdy.ai/api/search-image?query=TotalEnergies%20Uganda%20official%20logo%2C%20red%20and%20blue%20branding%2C%20energy%20company%20logo%2C%20professional%20oil%20and%20gas%20company%2C%20clean%20background%2C%20high%20resolution%20corporate%20logo&width=300&height=150&seq=partner-totalenergies&orientation=landscape',
      tier: 'Silver',
      since: '2021',
      description:
        'Energy company supporting STEM education and environmental awareness programs.',
      fullDescription:
        'TotalEnergies Uganda promotes STEM education and environmental consciousness among students. Their "Energy for Education" program focuses on science, technology, engineering, and mathematics, along with environmental sustainability. They provide science lab equipment and environmental education materials.',
      website: 'https://www.totalenergies.ug',
      impact: 'STEM programs in 25+ schools',
      projects: [
        'Science Lab Equipment',
        'Environmental Education',
        'STEM Scholarships',
        'Green School Initiatives',
      ],
      testimonial:
        "Investing in STEM education is investing in Uganda's future energy leaders. Our partnership with EAO nurtures young scientific minds.",
      contact: 'foundation.uganda@totalenergies.com',
      image:
        'https://readdy.ai/api/search-image?query=TotalEnergies%20Uganda%20STEM%20education%20program%2C%20students%20in%20science%20laboratory%2C%20environmental%20education%2C%20energy%20company%20CSR%20project%2C%20children%20learning%20science%2C%20educational%20program&width=600&height=400&seq=partner-total-stem&orientation=landscape',
      achievements: [
        '25 schools with STEM programs',
        '15 science labs equipped',
        '100 STEM scholarships',
        'UGX 200M+ education investment',
      ],
    },
    {
      id: 8,
      name: 'Airtel Uganda',
      logo: 'https://readdy.ai/api/search-image?query=Airtel%20Uganda%20official%20logo%2C%20red%20branding%2C%20telecommunications%20company%20logo%2C%20professional%20mobile%20network%20logo%2C%20clean%20background%2C%20high%20resolution%20corporate%20logo&width=300&height=150&seq=partner-airtel&orientation=landscape',
      tier: 'Silver',
      since: '2022',
      description:
        'Telecommunications provider supporting digital education and connectivity solutions.',
      fullDescription:
        'Airtel Uganda enhances digital learning through their "Connect to Learn" initiative. They provide data bundles, educational content access, and digital learning platforms for students in underserved areas. Their focus on bridging the digital divide has made quality education accessible to remote communities.',
      website: 'https://www.airtel.ug',
      impact: 'Digital access for 15,000+ students',
      projects: [
        'Educational Data Bundles',
        'Online Learning Platforms',
        'Digital Content Access',
        'Teacher Digital Training',
      ],
      testimonial:
        'Airtel believes in using technology to transform education. Our partnership with EAO ensures learning knows no boundaries.',
      contact: 'foundation@airtel.ug',
      image:
        'https://readdy.ai/api/search-image?query=Airtel%20Uganda%20digital%20education%20program%2C%20students%20using%20smartphones%20for%20learning%2C%20mobile%20education%2C%20telecommunications%20company%20education%20project%2C%20digital%20learning%20initiative%2C%20technology%20in%20education&width=600&height=400&seq=partner-airtel-digital&orientation=landscape',
      achievements: [
        '15,000+ students connected',
        '30 schools with digital access',
        '50+ teachers trained',
        'UGX 100M+ digital investment',
      ],
    },
    {
      id: 9,
      name: 'Centenary Bank',
      logo: 'https://readdy.ai/api/search-image?query=Centenary%20Bank%20Uganda%20official%20logo%2C%20green%20and%20white%20branding%2C%20commercial%20bank%20logo%2C%20professional%20financial%20institution%2C%20clean%20background%2C%20high%20resolution%20bank%20logo&width=300&height=150&seq=partner-centenary&orientation=landscape',
      tier: 'Silver',
      since: '2021',
      description:
        "Uganda's leading bank supporting school banking programs and financial education.",
      fullDescription:
        'Centenary Bank promotes financial inclusion through school banking programs and financial education. Their "Young Savers Initiative" teaches students about saving, budgeting, and financial management from an early age. They establish school banking branches and provide financial literacy materials.',
      website: 'https://www.centrabank.com',
      impact: 'Financial education for 12,000+ students',
      projects: [
        'School Banking Branches',
        'Financial Literacy Curriculum',
        'Young Savers Club',
        'Teacher Financial Training',
      ],
      testimonial:
        'Financial literacy is a life skill. Our partnership with EAO helps build financially savvy future generations.',
      contact: 'csr@centrabank.com',
      image:
        'https://readdy.ai/api/search-image?query=Centenary%20Bank%20Uganda%20school%20banking%20program%2C%20students%20learning%20about%20saving%20money%2C%20financial%20education%20in%20classroom%2C%20bank%20staff%20teaching%20children%2C%20school%20banking%20branch%2C%20educational%20program&width=600&height=400&seq=partner-centenary-banking&orientation=landscape',
      achievements: [
        '12,000+ students financially literate',
        '25 school banking branches',
        '100+ teachers trained',
        'UGX 120M+ financial education investment',
      ],
    },
  ];

  return (
    <div className="pt-20">
      <div className="min-h-screen bg-white">
        {/* Hero Introduction */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Partners in Impact
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8">
              We are deeply grateful to our partners and sponsors who share our
              vision of transforming lives through education. Together, we are
              building a brighter future for Uganda's children.
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
                <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-teal-600 text-white text-sm sm:text-base font-bold rounded-full whitespace-nowrap">
                  Platinum Partners
                </div>
                <div className="flex-1 h-px bg-gray-300 w-full"></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {platinumPartners.map((partner, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedPartner(partner)}
                    className="aspect-[2/1] bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center p-6 sm:p-8 cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 relative z-10 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                      <p className="text-sm font-semibold text-teal-700 text-center">
                        View Partnership Details
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gold Tier */}
            <div className="mb-16 sm:mb-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-amber-500 text-white text-sm sm:text-base font-bold rounded-full whitespace-nowrap">
                  Gold Partners
                </div>
                <div className="flex-1 h-px bg-gray-300 w-full"></div>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {goldPartners.map((partner, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedPartner(partner)}
                    className="aspect-[2/1] bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center p-6 sm:p-8 cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 relative z-10 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                      <p className="text-sm font-semibold text-amber-700 text-center">
                        View Partnership Details
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Silver Tier */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gray-500 text-white text-sm sm:text-base font-bold rounded-full whitespace-nowrap">
                  Silver Partners
                </div>
                <div className="flex-1 h-px bg-gray-300 w-full"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {silverPartners.map((partner, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedPartner(partner)}
                    className="aspect-square bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center p-4 sm:p-6 cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 relative z-10 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                      <p className="text-xs font-semibold text-gray-700 text-center">
                        View Details
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Become a Partner CTA */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-teal-600 to-teal-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Partner With Us
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-teal-100 mb-8 sm:mb-12 leading-relaxed">
              Join our network of committed partners making a lasting difference
              in children's education. Together, we can achieve more and create
              sustainable impact across Uganda.
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Partnership Benefits
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                When you partner with us, you gain more than just brand
                visibility
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-teal-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-teal-200">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <i className="ri-heart-line text-2xl sm:text-3xl text-white"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Meaningful Impact
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Your partnership directly transforms children's lives through
                  education, creating measurable and lasting change in
                  communities.
                </p>
              </div>

              <div className="bg-amber-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-amber-200">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <i className="ri-team-line text-2xl sm:text-3xl text-white"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Brand Alignment
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Associate your brand with a trusted NGO committed to
                  transparency, integrity, and proven impact in education.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-gray-200">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <i className="ri-trophy-line text-2xl sm:text-3xl text-white"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Recognition
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Receive prominent recognition across our platforms, events,
                  and communications reaching thousands of supporters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Detail Modal */}
        {selectedPartner && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100">
              {/* Modal Header with Image */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img
                  src={selectedPartner.image}
                  alt={selectedPartner.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Close Button */}
                <button
                type="button"
  aria-label="Close partner details"
                  onClick={() => setSelectedPartner(null)}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg hover:scale-110"
                >
                  <i className="ri-close-line text-2xl text-gray-800"></i>
                </button>

                {/* Partner Logo and Tier Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-3">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
                    <img
                      src={selectedPartner.logo}
                      alt={selectedPartner.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-white font-bold shadow-lg ${
                      selectedPartner.tier === 'Platinum'
                        ? 'bg-gradient-to-r from-teal-600 to-teal-700'
                        : selectedPartner.tier === 'Gold'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                          : 'bg-gradient-to-r from-gray-500 to-gray-600'
                    }`}
                  >
                    {selectedPartner.tier} Partner
                  </div>
                </div>

                {/* Title and Since */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {selectedPartner.name}
                  </h2>
                  <div className="flex items-center gap-4 text-white/90 text-sm">
                    <div className="flex items-center gap-2">
                      <i className="ri-calendar-line text-amber-400"></i>
                      <span>Partner since {selectedPartner.since}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-global-line text-amber-400"></i>
                      <a
                        href={selectedPartner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-18rem)]">
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                      <i className="ri-building-line text-teal-600 text-xl"></i>
                    </div>
                    About Our Partnership
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedPartner.fullDescription}
                  </p>
                </div>

                {/* Key Projects */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <i className="ri-rocket-line text-amber-600 text-xl"></i>
                    </div>
                    Key Initiatives
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedPartner.projects.map(
                      (project: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 bg-gradient-to-r from-teal-50 to-amber-50 rounded-xl p-4 border border-teal-100"
                        >
                          <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="ri-check-line text-white text-sm"></i>
                          </div>
                          <span className="text-gray-700 font-medium">
                            {project}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Impact and Achievements */}
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  {/* Impact */}
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <i className="ri-bar-chart-line text-teal-600 text-xl"></i>
                      Impact
                    </h4>
                    <p className="text-gray-700 font-medium mb-3">
                      {selectedPartner.impact}
                    </p>
                    <div className="space-y-2">
                      {selectedPartner.achievements
                        .slice(0, 2)
                        .map((achievement: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <i className="ri-star-fill text-amber-500 text-xs"></i>
                            <span>{achievement}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <i className="ri-mail-line text-amber-600 text-xl"></i>
                      Partnership Contact
                    </h4>
                    <p className="text-gray-700 text-sm mb-3">
                      {selectedPartner.contact}
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

                {/* Testimonial */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <i className="ri-quote-1 text-amber-600 text-xl"></i>
                    </div>
                    Partner Testimonial
                  </h3>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border-l-4 border-teal-600">
                    <p className="text-gray-700 italic leading-relaxed">
                      "{selectedPartner.testimonial}"
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 pb-8 border-t border-gray-200">
                  <button className="flex-1 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold rounded-2xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                    <i className="ri-handshake-line mr-2"></i>
                    Explore Partnership
                  </button>
                  <button className="flex-1 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                    <i className="ri-share-line mr-2"></i>
                    Share Partner Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
