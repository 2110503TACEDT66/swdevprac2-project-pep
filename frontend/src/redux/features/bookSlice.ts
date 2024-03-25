import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";

type BookState = {
    bookItems: BookingItem[]
}

const initialState:BookState = {bookItems:[]}

export const bookSlice = createSlice({
    name: "mybooking",
    initialState,
    reducers: {
        addBooking: (state, action:PayloadAction<BookingItem>)=>{
            const existingIndex = state.bookItems.findIndex((item)=>item.id === action.payload.id)
            if (existingIndex !== -1){
                state.bookItems[existingIndex] = action.payload
            } 
            else {
                state.bookItems.push(action.payload)
            }
            
        },
        removeBooking: (state, action:PayloadAction<string>)=>{
            state.bookItems = state.bookItems.filter(obj => obj.id !== action.payload )
        }
    }
})

export const {addBooking, removeBooking} = bookSlice.actions
export default bookSlice.reducer