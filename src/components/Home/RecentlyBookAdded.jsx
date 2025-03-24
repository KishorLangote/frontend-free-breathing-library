import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";


const RecentlyBookAdded = ({ searchTerm }) => {
  const [data, setData] = useState([]);
  
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/get-recent-books"
      );
      setData(response.data.data); 
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const searchedBooks = data?.filter((book) => {
    if (!searchTerm) return true; // show all books if no search term..

    const title =
      typeof book?.title === "string"
        ? book.title.normalize("NFC").toLowerCase()
        : "";

    const author =
      typeof book?.author === "string"
  ? book.author.normalize("NFC").toLowerCase()
        : "";

    return (
      title.includes(searchTerm.normalize("NFC").toLowerCase()) ||
      author.includes(searchTerm.normalize("NFC").toLowerCase())
    );
  });



  return (
    <div className="container-fluid align-top mx-auto mb-5">
      {!data.length ? (
        <div className="text-center mt-5">
        <div className="spinner-border text-primary" >
        </div>
        <p className="fs-4 mt-3">Loading...</p>
      </div>
      ) : (
        <div className="container-fluid">
           <h2>Recently added books 📚</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-4">
            {searchedBooks.map((book) => (
              <div key={book._id}>
                <BookCard data={book} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentlyBookAdded;
