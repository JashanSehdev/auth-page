import {z} from 'zod'
import { FieldError, UseFormRegister } from "react-hook-form";

export type FormData = z.infer<typeof addProductSchema>
export const addProductSchema = z.object({
    product_name : z.string('Must be a valid string').min(2, 'Minimum 2 words required'),
    description : z.string('Must be a valid string').min(2, 'Minimum 2 words required'),
    price : z.string(),
    img_url: z.string().url()
})

export type addProductType = z.infer <typeof addProductSchema>


type ValidFieldNames = 
    'product_name'
    | 'description'
    | 'price'
    | 'img_url'