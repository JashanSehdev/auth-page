import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, InputProduct, Product } from "./product-slice.type";
import { useId } from "react";

const currentProduct : Product = {
    id : "0ab6ea86-3199-43bf-8c5f-990888832ef5",
    publisher_email : 'rishi@gmail.com',
    product_name : "weqfdew",
    description : "fewfwef",
    img_url : "https://imgs.search.brave.com/36aOlSrqe9hMq3zbkfup1F41TnxCFzsrJAzgyFty5FI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9waXNj/ZXMuYmJ5c3RhdGlj/LmNvbS9pbWFnZTIv/QmVzdEJ1eV9VUy9k/YW0vUkVGLTIzNzMx/NTAtaXBob25lMTZl/LWxvYi1mbHhfREVS/LTgwYmIxNjM1LWU4/YWUtNDViNi05MTI2/LWZkMzNjNzgzOWM4/MS5qcGc7bWF4SGVp/Z2h0PTMzNDttYXhX/aWR0aD0zMzQ_Zm9y/bWF0PXdlYnA",
    price : 4522,
}

const initialState : InitialState = {
    products : [],
    error : undefined,
    product : undefined
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
        },

        deleteProduct (state, action : PayloadAction<string>) {
            state.products = state.products.filter((item) => item.id !== action.payload);
        },

        setProduct (state, action : PayloadAction<Product>) {
            state.product = action.payload
        },

        unsetProduct (state) {
            state.product = undefined
        }
    
    },
})

export const {addProduct, deleteProduct, setProduct ,unsetProduct} = productSlice.actions
export default productSlice.reducer