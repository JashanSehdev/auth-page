

export type InitialState = {
    wishlist : wishlistProduct[]
}

export type wishlistProduct = {
    id : string,
    publisher_email : string
    product_name : string,
    description : string,
    img_url : string,
    price : number,
    user_email : string,
    wishlist_date : Date

}

export type RemoveFromWishlist = {
    user_email : string,
    id : string
}
