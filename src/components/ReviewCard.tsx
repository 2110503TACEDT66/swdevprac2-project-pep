import React from 'react';
import { Rating } from '@mui/material';

interface ReviewCardProp {
    user: string,
    rating: number,
    review: string,
  };
  

export default function ReviewCard({ user, rating, review }:ReviewCardProp) {

    return (
        <div className="w-full bg-white p-4 rounded-sm mt-2 flex">
        <div className="flex-none mr-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex-grow">

            <div className="flex items-center justify-between mb-2">

                <div>
                    <div className="font-bold">{user}</div>
                    <div className="flex items-center">
                    <Rating name="read-only" value={rating} readOnly />
                    <span className="text-sm text-gray-500 ml-1">{rating}</span>
                    </div>
                </div>

            </div>

            <div className="text-gray-700 mt-2">{review}</div>
            
        </div>
        </div>
    );
}

// 'use client'
// import Image from 'next/image';
// import { Rating } from '@mui/material';
// import React, { useEffect, useState } from 'react';

// interface CardProps {
//     campgroundName: string;
//     imgSrc: string;
//     province: string;
//     country:string;
//     initialRating: number;
// }

// export default function ReviewCard({ campgroundName, imgSrc, province, country,initialRating}: CardProps) {

//     return (
//         <div>
//             <div className='w-full h-[70%] relative rounded-t-lg'>
//                 <Image
//                     src={imgSrc}
//                     alt='Campground Picture'
//                     fill={true}
//                     className='object-cover rounded-t-lg'
//                 />
//             </div>
//             <div className='w-full h-[10%] p-[10px] text-gray-700 font-medium text-center'>
//                 {campgroundName}
//             </div>
//             <div className='w-full h-[10%] p-[10px] text-gray-700 font-medium text-center'>
//                 {province}, {country}
//             </div>
//             <div className='w-full h-[10%] p-[10px] flex justify-center items-center'>
//                 <Rating
//                     id={campgroundName + ' Rating'}
//                     name={campgroundName + ' Rating'}
//                     data-testid={campgroundName + ' Rating'}
//                     value={initialRating}
//                 ></Rating>
//             </div>
//         </div>
//     );
// }