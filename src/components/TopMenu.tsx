'use client'

import TopMenuItem from './TopMenuItem';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import axios from 'axios';
import config from '@/utils/config';

export default function TopMenu(){

    const router = useRouter()

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Update isLoggedIn based on token presence
    }, []);

    const handleSignOut = () => {

        Swal.fire({
            title: "Log Out Confirmation",
            text: "Are you sure to log out ?",
            showCancelButton: true,
            confirmButtonText: "Logout",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.get(`${config.api}/auth/logout`)
                console.log(response)
                if (response.data.success === true) {

                    if (typeof window !== 'undefined') {
                        // clear token from browser
                        localStorage.removeItem('token')
                    }

                    setIsLoggedIn(!isLoggedIn)

                    Swal.fire({
                        title: "Log Out",
                        text: "log out successfully",
                        timer: 1500
                    })

                    router.push('/')
                }
            }
        })
    }
    const handleSignIn = async () => {
        // Sign in logic
        // After successful sign-in:
        router.push('/signin');
    }

    return (
        <div className="h-[5vh] px-[10px] m-0 fixed top-0 left-0 bottom-0 right-0 z-30 flex flex-row items-center bg-gray-800 justify-between">
            <div className="flex items-center">
                <TopMenuItem title='Logo' pageRef='/'></TopMenuItem>
            </div>
            <div className="flex items-center">
                <TopMenuItem title='Campground' pageRef='/campground'></TopMenuItem>
                <TopMenuItem title='My Booking' pageRef='/mybooking'></TopMenuItem>
                <div className='m-[5px] px-[3px] pb-[3px] border border-gray-200 hover:border-amber-100'>
                {isLoggedIn ? (
                    <button onClick={handleSignOut} className="text-center mx-[8px] text-[12px] text-gray-200 hover:text-amber-100">
                        Sign-Out
                    </button>
                ) : (
                    <button  onClick={handleSignIn} className="text-center mx-[8px] text-[12px] text-gray-200 hover:text-amber-100">
                        Sign-In
                    </button>
                )}
                </div>
                
            </div>
        </div>
    );
}
