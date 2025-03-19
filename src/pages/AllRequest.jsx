import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

const AllRequest = () => {
  const [allRequest, setAllRequest] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(
          "https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/get-all-requests",
          { headers },
          
        );
        // console.log(response.data);
        setAllRequest(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchRequest();
  }, []);

  return (
    // <div className="container mt-5 mx-auto">
    //   {!allRequest ? (
    //     <div className="text-center mt-5">
    //       <div className="spinner-border text-primary"></div>
    //       <p className="fs-4 mt-3">Loading request...</p>
    //     </div>
    //   ) : allRequest.length === 0 ? (
    //     <div className="text-center mt-5">
    //       <p className="fs-2 fw-bold">No Request Found.</p>
    //     </div>
    //   ) : (
    //     <>
    //       <h2 className="text-center mb-4">Book Request History</h2>
    //       <div className="table-responsive">
    //         <table className="table table-bordered text-center shadow">
    //           <thead className="bg-secondary text-light">
    //             <tr className="fs-5">
    //               <th>Sr.</th>
    //               <th>Title</th>
    //               <th>Author</th>
    //               <th>Genre</th>
    //               <th>Publication</th>
    //               <th>Language</th>
    //               <th>
    //                 <FaUser />
    //               </th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {allRequest?.map((request, index) => {
    //               return (
    //                 <tr key={request._id}>
    //                   <td>{index + 1}</td>
    //                   <td>{request.title || "N/A"}</td>
    //                   <td>{request.author || "N/A"}</td>
    //                   <td>{request.genre || "0.00"}</td>
    //                   <td>{request.publication || "N/A"}</td>
    //                   <td>{request.language || "N/A"}</td>
    //                   <td>{request.user.email || "N/A"}</td>
    //                 </tr>
    //               );
    //             })}
    //           </tbody>
    //         </table>
    //       </div>
    //     </>
    //   )}
    // </div>
    <div className="container mt-5 mx-auto">
          {allRequest?.length === 0 ? (
            <div className="text-center mt-5">
              <p className="fs-2 fw-bold">No Requests Found.</p>
            </div>
          ) : (
            <>
              <h2 className="text-center mb-4">Book Request History</h2>
              <div className="table-responsive">
                <table className="table table-bordered text-center shadow">
                  <thead className="bg-secondary text-light">
                    <tr className="fs-5">
                      <th>Sr.</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Genre</th>
                      <th>Publication</th>
                      <th>Language</th>
                      <th><FaUser/></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRequest?.map((request, index) => {
                      return (
                        <tr key={request._id}>
                          <td>{index + 1}</td>
                          <td>{request.title || "N/A"}</td>
                          <td>{request.author || "N/A"}</td>
                          <td>{request.genre || "0.00"}</td>
                          <td>{request.publication || "N/A"} </td>
                          <td>{request.language || "N/A"} </td>
                          <td>{request.user.email || "N/A"} </td>
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

export default AllRequest;
