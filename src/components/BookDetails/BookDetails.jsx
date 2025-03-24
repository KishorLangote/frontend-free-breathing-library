import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
// import Loader from "../Loader/Loader";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdLanguage } from "react-icons/md";

const BookDetails = () => {
  const [data, setData] = useState(null);
  const { id } = useParams(); // bookId
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const nevigate = useNavigate();

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get(
          `https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchedData();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const body = {
    bookId: id,
  };

  // if (!data) return <Loader />; // Show loader if data is not available

  // add book in favorites:
  const handleFavorite = async (e) => {
    try {
      const response = await axios.put(
        "https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/add-book-to-favorite",
        body,
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  // add book in cart:
  const handleCart = async (e) => {
    try {
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const body = {
        id: localStorage.getItem("id"),
        bookId: id,
      };

      const response = await axios.put(
        "https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/add-to-cart",
        body,
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteBook = async (e) => {
    const response = await axios.delete(
      `https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/delete-book/${id}`,
      { headers }
    );
    alert(response.data.message);
    nevigate("/all-books");
  };

 
  return (
    // <div className="d-flex flex-column min-vh-100">
    //   {!data ? (
    //     <div className="text-center mt-5 d-flex justify-content-center align-items-center gap-3" style={{minHeight: '50vh'}} >
    //       <div className="spinner-border text-primary"></div>
    //       <p className="fs-4 mt-3"> Loading...</p>
    //     </div>
    //   ) : (
    //     <div className="container py-5 flex-grow-1">
    //       <div className="row d-flex align-items-stretch">
    //         {/* book image section */}
    //         <div className="col-12 col-md-5 d-flex justify-content-center">
    //           <div
    //             className="border rounded shadow position-relative w-100 h-100 d-flex align-items-center justify-content-center overflow-hidden"
    //             style={{ maxWidth: "450px", minHeight: "500px" }}
    //           >
    //             <img
    //               src={data.coverImageUrl}
    //               alt={data.title}
    //               className="img-fluid px-3 py-3"
    //               style={{
    //                 width: "100%",
    //                 height: "100%",
    //                 objectFit: "contain",
    //               }}
    //             />
    //           </div>
    //         </div>

    //         {/* buttons: favorite & cart */}
    //         {isLoggedIn && role === "user" && (
    //           <div className="col-12 col-md-2 d-flex justify-content-center align-items-center my-3 my-md-0">
    //             <div className="d-flex flex-column align-items-center gap-3">
    //               <button
    //                 className="btn btn-outline-danger rounded fs-4 d-flex align-items-center"
    //                 onClick={handleFavorite}
    //               >
    //                 <FaHeart />
    //                 <span className="d-xm-inline-block ms-2">Favorites</span>
    //               </button>
    //               <button
    //                 className="btn btn-outline-primary rounded fs-4 d-flex align-items-center"
    //                 onClick={handleCart}
    //               >
    //                 <FaShoppingCart />
    //                 <span className="d-xm-inline-block ms-2">Add to Cart</span>
    //               </button>
    //             </div>
    //           </div>
    //         )}

    //         {/* if admin loggedIn */}
    //         {isLoggedIn && role === "admin" && (
    //           <div className="col-12 col-md-2 d-flex justify-content-center align-items-center my-3 my-md-0">
    //             <div className="d-flex flex-column align-items-center gap-3">
    //               <Link
    //                 to={`/updateBook/${id}`}
    //                 className="btn btn-outline-danger rounded fs-4 d-flex align-items-center"
    //               >
    //                 <FaEdit />
    //                 <span className="d-xm-inline-block ms-2">Edit Book</span>
    //               </Link>
    //               <button
    //                 className="btn btn-outline-primary rounded fs-4 d-flex align-items-center"
    //                 onClick={deleteBook}
    //               >
    //                 <MdDelete />
    //                 <span className="d-xm-inline-block ms-2">Delete Book</span>
    //               </button>
    //             </div>
    //           </div>
    //         )}

    //         {/* book details */}
    //         <div className="col-12 col-md-5">
    //           <div className="card shadow p-4 h-100">
    //             <div className="card-body">
    //               <h2 className="card-title">{data.title}</h2>
    //               <h5 className="text-muted">
    //                 By {data.author?.join(", ") || "Unknown Author"}
    //               </h5>
    //               <p className="card-text mt-3">{data.description}</p>
    //               <p>
    //                 <strong>Genre:</strong> {data.genre}
    //               </p>
    //               <p>
    //                 <MdLanguage /> {data.language}
    //               </p>
    //               <p>
    //                 <strong>Pages:</strong> {data.pages}
    //               </p>
    //               <p>
    //                 <strong>Published:</strong> {data.publishedYear}
    //               </p>
    //               <p>
    //                 <strong>Price:</strong>{" "}
    //                 {data.price ? `₹ ${data.price}` : "Free"}
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="container py-4 min-vh-80">
    <div className="row g-4 align-items-center">
      {/* Book Image */}
      <div className="col-12 col-md-4 text-center">
        <img 
          src={data.coverImageUrl} 
          alt={data.title} 
          className="img-fluid rounded shadow" 
          style={{ maxWidth: "100%", height: "auto" }} 
        />
      </div>
  
      {/* Buttons (User & Admin) */}
      {isLoggedIn && (
        <div className="col-12 col-md-3 d-flex flex-column align-items-center gap-3">
          {role === "user" ? (
            <>
              <button className="btn btn-outline-danger d-flex align-items-center" onClick={handleFavorite}>
                <FaHeart className="me-2" /> <span className="d-xm-inline-block ms-2">Favorite</span> 
              </button>
              <button className="btn btn-outline-primary d-flex align-items-center" onClick={handleCart}>
                <FaShoppingCart className="me-2" /> Add to Cart
              </button>
            </>
          ) : (
            <>
              <Link to={`/updateBook/${id}`} className="btn btn-outline-warning d-flex align-items-center">
                <FaEdit className="me-2" /> Edit Book
              </Link>
              <button className="btn btn-outline-danger d-flex align-items-center " onClick={deleteBook}>
                <MdDelete className="me-2" /> Delete Book
              </button>
            </>
          )}
        </div>
      )}
  
      {/* Book Details */}
      <div className="col-12 col-md-5">
        <div className="card p-3 shadow">
          <h2>{data.title}</h2>
          <h5 className="text-muted">By {data.author?.join(", ") || "Unknown"}</h5>
          <p>{data.description}</p>
          <p><strong>Genre:</strong> {data.genre}</p>
          <p><MdLanguage /> {data.language}</p>
          <p><strong>Pages:</strong> {data.pages}</p>
          <p><strong>Published:</strong> {data.publishedYear}</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default BookDetails;
