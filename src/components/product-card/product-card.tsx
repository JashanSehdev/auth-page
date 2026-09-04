import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import styles from './product-card.module.css'

type Prop = {
    image : string,
    description : string,
    name : string,
    price : number,
    email : string
}

export default function PrductCard(prop :  Prop) {

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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

      </CardActions>
    </Card>
  );
}