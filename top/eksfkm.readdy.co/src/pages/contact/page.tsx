import { ContactStructuredData } from '../../components/seo/StructuredData';
import ContactForm from '../../components/forms/ContactForm';

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactStructuredData />
      <div className="min-h-screen bg-white">
        {/* Split-Screen Contact Design */}
        <section className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-amber-500 to-purple-600"></div>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          {/* Left Section - Contact Info */}
          <div className="lg:w-2/5 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12 flex items-center relative">
            {/* Floating Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

            <div className="max-w-xl w-full relative z-10">
              {/* Header with Animation */}
              <div className="mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm font-medium">
                    We're here to help
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Get In{' '}
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    Touch
                  </span>
                </h1>
                <p className="text-white/80 text-lg leading-relaxed">
                  Connect with us and be part of transforming lives through
                  education in Uganda
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Visit Us Card */}
                <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <i className="ri-map-pin-line text-2xl text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Visit Us
                      </h3>
                      <div className="text-white/90 leading-relaxed mb-2">
                        Plot 123, Kampala Road
                        <br />
                        Nakasero, Kampala
                        <br />
                        Uganda
                      </div>
                      <div className="text-amber-200 text-sm flex items-center gap-2">
                        <i className="ri-time-line"></i>
                        Mon-Fri, 8:00 AM - 5:00 PM
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call Us Card */}
                <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <i className="ri-phone-line text-2xl text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Call Us
                      </h3>
                      <div className="space-y-2">
                        <a
                          href="tel:+256700000000"
                          className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group/call"
                        >
                          <i className="ri-smartphone-line text-lg"></i>
                          <span>+256 700 000 000</span>
                          <i className="ri-arrow-right-line ml-auto opacity-0 group-hover/call:opacity-100 transition-opacity"></i>
                        </a>
                        <a
                          href="tel:+256750000000"
                          className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group/call"
                        >
                          <i className="ri-phone-line text-lg"></i>
                          <span>+256 750 000 000</span>
                          <i className="ri-arrow-right-line ml-auto opacity-0 group-hover/call:opacity-100 transition-opacity"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Us Card */}
                <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <i className="ri-mail-line text-2xl text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Email Us
                      </h3>
                      <a
                        href="mailto:info@educateanorphan.org"
                        className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group/email"
                      >
                        <span>info@educateanorphan.org</span>
                        <i className="ri-arrow-right-line ml-auto opacity-0 group-hover/email:opacity-100 transition-opacity"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Follow Us
                      </h3>
                      <p className="text-white/70 text-sm">
                        Stay connected on social media
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-teal-700 transition-all text-white group"
                      >
                        <i className="ri-facebook-fill text-lg group-hover:scale-110 transition-transform"></i>
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-teal-700 transition-all text-white group"
                      >
                        <i className="ri-twitter-fill text-lg group-hover:scale-110 transition-transform"></i>
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-teal-700 transition-all text-white group"
                      >
                        <i className="ri-instagram-fill text-lg group-hover:scale-110 transition-transform"></i>
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-teal-700 transition-all text-white group"
                      >
                        <i className="ri-linkedin-fill text-lg group-hover:scale-110 transition-transform"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form & Map */}
          <div className="lg:w-3/5 bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12 relative">
            {/* Floating Elements */}
            <div className="absolute top-20 right-20 w-16 h-16 bg-teal-400/10 rounded-full blur-lg animate-pulse"></div>
            <div className="absolute bottom-40 left-20 w-24 h-24 bg-amber-400/10 rounded-full blur-xl animate-pulse delay-700"></div>

            <div className="max-w-2xl relative z-10">
              {/* Contact Form */}
              <div className="mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full mb-6 text-sm font-medium">
                  <i className="ri-message-3-line"></i>
                  Send us a message
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Let's{' '}
                  <span className="bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent">
                    Connect
                  </span>
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  We'd love to hear from you. Send us a message and we'll
                  respond as soon as possible.
                </p>

                <ContactForm />
              </div>

              {/* Embedded Map */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                <div className="bg-gradient-to-r from-teal-600 to-amber-600 p-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <i className="ri-map-2-line"></i>
                    Find Our Location
                  </h3>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.84796179655!2d32.52219!3d0.31628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb8679c6f7e9%3A0x5b8f3c4c8c8c8c8c!2sKampala%2C%20Uganda!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="350"
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
      </div>
    </div>
  );
}
