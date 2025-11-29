import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../header';
import Footer from '../footer';
import api from '../../services/api';

// Default user data (used until profile API responds)
const defaultUser = {
  id: null,
  name: "Loading...",
  email: "loading@email.com",
  phone: "+213 000 000 000",
  role: "user",
  verified: false,
  addresses: [
    {
      id: 1,
      type: "Home",
      street: "123 Olive Street",
      city: "Algiers",
      wilaya: "Algiers",
      postalCode: "16000",
      isDefault: true
    },
    {
      id: 2,
      type: "Farm",
      street: "456 Agricultural Road",
      city: "Blida",
      wilaya: "Blida",
      postalCode: "09000",
      isDefault: false
    }
  ]
};

const Profile = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState(defaultUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/profile/user');

        setUser((prev) => ({
          ...prev,
          id: res.data.user.id ?? prev.id,
          name: res.data.user.fullname ?? prev.name,
          role: res.data.user.role ?? prev.role,
          verified: res.data.user.verified ?? prev.verified,
        }));
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setProfileError(error.response?.data?.error || t('profile.error.fetch'));
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [t]);

  const handleSaveProfile = () => {
    // Here you would typically save to backend
    alert(t('profile.error.update'));
    setIsEditing(false);
  };

  const handleAddAddress = () => {
    alert(t('profile.addresses.add') + ' ' + t('profile.error.notImplemented'));
  };

  const handleChangePassword = () => {
    alert(t('profile.security.password.change') + ' ' + t('profile.error.notImplemented'));
    setShowPasswordModal(false);
  };

  const tabs = [
    { id: 'personal', label: t('profile.tabs.personal'), icon: '👤' },
    { id: 'addresses', label: t('profile.tabs.addresses'), icon: '📍' },
    { id: 'security', label: t('profile.tabs.security'), icon: '🔒' }
  ];

  return (
    <>
      <Header isBuyerMode={true} />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl text-gray-600 font-bold">
                  {user.name === "Loading..." ? t('profile.loading') : user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{user.name === "Loading..." ? t('profile.loading') : user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500 capitalize">{t('profile.accountType', { role: user.role || 'Buyer' })}</p>
                  <p className={`text-xs font-semibold mt-1 ${user.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                    {user.verified ? t('profile.verified') : t('profile.pending')}
                  </p>
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
                      className={`flex items-center px-8 py-6 text-base font-semibold border-b-4 transition-all duration-300 cursor-pointer flex-1 justify-center ${activeTab === tab.id
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
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{t('profile.personal.title')}</h3>
                        <p className="text-gray-600">{t('profile.personal.subtitle')}</p>
                      </div>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer ${isEditing
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                      >
                        {isEditing ? (
                          <>
                            <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            {t('profile.personal.cancel')}
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            {t('profile.personal.edit')}
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('profile.personal.fullName')}
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{user.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('profile.personal.email')}
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{user.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('profile.personal.phone')}
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={user.phone}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{user.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('profile.personal.type')}
                        </label>
                        <p className="text-gray-900 py-2">Buyer</p>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        >
                          {t('profile.personal.cancel')}
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                        >
                          <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          {t('profile.personal.save')}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Addresses Tab */}
                {activeTab === 'addresses' && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{t('profile.addresses.title')}</h3>
                        <p className="text-gray-600">{t('profile.addresses.subtitle')}</p>
                      </div>
                      <button
                        onClick={handleAddAddress}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                      >
                        <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        {t('profile.addresses.add')}
                      </button>
                    </div>

                    <div className="space-y-4">
                      {user.addresses.map((address) => (
                        <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-medium text-gray-900">{address.type}</span>
                                {address.isDefault && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                    {t('profile.addresses.default')}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-700">{address.street}</p>
                              <p className="text-gray-700">{address.city}, {address.wilaya} {address.postalCode}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                                {t('profile.addresses.edit')}
                              </button>
                              {!address.isDefault && (
                                <button className="text-sm text-red-600 hover:text-red-700 cursor-pointer">
                                  {t('profile.addresses.remove')}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{t('profile.security.title')}</h3>
                      <p className="text-gray-600">{t('profile.security.subtitle')}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{t('profile.security.password.title')}</h4>
                          <p className="text-sm text-gray-600">{t('profile.security.password.lastChanged')}</p>
                        </div>
                        <button
                          onClick={() => setShowPasswordModal(true)}
                          className="text-sm text-green-600 hover:text-green-700 font-medium cursor-pointer"
                        >
                          {t('profile.security.password.change')}
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{t('profile.security.2fa.title')}</h4>
                          <p className="text-sm text-gray-600">{t('profile.security.2fa.desc')}</p>
                        </div>
                        <button className="text-sm text-green-600 hover:text-green-700 font-medium cursor-pointer">
                          {t('profile.security.2fa.enable')}
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{t('profile.security.sessions.title')}</h4>
                          <p className="text-sm text-gray-600">{t('profile.security.sessions.desc')}</p>
                        </div>
                        <button className="text-sm text-green-600 hover:text-green-700 font-medium cursor-pointer">
                          {t('profile.security.sessions.view')}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('profile.security.password.change')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('profile.security.password.current')}
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('profile.security.password.new')}
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('profile.security.password.confirm')}
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
                  {t('profile.personal.cancel')}
                </button>
                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
                >
                  {t('profile.security.password.change')}
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