import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

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
      // re-fetch the updated favorite books from the server
      fetchFavorites();
    } catch (error) {
      console.error("Error removing book from favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    //   <div>

    //     {!favoriteBooks.length &&
    // <div className="d-flex justify-content-center align-items-center">
    //   <Loader />
    // </div>}

    //     {favoriteBooks.length === 0 ? (
    //       <div className="d-flex flex-column align-items-center justify-content-center mt-5">
    //         <p className="fs-2 fw-bold">No favorite books found.</p>
    //       </div>
    //     ) : (
    //       <>
    //         <h1 className="text-center mb-4">Your Favorite Books</h1>
    //         <div className="row row-cols-1 row-cols-md-3 g-4">
    //           {favoriteBooks.map((item) => (
    //             <div key={item._id} className="col">
    //               <div className="card p-3">
    //                 <img src={item.coverImageUrl} />
    //                 <h5 className="card-title text-center mt-2 fs-4 fw-bold">{item.title}</h5>
    //                 <p className="card-text text-center ">{item.author ? `${item.author.join(", ")}` : `${item.autor}`} </p>
    //                 <button
    //                   className="btn btn-danger"
    //                   onClick={() => removeFavorite(item._id)}
    //                 >
    //                   Remove Favorites
    //                 </button>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </>
    //     )}
    //   </div>
    <div>
      {favoriteBooks === null && (
        <div
          className="d-flex flex-column align-items-center justify-content-center mt-5"
          style={{ minHeight: "50vh" }}
         >
          <div className="spinner-border text-primary"></div>
          <p className="fs-4 mt-3">Loading...</p>
        </div>
      )}

      {favoriteBooks?.length === 0 && (
        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
          <p className="fs-2 fw-bold">No favorite books found.</p>
        </div>
      )}

      {favoriteBooks?.length > 0 && (
        <>
          <h1 className="text-center mb-4">Your Favorite Books</h1>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {favoriteBooks.map((item) => (
              <div key={item._id} className="col">
                <div className="card p-3">
                  <img src={item.coverImageUrl} />
                  <h5 className="card-title text-center mt-2 fs-4 fw-bold">
                    {item.title}
                  </h5>
                  <p className="card-text text-center">
                    {item.author
                      ? `${item.author.join(", ")}`
                      : `${item.autor}`}
                  </p>
                  <button
                    className="btn btn-danger"
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
