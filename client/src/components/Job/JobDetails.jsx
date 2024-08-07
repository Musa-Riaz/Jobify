import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const JobDetails = () => {

  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [job, setJob] = useState({});
  const {id} = useParams();

  const getJob = async ()=> {
    try{
      const res = await axios.get(`http://localhost:4000/api/v1/job/${id}`, {withCredentials: true});
      if(res.data.status === "success"){
        setJob(res.data.job);
        console.log(res.data.job); 
      }
      else if(res.data.status === 'fail'){
        navigate('/job/getall');
      }

    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getJob();
  }, []);

  if(!isAuthorized){
    navigate('/login');
  }

  return (
    <>
      <div className="jobDetail page">
        <div className="container">
          <h3>Job Details</h3>
          <div className="banner">
            <p>Title: <span>{job.title}</span></p>
            <p>Category: <span>{job.category}</span></p>
            <p>Country: <span>{job.country}</span></p>
            <p>City: <span>{job.city}</span></p>
            <p>Address: <span>{job.address}</span></p>
            <p>Description: <span>{job.description}</span></p>
            <p>Job PostedOn: <span>{job.jobPostedOn}</span></p>
            <p>{job.fixedSalary ? (<span>{job.fixedSalary}</span>) : (<span>{job.salaryFrom} - <span>{job.salaryTo}</span></span>)}</p>
            <p>{user && user.role === "Employer" ? <></> : (<Link to = {`application/${job._id}`} >Apply Now</Link>)}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobDetails
