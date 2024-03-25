//import config from "@/utils/config";

export default async function getCampgrounds() {
    
    await new Promise((resolve)=>setTimeout(resolve,1000))
    const response = await fetch("https://campground-booking-backend-kq8e.vercel.app/api/v1/campgrounds");

    if (!response.ok) {
        throw new Error('Failed to fetch campgrounds: ' + response.statusText);
    }

    return await response.json();
    
}