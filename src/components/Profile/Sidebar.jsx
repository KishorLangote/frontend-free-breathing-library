import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch()
  const nevigate = useNavigate()
  const role = useSelector((state) => state.auth.role)
  console.log("role:", role)
  console.log("data of sidebar:", data)
  return (
    <>
      { <Loader /> && (
        <div class="p-3 bg-body-tertiary border shadow">
        <div className="text-center w-100">
          <img
            src={data.avatar}
            alt="User Avatar"
            className="img-fluid rounded-circle"
            style={{ objectFit: "cover", width: "80px", height: "80px" }}
          />
          <p className="fw-bold mt-2">{data.username}</p>
          <p className="text-muted mb-3">{data.email}</p>
        </div>
        <hr />
        {/*  for user */}
        {role === "user" && (
          <div class="d-flex flex-column align-items-center justify-content-center gap-4 mt-5 fs-5 fw-bold">
          <Link to="/profile" className="py-4 text-decoration-none text-black">
            Favorites 
          </Link>
          <Link
            to="/profile/orderHistory"
            className="py-4 text-decoration-none text-black"
          >
            Order History
          </Link>
          <Link
            to="/profile/requestBook"
            className="py-4 text-decoration-none text-black"
          >
            Request Book
          </Link>
          <Link
            to="/profile/settings"
            className="py-4 mb-5 text-decoration-none text-black"
          >
            Setting
          </Link>
        </div>
        )}
          {/* for admin  */}
        { role === "admin" && (
          <div 
          className="d-flex flex-column text-center fs-5 fw-bold mx-auto"
          style={{width: '50%', minHeight: '30vh'}}
          >
          <Link to="/profile" className="py-4 text-decoration-none text-black">
            All Orders
          </Link>
          <Link to="/profile/allRequest" className="py-4 text-decoration-none text-black">
            All Request
          </Link>
          <Link
            to="/profile/add-book"
            className="py-4 text-decoration-none text-black"
          >
            Add Book
          </Link>
        </div>
        )}
        <hr />
        <div className="d-flex align-items-center justify-content-center">
        <button to="" className="btn btn-info text-light fw-semibold fs-5 mb-5"
        onClick={() => {
          dispatch(authActions.logout())
          dispatch(authActions.changeRole("user"))
          localStorage.clear("id")
          localStorage.clear("token")
          localStorage.clear("role")
          nevigate("/")
        }}
        >
          Log out <IoMdLogOut />
        </button>
        </div>
      </div>
      )}
    </>
  );
};

export default Sidebar;
