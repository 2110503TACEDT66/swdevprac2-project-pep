'use client'
import React, { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '@/utils/config';
import { useRouter } from 'next/navigation';
import { UserRole,UserJSON } from '../../interface';

interface ReviewCardProp {
    _id: string,
    user: string,
    rating: number,
    review: string,
    allowDelete: boolean,
    onDelete: () => void
}
interface ReviewItem {
    _id: string;
    user: string;
    rating: number;
    review: string;

}
export interface ReviewListJSON {
    success: boolean;
    data: ReviewItem[];
  }

export default function ReviewCard({ _id, user, rating, review, allowDelete, onDelete }: ReviewCardProp) {
    const router = useRouter();
    const [userRole, setUserRole] = useState<UserRole>(Object);
    const [reviewList, setReviewList] = useState<ReviewItem[]>([{
        _id: "",
        user: "",
        rating: 0,
        review: "",
      }]);
      useEffect(() => {
        fetchData();
        fetchUserRole();
      }, []);

    const fetchData = async () => {
        try {
          const response = await axios.get<ReviewListJSON>(`${config.api}/reviews/${_id}`, config.headers());
          if (response.data.success === true) {
            setReviewList(response.data.data);
          }
        } catch (err: any) {
          console.log(err.message);
        }
      };

    const fetchUserRole = async () => {
        try {
          const response = await axios.get<UserJSON>(`${config.api}/auth/me`, config.headers());
          if (response.data.success === true) {
            setUserRole(response.data.data)
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

    const handleDelete = () => {
        Swal.fire({
          title: "Delete Confirmation",
          text: "Are you sure to delete this reservation",
          icon: "question",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          confirmButtonText: "Delete"
        }).then(async (res) => {
          if (res.isConfirmed) {
            try {
              const response = await axios.delete(`${config.api}/reviews/${_id}`, config.headers());
              if (response.data.success === true) {
                Swal.fire({
                  title: "Deleted Review",
                  text: "review has been deleted.",
                  icon: 'success',
                  timer: 2000
                })
                onDelete(); // Call onDelete function passed from the parent component to update the UI
                // delete target item from array resvList
                setReviewList(prevList => prevList.filter(item => item._id !== _id))
                router.push('/campground')
    
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
        <div className="w-full bg-white p-4 rounded-sm mt-2 flex">
            <div className="flex-none mr-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <div className="font-bold">{user}</div>
                        <div className="flex items-center">
                            <Rating name="read-only" value={rating} readOnly />
                            <span className="text-sm text-gray-500 ml-1">{rating}</span>
                        </div>
                    </div>
                    {(userRole.role === "admin" || allowDelete) && (
                        <button className='text-black btn btn-error btn-sm btn-outline rounded-md mt-2' onClick={handleDelete}>Delete</button>
                    )}
                </div>
                <div className="text-gray-700 mt-2">{review}</div>
            </div>
        </div>
    );
}
