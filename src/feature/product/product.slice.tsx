import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, InputProduct, Product } from "./product-slice.type";
import { useId } from "react";

const initialState : InitialState = {
    products : [],
    error : undefined
}

const productSlice = createSlice({
    name : "products",
    initialState,
    reducers:{
        addProduct (state, action : PayloadAction<Product>) {
            const product = state.products.find((item) => item.product_name === action.payload.product_name);
            if (product) {
                state.error = "Product name already exist"
                return;
            } 
            state.products.push(action.payload)
        }
    },
})

export const {addProduct} = productSlice.actions
export default productSlice.reducer