import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import Home from "./pages/Home";
import AllBooks from "./pages/AllBooks";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import BookDetails from "./components/BookDetails/BookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./components/store/auth";
import { useEffect } from "react";
import Favorites from "./components/Profile/Favorites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrder from "./pages/AllOrder";
import AddBooks from "./pages/AddBooks";
import UpdateBook from "./pages/UpdateBook";
import About from "./components/About";
import Contact from "./components/Contact";
import RequestBook from "./components/Profile/RequestBook";
import AllRequest from "./pages/AllRequest";
import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("role") &&
      localStorage.getItem("token")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />}></Route>
        <ToastContainer /> 
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          {/* index means by default */}
          {role === "user" ? (
            <Route index element={<Favorites />} />
          ) : (
            <Route index element={<AllOrder />} />
          )}
          <Route path="/profile/allRequest" element={<AllRequest />} />
          <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
          <Route path="/profile/requestBook" element={<RequestBook />} />
          {role === "admin" && <Route path="add-book" element={<AddBooks />} />}
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="/book-details/:id" element={<BookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
