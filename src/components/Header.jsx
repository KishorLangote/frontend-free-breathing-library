import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImBook } from "react-icons/im";
import { GiHummingbird } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container fw-medium">
          <div  className="d-flex flex-row align-items-center justify-content-center">
          <Link to="/" className="navbar-brand fw-bold">
            <div 
            style={{ width: "100px" }}
           
            >
              <img
                src="https://res-console.cloudinary.com/dzuydzr7l/thumbnails/v1/image/upload/v1741176580/RlJFRV9CUkVBVEhJTkdfTE9HT194b3N5Mzg=/drilldown"
                alt="logo"
                className="img-fluid object-cover rounded-circle"
              />
            </div>
          </Link>
            <div>
              <p className="display-5 fw-bold font mx-0">मोकळा श्वास...<GiHummingbird /></p>
              {/* <small className="fw-bold">मोकळा श्वास...<GiHummingbird className="bird-size" /></small> */}
             
            </div>
            </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navBar"
            aria-controls="navBar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          

          <div className="collapse navbar-collapse justify-content-end" id="navBar">
          
            <ul className="navbar-nav fs-5 fw-semibold">
             
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/all-books">
                  All Books
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                <FaCartShopping /> Cart
                </NavLink>
              </li>


              {/* show "Profile" only for regular users */}
              {isLoggedIn && role === "user" && (
               
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                  <FaUser /> Profile
                  </NavLink>
                </li>
                
              )}

              {/* show "Admin Profile" only for admins */}
              {isLoggedIn && role === "admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                  <FaUser /> Admin Profile
                  </NavLink>
                </li>
              )}
            </ul>

         

            {/* show SignUp & LogIn only when NOT logged in */}
            {!isLoggedIn && (
              <div className="d-flex gap-3">
                <Link to="/signup" className="bg-signup fw-bold">
                  SignUp
                </Link>
                <Link to="/login" className="bg-login text-light fw-bold">
                  LogIn
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
