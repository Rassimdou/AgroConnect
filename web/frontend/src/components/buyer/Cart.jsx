import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';

// Dummy cart data
const cartItems = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 250,
    quantity: 2,
    maxQuantity: 500,
    image: "🍅",
    supplier: "Farm Fresh Co.",
    qualityScore: 92
  },
  {
    id: 2,
    name: "Organic Potatoes",
    price: 180,
    quantity: 3,
    maxQuantity: 800,
    image: "🥔",
    supplier: "Green Valley Farms",
    qualityScore: 88
  },
  {
    id: 3,
    name: "Premium Dates",
    price: 450,
    quantity: 1,
    maxQuantity: 200,
    image: "🌴",
    supplier: "Desert Gold",
    qualityScore: 95
  }
];

const Cart = () => {
  const [items, setItems] = useState(cartItems);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const navigate = useNavigate();

  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, Math.min(item.maxQuantity, newQuantity)) }
        : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod === 'express' ? 500 : shippingMethod === 'standard' ? 200 : 0;
  const total = subtotal + shippingCost;

  const getQualityScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleCheckout = () => {
    alert(`Proceeding to checkout with total: ${total} DZD`);
  };

  return (
    <>
      <Header isBuyerMode={true} />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          /* Empty Cart */
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13l1.1-5m8.9 5L17 8m-8.9 5h8.9m-8.9 0L5.4 5"></path>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h3>
            <p className="text-gray-600 mb-8 text-lg">Discover fresh agricultural products and start building your order.</p>
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
                className="bg-white border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-600 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                View Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13l1.1-5m8.9 5L17 8m-8.9 5h8.9m-8.9 0L5.4 5"></path>
                  </svg>
                  Your Cart ({items.length} items)
                </h2>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-green-200 transition-all duration-300 group" style={{animationDelay: `${index * 100}ms`}}>
                      <div className="flex items-center space-x-6">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {item.image}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors duration-300">{item.name}</h3>
                          <p className="text-gray-600 mb-2 flex items-center">
                            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            {item.supplier}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className={`font-semibold px-2 py-1 rounded-full ${item.qualityScore >= 80 ? 'bg-green-100 text-green-800' : item.qualityScore >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              Quality: {item.qualityScore}%
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="font-semibold text-gray-900">{item.price} DZD/kg</span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-center space-y-3">
                          <div className="flex items-center bg-white rounded-xl border border-gray-200 shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 rounded-l-xl flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                              disabled={item.quantity <= 1}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                              </svg>
                            </button>
                            <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 rounded-r-xl flex items-center justify-center text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
                              disabled={item.quantity >= item.maxQuantity}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                              </svg>
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center hover:underline transition-all duration-300"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            Remove
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600 mb-1">{item.price * item.quantity} DZD</p>
                          <p className="text-sm text-gray-500">{item.quantity}kg × {item.price} DZD</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Shipping Options */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                  Shipping Method
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:border-green-300 hover:bg-green-50 group">
                    <input
                      type="radio"
                      name="shipping"
                      value="free"
                      checked={shippingMethod === 'free'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-5 h-5 text-green-600 focus:ring-green-500 cursor-pointer"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300">Free Pickup</span>
                        <span className="text-lg font-bold text-green-600">Free</span>
                      </div>
                      <p className="text-gray-600 mt-1">Pick up from supplier location • Ready in 24h</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 group">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">Standard Delivery</span>
                        <span className="text-lg font-bold text-blue-600">200 DZD</span>
                      </div>
                      <p className="text-gray-600 mt-1">Door-to-door delivery • 3-5 business days</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:border-purple-300 hover:bg-purple-50 group">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-5 h-5 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">Express Delivery</span>
                        <span className="text-lg font-bold text-purple-600">500 DZD</span>
                      </div>
                      <p className="text-gray-600 mt-1">Priority delivery • 1-2 business days</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  Order Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-green-100">Subtotal ({items.length} items)</span>
                    <span className="text-xl font-semibold">{subtotal} DZD</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-green-100">Shipping</span>
                    <span className="text-xl font-semibold">{shippingCost} DZD</span>
                  </div>
                  <div className="border-t border-green-400 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">Total</span>
                      <span className="text-3xl font-bold text-yellow-300">{total} DZD</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full mt-8 bg-white text-green-600 hover:bg-green-50 font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
                >
                  <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13l1.1-5m8.9 5L17 8m-8.9 5h8.9m-8.9 0L5.4 5"></path>
                  </svg>
                  Proceed to Checkout
                </button>

                <div className="mt-6 flex items-center justify-center space-x-2 text-green-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  <span className="text-sm">Secure payment powered by AgroConnect</span>
                </div>
              </div>

              {/* Cart Stats */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Cart Summary
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-blue-600 mb-1">{items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                    <p className="text-sm text-blue-800">Total kg</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-green-600 mb-1">{items.length}</p>
                    <p className="text-sm text-green-800">Products</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-purple-600 mb-1">{new Set(items.map(item => item.supplier)).size}</p>
                    <p className="text-sm text-purple-800">Suppliers</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-orange-600 mb-1">{items.reduce((sum, item) => sum + (item.qualityScore * item.quantity), 0) / items.reduce((sum, item) => sum + item.quantity, 0) || 0}</p>
                    <p className="text-sm text-orange-800">Avg Quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;