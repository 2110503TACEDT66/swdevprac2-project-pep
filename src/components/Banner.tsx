import Image from 'next/image';
import Link from 'next/link';

export default function Banner() {
    return (
        <div className = 'block p-[5px] m-0 w-screen h-screen relative'>
            <Image 
                src='/img/banner3.png'
                alt='cover'
                fill={true}
                objectFit="cover"
            />

            <Link href={'/campground'}> 
                <div className = 'relative z-20 top-[50%] text-center md:top-[60%] md:right-[48px] md:text-end'>
                    <div className = 'text-md md:text-2xl text-gray-500 hover:text-gray-700 '>
                        Discover the meaning of rest once again {'->'}
                    </div>    
                </div>
            </Link>
           
        </div>
            
    );
}
