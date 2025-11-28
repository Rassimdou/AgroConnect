import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import Hero from './components/hero'
import Features from './components/features'
import HowItWorks from './components/how-it-works'
import Footer from './components/footer'
import UserTypeSelection from './components/UserTypeSelection'

function App() {
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState('home')

  const handleGetStarted = () => {
    setCurrentPage('user-selection')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
  }

  if (currentPage === 'user-selection') {
    return (
      <>
        <Header />
        <UserTypeSelection onBack={handleBackToHome} />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <Hero onGetStarted={handleGetStarted} />
      <Features onGetStarted={handleGetStarted} />
      <HowItWorks onGetStarted={handleGetStarted} />
      <Footer />
    </>
  )
}

export default App
