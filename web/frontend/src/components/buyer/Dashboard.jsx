import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';

// Dummy data for dashboard
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
    { id: 1, name: "Fresh Tomatoes", price: 250, image: "🍅", supplier: "Farm Fresh Co." },
    { id: 2, name: "Organic Potatoes", price: 180, image: "🥔", supplier: "Green Valley Farms" },
    { id: 3, name: "Premium Dates", price: 450, image: "🌴", supplier: "Desert Gold" }
  ],
  recommended: [
    { id: 4, name: "Fresh Oranges", price: 280, image: "🍊", supplier: "Citrus Valley" },
    { id: 5, name: "Premium Olives", price: 550, image: "🫒", supplier: "Olive Grove Co." },
    { id: 6, name: "Hard Wheat", price: 320, image: "🌾", supplier: "Golden Grain Ltd" }
  ]
};

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <Header isBuyerMode={true} />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, Ahmed! 👋</h1>
                <p className="text-green-100 text-lg">Ready to discover fresh agricultural products?</p>
              </div>
              <div className="mt-6 md:mt-0">
                <button
                  onClick={() => handleNavigate('/marketplace')}
                  className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Browse Products
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Pending Orders */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group cursor-pointer transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{dashboardData.pendingOrders}</p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Active Orders</h3>
              <p className="text-gray-600 text-sm mb-4">Track your current purchases</p>
              <button
                onClick={() => handleNavigate('/orders')}
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform duration-300"
              >
                View Details →
              </button>
            </div>
          </div>

          {/* Favorite Suppliers */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 group cursor-pointer transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{dashboardData.favoriteSuppliers}</p>
                <p className="text-sm text-gray-500">Trusted</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Favorite Suppliers</h3>
              <p className="text-gray-600 text-sm mb-4">Your preferred farming partners</p>
              <button className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform duration-300">
                Manage List →
              </button>
            </div>
          </div>

          {/* Market Price Trend */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 group cursor-pointer transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">260 DZD</p>
                <p className="text-sm text-green-600 font-medium">↗ +6%</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Market Trends</h3>
              <p className="text-gray-600 text-sm mb-4">Potatoes price per kg</p>
              <div className="flex items-end space-x-1 h-8 mb-2">
                {dashboardData.marketTrends.slice(-5).map((point, index) => {
                  const height = ((point.price - 240) / 20) * 100;
                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-t from-purple-500 to-purple-400 rounded-sm flex-1 min-w-1 shadow-sm"
                      style={{ height: `${Math.max(height, 15)}%` }}
                    ></div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500">Last 5 days</p>
            </div>
          </div>
        </div>

        {/* Product Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recently Viewed Products */}
          <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '400ms'}}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Recently Viewed</h2>
                <p className="text-gray-600">Pick up where you left off</p>
              </div>
              <button
                onClick={() => handleNavigate('/marketplace')}
                className="text-green-600 hover:text-green-700 font-semibold flex items-center group"
              >
                View all
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
                  style={{animationDelay: `${500 + index * 100}ms`}}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.supplier}</p>
                    <div className="flex items-center mt-1">
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
                    <p className="text-xs text-gray-500">per kg</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Products */}
          <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '600ms'}}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Recommended for You</h2>
                <p className="text-gray-600">Personalized suggestions</p>
              </div>
              <button
                onClick={() => handleNavigate('/marketplace')}
                className="text-green-600 hover:text-green-700 font-semibold flex items-center group"
              >
                Browse more
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
                  style={{animationDelay: `${700 + index * 100}ms`}}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-200 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.supplier}</p>
                    <div className="flex items-center mt-1">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 font-medium">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Organic
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{product.price} <span className="text-sm font-normal text-gray-500">DZD</span></p>
                    <p className="text-xs text-gray-500">per kg</p>
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