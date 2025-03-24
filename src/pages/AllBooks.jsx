import React, { useState } from "react";
import BookCard from "../components/BookCard/BookCard";
import { useEffect } from "react";
import axios from "axios";
import { IoFilter } from "react-icons/io5";
import Pagination from "../components/Pagination/Pagination";

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [filterGenre, setFilterGenre] = useState("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchedData = async (page = 1) => {
      const response = await axios.get(
        `https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/get-all-books`
      );
      console.log("Response:", response.data.books);
      setData(response.data.books);
    };
    fetchedData();
  }, [filterGenre]);

  const filteredGenre =
    filterGenre === "All"
      ? data
      : data?.filter((book) => book.genre === filterGenre);

  console.log(filteredGenre);

  const genreHandler = (e) => {
    setFilterGenre(e.target.value);
  };

  const SelectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(filteredGenre.length / 9) &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return data ? (
    <div className="container py-3" style={{ minHeight: "80vh" }}>
      <div className="row mb-5">
        <div className="col-6">
          <h1 className=" fs-3">All Books</h1>
        </div>

        <div className="col-6">
          <div className="row d-flex align-items-center justify-content-center text-center mx-5 px-5 fs-5">
            <div className="col-6">
              <label>
                {" "}
                <IoFilter /> Filter
              </label>
            </div>
            <div className="col-6">
              <select
                className="form-select form-control text-center fs-5 border"
                value={filterGenre}
                onChange={genreHandler}
              >
                <option value="All">All</option>
                <option value="Educational">Educational</option>
                <option value="Business">Business</option>
                <option value="Philosophical">Philosophical</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Environment">Environment</option>
                <option value="Poetry">Poetry</option>
                <option value="History">History</option>
                <option value="Social">Social</option>
                <option value="Psychological">Psychological</option>
                <option value="Stories">Stories</option>
                <option value="Autobiography">Autobiography</option>
                <option value="Art & Culture">Art & Culture</option>
                <option value="Technology & Society">
                  Technology & Society
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {data.length === 0 && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="text-center mt-5">
            <div className="spinner-border text-primary"></div>
            <p className="fs-4 mt-3">Loading books...</p>
          </div>
        </div>
      )}
      <div className="text-center page-container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          {data &&
            filteredGenre.slice((page - 1) * 9, page * 9).map((book) => (
              <div key={book._id} className="fs-4">
                {<BookCard data={book} />}
              </div>
            ))}
        </div>

       {/* pagination */}
       <Pagination
         page={currentPage} 
         totalPages={Math.ceil(filteredGenre.length / 9)}
         onPageChange={SelectPageHandler}
       />
      </div>
    </div>
  ) : (
    <p>data not fetch</p>
  );
};

export default AllBooks;
