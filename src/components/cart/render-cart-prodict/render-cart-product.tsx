
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import CartCard from '../product-card/product-card.cart';

export default function RenderCartProducts() {
    const cart = useSelector((state: RootState) => state.cart.cart);
    const user = useSelector((state: RootState) => state.auth.user);
    const cart_date = new Date(Date.now())
    return (
        <div>
            {
                cart.map((item) => (
                    item.user_email === user?.email ?
                        <CartCard
                            id={item.id}
                            image={item.img_url}
                            product_name={item.product_name}
                            price={item.price}
                            publisher_email={item.publisher_email}
                            cart_date={item.cart_date}
                            user_email={user.email}
                        /> : null
                ))
            }
        </div>
    )
}
