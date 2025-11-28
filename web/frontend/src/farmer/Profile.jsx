import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import './Profil.css';

// Mock farmer profile data
const farmerProfileData = {
  personalInfo: {
    firstName: 'Ahmed',
    lastName: 'Bouchene',
    email: 'ahmed.bouchene@example.com',
    phone: '+213 555 123 456',
    address: 'Farm El Baraka, Route de Blida, Algiers',
    joinDate: '2023-01-15',
    avatar: '🌾'
  },
  farmInfo: {
    farmName: 'El Baraka Organic Farm',
    farmType: 'Mixed Agriculture',
    established: '2018',
    totalArea: '8.5 hectares',
    specialty: 'Organic Vegetables & Fruits',
    certification: 'Organic Certified',
    location: 'Algiers, Algeria',
    crops: ['Tomatoes', 'Potatoes', 'Lettuce', 'Carrots', 'Apples']
  },
  businessStats: {
    totalSales: 45,
    customerRating: 4.8,
    responseRate: 95,
    completedOrders: 127
  },
  verification: {
    email: true,
    phone: true,
    identity: true,
    farm: 'pending'
  },
  documents: [
    { name: 'Identity Card', status: 'verified', icon: '🆔' },
    { name: 'Farm License', status: 'verified', icon: '📄' },
    { name: 'Organic Certificate', status: 'verified', icon: '🌱' },
    { name: 'Tax Registration', status: 'pending', icon: '💼' }
  ],
  settings: {
    emailNotifications: true,
    smsNotifications: false,
    orderAlerts: true,
    priceUpdates: true,
    newsletter: false
  }
};

const Profile = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState(farmerProfileData);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSettingToggle = (setting) => {
    setProfileData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [setting]: !prev.settings[setting]
      }
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Profile saved:', profileData);
    setShowSuccess(true);
    setIsEditing(false);
    setIsLoading(false);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleCancelEdit = () => {
    setProfileData(farmerProfileData);
    setIsEditing(false);
  };

  const menuItems = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'farm', label: 'Farm Details', icon: '🏠' },
    { id: 'verification', label: 'Verification', icon: '✅' },
    { id: 'documents', label: 'Documents', icon: '📑' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderPersonalInfo = () => (
    <div className="profile-section">
      <div className="section-header">
        <h2 className="section-title">
          <span>👤</span>
          Personal Information
        </h2>
        {!isEditing && (
          <button 
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            ✏️ Edit
          </button>
        )}
      </div>

      {showSuccess && (
        <div className="success-message">
          <span>✅</span>
          <span>Profile updated successfully!</span>
        </div>
      )}

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">
            First Name <span className="required-star">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            value={profileData.personalInfo.firstName}
            onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Last Name <span className="required-star">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            value={profileData.personalInfo.lastName}
            onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Email <span className="required-star">*</span>
          </label>
          <input
            type="email"
            className="form-input"
            value={profileData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Phone Number <span className="required-star">*</span>
          </label>
          <input
            type="tel"
            className="form-input"
            value={profileData.personalInfo.phone}
            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group full-width">
          <label className="form-label">Address</label>
          <textarea
            className="form-textarea"
            value={profileData.personalInfo.address}
            onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
            disabled={!isEditing}
            rows="3"
          />
        </div>
      </div>

      {isEditing && (
        <div className="form-actions">
          <button 
            className="cancel-button"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
          <button 
            className="save-button"
            onClick={handleSaveProfile}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Saving...
              </>
            ) : (
              <>
                <span>💾</span>
                Save Changes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );

  const renderFarmDetails = () => (
    <div className="profile-section">
      <div className="section-header">
        <h2 className="section-title">
          <span>🏠</span>
          Farm Details
        </h2>
        <button className="edit-button">
          ✏️ Edit
        </button>
      </div>

      <div className="farm-details">
        <div className="detail-item">
          <div className="detail-icon">🏷️</div>
          <div className="detail-content">
            <h4>Farm Name</h4>
            <p>{profileData.farmInfo.farmName}</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🌾</div>
          <div className="detail-content">
            <h4>Farm Type</h4>
            <p>{profileData.farmInfo.farmType}</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">📅</div>
          <div className="detail-content">
            <h4>Established</h4>
            <p>{profileData.farmInfo.established}</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">📏</div>
          <div className="detail-content">
            <h4>Total Area</h4>
            <p>{profileData.farmInfo.totalArea}</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">⭐</div>
          <div className="detail-content">
            <h4>Specialty</h4>
            <p>{profileData.farmInfo.specialty}</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">✅</div>
          <div className="detail-content">
            <h4>Certification</h4>
            <p>{profileData.farmInfo.certification}</p>
          </div>
        </div>
      </div>

      <div className="form-group full-width" style={{ marginTop: '1.5rem' }}>
        <label className="form-label">Main Crops</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {profileData.farmInfo.crops.map((crop, index) => (
            <span 
              key={index}
              style={{
                background: '#f0fdf4',
                color: '#059669',
                padding: '0.5rem 1rem',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                border: '1px solid #bbf7d0'
              }}
            >
              {crop}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVerification = () => (
    <div className="profile-section">
      <div className="section-header">
        <h2 className="section-title">
          <span>✅</span>
          Account Verification
        </h2>
      </div>

      <div className="verification-status">
        <div className="verification-icon">🛡️</div>
        <div className="verification-content">
          <h4>Account Verification Status: 75% Complete</h4>
          <p>Complete verification to build trust with buyers and unlock all features</p>
        </div>
        <button className="verify-button">
          Complete Verification
        </button>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Verification Steps</h4>
        <div className="farm-details">
          <div className="detail-item">
            <div className="detail-icon">{profileData.verification.email ? '✅' : '⏳'}</div>
            <div className="detail-content">
              <h4>Email Address</h4>
              <p>{profileData.verification.email ? 'Verified' : 'Pending'}</p>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">{profileData.verification.phone ? '✅' : '⏳'}</div>
            <div className="detail-content">
              <h4>Phone Number</h4>
              <p>{profileData.verification.phone ? 'Verified' : 'Pending'}</p>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">{profileData.verification.identity ? '✅' : '⏳'}</div>
            <div className="detail-content">
              <h4>Identity Verification</h4>
              <p>{profileData.verification.identity ? 'Verified' : 'Pending'}</p>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">{profileData.verification.farm === 'verified' ? '✅' : '⏳'}</div>
            <div className="detail-content">
              <h4>Farm Verification</h4>
              <p>{profileData.verification.farm === 'verified' ? 'Verified' : 'Under Review'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="profile-section">
      <div className="section-header">
        <h2 className="section-title">
          <span>📑</span>
          Documents & Certificates
        </h2>
        <button className="edit-button">
          📤 Upload New
        </button>
      </div>

      <div className="documents-grid">
        {profileData.documents.map((doc, index) => (
          <div key={index} className="document-item">
            <div className="document-icon">{doc.icon}</div>
            <div className="document-name">{doc.name}</div>
            <div className={`document-status ${doc.status === 'verified' ? 'verified' : ''}`}>
              {doc.status === 'verified' ? '✅ Verified' : '⏳ Pending Review'}
            </div>
          </div>
        ))}
        
        <div className="document-item">
          <div className="document-icon">➕</div>
          <div className="document-name">Add Document</div>
          <div className="document-status">Click to upload</div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="profile-section">
      <div className="section-header">
        <h2 className="section-title">
          <span>⚙️</span>
          Notification Settings
        </h2>
      </div>

      <div className="settings-list">
        <div className="setting-item">
          <div className="setting-info">
            <h4>Email Notifications</h4>
            <p>Receive order updates and platform news via email</p>
          </div>
          <div 
            className={`toggle-switch ${profileData.settings.emailNotifications ? 'active' : ''}`}
            onClick={() => handleSettingToggle('emailNotifications')}
          ></div>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>SMS Notifications</h4>
            <p>Get important alerts via text message</p>
          </div>
          <div 
            className={`toggle-switch ${profileData.settings.smsNotifications ? 'active' : ''}`}
            onClick={() => handleSettingToggle('smsNotifications')}
          ></div>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Order Alerts</h4>
            <p>Instant notifications for new orders</p>
          </div>
          <div 
            className={`toggle-switch ${profileData.settings.orderAlerts ? 'active' : ''}`}
            onClick={() => handleSettingToggle('orderAlerts')}
          ></div>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Price Updates</h4>
            <p>Notifications about market price changes</p>
          </div>
          <div 
            className={`toggle-switch ${profileData.settings.priceUpdates ? 'active' : ''}`}
            onClick={() => handleSettingToggle('priceUpdates')}
          ></div>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Newsletter</h4>
            <p>Weekly farming tips and market insights</p>
          </div>
          <div 
            className={`toggle-switch ${profileData.settings.newsletter ? 'active' : ''}`}
            onClick={() => handleSettingToggle('newsletter')}
          ></div>
        </div>
      </div>

      <div className="form-actions">
        <button className="save-button">
          💾 Save Settings
        </button>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfo();
      case 'farm':
        return renderFarmDetails();
      case 'verification':
        return renderVerification();
      case 'documents':
        return renderDocuments();
      case 'settings':
        return renderSettings();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <>
      <Header isFarmerMode={true} onNavigate={onNavigate} />
      <div className="profile-page">
        
        {/* Header */}
        <div className="profile-header">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="profile-title">👨‍🌾 Farmer Profile</h1>
                <p className="profile-subtitle">Manage your account and farm information</p>
              </div>
              <button
                onClick={() => onNavigate('farmer-dashboard')}
                className="mt-4 lg:mt-0 bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="profile-container">
            <div className="profile-content">
              
              {/* Sidebar */}
              <div className={`profile-sidebar animate-entrance ${isVisible ? 'visible' : ''}`}>
                <div className="profile-avatar-section">
                  <div className="avatar-container">
                    <div className="profile-avatar">
                      {profileData.personalInfo.avatar}
                    </div>
                    <button className="avatar-upload">
                      📷
                    </button>
                  </div>
                  <div className="profile-name">
                    {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}
                  </div>
                  <div className="profile-role">🌾 Certified Farmer</div>
                  <div className="profile-rating">
                    <div className="rating-stars">⭐⭐⭐⭐⭐</div>
                    <div className="rating-value">{profileData.businessStats.customerRating}</div>
                  </div>
                </div>

                <div className="profile-stats">
                  <div className="stat-item">
                    <div className="stat-number">{profileData.businessStats.totalSales}</div>
                    <div className="stat-label">Products</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{profileData.businessStats.completedOrders}</div>
                    <div className="stat-label">Orders</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{profileData.businessStats.responseRate}%</div>
                    <div className="stat-label">Response</div>
                  </div>
                </div>

                <div className="profile-menu">
                  {menuItems.map(item => (
                    <button
                      key={item.id}
                      className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <span className="menu-icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className={`profile-main animate-entrance delay-100 ${isVisible ? 'visible' : ''}`}>
                {renderActiveSection()}
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