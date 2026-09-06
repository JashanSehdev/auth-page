import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, InputCart} from "./cart.type";
import { data } from "react-router-dom";

type InitialState = {
    cart : Cart[],
}

const initialState : InitialState = {
    cart : []
}

type SetCart = {
    user_email : string,
    id : string,
    quantity : number;
}


const cartSlice  = createSlice({
    name : 'cartSlice',
    initialState,
    reducers : {
        addToCart : (state, action : PayloadAction<InputCart>) => {
            const existingProduct = state.cart.find((c : Cart) => c.id === action.payload.id && c.user_email === action.payload.user_email);

            if (existingProduct) {
                existingProduct.quantity += 1;
                return;
            }
            state.cart.push({...action.payload, quantity : 1});
        },
        removeFromCart : (state, action : PayloadAction<{user_email : string, id : string}>) => {
            state.cart = state.cart.filter((item : Cart) => item.id !== action.payload.id && item.user_email === action.payload.user_email)
        },

        setAddToCart : (state, action : PayloadAction<SetCart>) => {
            const product = state.cart.find((item) => item.id === action.payload.id && item.user_email === action.payload.user_email);
            
            if (product) {
                product.quantity = action.payload.quantity;
                if (action.payload.quantity === 0) {
                    state.cart = state.cart.filter((item : Cart) => item.id !== action.payload.id && item.user_email === action.payload.user_email);
                }
            }
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

export const {addToCart, removeFromCart, setAddToCart} = cartSlice.actions
export default cartSlice.reducer