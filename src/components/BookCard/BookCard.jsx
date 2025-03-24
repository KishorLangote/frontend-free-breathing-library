
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const BookCard = ({ data, favorites }) => {
  const [removedBook, setRemovedBook] = useState([])
  if (!data) return null; // prevent rendering if data is undefined

  
  const handleRemoveBook = async () => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        
      };
      console.log(headers)
      const response = await axios.put(
       "https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/remove-book-from-favorite", 
        {bookId: data._id}, 
        { headers }
      );
      setRemovedBook(response.data.message);
      alert(response.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container-fluid p-2">
      <Link to={`/book-details/${data._id}`} className='text-decoration-none' style={{ color: "black" }}>
        <div className=' border-light rounded p-3'>
          <img src={data.coverImageUrl} className="img-fluid rounded shadow" style={{ objectFit: "cover", width: '80%', minHeight: "200px" }} />
          <div>
            <p className="fs-4 mt-3 fw-semibold">{data.title}</p>
            <p className='fs-5'>by {data.author.join(", ")}</p>
            <p>₹ {data.price}</p>
          </div>
        </div>
      </Link>
      {favorites && (
        <button className='btn btn-info text-light fw-semibold fs-5 mt-2 w-100' onClick={handleRemoveBook}>
          Remove from favorites
        </button>
      )}
    </div>
  );
};

export default BookCard;
