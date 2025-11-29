import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../header';
import Footer from '../footer';
import ChatList from '../chat/ChatList';
import ChatWindow from '../chat/ChatWindow';

const FarmerDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showChatList, setShowChatList] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const { t } = useTranslation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Farmer-specific data moved inside component for translation
  const farmerDashboardData = {
    weather: {
      temperature: 24,
      condition: 'Partly Cloudy',
      humidity: '65%',
      rainfall: '2mm',
      wind: '12 km/h',
      forecast: 'Good conditions for planting this week'
    },
    quickStats: {
      monthlyRevenue: 125000,
      productsSold: 48,
      repeatCustomers: 23
    },
    farmOverview: {
      totalProducts: 12,
      customerRating: 4.8,
      farmSize: 15.5
    },
    cropStatus: [
      {
        name: 'Tomatoes',
        image: '🍅',
        area: '3.2 ha',
        health: 92,
        stage: 'Harvesting',
        expectedYield: '850 kg'
      },
      {
        name: 'Potatoes',
        image: '🥔',
        area: '4.5 ha',
        health: 88,
        stage: 'Growing',
        expectedYield: '1,200 kg'
      },
      {
        name: 'Lettuce',
        image: '🥬',
        area: '2.1 ha',
        health: 75,
        stage: 'Mature',
        expectedYield: '450 kg'
      },
      {
        name: 'Carrots',
        image: '🥕',
        area: '2.8 ha',
        health: 85,
        stage: 'Growing',
        expectedYield: '720 kg'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'sale',
        description: 'Sold 50kg of Tomatoes to Restaurant Le Jardin',
        time: '2 hours ago',
        icon: '💰',
        status: 'confirmed'
      },
      {
        id: 2,
        type: 'order',
        description: 'New order received for 30kg of Lettuce',
        time: '5 hours ago',
        icon: '📦',
        status: 'pending'
      },
      {
        id: 3,
        type: 'harvest',
        description: 'Harvested 120kg of Potatoes',
        time: '1 day ago',
        icon: '🌾',
        status: 'delivered'
      },
      {
        id: 4,
        type: 'message',
        description: 'Message from Hotel Atlas about bulk order',
        time: '2 days ago',
        icon: '💬',
        status: 'unread'
      }
    ],
    marketInsights: [
      {
        product: 'Tomatoes',
        currentPrice: '180 DA/kg',
        trend: 'up',
        change: '+8%',
        demand: 'high'
      },
      {
        product: 'Potatoes',
        currentPrice: '95 DA/kg',
        trend: 'stable',
        change: '0%',
        demand: 'medium'
      },
      {
        product: 'Lettuce',
        currentPrice: '120 DA/kg',
        trend: 'up',
        change: '+5%',
        demand: 'high'
      },
      {
        product: 'Carrots',
        currentPrice: '110 DA/kg',
        trend: 'down',
        change: '-3%',
        demand: 'medium'
      }
    ]
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleCropManagement = (cropName) => {
    navigate(`/crop-management/${cropName}`);
  };

  const handleSelectConversation = (targetId, targetType) => {
    setActiveConversation({ targetId, targetType });
    setShowChatList(false);
  };


  return (
    <>
      <Header isFarmerMode={true} />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">

        {/* Welcome Section */}
        <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">🌾 {t('farmerDashboard.welcome')}</h1>
                <p className="text-green-100 text-lg">{t('farmerDashboard.subtitle')}</p>
              </div>
              <div className="flex items-center space-x-6 mt-6 lg:mt-0">
                <div className="text-center">
                  <div className="text-2xl font-bold">{farmerDashboardData.weather.temperature}°C</div>
                  <div className="text-green-100">{farmerDashboardData.weather.condition}</div>
                </div>
                <div className="text-green-100">
                  <div>💧 {farmerDashboardData.weather.humidity} {t('farmerDashboard.weather.humidity')}</div>
                  <div>🌬️ {farmerDashboardData.weather.wind} {t('farmerDashboard.weather.wind')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Overview Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Total Revenue */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 group cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('farmerDashboard.stats.revenue')}</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{farmerDashboardData.quickStats.monthlyRevenue.toLocaleString()} <span className="text-sm font-normal text-gray-500">DA</span></p>
                <p className="text-green-600 font-semibold text-sm">↑ 12% {t('farmerDashboard.stats.revenueGrowth')}</p>
              </div>
            </div>

            {/* Active Products */}
            <div onClick={() => handleNavigate('/farmer-my-products')} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('farmerDashboard.stats.activeProducts')}</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{farmerDashboardData.farmOverview.totalProducts}</p>
                <p className="text-blue-600 font-semibold text-sm">{farmerDashboardData.quickStats.productsSold} {t('farmerDashboard.stats.productsSold')}</p>
              </div>
            </div>

            {/* Customer Satisfaction */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-yellow-200 group cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('farmerDashboard.stats.rating')}</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{farmerDashboardData.farmOverview.customerRating}/5</p>
                <p className="text-yellow-600 font-semibold text-sm">{farmerDashboardData.quickStats.repeatCustomers} {t('farmerDashboard.stats.repeatCustomers')}</p>
              </div>
            </div>

            {/* Farm Size */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 group cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🌍</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('farmerDashboard.stats.farmLand')}</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{farmerDashboardData.farmOverview.farmSize} <span className="text-sm font-normal text-gray-500">ha</span></p>
                <p className="text-purple-600 font-semibold text-sm">4 {t('farmerDashboard.stats.activeCrops')}</p>
              </div>
            </div>
          </div>

          {/* Product Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Crops & Activity */}
            <div className="space-y-8">

              {/* Crop Status */}
              <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">🌱 {t('farmerDashboard.cropStatus.title')}</h2>
                    <p className="text-gray-600">{t('farmerDashboard.cropStatus.subtitle')}</p>
                  </div>
                  <button onClick={() => handleNavigate('/crop-management')} className="text-green-600 hover:text-green-700 font-semibold flex items-center group">
                    {t('farmerDashboard.cropStatus.manageAll')}
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {farmerDashboardData.cropStatus.map((crop, index) => (
                    <div
                      key={index}
                      onClick={() => handleCropManagement(crop.name)}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 cursor-pointer transition-all duration-300 group border border-gray-100 hover:border-green-200 hover:shadow-md"
                      style={{ animationDelay: `${500 + index * 100}ms` }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {crop.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300">{crop.name}</h3>
                        <p className="text-sm text-gray-600">{crop.area} • {crop.stage}</p>
                        <div className="flex items-center mt-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                            <div className={`h-2 rounded-full ${crop.health >= 80 ? 'bg-green-500' : crop.health >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${crop.health}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-500">{crop.health}% {t('farmerDashboard.cropStatus.healthy')}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{crop.expectedYield}</p>
                        <p className="text-xs text-gray-500">{t('farmerDashboard.cropStatus.expectedYield')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">📋 {t('farmerDashboard.recentActivity.title')}</h2>
                    <p className="text-gray-600">{t('farmerDashboard.recentActivity.subtitle')}</p>
                  </div>
                  <button onClick={() => handleNavigate('/farmer-orders')} className="text-green-600 hover:text-green-700 font-semibold flex items-center group">
                    {t('farmerDashboard.recentActivity.viewAll')}
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {farmerDashboardData.recentActivity.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300 group border border-gray-100 hover:border-blue-200 hover:shadow-md"
                      style={{ animationDelay: `${700 + index * 100}ms` }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-200 rounded-2xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{activity.description}</h3>
                        <p className="text-sm text-gray-600">{activity.time}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${activity.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            activity.status === 'delivered' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                          }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Market & Actions */}
            <div className="space-y-8">

              {/* Market Insights */}
              <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">📈 {t('farmerDashboard.marketInsights.title')}</h2>
                    <p className="text-gray-600">{t('farmerDashboard.marketInsights.subtitle')}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {farmerDashboardData.marketInsights.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.product}</h3>
                        <p className="text-lg font-bold text-green-600">{item.currentPrice}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-sm font-medium ${item.trend === 'up' ? 'text-green-600' :
                            item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                            {item.change}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.demand === 'high' ? 'bg-green-100 text-green-800' :
                            item.demand === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                            {item.demand} {t('farmerDashboard.marketInsights.demand')}
                          </span>
                        </div>
                      </div>
                      <div className={`text-3xl ${item.trend === 'up' ? 'text-green-500' :
                        item.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                        }`}>
                        {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">🚀 {t('farmerDashboard.quickActions.title')}</h2>
                    <p className="text-gray-600">{t('farmerDashboard.quickActions.subtitle')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => handleNavigate('/farmer-add-product')} className="flex flex-col items-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border border-green-200 hover:border-green-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-2xl mb-3 shadow-lg">
                      ➕
                    </div>
                    <span className="font-semibold text-gray-900 text-center">{t('farmerDashboard.quickActions.addProduct')}</span>
                  </button>

                  <button onClick={() => handleNavigate('/farmer-my-products')} className="flex flex-col items-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-2xl mb-3 shadow-lg">
                      📋
                    </div>
                    <span className="font-semibold text-gray-900 text-center">{t('farmerDashboard.quickActions.myProducts')}</span>
                  </button>

                  <button onClick={() => handleNavigate('/farmer-orders')} className="flex flex-col items-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border border-orange-200 hover:border-orange-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-2xl mb-3 shadow-lg">
                      🛒
                    </div>
                    <span className="font-semibold text-gray-900 text-center">{t('farmerDashboard.quickActions.viewOrders')}</span>
                  </button>

                  <button onClick={() => setShowChatList(true)} className="flex flex-col items-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 hover:border-purple-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-2xl mb-3 shadow-lg">
                      💬
                    </div>
                    <span className="font-semibold text-gray-900 text-center">{t('farmerDashboard.quickActions.messages')}</span>
                  </button>
                </div>
              </div>

              {/* Weather Forecast */}
              <div className={`bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-white transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">🌤️ {t('farmerDashboard.weather.title')}</h3>
                    <span className="text-2xl">⛅</span>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold mb-2">{farmerDashboardData.weather.temperature}°C</div>
                  <p className="text-blue-100">{farmerDashboardData.weather.condition}</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">{t('farmerDashboard.weather.humidity')}</span>
                    <span className="font-semibold">{farmerDashboardData.weather.humidity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">{t('farmerDashboard.weather.rainfall')}</span>
                    <span className="font-semibold">{farmerDashboardData.weather.rainfall}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">{t('farmerDashboard.weather.wind')}</span>
                    <span className="font-semibold">{farmerDashboardData.weather.wind}</span>
                  </div>
                </div>
                <div className="border-t border-blue-400 pt-4">
                  <p className="text-blue-100">💡 {farmerDashboardData.weather.forecast}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Chat Components */}
      {showChatList && (
        <ChatList
          onSelectConversation={handleSelectConversation}
          onClose={() => setShowChatList(false)}
        />
      )}

      {activeConversation && (
        <ChatWindow
          currentUser={currentUser}
          targetId={activeConversation.targetId}
          targetType={activeConversation.targetType}
          onClose={() => setActiveConversation(null)}
        />
      )}
    </>
  );
};

export default FarmerDashboard;