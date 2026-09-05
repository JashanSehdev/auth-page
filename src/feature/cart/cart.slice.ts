import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "./cart.type";
import { data } from "react-router-dom";

type InitialState = {
    cart : Cart[],
}

const initialState : InitialState = {
    cart : []
}
const cartSlice  = createSlice({
    name : 'cartSlice',
    initialState,
    reducers : {
        addToCart : (state, action : PayloadAction<Cart>) => {
            const existingProduct = state.cart.find((c : Cart) => c.id === action.payload.id);

            if (existingProduct) {
                existingProduct.quantity += 1;
                return;
            }
            state.cart.push({...action.payload, quantity : 1});
        },
        removeFromCart : (state, action : PayloadAction<string>) => {
            state.cart = state.cart.filter((item : Cart) => item.id !== action.payload)
        },
        // decrement should receive the string of product Id
        decrement : (state, action : PayloadAction<string>) => {
            const existingProduct = state.cart.find((c : Cart) => c.id === action.payload);

            if (!existingProduct) return;

            if (existingProduct.quantity <= 1) {
                state.cart = state.cart.filter((item : Cart) => item.id !== action.payload)
            }
            
            existingProduct.quantity -= 1;

        },
        
        increment : (state, action : PayloadAction<string>) => {
            const existingProduct = state.cart.find((c : Cart) => c.id === action.payload);

            if (!existingProduct) {
                return;
            }

            existingProduct.quantity += 1;
            
        }
    }
})

export const {addToCart, decrement, removeFromCart, increment} = cartSlice.actions
export default cartSlice.reducer