'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'
import config from '@/utils/config';

function SignInForm() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
        const user = { 
            email,
            password
        };

        // Send a POST request to the server to handle sign-in
        const response = await axios.post(`${config.api}/auth/login`, user);
        
        if (response.data.success === true) {
            // Optionally store user session/token
            Swal.fire({
            title: 'Sign In',
            text: 'Sign in successful.',
            timer: 2000
            });
            // Redirect the user after successful sign-in
            localStorage.setItem(config.tokenName, response.data.token)
                    
            setTimeout(() => {
                router.push('/')
            }, 1000)

        } else {
            throw new Error("Sign In failed.");
        }
        } catch (error:any) {
            Swal.fire({
                title: "Sign In Error",
                text: error.response ? error.response.data.message : "An error occurred",
                timer: 2000
            });
            console.log(error.message);
            console.error("Sign In Error:", error);
        }
    };

    return (
        <div className='flex flex-col md:flex-row'>
            <img src="img/signin.jpg" alt="Sign In" className='w-full h-[40vh] md:w-[60vw] md:h-[90vh]' />
            <div className='w-full md:w-[40vw] p-[30px] flex flex-col justify-center'>
                <div className='text-[30px] leading-[40px] md:text-[55px] md:leading-[60px] text-gray-500'>Welcome, login to your account.</div>
                <div className='mt-[15px] text-[15px] text-gray-400'>If you don't have an account, <a href="/signup" className='text-gray-500 hover:text-gray-600'>sign up here !</a></div>
                    <form onSubmit={handleSubmit} className='py-[15px] text-gray-500'>
                        <div className='my-[10px]'>
                            <div>Email</div>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'required
                                className='bg-gray-100 px-4 py-3 w-full focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500'
                            ></input>
                        </div>
                        <div className='my-[10px]'>
                            <div>Password</div>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'required
                                className='bg-gray-100 px-4 py-3 w-full focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500'
                            ></input>
                        </div>
                        <button type="submit" className='border border-gray-400 mt-[10px] bg-white hover:bg-gray-400 px-4 py-2 text-gray-400 hover:text-white'>Sign In</button>
                    </form>
            </div>
        </div>
    );
}

export default SignInForm;
