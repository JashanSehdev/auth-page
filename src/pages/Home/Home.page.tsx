import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import ProductCards from "../../components/product-cards/product-cards";
import { TextField } from "@mui/material";
import styles from "./home.module.css";
import ProductCard from "../../components/product-card/product-card";
import { Product } from "../../feature/product/product-slice.type";

function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  const products = useSelector((state: RootState) => state.product.products);
  const navigate = useNavigate();
  const [productList, setProductList] = useState<Product[]>(products);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const { value } = e.target;
    console.log(value);
    setProductList(
      products.filter((item) => {
        if (value.length > 3) return true;
        const stringLower = value.toLowerCase();

        return (
          item.product_name.toLowerCase().includes(stringLower) ||
          item.description.toLowerCase().includes(stringLower)
        );
      }),
    );
  };

  return (
    <div>
      <TextField
        label="Search"
        placeholder="Search Product"
        onChange={handleChange}
        className={styles.search}
      />
      <div>
        <div className={styles.container}>
          {productList.map((item) => (
            <ProductCard
              key={item.id}
              publisher_email={item.publisher_email}
              user_email={user?.email || ""}
              image={item.img_url}
              name={item.product_name}
              description={item.description}
              price={item.price}
              id={item.id}
            />
          ))}
        </div>
      </div>
      <ProductCards AddToCartButton favourite />
    </div>
  );
}

export default Home;
