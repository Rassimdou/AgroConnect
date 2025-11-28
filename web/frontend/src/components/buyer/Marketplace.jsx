import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';
import farmImage from '../../assets/farm.jpg';
import { productAPI } from '../../services/api';

// Dummy data for products
const dummyProducts = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 250, // in DZD per kg
    quantity: 500,
    qualityScore: 92,
    region: "Algiers",
    type: "Vegetables",
    image: "🍅",
    supplier: "Farm Fresh Co."
  },
  {
    id: 2,
    name: "Organic Potatoes",
    price: 180,
    quantity: 800,
    qualityScore: 88,
    region: "Oran",
    type: "Vegetables",
    image: "🥔",
    supplier: "Green Valley Farms"
  },
  {
    id: 3,
    name: "Premium Dates",
    price: 450,
    quantity: 200,
    qualityScore: 95,
    region: "Biskra",
    type: "Fruits",
    image: "🌴",
    supplier: "Desert Gold"
  },
  {
    id: 4,
    name: "Hard Wheat",
    price: 320,
    quantity: 1000,
    qualityScore: 85,
    region: "Sétif",
    type: "Grains",
    image: "🌾",
    supplier: "Golden Grain Ltd"
  },
  {
    id: 5,
    name: "Fresh Oranges",
    price: 280,
    quantity: 300,
    qualityScore: 78,
    region: "Constantine",
    type: "Fruits",
    image: "🍊",
    supplier: "Citrus Valley"
  },
  {
    id: 6,
    name: "Premium Olives",
    price: 550,
    quantity: 150,
    qualityScore: 91,
    region: "Tlemcen",
    type: "Fruits",
    image: "🫒",
    supplier: "Olive Grove Co."
  }
];

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    region: '',
    priceRange: ''
  });
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getAllProducts();
        setProducts(response.data || response || []);
        setFilteredProducts(response.data || response || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        // Fallback to dummy data if API fails
        setProducts(dummyProducts);
        setFilteredProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected filters
  useEffect(() => {
    let filtered = products;

    if (filters.type) {
      filtered = filtered.filter(product => product.type === filters.type);
    }

    if (filters.region) {
      filtered = filtered.filter(product => product.region === filters.region);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const getQualityScoreColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getQualityScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 50) return 'Good';
    return 'Fair';
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      region: '',
      priceRange: ''
    });
  };

  return (
    <>
      <Header isBuyerMode={true} />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">

      {/* Hero Section */}
      <div className="relative text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${farmImage})` }}
        ></div>
        <div className="absolute inset-0  bg-opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Fresh
              <span className="block text-green-700">Agricultural Products</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Connect directly with verified farmers and suppliers across Algeria. Find the freshest produce at competitive prices.
            </p>

            

            
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading fresh products...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-green-600 hover:text-green-700 font-semibold flex items-center hover:underline transition-all duration-300"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Clear All
                </button>
              </div>

              {/* Product Type Filter */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  Product Type
                </label>
                <div className="space-y-3">
                  {[
                    { value: '', label: 'All Types', count: filteredProducts.length },
                    { value: 'Fruits', label: 'Fruits', count: products.filter(p => p.type === 'Fruits').length },
                    { value: 'Vegetables', label: 'Vegetables', count: products.filter(p => p.type === 'Vegetables').length },
                    { value: 'Grains', label: 'Grains', count: products.filter(p => p.type === 'Grains').length }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center justify-between p-3 rounded-xl hover:bg-green-50 cursor-pointer transition-all duration-300 group">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="productType"
                          value={option.value}
                          checked={filters.type === option.value}
                          onChange={(e) => handleFilterChange('type', e.target.value)}
                          className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-green-700 font-medium">{option.label}</span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{option.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Region Filter */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Region
                </label>
                <div className="space-y-3">
                  {[
                    { value: '', label: 'All Regions', count: filteredProducts.length },
                    { value: 'Algiers', label: 'Algiers', count: products.filter(p => p.region === 'Algiers').length },
                    { value: 'Oran', label: 'Oran', count: products.filter(p => p.region === 'Oran').length },
                    { value: 'Constantine', label: 'Constantine', count: products.filter(p => p.region === 'Constantine').length },
                    { value: 'Biskra', label: 'Biskra', count: products.filter(p => p.region === 'Biskra').length },
                    { value: 'Sétif', label: 'Sétif', count: products.filter(p => p.region === 'Sétif').length },
                    { value: 'Tlemcen', label: 'Tlemcen', count: products.filter(p => p.region === 'Tlemcen').length }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 cursor-pointer transition-all duration-300 group">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="region"
                          value={option.value}
                          checked={filters.region === option.value}
                          onChange={(e) => handleFilterChange('region', e.target.value)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-blue-700 font-medium">{option.label}</span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{option.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  Price Range (DZD/kg)
                </label>
                <div className="space-y-3">
                  {[
                    { value: '', label: 'All Prices', count: filteredProducts.length },
                    { value: '0-200', label: 'Under 200 DZD', count: products.filter(p => p.price < 200).length },
                    { value: '200-400', label: '200 - 400 DZD', count: products.filter(p => p.price >= 200 && p.price <= 400).length },
                    { value: '400-600', label: '400 - 600 DZD', count: products.filter(p => p.price >= 400 && p.price <= 600).length },
                    { value: '600', label: 'Over 600 DZD', count: products.filter(p => p.price > 600).length }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center justify-between p-3 rounded-xl hover:bg-purple-50 cursor-pointer transition-all duration-300 group">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          value={option.value}
                          checked={filters.priceRange === option.value}
                          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                          className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-purple-700 font-medium">{option.label}</span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{option.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Filters Summary */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Active Filters:</p>
                <div className="flex flex-wrap gap-2">
                  {filters.type && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Type: {filters.type}
                    </span>
                  )}
                  {filters.region && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      Region: {filters.region}
                    </span>
                  )}
                  {filters.priceRange && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                      Price: {filters.priceRange} DZD
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {filteredProducts.length} Fresh Products Found
                  </h2>
                  <p className="text-gray-600">Discover the best from Algerian farmers</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <select className="text-sm border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm">
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Quality Score</option>
                    <option>Newest First</option>
                    <option>Region: A-Z</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(filters.type || filters.region || filters.priceRange) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Active filters:</span>
                    {filters.type && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 font-medium">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                        {filters.type}
                        <button
                          onClick={() => handleFilterChange('type', '')}
                          className="ml-2 hover:bg-green-200 rounded-full p-0.5"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </span>
                    )}
                    {filters.region && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 font-medium">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {filters.region}
                        <button
                          onClick={() => handleFilterChange('region', '')}
                          className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </span>
                    )}
                    {filters.priceRange && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 font-medium">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                        {filters.priceRange === '600' ? 'Over 600 DZD' : filters.priceRange.replace('-', ' - ') + ' DZD'}
                        <button
                          onClick={() => handleFilterChange('priceRange', '')}
                          className="ml-2 hover:bg-purple-200 rounded-full p-0.5"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer group border border-gray-100 hover:border-green-200 transform hover:scale-105"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-blue-100/20 animate-pulse"></div>
                    <span className="text-7xl relative z-10 group-hover:scale-110 transition-transform duration-500">{product.image}</span>

                    {/* Quality Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${getQualityScoreColor(product.qualityScore)}`}>
                      Q{product.qualityScore}
                    </div>

                    {/* Favorite Button */}
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <svg className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          {product.supplier}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {product.price}
                          <span className="text-sm font-normal text-gray-500"> DZD</span>
                        </div>
                        <div className="text-xs text-gray-500">per kg</div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Quality:</span>
                        <span className={`font-semibold ${product.qualityScore >= 80 ? 'text-green-600' : product.qualityScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {getQualityScoreLabel(product.qualityScore)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Region:</span>
                        <span className="font-semibold text-gray-900 flex items-center">
                          <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          {product.region}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Available:</span>
                        <span className="font-semibold text-gray-900">{product.quantity}kg</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">(4.8)</span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic here
                        alert(`Added ${product.name} to cart!`);
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13l1.1-5m8.9 5L17 8m-8.9 5h8.9m-8.9 0L5.4 5"></path>
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any products matching your current filters. Try adjusting your search criteria or clearing some filters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={clearFilters}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => navigate('/marketplace')}
                    className="bg-white border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Browse All Products
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        )}
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Marketplace;