'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CampgroundDetail from "@/components/CampgroundDetail";
import RatingOverall from "@/components/RatingOverall";
import ReviewCatalog from "@/components/ReviewCatalog";
import getCampground from "@/libs/getCampground";
import getReview from "@/libs/getReview";
import config from '@/utils/config';

interface ReviewItem {
    _id: string;
    user: string;
    rating: number;
    review: string;
}

interface UserRole {
    _id: string;
    role: string;
}

interface ResponseUserJSON {
    success: boolean;
    data: UserRole;
    message: string;
}

export default function CampgroundDetailPage({ params }: { params: { cid: string } }) {
    const [currentUser, setCurrentUser] = useState<UserRole | null>(null); // Initialize currentUser state as null

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get<ResponseUserJSON>(`${config.api}/auth/me`, config.headers());
                if (response.data.success === true) {
                    setCurrentUser(response.data.data);
                } else {
                    throw new Error(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    const [reviewDetail, setReviewDetail] = useState<{ count: number; data: ReviewItem[] }>({ count: 0, data: [] });
    const [campgroundDetail, setCampgroundDetail] = useState<any>(null);

    useEffect(() => {
        const fetchCampgroundAndReview = async () => {
            try {
                const reviewResponse = await getReview(params.cid);
                setReviewDetail(reviewResponse);
                const campgroundResponse = await getCampground(params.cid);
                setCampgroundDetail(campgroundResponse.data);
            } catch (error) {
                console.error("Error fetching campground and review:", error);
            }
        };

        fetchCampgroundAndReview();
    }, [params.cid]);


    return (
        <div>
            <CampgroundDetail campgroundDetail={campgroundDetail} />
            <RatingOverall reviewJson={reviewDetail} cid={params.cid} />
            {currentUser && ( // Check if currentUser is not null before rendering ReviewCatalog
                <ReviewCatalog reviewJson={reviewDetail} currentUser={currentUser._id} />
            )}
        </div>
    );
}
