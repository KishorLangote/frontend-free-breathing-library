import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mt-5 mb-5" style={{ minHeight: "60vh" }}>
      <p className="fw-bold fs-3 text-center mb-5">
        With Free Breathing Open Library, we dream of a world where knowledge is
        free, limitless, and accessible to all. 🌍📖
      </p>

      <div className="row d-flex justify-content-center mb-4">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="text-center fw-bold fs-4">Notice ⚠️</h5>
              <ol>
                <li>Read Books in Your Own Space.</li>
                <li>Do not rest your head on the book. </li>
                <li>
                  Do not fold the pages or the book; use bookmarks instead.
                </li>
                <li>
                  {" "}
                  Do not close the book with a pen, pencil, or any other object,
                  as it may loosen the binding.
                </li>
                <li>Do not handle books with wet or oily hands.</li>
                <li> Keep books protected from food, oil, water, and ink. </li>
                <li>
                  Do not underline sentences just because they are important.
                </li>
                <li>Books should not be read while folded.</li>
                <li>
                  Customers should use both hands to take books out of the
                  closet.
                </li>
                <li>
                  Do not pull the book forcefully, as it may catch the cover of
                  another book and cause tearing.
                </li>
              </ol>
              <p className="text-center">
                <Link
                  to="/all-books"
                  class="btn btn-info text-light fw-bold p-2 px-3"
                >
                  Descover Books
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div class="row g-3">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <div class="card p-3 shadow">
              <div class="card-body">
                <h5 class="card-title fw-bold fs-4">Free Breathing Library</h5>
                <p class="card-text">
                  {" "}
                  Our mission is to educate every child and provide books for
                  reading on various topics. Through this initiative, we aim to
                  bridge educational gaps, promote literacy, and empower
                  communities.
                </p>
                <p class="card-text">
                  We believe education extends beyond conventional boundaries.
                  We explore innovative learning approaches to make education
                  more accessible, inclusive, and impactful for people from all
                  walks of life.
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-6 mb-5">
            <div class="card p-3 shadow">
              <div class="card-body">
                <h5 class="card-title fw-bold fs-4">
                  Our Vision for the Future
                </h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <p>
                  <strong>🚀 Digital Library Expansion: </strong>Making books
                  available online for easy access anytime, anywhere.
                </p>
                <p>
                  <strong>📚 Book Request & Donation System: </strong>Allowing
                  readers to request books and donors to contribute to the
                  cause.
                </p>
                <p>
                  <strong>🌎 Global Outreach: </strong>Collaborating with
                  educators and libraries worldwide to share knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
