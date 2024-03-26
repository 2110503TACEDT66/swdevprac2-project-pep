'use client'

import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import ReviewForm from "./Reviewform";

export default function RatingOverall({ reviewJson, cid }: { reviewJson: { count: number, data: { user: string, rating: number, review: string }[] }, cid: string }) {
    const [overallRating, setOverallRating] = useState<number | null>(null);
    const [starLevels, setStarLevels] = useState<number[]>([0, 0, 0, 0, 0]);
    const [showReviewForm, setShowReviewForm] = useState(false);

    useEffect(() => {
        if (reviewJson && reviewJson.data) {
            let totalRating = 0;
            reviewJson.data.forEach(review => {
                totalRating += review.rating;
            });
            console.log("Total Rating:", totalRating);
            console.log("Total Reviews:", reviewJson.count);
            const avgRating = totalRating / reviewJson.count;
            console.log("Average Rating:", avgRating);
            setOverallRating(avgRating);
    
            const starCounts = Array(5).fill(0);
            reviewJson.data.forEach(review => {
                starCounts[review.rating - 1]++;
            });
            const normalizedCounts = starCounts.map(count => count / reviewJson.count * 100);
            setStarLevels(normalizedCounts);
        }
    }, [reviewJson]);

    const handleCreateReview = () => {
        setShowReviewForm(true);
    };

    const handleCloseReviewForm = () => {
        setShowReviewForm(false);
    };

    function handleReviewSubmit(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="h-[60%] w-full p-2 ">
            <div className="h-[45%] w-full bg-white text-gray-500 text-center px-48 pt-[10vh]">
                <p className="text-lg mb-2">
                    We're here to make your outdoor adventure unforgettable. Whether you're a seasoned camper or new to camping, our peaceful surroundings and great facilities have everything you need for a fantastic experience.
                </p>
                <p className="text-lg text-black mb-6">
                    Want to hear from other campers? Dive into our reviews below to learn about their experiences and discover why our campground is so special.
                </p>
            </div>

            <div className="h-[40%] w-full  flex flex-row">
                <div className="w-[50%] bg-white flex flex-row justify-end border-r-2">
                    <div className="p-4 flex flex-col fustify-center items-center">
                        <h1 className="text-gray-400 text-[48px]">{overallRating?.toFixed(1) || "N/A"}/5</h1>
                        <Rating name="read-only" value={overallRating} readOnly />
                    </div>
                </div>

                <div className="w-[50%] bg-white flex flex-col-reverse p-4 justify-around">
                    {starLevels.map((level, index) => (
                        <div className="flex flex-row bg-white space-x-2 items-center" key={index}>
                            <div className="text-[16px] text-gray-400">
                                {index + 1}
                            </div>

                            <div className="h-3 w-[50%] bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gray-400"
                                    style={{ width: `${level}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-[15%] w-full mt-4 flex flex-row justify-center bg-white">
                <button onClick={handleCreateReview} className=" h-[40px] hover:bg-gray-400 hover:text-white text-gray-400 py-1 px-4 border border-gray-400">
                    Create Review
                </button>
            </div>

            {showReviewForm && (
                <ReviewForm params={{ cid: cid }} onClose={handleCloseReviewForm} onSubmit={handleReviewSubmit} />
            )}
        </div>
    );
}