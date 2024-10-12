import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {

    const [mobileNo, setMobileNo] = useState('') 
    const [password, setPassword] = useState('') 
    const navigate = useNavigate()

    const submitHandler = async(e) => {
        e.preventDefault()
        await fetch('/ecfile/user/signin',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mobileNo, password})
        }).then(res => res.json())
          .then(data => {
            if(data.success){
                navigate('/dashboard')
            }else{
                alert(data.message)
            }
          })
      
    }
    

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-8'>Signin</h1>
        <form onSubmit={submitHandler} className='flex flex-col gap-5'>
            <input onChange={(e) => setMobileNo(e.target.value) } value={mobileNo} type="number" className='border p-3 rounded-lg  focus:outline-none' placeholder='Mobile' />
            <input onChange={(e) => setPassword(e.target.value) } value={password} type="password" className='border p-3 rounded-lg  focus:outline-none' placeholder='password' />
            <button className='bg-green-700 rounded-lg p-3 text-white hover:opacity-90 disabled:opacity-70'> SIGN IN </button>
        </form>

        <div className='flex gap-2 mt-3'>
            <p>Have an account?</p>
                <Link to={'/signup'}>
                    <span className='text-blue-700'>Signup</span>
                </Link>
        </div>  

    </div>
  )
}

export default SignIn