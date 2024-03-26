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
        timer: 2000
      });
      console.error("Sign Up Error:", error);
    }
  };

  return (
    <div className='flex flex-row'>
      <div className='w-[40vw] h-[90vh] p-[40px] flex flex-col justify-center'>
      <div className='text-[35px] text-gray-500'>Unlock a world of possibilities.</div>
      <div className='text-[25px] text-gray-400'>Sign up today and begin your journey !</div>
        <form onSubmit={handleSubmit} className='py-[15px] text-gray-500'>
          <div className='my-[10px]'>
            <div>Name</div>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required
            className='bg-gray-100 px-4 py-3 w-full focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500'
            ></input>
          </div>
          <div className='my-[10px]'>
            <div>Telephone Number</div>
            <input type="telephoneNumber" placeholder="Telephone Number" value={telephoneNumber} onChange={(e) => setTelephoneNumber(e.target.value)} required
            className='bg-gray-100 px-4 py-3 w-full focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500'
            ></input>
          </div>
          <div className='my-[10px]'>
            <div>Email</div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className='bg-gray-100 px-4 py-3 w-full focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500'
            ></input>
          </div>
          <div className='my-[10px]'>
            <div>Password</div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className='bg-gray-100 px-4 py-3 w-full focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500'
            ></input>
          </div>
          <button type="submit" className='border border-gray-400 mt-[10px] bg-white hover:bg-gray-400 px-4 py-2 text-gray-400 hover:text-white'>Sign Up</button>
        </form>
      </div>
      <div className='w-[60vw] h-[90vh] bg-gray-600'></div>
    </div>
  );
}

export default SignUpForm;
