import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function CorporateSponsorshipPage() {
  const [selectedTier, setSelectedTier] = useState('platinum');

  const sponsorshipTiers = [
    {
      id: 'platinum',
      name: 'Platinum Partner',
      amount: 'UGX 50M+',
      color: 'from-gray-400 to-gray-600',
      icon: 'ri-vip-crown-line',
      benefits: [
        'Naming rights for a school building or program',
        'Exclusive annual impact report with video updates',
        'Site visits and direct engagement with beneficiaries',
        'Logo placement on all marketing materials',
        'Featured speaker slot at annual fundraising event',
        'Quarterly strategic partnership meetings with leadership',
        'Employee volunteer days with company branding',
        'Custom CSR impact stories for your communications',
      ],
      impact: 'Support 500+ children annually',
    },
    {
      id: 'gold',
      name: 'Gold Partner',
      amount: 'UGX 25M+',
      color: 'from-amber-400 to-amber-600',
      icon: 'ri-medal-line',
      benefits: [
        'Program naming opportunity',
        'Bi-annual site visits with photo documentation',
        'Logo on website and select marketing materials',
        'Recognition at annual event',
        'Quarterly impact reports',
        'Employee matching program support',
        'Social media partnership features',
        'Tax receipts and CSR documentation',
      ],
      impact: 'Support 250+ children annually',
    },
    {
      id: 'silver',
      name: 'Silver Partner',
      amount: 'UGX 10M+',
      color: 'from-gray-300 to-gray-500',
      icon: 'ri-award-line',
      benefits: [
        'Logo on website partners page',
        'Annual site visit opportunity',
        'Quarterly email updates',
        'Recognition in annual report',
        'Employee volunteer opportunities',
        'Social media mentions',
        'Partnership certificate',
        'Tax documentation',
      ],
      impact: 'Support 100+ children annually',
    },
  ];

  const partnershipModels = [
    {
      icon: 'ri-funds-line',
      title: 'Direct Financial Support',
      description:
        'Annual or multi-year financial commitments that provide predictable funding for our programs',
      examples: [
        'Annual grants',
        'Multi-year pledges',
        'Endowment contributions',
      ],
    },
    {
      icon: 'ri-team-line',
      title: 'Employee Matching',
      description:
        'Match employee donations dollar-for-dollar to multiply impact and engage your workforce',
      examples: [
        'Payroll giving programs',
        'Volunteer hour matching',
        'Campaign matching',
      ],
    },
    {
      icon: 'ri-briefcase-line',
      title: 'In-Kind Contributions',
      description:
        'Donate products, services, or expertise that directly support our operations',
      examples: [
        'School supplies',
        'Professional services',
        'Technology donations',
      ],
    },
    {
      icon: 'ri-heart-line',
      title: 'Cause Marketing',
      description:
        'Partner on campaigns where a portion of sales supports our mission',
      examples: [
        'Product partnerships',
        'Awareness campaigns',
        'Co-branded initiatives',
      ],
    },
  ];

  const currentPartners = [
    {
      name: 'Bank of Uganda',
      tier: 'Platinum',
      since: '2021',
      contribution: 'Annual funding for 300 children',
      logo: 'https://public.readdy.ai/ai/img_res/d09a1655f235a20fe6a627332b5f679b.jpg',
    },
    {
      name: 'MTN Uganda',
      tier: 'Gold',
      since: '2022',
      contribution: 'Mobile money infrastructure & annual grant',
      logo: 'https://readdy.ai/api/search-image?query=telecommunications%20company%20logo%20simple%20modern%20design%20white%20background%20clean%20tech%20corporate%20branding&width=200&height=120&seq=partner-logo-002&orientation=landscape',
    },
    {
      name: 'Stanbic Bank',
      tier: 'Gold',
      since: '2020',
      contribution: 'Financial literacy programs & funding',
      logo: 'https://readdy.ai/api/search-image?query=banking%20institution%20logo%20professional%20clean%20design%20white%20background%20minimalist%20financial%20services%20branding&width=200&height=120&seq=partner-logo-003&orientation=landscape',
    },
    {
      name: 'Total Energies',
      tier: 'Silver',
      since: '2023',
      contribution: 'Employee volunteer program',
      logo: 'https://readdy.ai/api/search-image?query=energy%20company%20logo%20simple%20corporate%20design%20white%20background%20clean%20professional%20industrial%20branding&width=200&height=120&seq=partner-logo-004&orientation=landscape',
    },
  ];

  const benefits = [
    {
      icon: 'ri-line-chart-line',
      title: 'Enhanced Brand Reputation',
      description:
        'Associate your brand with meaningful social impact and community development',
    },
    {
      icon: 'ri-team-line',
      title: 'Employee Engagement',
      description:
        'Boost morale and retention through purposeful volunteer opportunities',
    },
    {
      icon: 'ri-trophy-line',
      title: 'CSR Recognition',
      description:
        'Demonstrate corporate social responsibility with measurable impact',
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Tax Benefits',
      description:
        'Receive tax deductions for charitable contributions as per Uganda tax law',
    },
  ];

  return (
    <div className="pt-20">
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-white/80 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
              <Link
                to="/"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </Link>
              <i className="ri-arrow-right-s-line"></i>
              <Link
                to="/donate"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Ways to Give
              </Link>
              <i className="ri-arrow-right-s-line"></i>
              <span>Corporate Sponsorship</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              Corporate Partnerships
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-teal-100 mb-8 sm:mb-12 max-w-3xl leading-relaxed">
              Partner with us to create lasting impact while strengthening your
              corporate social responsibility initiatives
            </p>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                  15+
                </div>
                <div className="text-sm sm:text-base text-teal-100">
                  Corporate Partners
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                  UGX 180M
                </div>
                <div className="text-sm sm:text-base text-teal-100">
                  Corporate Support 2023
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                  1,200+
                </div>
                <div className="text-sm sm:text-base text-teal-100">
                  Employee Volunteers
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Tiers */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Partnership Tiers
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Choose the level of engagement that aligns with your company's
                values and capacity
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {sponsorshipTiers.map(tier => (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 transition-all duration-300 cursor-pointer ${
                    selectedTier === tier.id
                      ? 'border-teal-600 shadow-2xl scale-105'
                      : 'border-gray-200 hover:border-teal-400 hover:shadow-xl'
                  }`}
                >
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center mb-4 sm:mb-6`}
                  >
                    <i
                      className={`${tier.icon} text-2xl sm:text-3xl text-white`}
                    ></i>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {tier.name}
                  </h3>
                  <div className="text-xl sm:text-2xl font-bold text-teal-600 mb-4 sm:mb-6">
                    {tier.amount}
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <p className="text-sm sm:text-base font-semibold text-amber-600 mb-3 sm:mb-4">
                      {tier.impact}
                    </p>
                    <ul className="space-y-2 sm:space-y-3">
                      {tier.benefits.slice(0, 4).map((benefit, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <i className="ri-check-line text-teal-600 mt-0.5 flex-shrink-0"></i>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full py-3 sm:py-4 bg-teal-600 text-white text-sm sm:text-base font-semibold rounded-full hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Models */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Partnership Models
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                Flexible ways to engage based on your company's strengths
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {partnershipModels.map((model, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                    <i
                      className={`${model.icon} text-2xl sm:text-3xl text-teal-600`}
                    ></i>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    {model.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                    {model.description}
                  </p>
                  <div className="space-y-2">
                    {model.examples.map((example, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-teal-600 rounded-full"></div>
                        <span>{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Partners */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Our Corporate Partners
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                Thank you to the companies making a difference
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {currentPartners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-gray-200 hover:border-teal-600 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="h-16 sm:h-20 flex items-center">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full w-auto"
                      />
                    </div>
                    <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-amber-100 text-amber-700 text-xs sm:text-sm font-semibold rounded-full">
                      {partner.tier}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-2">
                    Partner since {partner.since}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 font-semibold">
                    {partner.contribution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-teal-600">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Benefits of Partnership
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-teal-100">
                Strategic advantages for your business
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                    <i
                      className={`${benefit.icon} text-2xl sm:text-3xl text-teal-600`}
                    ></i>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Ready to Partner?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed">
              Let's discuss how your company can create meaningful impact while
              achieving your CSR goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link
                to="/contact"
                className="px-10 sm:px-12 py-4 sm:py-5 bg-teal-600 text-white text-lg sm:text-xl font-bold rounded-full hover:bg-teal-700 transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                Schedule a Meeting
              </Link>
              <a
                href="#"
                className="px-10 sm:px-12 py-4 sm:py-5 bg-transparent border-2 border-teal-600 text-teal-600 text-lg sm:text-xl font-bold rounded-full hover:bg-teal-50 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Download Prospectus
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
