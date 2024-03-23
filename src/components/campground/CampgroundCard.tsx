'use client'
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface CardProps {
    campgroundName: string;
    imgSrc: string;
    location: string;
    initialRating: number;
}

export default function Card({ campgroundName, imgSrc, location,initialRating}: CardProps) {

    return (
        <InteractiveCard>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image
                    src={imgSrc}
                    alt='Campground Picture'
                    fill={true}
                    className='object-cover rounded-t-lg'
                />
            </div>
            <div className='w-full h-[10%] p-[10px] text-gray-700 font-medium text-center'>
                {campgroundName}
            </div>
            <div className='w-full h-[10%] p-[10px] text-gray-700 font-medium text-center'>
                {location}
            </div>
            <div className='w-full h-[10%] p-[10px] flex justify-center items-center'>
                <Rating
                    id={campgroundName + ' Rating'}
                    name={campgroundName + ' Rating'}
                    value={initialRating}
                    data-testid={campgroundName + ' Rating'}
                />
            </div>

        </InteractiveCard>
    );
}
