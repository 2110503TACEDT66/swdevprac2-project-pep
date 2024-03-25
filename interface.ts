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
  
  export interface BookingItem {
    campground: {
      address: string;
      name: string;
      telephoneNumber: string;
    };
    user: string
    bookingDate: string;
    _id: string;
  }
  
  export interface BookingJSON {
    success: boolean;
    data: BookingItem;
  }

  export interface BookingListJSON {
    success: boolean;
    data: BookingItem[];
  }
  
  export interface UserRole {
    _id: string,
    role: string
  }
  
  export interface UserJSON {
    success: boolean;
    data: UserRole;
    message: string;
  }
  
  export interface DeleteJSON {
    success: boolean;
    data: Object
  }

export interface CampgroundJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: CampgroundItem[]
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
