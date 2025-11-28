import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';

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

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();

  const product = productData;

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

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Add to Cart - {product.price * quantity} DZD
            </button>

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
    </>
  );
};

export default ProductDetail;