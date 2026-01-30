import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          {/* Column 1: Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img
                src="https://static.readdy.ai/image/cd41cd238abe70c234eacdeb9ca87499/e1c8f6c0f5ff5c3ce84d9c8b0df3dd0d.jpeg"
                alt="Educate an Orphan Uganda"
                className="h-10 sm:h-12 w-10 sm:w-12 object-contain rounded-lg"
                loading="lazy"
                decoding="async"
              />
              <div>
                <div className="font-bold text-base sm:text-lg">
                  Educate an Orphan
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Uganda</div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
              Empowering Uganda's future through quality education for
              vulnerable children.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer"
              >
                <i className="ri-facebook-fill text-lg sm:text-xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer"
              >
                <i className="ri-twitter-fill text-lg sm:text-xl"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer"
              >
                <i className="ri-instagram-fill text-lg sm:text-xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer"
              >
                <i className="ri-linkedin-fill text-lg sm:text-xl"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/programs"
                  className="text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Our Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/about#board"
                  className="text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/partners"
                  className="text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Get Involved
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/get-involved#volunteer"
                  className="text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  to="/donate"
                  className="text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Donate
                </Link>
              </li>
              <li>
                <Link
                  to="/get-involved#events"
                  className="text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/partners"
                  className="text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">
              Contact
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-400">
              <li className="flex items-start gap-2 text-sm sm:text-base">
                <i className="ri-map-pin-line text-teal-400 mt-1 flex-shrink-0"></i>
                <span>
                  Plot 123, Kampala Road
                  <br />
                  Kampala, Uganda
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm sm:text-base">
                <i className="ri-phone-line text-teal-400 flex-shrink-0"></i>
                <a
                  href="tel:+256700000000"
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  +256 700 000 000
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm sm:text-base">
                <i className="ri-mail-line text-teal-400 flex-shrink-0"></i>
                <a
                  href="mailto:info@educateanorphan.org"
                  className="hover:text-teal-400 transition-colors cursor-pointer break-all"
                >
                  info@educateanorphan.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <div className="text-center md:text-left">
              © 2024 Educate an Orphan Uganda. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
              <Link
                to="/privacy"
                className="hover:text-teal-400 transition-colors cursor-pointer"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-teal-400 transition-colors cursor-pointer"
              >
                Terms of Service
              </Link>
              <span className="hidden sm:inline text-gray-600">|</span>
              <span className="text-teal-400">Registered NGO in Uganda</span>
            </div>
            <div className="text-center md:text-right">
              <p>Created with &hearts; by</p>
              <Link
                to="/notfound"
                className="hover:text-teal-400 transition-colors cursor-pointer bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent font-semibold"
              >
                LuminousCipher006
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
