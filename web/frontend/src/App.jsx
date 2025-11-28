import { useState } from 'react'
import './App.css'
import Header from './components/header'
import Hero from './components/hero'
import Features from './components/features'
import HowItWorks from './components/how-it-works'
import Footer from './components/footer'
import UserTypeSelection from './components/UserTypeSelection'
import FarmerDashboard from './farmer/Dashboard.jsx'
import MyProducts from './farmer/MyProducts.jsx'
import AddProduct from './farmer/AddProduct.jsx'
import Orders from './farmer/orders.jsx'
import Profile from './farmer/Profile.jsx'
import FarmerSignup from './farmer/FarmerSignup.jsx'
import FarmerSignin from './farmer/FarmerSignin.jsx'
function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentUserType, setCurrentUserType] = useState(null)
  const [editProductData, setEditProductData] = useState(null)

  const handleGetStarted = () => {
    setCurrentPage('user-selection')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
    setCurrentUserType(null)
  }

  const handleUserTypeSelect = (userType) => {
    setCurrentUserType(userType)
    if (userType === 'farmer') {
      setCurrentPage('farmer-dashboard')
    } else if (userType === 'buyer') {
      alert('Buyer dashboard coming soon!')
      setCurrentPage('user-selection')
    } else if (userType === 'transporter') {
      alert('Transporter dashboard coming soon!')
      setCurrentPage('user-selection')
    }
  }

  const handleNavigate = (page, data) => {
    console.log(`Navigate to: ${page}`, data)
    
    switch(page) {
      case 'farmer-dashboard':
      case 'dashboard':
        setCurrentPage('farmer-dashboard')
        break
      case 'my-products':
        setCurrentPage('my-products')
        break
      case 'add-product':
        setEditProductData(null)
        setCurrentPage('add-product')
        break
      case 'edit-product':
        setEditProductData(data)
        setCurrentPage('edit-product')
        break
      case 'orders':
      case 'farmer/orders':
        setCurrentPage('orders')
        break
      case 'profile':
      case 'farmer/profile':
        setCurrentPage('profile')
        break
      case 'home':
        handleBackToHome()
        break
      default:
        console.log('Unknown page:', page)
    }
  }

  // User Type Selection Page
  if (currentPage === 'user-selection') {
    return (
      <>
        <Header />
        <UserTypeSelection 
          onBack={handleBackToHome}
          onSelectUserType={handleUserTypeSelect}
        />
        <Footer />
      </>
    )
  }

  // Farmer Pages
  if (currentUserType === 'farmer') {
    switch(currentPage) {
      case 'farmer-dashboard':
        return <FarmerDashboard onNavigate={handleNavigate} />
      
      case 'my-products':
        return <MyProducts onNavigate={handleNavigate} />
      
      case 'add-product':
        return <AddProduct onNavigate={handleNavigate} editMode={false} />
      
      case 'edit-product':
        return <AddProduct onNavigate={handleNavigate} editMode={true} productData={editProductData} />
      
      case 'orders':
        return <Orders onNavigate={handleNavigate} />
      
      case 'profile':
        return <Profile onNavigate={handleNavigate} />
      
      default:
        return <FarmerDashboard onNavigate={handleNavigate} />
    }
  }

  // Home Page (Landing Page)
  return (
    <>
      {/* <FarmerSignin onNavigate={handleNavigate} /> */}
      {/* <FarmerSignup onNavigate={handleNavigate} /> */}
      <Header />
      <Hero onGetStarted={handleGetStarted} />
      <Features onGetStarted={handleGetStarted} />
      <HowItWorks onGetStarted={handleGetStarted} />
      <Footer />
    </>
  )
}

export default App
