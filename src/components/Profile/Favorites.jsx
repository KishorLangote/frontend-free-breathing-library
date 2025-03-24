
import React, { useEffect, useState } from "react";
import axios from "axios";

const Favorites = () => {
  const [favoriteBooks, setFavoriteBooks] = useState(null);

  const fetchFavorites = async () => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.get(
        "https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/get-favorite-books",
        { headers }
      );
      console.log("response:", response.data);
      setFavoriteBooks(response.data.data);
    } catch (error) {
      console.error("Error fetching favorite books:", error);
    }
  };

  const removeFavorite = async (bookId) => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.put(
        "https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/remove-book-from-favorite",
        { bookId },
        { headers }
      );
      console.log(response.data);
      alert(response.data.message);
      fetchFavorites(); // Re-fetch updated favorite books
    } catch (error) {
      console.error("Error removing book from favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="container">
      {/* Loading state */}
      {favoriteBooks === null && (
        <div
          className="d-flex flex-column align-items-center justify-content-center mt-5"
          style={{ minHeight: "50vh" }}
        >
          <div className="spinner-border text-primary"></div>
          <p className="fs-4 mt-3">Loading...</p>
        </div>
      )}

      {/* No favorites found */}
      {favoriteBooks?.length === 0 && (
        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
          <p className="fs-3 fw-bold">No favorite books found</p>
        </div>
      )}

      {/* Display favorite books */}
      {favoriteBooks?.length > 0 && (
        <>
          <h1 className="text-center fs-3 fw-bold mb-4">Your Favorite Books</h1>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mt-4">
            {favoriteBooks.map((item) => (
              <div key={item._id} className="col">
                <div className="card p-3 text-center shadow-sm">
                  {/* Book Cover */}
                  <img
                    src={item.coverImageUrl}
                    alt={item.title}
                    className="img-fluid mx-auto"
                    style={{
                      maxWidth: "100px",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                  
                  {/* Title */}
                  <h5 className="card-title mt-2 fw-bold">{item.title}</h5>
                  
                  {/* Author */}
                  <p className="card-text">
                    {item.author ? `${item.author.join(", ")}` : `${item.autor}`}
                  </p>

                  {/* Remove Favorite Button */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFavorite(item._id)}
                  >
                    Remove Favorite
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
