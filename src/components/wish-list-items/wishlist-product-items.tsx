
import WishListCard from "../wish-list-card/wishlist-product-card";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function RenderWishListItems () {
    const wishlist = useSelector((state : RootState) => state.wishlist.wishlist)
    const user = useSelector((state : RootState) => state.auth.user)
    return (
    <div>
        {
            wishlist.map((item) => (
                item.user_email === user?.email ? 
                <WishListCard
                    id = {item.id}
                    image={item.img_url}
                    product_name={item.product_name}
                    price={item.price}
                    publisher_email={item.publisher_email}
                    wishlist_date={item.wishlist_date}
                /> : null
            ))
        }
    </div>)
}