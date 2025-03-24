import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange}) => {
  return (
    <div className="row">
    <div className="pagination container mt-3 d-flex flex-wrap justify-content-center align-items-center gap-2">
      {/* prev btn */}
      <span
        onClick={() => onPageChange(currentPage - 1)}
        className={`pagination-btn ${
          currentPage > 1 ? "" : "pagination__disable"
        }`}
      >
        Prev
      </span>

      {/* page nums */}
      {[...Array(totalPages)].map((_, index) => (
        <span
          className={`pagination-btn ${
            currentPage === index + 1 ? "pagination__selected" : ""
          }`}
          onClick={() => onPageChange(index + 1)}
          key={index}
        >
          {index + 1}
        </span>
      ))}

      {/* next btn */}
      <span
        onClick={() => onPageChange(currentPage + 1)}
        className={`pagination-btn ${
          currentPage < totalPages
            ? ""
            : "pagination__disable"
        }`}
      >
        Next
      </span>
    </div>
  </div>
  )
}

export default Pagination;
