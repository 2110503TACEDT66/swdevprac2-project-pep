import ReviewCard from './ReviewCard';
import axios from 'axios';
import config from '../utils/config';
interface ReviewItem {
    _id: string;
    user: string;
    rating: number;
    review: string;
}

interface ReviewCatalogProps {
    reviewJson: { count: number, data: ReviewItem[] };
    currentUser: string;
}

export default function ReviewCatalog({ reviewJson, currentUser}: ReviewCatalogProps) {
    
    console.log(reviewJson.data);
    const handleDelete = async (_id: string) => {
        try {
            const response = await axios.delete(`${config.api}/reviews/${_id}`, config.headers());
            if (response.data.success) {
                // Handle successful deletion
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };


    return (
        <div className="h-screen m-[20px] bg-indigo-200">
            <div className="h-[50%] px-48 flex flex-col overflow-clip overflow-y-scroll">
                {reviewJson.data.map((reviewItem: ReviewItem) => (
                    <ReviewCard
                        key={reviewItem._id}
                        _id={reviewItem._id}
                        user={reviewItem.user}
                        rating={reviewItem.rating}
                        review={reviewItem.review}
                        allowDelete={reviewItem.user == currentUser}
                        onDelete={() => handleDelete(reviewItem._id)}
                    />
                ))}
            </div>
        </div>
    );
}