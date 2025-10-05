import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';

const LoginPage=()=>{
    const firebase=useFirebase();
    console.log(firebase);
    const navigate=useNavigate();

    const [Username,setUsername]=useState("");
    const[ email,setemail]=useState("");
    const[ password,setpassword]=useState("");
      
    useEffect(()=>{
        if(firebase.isLoggedIn){
            //navigate it home
            navigate('/');
        }
    },[firebase,navigate]);
     
    const handlesubmit=async (e)=>{
        e.preventDefault();
        console.log("signup user...");
        const result=await firebase.signInUserWithEmailAndPassword(
            Username,
            email,
            password
        );
        console.log("successfull signup..", result);
    }
    return(
        <div className="container mt-5">
        <Form onSubmit={handlesubmit}>
            
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={(e)=>setUsername(e.target.value)} value={Username} type="text" placeholder="Enter Username" />
        
      </Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e)=>setemail(e.target.value)} value={email} type="email" placeholder="Enter email" />
        
      

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={(e)=>setpassword(e.target.value)} value={password} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Account
      </Button>
    </Form>


        </div>
    );
};

export default LoginPage;
