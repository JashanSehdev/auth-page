import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import NumberSpinner from "../spinner/number-spinner";
import { Button } from "@mui/material";
import { addToCart, setAddToCart } from "../../feature/cart/cart.slice";

type Prop = {
  email: string;
  id: string;
};

export default function AddToCartButton(prop: Prop) {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const inCart = cart.some(
    (item) => item.id === prop.id && item.user_email === prop.email,
  );
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();
  const product = products.find((item) => item.id === prop.id);
  const cartProduct = cart.find((item) => item.id === prop.id && item.user_email === prop.email)

  const handleAddToCart = () => {

    if (product) {
      dispatch(addToCart({ ...product, user_email: prop.email }));
    }
  };

  const handleProductQuantity = (e: any) => {
    console.log(e);
    dispatch(
      setAddToCart({ user_email: prop.email, id: prop.id, quantity: e }),
    );
  };
  return (
    <div onClick={(e) => e.stopPropagation()}>
      {inCart ? (
        <NumberSpinner 
            min={0} 
            onValueChange={handleProductQuantity} 
            size="small"
            defaultValue={cartProduct?.quantity}
            max={100}
        />
      ) : (
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      )}
    </div>
  );
}
