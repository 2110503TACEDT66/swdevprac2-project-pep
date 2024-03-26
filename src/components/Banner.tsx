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
                <div className = 'relative top-[60%]  right-[48px] z-20 text-end'>
                    <div className = 'text-2xl text-gray-500 hover:text-gray-700 '>
                        Discover the meaning of rest once again {'->'}
                    </div>    
                </div>
            </Link>
           
        </div>
            
    );
}
