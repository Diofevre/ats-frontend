import CATSection from '@/components/front_office/CATSection'
import FeaturesLandingPage from '@/components/front_office/FeaturesLandingPage'
import HeroLandingPage from '@/components/front_office/HeroLandingPage'
import PricingLandingPage from '@/components/front_office/PricingLandingPage'
import TestimonialsLandingPage from '@/components/front_office/TestimonialsLandingPage'
import React from 'react'

const Home = () => {
  return (
    <div className='min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <HeroLandingPage />
      <FeaturesLandingPage />
      <TestimonialsLandingPage />
      <PricingLandingPage />
      <CATSection />
    </div>
  )
}

export default Home;