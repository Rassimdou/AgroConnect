import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';

// Mock data for orders
const ordersData = {
  stats: {
    pending: 3,
    confirmed: 5,
    shipped: 2,
    delivered: 12
  },
  orders: [
    {
      id: 'ORD-001',
      buyer: {
        name: 'Restaurant Le Jardin',
        avatar: 'RL'
      },
      products: [
        { name: 'Organic Tomatoes', quantity: '50kg', price: 12500, emoji: '🍅' },
        { name: 'Fresh Lettuce', quantity: '20kg', price: 6000, emoji: '🥬' }
      ],
      total: 18500,
      status: 'pending',
      orderDate: '2024-11-26',
      deliveryDate: '2024-11-28',
      address: '123 Main Street, Algiers',
      payment: 'paid'
    },
    {
      id: 'ORD-002',
      buyer: {
        name: 'Market Central',
        avatar: 'MC'
      },
      products: [
        { name: 'Potatoes', quantity: '100kg', price: 18000, emoji: '🥔' }
      ],
      total: 18000,
      status: 'confirmed',
      orderDate: '2024-11-25',
      deliveryDate: '2024-11-27',
      address: '456 Market Ave, Oran',
      payment: 'paid'
    },
    {
      id: 'ORD-003',
      buyer: {
        name: 'Hotel Sahara',
        avatar: 'HS'
      },
      products: [
        { name: 'Carrots', quantity: '30kg', price: 9000, emoji: '🥕' },
        { name: 'Onions', quantity: '25kg', price: 5000, emoji: '🧅' },
        { name: 'Bell Peppers', quantity: '15kg', price: 7500, emoji: '🫑' }
      ],
      total: 21500,
      status: 'shipped',
      orderDate: '2024-11-24',
      deliveryDate: '2024-11-26',
      address: '789 Hotel Road, Constantine',
      payment: 'paid'
    },
    {
      id: 'ORD-004',
      buyer: {
        name: 'School Cafeteria',
        avatar: 'SC'
      },
      products: [
        { name: 'Apples', quantity: '40kg', price: 16000, emoji: '🍎' }
      ],
      total: 16000,
      status: 'delivered',
      orderDate: '2024-11-20',
      deliveryDate: '2024-11-22',
      address: '321 School Street, Annaba',
      payment: 'paid'
    },
    {
      id: 'ORD-005',
      buyer: {
        name: 'Local Grocery',
        avatar: 'LG'
      },
      products: [
        { name: 'Oranges', quantity: '35kg', price: 14000, emoji: '🍊' },
        { name: 'Lemons', quantity: '10kg', price: 4000, emoji: '🍋' }
      ],
      total: 18000,
      status: 'delivered',
      orderDate: '2024-11-18',
      deliveryDate: '2024-11-20',
      address: '654 Grocery Lane, Blida',
      payment: 'paid'
    }
  ]
};

const Orders = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    search: '',
    buyer: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Updating order ${orderId} to ${newStatus}`);
    setIsLoading(false);
  };

  const handleViewOrder = (orderId) => {
    navigate(`/order-detail/${orderId}`);
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      dateRange: 'all',
      search: '',
      buyer: ''
    });
  };

  const filteredOrders = ordersData.orders.filter(order => {
    if (activeTab !== 'all' && order.status !== activeTab) return false;
    if (filters.status !== 'all' && order.status !== filters.status) return false;
    if (filters.search && !order.buyer.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.buyer && !order.buyer.name.toLowerCase().includes(filters.buyer.toLowerCase())) return false;
    
    // Date range filtering would be implemented here
    return true;
  });


  const tabs = [
    { id: 'all', label: 'All Orders', count: ordersData.orders.length },
    { id: 'pending', label: 'Pending', count: ordersData.stats.pending },
    { id: 'confirmed', label: 'Confirmed', count: ordersData.stats.confirmed },
    { id: 'shipped', label: 'Shipped', count: ordersData.stats.shipped },
    { id: 'delivered', label: 'Delivered', count: ordersData.stats.delivered }
  ];

  return (
    <>
      <Header isFarmerMode={true} />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">

        {/* Header Section */}
        <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">📦 Order Management</h1>
                <p className="text-green-100 text-lg">Manage and track your customer orders</p>
              </div>
              <div className="mt-6 md:mt-0">
                <button
                  onClick={() => navigate('/farmer-dashboard')}
                  className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Order Statistics */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-yellow-200 group cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">⏳</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Pending Orders</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{ordersData.stats.pending}</p>
                <p className="text-yellow-600 font-semibold text-sm">Awaiting confirmation</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Confirmed</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{ordersData.stats.confirmed}</p>
                <p className="text-blue-600 font-semibold text-sm">Ready for shipping</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-orange-200 group cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🚚</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Shipped</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{ordersData.stats.shipped}</p>
                <p className="text-orange-600 font-semibold text-sm">In transit</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 group cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Delivered</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{ordersData.stats.delivered}</p>
                <p className="text-green-600 font-semibold text-sm">Successfully completed</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 mb-8 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '400ms'}}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">🔍 Filter Orders</h2>
                <p className="text-gray-600">Refine your order view</p>
              </div>
              <button onClick={handleClearFilters} className="text-red-600 hover:text-red-700 font-semibold flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Clear Filters
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Buyer</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Search by buyer name..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Items per page</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" defaultValue="10">
                  <option value="5">5 orders</option>
                  <option value="10">10 orders</option>
                  <option value="25">25 orders</option>
                  <option value="50">50 orders</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Content */}
          <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '600ms'}}>

            {/* Tabs */}
            <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-xl">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Orders List */}
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Updating order status...</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <span className="text-6xl">📦</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">No orders found</h3>
                  <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                    {activeTab === 'all'
                      ? "You don't have any orders yet. When you receive orders, they'll appear here."
                      : `No ${activeTab} orders found. Try changing your filters.`
                    }
                  </p>
                  {activeTab !== 'all' && (
                    <button
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                      onClick={() => setActiveTab('all')}
                    >
                      View All Orders
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order, index) => (
                    <div key={order.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100" style={{animationDelay: `${index * 100}ms`}}>
                      {/* Order Header */}
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center shadow-lg">
                              <span className="text-xl font-bold text-white">{order.buyer.avatar}</span>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{order.buyer.name}</h3>
                              <p className="text-gray-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                Order #{order.id} • {new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            } shadow-sm`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-green-600">{order.total.toLocaleString()} DZD</p>
                              <p className="text-sm text-gray-500">Delivery: {new Date(order.deliveryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                          </svg>
                          Order Items
                        </h4>
                        <div className="space-y-4 mb-6">
                          {order.products.map((product, itemIndex) => (
                            <div key={itemIndex} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-green-200 transition-all duration-300">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                                  {product.emoji}
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900 text-lg">{product.name}</p>
                                  <p className="text-gray-600">{product.quantity} • {product.price.toLocaleString()} DZD/kg</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold text-gray-900">{(parseInt(product.quantity) * product.price).toLocaleString()} DZD</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          {order.status === 'pending' && (
                            <>
                              <button
                                className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                                onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                              >
                                ✅ Confirm Order
                              </button>
                              <button
                                className="flex-1 bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                                onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                              >
                                ❌ Decline Order
                              </button>
                            </>
                          )}
                          {order.status === 'confirmed' && (
                            <button
                              className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                              onClick={() => handleStatusUpdate(order.id, 'shipped')}
                            >
                              🚚 Mark as Shipped
                            </button>
                          )}
                          {order.status === 'shipped' && (
                            <button
                              className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                              onClick={() => handleStatusUpdate(order.id, 'delivered')}
                            >
                              📦 Mark as Delivered
                            </button>
                          )}
                          <button
                            className="flex-1 bg-white border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-600 font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                            onClick={() => handleViewOrder(order.id)}
                          >
                            👁️ View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;