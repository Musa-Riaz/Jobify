import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import { IoMdSend } from 'react-icons/io'

const HowItWorks = () => {
  return (
    <div className='howitworks'>
      <div className="container">
        <h3>How Jobify Works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>Create your professional account here ata Jobify and start applying for Jobs.</p>
          </div>
          <div className="card">
            <MdFindInPage />
            <p>Find a Job/Post a Job</p>
            <p>Whether you are an Employer or a Job Seeker, Jobify has got you covered.</p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>Create Account</p>
            <p>Create your professional account here ata Jobify and start applying for Jobs</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
