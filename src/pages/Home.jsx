import React, { useState } from 'react'
import Hero from '../components/Home/Hero'
import RecentlyBookAdded from '../components/Home/RecentlyBookAdded'
import SearchBar from '../components/SearchBar'


const Home = () => { 
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className='container-fluid'>
      {/* pass setSearcjTerm to update search */}
       <SearchBar onSearch={setSearchTerm} /> 
       <Hero />
       {/* pass searchTerm to filter book */}
       <RecentlyBookAdded searchTerm={searchTerm} />
      
    </div>
  )
}

export default Home
