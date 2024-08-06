import React from 'react'
import { FaSuitcase, FaBuilding, FaUsers, FaUserPlus } from 'react-icons/fa'
const HeroSection = () => {

  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ]

  return (
    <div className='heroSection'>
      <div className="container">
        <div className="title">
          <h1>Find a Job That Suits Your</h1>
          <h1>Interests & Skills</h1>
          <p>Jobify is a cutting-edge job search and recruitment platform designed to streamline the hiring process for both job seekers and employers. Our mission is to connect talented individuals with their dream jobs while providing companies with the best candidates for their open positions.</p>
        </div>
      <div className="image">
        <img src="/heroS.jpg" alt="Hero_Banner" />
      </div>
      </div>
      <div className="details">
        {
          details.map((detail) => (
            <div className="card" key={detail.id}>
                <div className="icon">{detail.icon}</div>
                <p>{detail.title}</p>
                <p>{detail.subTitle}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default HeroSection
