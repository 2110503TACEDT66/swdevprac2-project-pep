'use client'

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Banner() {
    const router = useRouter()

    // const {data: session} = useSession()
    // console.log(session?.user.token)

    return (
        <div className="block mt-[40x] p-0 w-full text-cyan-950">
             <Image src='/img/card1.jpg'
                alt='cover'
                fill={true}
                priority
            />
            {/* {
                session?    <div className='z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl'>Welcome {session.user?.name}</div>
                :null
            } */}
            <div className="absolute inset-0 flex justify-center items-center top-[500px]">
                <button
                    className='bg-slate-100/20 text-center text-[18px] text-gray-200 hover:text-amber-100 px-[15px] pt-[5px] pb-[8px] border border-gray-200 hover:border-amber-100'
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push('/api/auth/signin');
                    }}
                >
                    Sign-In
                </button>
            </div>
        </div>
    );
}
