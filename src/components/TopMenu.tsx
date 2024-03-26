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
        <div className="h-[10%] px-[48px] fixed m-0 top-0 left-0 bottom-0 right-0 z-30 flex flex-row items-center bg-white justify-between">
            <div className="flex items-center">
                <TopMenuItem title='Logo' pageRef='/'></TopMenuItem>
            </div>
            <div className="flex items-center">
                <TopMenuItem title='Campground' pageRef='/campground'></TopMenuItem>
                <TopMenuItem title='My Booking' pageRef='/mybooking'></TopMenuItem>
                <div>
                {isLoggedIn ? (
                    <button onClick={handleSignOut} className="m-[5px] px-4 py-1 border border-gray-400 hover:bg-gray-400 hover:text-white text-center text-[12px] text-gray-400 hover:text-white">
                        Sign-Out
                    </button>
                ) : (
                    <button  onClick={handleSignIn} className="m-[5px] px-4 pb-1 border border-gray-400 hover:bg-gray-400 hover:text-white text-cente  text-[12px] text-gray-400 hover:text-white">
                        Sign-In
                    </button>
                )}
                </div>
                
            </div>
        </div>
    );
}
