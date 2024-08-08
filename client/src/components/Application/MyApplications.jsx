import React from 'react'
import {useSelector} from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ResumeModel from './ResumeModel';


const MyApplications = () => {

  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);  
  const [imgUrl, setImgUrl] = useState('');

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isAuthorized } = useSelector((state) => state.auth);


  const getMyApplication = async () => {
    try{

      if(user && user.role === 'Employer'){
        const res = await axios.get('http://localhost:4000/api/v1/application/get-employer-applications', {withCredentials: true});
        if(res.data.status === 'success'){

          setApplications(res.data.applications);
        }
        else if ( res.data.status === 'fail'){
          message.error(res.data.message);
        }

      }
      else if(user && user.role === 'Job Seeker'){
        const res = await axios.get('http://localhost:4000/api/v1/application/get-jobseeker-applications', {withCredentials: true});
        if(res.data.status === 'success'){
          setApplications(res.data.applications);
        }
        else if ( res.data.status === 'fail'){
          message.error(res.data.message);
        }
      }

    }
    catch(err){
      console.log(err);
    }
  }

  const deleteMyApplication = async (id) => {
    try{

      const res = await axios.delete(`http://localhost:4000/api/v1/application/delete-jobseeker-application/${id}`, {withCredentials: true});
      if(res.data.status === 'success'){
        message.success(res.data.message);
        const newApplications = applications.filter((application) => application._id !== id);
        setApplications(newApplications);
        getMyApplication();
      }
      else if(res.data.status === 'fail'){
        message.error(res.data.message);

      }
    }
    catch(err){
      console.log(err);
      message.error('Failed to delete application');
    }
  }

  const openModal = (imgUrl) =>{
    setImgUrl(imgUrl);
    setModalOpen(true);
  }

  const closeModal = () =>{
    setModalOpen(false);
  }


  useEffect(() => {
    if(user && isAuthorized)
    getMyApplication();
  }, [user]);
  return (
   <>
  <section className='my_applications page'>
    { user && user?.role === "Job Seeker" ? (
      <div className="container">
        <h3>My Applications</h3>
        {applications.map((application) =>{
          return <JobSeekerCard application={application} key={application._id} deleteMyApplication ={deleteMyApplication} openModal= {openModal}/>
        } )}
      </div>
    ) : (
      <div className="container">
        <h3>Applications from Job Seekers</h3>
        {applications.map((application) =>{
          return <EmployerCard application={application} key={application._id}  openModal= {openModal}/>
        } )}  
      </div>
    )}

    { modalOpen && <ResumeModel imgUrl = {imgUrl}  onClose = {closeModal}/>}
  </section>
   </>
  );
}

const JobSeekerCard = ({application, deleteMyApplication, openModal}) =>{
  return (
    <>
    <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name: {application.name}</span></p>
        <p><span>Email: {application.email}</span></p>
        <p><span>Phone: {application.phone}</span></p>
        <p><span>Address: {application.address}</span></p>
        <p><span>CoverLetter: {application.coverLetter}</span></p>
      </div>
      <div className="resume">
        <img src={application.resume.url} alt='resume' onClick={()=> openModal(application.resume.url)}/>
      </div>
      <div className="btn_area">
        <button onClick={() => deleteMyApplication(application._id)} style={{cursor: 'pointer'}}>Delete Application</button>
      </div>
    </div>
    </>
  )
}

const EmployerCard = ({application, openModal}) =>{
  return (
    <>
     <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name: {application.name}</span></p>
        <p><span>Email: {application.email}</span></p>
        <p><span>Phone: {application.phone}</span></p>
        <p><span>Address: {application.address}</span></p>
        <p><span>CoverLetter: {application.coverLetter}</span></p>
      </div>
      <div className="resume">
        <img src={application.resume.url} alt='resume' onClick={()=> openModal(application.resume.url)}/>
      </div>
    </div>
    </>
  )
}

export default MyApplications
