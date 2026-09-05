import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {InitialState, wishlistProduct}  from './wishlist.type'
import reducer from "../auth/auth.slice";

const initialState : InitialState  = {
    wishlist : [],
    

}

const wishlistSlice = createSlice({
    name : 'wishlist',
    initialState,
    reducers : {
        addToWishlist : (state, action : PayloadAction<wishlistProduct>) => {
            const product = state.wishlist.find((item) => item.id === action.payload.id)
            
            if (!product) {
                state.wishlist.push(action.payload);
            }
        },

        removeFromWishlist : (state, action : PayloadAction<string>) => {
            state.wishlist = state.wishlist.filter((item) => item.id !== action.payload);
        }
    }

})


export const {addToWishlist, removeFromWishlist} = wishlistSlice.actions

export default wishlistSlice.reducer