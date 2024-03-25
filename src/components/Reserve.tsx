// import { useState } from "react"
// import { DatePicker } from "@mui/x-date-pickers"
// import { LocalizationProvider } from "@mui/x-date-pickers"
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { Select , MenuItem, TextField } from '@mui/material'
// import { Dayjs } from "dayjs"

// export default function Reserve({onNameChange, onLastNameChange, onCitizenIDChange, onBookDateChange, onHospitalChange}: {onNameChange:Function, onLastNameChange:Function, onCitizenIDChange:Function, onBookDateChange:Function, onHospitalChange:Function}){
    
//     const [name, setName] = useState<string>('')
//     const [lastName, setLastName] = useState<string>('')
//     const [citizenID, setCitizenID] = useState<string>('')
//     const [bookDate, setBookDate ] = useState<Dayjs|null>(null)
//     const [hospital, setHospital] = useState<string>('')

//     return (
//         <div className="bg-slate-100 rounded-lg w-fit px-5 py-5 flex flex-col justify-center items-center inline-block">
//             <TextField variant="standard" name="Name" label="Name" className="h-[50px] w-[200px] mb-5"
//                 value={name} onChange={(e) => {setName(e.target.value); onNameChange(e.target.value)}}
//             ></TextField>
//             <TextField variant="standard" name="LastName" label="LastName" className="h-[50px] w-[200px] mb-5"
//                 value={lastName} onChange={(e) => {setLastName(e.target.value); onLastNameChange(e.target.value)}}
//             ></TextField>
//             <TextField variant="standard" name="Citizen ID" label="Citizen ID" className="h-[50px] w-[200px] mb-5"
//                 value={citizenID} onChange={(e) => {setCitizenID(e.target.value); onCitizenIDChange(e.target.value)}}
//             ></TextField>
//             <Select variant="standard" name="Hospital" id="Hospital" className="h-[50px] w-[200px] mb-5"
//                 value={hospital} onChange={(e)=>{setHospital(e.target.value); onHospitalChange(e.target.value) }}>
//                 <MenuItem value="Chula">Chulalongkorn Hospital</MenuItem>
//                 <MenuItem value="Rajavithi">Rajavithi Hospital</MenuItem>
//                 <MenuItem value="Thammasat">Thammasat University Hospital</MenuItem>
//             </Select>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker className="bg-white"
//                     value={bookDate} onChange={(value)=>{setBookDate(value); onBookDateChange(value)}}
//                 ></DatePicker>
//             </LocalizationProvider>
//         </div>
//     );
// }

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
import { BookingItem } from '../../interface';
import { CampgroundItem } from '../../interface';
import getCampground from '@/libs/getCampground';


function ReservePage({params}:{params:{cid:string}}) {
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
            const campgroundDetail = await getCampground(params.cid);
            setCampground(campgroundDetail.data);
        } catch (err) {
            console.log("Error: ", err);
        }
    };

    const handleDateChange = (newDate: Date | null) => {
        setDate(newDate);
    };

    const handleReservation = async () => {
        try {
            if (date) {
                const formattedDate: string = date.toISOString();
                const payload = {
                    resvDate: formattedDate
                };

                const response = await axios.post(`${config.api}/massages/${params}/reservations`, payload, config.headers());

                if (response.data.success) {
                    Swal.fire({
                        title: "Confirmed",
                        text: "Reserved successfully",
                        icon: "success",
                        timer: 2000
                    });

                    router.push("/massages")
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
                <p className='font-bold text-3xl text-center pt-6 text-emerald-900'>Massage Shop</p>
                <div className='border p-4 my-4 rounded-xl hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 bg-white'>
                    <h2 className='font-bold text-lg'>{campground.name}</h2>
                    
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
                            <button className="btn btn-outline btn-success" type="button" onClick={handleReservation}>Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
                )
            
        </>
    );
}

export default ReservePage;