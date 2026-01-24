import { Link } from 'react-router-dom';

export default function StockGiftsPage() {
  const benefits = [
    {
      icon: 'ri-line-chart-line',
      title: 'Avoid Capital Gains Tax',
      description: 'Donating appreciated securities allows you to avoid paying capital gains tax on the appreciation',
      example: 'If your stock increased UGX 10M, you save the 30% capital gains tax'
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'Full Market Value Deduction',
      description: 'Receive a tax deduction for the full fair market value of the securities on the date of transfer',
      example: 'Donate stock worth UGX 5M, get full UGX 5M tax deduction'
    },
    {
      icon: 'ri-hand-coin-line',
      title: 'Greater Impact',
      description: 'By avoiding capital gains tax, you can give more to the cause you care about',
      example: 'Your UGX 5M gift costs you only UGX 3.5M after tax benefits'
    },
    {
      icon: 'ri-speed-line',
      title: 'Simple Process',
      description: 'Transfer securities directly from your brokerage account with minimal paperwork',
      example: 'Usually completed in 3-5 business days'
    }
  ];

  const acceptedSecurities = [
    {
      type: 'Publicly Traded Stocks',
      icon: 'ri-stock-line',
      examples: ['MTN Uganda', 'Stanbic Bank', 'DFCU Bank', 'Centenary Bank'],
      processing: 'Direct transfer through USE'
    },
    {
      type: 'Bonds & Securities',
      icon: 'ri-file-chart-line',
      examples: ['Government Bonds', 'Corporate Bonds', 'Treasury Bills'],
      processing: 'Transfer via financial institution'
    },
    {
      type: 'Mutual Funds',
      icon: 'ri-pie-chart-line',
      examples: ['Unit Trusts', 'Money Market Funds', 'Equity Funds'],
      processing: 'Transfer between fund accounts'
    },
    {
      type: 'Foreign Securities',
      icon: 'ri-global-line',
      examples: ['NYSE', 'NASDAQ', 'LSE Listed Securities'],
      processing: 'International wire transfer'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Contact Us',
      description: 'Reach out to our development team to express your interest in donating securities',
      action: 'Email or call our office'
    },
    {
      number: '02',
      title: 'Get Transfer Instructions',
      description: 'We\'ll provide you with our brokerage account information and transfer instructions',
      action: 'Receive our account details'
    },
    {
      number: '03',
      title: 'Initiate Transfer',
      description: 'Contact your broker to initiate an electronic transfer of the securities to our account',
      action: 'Complete broker forms'
    },
    {
      number: '04',
      title: 'Receive Confirmation',
      description: 'Once we receive the securities, we\'ll send you a receipt for tax purposes',
      action: 'Get your tax receipt'
    }
  ];

  const comparisonData = {
    cashGift: {
      amount: 'UGX 5,000,000',
      capitalGains: 'UGX 0',
      taxDeduction: 'UGX 5,000,000',
      netCost: 'UGX 3,500,000',
      toCharity: 'UGX 5,000,000'
    },
    stockGift: {
      amount: 'UGX 5,000,000',
      capitalGains: 'UGX 1,500,000 saved',
      taxDeduction: 'UGX 5,000,000',
      netCost: 'UGX 2,000,000',
      toCharity: 'UGX 5,000,000'
    }
  };

  const faqs = [
    {
      question: 'What types of securities can I donate?',
      answer: 'We accept publicly traded stocks, bonds, mutual funds, and other marketable securities. Contact us to discuss specific holdings you\'d like to donate.'
    },
    {
      question: 'How long does the transfer take?',
      answer: 'Electronic transfers typically take 3-5 business days. The timing may vary based on your broker and the type of securities.'
    },
    {
      question: 'When is my tax deduction calculated?',
      answer: 'Your deduction is based on the fair market value of the securities on the date of transfer to our account, not when you initiate the transfer.'
    },
    {
      question: 'Can I donate securities held in a retirement account?',
      answer: 'Yes, but special rules apply. We recommend consulting with your financial advisor to understand the best approach for your situation.'
    },
    {
      question: 'What if my stock has decreased in value?',
      answer: 'If your securities have lost value, it may be better to sell them first, claim the capital loss, and then donate cash. Consult your tax advisor.'
    },
    {
      question: 'Will I receive documentation for my taxes?',
      answer: 'Yes, we\'ll provide an acknowledgment letter stating the number of shares and date received. Your broker will provide cost basis information.'
    }
  ];

  return (
    <div className="pt-16 md:pt-0">
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-white/80 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
            <Link to="/" className="hover:text-white transition-colors cursor-pointer">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/donate" className="hover:text-white transition-colors cursor-pointer">Ways to Give</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span>Stock &amp; Securities</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">Give Stock &amp; Securities</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-teal-100 mb-8 sm:mb-12 max-w-3xl leading-relaxed">
            Maximize your impact and tax benefits by donating appreciated stocks and securities
          </p>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">30%</div>
              <div className="text-sm sm:text-base text-teal-100">Tax Savings on Gains</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">100%</div>
              <div className="text-sm sm:text-base text-teal-100">Market Value Deduction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">3-5 Days</div>
              <div className="text-sm sm:text-base text-teal-100">Transfer Timeline</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Why Donate Securities?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Giving stock is one of the most tax-efficient ways to support our mission
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-gray-200 hover:border-teal-600 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <i className={`${benefit.icon} text-2xl sm:text-3xl text-teal-600`}></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">{benefit.description}</p>
                <div className="bg-teal-50 rounded-lg p-3 sm:p-4 border border-teal-200">
                  <p className="text-xs sm:text-sm text-teal-800 font-semibold">Example: {benefit.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Stock vs. Cash Comparison</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              See the difference in tax efficiency when donating appreciated stock
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-4 sm:px-6 py-4 sm:py-5 text-left text-sm sm:text-base font-bold">Scenario</th>
                    <th className="px-4 sm:px-6 py-4 sm:py-5 text-center text-sm sm:text-base font-bold">Cash Gift</th>
                    <th className="px-4 sm:px-6 py-4 sm:py-5 text-center text-sm sm:text-base font-bold bg-amber-500">Stock Gift ⭐</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-semibold text-gray-900">Gift Amount</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-sm sm:text-base text-gray-700">{comparisonData.cashGift.amount}</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-sm sm:text-base text-gray-700 bg-amber-50">{comparisonData.stockGift.amount}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-semibold text-gray-900">Capital Gains Tax</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-sm sm:text-base text-gray-700">{comparisonData.cashGift.capitalGains}</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-sm sm:text-base font-bold text-green-600 bg-amber-50">{comparisonData.stockGift.capitalGains}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-semibold text-gray-900">Tax Deduction</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-sm sm:text-base text-gray-700">{comparisonData.cashGift.taxDeduction}</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-sm sm:text-base text-gray-700 bg-amber-50">{comparisonData.stockGift.taxDeduction}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-teal-50">
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-bold text-gray-900">Net Cost to You</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-base sm:text-lg font-bold text-gray-900">{comparisonData.cashGift.netCost}</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-base sm:text-lg font-bold text-green-600 bg-amber-100">{comparisonData.stockGift.netCost}</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-teal-50">
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-bold text-gray-900">Amount to Charity</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-base sm:text-lg font-bold text-gray-900">{comparisonData.cashGift.toCharity}</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-base sm:text-lg font-bold text-teal-600 bg-amber-100">{comparisonData.stockGift.toCharity}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 bg-amber-100 border-2 border-amber-300 rounded-xl sm:rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-3 sm:gap-4">
              <i className="ri-lightbulb-flash-line text-2xl sm:text-3xl text-amber-600 mt-1 flex-shrink-0"></i>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Your Savings</h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  By donating stock instead of cash, you save <strong className="text-amber-600">UGX 1,500,000</strong> in taxes while still giving <strong className="text-teal-600">UGX 5,000,000</strong> to support children's education!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accepted Securities */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">What We Accept</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              We can receive a wide range of marketable securities
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {acceptedSecurities.map((security, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-gray-200 hover:border-teal-600 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-teal-600 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <i className={`${security.icon} text-2xl sm:text-3xl text-white`}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{security.type}</h3>
                <div className="mb-4 sm:mb-6 space-y-1.5">
                  {security.examples.map((example, idx) => (
                    <div key={idx} className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-teal-600 rounded-full"></div>
                      {example}
                    </div>
                  ))}
                </div>
                <div className="text-xs sm:text-sm text-teal-600 font-semibold">
                  {security.processing}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Give */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-teal-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">How to Donate Securities</h2>
            <p className="text-base sm:text-lg md:text-xl text-teal-100">
              Four simple steps to make your gift
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20">
                <div className="text-5xl sm:text-6xl font-bold text-white/30 mb-4">{step.number}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{step.title}</h3>
                <p className="text-sm sm:text-base text-teal-100 mb-4 sm:mb-6 leading-relaxed">{step.description}</p>
                <div className="text-xs sm:text-sm text-white font-semibold flex items-center gap-2">
                  <i className="ri-check-line"></i>
                  {step.action}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <Link
              to="/contact"
              className="inline-block px-10 sm:px-12 py-4 sm:py-5 bg-white text-teal-600 text-lg sm:text-xl font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              Get Transfer Instructions
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Common Questions</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Everything you need to know about donating securities
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-start gap-3">
                  <i className="ri-question-line text-xl sm:text-2xl text-teal-600 mt-0.5 flex-shrink-0"></i>
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Ready to Make Your Gift?</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
            Contact us today to get started with your stock donation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              to="/contact"
              className="px-10 sm:px-12 py-4 sm:py-5 bg-teal-500 text-white text-lg sm:text-xl font-bold rounded-full hover:bg-teal-600 transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              Contact Development Team
            </Link>
            <a
              href="#"
              className="px-10 sm:px-12 py-4 sm:py-5 bg-transparent border-2 border-white text-white text-lg sm:text-xl font-bold rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              Download Guide (PDF)
            </a>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}