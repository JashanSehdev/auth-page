import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { logout } from "../../feature/auth/auth.slice";
import styles from './navbar.module.css'

export default function Navbar () {
    const user = useSelector((state : RootState) => state.auth.user);
    const dispatch = useDispatch()
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Nopo</div>
            {
                user ? <button onClick={() => {dispatch(logout())}}>LogOut</button> : <p></p>
            }
        </div>
    )
}