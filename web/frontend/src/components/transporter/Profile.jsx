import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';

// Dummy transporter profile data
const transporterProfile = {
  fullName: "Karim Bennani",
  email: "karim.bennani@email.com",
  phone: "+213 555 123 456",
  location: "Algiers, Algeria",
  transporterType: "individual", // "individual" or "company"
  companyName: null, // null for individual
  idCardUploaded: true,
  idCardUrl: "/images/id-card-front.jpg", // dummy URL
  vehicle: {
    type: "Truck",
    model: "Mercedes-Benz Actros",
    year: "2020",
    licensePlate: "DZ-123-AB",
    capacity: "10 tons",
    features: ["Refrigerated", "GPS Tracking", "Insurance Coverage"]
  },
  stats: {
    totalDeliveries: 247,
    rating: 4.8,
    earnings: 125000,
    onTimeDelivery: 96
  },
  documents: [
    { name: "Driver's License", status: "Verified", expiry: "2025-12-31" },
    { name: "Vehicle Insurance", status: "Verified", expiry: "2025-06-15" },
    { name: "Transport License", status: "Verified", expiry: "2025-08-20" },
    { name: "ID Card", status: "Verified", expiry: "N/A" }
  ]
};

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(transporterProfile);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      vehicle: {
        ...prev.vehicle,
        [name]: value
      }
    }));
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleUploadIdCard = () => {
    // In a real app, this would open a file picker
    alert('ID card upload functionality would be implemented here');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Expired': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <Header isTransporterMode={true} />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/20">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Transporter Profile</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage your profile, vehicle information, and documents
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className={`lg:col-span-1 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg">
                  👨‍🚗
                </div>
                <h2 className="text-xl font-bold text-gray-900">{transporterProfile.fullName}</h2>
                <p className="text-gray-600">{transporterProfile.transporterType === 'company' ? 'Company Transporter' : 'Individual Transporter'}</p>
                {transporterProfile.companyName && (
                  <p className="text-sm text-orange-600 font-medium">{transporterProfile.companyName}</p>
                )}
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <p className="text-2xl font-bold text-green-600">{transporterProfile.stats.totalDeliveries}</p>
                  <p className="text-sm text-gray-600">Total Deliveries</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">{transporterProfile.stats.rating} ⭐</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <p className="text-2xl font-bold text-purple-600">{transporterProfile.stats.earnings.toLocaleString()} DZD</p>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                  <p className="text-2xl font-bold text-orange-600">{transporterProfile.stats.onTimeDelivery}%</p>
                  <p className="text-sm text-gray-600">On-Time Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={`lg:col-span-2 space-y-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isEditing
                      ? 'bg-gray-600 hover:bg-gray-700 text-white'
                      : 'bg-orange-600 hover:bg-orange-700 text-white'
                  }`}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{transporterProfile.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{transporterProfile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{transporterProfile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{transporterProfile.location}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="mt-6">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Vehicle Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Vehicle Information</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isEditing
                      ? 'bg-gray-600 hover:bg-gray-700 text-white'
                      : 'bg-orange-600 hover:bg-orange-700 text-white'
                  }`}
                >
                  {isEditing ? 'Cancel' : 'Edit Vehicle'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="type"
                      value={formData.vehicle.type}
                      onChange={handleVehicleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{transporterProfile.vehicle.type}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="model"
                      value={formData.vehicle.model}
                      onChange={handleVehicleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{transporterProfile.vehicle.model}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="year"
                      value={formData.vehicle.year}
                      onChange={handleVehicleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{transporterProfile.vehicle.year}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="licensePlate"
                      value={formData.vehicle.licensePlate}
                      onChange={handleVehicleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{transporterProfile.vehicle.licensePlate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="capacity"
                      value={formData.vehicle.capacity}
                      onChange={handleVehicleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{transporterProfile.vehicle.capacity}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                  <div className="flex flex-wrap gap-2">
                    {transporterProfile.vehicle.features.map((feature, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Documents & Verification */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Documents & Verification</h3>

              {/* ID Card for Individual Transporters */}
              {transporterProfile.transporterType === 'individual' && (
                <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">ID Card Verification</h4>
                      <p className="text-sm text-gray-600">Required for individual transporters</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {transporterProfile.idCardUploaded ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                          ✓ Uploaded
                        </span>
                      ) : (
                        <button
                          onClick={handleUploadIdCard}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                        >
                          Upload ID Card
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Documents List */}
              <div className="space-y-4">
                {transporterProfile.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-600">Expires: {doc.expiry}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;