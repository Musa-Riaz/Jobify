import './App.css'
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {setUser} from './redux/slices/userSlice';
import {setAuth} from './redux/slices/authSlice';
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import Jobs from './components/Job/Jobs';
import JobDetails from './components/Job/JobDetails';
import MyJobs from './components/Job/MyJobs';
import PostJobs from './components/Job/PostJobs';
import Application from './components/Application/Application';
import MyApplication from './components/Application/MyApplication';
import Login from './components/Auth/Login';
import NotFound from './components/NotFound';
import Register from './components/Auth/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

function App() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const isAuthorized = useSelector(state => state.auth.isAuthorized);

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route  path='/' element={<Home />}/>
      <Route path='/job/getall' element={<Jobs />}/>
      <Route path='/job/:id' element = {<JobDetails />}/>
      <Route path='/job/post' element={<PostJobs />}/>
      <Route path='/application/:id' element={<Application />}/>
      <Route path='/application/me' element={<MyApplication />}/>
      <Route path='/*' element={<NotFound />}/>
    </Routes>
     <Footer />
     <Toaster />
    </>
  )
}

export default App
