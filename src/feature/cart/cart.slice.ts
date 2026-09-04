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
            const product = state.cart.find((c : Cart) => c.id === action.payload.id);

            if (product) {
                product.quantity++;
                return;
            }

            state.cart.push(action.payload);
        }
    }
})