import React from 'react'
import { Navigate } from 'react-router-dom'

const NotFound = () => {
// const navigate=Navigate();
// function handleclick(){
//     navigate('/');
// }

  return (
    <div className='w-full  '>
      <img  className='size-90  mx-90 mt-20 overflow-hidden'  src="https://img.freepik.com/premium-vector/error-page-found-banner-with-cable-socket-cord-plug-website-blue_249405-66.jpg?w=2000" alt="" />
      {/* <button className='rounded-3xl bg-green-300 text-black' onClick={handleclick}></button> */}
    </div>
  )
}

export default NotFound
