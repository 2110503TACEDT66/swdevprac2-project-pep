// import Image from "next/image"

// export default async function HospitalDetailPage({params}: {params:{hid:string}}){
    
//     const hospitalDetail = await getHospital(params.hid)
    
//     return (
//         <div className='bg-cyan-900 justify-between items-center p-0 m-0 w-screen h-[95vh]'>
//             <div className="flex flex-row p-[20px] text-white">
//                 <Image src={hospitalDetail.data.picture} alt="Car Image" width={0} height={0} sizes="100vw" className="rounded-lg w-[30%]"></Image>
//                 <div className="text-[20px] mx-5 text-left">{hospitalDetail.data.name}
//                     <div className="text-[16px] mx-5">Address: {hospitalDetail.data.address}</div>
//                     <div className="text-[16px] mx-5">District: {hospitalDetail.data.district}</div>
//                     <div className="text-[16px] mx-5">Province: {hospitalDetail.data.province}</div>
//                     <div className="text-[16px] mx-5">Postal Code: {hospitalDetail.data.postalcode}</div>
//                     <div className="text-[16px] mx-5">Telephone: {hospitalDetail.data.tel}</div>
//                 </div>
//             </div>
//         </div>
//     )
// }