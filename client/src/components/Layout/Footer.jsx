import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaYoutube,  FaLinkedin, FaGithub } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
const Footer = () => {

  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
 

  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Musa Riaz </div>
      <div>
        <Link to="/" target=''>
        <FaFacebook />
        </Link>
      
    
        <Link to="/" target=''>
        <FaLinkedin />
        </Link>
      
     
        <Link to="/" target=''>
        <FaGithub />
        </Link>
      
   
        <Link to="/" target=''>
        <RiInstagramFill />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
