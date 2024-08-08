import React, { useEffect } from 'react';
import '../src/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/slices/userSlice';
import { setAuth } from './redux/slices/authSlice';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import Jobs from './components/Job/Jobs';
import JobDetails from './components/Job/JobDetails';
import MyJobs from './components/Job/MyJobs';
import Application from './components/Application/Application';
import PostJobs from './components/Job/PostJobs';
import MyApplications from '../src/components/Application/MyApplications';
import Register from '../src/components/Auth/Register';
import Login from './components/Auth/Login';
import NotFound from '../src/components/NotFound/NotFound';
import Spinner from '../src/components/Spinner/Spinner';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const loading = useSelector((state) => state.alerts.loading);

  const getUser = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/user/get-user', {withCredentials: true});
      dispatch(setUser(res.data.user));
      dispatch(setAuth(true));
    } catch (err) {
      console.log(err);
      dispatch(setAuth(false));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route  path='/' element={<Home />} />
            <Route  path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/job/getall' element={<Jobs />} />
            <Route path='/job/:id' element={<JobDetails />} />
            <Route path='/job/post' element={<PostJobs />} />
            <Route path = "/job/me" element = {<MyJobs />} /> 
            <Route path='/application/:id' element={<Application />} />
            <Route path='/application/me' element={<MyApplications />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
          <Footer />
          <Toaster />
        </>
      )}
    </>
  );
}

export default App;
