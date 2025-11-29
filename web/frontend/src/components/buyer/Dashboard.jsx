import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCarrot, FaAppleAlt, FaSeedling } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Header from '../header';
import Footer from '../footer';
import api from '../../services/api';

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Dummy data for dashboard moved inside for potential translation or just context
  const dashboardData = {
    pendingOrders: 3,
    favoriteSuppliers: 8,
    marketTrends: [
      { date: '2024-11-20', price: 245 },
      { date: '2024-11-21', price: 250 },
      { date: '2024-11-22', price: 248 },
      { date: '2024-11-23', price: 255 },
      { date: '2024-11-24', price: 252 },
      { date: '2024-11-25', price: 258 },
      { date: '2024-11-26', price: 260 }
    ],
    recentlyViewed: [
      { id: 1, name: "Fresh Tomatoes", price: 250, type: "Vegetable", supplier: "Farm Fresh Co." },
      { id: 2, name: "Organic Potatoes", price: 180, type: "Vegetable", supplier: "Green Valley Farms" },
      { id: 3, name: "Premium Dates", price: 450, type: "Fruit", supplier: "Desert Gold" }
    ],
    recommended: [
      { id: 4, name: "Fresh Oranges", price: 280, type: "Fruit", supplier: "Citrus Valley" },
      { id: 5, name: "Premium Olives", price: 550, type: "Fruit", supplier: "Olive Grove Co." },
      { id: 6, name: "Hard Wheat", price: 320, type: "Grain", supplier: "Golden Grain Ltd" }
    ]
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getProductIcon = (type) => {
    switch (type) {
      case 'Vegetable': return <FaCarrot className="w-8 h-8 text-orange-500" />;
      case 'Fruit': return <FaAppleAlt className="w-8 h-8 text-red-500" />;
      case 'Grain': return <FaSeedling className="w-8 h-8 text-green-500" />;
      default: return <FaSeedling className="w-8 h-8 text-gray-500" />;
    }
  }

  return (
    <>
      <Header isBuyerMode={true} />
      <div className="pt-20 min-h-screen bg-slate-50">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t('buyerDashboard.welcome', { name: currentUser.name || 'Ahmed' })}</h1>
                <p className="text-gray-600 text-lg">{t('buyerDashboard.subtitle')}</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleNavigate('/marketplace')}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  {t('buyerDashboard.browseProducts')}
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 shadow-sm"
                >
                  {t('buyerDashboard.logout')}
                </button>
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8`}>
            {/* Pending Orders */}
            <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-gray-100 hover:border-green-200 group cursor-pointer transform hover:-translate-y-1 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">{t('buyerDashboard.activeOrders')}</p>
                  <p className="text-4xl font-bold text-gray-900">{dashboardData.pendingOrders}</p>
                  <p className="text-sm text-gray-500">{t('buyerDashboard.trackPurchases')}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                </div>
              </div>
              <div className="mt-4">
                <button onClick={() => handleNavigate('/orders')} className="text-green-600 font-semibold text-sm flex items-center group-hover:underline">
                  {t('buyerDashboard.viewDetails')} <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>

            {/* Favorite Suppliers */}
            <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-gray-100 hover:border-green-200 group cursor-pointer transform hover:-translate-y-1 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">{t('buyerDashboard.favoriteSuppliers')}</p>
                  <p className="text-4xl font-bold text-gray-900">{dashboardData.favoriteSuppliers}</p>
                  <p className="text-sm text-gray-500">{t('buyerDashboard.preferredPartners')}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
              </div>
              <div className="mt-4">
                <button className="text-green-600 font-semibold text-sm flex items-center group-hover:underline">
                  {t('buyerDashboard.manageList')} <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>

            {/* Market Price Trend */}
            <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-gray-100 hover:border-green-200 group cursor-pointer transform hover:-translate-y-1 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">{t('buyerDashboard.marketTrends')}</p>
                  <p className="text-4xl font-bold text-gray-900">260 <span className="text-lg font-medium text-gray-500">DZD</span></p>
                  <p className="text-sm text-green-600 font-medium">↗ +6% {t('buyerDashboard.lastDays')}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-end space-x-1 h-12">
                  {dashboardData.marketTrends.slice(-5).map((point, index) => {
                    const height = ((point.price - 240) / 30) * 100;
                    return (
                      <div
                        key={index}
                        className="bg-green-200 group-hover:bg-green-400 rounded-t-md flex-1 min-w-1 shadow-sm transition-colors duration-300"
                        style={{ height: `${Math.max(height, 15)}%` }}
                      ></div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Product Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recently Viewed Products */}
            <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-8 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{t('buyerDashboard.recentlyViewed')}</h2>
                  <p className="text-gray-600">{t('buyerDashboard.pickUp')}</p>
                </div>
                <button
                  onClick={() => handleNavigate('/marketplace')}
                  className="text-green-600 hover:text-green-700 font-semibold flex items-center group"
                >
                  {t('buyerDashboard.viewAll')}
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {dashboardData.recentlyViewed.map((product, index) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 cursor-pointer transition-all duration-300 group border border-gray-100 hover:border-green-200 hover:shadow-md"
                    style={{ animationDelay: `${500 + index * 100}ms` }}
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {getProductIcon(product.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.supplier}</p>
                      <div className="hidden sm:flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">4.8</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{product.price} <span className="text-sm font-normal text-gray-500">DZD</span></p>
                      <p className="text-xs text-gray-500">{t('buyerDashboard.perKg')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Products */}
            <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-8 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{t('buyerDashboard.recommended')}</h2>
                  <p className="text-gray-600">{t('buyerDashboard.personalized')}</p>
                </div>
                <button
                  onClick={() => handleNavigate('/marketplace')}
                  className="text-green-600 hover:text-green-700 font-semibold flex items-center group"
                >
                  {t('buyerDashboard.browseMore')}
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {dashboardData.recommended.map((product, index) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300 group border border-gray-100 hover:border-blue-200 hover:shadow-md"
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {getProductIcon(product.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.supplier}</p>
                      <div className="hidden sm:flex items-center mt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 font-medium">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {t('buyerDashboard.organic')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{product.price} <span className="text-sm font-normal text-gray-500">DZD</span></p>
                      <p className="text-xs text-gray-500">{t('buyerDashboard.perKg')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;