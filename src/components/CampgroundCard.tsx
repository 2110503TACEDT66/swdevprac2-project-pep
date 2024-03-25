'use client'
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface CardProps {
    campgroundName: string;
    imgSrc: string;
    province: string;
    country:string;
    initialRating: number;
}

export default function Card({ campgroundName, imgSrc, province, country,initialRating}: CardProps) {

    return (
        <InteractiveCard>
            <div className='w-full h-[70%] relative'>
                <Image
                    src={imgSrc}
                    alt='Campground Picture'
                    fill={true}
                    className='object-cover'
                />
            </div>
            <div className='w-full h-[14%] pt-[30px] text-lg text-gray-700 font-semibold text-center'>
                {campgroundName}
            </div>
            <div className='w-full h-[8%] pt-0 text-gray-700 font-medium text-center'>
                <LocationOnIcon/> {province}, {country}
            </div>
            <div className='w-full h-[8%] pt-0 flex justify-center'>
                <Rating
                    id={campgroundName + ' Rating'}
                    name={campgroundName + ' Rating'}
                    data-testid={campgroundName + ' Rating'}
                    value={initialRating}
                ></Rating>
            </div>
        </InteractiveCard>
    );
}