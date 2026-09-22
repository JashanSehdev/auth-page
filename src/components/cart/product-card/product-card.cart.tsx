import { useDispatch } from 'react-redux';
import styles from './product-card.module.css'
import { Box, Button, CardMedia, IconButton } from '@mui/material';
import { CartCardProp } from './product-card.cart.type';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import { delete_Product } from '../../../feature/product/product-list/product.actions';
import { AppDispatch } from '../../../store';

export default function CartCard(prop: CartCardProp) {
    const dispatch = useDispatch<AppDispatch>();
    const handleDelete = () => {
        const id : number = Number.parseInt(prop.id);
        dispatch(delete_Product(id))
    }
    const date = new Date(prop.cart_date).toLocaleDateString('en-GB', {
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
                    {/* <AddToCartButton id={prop.id} email={prop.user_email} /> */}
                    <IconButton aria-label="delete wishlist" onClick={handleDelete}>
                        <DeleteForeverRoundedIcon />
                    </IconButton>
                </div>

            </div>
        </Box>
    )
}