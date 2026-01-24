import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PlannedGivingPage() {
  const [selectedOption, setSelectedOption] = useState('bequest');

  const givingOptions = [
    {
      id: 'bequest',
      title: 'Bequests in Your Will',
      icon: 'ri-file-list-3-line',
      description: 'Leave a lasting legacy by including Rise & Shine Foundation in your will or trust',
      benefits: [
        'No cost to you during your lifetime',
        'Can be modified as circumstances change',
        'Potential estate tax benefits',
        'Creates lasting impact for generations'
      ],
      howItWorks: 'Include specific language in your will designating Rise & Shine Foundation as a beneficiary. You can leave a specific amount, percentage of your estate, or remainder after other bequests.',
      sampleLanguage: 'I give and bequeath to Rise & Shine Foundation, Uganda (NGO Registration #12345), the sum of [amount] or [percentage]% of my estate to be used for its general charitable purposes.'
    },
    {
      id: 'life-insurance',
      title: 'Life Insurance Gifts',
      icon: 'ri-shield-line',
      description: 'Name Rise & Shine Foundation as a beneficiary of your life insurance policy',
      benefits: [
        'Simple and cost-effective way to give',
        'Larger gift than cash donation alone',
        'Potential tax deductions during lifetime',
        'Immediate impact upon distribution'
      ],
      howItWorks: 'Contact your insurance provider to name Rise & Shine Foundation as a primary or contingent beneficiary. You can designate a percentage or specific amount.',
      sampleLanguage: 'Contact your insurance provider and request a beneficiary designation form. Complete it naming Rise & Shine Foundation as beneficiary with our official registration details.'
    },
    {
      id: 'retirement-assets',
      title: 'Retirement Accounts',
      icon: 'ri-wallet-3-line',
      description: 'Donate retirement fund assets like pension plans or provident funds',
      benefits: [
        'Tax-efficient way to give',
        'Reduces taxable estate',
        'Simple beneficiary designation',
        'No need to revise your will'
      ],
      howItWorks: 'Complete a beneficiary designation form from your retirement plan administrator naming Rise & Shine Foundation. Consult with your financial advisor for tax implications.',
      sampleLanguage: 'Request a beneficiary designation form from your retirement plan administrator. Designate Rise & Shine Foundation as beneficiary for a specific percentage or the remainder.'
    },
    {
      id: 'charitable-trust',
      title: 'Charitable Trusts',
      icon: 'ri-building-line',
      description: 'Establish a charitable trust that benefits both you and our mission',
      benefits: [
        'Receive income during your lifetime',
        'Immediate tax deduction',
        'Avoid capital gains tax',
        'Support education after income period'
      ],
      howItWorks: 'Work with an attorney to establish a Charitable Remainder Trust (CRT) or Charitable Lead Trust (CLT). Assets are transferred to the trust, which pays income to you or your beneficiaries.',
      sampleLanguage: 'Consult with an estate planning attorney to draft trust documents. The trust can be funded with cash, securities, real estate, or other assets.'
    }
  ];

  const legacyCircle = [
    {
      name: 'Dr. Sarah Namukasa',
      profession: 'Retired Educator',
      gift: 'Bequest in Will',
      quote: 'After 40 years in education, I want my legacy to continue helping children long after I\'m gone.',
      image: 'https://public.readdy.ai/ai/img_res/20829dd1b56987778839673f036c3c1a.jpg'
    },
    {
      name: 'John & Mary Okello',
      profession: 'Business Owners',
      gift: 'Life Insurance Policy',
      quote: 'We built our business to create opportunities. Now we\'re creating opportunities for children through our gift.',
      image: 'https://readdy.ai/api/search-image?query=professional%20African%20couple%20business%20owners%20warm%20friendly%20smiles%20formal%20attire%20studio%20portrait%20soft%20lighting%20simple%20background&width=400&height=400&seq=legacy-002&orientation=squarish'
    },
    {
      name: 'Prof. David Musoke',
      profession: 'University Professor',
      gift: 'Charitable Trust',
      quote: 'This allows me to support my family while ensuring education remains accessible to vulnerable children.',
      image: 'https://readdy.ai/api/search-image?query=distinguished%20elderly%20African%20professor%20intellectual%20warm%20expression%20formal%20portrait%20studio%20lighting%20simple%20background%20dignified%20presence&width=400&height=400&seq=legacy-003&orientation=squarish'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Explore Your Options',
      description: 'Review the planned giving options and consider which aligns with your financial goals',
      icon: 'ri-search-line'
    },
    {
      number: '02',
      title: 'Consult Your Advisors',
      description: 'Speak with your financial advisor, attorney, or tax professional about the best approach',
      icon: 'ri-discuss-line'
    },
    {
      number: '03',
      title: 'Contact Our Team',
      description: 'Reach out to our planned giving coordinator for information and sample language',
      icon: 'ri-phone-line'
    },
    {
      number: '04',
      title: 'Finalize Your Gift',
      description: 'Complete necessary documentation and inform us so we can thank you properly',
      icon: 'ri-checkbox-circle-line'
    }
  ];

  const faqs = [
    {
      question: 'Will making a planned gift affect my financial security?',
      answer: 'No, planned gifts are designed to work with your financial goals. Most options cost you nothing during your lifetime and can actually provide income or tax benefits while you\'re living.'
    },
    {
      question: 'Can I change my mind after making a planned gift commitment?',
      answer: 'Yes, most planned gifts (like bequests and beneficiary designations) can be modified or revoked if your circumstances change. This flexibility is one of the main advantages of planned giving.'
    },
    {
      question: 'How much do I need to give to make a planned gift?',
      answer: 'There is no minimum amount. Any planned gift, regardless of size, makes a meaningful difference and helps us plan for the future.'
    },
    {
      question: 'Will my family be informed of my planned gift?',
      answer: 'That\'s entirely up to you. We recommend discussing major estate decisions with family, but you control what information is shared. We respect your privacy completely.'
    },
    {
      question: 'What are the tax benefits of planned giving?',
      answer: 'Benefits vary by gift type and include estate tax reductions, income tax deductions, capital gains tax avoidance, and more. Consult with your tax advisor for specific guidance.'
    }
  ];

  const selectedGivingOption = givingOptions.find(opt => opt.id === selectedOption);

  return (
    <div className="pt-16 md:pt-0">
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-white/80 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
            <Link to="/" className="hover:text-white transition-colors cursor-pointer">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/donate" className="hover:text-white transition-colors cursor-pointer">Ways to Give</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span>Planned Giving</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">Leave a Lasting Legacy</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-amber-100 mb-8 sm:mb-12 max-w-3xl leading-relaxed">
            Create meaningful change that extends beyond your lifetime through thoughtful estate planning
          </p>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">127</div>
              <div className="text-sm sm:text-base text-amber-100">Legacy Circle Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">UGX 450M</div>
              <div className="text-sm sm:text-base text-amber-100">Committed Through Estates</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">Forever</div>
              <div className="text-sm sm:text-base text-amber-100">Impact Duration</div>
            </div>
          </div>
        </div>
      </section>

      {/* Giving Options */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Planned Giving Options</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the approach that best fits your financial situation and philanthropic goals
            </p>
          </div>

          {/* Option Selector */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {givingOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 cursor-pointer text-left ${
                  selectedOption === option.id
                    ? 'border-amber-600 bg-amber-50 shadow-xl'
                    : 'border-gray-200 hover:border-amber-400 hover:shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${selectedOption === option.id ? 'bg-amber-600' : 'bg-gray-100'} rounded-lg flex items-center justify-center mb-3 sm:mb-4`}>
                  <i className={`${option.icon} text-2xl sm:text-3xl ${selectedOption === option.id ? 'text-white' : 'text-gray-600'}`}></i>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">{option.title}</h3>
              </button>
            ))}
          </div>

          {/* Selected Option Details */}
          {selectedGivingOption && (
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-8 sm:p-12 border-2 border-gray-200">
              <div className="flex items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`${selectedGivingOption.icon} text-3xl sm:text-4xl text-white`}></i>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">{selectedGivingOption.title}</h3>
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">{selectedGivingOption.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Key Benefits</h4>
                  <ul className="space-y-3 sm:space-y-4">
                    {selectedGivingOption.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <i className="ri-check-double-line text-xl sm:text-2xl text-amber-600 mt-0.5 flex-shrink-0"></i>
                        <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">How It Works</h4>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8">{selectedGivingOption.howItWorks}</p>
                  
                  <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-amber-200">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <i className="ri-file-text-line text-xl sm:text-2xl text-amber-600"></i>
                      <span className="text-sm sm:text-base font-semibold text-gray-900">Sample Language</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">{selectedGivingOption.sampleLanguage}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Link
                  to="/contact"
                  className="px-8 sm:px-10 py-3 sm:py-4 bg-amber-600 text-white text-base sm:text-lg font-bold rounded-full hover:bg-amber-700 transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer whitespace-nowrap text-center"
                >
                  Speak with Our Team
                </Link>
                <a
                  href="#"
                  className="px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-amber-600 text-amber-600 text-base sm:text-lg font-bold rounded-full hover:bg-amber-50 transition-all duration-300 cursor-pointer whitespace-nowrap text-center"
                >
                  Download Guide (PDF)
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Legacy Circle Members */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Legacy Circle Stories</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Meet donors who are creating lasting impact through planned giving
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {legacyCircle.map((member, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-64 sm:h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-sm sm:text-base text-amber-600 font-semibold mb-1">{member.profession}</p>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">{member.gift}</p>
                  <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed">"{member.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Process */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Getting Started is Simple</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Follow these four easy steps to create your legacy
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-gray-200 hover:border-amber-600 hover:shadow-xl transition-all duration-300">
                  <div className="text-5xl sm:text-6xl font-bold text-amber-100 mb-4">{step.number}</div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-600 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                    <i className={`${step.icon} text-2xl sm:text-3xl text-white`}></i>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <i className="ri-arrow-right-line text-3xl text-amber-300"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Frequently Asked Questions</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Common questions about planned giving
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-start gap-3">
                  <i className="ri-question-line text-xl sm:text-2xl text-amber-600 mt-0.5 flex-shrink-0"></i>
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-8 sm:pl-11">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Start Your Legacy Today</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
            Contact our planned giving coordinator for a confidential, no-obligation conversation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              to="/contact"
              className="px-10 sm:px-12 py-4 sm:py-5 bg-amber-500 text-white text-lg sm:text-xl font-bold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              Schedule Consultation
            </Link>
            <a
              href="#"
              className="px-10 sm:px-12 py-4 sm:py-5 bg-transparent border-2 border-white text-white text-lg sm:text-xl font-bold rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              Request Information Kit
            </a>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}