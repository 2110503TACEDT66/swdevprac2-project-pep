import ReviewCard from './ReviewCard';

export default function ReviewCatalog({reviewJson}:
    {reviewJson:{
        count:number, 
        data:{   
            user: string,
            rating: number,
            review: string,}[]
        }
    }) {

    return(
        <div className="h-[40%] bg-gray-200 px-48 flex flex-col overflow-clip overflow-y-scroll">
                {
                reviewJson.data.map((reviewItem:any)=>(
                    <ReviewCard user={reviewItem.user} rating={reviewItem.rating} review={reviewItem.review}/>
                ))
            }
        </div>
    );
}