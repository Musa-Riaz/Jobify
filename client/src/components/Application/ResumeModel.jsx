import React from 'react'

const ResumeModel = ({imgUrl, onClose}) => {
  return (
    <div className='resume-modal'>
    <div className="modal-content">
      <span className='close' onClick={onClose}>&times;</span>
      <img src= { imgUrl } alt='resume'/>
    </div>
  </div>
  )
}

export default ResumeModel
