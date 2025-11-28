import React, { useState, useEffect } from 'react';
import agriVideo from '../assets/agri.mp4';

const Hero = ({ onGetStarted }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover bg-green-800"
        autoPlay
        muted
        loop
        playsInline
        
      >
        <source src={agriVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-50"></div>

      

      {/* Content */}
      <div className={`relative z-10 text-center text-white px-4 sm:px-6 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          AgroConnect
          <span className="block text-green-400 animate-pulse">DZ</span>
        </h1>

        <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Digital Market connecting producers, buyers and transporters to streamline logistics, pricing and distribution in Algeria.
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-1000 delay-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <button
            onClick={onGetStarted}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Get Started
          </button>
          <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-800 font-semibold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300 cursor-pointer">
            Learn More
          </button>
        </div>

        
       
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;