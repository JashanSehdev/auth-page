import { useSelector } from "react-redux"
import SignUpForm from "../../components/signup-form/Form/signup-form"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { RootState } from "../../store"
import styles from './signup.module.css'
import background_image from '../../assets/login.jpg'

export default function Signup () {
     const user = useSelector((state : RootState) => state.auth.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            if (user.role === "vendor") {
                navigate('/dashboard')
            } else {
                navigate('/')
            }
        }
    }, [user, navigate])
    return (
        <div className={styles.container} style={{backgroundImage : `url(${background_image})` }}>
            <div className={styles.form_container}>
                <h1>SignUp</h1>
                <SignUpForm/>
                <p className={styles.options}>Already have account? <span onClick={() => navigate("/login")}>Login</span></p> 
            </div>
            
        </div>
    )
}