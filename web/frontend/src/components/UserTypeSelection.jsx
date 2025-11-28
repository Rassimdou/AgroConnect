import React, { useState } from 'react';

const UserTypeSelection = ({ onBack, onSelectUserType }) => {
  const [selectedType, setSelectedType] = useState(null);

  const userTypes = [
    {
      id: 'farmer',
      title: 'Producer',
      subtitle: 'Agricultural Producer',
      description: 'List your products, manage inventory, and connect with buyers across Algeria.',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
        </svg>
      ),
      features: ['List Products', 'Manage Inventory', 'Real-time Pricing', 'Direct Communication'],
      color: 'green'
    },
    {
      id: 'buyer',
      title: 'Buyer',
      subtitle: 'Agricultural Buyer',
      description: 'Find quality products, compare prices, and source from verified producers.',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
      ),
      features: ['Browse Products', 'Compare Prices', 'Verified Suppliers', 'Bulk Ordering'],
      color: 'blue'
    },
    {
      id: 'transporter',
      title: 'Transporter',
      subtitle: 'Logistics Provider',
      description: 'Offer transportation services and connect with shippers across all wilayas.',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
        </svg>
      ),
      features: ['Route Optimization', 'Real-time Tracking', 'Capacity Management', 'Multi-wilaya Coverage'],
      color: 'purple'
    }
  ];

  const handleSelect = (typeId) => {
    setSelectedType(typeId);
    // Navigate to the selected user type dashboard
    if (onSelectUserType) {
      onSelectUserType(typeId);
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        hover: 'hover:border-green-400 hover:bg-green-100',
        icon: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        hover: 'hover:border-blue-400 hover:bg-blue-100',
        icon: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        hover: 'hover:border-purple-400 hover:bg-purple-100',
        icon: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    };
    return colors[color];
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={onBack}
            className="mb-8 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Home
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join <span className="text-green-600">AgroConnect DZ</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your role in Algeria's digital agricultural marketplace and start transforming your business today.
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {userTypes.map((type, index) => {
            const colors = getColorClasses(type.color);
            const isSelected = selectedType === type.id;

            return (
              <div
                key={type.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 ${colors.border} ${colors.bg} ${colors.hover} transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isSelected ? 'ring-4 ring-opacity-50 ring-green-400 scale-105' : ''
                }`}
                onClick={() => handleSelect(type.id)}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}

                <div className="p-8 text-center">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${colors.icon} bg-white shadow-lg mb-6`}>
                    {type.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-lg text-gray-600 mb-4">{type.subtitle}</p>

                  {/* Description */}
                  <p className="text-gray-700 mb-6 leading-relaxed">{type.description}</p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {type.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${colors.button} cursor-pointer`}
                  >
                    {isSelected ? 'Continue as ' + type.title : 'Select ' + type.title}
                  </button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose AgroConnect DZ?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Verified & Secure</h4>
                <p className="text-gray-600 text-sm">All users are verified with secure payment processing</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Fast & Efficient</h4>
                <p className="text-gray-600 text-sm">Streamlined processes save time and reduce costs</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"></path>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Nationwide Coverage</h4>
                <p className="text-gray-600 text-sm">Connect across all 48 Algerian wilayas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTypeSelection;