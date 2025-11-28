import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';

// Dummy orders data
const ordersData = [
  {
    id: "ORD-2024-001",
    date: "2024-11-25",
    total: 1250,
    status: "Delivered",
    items: [
      { name: "Fresh Tomatoes", quantity: 2, price: 250 },
      { name: "Organic Potatoes", quantity: 3, price: 180 }
    ],
    supplier: "Farm Fresh Co.",
    trackingNumber: "TRK-789456"
  },
  {
    id: "ORD-2024-002",
    date: "2024-11-23",
    total: 890,
    status: "In Transit",
    items: [
      { name: "Premium Dates", quantity: 1, price: 450 },
      { name: "Fresh Oranges", quantity: 1, price: 280 }
    ],
    supplier: "Desert Gold",
    trackingNumber: "TRK-789457"
  },
  {
    id: "ORD-2024-003",
    date: "2024-11-20",
    total: 550,
    status: "Processing",
    items: [
      { name: "Premium Olives", quantity: 1, price: 550 }
    ],
    supplier: "Olive Grove Co.",
    trackingNumber: null
  },
  {
    id: "ORD-2024-004",
    date: "2024-11-18",
    total: 960,
    status: "Delivered",
    items: [
      { name: "Hard Wheat", quantity: 3, price: 320 }
    ],
    supplier: "Golden Grain Ltd",
    trackingNumber: "TRK-789458"
  }
];

const MyOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTrackShipment = (order) => {
    if (order.trackingNumber) {
      alert(`Tracking ${order.trackingNumber}: Your order is ${order.status.toLowerCase()}. Expected delivery: 2-3 business days.`);
    } else {
      alert('Tracking information will be available once your order is processed.');
    }
  };

  const handleLeaveReview = (order) => {
    alert(`Leave a review for order ${order.id}`);
  };

  return (
    <>
      <Header isBuyerMode={true} />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-green-700 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">My Orders</h1>
                <p className="text-blue-100 text-lg">Track your purchases and order history</p>
              </div>
              <div className="mt-6 md:mt-0">
                <button
                  onClick={() => navigate('/marketplace')}
                  className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  New Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {ordersData.map((order, index) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100" style={{animationDelay: `${index * 100}ms`}}>
              {/* Order Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Order #{order.id}</h3>
                      <p className="text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span className="text-gray-600">{order.supplier}</span>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)} shadow-sm`}>
                      {order.status}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{order.total} DZD</p>
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
                <div className="space-y-4">
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-green-200 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center text-xl shadow-lg">
                          {itemIndex + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">{item.name}</p>
                          <p className="text-gray-600">{item.quantity}kg × {item.price} DZD/kg</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">{item.quantity * item.price} DZD</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleTrackShipment(order)}
                    className="flex-1 bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                    </svg>
                    {order.trackingNumber ? 'Track Shipment' : 'Track Order'}
                  </button>
                  {order.status === 'Delivered' && (
                    <button
                      onClick={() => handleLeaveReview(order)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                      </svg>
                      Leave Review
                    </button>
                  )}
                  <button className="flex-1 bg-white border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-600 font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Order Again
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no orders) */}
        {ordersData.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No orders yet</h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">Start your agricultural journey by exploring our fresh products and placing your first order.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/marketplace')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Browse Products
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                View Dashboard
              </button>
            </div>
          </div>
        )}

      
      </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;