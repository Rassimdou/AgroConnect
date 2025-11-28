import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import './dashboard.css';

// Farmer-specific data
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


const FarmerDashboard = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleOrderAction = (orderId, action) => {
    console.log(`${action} order ${orderId}`);
    onNavigate('order-detail', orderId);
  };

  const handleCropManagement = (cropName) => {
    onNavigate('crop-management', cropName);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusClasses = {
      pending: 'status-badge status-pending',
      confirmed: 'status-badge status-confirmed', 
      delivered: 'status-badge status-delivered',
      unread: 'status-badge status-unread'
    };

    const statusIcons = {
      pending: '⏳',
      confirmed: '✅',
      delivered: '🚚',
      unread: '📩'
    };

    return (
      <span className={statusClasses[status]}>
        <span>{statusIcons[status]}</span>
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  // Health indicator component
  const HealthIndicator = ({ health }) => {
    const getHealthClass = (health) => {
      if (health >= 80) return 'health-fill health-fill-excellent';
      if (health >= 60) return 'health-fill health-fill-good';
      return 'health-fill health-fill-warning';
    };

    return (
      <div className="health-indicator">
        <div className="health-bar">
          <div 
            className={getHealthClass(health)}
            style={{ width: `${health}%` }}
          ></div>
        </div>
        <span className="health-value">{health}%</span>
      </div>
    );
  };

  return (
    <>
      <Header isFarmerMode={true} onNavigate={onNavigate} />
      <div className="farmer-dashboard" style={{ paddingTop: '5rem' }}>
        
        {/* Welcome Header with Weather */}
        <div className="farmer-header">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="farmer-welcome-title">🌾 Welcome Back, Farmer!</h1>
                <p className="farmer-welcome-subtitle">Your farm management hub - Track, manage, and grow your business</p>
              </div>
              <div className="flex items-center space-x-6 mt-4 lg:mt-0">
                <div className="text-center">
                  <div className="text-2xl font-bold">{farmerDashboardData.weather.temperature}°C</div>
                  <div className="text-green-100 text-sm">{farmerDashboardData.weather.condition}</div>
                </div>
                <div className="text-sm text-green-100">
                  <div>💧 {farmerDashboardData.weather.humidity} Humidity</div>
                  <div>🌬️ {farmerDashboardData.weather.wind} Wind</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Main Stats Grid */}
          <div className={`stats-grid animate-entrance ${isVisible ? 'visible' : ''}`}>
            
            {/* Total Revenue */}
            <div className="stat-card stat-card-revenue">
              <div className="flex items-center justify-between">
                <div>
                  <p className="stat-label">Monthly Revenue</p>
                  <p className="stat-value">
                    {farmerDashboardData.quickStats.monthlyRevenue.toLocaleString()} DA
                  </p>
                  <p className="stat-subtext stat-subtext-green">↑ 12% from last month</p>
                </div>
                <div className="stat-icon stat-icon-revenue">
                  💰
                </div>
              </div>
            </div>

            {/* Active Products */}
            <div 
              onClick={() => onNavigate('my-products')}
              className="stat-card stat-card-products"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="stat-label">Active Products</p>
                  <p className="stat-value">
                    {farmerDashboardData.farmOverview.totalProducts}
                  </p>
                  <p className="stat-subtext stat-subtext-blue">{farmerDashboardData.quickStats.productsSold} sold this month</p>
                </div>
                <div className="stat-icon stat-icon-products">
                  📦
                </div>
              </div>
            </div>

            {/* Customer Satisfaction */}
            <div className="stat-card stat-card-rating">
              <div className="flex items-center justify-between">
                <div>
                  <p className="stat-label">Customer Rating</p>
                  <p className="stat-value">
                    {farmerDashboardData.farmOverview.customerRating}/5
                  </p>
                  <p className="stat-subtext stat-subtext-yellow">{farmerDashboardData.quickStats.repeatCustomers} repeat customers</p>
                </div>
                <div className="stat-icon stat-icon-rating">
                  ⭐
                </div>
              </div>
            </div>

            {/* Farm Size */}
            <div className="stat-card stat-card-land">
              <div className="flex items-center justify-between">
                <div>
                  <p className="stat-label">Farm Land</p>
                  <p className="stat-value">
                    {farmerDashboardData.farmOverview.farmSize} ha
                  </p>
                  <p className="stat-subtext stat-subtext-purple">4 active crops</p>
                </div>
                <div className="stat-icon stat-icon-land">
                  🌍
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            
            {/* Left Column - Crops & Activity */}
            <div className="space-y-8">
              
              {/* Crop Status */}
              <div className={`section-card animate-entrance delay-300 ${isVisible ? 'visible' : ''}`}>
                <div className="section-header">
                  <h2 className="section-title">🌱 Crop Status & Health</h2>
                  <button
                    onClick={() => onNavigate('crop-management')}
                    className="section-button"
                  >
                    <span>Manage All</span>
                    <span>→</span>
                  </button>
                </div>

                <div className="crops-grid">
                  {farmerDashboardData.cropStatus.map((crop, index) => (
                    <div
                      key={index}
                      onClick={() => handleCropManagement(crop.name)}
                      className="crop-card"
                    >
                      <div className="crop-header">
                        <div className="crop-info">
                          <div className="crop-emoji">{crop.image}</div>
                          <div>
                            <h3 className="crop-name">{crop.name}</h3>
                            <p className="crop-details">{crop.area} • {crop.stage}</p>
                          </div>
                        </div>
                        <div className="crop-yield">Yield: {crop.yield}</div>
                      </div>
                      
                      <HealthIndicator health={crop.health} />
                      
                      <div className="crop-actions">
                        <span className="crop-action-text">{crop.nextAction}</span>
                        <button className="crop-action-button">
                          View →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className={`section-card animate-entrance delay-500 ${isVisible ? 'visible' : ''}`}>
                <div className="section-header">
                  <h2 className="section-title">📋 Recent Activity</h2>
                  <button
                    onClick={() => onNavigate('orders')}
                    className="section-button"
                  >
                    <span>View All</span>
                    <span>→</span>
                  </button>
                </div>

                <div className="activity-list">
                  {farmerDashboardData.recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="activity-item"
                    >
                      <div className="activity-content">
                        <div className={`activity-icon ${
                          activity.type === 'order' ? 'activity-icon-order' : 'activity-icon-message'
                        }`}>
                          {activity.type === 'order' ? '📦' : '💬'}
                        </div>
                        <div className="activity-details">
                          <h3>{activity.buyer}</h3>
                          {activity.type === 'order' ? (
                            <p>{activity.product} • {activity.quantity}</p>
                          ) : (
                            <p>{activity.message}</p>
                          )}
                          <p className="activity-time">{activity.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.type === 'order' && (
                          <p className="activity-amount">{activity.amount?.toLocaleString()} DA</p>
                        )}
                        <StatusBadge status={activity.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Market & Actions */}
            <div className="space-y-8">
              
              {/* Market Insights */}
              <div className={`section-card animate-entrance delay-300 ${isVisible ? 'visible' : ''}`}>
                <h2 className="section-title mb-6">📈 Market Insights</h2>
                <div className="market-list">
                  {farmerDashboardData.marketInsights.map((item, index) => (
                    <div key={index} className="market-item">
                      <div>
                        <p className="market-product">{item.product}</p>
                        <p className="market-price">{item.price} DA/kg</p>
                        <div className="market-trend">
                          <span className={`text-xs font-semibold ${
                            item.trend === 'up' ? 'trend-up' :
                            item.trend === 'down' ? 'trend-down' : 'trend-stable'
                          }`}>
                            {item.change}
                          </span>
                          <span className={`demand-badge ${
                            item.demand === 'high' ? 'demand-high' :
                            item.demand === 'medium' ? 'demand-medium' : 'demand-low'
                          }`}>
                            {item.demand} demand
                          </span>
                        </div>
                      </div>
                      <div className={`text-2xl ${
                        item.trend === 'up' ? 'trend-up' :
                        item.trend === 'down' ? 'trend-down' : 'trend-stable'
                      }`}>
                        {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className={`section-card animate-entrance delay-600 ${isVisible ? 'visible' : ''}`}>
                <h2 className="section-title mb-6">🚀 Quick Actions</h2>
                <div className="actions-grid">
                  
                  <button
                    onClick={() => onNavigate('add-product')}
                    className="action-button"
                  >
                    <div className="action-icon action-icon-add">
                      ➕
                    </div>
                    <span className="action-label">Add Product</span>
                  </button>

                  <button
                    onClick={() => onNavigate('my-products')}
                    className="action-button action-button-products"
                  >
                    <div className="action-icon action-icon-products">
                      📋
                    </div>
                    <span className="action-label">My Products</span>
                  </button>

                  <button
                    onClick={() => onNavigate('orders')}
                    className="action-button action-button-orders"
                  >
                    <div className="action-icon action-icon-orders">
                      🛒
                    </div>
                    <span className="action-label">View Orders</span>
                  </button>

                  <button
                    onClick={() => onNavigate('analytics')}
                    className="action-button action-button-analytics"
                  >
                    <div className="action-icon action-icon-analytics">
                      📊
                    </div>
                    <span className="action-label">Analytics</span>
                  </button>

                </div>
              </div>

              {/* Weather Forecast */}
              <div className={`weather-card animate-entrance delay-700 ${isVisible ? 'visible' : ''}`}>
                <div className="weather-header">
                  <h3 className="weather-title">🌤️ Farming Weather</h3>
                  <span className="weather-emoji">⛅</span>
                </div>
                <div className="weather-temp">{farmerDashboardData.weather.temperature}°C</div>
                <p className="weather-condition">{farmerDashboardData.weather.condition}</p>
                <div className="weather-details">
                  <div className="weather-detail">
                    <span>Humidity</span>
                    <span>{farmerDashboardData.weather.humidity}</span>
                  </div>
                  <div className="weather-detail">
                    <span>Rainfall</span>
                    <span>{farmerDashboardData.weather.rainfall}</span>
                  </div>
                  <div className="weather-detail">
                    <span>Wind</span>
                    <span>{farmerDashboardData.weather.wind}</span>
                  </div>
                </div>
                <div className="weather-forecast">
                  <p>💡 {farmerDashboardData.weather.forecast}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FarmerDashboard;