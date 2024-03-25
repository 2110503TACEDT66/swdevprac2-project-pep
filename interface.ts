export interface CampgroundItem {
    _id: string,
    name: string,
    description:string,
    address: string,
    province: string,
    country:string,
    postalcode: string,
    telephoneNumber: string,
    picture: string
  }
    
  export interface CampgroundJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: CampgroundItem[]
  }
  
  export interface BookingItem {
    name: string,
    surname: string,
    id: string,
    hospital: string,
    bookDate: string
  }