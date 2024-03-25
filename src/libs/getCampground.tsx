import config from "@/utils/config";

export default async function getCampground(id:string) {
    
    const response = await fetch(`${config.api}/campgrounds/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch campgrounds ' + response.statusText);
    }

    return await response.json();
    
}