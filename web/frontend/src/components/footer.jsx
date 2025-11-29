import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    alert('Thank you for subscribing!');
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-linear-to-br from-gray-50 to-white text-gray-700 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-300 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full animate-ping"></div>
      </div>

      {/* Wave Pattern */}
      <div className="absolute top-0 left-0 w-full h-16 bg-white">
        <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
          <polygon className="fill-white" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 relative z-10">
        {/* Newsletter Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-gray-800 text-center">{t('footer.stayConnected')}</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-2 text-center">
            {t('footer.newsletterDesc')}
          </p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('footer.enterEmail')}
              className="flex-1 px-3 sm:px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 text-sm sm:text-base rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              {t('footer.subscribe')}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6 text-center">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300 shadow-lg">
                <span className="text-xl sm:text-2xl">🌱</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-800">AgroConnect <span className="text-green-600">DZ</span></h3>
                <p className="text-xs sm:text-sm text-green-600 font-medium">{t('footer.digitalMarket')}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              {t('footer.empowering')}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-green-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-green-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-green-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-green-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.017z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-300 flex items-center justify-center group">
                <span className="w-1 h-1 bg-green-600 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                {t('header.home')}
              </a></li>
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-300 flex items-center justify-center group">
                <span className="w-1 h-1 bg-green-600 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                {t('footer.products')}
              </a></li>
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-300 flex items-center justify-center group">
                <span className="w-1 h-1 bg-green-600 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                {t('footer.services')}
              </a></li>
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-300 flex items-center justify-center group">
                <span className="w-1 h-1 bg-green-600 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                {t('footer.aboutUs')}
              </a></li>
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-300 flex items-center justify-center group">
                <span className="w-1 h-1 bg-green-600 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                {t('footer.contact')}
              </a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4 text-center">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              {t('footer.servicesTitle')}
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-300 flex items-center justify-center group">
                <span className="w-1 h-1 bg-green-600 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                {t('footer.cropMonitoring')}
              </a></li>
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-300 flex items-center justify-center group">
                <span className="w-1 h-1 bg-green-600 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                {t('footer.precisionFarming')}
              </a></li>
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-300 flex items-center justify-center group">
                <span className="w-1 h-1 bg-green-600 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                {t('footer.weatherAnalytics')}
              </a></li>
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-300 flex items-center justify-center group">
                <span className="w-1 h-1 bg-green-600 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                {t('footer.marketIntelligence')}
              </a></li>
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-300 flex items-center justify-center group">
                <span className="w-1 h-1 bg-green-600 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                {t('footer.consultation')}
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-center">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              {t('footer.contactUs')}
            </h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-center justify-center space-x-3 hover:text-green-600 transition-colors duration-300">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>123 Farm Road, AgriCity, AC 12345</span>
              </p>
              <p className="flex items-center justify-center space-x-3 hover:text-green-600 transition-colors duration-300">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>+1 (555) 123-4567</span>
              </p>
              <p className="flex items-center justify-center space-x-3 hover:text-green-600 transition-colors duration-300">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>info@agroconnect.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-6 sm:pt-8">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-xs sm:text-sm text-gray-500 text-center leading-relaxed">
              {t('footer.rights')}

            </p>
            <button
              onClick={scrollToTop}
              className="bg-green-600 hover:bg-green-700 text-white p-2 sm:p-3 rounded-full transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation cursor-pointer"
              aria-label="Back to top"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;