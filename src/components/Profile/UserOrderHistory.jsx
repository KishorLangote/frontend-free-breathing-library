import React, { useEffect, useState } from "react";
import axios from "axios";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          "https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/get-order-history",
          { headers }
        );
        console.log(response.data.data);
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderHistory();
  }, []);

  console.log(orderHistory);
  return (
    <div className="container mt-5">
      {orderHistory === null ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center mt-5"
          style={{ minHeight: "50vh" }}
        >
          <div className="spinner-border text-primary"></div>
          <p className="fs-4 mt-3">Loading...</p>
        </div>
      ) : orderHistory.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
          <p className="fs-3 fw-bold">No Orders found.</p>
        </div>
      ) : (
        <>
          <h2 className="text-center fs-3 fw-bold mb-4">Your Order History</h2>
          <div className="table-responsive">
            <table className="table table-bordered text-center shadow">
              <thead className="bg-secondary text-light">
                <tr className="fs-5">
                  <th>Sr.</th>
                  <th>Book</th>
                  <th>Genre</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order, index) => {
                  const book = order.book?.[0]; // get the first book from the arr
                  return (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{book.title || "N/A"}</td>
                      <td>{book.genre || "N/A"}</td>
                      <td>₹{book.price || "0.00"}</td>
                      <td className="text-success fw-bold ">
                        {order.status || "Pending"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default UserOrderHistory;
