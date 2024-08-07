import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { message } from 'antd'
import { setLoading, hideLoading } from '../../redux/slices/alertSlice'
const MyJobs = () => {

  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const navigate = useNavigate();
  const {isAuthorized} = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const getMyJobs = async () =>{


    try{
      dispatch(setLoading());
      const res = await axios.get("http://localhost:4000/api/v1/job/get-my-jobs", {withCredentials: true});
      dispatch(hideLoading());
      console.log(res.data);

      if(res.data.status === "success"){
        setMyJobs(res.data.jobs);
      }
      else if(res.data.status === "fail"){
        message.error(res.data.message);
        message.fail(res.data.message);
        setMyJobs([]);
      }

    }
    catch(err){
      dispatch(hideLoading());
      console.log(err);
      message.error("Failed to get jobs");
      setMyJobs([]);
    }
  }


  const handleDeleteJob = async (id) =>{
    try{

      const res  = await axios.get(`http://localhost:4000/api/v1/job/delete-job/${id}`, {withCredentials: true});
      if(res.data.status === "success"){
        message.success(res.data.message);
        const newJobs = myJobs.filter((job) => job._id !== id);
        setMyJobs(newJobs);
        getMyJobs();
      }
      else if(res.data.status === 'fail'){
        message.error(res.data.message);
      }

    }
    catch(err){
      console.log(err);

    }
  }


  const handleInputChange = (jobId, field , value) =>{
setMyJobs((prevJobs) => {
  prevJobs.map((job) => {
    job._id === jobId ? {...job, [field]: value} : job;
  });
});

  }
  return (

    <div>
      
    </div>
  )
}

export default MyJobs
