import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { InputProduct, Product } from "../product-slice.type";

const url = 'http://localhost:3001/products'

export const fetchAllProduct =  createAsyncThunk(
    'products/fetch-all-products',
    async() => {
        try {
            const response = await axios.get(url);
            if (! response.data) throw new Error('Response not found');
            return response.data

        }catch(err) {
            console.error(err);
            throw err;
        }
    }
)

export const postProduct = createAsyncThunk(
    'products/post-product',
    async(product : InputProduct) => {
        try {
            const response = await axios.post(url, product)
            if (response.status !== 200) throw new Error ('Error occur while sending the data');

            console.log(response);
            return response.data

        } catch(err) {
            console.error(err);
            throw err
        }
    }
)

export const delete_Product =  createAsyncThunk (
    'products/delete-product',
    async(id : number) => {

        try{
             const response = await axios.delete(`${url}/${id}`);
             
             if (response.status !== 200) throw new Error('Error while deleting the item');

             return response.data
        }catch(err) {
            console.error(err);
            throw err
        }
    }
)

export const edit_product = createAsyncThunk(
    'products/edit-product',
    async(product : Product) => {
        try{
            const response = await axios.put(url, product)
            if (response.status !== 200) throw new Error ('Error occur while sending the data');

            console.log(response);
            return response.data

        } catch(error) {
            console.error(error)
            throw error
        }
    }
)