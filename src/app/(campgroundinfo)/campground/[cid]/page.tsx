import CampgroundDetail from "@/components/CampgroundDetail"
import RatingOverall from "@/components/RatingOverall";
import ReviewCatalog from "@/components/ReviewCatalog"
import getCampground from "@/libs/getCampground";
import getReview from "@/libs/getReview";

export default async function CampgroundDetailPage({params}:{params:{cid:string}}){

    const campgroundDetail = await getCampground(params.cid)
    const reviewDetail = await getReview(params.cid)
    
    return(
        <div>
            <CampgroundDetail campgroundDetail={campgroundDetail.data}></CampgroundDetail>
            <RatingOverall></RatingOverall>
            <ReviewCatalog reviewJson={reviewDetail}></ReviewCatalog>
        </div>
    );
}
