import Image from "next/image"

export default function HospitalDetailPage({params}:{params:{cid:string}}){

    /**
     * Mock Data for demonstration Only
     */

    const mockCampgroundRepo = new Map()
    mockCampgroundRepo.set('001',{name:'Chulalongkorn Hospital',image:'/img/card1.jpg'})
    mockCampgroundRepo.set('002',{name:'Rajavithi Hospital',image:'/img/card1.jpg'})
    mockCampgroundRepo.set('003',{name:'Thammasat University Hospital',image:'/img/card1.jpg'})
    mockCampgroundRepo.set('004',{name:'Thammasat University Hospital',image:'/img/card1.jpg'})
    
    return(
        <main className="text-center p-5 bg-slate-200 h-screen">
            <h1 className="text-lg font-medium">Hospital ID {params.cid}</h1>
            <div className="flex flex-row my-5 ">
                <Image src={(mockCampgroundRepo.get(params.cid
        )).image}
                alt="Car Image"
                width={0}
                height={0}
                sizes="100vh"
                className="rounded-lg w-[30%]"/>
                <div className="text-md mx-5 text-slate-200">
                    {(mockCampgroundRepo.get(params.cid
                )).name}
                </div>
            </div>
        </main>
    );
}

export async function generateStaticParams() {
    return [{cid:'001'},{cid:'002'},{cid:'003'}]
    
}