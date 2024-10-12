import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const VerifyAlert = () => {

    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const verifyEmail = async()=>{
            await fetch(`/ecfile/user/verify/${params.id}`)
                  .then(res => res.json())
                  .then(data => {
                        if(data.success) {
                            Swal.fire({
                            icon: "success",
                            title: "Verified...",
                            text: "You can login now!",
                            })
                            navigate('/signin')
                        } else {
                            Swal.fire({
                            icon: "error",
                            title: "Failed to verify!",
                            text: "Please try again!",
                            })
                        }
                  })
        }
        verifyEmail()
    },[params])
  return (
    <>
      
    </>
  )
}

export default VerifyAlert
