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
    <p className="fs-4">Loading...</p>
  </div>
);

export default Loader;
