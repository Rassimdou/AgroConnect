import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';
import { farmerAPI } from '../../services/api';

// Default farmer profile data (used until API responds)
const defaultFarmerProfile = {
  personalInfo: {
    firstName: 'Loading...',
    lastName: '',
    email: 'loading@email.com',
    phone: '+213 000 000 000',
    address: 'Loading address...',
    joinDate: '',
    avatar: '🌾'
  },
  farmInfo: {
    farmName: 'Loading farm...',
    farmType: 'Loading...',
    established: '',
    totalArea: '',
    specialty: 'Loading...',
    certification: 'Loading...',
    location: 'Loading...',
    crops: []
  },
  businessStats: {
    totalSales: 0,
    customerRating: 0,
    responseRate: 0,
    completedOrders: 0
  },
  verification: {
    email: false,
    phone: false,
    identity: false,
    farm: 'pending'
  },
  documents: [],
  settings: {
    emailNotifications: true,
    smsNotifications: false,
    orderAlerts: true,
    priceUpdates: true,
    newsletter: false
  }
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState(defaultFarmerProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await farmerAPI.getProfile();

        // Split fullname into first and last name
        const nameParts = res.data.producer.fullname.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        setUser(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            firstName,
            lastName,
            email: res.data.producer.email ?? prev.personalInfo.email,
            phone: res.data.producer.phone_number ?? prev.personalInfo.phone,
            address: `${res.data.producer.location || 'Unknown location'}, Algeria`,
            joinDate: res.data.producer.joined_at ? new Date(res.data.producer.joined_at).toLocaleDateString() : '',
          },
          farmInfo: {
            ...prev.farmInfo,
            farmName: `${res.data.producer.fullname}'s Farm`,
            farmType: res.data.producer.domain || 'General Farming',
            location: res.data.producer.location || 'Unknown location',
            crops: res.data.producer.domain ? [res.data.producer.domain] : ['Various crops']
          },
          verification: {
            ...prev.verification,
            email: res.data.producer.verified_status === 'verified',
            phone: res.data.producer.verified_status === 'verified',
          }
        }));
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setProfileError(error.response?.data?.error || 'Unable to load profile details.');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'farm', label: 'Farm Details', icon: '🏠' },
    { id: 'security', label: 'Security', icon: '🔒' }
  ];


  return (
    <>
      <Header isFarmerMode={true} />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl text-gray-600 font-bold">
                {user.personalInfo.avatar}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user.personalInfo.firstName} {user.personalInfo.lastName}</h2>
                <p className="text-gray-600">{user.personalInfo.email}</p>
                <p className="text-sm text-gray-500">Farmer Account</p>
              </div>
            </div>
          </div>

          {profileError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {profileError}
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-8 py-6 text-base font-semibold border-b-4 transition-all duration-300 cursor-pointer flex-1 justify-center ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600 bg-green-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3 text-2xl">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-8">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Personal Information</h3>
                      <p className="text-gray-600">Manage your account details and preferences</p>
                    </div>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                        isEditing
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={user.personalInfo.firstName}
                          onChange={(e) => setUser({...user, personalInfo: {...user.personalInfo, firstName: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          disabled={loadingProfile}
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{loadingProfile ? 'Loading...' : user.personalInfo.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={user.personalInfo.lastName}
                          onChange={(e) => setUser({...user, personalInfo: {...user.personalInfo, lastName: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          disabled={loadingProfile}
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{loadingProfile ? 'Loading...' : user.personalInfo.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={user.personalInfo.email}
                          onChange={(e) => setUser({...user, personalInfo: {...user.personalInfo, email: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          disabled={loadingProfile}
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{loadingProfile ? 'Loading...' : user.personalInfo.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={user.personalInfo.phone}
                          onChange={(e) => setUser({...user, personalInfo: {...user.personalInfo, phone: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          disabled={loadingProfile}
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{loadingProfile ? 'Loading...' : user.personalInfo.phone}</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => { alert('Profile updated successfully!'); setIsEditing(false); }}
                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Farm Details Tab */}
              {activeTab === 'farm' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Farm Details</h3>
                    <p className="text-gray-600">Information about your farming operation</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Farm Name
                      </label>
                      <p className="text-gray-900 py-2">{loadingProfile ? 'Loading...' : user.farmInfo.farmName}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Farm Type
                      </label>
                      <p className="text-gray-900 py-2">{loadingProfile ? 'Loading...' : user.farmInfo.farmType}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Area
                      </label>
                      <p className="text-gray-900 py-2">{user.farmInfo.totalArea}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialty
                      </label>
                      <p className="text-gray-900 py-2">{loadingProfile ? 'Loading...' : user.farmInfo.specialty}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Crops
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {loadingProfile ? (
                        <span className="text-gray-500">Loading crops...</span>
                      ) : (
                        user.farmInfo.crops.map((crop, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 font-medium">
                            {crop}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Account Security</h3>
                    <p className="text-gray-600">Keep your account safe and secure</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Password</h4>
                        <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                      </div>
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="text-sm text-green-600 hover:text-green-700 font-medium cursor-pointer"
                      >
                        Change Password
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <button className="text-sm text-green-600 hover:text-green-700 font-medium cursor-pointer">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => { alert('Password change functionality would be implemented here'); setShowPasswordModal(false); }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;