import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import  background_image from '../../assets/login.jpg'
import ProductCards from "../../components/product-cards/product-cards";

function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  const products = useSelector((state: RootState) => state.product.products);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } 
  });
  return <div style={{backgroundImage : `url(${background_image})`}}>
    <ProductCards vendor={false} />

  </div>;
}

export default Home;
