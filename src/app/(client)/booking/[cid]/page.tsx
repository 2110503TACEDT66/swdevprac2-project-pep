"use client"

import React, { useEffect, useState } from 'react';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl, FormLabel } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '@/utils/config';
import { useRouter } from 'next/navigation';
import getCampground from '@/libs/getCampground';
import { CampgroundItem } from '../../../../../interface';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';


function BookingPage({params}:{params:{cid:string}}) {
    const [campground, setCampground] = useState<CampgroundItem>({
        _id: '',
        name: '',
        description:'',
        address: '',
        province: '',
        country:'',
        postalcode: '',
        telephoneNumber: '',
        picture: ''});

    const [date, setDate] = useState<Date | null>(null);

    const router = useRouter()

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            //const response: CampgroundJson = await getCampground(params.cid);
            const campgroundDetail = await getCampground(params.cid);
            setCampground(campgroundDetail.data);
        } catch (err) {
            console.log("Error: ", err);
        }
    };

    const handleDateChange = (newDate: Date | null) => {
        setDate(newDate);
    };

    const handleBooking = async () => {
        try {
            if (date) {
                const formattedDate: string = date.toISOString();
                const payload = {
                    bookingDate: formattedDate
                };

                const response = await axios.post(`${config.api}/campgrounds/${params.cid}/bookings`,payload, config.headers());

                if (response.data.success) {
                    Swal.fire({
                        title: "Confirmed",
                        text: "Reserved successfully",
                        icon: "success",
                        timer: 2000
                    });

                    router.push("/mybooking")
                } else {
                    throw new Error(response.data.message);
                }
            } else {
                throw new Error("Please select a date.");
            }
        } catch (error: any) {
            if (error.response.data.message === "Not authorize to access this route") {
                Swal.fire({
                    title: "Authorized failed",
                    text: "Please login before reserve a massage service",
                    icon: "error",
                    timer: 2000
                })

                setTimeout(() => {
                    router.push("/signin")
                }, 500)
            } else {
                Swal.fire({
                    title: "Error",
                    text: error.response.data.message,
                    icon: "error",
                    timer: 2000
                });
            }
        }
    };

    return (
        <>
            
            <div className='container min-h-screen py-10 lg:py-20 px-10 md:px-0 mx-auto lg:w-1/3 animate-fade-up'>
                <p className='font-bold text-3xl text-center pt-6 text-emerald-900'>Campground</p>
                <div className='border p-4 my-4 rounded-xl  transition duration-300 ease-in-out transform  bg-white'>
                    <h2 className='font-bold text-lg'>{campground.name}</h2>
                    <p className='text-gray-600 my-2'>
                        <LocationOnIcon className='text-teal-400' /> {campground.address}, {campground.province}, {campground.country}
                    </p>
                    <p className='text-gray-600 my-2'>
                        <LocalPhoneIcon className='text-teal-400' /> {campground.telephoneNumber}
                    </p>
                    
                </div>

                <div className="card shadow-2xl bg-base-100 my-8">
                    <p className='font-bold text-2xl text-center pt-6 text-emerald-900'>Reserve Form</p>
                    <form className="card-body">
                        <FormControl>
                            <label className="label">
                                <span className='label-text'>Date</span>
                            </label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={date}
                                    onChange={handleDateChange}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <div className="form-control mt-6">
                            <button className="btn btn-outline btn-success" type="button" onClick={handleBooking}>Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
                )
            
        </>
    );
}

export default BookingPage;