import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
     const { user, isAuthenticated } = useAuth0();
  return (
    <div className='w-full  flex justify-between mt-1 sticky h-10 p-2 pb-1 ' >
      <div className='text-2xl'>AgriRent</div>
      <ul className='flex  font-medium '>
        <li className='mx-4'><NavLink className={({isActive})=> isActive ? "text-blue-700 font-bold": ""} to="/">Home</NavLink>
        <div></div>
        </li>
        <li className="mx-4"><NavLink className={({isActive})=> isActive ? "text-blue-700 font-bold": ""} to="/Contact">Contact</NavLink>
        <div></div>
        </li>
        <li className='mx-4 text-green-700'><NavLink className= "text-green-700 font-bold" to="/Machine"> List your Machines</NavLink>
        <div></div>
        </li>
        <li className='mx-4 text-green-700'><NavLink className= "text-green-700 font-bold" to="/BookMachine"> Book on Rent</NavLink>
        <div></div>
        </li>
      </ul>
      <div className=' flex gap-2'>
        <div className=''>
        <div className='mt-1.5 underline text-green-400 italic ... font-bold  '>{isAuthenticated && <p>{user.name}</p>}</div>
        <div ></div>
</div>
        { isAuthenticated ? (  <button className='rounded-xl p-1 mx-1 hover:scale-50 hover:bg-red-300   transition-all duration-700 mr-1' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>):(<button className='rounded-xl p-1 mx-1 hover:scale-50 hover:bg-green-300   transition-all duration-700' onClick={() => loginWithRedirect()}>Log In</button>)}
           
             
  
        {/* <button className='rounded-xl p-1 mx-1 hover:scale-50 hover:bg-green-300   transition-all duration-700'>Register</button> */}
      </div>
    </div>
  )
}

export default Navbar

