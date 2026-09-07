import ProductCard from "../product-card/product-card";
import styles from "./product-cards.module.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SearchBar from "../search-bar/search-bar";
import { Product } from "../../feature/product/product-slice.type";

type Prop = {
  vendor?: boolean;
  AddToCartButton?: boolean;
  deleteProductButton?: boolean;
  favourite?: boolean;
  edit?: boolean;
};

function ProductCards(prop: Prop) {
  
  const products = useSelector((state: RootState) => state.product.products);
  const user = useSelector((state: RootState) => state.auth.user);
  const productsToDisplay = prop.vendor ? products.filter((item) => item.publisher_email === user?.email) : products;
  const [productList, setProductList] = useState<Product[]>(productsToDisplay);

  useEffect(() => {
    setProductList(productsToDisplay);
  }, [productsToDisplay]);

  return (
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
            addToCartButton={prop.AddToCartButton}
            deleteProduct={prop.deleteProductButton}
            favourite={prop.favourite}
            edit={prop.edit}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductCards;
