import config from "@/utils/config";

export default async function getReview(id:string) {
    
    const response = await fetch(`${config.api}/reviews/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch reviews ' + response.statusText);
        
    }

    return await response.json();
    
}