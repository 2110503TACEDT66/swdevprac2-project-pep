"use client"

import React, { useEffect, useState } from 'react';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl, FormLabel } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '@/utils/config';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useRouter } from 'next/navigation';
import { UserRole, UserJSON, CampgroundItem } from '../../../../../../interface';
import getCampground from '@/libs/getCampground';
import Image from 'next/image';
import Loading from '@/components/Loading';

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


function EditBookingPage({ params }: {params:{bid:string}}) {
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
    const [loading, setLoading] = useState(true);

    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        fetchData();
        fetchUserRole();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get<BookingJSON>(`${config.api}/bookings/${params.bid}`, config.headers());
        if (response.data.success === true) {
            setBooking(response.data.data);
            setLoading(false)
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
                setLoading(false)
            } else {
                throw new Error(response.data.message)
            }
        } catch (err: any) {
            console.log(err.message)
            router.push("/")

            Swal.fire({
                title: "Error",
                text: err.message,
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
                        text: "Booked successfully",
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

    return (
        <>
            {
            loading?(
                <Loading/>
            ):(
                <div className='bg-white mt-[10vh] justify-between items-center p-0 m-0 w-screen h-[90vh]'>
                    <div className="flex flex-col md:flex-row px-12">
                        <Image src={'/img/Mountains.jpg'} alt="Campground Image" width={0} height={0} sizes="100vw" className="w-full h-[40vh] md:w-[40vw] md:h-[90vh]"></Image>
                    <div className="md:w-[60vw] text-gray-400 md:pt-[5%] md:px-10 text-left">
                        <p className='text-[36px] md:text-[48px] pt-6 text-gray-600'> Your Rest</p>
                            
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
            )
        }
        </>
        
    );
}

export default EditBookingPage;