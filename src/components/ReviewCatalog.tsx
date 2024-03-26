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
        <div className='h-[40%] px-12 pb-8 flex justify-center'>
            <div className="h-[100%] bg-white w-[70%] flex flex-col overflow-clip overflow-y-scroll">
                {
                reviewJson.data.map((reviewItem:any)=>(
                    <ReviewCard user={reviewItem.user} rating={reviewItem.rating} review={reviewItem.review}/>
                ))
            }
            </div>
        </div>
        
    );
}