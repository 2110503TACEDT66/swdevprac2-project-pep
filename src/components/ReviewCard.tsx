'use client'

import React, { useEffect } from 'react';

import { Rating } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import config from '@/utils/config';

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
