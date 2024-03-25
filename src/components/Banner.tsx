'use client'

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Banner() {
    const router = useRouter()

    return (
        <div className="block mt-[40x] p-0 w-full text-cyan-950">
             <Image src='/img/banner1.jpg'
                alt='cover'
                fill={true}
                priority
            />
            <div className="absolute inset-0 flex justify-center items-center top-[500px]">
                <button
                    className='bg-slate-100/20 text-center text-[18px] text-gray-200 hover:text-amber-100 px-[15px] pt-[5px] pb-[8px] border border-gray-200 hover:border-amber-100'
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push('/signin');
                    }}
                >
                    Sign-In
                </button>
            </div>
        </div>
    );
}