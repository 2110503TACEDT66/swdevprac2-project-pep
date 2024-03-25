
import CampgroundCatalog from "@/components/CampgroundCatalog";

export default function Campground(){
    return(
        <main className="text-center p-0">
            <h1 className="text-2xl font-medium bg-sky-900 text-slate-200 pt-10">Select Campground</h1>
            <CampgroundCatalog></CampgroundCatalog>
        </main>
    );
    }

