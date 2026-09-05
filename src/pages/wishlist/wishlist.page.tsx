import { useSearchParams } from "react-router-dom"
import RenderWishListItems from "../../components/wish-list-items/wishlist-product-items"
import { useSelector } from "react-redux"
import { RootState } from "../../store"


export default function Wishlist ()  {
    const wishlist = useSelector((state : RootState) => state.wishlist.wishlist)
    return (
        <div>
            {
                wishlist.length === 0 ? 
                <h1>Your wish list is empty</h1> 
                :   <RenderWishListItems />
            }

        </div>
    )
}