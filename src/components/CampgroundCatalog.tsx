'use client'
import { useReducer } from 'react';
import CampgroundCard from './CampgroundCard';
import Link from 'next/link';

const showRatingReducer = (ratingList:Map<string, number>, action:{type:string, hospitalName:string, rating:number})=>{
        switch(action.type){
            case 'add':{
                ratingList.set(action.hospitalName, action.rating);
                return new Map(ratingList);

            }
            case 'remove': {
                ratingList.delete(action.hospitalName);
                return new Map(ratingList);
            }
            default : return(ratingList)
        }
}

export default function CampgroundCatalog(){
    /**
     * Mock Data for Demontration Only
     */
    const mockCampgroundRepo =[
        {cid:'001',name:'Chulalongkorn Hospital',image:'/img/card1.jpg'},
        {cid:'002',name:'Rajavithi Hospital',image:'/img/card1.jpg'},
        {cid:'003',name:'Thammasat University Hospital',image:'/img/card1.jpg'},
        {cid:'004',name:'Thammasat University Hospital',image:'/img/card1.jpg'},
        {cid:'005',name:'Chulalongkorn Hospital',image:'/img/card1.jpg'},
        {cid:'006',name:'Rajavithi Hospital',image:'/img/card1.jpg'},
        {cid:'007',name:'Thammasat University Hospital',image:'/img/card1.jpg'},
        {cid:'008',name:'Thammasat University Hospital',image:'/img/card1.jpg'}
    ]

    return(
        <div className='bg-slate-200 h-screen'>
            <div className='p-[40px] flex flex-col justify-around items-around'>
                <div className='flex flex-row justify-center space-x-10 overflow overflow-x-scroll'>
                    {
                    mockCampgroundRepo.map((campgroundItem)=>(
                        <Link href={`/campground/${campgroundItem.cid}`} className='w-[300px]'>
                            <CampgroundCard campgroundName={campgroundItem.name} imgSrc={campgroundItem.image} location='Bangkok' initialRating={0}/>
                        </Link>

                    ))
                }
                </div>
            </div>
        </div>
    );
}