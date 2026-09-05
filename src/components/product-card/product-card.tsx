import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './product-card.module.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addToWishlist, removeFromWishlist } from '../../feature/wishlist/wishlist.slice';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistProduct } from '../../feature/wishlist/wishlist.type';
import { RootState } from '../../store';

type Prop = {
    image : string,
    description : string,
    name : string,
    price : number,
    email : string,
    id : string
}

export default function ProductCard(prop :  Prop) {
  const dispatch = useDispatch(); 
  const user = useSelector((state : RootState) => state.auth.user );
  const wishlist = useSelector((state : RootState) => state.wishlist.wishlist);
  const isWishlisted = wishlist.some((item) => item.id === prop.id && item.user_email === user?.email);
  const user_email : string = user?.email || "";
  const wishlistProduct : wishlistProduct = {
    img_url : prop.image,
    product_name : prop.name,
    description : prop.description,
    publisher_email : prop.email,
    user_email : user_email,
    wishlist_date : new Date(Date.now()),
    id : prop.id,
    price : prop.price
  }
  const handleWishList = () => {
    if (!isWishlisted) dispatch(addToWishlist(wishlistProduct))
    else dispatch(removeFromWishlist(prop.id))
  }
  return (
    <Card  className={styles.container}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {prop.email.charAt(0).toUpperCase()}
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
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {prop.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton color={isWishlisted ? 'error' : 'default'} aria-label={isWishlisted ? "remove from wishlist" : "add to wishlist"} onClick={handleWishList}>
          <FavoriteIcon />
        </IconButton>
        <IconButton  aria-label="shopping cart" >
          <ShoppingCartIcon />
        </IconButton>

      </CardActions>
    </Card>
  );
}