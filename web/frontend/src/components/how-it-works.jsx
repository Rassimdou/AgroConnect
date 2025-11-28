import React, { useState, useEffect } from 'react';

const HowItWorks = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      step: "01",
      title: "Create Your Account",
      description: "Sign up as a producer, buyer, or transporter. Complete your profile with necessary details and verification documents.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      )
    },
    {
      step: "02",
      title: "List or Browse Products",
      description: "Producers can list their agricultural products with photos, prices, and quantities. Buyers can browse and compare offerings.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
        </svg>
      )
    },
    {
      step: "03",
      title: "Connect & Negotiate",
      description: "Use our chat system to communicate directly with other users, negotiate prices, and agree on terms.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      )
    },
    {
      step: "04",
      title: "Arrange Transportation",
      description: "Connect with verified transporters in your area. Compare rates and schedules for efficient delivery.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
        </svg>
      )
    },
    {
      step: "05",
      title: "Secure Payment",
      description: "Complete transactions securely through our platform with multiple payment options including mobile money.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
        </svg>
      )
    },
    {
      step: "06",
      title: "Track & Deliver",
      description: "Monitor your shipments in real-time and receive delivery confirmations. Rate your experience for future improvements.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How <span className="text-green-600">AgroConnect DZ</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, efficient, and secure process to connect agricultural stakeholders across Algeria in just 6 easy steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative transform transition-all duration-1000 hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                {step.step}
              </div>

              {/* Card */}
              <div className="bg-gray-50 rounded-xl p-8 pt-12 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="text-green-600 mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-300 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-linear-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Start Your Journey Today</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join the growing community of Algerian agricultural professionals using AgroConnect DZ to transform their business operations.
            </p>
            <button
              onClick={onGetStarted}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;