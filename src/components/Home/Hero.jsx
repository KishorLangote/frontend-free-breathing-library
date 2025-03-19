import React from 'react';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="container py-3">
      <div className="row align-items-center text-center text-md-start mb-5" style={{ width: "100%", height: "100%"}}>
        
        {/* Text Section */}
        <div className="col-12 col-md-6">
          <h1 className="fw-bold display-4">Discover Your Next Great Read</h1>
          <p className="mt-4 fs-5">
            Expand your mind, nourish your soul. Explore a library where stories breathe freely. A library without limits discover the joy of reading, anytime, anywhere...
          </p>
          <div className="mt-5">
            <Link to="/all-books" className="bg-btn fw-bold fs-5 px-4 py-3">
              Discover Books
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-12 col-md-6 mt-4 mt-md-0">
          <img
            src="https://res-console.cloudinary.com/dzuydzr7l/thumbnails/v1/image/upload/v1741216590/aGVyby1jdXJyZW50LWxvZ29feGdocmFk/drilldown"
            alt="hero-logo"
            className="img-fluid rounded"
            style={{ objectFit: "cover", width: "100%", maxHeight: "600px" }}
          />
        </div>

      </div>
      <hr />
    </div>
  );
};

export default Hero;

