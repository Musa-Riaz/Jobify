import React from 'react'
import { useSelector } from 'react-redux'
import HowItWorks from './HowItWorks'
import PopularCategories from './PopularCategories'
import HeroSection from './HeroSection'
import PopularCompanies from './PopularCompanies'
import { setUser } from '../../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { setAuth } from '../../redux/slices/authSlice'
const Home = () => {
  const dispatch = useDispatch();

  const { isAuthorized } = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.user);

    // if(!isAuthorized){
      
    //   return <Navigate to = "/login" />
    // }

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
