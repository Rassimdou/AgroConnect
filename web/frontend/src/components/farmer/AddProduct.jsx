import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

const AddProduct = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    productType: "vegetable",
    category: "",
    description: "",
    price: "",
    unit: "kg",
    quantity: "",
    minOrder: "1",
    availability: true,
    images: [],
    harvestDate: "",
    organic: false,
    certifications: "",
    location: "",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
    }));

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

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Product data:", formData);
      setShowSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          productName: "",
          productType: "vegetable",
          category: "",
          description: "",
          price: "",
          unit: "kg",
          quantity: "",
          minOrder: "1",
          availability: true,
          images: [],
          harvestDate: "",
          organic: false,
          certifications: "",
          location: "",
        });
        setShowSuccess(false);
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting product:", error);
      setIsLoading(false);
    }
  };

  const productTypes = [
    { value: "vegetable", label: "🥦 Vegetable" },
    { value: "fruit", label: "🍎 Fruit" },
    { value: "grain", label: "🌾 Grain" },
    { value: "herb", label: "🌿 Herb" },
    { value: "dairy", label: "🥛 Dairy" },
    { value: "poultry", label: "🐔 Poultry" },
  ];

  const units = [
    { value: "kg", label: "Kilogram (kg)" },
    { value: "t", label: "ton" },
    { value: "piece", label: "Piece" },
    { value: "bunch", label: "Bunch" },
  ];

  const categories = {
    vegetable: [
      "Tomatoes",
      "Potatoes",
      "Lettuce",
      "Carrots",
      "Onions",
      "Peppers",
      "Cucumbers",
      "Other",
    ],
    fruit: [
      "Apples",
      "Oranges",
      "Bananas",
      "Grapes",
      "Berries",
      "Melons",
      "Citrus",
      "Other",
    ],
    grain: ["Wheat", "Rice", "Corn", "Barley", "Oats", "Quinoa", "Other"],
    herb: [
      "Basil",
      "Mint",
      "Parsley",
      "Cilantro",
      "Rosemary",
      "Thyme",
      "Other",
    ],
    dairy: ["Milk", "Cheese", "Yogurt", "Butter", "Cream", "Other"],
    poultry: ["Eggs", "Chicken", "Turkey", "Duck", "Other"],
  };

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
                        Product Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="productType"
                        value={formData.productType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      >
                        {productTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
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
                        {categories[formData.productType]?.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Date</label>
                      <input
                        type="date"
                        name="harvestDate"
                        value={formData.harvestDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        Unit <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      >
                        {units.map((unit) => (
                          <option key={unit.value} value={unit.value}>
                            {unit.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Quantity <span className="text-red-500">*</span>
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

                <div className="border-t border-gray-200 pt-8 mb-8"></div>

                {/* Product Images */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-2xl mr-3">🖼️</span>
                    Product Images
                  </h2>

                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                      isDragOver
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                  >
                    <div className="text-5xl mb-3">📸</div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">Upload Product Images</div>
                    <div className="text-sm text-gray-600 mb-1">
                      Drag & drop images here or click to browse
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      Supports JPG, PNG, WEBP (Max 5MB each)
                    </div>
                    <button type="button" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300">
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
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {formData.images.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.preview}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-lg shadow-md"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                            onClick={() => handleRemoveImage(image.id)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-8 mb-8"></div>

                {/* Additional Information */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-2xl mr-3">🔍</span>
                    Additional Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Farm location"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                      <input
                        type="text"
                        name="certifications"
                        value={formData.certifications}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., Organic, ISO, etc."
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        formData.availability
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          availability: !prev.availability,
                        }))
                      }
                    >
                      <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                        formData.availability
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300 bg-white"
                      }`}>
                        {formData.availability && <span className="text-white text-sm">✓</span>}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Available for Sale</div>
                        <div className="text-sm text-gray-600">
                          {formData.availability
                            ? "Product is visible to buyers"
                            : "Product is hidden from buyers"}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        formData.organic
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          organic: !prev.organic,
                        }))
                      }
                    >
                      <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                        formData.organic
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300 bg-white"
                      }`}>
                        {formData.organic && <span className="text-white text-sm">✓</span>}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Organic Product</div>
                        <div className="text-sm text-gray-600">
                          {formData.organic
                            ? "Certified organic farming"
                            : "Conventional farming methods"}
                        </div>
                      </div>
                    </div>
                  </div>
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
