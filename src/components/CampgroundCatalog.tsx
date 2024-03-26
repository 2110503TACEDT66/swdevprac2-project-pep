import CampgroundCard from './CampgroundCard';
import Link from 'next/link';

export default function CampgroundCatalog({campgroundJson}:{campgroundJson:{count:number, data:{    
    _id: string,
    name: string,
    province: string,
    country:string,
    picture: string}[]}}){

    return(
        <div className='bg-white h-[100%] pt-[20px] px-12 '>
           <div className='h-full flex flex-row  space-x-5 overflow overflow-x-scroll'>
                {
                campgroundJson.data.map((campgroundItem:any)=>(
                    <Link href={`/campground/${campgroundItem._id}`} className='w-[350px]'>
                        <CampgroundCard campgroundName={campgroundItem.name} imgSrc={campgroundItem.picture} 
                        province={campgroundItem.province} country={campgroundItem.country}/> 
                    </Link>

                ))
                }
           </div>
        </div>
    );
}