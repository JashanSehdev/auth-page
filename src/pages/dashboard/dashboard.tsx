import { useSelector } from "react-redux"
import { RootState } from "../../store"
import styles from './dashboard.module.css'
import background_image from '../../assets/login.jpg'
import { Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Button } from "@mui/material"
import SimpleDialogDemo from "../../components/modal/dialog"
import ProductCards from "../../components/product-cards/product-cards"

export default function Dashboard () {
    const user = useSelector((state : RootState) => state.auth.user)
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== 'vendor'){
            navigate("/")
        }
    })
    return(
        <div className={styles.container} style={{backgroundImage : `url(${background_image})` }} >
            <div className={styles.callingCard}>
            <h1>Hi {user?.name}</h1>
            <h2>Your email is {user?.email}</h2>
            <h2>Your Role is {user?.role}</h2>
            <SimpleDialogDemo />
            </div>

            <ProductCards vendor={true}/>
            
        </div>
    )
}