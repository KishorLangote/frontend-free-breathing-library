import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const MobileNav = () => {
const role = useSelector((state) => state.auth.role)
console.log("Role:", role)

  return (
    <>
    {role === "user" && (
      <div className='container d-none d-flex align-items-center justify-content-between py-4'>
      <Link to="/profile" className="py-4 text-decoration-none text-black">
          Favorites 
        </Link>
        <Link
          to="/profile/orderHistory"
          className="py-4 text-decoration-none text-black"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="py-4  text-decoration-none text-black"
        >
          Setting
        </Link>
    </div>
    ) }

{role === "admin" && (
      <div className='container d-none d-flex align-items-center justify-content-between py-4'>
      <Link to="/profile" className="py-4 text-decoration-none text-black">
          All Orders
        </Link>
        <Link
          to="/profile/add-book"
          className="py-4 text-decoration-none text-black"
        >
          Add Book
        </Link>
    </div>
    ) }
    </>
  )
}

export default MobileNav
