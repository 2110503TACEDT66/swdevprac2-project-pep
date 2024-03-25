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
            icon: 'success',
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
                icon: "error",
                timer: 2000
            });
            console.log(error.message);
            console.error("Sign In Error:", error);
        }
    };

    return (
        <div className='border p-[10px]'>
            <form onSubmit={handleSubmit}>
            <div>
                <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder='Email'
                required 
                />
            </div>
            <div>
                <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder='Password'
                required 
                />
            </div>
            <button type="submit" className='border p-[5px]'>Sign In</button>
            </form>
        </div>
        
    );
}

export default SignInForm;
