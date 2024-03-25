import ReviewCard from './ReviewCard';

export default function ReviewCatalog({reviewJson}:{reviewJson:{count:number, data:{   
    user: string,
    rating: number,
    review: string,}[]}}){

    return(
        <div className="h-screen m-[20px] bg-indigo-200">
            <div className="h-[50%] px-48 flex flex-col overflow-clip overflow-y-scroll">
                    {
                    reviewJson.data.map((reviewItem:any)=>(
                        <ReviewCard user={reviewItem.user} rating={reviewItem.rating} review={reviewItem.review}/>
                    ))
                }
            </div>
        </div>
    );
}