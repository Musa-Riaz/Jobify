import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/slices/authSlice";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { setLoading, hideLoading } from "../../redux/slices/alertSlice";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {message } from 'antd';
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading());
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {
          email,
          password,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(hideLoading());

      if (res.data.status === "success") {
        console.log(res.data);
        message.success(res.data.message);
        setEmail("");
        setPassword("");
        setRole("");
        dispatch(setAuth(true));
        navigate('/')
      }
      else if(res.data.status === 'fail') {
        console.log(res.data.message);
        message.error(res.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
      message.error("Invalid Email or Password");
     
    }

    if (isAuthorized) {
      return <Navigate to="/" />;
    }
  };

  return (
    <div>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <h1>Login To Your Account</h1>
          </div>
          <form>
            <div className="inputTag">
              <label> User Role: </label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option>Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>

            <div className="inputTag">
              <label> Email Address: </label>
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label> Password: </label>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                />
                <MdOutlinePassword />
              </div>
            </div>
          
            <button onClick={handleLogin} type="submit" style={{cursor: 'pointer'}}>
              Login
            </button>
            <Link to="/register">Dont Have An Account? Click Here To Register</Link>
          </form>
        </div>

        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </section>
    </div>
  );
};

export default Register;
