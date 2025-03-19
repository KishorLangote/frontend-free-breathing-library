import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim()); // pass the search term to the parent component
  };

  const clearSearch = () => {
    setSearchTerm(""); // reset search input
    onSearch(""); // reset the search results
  };

  return (
    <div className="container py-5">
      <form onSubmit={handleSearch} className="d-flex align-items-center">
        <input
          className="form-control me-2 p-3 fs-5"
          type="text"
          placeholder="Search book by name or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={clearSearch}
          >
            <HiMiniXMark />
          </button>
        )}
        <button type="submit" className="bg-login fw-bold text-light ms-2 fs-4">
          <HiMagnifyingGlass />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
