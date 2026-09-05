
export type InitialState = {
    products : Product[],
    error : string | undefined
}

export type Product = {
    id : string,
    user_email : string
    product_name : string,
    description : string,
    img_url : string,
    price : number
}

export type InputProduct = {
    user_email : string
    product_name : string,
    description : string,
    img_url : string,
    price : number
}