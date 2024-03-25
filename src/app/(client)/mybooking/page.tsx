"use client"

import config from '@/utils/config';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { BookingItem,UserRole,BookingListJSON, UserJSON, DeleteJSON } from '../../../../interface';

function MyBookingPage() {
  const [bookingList, setBookingList] = useState<BookingItem[]>([{
    campground: {
      address: "",
      name: "",
      telephoneNumber: "",
    },
    user: "",
    bookingDate: "",
    _id: ""
  }]);
  const [user, setUser] = useState<UserRole>(Object);

  const router = useRouter();

  useEffect(() => {
    fetchData();
    fetchUserRole();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<BookingListJSON>(`${config.api}/bookings`, config.headers());
      if (response.data.success === true) {
        setBookingList(response.data.data);
      }
    } catch (err: any) {
      console.log(err.message);
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

  // Function to format the reservation date to show only the date part
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { month: '2-digit' as const, day: '2-digit' as const, year: 'numeric' as const };
    return date.toLocaleDateString(undefined, options);
  };

  const handleEditClick = (bid: string) => {
    router.push(`/mybooking/edit/${bid}`)
  }

  const handleDelete = (bid: string) => {
    Swal.fire({
      title: "Delete Confirmation",
      text: "Are you sure to delete this reservation",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete"
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const response = await axios.delete<DeleteJSON>(`${config.api}/bookings/${bid}`, config.headers())
          if (response.data.success === true) {
            Swal.fire({
              title: "Deleted Reservation",
              text: "reservation has been deleted.",
              timer: 2000
            })

            // delete target item from array bookingList
            setBookingList(prevList => prevList.filter(item => item._id !== bid))

          }
        } catch (err) {
          Swal.fire({
            title: "Deleting Error",
            text: `delete failed: ${err}`,
            icon: 'error',
            timer: 2000
          })
        }
      }
    })
  }

  return (
    <>
            <>
              <div className='pb-10'>
                <div className='container mx-auto lg:w-1/2 min-h-screen px-10 lg:px-0 pt-10'>
                  <p className='text-center text-emerald-900 text-2xl font-bold py-4'>Booking History</p>

                  {
                    bookingList.length === 0 ? (
                      <div className="border p-4 px-8 mt-4 rounded-xl hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 bg-white block text-center lg:flex lg:justify-between animate-fade-up">
                        <p className='font-semibold mt-1'>Booking in history is empty.</p>
                        <a className="btn btn-sm btn-accent text-sky-600 mt-4 lg:mt-0" href="/campground">make new booking</a>
                      </div>
                    ) : ''
                  }

                  {bookingList.map((booking) => (
                    <div key={booking._id} className='border p-4 mt-4 rounded-xl hover:shadow-lg transition duration-300 
                    ease-in-out transform hover:scale-105 bg-white animate-fade-up animate-once'>
                      <h2 className='font-bold text-lg'>{booking.campground.name}</h2>
                      <p className='text-gray-600 my-2'>
                        <LocationOnIcon className='text-teal-400' /> {booking.campground.address}
                      </p>
                      <p className='text-gray-600 my-2'>
                        <LocalPhoneIcon className='text-teal-400' /> {booking.campground.telephoneNumber}
                      </p>
                      <p className='text-gray-600 my-2'>
                        <CalendarMonthIcon className='text-teal-400' /> {formatDate(booking.bookingDate)}
                      </p>
                      {
                        user.role === "admin" ?
                          <p className='text-gray-600 my-2'>
                            <PersonIcon className='text-teal-400' /> {booking.user}
                          </p>
                          : ''
                      }
                      <button className='text-sky-600 btn btn-accent btn-sm rounded-md mt-2 mr-4'
                        onClick={() => handleEditClick(booking._id)}
                      >Edit</button>

                      <button className='text-sky-600 btn btn-error btn-sm btn-outline rounded-md mt-2'
                        onClick={() => handleDelete(booking._id)}
                      >Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            </>
        
    </>
  );
}

export default MyBookingPage;