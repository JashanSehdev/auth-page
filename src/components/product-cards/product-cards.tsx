import ProductCard from '../product-card/product-card'
import styles from './product-cards.module.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

type Prop = {
  vendor ?: boolean,
  AddToCartButton ?: boolean,
  deleteProductButton ?: boolean,
  favourite ?: boolean
}

function ProductCards(prop : Prop) {
    const products = useSelector((state : RootState) => state.product.products);
    const user = useSelector((state : RootState) => state.auth.user);
    let productList = products
    if (prop.vendor) {
        productList = products.filter((item) => item.publisher_email === user?.email)
    }
  return (
    <div className={styles.container}>
      {
        productList.map((item) => (
            <ProductCard 
              key={item.id} 
              publisher_email= {item.publisher_email} 
              user_email= {user?.email || ""}
              image = {item.img_url}
              name = {item.product_name}
              description={item.description}
              price = {item.price}
              id = {item.id}
              addToCartButton = {prop.AddToCartButton}
              deleteProduct = {prop.deleteProductButton}
              favourite = {prop.favourite}
            />
        ))
      }
    </div>
  )
}

export default ProductCards
