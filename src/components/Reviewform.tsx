'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Rating from '@mui/material/Rating';
import { useRouter } from 'next/navigation';
import config from '../utils/config';

function ReviewForm({ params, onClose, onSubmit }: { params: { cid: string }, onClose: () => void, onSubmit: () => void }) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const payload = {
                review,
                rating
            };

            const response = await axios.post(`${config.api}/campgrounds/${params.cid}/reviews`, payload, config.headers());

            if (response.data.success === true) {
                Swal.fire({
                    title: 'Review Submitted',
                    text: 'Your review has been successfully submitted.',
                    icon: 'success',
                    timer: 2000
                }).then(() => {
                    onSubmit(); // Call onSubmit function passed from the parent component
                    onClose(); // Close the overlay after submitting the review
                });
                router.push('/campground')
            } else {
                throw new Error("Review submission failed.");
            }
        } catch (error:any) {
            if(error.response.data.message === "Not authorize to access this route"){
                Swal.fire({
                    title: "Authorized failed",
                    text: "Please login before review a campground",
                    icon: "error",
                    timer: 2000
                })

                setTimeout(() => {
                    router.push("/signin")
                }, 500)
            }else{
                Swal.fire({
                title: "Review Submission Error",
                text: "An error occurred",
                icon: "error",
                timer: 2000
                });  
            }

            console.error("Review Submission Error:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 shadow-lg max-w-md w-full relative">
                <button onClick={onClose} className="absolute top-8 right-5 px-2 py-1 text-gray-400 hover:text-gray-600">
                    X
                </button>
                <h2 className="text-2xl font-bold mb-4">Create Review</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <label className="text-gray-700">Rating:</label>
                    <Rating
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue || 0);
                        }}
                    />
                    <label className="text-gray-700">Comment:</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                        className="border border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-400"
                    />
                    <button type="submit" className="text-gray-600 hover:text-white py-2 px-4 bg-white hover:bg-gray-400 border-2 border-gray-400">Submit Review</button>
                </form>
            </div>
        </div>
    );
}

export default ReviewForm;
