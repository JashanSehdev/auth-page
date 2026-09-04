import { useSelector } from "react-redux"
import { RootState } from "../../store"
import styles from './dashboard.module.css'
import background_image from '../../assets/login.jpg'

export default function Dashboard () {
    const user = useSelector((state : RootState) => state.auth.user)
    return(
        <div className={styles.container} style={{backgroundImage : `url(${background_image})` }} >
            <div className={styles.callingCard}>
            <h1>Hi {user?.name}</h1>
            <h2>Your email is {user?.email}</h2>
            <h2>Your Role is {user?.role}</h2>
            </div>
            
        </div>
    )
}