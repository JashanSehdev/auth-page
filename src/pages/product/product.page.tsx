import styles from "./product.page.module.css";
import {
  Box,
  Button,
  createTheme,
  IconButton,
  ImageListItem,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import AddToCartButton from "../../components/add-to-cart-button/add-to-cart-button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { unsetProduct } from "../../feature/product/product.slice";

declare module "@mui/material/styles" {
  interface Palette {
    ochre: Palette["primary"];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include an ochre option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

function ProductPage() {
  const product = useSelector((state: RootState) => state.product.product);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  });

  const theme = createTheme({
    palette: {
      ochre: {
        main: "#E3D026",
        light: "#E9DB5D",
        dark: "#A29415",
        contrastText: "#242105",
      },
    },
  });

  const handleBack = () => {
    dispatch(unsetProduct());
    
  };
  return (
    <Box className={styles.root}>
      <IconButton onClick={handleBack}>
        <ArrowBackSharpIcon fontSize="large" color="primary" />
      </IconButton>
      <Box className={styles.container}>
        <Box component="img" src={product?.img_url} className={styles.image} />
        <ThemeProvider theme={theme}>
          <Box className={styles.details}>
            <Typography variant="h3" gutterBottom>
              {" "}
              {product?.product_name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {" "}
              ${product?.price}
            </Typography>
            <AddToCartButton id={product?.id || ""} email={user?.email || ""} />
            <Typography variant="body1" gutterBottom>
              {product?.description}
            </Typography>
          </Box>
        </ThemeProvider>
      </Box>
    </Box>
  );
}

export default ProductPage;
