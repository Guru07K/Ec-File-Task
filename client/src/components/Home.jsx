import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1 className='text-2xl text-center my-10'>Welcome to Ecfile</h1>
      
      <div className="flex gap-3 justify-center my-5">
         <Link to={'/signup'} className='bg-slate-600 p-3 rounded-lg text-white' > User </Link>
         <Link to={'/adminpanel'} className='bg-slate-600 p-3 rounded-lg text-white' >Admin</Link>
      </div>
    </div>
  )
}

export default Home