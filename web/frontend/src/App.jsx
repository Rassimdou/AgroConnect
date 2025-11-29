import OTPVerification from './components/OTPVerification'
import Dashboard from './components/buyer/Dashboard'
import Marketplace from './components/buyer/Marketplace'
import ProductDetail from './components/buyer/ProductDetail'
import Cart from './components/buyer/Cart'
import MyOrders from './components/buyer/MyOrders'
import Profile from './components/buyer/Profile'
import { ROUTES, USER_TYPE_ROUTES } from './routes'
import FarmerSignin from './components/farmer/FarmerSignin'
import FarmerSignup from './components/farmer/FarmerSignup'
import FarmerDashboard from './components/farmer/Dashboard'
import FarmerMarketplace from './components/farmer/Marketplace'
import FarmerAddProduct from './components/farmer/AddProduct'
import FarmerMyProducts from './components/farmer/MyProducts'
import FarmerOrders from './components/farmer/Orders'
import FarmerProfile from './components/farmer/Profile'
import TransporterSignup from './components/transporter/TransporterSignup'
import TransporterAvailableJobs from './components/transporter/AvailableJobs'
import TransporterMyDeliveries from './components/transporter/MyDeliveries'
import TransporterProfile from './components/transporter/Profile'
import ServiceSignin from './components/service_provider/ServiceSignin'
import ServiceSignup from './components/service_provider/ServiceSignup'
import ServiceDashboard from './components/service_provider/ServiceDashboard'
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header'
import Hero from './components/hero'
import Features from './components/features'
import HowItWorks from './components/how-it-works'
import Footer from './components/footer'
import Login from './components/Login'
import Signup from './components/signup'
import UserTypeSelection from './components/userTypeSelection'
import { Navigate } from "react-router-dom";



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

        {/* Farmer Routes */}
        <Route path="/farmer-signin" element={
          <>
            <Header />
            <FarmerSignin />
            <Footer />
          </>
        } />
        <Route path="/farmer-signup" element={
          <>
            <Header />
            <FarmerSignup />
            <Footer />
          </>
        } />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer-marketplace" element={<FarmerMarketplace />} />
        <Route path="/farmer-add-product" element={<FarmerAddProduct />} />
        <Route path="/farmer-my-products" element={<FarmerMyProducts />} />
        <Route path="/farmer-orders" element={<FarmerOrders />} />
        <Route path="/farmer-profile" element={<FarmerProfile />} />

        {/* Transporter Routes */}
        <Route path="/transporter-signup" element={
          <>
            <Header />
            <TransporterSignup />
            <Footer />
          </>
        } />
        <Route path="/transporter-available-jobs" element={<TransporterAvailableJobs />} />
        <Route path="/transporter-my-deliveries" element={<TransporterMyDeliveries />} />
        <Route path="/transporter-profile" element={<TransporterProfile />} />

        {/* Service Provider Routes */}
        <Route path="/service-provider-signin" element={
          <>
            <Header />
            <ServiceSignin />
            <Footer />
          </>
        } />
        <Route path="/service-provider-signup" element={
          <>
            <Header />
            <ServiceSignup />
            <Footer />
          </>
        } />
        <Route path="/service-provider-dashboard" element={<ServiceDashboard />} />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
