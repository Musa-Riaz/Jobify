import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {message} from 'antd';

const PostJobs = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [salaryFrom, setSalaryFrom] = useState('');
  const [salaryTo, setSalaryTo] = useState('');
  const [fixedSalary, setFixedSalary] = useState('');
  const [salaryType, setSalaryType] = useState('default'); 

  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();


  const handleJobPost = async (e) =>{
    e.preventDefault();
    if(salaryType === 'Fixed Salary'){
      setSalaryFrom('');
      setSalaryTo('');
    }
    else if(salaryType === 'Ranged Salary'){
      setFixedSalary('');
    }
    else{
      setSalaryFrom('');
      setSalaryTo('');
      setFixedSalary('');
    }

    await axios.post("http://localhost:4000/api/v1/job/job-posting", fixedSalary.length >= 4 ? {title, category, country, city, address, fixedSalary, description} : {title, category, country, city, address, salaryFrom, salaryTo, description}, {withCredentials: true, headers: {'Content-Type': 'application/json'}}).then((res) => {
      message.success('Job posted successfully');
      setTitle(''); 
      setCategory('');
      setCountry('');
      setCity('');
      setAddress('');
      setSalaryFrom('');
      setSalaryTo('');
      setFixedSalary('');
      setDescription('');
      setSalaryType('default');
      
    }).catch((err)=>{
      console.log(err);
      message.error("Job posting failed");
    });

}

useEffect(() => {
  if (!isAuthorized || (user && user.role !== 'Employer')) {
    navigate('/login');
  }
}, [isAuthorized, user, navigate]);

return (
  <>

  <div className = "job_post page">
    <div className="container">
      <h3>POST NEW JOB</h3>
      <form onSubmit={handleJobPost}>
        <div className="wrapper">
          <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='Job Title' />
          <select value={category} onChange={(e)=> setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Graphics & Design">Graphics & Design</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Frontend Web Development">Frontend Web Development</option>
            <option value="MERN Stack Development">MERN Stack Development</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="MEVN Stack Development">MEVN Stack Development</option>
            <option value="Data Entry Operator">Data Entry Operator</option>
            <option value="Video Animation">Video Animation</option>
          </select>
        </div>
        <div className="wrapper">
          <input  type="text" value={country} onChange={(e)=> setCountry(e.target.value)} placeholder='Enter Country' />
          <input  type="text" value={city} onChange={(e)=> setCity(e.target.value)} placeholder='Enter City' />
        </div>
          <input  type="text" value={address} onChange={(e)=> setAddress(e.target.value)} placeholder='Enter Address' />
          <div className="salary_wrapper">
            <select value={salaryType} onChange={(e) => setSalaryType(e.target.value) }>
              <option value="default">Default</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            <div>{ salaryType === "default" ? (<p>Please Provide Salary Type</p>) : (salaryType === "Fixed Salary" ? (<input type='number' placeholder='Enter fixed Salary' value={fixedSalary} onChange={(e)=> setFixedSalary(e.target.value)}/>) : (<div className='ranged_salary'>
              <input type="number" value={salaryFrom} onChange={(e) => setSalaryFrom(e.target.value)} placeholder='Set Salary From' />
              <input type="number" value={salaryTo} onChange={(e) => setSalaryTo(e.target.value)} placeholder='Set Salary To' />
            </div>)) }
            </div>
          </div>
          <textarea  rows= '10' value={description} onChange = {(e) => setDescription(e.target.value)} placeholder='Description'/>
          <button type='submit'>Create Job</button> 
      </form>
    </div>
  </div>
    
  </>
) 
}

export default PostJobs
