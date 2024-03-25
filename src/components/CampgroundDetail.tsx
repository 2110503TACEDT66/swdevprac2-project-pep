import Image from "next/image"
import getCampground from "@/libs/getCampground"
import Link from "next/link"

export default async function CampgroundDetail({ campgroundDetail }: { campgroundDetail: any }){
    
    
    return (
        <div className='bg-cyan-900 justify-between items-center p-0 m-0 w-screen h-[95vh]'>
            <div className="flex flex-row p-[20px] text-white">
                <Image src={campgroundDetail.picture} alt="Campground Image" width={0} height={0} sizes="100vw" className="rounded-lg w-[30%]"></Image>
                <div className="text-[20px] mx-5 text-left">{campgroundDetail.name}
                    <div className="text-[16px] mx-5">Description: {campgroundDetail.description}</div>
                    <div className="text-[16px] mx-5">Address: {campgroundDetail.address}</div>
                    <div className="text-[16px] mx-5">Province: {campgroundDetail.province}</div>
                    <div className="text-[16px] mx-5">Postal Code: {campgroundDetail.postalcode}</div>
                    <div className="text-[16px] mx-5">Telephone: {campgroundDetail.telephoneNumber}</div>
                </div>
                <Link href={`/booking/${campgroundDetail._id}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-sky-800 text-white px-3 py-2 shadow-sm">
                            Make reservation
                        </button>
                    
                </Link>
            </div>
        </div>
    )
}
