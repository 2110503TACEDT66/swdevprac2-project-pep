'use client'

import { useState } from "react";
import { Rating } from "@mui/material";

export default function RatingOverall() {

    const [value, setValue] = useState<number | null>(5);

    const starLevels = [20, 40, 60, 80, 100];

    return (
        <div className="h-[50%] w-full p-2 bg-white m-0">
            <div className="h-[60%] w-full bg-white text-center py-12">
                <p className="text-lg text-black mb-6">
                    We're here to make your outdoor adventure unforgettable. Whether you're a seasoned camper or new to camping, our peaceful surroundings and great facilities have everything you need for a fantastic experience.
                </p>
                <p className="text-lg text-black mb-6">
                    Want to hear from other campers? Dive into our reviews below to learn about their experiences and discover why our campground is so special.
                </p>
            </div>

            <div className="h-[40%] w-full  flex flex-row">
                <div className="w-[50%] bg-white flex flex-row justify-end border-r-2">
                    <div className="p-4 flex flex-col fustify-center items-center">
                        <h1 className="text-gray-400 text-[48px]">5/5</h1>
                        <Rating name="read-only" value={value} readOnly />
                    </div>
                </div>

                <div className="w-[50%] bg-white flex flex-col-reverse p-4 justify-around">
                    {starLevels.map((level, index) => (
                        <div className="flex flex-row bg-white space-x-2 items-center">
                            <div className="text-[16px] text-gray-400">
                                {index + 1}
                            </div>

                            <div key={index} className="h-3 w-[50%] bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gray-400"
                                    style={{ width: `${level}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}