import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { authActions } from "../components/store/auth";
import { useDispatch } from "react-redux";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch(); // useDispatch help to updates changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (loginInfo.username == "" && loginInfo.password == "") {
        alert("All fields are required!");
       
      } else {
        const response = await axios.post(
          "https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/sign-in",
          loginInfo
        );
        // Extract user, role, and token from the response
        // const { id, role, token } = response.data;
        dispatch(authActions.login()); //
        dispatch(authActions.changeRole(response.data.role)); // checking which user is login
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        navigate("/profile");
        alert("Signup Successfully!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center min-auto py-5"
        style={{ minHeight: "60vh" }}
      >
        <div className="card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
          <h2 className="text-center mb-3">Login</h2>

          <form onSubmit={handleLogin} className="w-100">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control w-100"
                name="username"
                placeholder="Enter your username..."
                value={loginInfo.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control w-100 pe-5"
                  name="password"
                  placeholder="**********"
                  value={loginInfo.password}
                  onChange={handleChange}
                />
              
                <div
                  className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                >
                  <span className="fs-5">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button type="submit" className="bg-login w-100 fw-bold">
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <small>
              Don't have an account?{" "}
              <Link to="/signup" className="fw-bold">
                Sign Up
              </Link>
            </small>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
