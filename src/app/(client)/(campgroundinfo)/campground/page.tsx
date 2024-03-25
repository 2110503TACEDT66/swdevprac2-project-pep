import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";

export default async function Campground(){
    const campgrounds = await getCampgrounds();
    return(
        <main className="text-center p-0">
            <h1 className="text-3xl font-semibold  bg-slate-200 text-sky-800 pt-10">Select Campground</h1>
            <CampgroundCatalog campgroundJson={campgrounds}/>
        </main>
    );
    }

