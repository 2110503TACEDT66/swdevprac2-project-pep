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
}

export default function Card({ campgroundName, imgSrc, province, country}: CardProps) {

    return (
        <InteractiveCard>
            <div className='w-full h-[80%] relative'>

                <Image
                    src={imgSrc}
                    alt='Campground Picture'
                    fill={true}
                    className='object-cover'
                />
            </div>
            <div className='w-full h-[20%] p-[10px] text-gray-500  text-left p-8'>
                <div className='text-md'>
                    {campgroundName}    
                </div>
                <div className='text-[12px]'>
                    {province}, {country}
                </div>
            </div>
        </InteractiveCard>
    );
}