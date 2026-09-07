import { useSelector } from "react-redux"
import { RootState } from "../../store"
import styles from './dashboard.module.css'
import {useNavigate } from "react-router-dom"
import { Component, useEffect } from "react"
import ProductCards from "../../components/product-cards/product-cards"
import AlertDialogSlide from "../../components/add-product/add-product-form/add-product-dialog"
import { Box, TextField, Typography } from "@mui/material"

export default function Dashboard () {
    const user = useSelector((state : RootState) => state.auth.user)
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== 'vendor'){
            navigate("/")
        }
    })
    return(
        <Box className={styles.root}>
            <Typography variant="h2" sx={{fontWeight: 100}} align="center">Published Product</Typography>

            <Box className={styles.container}>
                <TextField
                    label="Search"
                    placeholder="Search Product"
                /> 
                <AlertDialogSlide/>
            </Box>
            
            <ProductCards vendor deleteProductButton edit />
        </Box>
        // <div className={styles.container} >
        //     <div className={styles.callingCard}>
        //     <h1>Hi {user?.name}</h1>
        //     <h2>Your email is {user?.email}</h2>
        //     <h2>Your Role is {user?.role}</h2>
        //     <AlertDialogSlide/>
        //     </div>

        //     <ProductCards vendor deleteProductButton edit />
            
        // </div>
    )
}