
import { Box, IconButton } from "@mui/material"
import { WishlistCard } from "./wishlist-product-type"
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { removeFromWishlist } from "../../feature/wishlist/wishlist.slice";
import { useDispatch } from "react-redux";
import CardMedia from '@mui/material/CardMedia';
import styles from './wish-list-card.module.css'
import AddToCartButton from "../add-to-cart-button/add-to-cart-button";

export default function WishListCard(prop: WishlistCard) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(removeFromWishlist({user_email : prop.user_email , id : prop.id}))
    }
    const date = new Date(prop.wishlist_date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <Box className={styles.container}>

            <div className={styles.media}>
                <CardMedia
                    component="img"
                    image={prop.image}
                    alt={prop.product_name}
                />
            </div>

            <div className={styles.details}>
                <div className={styles.sub_details}>
                    {/* product description */}
                    <p className={styles.title}>{prop.product_name}</p>
                    <p className={styles.publisher}>By {prop.publisher_email}</p>
                    <p className={styles.price}>₹{prop.price}</p>
                </div>
                <div>
                    item added at: {date}
                </div>

                <div>
                    <AddToCartButton id={prop.id} email={prop.user_email} />
                    <IconButton aria-label="delete wishlist" onClick={handleDelete}>
                        <DeleteForeverRoundedIcon />
                    </IconButton>
                </div>

            </div>
        </Box>
    )
}