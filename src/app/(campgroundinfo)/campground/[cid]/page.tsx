import Image from "next/image"
import CampgroundDetail from "@/components/campgroundDetail/CampgroundDetail"
import ReviewCatalog from "@/components/campgroundDetail/ReviewCatalog"

export default function HospitalDetailPage({params}:{params:{cid:string}}){

    /**
     * Mock Data for demonstration Only
     */

    const mockCampgroundRepo = new Map()
    mockCampgroundRepo.set('001',{name:'Chulalongkorn Hospital',image:'/img/card1.jpg'})
    mockCampgroundRepo.set('002',{name:'Rajavithi Hospital',image:'/img/card1.jpg'})
    mockCampgroundRepo.set('003',{name:'Thammasat University Hospital',image:'/img/card1.jpg'})
    mockCampgroundRepo.set('004',{name:'Thammasat University Hospital',image:'/img/card1.jpg'})
    
    return(
        <div>
            <CampgroundDetail params={{cid:"001"}}/>
            <ReviewCatalog/>
        </div>
    );
}

export async function generateStaticParams() {
    return [{cid:'001'},{cid:'002'},{cid:'003'}]
    
}