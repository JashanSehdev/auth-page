import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {InitialState, wishlistProduct , RemoveFromWishlist}  from './wishlist.type'
import { RootState } from "../../store";

const initialState : InitialState  = {
    wishlist : [],
    

}

const wishlistSlice = createSlice({
    name : 'wishlist',
    initialState,
    reducers : {
        addToWishlist : (state, action : PayloadAction<wishlistProduct>) => {
           
            const product = state.wishlist.find((item) => item.id === action.payload.id && item.user_email === action.payload.user_email)
            
            if (!product) {
                state.wishlist.push(action.payload);
            }
        },

        removeFromWishlist : (state, action : PayloadAction<RemoveFromWishlist>) => {
            state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id && item.user_email === action.payload.user_email );
        }
    }

})


export const {addToWishlist, removeFromWishlist} = wishlistSlice.actions

export default wishlistSlice.reducer