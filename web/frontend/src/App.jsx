import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import Hero from './components/hero'
import Features from './components/features'
import HowItWorks from './components/how-it-works'
import Footer from './components/footer'
import UserTypeSelection from './components/UserTypeSelection'
import Login from './components/Login'
import Signup from './components/Signup'
import OTPVerification from './components/OTPVerification'
import Dashboard from './components/buyer/Dashboard'
import Marketplace from './components/buyer/Marketplace'
import ProductDetail from './components/buyer/ProductDetail'
import Cart from './components/buyer/Cart'
import MyOrders from './components/buyer/MyOrders'
import Profile from './components/buyer/Profile'
import { ROUTES, USER_TYPE_ROUTES } from './routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={
          <>
            <Header />
            <Hero />
            <Features />
            <HowItWorks />
            <Footer />
          </>
        } />

        {/* User Type Selection */}
        <Route path="/user-selection" element={
          <>
            <Header />
            <UserTypeSelection />
            <Footer />
          </>
        } />

        {/* Authentication Routes */}
        <Route path="/login" element={
          <>
            <Header />
            <Login />
            <Footer />
          </>
        } />
        <Route path="/signup" element={
          <>
            <Header />
            <Signup />
            <Footer />
          </>
        } />
        <Route path="/verify-otp" element={
          <>
            <Header />
            <OTPVerification />
            <Footer />
          </>
        } />

        {/* Buyer Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/profile" element={<Profile />} />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
