import CampgroundDetail from "@/components/CampgroundDetail"
import RatingOverall from "@/components/RatingOverall";
import ReviewCatalog from "@/components/ReviewCatalog"
import getCampground from "@/libs/getCampground";
import getReview from "@/libs/getReview";

export default async function CampgroundDetailPage({params}:{params:{cid:string}}){

    const reviewDetail = await getReview(params.cid)
    const campgroundDetail = await getCampground(params.cid)
    
    return(
        <div>
            <CampgroundDetail campgroundDetail={campgroundDetail.data}></CampgroundDetail>
            <div className="h-screen">
                <RatingOverall reviewJson={reviewDetail} cid={params.cid}></RatingOverall>
                <ReviewCatalog reviewJson={reviewDetail}></ReviewCatalog>
            </div>
        </div>
    );
}
