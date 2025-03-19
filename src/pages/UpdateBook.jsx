import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const [data, setData] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    publisher: "",
    bookType: "",
    price: "",
    description: "",
    language: "",
    pages: "",
    isbn: "",
    totalCopies: "",
    availableCopies: "",
    condition: "",
    section: "",
    coverImageUrl: "",
  });
 
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const { id } = useParams()
  const navigate = useNavigate()

  // input changes..
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }; 
  
  
  // conditon radio btn changes..
  const conditionHandler = (e) => {
    const value = e.target.value;
    setData({ ...data, condition: value });
  };

  
  const submitFormHandler = async (e) => {
    e.preventDefault(); 
    try {
      if(data.title === "" ||
        data.author === "" ||
        data.genre === "" ||
        data.publishedYear === "" ||
        data.publisher === "" ||
        data.bookType === "" ||
        data.price === "" ||
        data.description === "" ||
        data.pages === "" ||
        data.isbn === "" ||
        data.totalCopies === ""||
        data.availableCopies === "" ||
        data.section === "" ||
        data.coverImageUrl === "" ||
        data.condition === "" ||
        data.language === ""
     ) {
       alert("All fields are required");
     } else {
       const response = await axios.put(`https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/update-book/${id}`,
        data,
        { headers }
       );
       setData({
        title: "",
        author: "",
        genre: "",
        publishedYear: "",
        publisher: "",
        bookType: "",
        price: "",
        description: "",
        language: "",
        pages: "",
        isbn: "",
        totalCopies: "",
        availableCopies: "",
        condition: "",
        section: "",
        coverImageUrl: "",
      })
      alert(response.data.message)
      navigate(`/book-details/${id}`)
     }
    } catch (error) {
      alert(error.response.data.message)
    }
  
  };
  
  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get(
          `https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/get-book-by-id/${id}`,
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchedData();
  }, []);

  return (
    <div className="container py-4 p-4">
      <h1>Update Book</h1>

      <form onSubmit={submitFormHandler} className="mb-3 ">
        <div>
          <label htmlFor="titleInput" className="mb-2">
            Title
          </label>
          <input
            type="text"
            id="titleInput"
            name="title"
            value={data.title}
            className="form-control"
            onChange={changeHandler}
            required
          />
        </div>
        <br />

        <div>
          <label htmlFor="authorInput" className="mb-2">
            Author:
          </label>
          <input
            type="text"
            id="authorInput"
            name="author"
            value={data.author}
            className="form-control"
            onChange={changeHandler}
            required
          />
        </div>
        <br />

        <div>
          <label htmlFor="genreInput" className="mb-2">
            Genre:
          </label>
          <input
            id="genreInput"
            name="genre"
            value={data.genre}
            onChange={changeHandler}
            className="form-control"
            required
          ></input>
        </div>
        <br />

        <div>
          <label htmlFor="publishedYearInput" className="mb-2">
            Published Year:
          </label>
          <input
            type="number"
            id="publishedYearInput"
            name="publishedYear"
            value={data.publishedYear}
            onChange={changeHandler}
            className="form-control"
            required
          ></input>
        </div>
        <br />

        <div>
          <label htmlFor="publisherInput" className="mb-2">
            Publisher:
          </label>
          <input
            type="text"
            id="publisherInput"
            name="publisher"
            value={data.publisher}
            onChange={changeHandler}
            className="form-control"
            required
          ></input>
        </div>
        <br />

        <div>
          <label htmlFor="selectType" className="mb-2">
            Book Type:
          </label>
          <select
            id="selectType"
            name="bookType"
            value={data.bookType}
            onChange={changeHandler}
            className="form-control"
            required
          >
            <option value="">Select Type</option>
            <option value="hardcopy">Hardcopy</option>
            <option value="pdf">Pdf</option>
          </select>
        </div>
        <br />

        <div>
          <label htmlFor="priceInput" className="mb-2">
            Price:
          </label>
          <input
            type="text"
            id="priceInput"
            name="price"
            value={data.price}
            onChange={changeHandler}
            className="form-control"
            required
          ></input>
        </div>
        <br />

        <div>
          <label htmlFor="descriptionTextInput" className="mb-2">
            Description:
          </label>{" "}
          <br />
          <textarea
            id="descriptionTextInput"
            type="text"
            rows="7"
            cols="90"
            name="description"
            value={data.description}
            onChange={changeHandler}
            className="form-control"
            required
          />
        </div>
        <br />

        <div>
          <label htmlFor="pagesInput" className="mb-2">
            Pages:
          </label>
          <input
            type="number"
            id="pagesInput"
            name="pages"
            value={data.pages}
            onChange={changeHandler}
            className="form-control"
            required
          ></input>
        </div>
        <br />

        <div>
          <label htmlFor="languageInput" className="mb-2">
            Language:
          </label>
          <input
            type="text"
            id="languageInput"
            name="language"
            value={data.language}
            onChange={changeHandler}
            className="form-control"
            required
          ></input>
        </div>
        <br />

        <div>
          <label htmlFor="isbnInput" className="mb-2">
            ISBN:
          </label>
          <input
            type="text"
            id="isbnInput"
            name="isbn"
            value={data.isbn}
            onChange={changeHandler}
            className="form-control"
            required
          ></input>
        </div>
        <br />

        <div>
          <label htmlFor="totoalCopiesInput" className="mb-2">
            Total Copies:
          </label>
          <input
            type="number"
            id="totoalCopiesInput"
            name="totalCopies"
            value={data.totalCopies}
            onChange={changeHandler}
            className="form-control"
            required
          ></input>
        </div>
        <br />

        <div>
          <label htmlFor="availableCopiesInput" className="mb-2">
            Available Copies:
          </label>
          <input
            type="number"
            id="availableCopiesInput"
            name="availableCopies"
            value={data.availableCopies}
            onChange={changeHandler}
            className="form-control"
            required
          ></input>
        </div>
        <br />

        <div>
          <label htmlFor="condition">Condition:</label>
          <div>
            <input
              type="radio"
              name="condition"
              value="new"
              id="new"
              checked={data.condition === "new"}
              onChange={conditionHandler}
            />{" "}
            <label htmlFor="new">New</label>
          </div>

          <div>
            <input
              type="radio"
              name="condition"
              value="used"
              id="used"
              checked={data.condition === "used"}
              onChange={conditionHandler}
            />{" "}
            <label htmlFor="used">Used</label>
          </div>

          <div>
            <input
              type="radio"
              name="condition"
              value="good"
              id="good"
              checked={data.condition === "good"}
              onChange={conditionHandler}
            />{" "}
            <label htmlFor="good">Good</label>
          </div>
        </div>
        <br />
      
        <br />

        <div>
          <label htmlFor="sectionInput" className="mb-2">
            Section:
          </label>
          <input
            type="text"
            id="sectionInput"
            name="section"
            value={data.section}
            onChange={changeHandler}
            className="form-control"
            required
          ></input>
        </div>
        <br />

        <div>
          <label htmlFor="coverImageUrlInput" className="mb-2">
            Cover Image URL:
          </label>
          <input
            type="text"
            name="coverImageUrl"
            id="coverImageUrlInput"
            value={data.coverImageUrl}
            className="form-control"
            onChange={changeHandler}
            required
          ></input>
        </div>
        <br />

        <button type="submit" className="btn btn-info text-light">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
