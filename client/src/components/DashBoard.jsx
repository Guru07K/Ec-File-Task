import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';


const DashBoard = () => {

  const [users, setUsers] = useState()
  const navigate = useNavigate()
  

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
   
    
    if(!token) {
      alert('Admin can only view this')
      return
    }else{
      await fetch('/ecfile/admin/getusers')
            .then(res => res.json()) 
            .then(data => {
             if(data.success) {
               setUsers(data.verifiedUsers)
             }
            })
    }
  }

  const LogoutAdmin = () => {
    Cookies.remove('token')
    localStorage.removeItem('token')
    navigate('/')
  } 


  return (
    <div className="flex flex-col items-center p-8">
      <div className='max-w-lg mx-auto mt-10'>
          <h1 className='text-center text-4xl'>Welcome</h1>
          <p className='mt-6'>ONLY ADMIN CAN SEE THIS</p>
          <div className="bg-green-700 p-3 rounded-lg text-center text-white my-5 hover:opacity-80 cursor-pointer">
              <button onClick={fetchUser}>Click to see all records</button>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg text-center text-white my-5 hover:opacity-80 cursor-pointer">
              <button onClick={LogoutAdmin}>Logout</button>
          </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-4 ml-4  '>
        { users && users.map((user, i) => (
          <div key={i} className='p-3 border-2 bg-slate-500 mx-auto'>
            <div >
              <img className="w-full h-64 object-cover rounded-lg shadow-2xl shadow-gray-950" src={user.image.url} alt="" />
            </div>
            <div className="text-white my-2 "> 
              <h3>Username :{user.name}</h3>
            </div>

            <div className="text-white my-2">
              <p>Email :{user.email}</p>
            </div>
            
            <div className="text-white my-2"> 
              <p>Phone No :{user.mobileNo}</p>
            </div>
           
            
           
          </div>
        ))}
      </div>

    </div>
  )
}

export default DashBoard