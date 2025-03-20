import React from "react";

const Loader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100px", 
      paddingTop: "20px", 
    }}
  >
    <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="fs-4 mt-3">Loading...</p>
      </div>
  </div>
);

export default Loader;
