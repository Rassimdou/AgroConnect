import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import './MyProducts.css';

const MyProducts = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

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

  const getStatusBadge = (status, stock) => {
    if (status === 'out-of-stock' || stock === 0) {
      return <span className="product-status status-out">Out of Stock</span>;
    }
    if (status === 'low-stock' || stock < 100) {
      return <span className="product-status status-low">Low Stock</span>;
    }
    return <span className="product-status status-available">Available</span>;
  };

  return (
    <>
      <Header isFarmerMode={true} onNavigate={onNavigate} />
      <div className="products-page" style={{ paddingTop: '5rem' }}>
        
        {/* Page Header */}
        <div className="products-header">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="products-title">📦 My Products</h1>
                <p className="products-subtitle">Manage your farm products and inventory</p>
              </div>
              <button 
                onClick={() => onNavigate && onNavigate('add-product')}
                className="add-product-btn"
              >
                <span className="text-xl">+</span>
                <span>Add New Product</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Stats Overview */}
          <div className={`products-stats-grid animate-entrance ${isVisible ? 'visible' : ''}`}>
            <div className="products-stat-card">
              <div className="products-stat-icon stat-icon-total">📦</div>
              <div>
                <div className="products-stat-label">Total Products</div>
                <div className="products-stat-value">{stats.totalProducts}</div>
              </div>
            </div>
            <div className="products-stat-card">
              <div className="products-stat-icon stat-icon-active">✅</div>
              <div>
                <div className="products-stat-label">Active Listings</div>
                <div className="products-stat-value">{stats.activeProducts}</div>
              </div>
            </div>
            <div className="products-stat-card">
              <div className="products-stat-icon stat-icon-sales">💰</div>
              <div>
                <div className="products-stat-label">Total Sales</div>
                <div className="products-stat-value">{stats.totalSales} units</div>
              </div>
            </div>
            <div className="products-stat-card">
              <div className="products-stat-icon stat-icon-rating">⭐</div>
              <div>
                <div className="products-stat-label">Avg Rating</div>
                <div className="products-stat-value">{stats.averageRating}/5</div>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className={`products-filters animate-entrance delay-300 ${isVisible ? 'visible' : ''}`}>
            {/* Category Filters */}
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            {/* Search & Sort */}
            <div className="search-sort-bar">
              <div className="search-box">
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="sort-box">
                <label className="sort-label">Sort by:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
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
          <div className={`products-grid animate-entrance delay-500 ${isVisible ? 'visible' : ''}`}>
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="product-card"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="product-image-container">
                  <div className="product-emoji">{product.image}</div>
                  {getStatusBadge(product.status, product.stock)}
                </div>

                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-price-row">
                    <div className="product-price">{product.price} DA/{product.unit}</div>
                    <div className="product-rating">
                      <span>⭐</span>
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <div className="product-stats-row">
                    <div className="product-stat">
                      <span className="product-stat-icon">📦</span>
                      <span className="product-stat-text">{product.stock} {product.unit}</span>
                    </div>
                    <div className="product-stat">
                      <span className="product-stat-icon">🛒</span>
                      <span className="product-stat-text">{product.sales} sold</span>
                    </div>
                  </div>

                  <div className="product-actions">
                    <button 
                      className="product-action-btn btn-edit"
                      onClick={() => onNavigate && onNavigate('edit-product', product.id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      <span>Edit</span>
                    </button>
                    <button 
                      className="product-action-btn btn-view"
                      onClick={() => onNavigate && onNavigate('product-details', product.id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      <span>View</span>
                    </button>
                    <button 
                      className="product-action-btn btn-delete"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
                          console.log('Delete product:', product.id);
                        }
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3 className="empty-title">No products found</h3>
              <p className="empty-text">
                {searchTerm 
                  ? `No products match "${searchTerm}". Try a different search term.`
                  : 'Start by adding your first product to your inventory.'
                }
              </p>
              <button 
                onClick={() => onNavigate && onNavigate('add-product')}
                className="empty-action-btn"
              >
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
