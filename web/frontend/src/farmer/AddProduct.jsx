import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "./AddProduct.css";

const AddProduct = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
    { value: "g", label: "Gram (g)" },
    { value: "lb", label: "Pound (lb)" },
    { value: "piece", label: "Piece" },
    { value: "bunch", label: "Bunch" },
    { value: "crate", label: "Crate" },
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
      <Header isFarmerMode={true} onNavigate={onNavigate} />
      <div className="add-product-page">
        {/* Header */}
        <div className="add-product-header">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="add-product-title">🌱 Add New Product</h1>
                <p className="add-product-subtitle">
                  List your farm products and reach more customers
                </p>
              </div>
              <button
                onClick={() => onNavigate("my-products")}
                className="mt-4 lg:mt-0 bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                View My Products
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="product-form-container">
            {/* Success Message */}
            {showSuccess && (
              <div className="success-message animate-entrance visible">
                <span>✅</span>
                <span>Product added successfully! Redirecting...</span>
              </div>
            )}

            <div
              className={`product-form-card animate-entrance ${
                isVisible ? "visible" : ""
              }`}
            >
              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div className="form-section">
                  <h2 className="section-title">
                    <span>📝</span>
                    Basic Information
                  </h2>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">
                        Product Name <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g., Organic Tomatoes"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Product Type <span className="required-star">*</span>
                      </label>
                      <select
                        name="productType"
                        value={formData.productType}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        {productTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Category <span className="required-star">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="form-select"
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

                    <div className="form-group">
                      <label className="form-label">Harvest Date</label>
                      <input
                        type="date"
                        name="harvestDate"
                        value={formData.harvestDate}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">
                      Product Description{" "}
                      <span className="required-star">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Describe your product... (quality, freshness, farming methods, etc.)"
                      rows="4"
                      required
                    />
                  </div>
                </div>

                <div className="section-divider"></div>

                {/* Pricing & Quantity */}
                <div className="form-section">
                  <h2 className="section-title">
                    <span>💰</span>
                    Pricing & Quantity
                  </h2>

                  <div className="pricing-grid">
                    <div className="form-group">
                      <label className="form-label">
                        Price <span className="required-star">*</span>
                      </label>
                      <div className="price-input-container">
                        <span className="currency-symbol">DA</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="form-input currency-input"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Unit <span className="required-star">*</span>
                      </label>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        className="form-select unit-select"
                        required
                      >
                        {units.map((unit) => (
                          <option key={unit.value} value={unit.value}>
                            {unit.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Available Quantity{" "}
                        <span className="required-star">*</span>
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g., 100"
                        min="1"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Minimum Order</label>
                      <input
                        type="number"
                        name="minOrder"
                        value={formData.minOrder}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g., 1"
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                <div className="section-divider"></div>

                {/* Product Images */}
                <div className="form-section">
                  <h2 className="section-title">
                    <span>🖼️</span>
                    Product Images
                  </h2>

                  <div
                    className={`upload-area ${isDragOver ? "drag-over" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                  >
                    <div className="upload-icon">📸</div>
                    <div className="upload-text">Upload Product Images</div>
                    <div className="upload-subtext">
                      Drag & drop images here or click to browse
                    </div>
                    <div className="upload-subtext">
                      Supports JPG, PNG, WEBP (Max 5MB each)
                    </div>
                    <button type="button" className="upload-button">
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
                    <div className="preview-grid">
                      {formData.images.map((image) => (
                        <div key={image.id} className="preview-item">
                          <img
                            src={image.preview}
                            alt="Preview"
                            className="preview-image"
                          />
                          <button
                            type="button"
                            className="remove-image"
                            onClick={() => handleRemoveImage(image.id)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="section-divider"></div>

                {/* Additional Information */}
                <div className="form-section">
                  <h2 className="section-title">
                    <span>🔍</span>
                    Additional Information
                  </h2>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Farm location"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Certifications</label>
                      <input
                        type="text"
                        name="certifications"
                        value={formData.certifications}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g., Organic, ISO, etc."
                      />
                    </div>
                  </div>

                  <div className="form-grid full-width">
                    <div
                      className={`availability-toggle ${
                        formData.availability ? "active" : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          availability: !prev.availability,
                        }))
                      }
                    >
                      <div className="toggle-switch"></div>
                      <div>
                        <div className="toggle-label">Available for Sale</div>
                        <div className="toggle-status">
                          {formData.availability
                            ? "Product is visible to buyers"
                            : "Product is hidden from buyers"}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`availability-toggle ${
                        formData.organic ? "active" : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          organic: !prev.organic,
                        }))
                      }
                    >
                      <div className="toggle-switch"></div>
                      <div>
                        <div className="toggle-label">Organic Product</div>
                        <div className="toggle-status">
                          {formData.organic
                            ? "Certified organic farming"
                            : "Conventional farming methods"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => onNavigate("farmer-dashboard")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="loading-spinner"></div>
                        Adding Product...
                      </>
                    ) : (
                      <>
                        <span>✅</span>
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
