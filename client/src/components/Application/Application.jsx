import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { message } from 'antd';
import axios from 'axios'
import { useParams } from 'react-router-dom';
const Application = () => {

  const { isAuthorized } = useSelector((state) => state.auth);
  const {user } = useSelector((state) => state.user);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [coverLetter, setCoverLetter] = useState();
  const [resume, setResume] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleFileChange = async  (e) =>{
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    setResume(file);

  }

const handleApplication = async (e) =>{
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('coverLetter', coverLetter);
  formData.append('resume', resume);
  formData.append('phone', phone);
  formData.append('address', address);
  formData.append('jobId', id);
  
  try{

    const res = await axios.post("http://localhost:4000/api/v1/application/create-application"
      , formData 
      , {withCredentials: true
      , headers :{ 'Content-Type': 'multipart/form-data'}});
      if(res.data.status === 'success'){
        message.success(res.data.message);
        setName('');
        setEmail('');
        setCoverLetter('');
        setResume('');
        setPhone('');
        setAddress('');
      
        navigate('/job/getall');
      }

  }
  catch(err){
    console.log(err);
    message.error(err.response.data);
  }


}


if(!isAuthorized || (user && user.role === "Employer")){
  navigate('/');
}

  return (
    <section className='application'>
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <input type="text" placeholder='Your Name' value={name} onChange = {(e) => setName(e.target.value)} />
          <input type="text" placeholder='Your Email' value={email} onChange = {(e) => setEmail(e.target.value)} />
          <input type="text" placeholder='Your Address' value={address} onChange = {(e) => setAddress(e.target.value)} />
          <input type="number" placeholder='Your Phone' value={phone} onChange = {(e) => setPhone(e.target.value)} />
          <textarea placeholder='Write a cover letter' value = {coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
          <div>
            <label style={{textAlign:'start', display: " block ", fontSize: '20px'}}>Select Resume.<b>*File type must be .jpg, .png or .webp</b></label>
            <input type="file" accept='.jpg, .png, .webp' onChange={handleFileChange} style={{width: '100%'}} />
          </div>
          <button type='submit'>Send Application</button>
        </form>
      </div>
    </section>
  )
}

export default Application
