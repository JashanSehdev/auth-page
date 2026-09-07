
export type InitialState = {
    products : Product[],
    error : string | undefined,
    product : Product | undefined
}

export type Product = {
    id : string,
    publisher_email : string
    product_name : string,
    description : string,
    img_url : string,
    price : number,
}

export type InputProduct = {
    publisher_email : string
    product_name : string,
    description : string,
    img_url : string,
    price : number
}