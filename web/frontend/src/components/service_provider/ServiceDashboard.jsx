import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Header from '../header';
import Footer from '../footer';

const ServiceDashboard = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    // Sample data - replace with actual API calls
    const dashboardData = {
        quickStats: {
            activeBookings: 12,
            completedJobs: 156,
            monthlyRevenue: 45000,
            customerRating: 4.7
        },
        recentBookings: [
            {
                id: 1,
                client: 'Farm El-Baraka',
                service: 'Equipment Repair',
                date: '2 hours ago',
                status: 'pending',
                icon: '🔧'
            },
            {
                id: 2,
                client: 'Dairy Farm Setif',
                service: 'Veterinary Care',
                date: '5 hours ago',
                status: 'confirmed',
                icon: '🏥'
            },
            {
                id: 3,
                client: 'Olive Farm Bejaia',
                service: 'Consulting',
                date: '1 day ago',
                status: 'completed',
                icon: '💼'
            }
        ],
        upcomingServices: [
            {
                id: 1,
                time: 'Today, 2:00 PM',
                client: 'Farm El-Baraka',
                service: 'Equipment Repair',
                location: 'Blida'
            },
            {
                id: 2,
                time: 'Tomorrow, 10:00 AM',
                client: 'Green Valley Farm',
                service: 'Veterinary Visit',
                location: 'Algiers'
            }
        ]
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            // Force navigate even if API fails
            navigate('/');
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="mt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
            {/* Header */}
            <Header />
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-bold mb-2">Welcome to Your Service Hub</h2>
                                <p className="text-blue-100 text-lg">Manage your bookings, track earnings, and grow your business</p>
                            </div>
                            <div className="mt-6 lg:mt-0">
                                <button
                                    onClick={() => handleNavigate('/service-provider-bookings')}
                                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    View All Bookings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {/* Active Bookings */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group cursor-pointer transform hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-2xl">📋</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Active Bookings</h3>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{dashboardData.quickStats.activeBookings}</p>
                            <p className="text-blue-600 font-semibold text-sm">Currently in progress</p>
                        </div>
                    </div>

                    {/* Completed Jobs */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 group cursor-pointer transform hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-2xl">✅</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Completed Jobs</h3>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{dashboardData.quickStats.completedJobs}</p>
                            <p className="text-green-600 font-semibold text-sm">Total services delivered</p>
                        </div>
                    </div>

                    {/* Monthly Revenue */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-yellow-200 group cursor-pointer transform hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Monthly Revenue</h3>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{dashboardData.quickStats.monthlyRevenue.toLocaleString()} <span className="text-sm font-normal text-gray-500">DA</span></p>
                            <p className="text-yellow-600 font-semibold text-sm">↑ 15% from last month</p>
                        </div>
                    </div>

                    {/* Customer Rating */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 group cursor-pointer transform hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-2xl">⭐</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Customer Rating</h3>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{dashboardData.quickStats.customerRating}/5</p>
                            <p className="text-purple-600 font-semibold text-sm">Based on recent reviews</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Bookings */}
                    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">📋 Recent Bookings</h2>
                                <p className="text-gray-600">Latest service requests</p>
                            </div>
                            <button
                                onClick={() => handleNavigate('/service-provider-bookings')}
                                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center group"
                            >
                                View all
                                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {dashboardData.recentBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300 group border border-gray-100 hover:border-blue-200 hover:shadow-md"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-200 rounded-2xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {booking.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{booking.client}</h3>
                                        <p className="text-sm text-gray-600">{booking.service} • {booking.date}</p>
                                    </div>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Services */}
                    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">🗓️ Upcoming Services</h2>
                                <p className="text-gray-600">Your scheduled appointments</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {dashboardData.upcomingServices.map((service) => (
                                <div
                                    key={service.id}
                                    className="p-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-semibold text-blue-600">{service.time}</span>
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{service.location}</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-1">{service.client}</h3>
                                    <p className="text-sm text-gray-600">{service.service}</p>
                                </div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleNavigate('/service-provider-services')}
                                className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border border-green-200 hover:border-green-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-xl mb-2 shadow-lg">
                                    ⚙️
                                </div>
                                <span className="font-semibold text-gray-900 text-sm text-center">Manage Services</span>
                            </button>

                            <button
                                onClick={() => handleNavigate('/service-provider-calendar')}
                                className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border border-orange-200 hover:border-orange-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-xl mb-2 shadow-lg">
                                    📅
                                </div>
                                <span className="font-semibold text-gray-900 text-sm text-center">View Calendar</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tips Section */}
                <div className={`mt-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-white transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <span className="text-4xl">💡</span>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-bold mb-2">Pro Tip</h3>
                            <p className="text-indigo-100">Keep your profile updated and respond quickly to booking requests to increase your visibility and customer satisfaction!</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ServiceDashboard;
