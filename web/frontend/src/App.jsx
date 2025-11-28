import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import Hero from './components/hero'
import Features from './components/features'
import HowItWorks from './components/how-it-works'
import Footer from './components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </>
  )
}

export default App
