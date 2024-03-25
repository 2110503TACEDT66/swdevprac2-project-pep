'use client'
import Reserve from "@/components/Reserve";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "../../../interface";
import { addBooking } from "@/redux/features/bookSlice";

export default function Booking() {
    const dispatch = useDispatch<AppDispatch>()

    const makeBooking = () => {
        if (name && lastName && citizenID && hospital && bookDate) {
            const item: BookingItem = {
                name: name,
                surname: lastName,
                id: citizenID,
                hospital: hospital,
                bookDate: dayjs(bookDate).format("YYYY/MM/DD")
            }
            dispatch(addBooking(item))
            alert('Book Vaccine Success');
        } else {
            alert('Book Vaccine Fail');
        }
    }
    
    const [name, setName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [citizenID, setCitizenID] = useState<string>('')
    const [hospital, setHospital] = useState<string>('')
    const [bookDate, setBookDate ] = useState<Dayjs|null>(null)

    return (
        <div className='bg-cyan-900 pt-[20px] m-0 flex flex-col justify-center items-center'>
            <div className='flex flex-col items-center pt-[20px] m-0'>
                <div className="text-3xl font-bold font-sans text-white py-3">Vaccine Booking</div>
                <div className="w-fit flex flex-col items-center">
                    <Reserve 
                        onNameChange={(value: string) => {setName(value)}}
                        onLastNameChange={(value: string) => {setLastName(value) }}
                        onCitizenIDChange={(value: string) => {setCitizenID(value) }}
                        onHospitalChange={(value: string) => {setHospital(value)}}
                        onBookDateChange={(value: Dayjs) => {setBookDate(value)}}
                    ></Reserve>
                    <button className="block rounded-md bg-white text-cyan-900 hover:bg-cyan-600 hover:text-white mt-[15px] px-[10px] py-[10px] shadow-sm" name="Book Vaccine"
                        onClick={makeBooking}
                    >Book Vaccine</button>

                </div>
            </div>
        </div>
    )
}
