import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';

// Dummy data for deliveries
const deliveries = [
  {
    id: 1,
    from: "Algiers",
    to: "Oran",
    status: "In Transit",
    value: 1200,
    cargo: "Fresh Vegetables",
    weight: "500kg",
    pickupTime: "2024-11-28 14:00",
    deliveryTime: "2024-11-28 20:00",
    client: "Green Farms Co.",
    clientPhone: "+213 555 123 456",
    currentLocation: "Chlef",
    estimatedArrival: "18:30"
  },
  {
    id: 2,
    from: "Constantine",
    to: "Annaba",
    status: "Delivered",
    value: 800,
    cargo: "Agricultural Equipment",
    weight: "200kg",
    pickupTime: "2024-11-27 09:00",
    deliveryTime: "2024-11-27 15:00",
    client: "AgriTech Solutions",
    clientPhone: "+213 555 234 567",
    currentLocation: "Annaba",
    estimatedArrival: "Delivered"
  },
  {
    id: 3,
    from: "Tlemcen",
    to: "Sidi Bel Abbès",
    status: "Picked Up",
    value: 950,
    cargo: "Organic Fertilizers",
    weight: "1000kg",
    pickupTime: "2024-11-28 08:00",
    deliveryTime: "2024-11-28 12:00",
    client: "EcoFarm Supplies",
    clientPhone: "+213 555 345 678",
    currentLocation: "Tlemcen",
    estimatedArrival: "10:45"
  },
  {
    id: 4,
    from: "Alger",
    to: "Blida",
    status: "Delivered",
    value: 600,
    cargo: "Fresh Fruits",
    weight: "300kg",
    pickupTime: "2024-11-27 16:00",
    deliveryTime: "2024-11-27 18:00",
    client: "Fruit Valley",
    clientPhone: "+213 555 456 789",
    currentLocation: "Blida",
    estimatedArrival: "Delivered"
  }
];

const MyDeliveries = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const [transporterProfile, setTransporterProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    // Get transporter profile from localStorage
    const stored = localStorage.getItem('transporterProfile');
    if (stored) {
      setTransporterProfile(JSON.parse(stored));
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100 border-green-200';
      case 'In Transit': return 'text-green-600 bg-green-100 border-green-200';
      case 'Picked Up': return 'text-green-600 bg-green-100 border-green-200';
      case 'Pending': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const filteredDeliveries = filter === 'all' ? deliveries : deliveries.filter(delivery => delivery.status.toLowerCase().replace(' ', '') === filter);

  const handleUpdateStatus = (deliveryId, newStatus) => {
    // In a real app, this would make an API call
    alert(`Status updated for delivery ${deliveryId} to ${newStatus}`);
  };

  const handleContactClient = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <>
      <Header isTransporterMode={true} />
      <div className="pt-20 min-h-screen bg-gray-50">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Transporter Profile Card */}
        {transporterProfile && (
          <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Transporter Name</h3>
                  <p className="text-2xl font-bold text-gray-900">{transporterProfile.name}</p>
                  <p className="text-gray-600 mt-1">{transporterProfile.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Vehicle Information</h3>
                  <p className="text-lg font-semibold text-gray-900">{transporterProfile.vehicleType}</p>
                  <p className="text-sm text-gray-600">{transporterProfile.vehicleModel} ({transporterProfile.vehicleYear})</p>
                  <p className="text-sm text-gray-600">Plate: {transporterProfile.licensePlate} • Capacity: {transporterProfile.capacity}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{transporterProfile.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="font-semibold text-gray-900">{transporterProfile.location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Type</p>
                  <p className="font-semibold text-gray-900 capitalize">{transporterProfile.transporterType}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Deliveries</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track and manage all your active and completed delivery jobs
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className={`mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              All Deliveries ({deliveries.length})
            </button>
            <button
              onClick={() => setFilter('intransit')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'intransit'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              In Transit ({deliveries.filter(d => d.status === 'In Transit').length})
            </button>
            <button
              onClick={() => setFilter('pickedup')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'pickedup'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Picked Up ({deliveries.filter(d => d.status === 'Picked Up').length})
            </button>
            <button
              onClick={() => setFilter('delivered')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'delivered'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Delivered ({deliveries.filter(d => d.status === 'Delivered').length})
            </button>
          </div>
        </div>

        {/* Deliveries List */}
        <div className={`space-y-6 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {filteredDeliveries.map((delivery, index) => (
            <div
              key={delivery.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden"
              style={{animationDelay: `${500 + index * 100}ms`}}
            >
              {/* Delivery Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                      🚛
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{delivery.from} → {delivery.to}</h3>
                      <p className="text-sm text-gray-600">{delivery.cargo} • {delivery.weight}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(delivery.status)}`}>
                      {delivery.status}
                    </span>
                    <p className="text-2xl font-bold text-green-600 mt-2">{delivery.value} DZD</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Client:</span>
                    <p className="font-medium text-gray-900">{delivery.client}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Pickup:</span>
                    <p className="font-medium text-gray-900">{delivery.pickupTime}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Delivery:</span>
                    <p className="font-medium text-gray-900">{delivery.deliveryTime}</p>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Current Location</h4>
                    <p className="text-gray-700">{delivery.currentLocation}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Estimated Arrival</h4>
                    <p className="text-gray-700">{delivery.estimatedArrival}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {delivery.status === 'Picked Up' && (
                    <button
                      onClick={() => handleUpdateStatus(delivery.id, 'In Transit')}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      Mark as In Transit
                    </button>
                  )}
                  {delivery.status === 'In Transit' && (
                    <button
                      onClick={() => handleUpdateStatus(delivery.id, 'Delivered')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      Mark as Delivered
                    </button>
                  )}
                  <button
                    onClick={() => handleContactClient(delivery.clientPhone)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    📞 Contact Client
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md">
                    📍 Track Location
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDeliveries.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No deliveries found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later.</p>
          </div>
        )}

      </div>
      </div>
      <Footer />
    </>
  );
};

export default MyDeliveries;