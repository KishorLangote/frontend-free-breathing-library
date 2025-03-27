import React from "react";

const Contact = () => {
  return (
    <div className="container mt-5 mb-5" style={{ minHeight: '60vh'}}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4"> 📧 Contact Us</h2>
            <p className="text-center">
              Reach out to us for any inquiries, suggestions, or support.
            </p>

            <div className="mt-4 text-center">
              <h5>📍 Address</h5>
              <p> Subhash HGS Society, Pune</p>

              <h5>✉️ Email</h5>
              <p>freebreathing.contact@gmail.com</p>

              <h5>⏰ Working Hours</h5>
               <p>Monday - Saturday: Closed</p> 
              {/* <p>Saturday: 10 AM - 4 PM</p>  */}
              <p>Sunday: 10 AM - 6 PM</p>
            </div>


            <div>
              <p className="text-center mt-4 fw-bold fs-5">Read Books 📚 Your Space | Educate Every Child</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
