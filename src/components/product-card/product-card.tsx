import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./product-card.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../feature/wishlist/wishlist.slice";
import { useDispatch, useSelector } from "react-redux";
import { wishlistProduct } from "../../feature/wishlist/wishlist.type";
import { RootState } from "../../store";
import NumberSpinner from "../spinner/number-spinner";
import { addToCart, setAddToCart } from "../../feature/cart/cart.slice";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { deleteProduct } from "../../feature/product/product.slice";

type Prop = {
  image: string;
  description: string;
  name: string;
  price: number;
  user_email: string;
  publisher_email: string;
  id: string;
  addToCartButton?: boolean;
  deleteProduct?: boolean;
  favourite?: boolean;
};

export default function ProductCard(prop: Prop) {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const cartProduct = cart.find(
    (item) => item.id === prop.id && item.user_email === prop.user_email,
  );
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);
  const isWishlisted = wishlist.some(
    (item) => item.id === prop.id && item.user_email === prop.user_email,
  );
  const user_email: string = prop.user_email;
  const wishlistProduct: wishlistProduct = {
    img_url: prop.image,
    product_name: prop.name,
    description: prop.description,
    publisher_email: prop.publisher_email,
    user_email: user_email,
    wishlist_date: new Date(Date.now()),
    id: prop.id,
    price: prop.price,
  };

  // handlers
  const handleWishList = () => {
    if (!isWishlisted) dispatch(addToWishlist(wishlistProduct));
    else
      dispatch(
        removeFromWishlist({ user_email: prop.user_email || "", id: prop.id }),
      );
  };

  const HandleAddToCart = () => {
    const productToCart = {
      id: prop.id,
      publisher_email: prop.publisher_email,
      product_name: prop.name,
      description: prop.description,
      img_url: prop.image,
      price: prop.price,
      user_email: prop.user_email,
      cart_date: new Date(Date.now()),
    };
    dispatch(addToCart(productToCart));
  };

  const HandleDeleteProduct = () => {
    dispatch(deleteProduct(prop.id));
  };

  const handleCart = (e: any) => {
    console.log(e);
    dispatch(
      setAddToCart({ user_email: prop.user_email, id: prop.id, quantity: e }),
    );
  };

  return (
    <Card className={styles.container}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {prop.publisher_email.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={prop.name}
        subheader={`${prop.price} INR`}
      />
      <CardMedia
        component="img"
        height="194"
        image={prop.image}
        alt={prop.name}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {prop.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {prop.favourite ? (
          <IconButton
            color={isWishlisted ? "error" : "default"}
            aria-label={
              isWishlisted ? "remove from wishlist" : "add to wishlist"
            }
            onClick={handleWishList}
          >
            <FavoriteIcon />
          </IconButton>
        ) : null}

        {prop.addToCartButton ? (
          !cartProduct ? (
            <IconButton aria-label="shopping cart" onClick={HandleAddToCart}>
              <ShoppingCartIcon />
            </IconButton>
          ) : (
            <NumberSpinner
              onValueChange={handleCart}
              size="small"
              defaultValue={cartProduct?.quantity}
              min={0}
              max={100}
            />
          )
        ) : null}
        {prop.deleteProduct ? (
          <IconButton aria-label="shopping cart" onClick={HandleDeleteProduct}>
            <DeleteForeverRoundedIcon />
          </IconButton>
        ) : null}
      </CardActions>
    </Card>
  );
}
