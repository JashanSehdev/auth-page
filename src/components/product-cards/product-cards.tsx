import ProductCard from "../product-card/product-card";
import styles from "./product-cards.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import SearchBar from "../search-bar/search-bar";
import { Product } from "../../feature/product/product-slice.type";
import { fetchAllProduct } from "../../feature/product/product-list/product.actions";

type Prop = {
  vendor?: boolean;
  AddToCartButton?: boolean;
  deleteProductButton?: boolean;
  favourite?: boolean;
  edit?: boolean;
};

function ProductCards(prop: Prop) {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const user = useSelector((state: RootState) => state.auth.user);
  const productsToDisplay = prop.vendor ? products.filter((item) => item.publisher_email === user?.email) : products;
  const [productList, setProductList] = useState<Product[]>(productsToDisplay);

  useEffect(() => {
    // setProductList(productsToDisplay);
    dispatch(fetchAllProduct())
  }, []);
  console.log(products)

  return (
    <div>   
      <div className={styles.container}>
        {products.map((item) => (
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
