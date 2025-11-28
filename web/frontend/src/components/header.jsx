import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isBuyerMode = false, isFarmerMode = false, isTransporterMode = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-white via-gray-50 to-white text-gray-700 shadow-2xl overflow-hidden" style={{backgroundSize: '200% 200%', animation: 'flow 6s ease-in-out infinite'}}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-green-50 to-blue-50 opacity-20 animate-pulse"></div>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center relative z-10">
        {/* Logo */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
            <span className="text-lg sm:text-2xl">🌱</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight transform hover:scale-105 hover:text-green-600 transition-all duration-300 cursor-pointer">
            AgroConnect <span className="text-green-600">DZ</span>
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6 lg:space-x-10">
          {isBuyerMode ? (
            // Buyer Navigation
            <>
              <button onClick={() => handleNavigation('/dashboard')} className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                </svg>
                <span>Dashboard</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => handleNavigation('/marketplace')} className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span>Marketplace</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => handleNavigation('/cart')} className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13l1.1-5m8.9 5L17 8m-8.9 5h8.9m-8.9 0L5.4 5"></path>
                </svg>
                <span>Cart</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => handleNavigation('/orders')} className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>Orders</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => handleNavigation('/profile')} className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span>Profile</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            </>
          ) : isFarmerMode ? (
            // Farmer Navigation
            <>
              <button onClick={() => handleNavigation('/farmer-dashboard')} className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                </svg>
                <span>Dashboard</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => handleNavigation('/farmer-marketplace')} className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span>Marketplace</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => handleNavigation('/farmer-my-products')} className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <span>My Products</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => handleNavigation('/farmer-orders')} className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>Orders</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => handleNavigation('/farmer-profile')} className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span>Profile</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            </>
          ) : isTransporterMode ? (
            // Transporter Navigation
            <>
              <button onClick={() => handleNavigation('/transporter-dashboard')} className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                </svg>
                <span>signe out</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => handleNavigation('/transporter-available-jobs')} className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span>Available Jobs</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => handleNavigation('/transporter-my-deliveries')} className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                </svg>
                <span>My Deliveries</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => handleNavigation('/transporter-profile')} className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span>Profile</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            </>
          ) : (
            // Landing Page Navigation
            <>
              <a href="#home" className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span>Home</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#features" className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
                <span>Features</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#how-it-works" className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>How It Works</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#about" className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>About</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#contact" className="flex items-center space-x-1 relative group hover:text-green-600 transition-all duration-300 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>Contact</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 focus:outline-none transform hover:scale-110 hover:text-green-600 transition-all duration-200 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                className="transition-all duration-300"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-linear-to-b from-gray-50 to-white overflow-hidden transition-all duration-700 ease-in-out border-t border-gray-200 ${
          isMenuOpen ? 'max-h-96 opacity-100 shadow-inner' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 sm:px-6 py-4 space-y-2">
          {isBuyerMode ? (
            // Buyer Mobile Navigation
            <>
              <button onClick={() => { handleNavigation('/dashboard'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                </svg>
                <span>Dashboard</span>
              </button>
              <button onClick={() => { handleNavigation('/marketplace'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span>Marketplace</span>
              </button>
              <button onClick={() => { handleNavigation('/cart'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13l1.1-5m8.9 5L17 8m-8.9 5h8.9m-8.9 0L5.4 5"></path>
                </svg>
                <span>Cart</span>
              </button>
              <button onClick={() => { handleNavigation('/orders'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>Orders</span>
              </button>
              <button onClick={() => { handleNavigation('/profile'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span>Profile</span>
              </button>
              <button onClick={() => { handleNavigation('/'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-red-600 hover:translate-x-3 hover:bg-red-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left border-t border-gray-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span>Sign Out</span>
              </button>
            </>
          ) : isFarmerMode ? (
            // Farmer Mobile Navigation
            <>
              <button onClick={() => { handleNavigation('/farmer-dashboard'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                </svg>
                <span>Dashboard</span>
              </button>
              <button onClick={() => { handleNavigation('/farmer-marketplace'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span>Marketplace</span>
              </button>
              <button onClick={() => { handleNavigation('/farmer-my-products'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <span>My Products</span>
              </button>
              <button onClick={() => { handleNavigation('/farmer-orders'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>Orders</span>
              </button>
              <button onClick={() => { handleNavigation('/farmer-profile'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span>Profile</span>
              </button>
              <button onClick={() => { handleNavigation('/'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-red-600 hover:translate-x-3 hover:bg-red-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left border-t border-gray-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span>Sign Out</span>
              </button>
            </>
          ) : isTransporterMode ? (
            // Transporter Mobile Navigation
            <>
              <button onClick={() => { handleNavigation('/transporter-dashboard'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-orange-600 hover:translate-x-3 hover:bg-orange-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                </svg>
                <span>Dashboard</span>
              </button>
              <button onClick={() => { handleNavigation('/transporter-available-jobs'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-orange-600 hover:translate-x-3 hover:bg-orange-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span>Available Jobs</span>
              </button>
              <button onClick={() => { handleNavigation('/transporter-my-deliveries'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-orange-600 hover:translate-x-3 hover:bg-orange-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                </svg>
                <span>My Deliveries</span>
              </button>
              <button onClick={() => { handleNavigation('/transporter-profile'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-orange-600 hover:translate-x-3 hover:bg-orange-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span>Profile</span>
              </button>
              <button onClick={() => { handleNavigation('/'); setIsMenuOpen(false); }} className="flex items-center space-x-3 py-4 hover:text-red-600 hover:translate-x-3 hover:bg-red-50 rounded-lg px-3 transition-all duration-300 font-medium w-full text-left border-t border-gray-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            // Landing Page Mobile Navigation
            <>
              <a href="#home" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span>Home</span>
              </a>
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
                <span>Features</span>
              </a>
              <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>How It Works</span>
              </a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>About</span>
              </a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 py-4 hover:text-green-600 hover:translate-x-3 hover:bg-green-50 rounded-lg px-3 transition-all duration-300 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>Contact</span>
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;