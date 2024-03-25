import Image from "next/image"
import Link from "next/link"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import RatingOverall from "./RatingOverall";

export default async function CampgroundDetail({ campgroundDetail }: { campgroundDetail: any }) {

    return (
        <div className='bg-cyan-900 justify-between items-center p-0 m-0 h-[95vh]'>
            <div className="flex flex-row text-white">
                    <div className="h-[95vh] w-[55vw] relative">
                        <Image src={campgroundDetail.picture} alt="Campground Image" layout="fill" objectFit="cover" />
                    </div>
                
                <div className="flex-1 mx-5 text-left">
                    <div className="text-3xl font-bold my-3">{campgroundDetail.name}</div>
                    <div className="text-[16px] my-3">{campgroundDetail.description}</div>
                    <p className="text-[16px] my-3 flex items-center">
                        <LocationOnIcon className="mr-1" />{campgroundDetail.address}, {campgroundDetail.province}
                    </p>
                    <p className="text-[16px] my-3 flex items-center">
                        <LocalPostOfficeIcon className="mr-1" />{campgroundDetail.postalcode}
                    </p>
                    <p className="text-[16px] my-3 flex items-center">
                        <LocalPhoneIcon className="mr-1" />{campgroundDetail.telephoneNumber}
                    </p>
                    <Link href={`/booking/${campgroundDetail._id}`}>
                        <button className="block bg-sky-600 hover:bg-sky-800 text-white px-3 py-2 shadow-sm mt-4">
                            Make Booking
                        </button>
                    </Link>
                    <div>
                        <RatingOverall/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
