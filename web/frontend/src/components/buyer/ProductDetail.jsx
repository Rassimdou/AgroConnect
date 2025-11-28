import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';
import api from '../../services/api';

// Dummy product data with traceability information
const productData = {
  id: 1,
  name: "Fresh Tomatoes",
  price: 250,
  quantity: 500,
  qualityScore: 92,
  region: "Algiers",
  type: "Vegetables",
  supplier: "Farm Fresh Co.",
  description: "Premium quality tomatoes grown using sustainable farming practices. Perfect for fresh consumption and cooking.",
  images: ["🍅", "🥫", "🌱"],
  traceabilityData: {
    harvestDate: "2024-11-25",
    timeSinceHarvest: "2 days",
    temperatureRange: "8°C - 12°C",
    storageConditions: "Refrigerated at 10°C",
    transportation: "Refrigerated truck",
    originFarm: "Green Valley Farm, Algiers"
  },
  nutritionalInfo: {
    calories: 18,
    protein: "0.9g",
    carbs: "3.9g",
    fiber: "1.2g",
    vitamins: "Rich in Vitamin C and Lycopene"
  }
};

const normalizeProduct = (data = {}) => {
  if (!data) return productData;

  const normalizedImages =
    data.images && data.images.length
      ? data.images.map((img) => {
          if (typeof img === 'string') return img;
          return img?.image_url || img?.url || '🛒';
        })
      : productData.images;

  return {
    id: data.id ?? productData.id,
    name: data.name ?? productData.name,
    price: Number(data.price ?? productData.price),
    quantity: data.quantity_available ?? data.quantity ?? productData.quantity,
    qualityScore: data.quality_score ?? data.qualityScore ?? productData.qualityScore,
    region: data.region ?? data.location ?? productData.region,
    type: data.category ?? productData.type,
    supplier: data.producer?.fullname ?? data.supplier ?? productData.supplier,
    description: data.description ?? productData.description,
    images: normalizedImages,
    traceabilityData: {
      ...productData.traceabilityData,
      ...(data.traceabilityData || {}),
    },
    nutritionalInfo: {
      ...productData.nutritionalInfo,
      ...(data.nutritionalInfo || {}),
    },
  };
};

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'producer', message: 'Hello! I\'m happy to help you with any questions about our fresh tomatoes.', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/market/products/${id}`);
        setProduct(normalizeProduct(data));
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
        // Fallback to dummy data if API fails
        setProduct(productData);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const getQualityScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getQualityScoreLabel = (score) => {
    if (score >= 80) return 'Excellent Quality';
    if (score >= 50) return 'Good Quality';
    return 'Fair Quality';
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, Math.min(product.quantity, prev + change)));
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity}kg of ${product.name} to cart!`);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: 'buyer',
        message: newMessage.trim(),
        timestamp: new Date()
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');

      // Simulate producer response after 2 seconds
      setTimeout(() => {
        const responses = [
          "Thank you for your interest! Our tomatoes are harvested fresh daily.",
          "I'd be happy to arrange delivery for you. What quantity are you interested in?",
          "We can provide bulk discounts for larger orders. Would you like to discuss pricing?",
          "Our farm uses sustainable practices - no pesticides, just natural growth.",
          "I can send you photos of our current crop if you'd like to see the quality."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const producerMessage = {
          id: chatMessages.length + 2,
          sender: 'producer',
          message: randomResponse,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, producerMessage]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Show loading state
  if (loading) {
    return (
      <>
        <Header isBuyerMode={true} />
        <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <Header isBuyerMode={true} />
        <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Show error if no product found
  if (!product) {
    return (
      <>
        <Header isBuyerMode={true} />
        <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.203-2.47M12 7v14m0-14l-4 4m4-4l4 4"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Product Not Found</h3>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/marketplace')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Back to Marketplace
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header isBuyerMode={true} />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center p-12">
              <span className="text-9xl">{product.images[selectedImage]}</span>
            </div>

            {/* Image Gallery */}
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg border-2 flex items-center justify-center text-3xl transition-all cursor-pointer ${
                    selectedImage === index
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  {image}
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Title and Quality Score */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getQualityScoreColor(product.qualityScore)}`}>
                  <span className="mr-2">Q{product.qualityScore}</span>
                  <span>{getQualityScoreLabel(product.qualityScore)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span>🏪 {product.supplier}</span>
                <span>📍 {product.region}</span>
                <span>🏷️ {product.type}</span>
              </div>
            </div>

            {/* Price and Quantity */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-green-600">{product.price} DZD</span>
                  <span className="text-gray-600">/kg</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Available</div>
                  <div className="text-lg font-semibold text-gray-900">{product.quantity}kg</div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-center min-w-12">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">kg</span>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-600">Total</div>
                  <div className="text-xl font-bold text-green-600">{product.price * quantity} DZD</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Add to Cart - {product.price * quantity} DZD
              </button>

              <button
                onClick={() => setIsChatOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                Chat with {product.supplier}
              </button>
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Quality Assurance Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Quality Assurance</h2>
              <p className="text-gray-600">Verified quality and complete traceability</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quality Score Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Quality Score (Q-Score)</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Overall Quality</span>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getQualityScoreColor(product.qualityScore)}`}>
                    Q{product.qualityScore} - {getQualityScoreLabel(product.qualityScore)}
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${product.qualityScore >= 80 ? 'bg-green-500' : product.qualityScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${product.qualityScore}%` }}
                  ></div>
                </div>

                <p className="text-sm text-gray-600">
                  Our AI analyzes multiple quality factors including appearance, freshness, size consistency, and absence of defects.
                </p>
              </div>
            </div>

            {/* Traceability Data */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Traceability Data (IoT)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Harvest Date</span>
                  <span className="font-medium text-gray-900">{product.traceabilityData.harvestDate}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Time Since Harvest</span>
                  <span className="font-medium text-green-600">{product.traceabilityData.timeSinceHarvest}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Temperature Range</span>
                  <span className="font-medium text-blue-600">{product.traceabilityData.temperatureRange}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Storage Conditions</span>
                  <span className="font-medium text-gray-900">{product.traceabilityData.storageConditions}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Transportation</span>
                  <span className="font-medium text-gray-900">{product.traceabilityData.transportation}</span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Origin Farm</span>
                  <span className="font-medium text-gray-900">{product.traceabilityData.originFarm}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nutritional Information */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutritional Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{product.nutritionalInfo.calories}</div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{product.nutritionalInfo.protein}</div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{product.nutritionalInfo.carbs}</div>
              <div className="text-sm text-gray-600">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{product.nutritionalInfo.fiber}</div>
              <div className="text-sm text-gray-600">Fiber</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">{product.nutritionalInfo.vitamins}</p>
          </div>
        </div>
      </div>
      </div>
      <Footer />

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[600px] flex flex-col transform transition-all duration-300 scale-100 opacity-100">
            {/* Chat Header */}
            <div className="bg-linear-to-r from-green-600 to-green-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-lg">👨‍🌾</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{product.supplier}</h3>
                  <p className="text-sm text-green-100">Online now</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-green-200 transition-colors duration-200 p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      msg.sender === 'buyer'
                        ? 'bg-green-600 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'buyer' ? 'text-green-100' : 'text-gray-500'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl transition-colors duration-200 flex items-center justify-center disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                💬 Chat with the producer directly. Your conversation is private and secure.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;