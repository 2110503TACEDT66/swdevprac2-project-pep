"use client"

import React, { useEffect, useState } from 'react';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl, FormLabel } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '@/utils/config';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';
import { UserRole, UserJSON, CampgroundItem } from '../../../../../../interface';
import getCampground from '@/libs/getCampground';
import Image from 'next/image';

export interface BookingItem {
    campground: {
        _id:string;
      address: string;
      name: string;
      telephoneNumber: string;
    };
    user: string
    bookingDate: string;
    _id: string;
  }
  
  export interface BookingJSON {
    success: boolean;
    data: BookingItem;
  }


function ReservePage({ params }: {params:{bid:string}}) {
    const [user, setUser] = useState<UserRole>(Object);
    const [booking, setBooking] = useState<BookingItem>({
        campground: {
            _id:"",
            address: "",
            name: "",
            telephoneNumber: "",
          },
          user: "",
          bookingDate: "",
          _id: ""
    });

    const [date, setDate] = useState<Date | null>(null);

    const router = useRouter()

    useEffect(() => {
        fetchData();
        fetchUserRole();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get<BookingJSON>(`${config.api}/bookings/${params.bid}`, config.headers());
        if (response.data.success === true) {
            setBooking(response.data.data);
        } else {
                throw new Error("failed to fetch data.")
            }
        } catch (err: any) {
            console.log("Error: ", err);
        }
    };

    const fetchUserRole = async () => {
        try {
            const response = await axios.get<UserJSON>(`${config.api}/auth/me`, config.headers());
            if (response.data.success === true) {
                setUser(response.data.data)
            } else {
                throw new Error(response.data.message)
            }
        } catch (err: any) {
            console.log(err.message)
            router.push("/")

            Swal.fire({
                title: "Error",
                text: err.message,
                icon: "error",
                timer: 2000
            })
        }
    }

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

                const response = await axios.put(`${config.api}/bookings/${params.bid}`, payload, config.headers());

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
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                timer: 2000
            });
        }
    };

    // Function to format the reservation date to show only the date part
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options = { month: '2-digit' as const, day: '2-digit' as const, year: 'numeric' as const };
        return date.toLocaleDateString(undefined, options);
    };

    return (

        <div className='bg-white mt-[10vh] justify-between items-center p-0 m-0 w-screen h-[90vh]'>
        <div className="flex flex-row px-12">
            <div className='w-[40%]'></div>

            <div className="w-[60%] text-gray-400 pt-[5%] px-5 text-left">
                <p className='text-[48px] pt-6 text-gray-600'> Your Rest</p>
                    
                <div>
                    <h2 className='text-[18px] text-gray-500'>{booking.campground.name}</h2>
                    <div className="text-[16px]  mt-12">{booking.campground.address}</div>
                    <p className="text-[16px]  mb-12"><LocalPhoneIcon/> {booking.campground.telephoneNumber}</p>        
                </div>
              
                <form className="card-body">
                    <FormControl>
                        <label className="label">
                        <span className='label-text text-[16px]'>Book Date</span>
                        </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={date}
                                onChange={handleDateChange}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <div className="form-control mt-6">
                        <button className="hover:bg-gray-400 hover:text-white text-gray-400 py-1 px-4 border border-gray-400" type="button" onClick={handleBooking}>Confirm</button>
                    </div>
                </form>            
            </div>
        </div>
    </div>
    );
}

export default ReservePage;