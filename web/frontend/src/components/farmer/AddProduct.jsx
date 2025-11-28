import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import api from "../../services/api";

const AddProduct = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    minOrder: "1",
    images: [], // Stores objects with { id, file, preview, base64 }
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    const newImagesPromises = files.map(async (file) => {
      const base64 = await convertFileToBase64(file);
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        base64: base64 // Store base64 string for API
      };
    });

    const newImages = await Promise.all(newImagesPromises);

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleRemoveImage = (imageId) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleImageUpload(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create FormData for multipart/form-data upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.productName);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('quantity_available', formData.quantity);
      formDataToSend.append('minimum_order_amount', formData.minOrder);

      // Append image files
      formData.images.forEach((image) => {
        formDataToSend.append('images', image.file);
      });

      const response = await api.post('/market/createProduct', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Product created:", response.data);
      setShowSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          productName: "",
          category: "",
          description: "",
          price: "",
          quantity: "",
          minOrder: "1",
          images: [],
        });
        setShowSuccess(false);
        setIsLoading(false);
        navigate('/farmer-my-products'); // Navigate to products list
      }, 2000);
    } catch (error) {
      console.error("Error submitting product:", error);
      alert(error.response?.data?.message || "Failed to create product. Please try again.");
      setIsLoading(false);
    }
  };

  const categories = [
    "Tomatoes", "Potatoes", "Lettuce", "Carrots", "Onions", "Peppers", "Cucumbers",
    "Apples", "Oranges", "Bananas", "Grapes", "Berries", "Melons", "Citrus",
    "Wheat", "Rice", "Corn", "Barley", "Oats", "Quinoa",
    "Basil", "Mint", "Parsley", "Cilantro", "Rosemary", "Thyme",
    "Milk", "Cheese", "Yogurt", "Butter", "Cream",
    "Eggs", "Chicken", "Turkey", "Duck",
    "Other"
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
                <h1 className="text-3xl md:text-4xl font-bold mb-2">🌱 Add New Product</h1>
                <p className="text-green-100 text-lg">List your farm products and reach more customers</p>
              </div>
              <div className="mt-6 md:mt-0">
                <button
                  onClick={() => navigate('/farmer-my-products')}
                  className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                  </svg>
                  View My Products
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">

            {/* Success Message */}
            {showSuccess && (
              <div className="mb-8 bg-green-50 border border-green-200 rounded-2xl p-6 text-green-800 transform transition-all duration-500">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="font-semibold">Product added successfully! Redirecting...</span>
                </div>
              </div>
            )}

            <div className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-2xl mr-3">📝</span>
                    Basic Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., Organic Tomatoes"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Describe your product... (quality, freshness, farming methods, etc.)"
                      rows="4"
                      required
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-8 mb-8"></div>

                {/* Pricing & Quantity */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-2xl mr-3">💰</span>
                    Pricing & Quantity
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">DA</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity Available <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., 100"
                        min="1"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order</label>
                      <input
                        type="number"
                        name="minOrder"
                        value={formData.minOrder}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., 1"
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                {/* Product Images */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-2xl mr-3">🖼️</span>
                    Product Images
                  </h2>

                  <div
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 group ${isDragOver
                      ? "border-green-500 bg-green-50/50 scale-[1.01]"
                      : "border-gray-300 hover:border-green-500 hover:bg-green-50/30"
                      }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                  >
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">📸</div>
                    <div className="text-xl font-semibold text-gray-800 mb-2">Upload Product Images</div>
                    <div className="text-gray-500 mb-1">
                      Drag & drop images here or click to browse
                    </div>
                    <div className="text-sm text-gray-400">
                      Supports JPG, PNG, WEBP (Max 5MB each)
                    </div>
                    <button type="button" className="mt-6 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm">
                      Choose Files
                    </button>
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      {formData.images.map((image) => (
                        <div key={image.id} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                          <img
                            src={image.preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-white/90 text-red-500 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white shadow-md backdrop-blur-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(image.id);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                    onClick={() => navigate('/farmer-dashboard')}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block"></div>
                        Adding Product...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Product
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProduct;
