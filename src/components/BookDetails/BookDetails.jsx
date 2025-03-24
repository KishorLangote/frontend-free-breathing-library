import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
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
          `http://localhost:3000/api/v1/get-book-by-id/${id}`
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

  if (!data) return <Loader />; // Show loader if data is not available

  // add book in favorites:
  const handleFavorite = async (e) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/add-book-to-favorite",
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
        "http://localhost:3000/api/v1/add-to-cart",
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
      `http://localhost:3000/api/v1/delete-book/${id}`,
      { headers }
    );
    alert(response.data.message);
    nevigate("/all-books");
  };
  return (
    <div className="container-fluid py-4 min-vh-80">
      <div className="row g-4 align-items-center mb-4 py-4">
        {/* Book Image */}
        <div className="col-12 col-md-4 text-center">
          <img
            src={data.coverImageUrl}
            alt={data.title}
            className="img-fluid rounded shadow"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        {/* Buttons (user & admin) */}
        {isLoggedIn && (
          <div className="col-12 col-md-3 d-flex flex-column align-items-center gap-3">
            {role === "user" ? (
              <>
                <button
                  className="btn btn-outline-danger d-flex align-items-center"
                  onClick={handleFavorite}
                >
                  <FaHeart className="me-2" />{" "}
                  <span className="d-xm-inline-block ms-2">Favorite</span>
                </button>
                <button
                  className="btn btn-outline-primary d-flex align-items-center"
                  onClick={handleCart}
                >
                  <FaShoppingCart className="me-2" /> Add to Cart
                </button>
              </>
            ) : (
              <>
                <Link
                  to={`/updateBook/${id}`}
                  className="btn btn-outline-warning d-flex align-items-center"
                >
                  <FaEdit className="me-2" /> Edit Book
                </Link>
                <button
                  className="btn btn-outline-danger d-flex align-items-center "
                  onClick={deleteBook}
                >
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
            <h5 className="text-muted">
              By {data.author?.join(", ") || "Unknown"}
            </h5>
            <p>{data.description}</p>
            <p>
              <strong>Genre:</strong> {data.genre}
            </p>
            <p>
              <MdLanguage /> {data.language}
            </p>
            <p>
              <strong>Pages:</strong> {data.pages}
            </p>
            <p>
              <strong>Published:</strong> {data.publishedYear}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
