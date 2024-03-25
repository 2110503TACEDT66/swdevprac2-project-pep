"use client"

import config from '../utils/config';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'

function SignUpForm() {
    const router = useRouter()

    const [name, setName] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
        const payload = { 
            name,
            telephoneNumber,
            email,
            password,
            role: "user"
        };

      // Send a POST request to the server to handle signup
      const response = await axios.post(`${config.api}/auth/register`, payload);
      
      if (response.data.success === true) {
        Swal.fire({
          title: 'Sign Up',
          text: 'Sign up successful.',
          timer: 2000
        });
        // Optionally redirect the user after successful signup
        setTimeout(() => {
            router.push('/signin')
        }, 1000)
      } else {
        throw new Error("Sign Up failed.");
      }
    } catch (error:any) {
      Swal.fire({
        title: "Sign Up Error",
        text: error.response ? error.response.data.message : "An error occurred",
        icon: "error",
        timer: 2000
      });
      console.error("Sign Up Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Telephone Number:</label>
        <input 
          type="telephoneNumber" 
          value={telephoneNumber} 
          onChange={(e) => setTelephoneNumber(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
