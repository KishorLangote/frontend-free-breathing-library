import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

const AllOrder = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true); // set loading before fetching data
        const response = await axios.get(
          "https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/get-all-orders",
          { headers }
        );
        // console.log("API Response:", response.data);
        setAllOrder(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrder();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await axios.put(
        `https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/update-status/${orderId}`,
        { status },
        { headers }
      );
      // console.log(response.data.data);
      alert(response.data.message);
      setAllOrder((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading === true) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="fs-4 mt-3">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {allOrder.length === 0 ? (
        <div className="text-center mt-5">
          <p className="fs-2 fw-bold">No Orders Found.</p>
        </div>
      ) : (
        <>
          <h2 className="text-center mb-4">Book Order History</h2>
          <div className="table-responsive">
            <table className="table table-bordered text-center shadow">
              <thead className="bg-secondary text-light">
                <tr className="fs-5">
                  <th>Sr.</th>
                  <th>Book</th>
                  <th>Genre</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>
                    <FaUser />
                  </th>
                </tr>
              </thead>
              <tbody>
                {allOrder.map((order, index) => {
                  const book = order.book?.[0] || {}; // handle missing book case
                  return (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{book.title || "N/A"}</td>
                      <td>{book.genre || "N/A"}</td>
                      <td>₹{book.price || "0.00"}</td>
                      <td className="text-success fw-bold">
                        <select
                          className="form-select"
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Out for delivery">
                            Out for delivery
                          </option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td>{order.user?.email || "N/A"} </td>
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

export default AllOrder;
