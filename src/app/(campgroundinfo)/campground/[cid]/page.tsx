import Image from "next/image"
import CampgroundDetail from "@/components/CampgroundDetail"
import ReviewCatalog from "@/components/ReviewCatalog"
import getCampground from "@/libs/getCampground";

export default async function CampgroundlDetailPage({params}:{params:{cid:string}}){

    const campgroundDetail = await getCampground(params.cid)
    
    return(
        <div>
            <CampgroundDetail campgroundDetail={campgroundDetail.data}/>
            <ReviewCatalog/>
        </div>
    );
}
