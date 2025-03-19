import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Settings = () => {
const [value, setValue] = useState({ address: ""})
const [profileData, setProfileData] = useState("")

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/get-user-information", { headers });
            setProfileData(response.data);
            setValue({ address: response.data.address });
            // console.log(response.data)
            // console.log({ address: response.data.address })
          } catch (error) {
            console.error("Error fetching user data:", error);
          } 
        };
        fetchData();
      }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };
  
    
      const handleUpdate = async () => {
        try {
           const response = await axios.put("https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/update-address", value, { headers });
          // console.log(response)
          // console.log(response.data.address)
          alert("Profile updated successfully!");
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      };
    

  return (

   
    <div className='container py-4'>
       { !profileData && (
         <div
         className="d-flex flex-column align-items-center justify-content-center mt-5"
         style={{ minHeight: "50vh" }}
        >
         <div className="spinner-border text-primary"></div>
         <p className="fs-4 mt-3">Loading...</p>
       </div>
       )}
      {profileData && (
        <div>
          <h1 className='mb-4'>Setting</h1>
          <div className='fs-5'>
            <div className='d-flex gap-3'>
              <label className='fw-bold'>Username:</label>
              <p>{profileData.username}</p>
            </div>
            <div className='d-flex gap-3'>
              <label className='fw-bold'>Email:</label>
              <p>{profileData.email}</p>
            </div>
            <div>
              <label className='fw-bold mb-3'>Address:</label> <br />
             <textarea
             className='p-3 form-control mb-4'
             rows="2"
             cols="5"
             placeholder='Enter here address...'
             name="address"
             value={value.address}
             onChange={handleChange}
             style={{width: '400px', height: '150px'}}
             />
            </div>
            <div>
              <button className='btn btn-info text-light fw-bold'
              onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
