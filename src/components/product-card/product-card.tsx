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
import EditSharpIcon from '@mui/icons-material/EditSharp';

import {
  addToWishlist,
  removeFromWishlist,
} from "../../feature/wishlist/wishlist.slice";
import { useDispatch, useSelector } from "react-redux";
import { wishlistProduct } from "../../feature/wishlist/wishlist.type";
import { RootState } from "../../store";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { deleteProduct, setProduct } from "../../feature/product/product.slice";
import { Product } from "../../feature/product/product-slice.type";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../add-to-cart-button/add-to-cart-button";
import React from "react";

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
  edit ?: boolean;
};

export default function ProductCard(prop: Prop) {
  const navigate = useNavigate();
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
  const handleWishList : React.MouseEventHandler<HTMLButtonElement>  = (e) => {
    e.stopPropagation()
    if (!isWishlisted) dispatch(addToWishlist(wishlistProduct));
    else
      dispatch(
        removeFromWishlist({ user_email: prop.user_email || "", id: prop.id }),
      );
  };

  const HandleDeleteProduct : React.MouseEventHandler<HTMLButtonElement>= (e) => {
    e.stopPropagation()
    dispatch(deleteProduct(prop.id));
  };


  const handleSetProduct = () => {
    const product : Product = {
      id : prop.id,
      publisher_email : prop.user_email,
      product_name : prop.name,
      description : prop.description,
      img_url : prop.image,
      price : prop.price,
    }
    dispatch(setProduct(product));
    navigate("/product")
  }

  return (
    <Card className={styles.container} onClick={handleSetProduct}>
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
        
        {
          prop.addToCartButton && <AddToCartButton email={prop.user_email} id={prop.id} />
        }
        
        {prop.deleteProduct ? (
          <IconButton aria-label="shopping cart" onClick={HandleDeleteProduct}>
            <DeleteForeverRoundedIcon />
          </IconButton>
        ) : null}

        {
          prop.edit && (
            <IconButton aria-label="shopping cart" >{/* need to handle edit product*/}
              <EditSharpIcon />
            </IconButton>
          )
        }
      </CardActions>
    </Card>
  );
}
