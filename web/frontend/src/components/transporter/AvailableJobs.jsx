import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';

// Dummy data for available jobs
const availableJobs = [
  {
    id: 1,
    from: "Algiers",
    to: "Oran",
    distance: "450km",
    value: 1200,
    urgency: "High",
    cargo: "Fresh Vegetables",
    weight: "500kg",
    pickupTime: "2024-11-28 14:00",
    deliveryTime: "2024-11-28 20:00",
    client: "Green Farms Co.",
    requirements: ["Refrigerated transport", "Fast delivery"]
  },
  {
    id: 2,
    from: "Constantine",
    to: "Annaba",
    distance: "320km",
    value: 800,
    urgency: "Medium",
    cargo: "Agricultural Equipment",
    weight: "200kg",
    pickupTime: "2024-11-29 09:00",
    deliveryTime: "2024-11-29 15:00",
    client: "AgriTech Solutions",
    requirements: ["Careful handling", "On-time delivery"]
  },
  {
    id: 3,
    from: "Tlemcen",
    to: "Sidi Bel Abbès",
    distance: "280km",
    value: 950,
    urgency: "Low",
    cargo: "Organic Fertilizers",
    weight: "1000kg",
    pickupTime: "2024-11-30 08:00",
    deliveryTime: "2024-11-30 12:00",
    client: "EcoFarm Supplies",
    requirements: ["Weather protection", "Proper documentation"]
  },
  {
    id: 4,
    from: "Alger",
    to: "Blida",
    distance: "50km",
    value: 600,
    urgency: "High",
    cargo: "Fresh Fruits",
    weight: "300kg",
    pickupTime: "2024-11-28 16:00",
    deliveryTime: "2024-11-28 18:00",
    client: "Fruit Valley",
    requirements: ["Temperature controlled", "Express delivery"]
  },
  {
    id: 5,
    from: "Oran",
    to: "Mostaganem",
    distance: "180km",
    value: 450,
    urgency: "Medium",
    cargo: "Seeds & Pesticides",
    weight: "150kg",
    pickupTime: "2024-11-29 10:00",
    deliveryTime: "2024-11-29 14:00",
    client: "AgriSeeds Ltd",
    requirements: ["Hazardous materials certified", "Proper labeling"]
  },
  {
    id: 6,
    from: "Setif",
    to: "Bordj Bou Arréridj",
    distance: "220km",
    value: 750,
    urgency: "Low",
    cargo: "Livestock Feed",
    weight: "800kg",
    pickupTime: "2024-11-30 07:00",
    deliveryTime: "2024-11-30 11:00",
    client: "Farm Feed Corp",
    requirements: ["Bulk transport", "Animal-safe packaging"]
  }
];

const AvailableJobs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'text-red-600 bg-red-100 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const filteredJobs = filter === 'all' ? availableJobs : availableJobs.filter(job => job.urgency.toLowerCase() === filter);

  const handleAcceptJob = (jobId) => {
    // In a real app, this would make an API call
    alert(`Job ${jobId} accepted! You will be redirected to your deliveries.`);
    navigate('/transporter-my-deliveries');
  };

  return (
    <>
      <Header isTransporterMode={true} />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/20">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Delivery Jobs</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse and accept delivery jobs that match your route and capacity
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
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
              }`}
            >
              All Jobs ({availableJobs.length})
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'high'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-red-50 border border-gray-200'
              }`}
            >
              High Priority ({availableJobs.filter(j => j.urgency === 'High').length})
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'medium'
                  ? 'bg-yellow-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-200'
              }`}
            >
              Medium Priority ({availableJobs.filter(j => j.urgency === 'Medium').length})
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === 'low'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
              }`}
            >
              Low Priority ({availableJobs.filter(j => j.urgency === 'Low').length})
            </button>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {filteredJobs.map((job, index) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 transform hover:scale-105 overflow-hidden"
              style={{animationDelay: `${500 + index * 100}ms`}}
            >
              {/* Job Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-200 rounded-xl flex items-center justify-center">
                      📦
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{job.from} → {job.to}</h3>
                      <p className="text-sm text-gray-600">{job.distance}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getUrgencyColor(job.urgency)}`}>
                    {job.urgency}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{job.value} DZD</p>
                    <p className="text-sm text-gray-500">{job.weight}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{job.client}</p>
                    <p className="text-xs text-gray-500">{job.cargo}</p>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pickup:</span>
                    <span className="font-medium">{job.pickupTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="font-medium">{job.deliveryTime}</span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleAcceptJob(job.id)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Accept Job
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later for new opportunities.</p>
          </div>
        )}

      </div>
      </div>
      <Footer />
    </>
  );
};

export default AvailableJobs;