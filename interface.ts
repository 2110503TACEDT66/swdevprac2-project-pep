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

export interface ReviewItem {
  review: string,
  rating: string,
  campground: string,
  user: string,
  
  
}

export interface ReviewJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: ReviewItem[]
}