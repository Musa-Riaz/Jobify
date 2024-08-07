import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setAuth } from '../../redux/slices/authSlice';
import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setLoading, hideLoading } from '../../redux/slices/alertSlice';
import axios from 'axios'
const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    try{
  
      const res = await axios.get('http://localhost:4000/api/v1/job/get-all-jobs', {withCredentials: true});
      console.log(res.data);
      setJobs(res.data.jobs);

    }
    catch(err){
      console.log(err);

    }
  }


  useEffect(()=>{

    getJobs();

  }, []);

  if(!isAuthorized){
    navigate('/login');
  }

  return (
    <>
      <section className='jobs page'>
        <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {
            jobs && jobs.map((job) => 
             
                <div className="card" key={job._id}>
                <p>{job.title}</p>
                <p>{job.category}</p>
                <p>{job.country}</p>
                <Link  to= {`/job/${job._id}`}>Job Details</Link>
              </div>
              
            )}
        </div>
        </div>
       
      </section>
    </>
  )
}

export default Jobs
