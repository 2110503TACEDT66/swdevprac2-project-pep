import Image from "next/image"
import Link from "next/link"
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

export default function CampgroundDetail({ campgroundDetail }: { campgroundDetail: any }){

    if (!campgroundDetail) {
        return null;
    }
    
    return (
        <div className='bg-white mt-[10vh] justify-between items-center p-0 m-0 w-screen h-[90vh]'>
            <div className="flex flex-col md:flex-row px-12 py-8 text-white">
                <Image src={campgroundDetail.picture} alt="Campground Image" width={0} height={0} sizes="100vw" className="h-[40vh] w-full md:w-[30%] md:h-auto"></Image>
                <div className="w-full md:w-[70%] text-gray-400 pt-[10%] md:px-5 text-left">
                    
                    <div className="text-[25px] md:text-[48px] text-gray-600 ">{campgroundDetail.name}</div>
                    <div className="text-[18px] text-gray-500">{campgroundDetail.description}</div>
                    <div className="text-[16px]  mt-12">{campgroundDetail.address} {campgroundDetail.province}</div>
                    <div className="text-[16px] "><LocalPostOfficeIcon/> {campgroundDetail.postalcode}</div>
                    <div className="text-[16px]  mb-12"><LocalPhoneIcon/> {campgroundDetail.telephoneNumber}</div>


                    <Link href={`/booking/${campgroundDetail._id}`} className="mt-4  justify-center bg-white">
                        <button className="hover:bg-gray-400 hover:text-white text-gray-400 py-1 px-4 border border-gray-400">
                            Make Booking
                        </button>
                    
                    </Link>
                </div>
            </div>
        </div>
    )
}