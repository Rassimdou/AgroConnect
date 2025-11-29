import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../header';
import Footer from '../footer';
import ChatModal from '../ChatModal';
import farmImage from '../../assets/farm.jpg';
import { productAPI } from '../../services/api';

// Dummy data for products with demand info
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
    supplier: "Farm Fresh Co.",
    demand: "High",
    inquiries: 15
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
    supplier: "Green Valley Farms",
    demand: "Medium",
    inquiries: 8
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
    supplier: "Desert Gold",
    demand: "High",
    inquiries: 22
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
    supplier: "Golden Grain Ltd",
    demand: "Low",
    inquiries: 3
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
    supplier: "Citrus Valley",
    demand: "Medium",
    inquiries: 12
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
    supplier: "Olive Grove Co.",
    demand: "High",
    inquiries: 18
  }
];

const Marketplace = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    region: '',
    priceRange: '',
    demand: ''
  });
  const [chatModal, setChatModal] = useState({
    isOpen: false,
    product: null
  });
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Mock current user - in real app, get from auth context or API
  const mockCurrentUser = {
    id: 1, // Mock user ID
    name: 'John Buyer',
    type: 'user'
  };

  // Fetch current user profile
  useEffect(() => {
    // For now, use mock user. In real app, fetch from API
    setCurrentUser(mockCurrentUser);
  }, []);

  const normalizeProducts = (items = []) =>
    items.map((item, idx) => ({
      id: item.id ?? `api-${idx}`,
      name: item.name ?? 'Unnamed product',
      price: Number(item.price) || 0,
      quantity: item.quantity_available ?? item.quantity ?? 0,
      qualityScore: item.quality_score ?? item.qualityScore ?? 70,
      region: item.producer?.location ?? item.region ?? item.location ?? 'Unknown region',
      type: item.category ?? item.type ?? 'Other',
      image: item.images?.[0]?.image_url ?? item.image ?? '🛒',
      supplier: item.producer?.fullname ?? item.supplier ?? `Producer #${item.producer_id ?? 'N/A'}`,
      producerInfo: item.producer ? {
        id: item.producer.id,
        name: item.producer.fullname,
        location: item.producer.location,
        phone: item.producer.phone_number
      } : null,
      demand: item.demand ?? item.demand_level ?? 'Medium',
      inquiries: item.inquiries ?? item.inquiries_count ?? 0,
    }));

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getAllProducts();
        const normalized = normalizeProducts(data);
        setProducts(normalized.length ? normalized : dummyProducts);
        setFilteredProducts(normalized.length ? normalized : dummyProducts);
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

    if (filters.demand) {
      filtered = filtered.filter(product => product.demand === filters.demand);
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

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
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
      priceRange: '',
      demand: ''
    });
  };

  const handleContactSeller = (product) => {
    // Open chat modal with the product and seller info
    setChatModal({
      isOpen: true,
      product: product
    });
  };

  const closeChatModal = () => {
    setChatModal({
      isOpen: false,
      product: null
    });
  };

  return (
    <>
      <Header isFarmerMode={true} />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">

        {/* Hero Section */}
        <div className="relative text-white py-16 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${farmImage})` }}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t('Explore Market Opportunities').split(' ').slice(0, -1).join(' ')}
                <span className="block text-green-400">{t('Explore Market Opportunities').split(' ').slice(-1)}</span>
              </h1>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                {t('marketplaceHeroDescription')}
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
                <p className="text-gray-600 text-lg">{t('Loading market data...')}</p>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('Oops! Something went wrong')}</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('Try Again')}
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 border border-gray-100">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">{t('Filters')}</h2>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-green-600 hover:text-green-700 font-semibold flex items-center hover:underline transition-all duration-300"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      {t('Clear All')}
                    </button>
                  </div>

                  {/* Product Type Filter */}
                  <div className="mb-8">
                    <label className="block text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                      </svg>
                      {t('Product Type')}
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: '', label: t('All Types'), count: filteredProducts.length },
                        { value: 'Fruits', label: t('Fruits'), count: products.filter(p => p.type === 'Fruits').length },
                        { value: 'Vegetables', label: t('Vegetables'), count: products.filter(p => p.type === 'Vegetables').length },
                        { value: 'Grains', label: t('Grains'), count: products.filter(p => p.type === 'Grains').length }
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
                      {t('Region')}
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: '', label: t('All Regions'), count: filteredProducts.length },
                        { value: 'Algiers', label: t('Algiers'), count: products.filter(p => p.region?.toLowerCase().includes('algiers')).length },
                        { value: 'Oran', label: t('Oran'), count: products.filter(p => p.region?.toLowerCase().includes('oran')).length },
                        { value: 'Constantine', label: t('Constantine'), count: products.filter(p => p.region?.toLowerCase().includes('constantine')).length },
                        { value: 'Biskra', label: t('Biskra'), count: products.filter(p => p.region?.toLowerCase().includes('biskra')).length },
                        { value: 'Sétif', label: t('Sétif'), count: products.filter(p => p.region?.toLowerCase().includes('sétif') || p.region?.toLowerCase().includes('setif')).length },
                        { value: 'Tlemcen', label: t('Tlemcen'), count: products.filter(p => p.region?.toLowerCase().includes('tlemcen')).length }
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
                      {t('Price Range (DZD/kg)')}
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: '', label: t('All Prices'), count: filteredProducts.length },
                        { value: '0-200', label: t('Under 200 DZD'), count: products.filter(p => p.price < 200).length },
                        { value: '200-400', label: t('200 - 400 DZD'), count: products.filter(p => p.price >= 200 && p.price <= 400).length },
                        { value: '400-600', label: t('400 - 600 DZD'), count: products.filter(p => p.price >= 400 && p.price <= 600).length },
                        { value: '600', label: t('Over 600 DZD'), count: products.filter(p => p.price > 600).length }
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

                  {/* Demand Filter */}
                  <div className="mb-8">
                    <label className="block text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                      {t('Demand Level')}
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: '', label: t('All Levels'), count: filteredProducts.length },
                        { value: 'High', label: t('High Demand'), count: products.filter(p => p.demand === 'High').length },
                        { value: 'Medium', label: t('Medium Demand'), count: products.filter(p => p.demand === 'Medium').length },
                        { value: 'Low', label: t('Low Demand'), count: products.filter(p => p.demand === 'Low').length }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 cursor-pointer transition-all duration-300 group">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="demand"
                              value={option.value}
                              checked={filters.demand === option.value}
                              onChange={(e) => handleFilterChange('demand', e.target.value)}
                              className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                            />
                            <span className="ml-3 text-gray-700 group-hover:text-orange-700 font-medium">{option.label}</span>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{option.count}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Active Filters Summary */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">{t('Active Filters:')}</p>
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
                      {filters.demand && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                          Demand: {filters.demand}
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
                        {filteredProducts.length} {t('Market Products Found')}
                      </h2>
                      <p className="text-gray-600">{t('Explore pricing trends and market demand')}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-700">{t('Sort by:')}</span>
                      <select className="text-sm border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm">
                        <option>{t('Price: Low to High')}</option>
                        <option>{t('Price: High to Low')}</option>
                        <option>{t('Demand: High to Low')}</option>
                        <option>{t('Quality Score')}</option>
                        <option>{t('Newest First')}</option>
                        <option>{t('Region: A-Z')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Active Filters Display */}
                  {(filters.type || filters.region || filters.priceRange || filters.demand) && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">{t('Active filters:')}</span>
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
                            {filters.priceRange === '600' ? t('Over 600 DZD') : filters.priceRange.replace('-', ' - ') + ' DZD'}
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
                        {filters.demand && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800 font-medium">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                            </svg>
                            {filters.demand} Demand
                            <button
                              onClick={() => handleFilterChange('demand', '')}
                              className="ml-2 hover:bg-orange-200 rounded-full p-0.5"
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
                      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer group border border-gray-100 hover:border-green-200 transform hover:scale-105"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Product Image */}
                      <div className="relative h-48 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-blue-100/20 animate-pulse"></div>
                        <span className="text-7xl relative z-10 group-hover:scale-110 transition-transform duration-500">{product.image}</span>

                        {/* Quality Badge */}
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${getQualityScoreColor(product.qualityScore)}`}>
                          Q{product.qualityScore}
                        </div>

                        {/* Demand Badge */}
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${getDemandColor(product.demand)}`}>
                          {product.demand}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors duration-300">
                              {product.name}
                            </h3>
                            <div className="text-sm text-gray-600">
                              <p className="flex items-center mb-1">
                                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                {product.supplier}
                              </p>
                              {product.producerInfo && (
                                <p className="flex items-center text-xs text-gray-500">
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                  </svg>
                                  {product.producerInfo.location}
                                </p>
                              )}
                            </div>
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
                            <span className="text-gray-600">{t('Quality:')}</span>
                            <span className={`font-semibold ${product.qualityScore >= 80 ? 'text-green-600' : product.qualityScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {t(getQualityScoreLabel(product.qualityScore))}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{t('Region')}</span>
                            <span className="font-semibold text-gray-900 flex items-center">
                              <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              </svg>
                              {product.region}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{t('Available:')}</span>
                            <span className="font-semibold text-gray-900">{product.quantity}kg</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{t('Demand:')}</span>
                            <span className={`font-semibold ${product.demand === 'High' ? 'text-red-600' : product.demand === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                              {product.demand}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{t('Inquiries:')}</span>
                            <span className="font-semibold text-gray-900">{product.inquiries}</span>
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

                        {/* Contact Seller Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleContactSeller(product);
                          }}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                          </svg>
                          {t('Contact Seller')}
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('No products found')}</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      {t('noProductsDescription')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={clearFilters}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        {t('Clear All Filters')}
                      </button>
                      <button
                        onClick={() => navigate('/marketplace')}
                        className="bg-white border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        {t('Browse All Products')}
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

      {/* Chat Modal */}
      <ChatModal
        isOpen={chatModal.isOpen}
        onClose={closeChatModal}
        product={chatModal.product}
        currentUser={currentUser}
      />
    </>
  );
};

export default Marketplace;