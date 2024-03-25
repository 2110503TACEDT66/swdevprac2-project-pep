'use client'

import TopMenuItem from './TopMenuItem';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import axios from 'axios';

export default function TopMenu(){

    //const session = await getServerSession(authOptions)
    const router = useRouter()

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        if(typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }
    }, [isLoggedIn]);

    return (
        <div className="h-[40px] px-[10px] m-0 fixed top-0 left-0 bottom-0 right-0 z-30 flex flex-row items-center bg-gray-800 justify-between">
            <div className="flex items-center">
                <TopMenuItem title='Logo' pageRef='/'></TopMenuItem>
            </div>
            <div className="flex items-center">
                <TopMenuItem title='Campground' pageRef='/campground'></TopMenuItem>
                <TopMenuItem title='Booking' pageRef='/booking'></TopMenuItem>
                <TopMenuItem title='My Booking' pageRef='/mybooking'></TopMenuItem>
                <div className='m-[5px] px-[3px] pb-[3px] border border-gray-200 hover:border-amber-100'>
                    {isLoggedIn ?   
                    <TopMenuItem title='Sign-Out' pageRef='/signout'></TopMenuItem>
                    : <TopMenuItem title='Sign-In' pageRef='/signin'></TopMenuItem>
                }
                </div>
                
            </div>
        </div>
    );
}