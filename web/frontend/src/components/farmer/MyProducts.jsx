import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';

const MyProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      category: 'vegetables',
      image: '🍅',
      price: 180,
      stock: 250,
      unit: 'kg',
      status: 'available',
      sales: 48,
      rating: 4.8,
      description: 'Fresh organic tomatoes from our farm'
    },
    {
      id: 2,
      name: 'Fresh Potatoes',
      category: 'vegetables',
      image: '🥔',
      price: 95,
      stock: 500,
      unit: 'kg',
      status: 'available',
      sales: 125,
      rating: 4.6,
      description: 'High-quality potatoes, perfect for all dishes'
    },
    {
      id: 3,
      name: 'Green Lettuce',
      category: 'vegetables',
      image: '🥬',
      price: 120,
      stock: 80,
      unit: 'kg',
      status: 'low-stock',
      sales: 32,
      rating: 4.9,
      description: 'Crispy fresh lettuce, harvested daily'
    },
    {
      id: 4,
      name: 'Carrots',
      category: 'vegetables',
      image: '🥕',
      price: 110,
      stock: 180,
      unit: 'kg',
      status: 'available',
      sales: 67,
      rating: 4.7,
      description: 'Sweet and crunchy carrots'
    },
    {
      id: 5,
      name: 'Fresh Cucumbers',
      category: 'vegetables',
      image: '🥒',
      price: 85,
      stock: 150,
      unit: 'kg',
      status: 'available',
      sales: 54,
      rating: 4.5,
      description: 'Garden-fresh cucumbers'
    },
    {
      id: 6,
      name: 'Bell Peppers',
      category: 'vegetables',
      image: '🫑',
      price: 220,
      stock: 0,
      unit: 'kg',
      status: 'out-of-stock',
      sales: 28,
      rating: 4.8,
      description: 'Colorful bell peppers, rich in vitamins'
    },
    {
      id: 7,
      name: 'Fresh Corn',
      category: 'grains',
      image: '🌽',
      price: 75,
      stock: 320,
      unit: 'kg',
      status: 'available',
      sales: 92,
      rating: 4.6,
      description: 'Sweet corn, freshly harvested'
    },
    {
      id: 8,
      name: 'Eggplant',
      category: 'vegetables',
      image: '🍆',
      price: 140,
      stock: 95,
      unit: 'kg',
      status: 'available',
      sales: 41,
      rating: 4.4,
      description: 'Fresh eggplants for traditional dishes'
    }
  ];

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === 'available').length,
    totalSales: products.reduce((sum, p) => sum + p.sales, 0),
    averageRating: (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)
  };

  const categories = [
    { id: 'all', name: 'All Products', icon: '📦' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'grains', name: 'Grains', icon: '🌾' }
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'stock') return b.stock - a.stock;
      if (sortBy === 'sales') return b.sales - a.sales;
      return 0;
    });


  return (
    <>
      <Header isFarmerMode={true} />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">

        {/* Header Section */}
        <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">📦 My Products</h1>
                <p className="text-green-100 text-lg">Manage your farm products and inventory</p>
              </div>
              <div className="mt-6 md:mt-0">
                <button
                  onClick={() => navigate('/farmer-add-product')}
                  className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add New Product
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Stats Overview */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Products</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stats.totalProducts}</p>
                <p className="text-blue-600 font-semibold text-sm">In inventory</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 group cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Active Listings</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stats.activeProducts}</p>
                <p className="text-green-600 font-semibold text-sm">Available for sale</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 group cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Sales</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stats.totalSales}</p>
                <p className="text-purple-600 font-semibold text-sm">Units sold</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-yellow-200 group cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Avg Rating</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stats.averageRating}/5</p>
                <p className="text-yellow-600 font-semibold text-sm">Customer satisfaction</p>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 mb-8 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '400ms'}}>
            {/* Category Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-2">
                <label className="font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="price">Price (High to Low)</option>
                  <option value="stock">Stock Level</option>
                  <option value="sales">Sales Volume</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="relative p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg">
                    {product.image}
                  </div>
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'available' ? 'bg-green-100 text-green-800' :
                    product.status === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.status === 'available' ? 'Available' :
                     product.status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-green-600">{product.price} <span className="text-sm font-normal text-gray-500">DA/{product.unit}</span></div>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <span>📦</span>
                        <span>{product.stock} {product.unit}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>🛒</span>
                        <span>{product.sales} sold</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <div className="flex space-x-2">
                    <button
                      className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 hover:bg-blue-700 transform hover:scale-105 flex items-center justify-center text-sm"
                      onClick={() => navigate(`/edit-product/${product.id}`)}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </button>
                    <button
                      className="flex-1 bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 hover:bg-green-700 transform hover:scale-105 flex items-center justify-center text-sm"
                      onClick={() => navigate(`/product-details/${product.id}`)}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      View
                    </button>
                    <button
                      className="bg-red-600 text-white font-semibold py-2 px-3 rounded-xl transition-all duration-300 hover:bg-red-700 transform hover:scale-105 flex items-center justify-center"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
                          console.log('Delete product:', product.id);
                        }
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <span className="text-6xl">📭</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No products found</h3>
              <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                {searchTerm
                  ? `No products match "${searchTerm}". Try a different search term.`
                  : 'Start by adding your first product to your inventory.'
                }
              </p>
              <button
                onClick={() => navigate('/farmer-add-product')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Your First Product
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyProducts;
