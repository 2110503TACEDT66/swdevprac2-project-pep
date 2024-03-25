import CampgroundCard from './CampgroundCard';
import Link from 'next/link';

export default function CampgroundCatalog({campgroundJson}:{campgroundJson:{count:number, data:{    
    _id: string,
    name: string,
    province: string,
    country:string,
    picture: string}[]}}){

    return(
        <div className='bg-slate-200 h-screen'>
            <div className='p-[40px] flex flex-col justify-around items-around'>
                <div className='flex flex-row justify-start space-x-10 overflow overflow-x-auto'>
                    {
                    campgroundJson.data.map((campgroundItem:any)=>(
                        <Link href={`/campground/${campgroundItem._id}`} className='w-[300px]'>
                            <CampgroundCard campgroundName={campgroundItem.name} imgSrc={campgroundItem.picture} 
                            province={campgroundItem.province} country={campgroundItem.country} initialRating={0}/>
                        </Link>

                    ))
                }
                </div>
            </div>
        </div>
    );
}