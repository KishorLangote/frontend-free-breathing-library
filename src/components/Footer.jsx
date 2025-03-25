
import React from "react";
import { Link } from "react-router-dom";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { GrLinkedin } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-top py-5 bg-info text-dark" >
      <div className="container">
        <div className="row g-4 text-center text-md-start ">
          {/* newsletter section */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-bold mb-3">Newsletter</h5>
            <p>
              Be the first to hear about new books, exclusive events, and more.
            </p>
            <p >
              Sign up and get your favorite book on your first order.
            </p>
           
          </div>

          {/* read section */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-bold mb-3">Read</h5>
            <ul className="list-unstyled">
              <li><Link to="#" className="text-decoration-none text-dark">e-Books</Link></li>
              <li><Link to="#" className="text-decoration-none text-dark">Simply Sketchy Cartoons</Link></li>
              <li><Link to="#" className="text-decoration-none text-dark">Fictions/Non-Fiction</Link></li>
              <li><Link to="#" className="text-decoration-none text-dark">Nobel Literatures</Link></li>
            </ul>
          </div>

          {/* support section */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-bold mb-3">Support</h5>
            <ul className="list-unstyled">
              <li><Link to="/contact" className="text-decoration-none text-dark">Contact Us</Link></li>
              <li><Link to="/about" className="text-decoration-none text-dark">About Us</Link></li>
              <li><Link to="#" className="text-decoration-none text-dark">FAQs</Link></li>
              <li><Link to="#" className="text-decoration-none text-dark">Features</Link></li>
            </ul>
          </div>

          {/* social media and contact */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mb-3">
              <a href="https://www.linkedin.com/in/kishorlangote/" target="_blank" rel="noopener noreferrer" className="text-dark">
                <GrLinkedin size={24} /> 
              </a>
              <a href="https://github.com/KishorLangote" target="_blank" rel="noopener noreferrer" className="text-dark">
                <FaGithub size={24} />
              </a>
              <a href="https://x.com/FreeBreathing0" target="_blank" rel="noopener noreferrer" className="text-dark">
                <RiTwitterXLine size={24} />
              </a>
            </div>
            <p className="mb-1">Call Us</p>
            <p className="fw-bold"><FiPhoneCall className="me-2" /> +91</p>
          </div>
        </div>

        {/* footer bottom */}
        <div className="border-top pt-3 mt-4 text-center">
          <p className="text-dark small">
            &copy; 2025 | Free Breathing. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;