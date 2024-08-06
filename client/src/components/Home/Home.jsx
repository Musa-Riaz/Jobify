import React from 'react'
import { useSelector } from 'react-redux'
import HowItWorks from './HowItWorks'
import PopularCategories from './PopularCategories'
import HeroSection from './HeroSection'
import PopularCompanies from './PopularCompanies'
import { Navigate } from 'react-router-dom'
const Home = () => {
  const {isAuthorized} = useSelector((state) => state.auth);

if(!isAuthorized){
  return <Navigate to = "/login" />
}

  return (
    <section className='homePage page'>
      <HeroSection/>
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />  
    </section>
  )
}

export default Home
