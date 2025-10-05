import React from 'react'

import Navbar from './content/Navbar'
import Herosection from './content/herosection'
import Section1 from './content/Section1'
import Footer from './content/Footer'
import Home from './content/Home'
import Contact from './content/Contact'
import Rentmachine from './content/Rentmachine'
import Machine from './content/Machine'
import RegisterPage from './content/Register'
import BookMachine from './content/BookMachine'
import LoginPage from './content/Loginpage'
import{  Routes,Route } from 'react-router-dom'
import NotFound from './content/NotFound'
import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom"




const App = () => {
  // const router=createBrowserRouter([
  //     {
  //   path: "/",
  //   element: 
  //     <>
       
  //       <Navbar />
  //       <Herosection />
  //       <Section1 text="Tractor" text2="BWR" text3="Delhi" text4="5000" img="https://www.afgri.com.au/pub/media/strongready-r4a052760.jpg"/>
  //       <Section1 text="Harvester" text2="XYz" text3="Ghaziabad" text4="7000" img="https://tse2.mm.bing.net/th/id/OIP.Kag7MkDUJkmEvo29jScLTgHaF7?pid=Api&P=0&h=220"/>
  //       <Section1 text="Tractor" text2="BWR" text3="Delhi" text4="9800" img="https://tse1.mm.bing.net/th/id/OIP.qE0FztjYONNGT5c06roZKwHaGr?pid=Api&P=0&h=220"/>
  //       <Section1 text="Tractor" text2="BWR" text3="Delhi" text4="5000" img="https://magmedia.machines4u.com.au/wp-content/uploads/2019/03/27161610/S-Series-hero-image.jpg"/>
  //       <Section1 text="Tractor" text2="BWR" text3="Delhi" text4="5000" img="https://tse3.mm.bing.net/th/id/OIP.IAxg663ujkCCl0y-GWx2YQAAAA?pid=Api&P=0&h=220"/>
  //       <Footer />
  //       <Home />
  //     </>
  //   ,
  // },
  //   {
  //   path: "/contact",
  //   element: 
  //     <>
  //       <Navbar />
  //       <Contact />
  //     </>
  //   ,
  // },
  // {
  //   path: "/machine",
  //   element: 
  //     <>
  //       <Navbar />
  //       <Machine />
  //     </>
  //   ,
  // },
  // {
  //   path:"/*",
  //   element:<NotFound/>,
  // }
  // ]);
  return (
    <>
   <Routes>
<Route path="/" element={<>
      <Navbar />
      <Herosection />
      <Section1/>
      <Footer/>
    
    </> } />
    

   <Route path="/Machine" element={<>
   <Navbar />
   <Rentmachine/>
    <Footer/>
  
   </>} />

   <Route path="/BookMachine" element={<>
   <Navbar />
   <BookMachine/>
   <Footer/>
  
   </>} />

   
      {/* <Route path="/register" element={<RegisterPage />} />    
      <Route path="/Loginpage" element={<LoginPage />} />     */}
      {/* <Route path="/Machine" element={<Machine />} />     */}
    <Route path="/Contact"  element={<>
      <Navbar />
      <Contact/>
      <Footer/>
    </>
    }/>
    

   </Routes>
    {/* <Navbar/> */}
    {/* <Herosection/>
    <Section1/>
    <Footer/> */}
    {/* <RouterProvider router={router} /> */}
    </>
  )
}

export default App
