import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FarmerSignin.css';

const FarmerSignin = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      const response = await fetch('/api/farmers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to dashboard after successful login
        setTimeout(() => {
          navigate('/farmer-dashboard');
        }, 1000);
      } else {
        setErrors({ submit: data.message || 'Login failed. Please check your credentials.' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    navigate('/farmer-signup');
  };

  const handleForgotPassword = () => {
    // For now, just show an alert
    alert('Forgot password functionality coming soon!');
  };

  return (
    <div className="farmer-signin-container">
      <div className={`signin-content animate-entrance ${isVisible ? 'visible' : ''}`}>
        
        {/* Header */}
        <div className="signin-header">
          <div className="signin-avatar">
            <span className="signin-avatar-icon">🌾</span>
          </div>
          <h1 className="signin-title">Welcome Back</h1>
          <p className="signin-subtitle">Sign in to your farmer account</p>
        </div>

        {/* Form */}
        <form className="signin-form" onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="error-alert">
              {errors.submit}
            </div>
          )}

          <div className="form-fields">
            {/* Email */}
            <div className="form-field">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-container">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                  placeholder="Enter your email"
                />
                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="form-field">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-container">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                    </svg>
                  ) : (
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>
          </div>

          {/* Form Options */}
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="remember-checkbox"
              />
              <span className="remember-label">Remember me</span>
            </label>
            <button
              type="button"
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <div className="submit-loading">
                <svg className="loading-spinner" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Sign Up Redirect */}
        <div className="signup-redirect">
          <p className="signup-text">
            Don't have an account?{' '}
            <button
              type="button"
              className="signup-link"
              onClick={handleSignup}
            >
              Sign up here
            </button>
          </p>
        </div>

        {/* Additional Info */}
        <div className="info-banner">
          <p className="info-text">
            🚀 Access your farm dashboard, manage products, and connect with buyers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FarmerSignin;