import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api'

const Login = ({ userType = 'buyer' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Determine the correct endpoint based on userType
      let endpoint = '/auth/login/user';
      let dashboardPath = '/dashboard';

      if (userType === 'producer' || userType === 'farmer') {
        endpoint = '/auth/login/producer';
        dashboardPath = '/farmer-dashboard';
      } else if (userType === 'transporter') {
        endpoint = '/auth/login/transporter';
        dashboardPath = '/transporter-available-jobs';
      }

      const response = await api.post(endpoint, formData);
      console.log('Login response:', response);

      // Store user data in localStorage from login response
      // The backend now returns the user object directly in the response
      const userData = response.data.user || response.data.producer || response.data.transporter;

      if (userData) {
        // Ensure role is present in the stored user data
        if (!userData.role) {
          if (userType === 'producer' || userType === 'farmer') {
            userData.role = 'producer';
          } else if (userType === 'transporter') {
            userData.role = 'transporter';
          } else {
            userData.role = 'user';
          }
        }

        console.log('Storing user data in localStorage:', userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        console.warn('No user data found in login response');
      }

      // Navigate to appropriate dashboard
      navigate(dashboardPath);
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.error || 'Login failed. Please check your credentials.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleBack = () => {
    navigate('/user-selection');
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-md w-full space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>


        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:rotate-12 transition-transform duration-300">
            <span className="text-2xl">🌱</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t('auth.welcomeBack')}
          </h2>
          <p className="text-gray-600">
            {t('auth.signInTo', { type: userType })}
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.email')}
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 pr-10"
                  placeholder={t('auth.enterEmail')}
                />
                <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.password')}
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 pr-10"
                  placeholder={t('auth.enterPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                {t('auth.rememberMe')}
              </label>
            </div>
            <button type="button" className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-300">
              {t('auth.forgotPassword')}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('auth.signingIn')}
              </div>
            ) : (
              t('auth.signIn')
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              {t('auth.noAccount')}{' '}
              <button
                type="button"
                onClick={handleSignup}
                className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-300"
              >
                {t('auth.signUpHere')}
              </button>
            </p>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-800">
              🔒 {t('auth.secureData')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;