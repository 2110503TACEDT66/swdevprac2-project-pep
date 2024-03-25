'use client'

import React from 'react';
import { Rating } from '@mui/material';
import { useState } from 'react';

export default function ReviewCard({ author, rating, comment }:ReviewCardProp) {

    const [value, setValue] = useState<number | null>(rating);

    return (
        <div className="w-full bg-white p-4  mb-4 flex">
        <div className="flex-none mr-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex-grow">

            <div className="flex items-center justify-between mb-2">

                <div>
                    <div className="font-bold">{author}</div>
                    <div className="flex items-center">
                    <Rating name="read-only" value={value} readOnly />
                    <span className="text-sm text-gray-500 ml-1">{value}</span>
                    </div>
                </div>

            </div>

            <div className="text-gray-700 mt-2">{comment}</div>
            
        </div>
        </div>
    );
}

interface ReviewCardProp {
  author: string,
  rating: number,
  comment: string,
};
