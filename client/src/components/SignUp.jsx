import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {

    const navigate = useNavigate()
    // const [avatar, setAvatarUrl] = useState("")
    // const [publicId, setPublicId] = useState("")
    const [avatar, setAvatar] = useState("");
    const [ProfileUploading, setProfileUploading] = useState(false)
    const [loading, setloading] = useState(false)

    const [userData, setUserData] = useState({
        name : '',
        email : '',
        password : '',
        mobileNo : '',
    })

    const onchange = async(e) => {

        setUserData({ ...userData, [e.target.id]: e.target.value });
            
        
        // if(e.target.id == 'profile'){
        //     setProfileUploading(true)
        //     const file = e.target.files[0]
        //     const formData = new FormData()
        //     formData.append('file', file)
        //     formData.append('upload_preset', 'Ec-File')
        //     formData.append('cloud_name', 'dygz6jcul')
        //     formData.append('folder', 'Ec-File/user_profile')
          
        //     await fetch('https://api.cloudinary.com/v1_1/dygz6jcul/image/upload',{
        //         method: 'POST',
        //         body: formData
        //     }).then(res => res.json())
        //       .then(data => {
        //             setPublicId(data.public_id)
        //             setAvatarUrl(data.url)
        //       })
        //       setProfileUploading(false)
        // }else{
        //     serUserData({...userData, [e.target.id]: e.target.value })
        // }
    }
    

    const submitHandler = async (e) => {
        e.preventDefault()
        setloading(true)
        
        const formData = new FormData();
        formData.append('avatar', avatar)
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('mobileNo', userData.mobileNo);

        await fetch('/ecfile/user/signup',{
            method: 'POST',
            body: formData
        }).then(res => res.json())
          .then(data => {
            
            if(!data.success) 
                throw new Error(data)

            setloading(false)
            alert('Verify Email to login')
            navigate('/signin')
          }).catch(err => {
            setloading(false)
            alert(err.message)
  
          })
    }
 
    
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-8'>Signup</h1>
        <form onSubmit={submitHandler} className='flex flex-col gap-5'>
            <input onChange={onchange} type="text" className='border p-3 rounded-lg  focus:outline-none' placeholder='Username' id='name' />
            <input onChange={onchange} type="password" className='border p-3 rounded-lg  focus:outline-none' placeholder='password' id='password' />
            <input onChange={onchange} type="email" className='border p-3 rounded-lg  focus:outline-none' placeholder='Email' id='email'/>
            <input onChange={onchange} type="number" className='border p-3 rounded-lg  focus:outline-none' placeholder='Mobile' id='mobileNo'/>
            <input onChange={(e) => setAvatar(e.target.files[0])} type="file" className='border p-3 rounded-lg  focus:outline-none' id='avatar' />
            <button disabled={ProfileUploading || loading} className='bg-green-700 rounded-lg p-3 text-white hover:opacity-90 disabled:opacity-70'> 
                 {ProfileUploading || loading ? 'Loading' : ' SIGN UP'} 
            </button>
        </form>

        <div className='flex gap-2 mt-3'>
            <p>Have an account?</p>
                <Link to={'/signin'}>
                    <span className='text-blue-700'>Signin</span>
                </Link>
        </div>  

    </div>
  )
}

export default SignUp