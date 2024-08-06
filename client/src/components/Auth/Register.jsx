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
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  const handleResgister = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading());
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        {
          email,
          password,
          phone,
          role,
          name,
        },
       
      );
      dispatch(hideLoading());

      if (res.data.status === "success") {
        toast.success("User Registered Successfully");
        setEmail("");
        setPassword("");
        setPhone("");
        setName("");
        setRole("");
        dispatch(setAuth(true));
        navigate('/')
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
      toast.error(err.response.data.message);
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
            <h1>Create A New Account</h1>
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
              <label> User Name: </label>
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name"
                />
                <FaPencilAlt />
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
            <div className="inputTag">
              <label> Phone: </label>
              <div>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Your Phone Number"
                />
                <FaPhone />
              </div>
            </div>
            <button onClick={handleResgister} type="submit" >
              Register
            </button>
            <Link to="/login">Already a User? Click Here To Login</Link>
          </form>
        </div>

        <div className="banner">
          <img src="/register.png" alt="register" />
        </div>
      </section>
    </div>
  );
};

export default Register;
