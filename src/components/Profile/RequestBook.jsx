import { useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const RequestBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publication: "",
    genre: "",
    language: "",
    reason: "",
  });

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // get the value from input..
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("id");
  
    const updatedFormData = { ...formData, userId }; // add userId to form data
  
    try {
      const response = await axios.post(
        "https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/request-book",
        updatedFormData, // send form data with userId
        { headers }
      );
   
      setFormData({
        title: "",
        author: "",
        publication: "",
        genre: "",
        language: "",
        reason: "",
      })
      alert(response.data.message)
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container py-2">
      {!formData && (
        <div className='d-flex justify-content-center align-items-center' style={{minHeight: '50vh'}}>
                  <Loader />
                </div>
      )}
      <h1 className="mb-4 fs-3 fw-bold">Request Book</h1>
      <form 
      onSubmit={handleSubmit}
      className="fs-5"
      >

      <div>
        <label>Title: </label>
        <input 
        className="form-control"
        type="text"
        name="title" 
        value={formData.title} 
        onChange={handleChange} 
        required 
      />
      </div>
      <br />

      <div>
        <label>Author: </label>
      <input 
        className="form-control"
        type="text" 
        name="author" 
        value={formData.author} 
        onChange={handleChange} 
        required 
      />
      </div>
      <br />

      <div>
        <label>Publication: </label>
      <input 
        className="form-control"
        type="text" 
        name="publication" 
        value={formData.publication} 
        onChange={handleChange} 
        required 
      />
      </div>
      <br />

      <div>
        <label>Genre: </label>
      <input 
        className="form-control"
        type="text" 
        name="genre" 
        value={formData.genre} 
        onChange={handleChange} 
        required 
      />
      </div>
      <br />

      <div>
        <label>Language: </label>
      <input 
        className="form-control"
        type="text" 
        name="language" 
        value={formData.language} 
        onChange={handleChange} 
        required 
      />
      </div>
      <br />

      <div>
      <label>Reason: </label>
      <textarea 
       className="form-control"
        name="reason" 
        rows="7"
        cols="30"
        placeholder="Why do you need this book?" 
        value={formData.reason} 
        onChange={handleChange} 
        required 
      />
      </div>
      <br />
      <button 
      type="submit"
      className="btn btn-info text-light fw-bold p-2 fs-5"
      >Submit</button>
    </form>
    </div>
  );
};

export default RequestBook;
