import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState([]);
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if (
        signupInfo.username == "" ||
        signupInfo.email == "" ||
        signupInfo.password == "" ||
        signupInfo.address == ""
      ) {
        alert("All fields are required!");
      } else {
        const response = await axios.post(
          "https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/sign-up",
          signupInfo
        );
        
        alert("Signup Successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data.message)
      alert(error.response.data.message);
    }
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center mx-auto py-5" style={{minHeight: '60vh'}}>
      <div className="card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-3">Sign Up</h2>

        <form onSubmit={handleSignup} className="w-100">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control w-100"
              name="username"
              placeholder="Enter your name..."
              value={signupInfo.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control w-100"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
              onChange={handleChange}
              required
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
                placeholder="Enter your password..."
                value={signupInfo.password}
                onChange={handleChange}
                required
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

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control w-100"
              name="address"
              placeholder="Enter your address..."
              value={signupInfo.address}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="bg-signup w-100 fw-bold">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account? <Link to="/login">Login</Link>
          </small>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
