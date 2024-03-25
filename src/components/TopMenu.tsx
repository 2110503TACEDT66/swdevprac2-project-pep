import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Link } from '@mui/material';

export default async function TopMenu(){

    const session = await getServerSession(authOptions)

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
                    {session ?   
                    <TopMenuItem title='Sign-Out' pageRef='/api/auth/signout'></TopMenuItem>
                    : <TopMenuItem title='Sign-In' pageRef='/api/auth/signin'></TopMenuItem>
                }
                </div>
                
            </div>
        </div>
    );
}
