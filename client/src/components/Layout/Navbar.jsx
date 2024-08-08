import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, hideLoading } from "../../redux/slices/alertSlice";
import { setAuth } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/userSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import {message} from 'antd'
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const user = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/logout", {withCredentials: true});
      console.log("Logout response:", res); // Log response for debugging
      
      if(res.data.status === 'success'){

        dispatch(setAuth(false));
        dispatch(setUser({}));
        
        message.success("Successfully logged out");
        navigate("/login");
      }
    } catch (err) {
      console.log("Logout error:", err); // Log error for debugging
      message.error("Logout failed");
      dispatch(setAuth(true));
    }
  };

  useEffect(() => {
    console.log("isAuthorized state:", isAuthorized); // Log state for debugging
  }, [isAuthorized]);

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to="/" onClick={() => setShow(false)}>
              {" "}
              HOME{" "}
            </Link>
          </li>
          <li>
            <Link to="/job/getall" onClick={() => setShow(false)}>
              {" "}
              ALL JOBS{" "}
            </Link>
          </li>
          <li>
            <Link to="/application/me" onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          <li>
            {user && user.role === "Employer" ? (
              <>
                <Link  to="/job/post" onClick={() => setShow(false)}>
                  {" "}
                  POST JOB{" "}
                </Link>

                <Link to="/job/me">
                {" "}
                VIEW YOUR JOBS</Link>
              </>
            ) : (
              <> </>
            )}
          </li>
          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
