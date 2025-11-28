import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TransporterSignup = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',

    // Transporter Type
    transporterType: '', // 'individual' or 'company'
    companyName: '',

    // Vehicle Info
    vehicleType: '',
    vehicleModel: '',
    vehicleYear: '',
    licensePlate: '',
    capacity: '',

    // Documents
    idCardFront: null,
    idCardBack: null,
    driversLicense: null,
    vehicleInsurance: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const vehicleTypes = [
    'Truck',
    'Van',
    'Pickup Truck',
    'Refrigerated Truck',
    'Flatbed Truck',
    'Tanker Truck',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.location.trim()) newErrors.location = 'Location is required';
    }

    if (step === 2) {
      if (!formData.transporterType) newErrors.transporterType = 'Please select transporter type';
      if (formData.transporterType === 'company' && !formData.companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
    }

    if (step === 3) {
      if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
      if (!formData.vehicleModel.trim()) newErrors.vehicleModel = 'Vehicle model is required';
      if (!formData.vehicleYear.trim()) newErrors.vehicleYear = 'Vehicle year is required';
      if (!formData.licensePlate.trim()) newErrors.licensePlate = 'License plate is required';
      if (!formData.capacity.trim()) newErrors.capacity = 'Capacity is required';
    }

    if (step === 4) {
      if (formData.transporterType === 'individual' && !formData.idCardFront) {
        newErrors.idCardFront = 'ID card front is required for individual transporters';
      }
      if (!formData.driversLicense) newErrors.driversLicense = 'Driver\'s license is required';
      if (!formData.vehicleInsurance) newErrors.vehicleInsurance = 'Vehicle insurance is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to dashboard
      if (onNavigate) {
        onNavigate('transporter-dashboard');
      }
    } catch (error) {
      setErrors({ submit: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
            step <= currentStep
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {step}
          </div>
          {step < 4 && (
            <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
              step < currentStep ? 'bg-orange-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${errors.fullName ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${errors.phone ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="+213 XX XXX XXXX"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${errors.location ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="City, Wilaya"
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 pr-10 ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 pr-10 ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Transporter Type</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  onClick={() => setFormData(prev => ({ ...prev, transporterType: 'individual' }))}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    formData.transporterType === 'individual'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      👨‍🚗
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Individual Transporter</h4>
                    <p className="text-gray-600 text-sm mb-4">Work independently, offer your services directly to clients</p>
                    <div className="text-sm text-orange-600 font-medium">Requires ID card verification</div>
                  </div>
                </div>

                <div
                  onClick={() => setFormData(prev => ({ ...prev, transporterType: 'company' }))}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    formData.transporterType === 'company'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      🏢
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Company Transporter</h4>
                    <p className="text-gray-600 text-sm mb-4">Represent a logistics company (e.g., Yalidin, or other)</p>
                    <div className="text-sm text-green-600 font-medium">Company verification required</div>
                  </div>
                </div>
              </div>

              {errors.transporterType && <p className="text-sm text-red-600 text-center">{errors.transporterType}</p>}

              {formData.transporterType === 'company' && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${errors.companyName ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Enter your company name"
                  />
                  {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Vehicle Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${errors.vehicleType ? 'border-red-300' : 'border-gray-300'}`}
                >
                  <option value="">Select vehicle type</option>
                  {vehicleTypes.map(type => (
                    <option key={type} value={type.toLowerCase().replace(' ', '')}>{type}</option>
                  ))}
                </select>
                {errors.vehicleType && <p className="mt-1 text-sm text-red-600">{errors.vehicleType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Model</label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${errors.vehicleModel ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="e.g., Mercedes-Benz Actros"
                />
                {errors.vehicleModel && <p className="mt-1 text-sm text-red-600">{errors.vehicleModel}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Year</label>
                <input
                  type="text"
                  name="vehicleYear"
                  value={formData.vehicleYear}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${errors.vehicleYear ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="e.g., 2020"
                />
                {errors.vehicleYear && <p className="mt-1 text-sm text-red-600">{errors.vehicleYear}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
                <input
                  type="text"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${errors.licensePlate ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="e.g., DZ-123-AB"
                />
                {errors.licensePlate && <p className="mt-1 text-sm text-red-600">{errors.licensePlate}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                <input
                  type="text"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${errors.capacity ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="e.g., 10 tons, 20 cubic meters"
                />
                {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Document Verification</h3>

            <div className="space-y-6">
              {formData.transporterType === 'individual' && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-4">ID Card (Required for Individual Transporters)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Front Side</label>
                      <input
                        type="file"
                        name="idCardFront"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.idCardFront && <p className="mt-1 text-sm text-red-600">{errors.idCardFront}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Back Side (Optional)</label>
                      <input
                        type="file"
                        name="idCardBack"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Driver's License</label>
                  <input
                    type="file"
                    name="driversLicense"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.driversLicense && <p className="mt-1 text-sm text-red-600">{errors.driversLicense}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Insurance</label>
                  <input
                    type="file"
                    name="vehicleInsurance"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.vehicleInsurance && <p className="mt-1 text-sm text-red-600">{errors.vehicleInsurance}</p>}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Important Notice</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    All documents will be verified before your account is activated. This process may take 1-2 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-2xl w-full space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:rotate-12 transition-transform duration-300">
            <span className="text-2xl">🚛</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Join AgroConnect as Transporter
          </h2>
          <p className="text-gray-600">
            Start your logistics journey with us
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600">
              {errors.submit}
            </div>
          )}

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                Back
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="ml-auto px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  'Complete Registration'
                )}
              </button>
            )}
          </div>
        </form>

        {/* Terms */}
        <div className="text-center text-sm text-gray-600">
          By registering, you agree to our{' '}
          <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default TransporterSignup;