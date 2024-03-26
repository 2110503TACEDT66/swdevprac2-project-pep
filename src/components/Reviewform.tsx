'use client'

import config from '../utils/config';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Rating from '@mui/material/Rating';

function ReviewForm({ params, onClose , onSubmit}: { params: { cid: string }, onClose: () => void, onSubmit: () => void}) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                rating,
                comment
            };

            const response = await axios.post(`${config.api}/campgrounds/${params.cid}/reviews`, payload);

            if (response.data.success === true) {
                Swal.fire({
                    title: 'Review Submitted',
                    text: 'Your review has been successfully submitted.',
                    icon: 'success',
                    timer: 2000
                }).then(() => {
                    onClose(); // Close the overlay after submitting the review
                });
            } else {
                throw new Error("Review submission failed.");
            }
        } catch (error:any) {
            Swal.fire({
                title: "Review Submission Error",
                text: error.response ? error.response.data.message : "An error occurred",
                icon: "error",
                timer: 2000
            });
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
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
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
