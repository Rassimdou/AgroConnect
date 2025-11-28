import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import './orders.css';

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

const Orders = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    search: '',
    buyer: ''
  });

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
    onNavigate('order-detail', orderId);
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pending', icon: '⏳', class: 'status-pending' },
      confirmed: { label: 'Confirmed', icon: '✅', class: 'status-confirmed' },
      shipped: { label: 'Shipped', icon: '🚚', class: 'status-shipped' },
      delivered: { label: 'Delivered', icon: '📦', class: 'status-delivered' },
      cancelled: { label: 'Cancelled', icon: '❌', class: 'status-cancelled' }
    };

    const config = statusConfig[status];
    return (
      <span className={`status-badge ${config.class}`}>
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </span>
    );
  };

  const getActionButtons = (order) => {
    switch (order.status) {
      case 'pending':
        return (
          <>
            <button 
              className="action-button action-button-primary"
              onClick={() => handleStatusUpdate(order.id, 'confirmed')}
            >
              ✅ Confirm
            </button>
            <button 
              className="action-button action-button-danger"
              onClick={() => handleStatusUpdate(order.id, 'cancelled')}
            >
              ❌ Decline
            </button>
          </>
        );
      case 'confirmed':
        return (
          <button 
            className="action-button action-button-primary"
            onClick={() => handleStatusUpdate(order.id, 'shipped')}
          >
            🚚 Mark Shipped
          </button>
        );
      case 'shipped':
        return (
          <button 
            className="action-button action-button-primary"
            onClick={() => handleStatusUpdate(order.id, 'delivered')}
          >
            📦 Mark Delivered
          </button>
        );
      case 'delivered':
        return (
          <button 
            className="action-button action-button-secondary"
            onClick={() => handleViewOrder(order.id)}
          >
            📋 View Details
          </button>
        );
      default:
        return (
          <button 
            className="action-button action-button-secondary"
            onClick={() => handleViewOrder(order.id)}
          >
            👁️ View
          </button>
        );
    }
  };

  const tabs = [
    { id: 'all', label: 'All Orders', count: ordersData.orders.length },
    { id: 'pending', label: 'Pending', count: ordersData.stats.pending },
    { id: 'confirmed', label: 'Confirmed', count: ordersData.stats.confirmed },
    { id: 'shipped', label: 'Shipped', count: ordersData.stats.shipped },
    { id: 'delivered', label: 'Delivered', count: ordersData.stats.delivered }
  ];

  return (
    <>
      <Header isFarmerMode={true} onNavigate={onNavigate} />
      <div className="orders-page">
        
        {/* Header */}
        <div className="orders-header">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="orders-title">📦 Order Management</h1>
                <p className="orders-subtitle">Manage and track your customer orders</p>
              </div>
              <button
                onClick={() => onNavigate('farmer-dashboard')}
                className="mt-4 lg:mt-0 bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="orders-container">
            
            {/* Order Statistics */}
            <div className={`orders-stats animate-entrance ${isVisible ? 'visible' : ''}`}>
              <div className="stat-card stat-card-pending">
                <div className="stat-icon">⏳</div>
                <div className="stat-number">{ordersData.stats.pending}</div>
                <div className="stat-label">Pending Orders</div>
              </div>
              <div className="stat-card stat-card-confirmed">
                <div className="stat-icon">✅</div>
                <div className="stat-number">{ordersData.stats.confirmed}</div>
                <div className="stat-label">Confirmed</div>
              </div>
              <div className="stat-card stat-card-shipped">
                <div className="stat-icon">🚚</div>
                <div className="stat-number">{ordersData.stats.shipped}</div>
                <div className="stat-label">Shipped</div>
              </div>
              <div className="stat-card stat-card-delivered">
                <div className="stat-icon">📦</div>
                <div className="stat-number">{ordersData.stats.delivered}</div>
                <div className="stat-label">Delivered</div>
              </div>
            </div>

            {/* Filters */}
            <div className={`orders-filters animate-entrance delay-100 ${isVisible ? 'visible' : ''}`}>
              <div className="filters-header">
                <h2 className="filters-title">🔍 Filter Orders</h2>
                <button 
                  className="clear-filters"
                  onClick={handleClearFilters}
                >
                  🗑️ Clear Filters
                </button>
              </div>
              <div className="filters-grid">
                <div className="filter-group">
                  <label className="filter-label">Status</label>
                  <select 
                    className="filter-select"
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
                <div className="filter-group">
                  <label className="filter-label">Date Range</label>
                  <select 
                    className="filter-select"
                    value={filters.dateRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label className="filter-label">Search Buyer</label>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Search by buyer name..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>
                <div className="filter-group">
                  <label className="filter-label">Items per page</label>
                  <select className="filter-select" defaultValue="10">
                    <option value="5">5 orders</option>
                    <option value="10">10 orders</option>
                    <option value="25">25 orders</option>
                    <option value="50">50 orders</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Orders Content */}
            <div className={`orders-content animate-entrance delay-200 ${isVisible ? 'visible' : ''}`}>
              
              {/* Tabs */}
              <div className="orders-tabs">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                    <span className="tab-badge">{tab.count}</span>
                  </button>
                ))}
              </div>

              {/* Orders List */}
              <div className="orders-list">
                {isLoading ? (
                  <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Updating order status...</p>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📦</div>
                    <h3 className="empty-title">No orders found</h3>
                    <p className="empty-description">
                      {activeTab === 'all' 
                        ? "You don't have any orders yet. When you receive orders, they'll appear here."
                        : `No ${activeTab} orders found. Try changing your filters.`
                      }
                    </p>
                    {activeTab !== 'all' && (
                      <button 
                        className="action-button action-button-primary"
                        onClick={() => setActiveTab('all')}
                      >
                        View All Orders
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="orders-grid">
                    {filteredOrders.map(order => (
                      <div key={order.id} className="order-item">
                        <div className="order-item-header">
                          <div className="order-info">
                            <div className="order-buyer-avatar">
                              {order.buyer.avatar}
                            </div>
                            <div className="order-details">
                              <h3>{order.buyer.name}</h3>
                              <div className="order-meta">
                                Order #{order.id} • {new Date(order.orderDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="order-amount">
                            <div className="order-total">{order.total.toLocaleString()} DA</div>
                            <div className="order-date">
                              Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="order-item-body">
                          <div className="order-products">
                            {order.products.map((product, index) => (
                              <div key={index} className="order-product">
                                <div className="product-emoji">{product.emoji}</div>
                                <div className="product-info">
                                  <h4>{product.name}</h4>
                                  <div className="product-meta">
                                    {product.quantity} • {product.price.toLocaleString()} DA
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="order-status">
                            {getStatusBadge(order.status)}
                            <div className="order-meta" style={{ marginTop: '0.5rem' }}>
                              Payment: <span style={{ color: order.payment === 'paid' ? '#059669' : '#ef4444', fontWeight: '600' }}>
                                {order.payment === 'paid' ? '✅ Paid' : '❌ Pending'}
                              </span>
                            </div>
                          </div>

                          <div className="order-actions">
                            {getActionButtons(order)}
                            <button 
                              className="action-button action-button-secondary"
                              onClick={() => handleViewOrder(order.id)}
                            >
                              👁️ Details
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
      </div>
      <Footer />
    </>
  );
};

export default Orders;