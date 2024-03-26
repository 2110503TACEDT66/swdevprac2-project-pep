import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";

export default async function Campground(){
    const campgrounds = await getCampgrounds();
    return(
        <main className="h-[90vh] mt-[10vh]">
            <CampgroundCatalog campgroundJson={campgrounds}/>
        </main>
    );
    }

