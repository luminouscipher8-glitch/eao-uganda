import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: 'general', message: '' });
  };

  return (
    <div className="pt-16 md:pt-0">
      <div className="min-h-screen bg-white">
        {/* Split-Screen Contact Design */}
        <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Section - Contact Info */}
        <div className="lg:w-2/5 bg-teal-700 py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12 flex items-center">
          <div className="max-w-xl w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-10 md:mb-12">Get In Touch</h1>

            {/* Visit Us */}
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Visit Us</h3>
              <div className="flex items-start gap-3 sm:gap-4 text-white/90">
                <i className="ri-map-pin-line text-2xl sm:text-3xl text-teal-200 flex-shrink-0"></i>
                <div className="text-base sm:text-lg leading-relaxed">
                  Plot 123, Kampala Road<br />
                  Nakasero, Kampala<br />
                  Uganda
                </div>
              </div>
              <div className="mt-3 sm:mt-4 text-teal-200 text-xs sm:text-sm">
                Office Hours: Monday - Friday, 8:00 AM - 5:00 PM
              </div>
            </div>

            {/* Call Us */}
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Call Us</h3>
              <div className="space-y-2 sm:space-y-3">
                <a href="tel:+256700000000" className="flex items-center gap-3 sm:gap-4 text-white/90 hover:text-white transition-colors text-base sm:text-lg cursor-pointer">
                  <i className="ri-phone-line text-xl sm:text-2xl text-teal-200"></i>
                  <span>+256 700 000 000</span>
                </a>
                <a href="tel:+256750000000" className="flex items-center gap-3 sm:gap-4 text-white/90 hover:text-white transition-colors text-base sm:text-lg cursor-pointer">
                  <i className="ri-phone-line text-xl sm:text-2xl text-teal-200"></i>
                  <span>+256 750 000 000</span>
                </a>
              </div>
            </div>

            {/* Email Us */}
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Email Us</h3>
              <a href="mailto:info@educateanorphan.org" className="flex items-center gap-3 sm:gap-4 text-white/90 hover:text-white transition-colors text-base sm:text-lg cursor-pointer break-all">
                <i className="ri-mail-line text-xl sm:text-2xl text-teal-200 flex-shrink-0"></i>
                <span>info@educateanorphan.org</span>
              </a>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Follow Us</h3>
              <div className="flex gap-3 sm:gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-teal-700 transition-all text-white cursor-pointer">
                  <i className="ri-facebook-fill text-xl sm:text-2xl"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-teal-700 transition-all text-white cursor-pointer">
                  <i className="ri-twitter-fill text-xl sm:text-2xl"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-teal-700 transition-all text-white cursor-pointer">
                  <i className="ri-instagram-fill text-xl sm:text-2xl"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-teal-700 transition-all text-white cursor-pointer">
                  <i className="ri-linkedin-fill text-xl sm:text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form & Map */}
        <div className="lg:w-3/5 bg-white py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12">
          <div className="max-w-2xl">
            {/* Contact Form */}
            <div className="mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none text-sm sm:text-base"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your Email *"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none text-sm sm:text-base"
                  />
                </div>

                <div>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none text-sm sm:text-base cursor-pointer"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="volunteer">Volunteer Application</option>
                    <option value="donation">Donation Question</option>
                  </select>
                </div>

                <div>
                  <textarea
                    placeholder="Your Message *"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none resize-none text-sm sm:text-base"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-amber-500 text-white text-base sm:text-lg font-semibold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer whitespace-nowrap"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Embedded Map */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.84796179655!2d32.52219!3d0.31628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb8679c6f7e9%3A0x5b8f3c4c8c8c8c8c!2sKampala%2C%20Uganda!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
                className="sm:h-[400px]"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Quick Links</h2>
            <p className="text-base sm:text-lg text-gray-600">Find what you're looking for</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {/* About */}
            <div>
              <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4">About</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link to="/about" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Our Story</Link>
                </li>
                <li>
                  <Link to="/about#board" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Leadership Team</Link>
                </li>
                <li>
                  <Link to="/about#values" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Our Values</Link>
                </li>
                <li>
                  <Link to="/about#timeline" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Our Journey</Link>
                </li>
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4">Programs</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link to="/programs#education" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Education Support</Link>
                </li>
                <li>
                  <Link to="/programs#events" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Runs & Events</Link>
                </li>
                <li>
                  <Link to="/programs#school-building" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">School Building</Link>
                </li>
                <li>
                  <Link to="/programs" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">All Programs</Link>
                </li>
              </ul>
            </div>

            {/* Get Involved */}
            <div>
              <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4">Get Involved</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link to="/get-involved#volunteer" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Volunteer</Link>
                </li>
                <li>
                  <Link to="/donate" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Donate</Link>
                </li>
                <li>
                  <Link to="/get-involved#fundraise" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Fundraise</Link>
                </li>
                <li>
                  <Link to="/get-involved#events" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Events</Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4">Resources</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a href="#" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Annual Reports</a>
                </li>
                <li>
                  <a href="#" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Financial Statements</a>
                </li>
                <li>
                  <a href="#" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Impact Stories</a>
                </li>
                <li>
                  <a href="#" className="text-sm sm:text-base text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Media Kit</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}