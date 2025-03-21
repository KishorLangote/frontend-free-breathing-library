import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const navigate = useNavigate();
  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        "https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/get-user-cart",
        { headers }
      );
      // console.log("Cart Data:", response.data.data);
      setCart(response.data.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchCart();
  }, []); // if cart books state changed then useEffect run once and update the cart list..useEffect runs whenever cart is updated. This ensures that when a book is removed, the component re-renders and reflects the updated cart list.
  // code is working but cart goes into infinite loop. What should i do?
  // Most important here if cart is put it into the useEffect dependency then cart goes to infinite loop so we need to call fetchCart inside the removeBook and as well useEffect
  console.log("Cart state:", cart);

  const removeBook = async (bookId) => {
    try {
      const response = await axios.put(
        `https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/remove-from-cart/${bookId}`,
        {},
        { headers }
      );
      alert(response.data.message);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // calculate total amount..

  useEffect(() => {
    // let totalAmount = cart.reduce((sum, item) => sum + Number(item.price), 0);
    // setTotal(totalAmount);
  }, [cart]); // runs only when cart is updates..

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        "https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/place-order",
        { order: cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if(loading) {
    return (
      <div className="text-center mt-4" style={{minHeight: '80vh', paddingTop: '20px'}}>
        <div className="spinner-border text-primary"></div>
        <p className="fs-4 mt-3">Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mt-5" style={{ minHeight: "100vh" }}>
      {cart.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
          <p className="fs-2 fw-bold">Empty Cart.</p>
        </div>
      ) : (
        <>
          <h1 className="text-center mb-4">Your Cart</h1>
          <div className="d-flex flex-column">
            {cart.map((item) => (
              <div
                key={item._id}
                className="card mb-3 p-3 d-flex flex-row align-items-center w-100 shadow-sm"
              >
                <div className="d-flex align-items-center" style={{ flex: 1 }}>
                  <img
                    src={item.coverImageUrl}
                    alt={item.title}
                    className="img-fluid rounded"
                    style={{
                      width: "120px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  className="d-flex flex-column text-center"
                  style={{ flex: 2 }}
                >
                  <h4 className="mb-1 fw-bold">
                    <strong>Title: </strong>
                    {item.title}
                  </h4>
                  <p className="mb-2">
                    <strong>Author: </strong>
                    {item.author.length > 0
                      ? item.author.join(", ")
                      : item.author}
                  </p>
                  <p className="mb-2">
                    <strong>Genre: </strong>
                    {item.genre}
                  </p>
                  <p className="mb-2">
                    <strong>Language: </strong>
                    {item.language}
                  </p>
                </div>

                <div className="d-flex justify-content-end" style={{ flex: 1 }}>
                  <div className="dd-flex flex-column align-items-center justify-content-center text-center">
                    <button
                      type="submit"
                      className="btn btn-danger fs-5"
                      onClick={() => removeBook(item._id)}
                    >
                      <MdDelete />
                    </button>
                    <p className="mt-3">
                      <strong>Price: </strong>₹ {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {cart.length > 0 && (
        <div className="mb-5 d-flex align-items-center justify-content-between text-center">
          <div className="mb-3 mb-md-0">
            <h1 className="fs-3">Total Book</h1>
            <h2 className="fs-4">
              {cart.length} Books <span className="fw-bold"></span>
            </h2>
          </div>

          <div>
            <button
              className="btn btn-success p-3 fw-bold fs-5 text-light w-100"
              onClick={placeOrder}
            >
              Place Your Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
