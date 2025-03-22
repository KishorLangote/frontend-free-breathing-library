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
        <div className="container fw-medium d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <Link to="/" className="navbar-brand fw-bold d-flex align-items-center gap-2">
              <div style={{ width: "80px" }}>
                <img
                  src="https://res.cloudinary.com/dzuydzr7l/image/upload/v1741258729/FREE_BREATHING_LOGO_x5lchq.jpg"
                  alt="logo"
                  className="img-fluid object-cover rounded-circle"
                />
              </div>
            </Link>
            <div>
              <p className="display-6 fw-bold mx-0">
                Free Breathing
              </p>
            </div>
          </div>
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navBar"
            aria-controls="navBar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navBar"
          >
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
              <div className="d-flex flex-column flex-lg-row gap-3 mt-3 mt-lg-0">
                <Link
                  to="/signup"
                  className="bg-signup fw-bold text-center text-dark w-100 p-2 rounded"
                >
                  SignUp
                </Link>
                <Link
                  to="/login"
                  className="bg-login fw-bold text-center text-dark w-100 p-2 rounded"
                >
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
