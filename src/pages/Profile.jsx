import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Profile/Sidebar';
import axios from 'axios';
import MobileNav from '../components/Profile/MobileNav';


const Profile = () => {
  const [profile, setProfile] = useState([]);
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("https://kishor-langote-backend-free-breathing-library.vercel.app/api/v1/get-user-information", 
          { headers }
        );
        // console.log("dATA:", response.data);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="container py-4" style={{ minHeight: '100vh'}}>
      {profile && (
        <div className="row">
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <Sidebar data={profile} />
            <MobileNav />
          </div>
          <div className="col-12 col-md-9">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

