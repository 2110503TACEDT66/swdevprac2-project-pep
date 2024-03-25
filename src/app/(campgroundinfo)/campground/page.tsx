import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";

export default async function Campground(){
    const campgrounds = await getCampgrounds();
    return(
        <main className="text-center p-0">
            <h1 className="text-2xl font-medium bg-sky-900 text-slate-200 pt-10">Select Campground</h1>
            <CampgroundCatalog campgroundJson={campgrounds}/>
        </main>
    );
    }

