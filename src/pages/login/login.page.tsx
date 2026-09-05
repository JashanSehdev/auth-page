import { useSelector } from "react-redux";
import LoginForm from "../../components/login-form/Form/loginform";
import { RootState } from "../../store";
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import background_image from "../../assets/login.jpg"
import styles from './login.module.css'

export default function Login () {
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
                <h1>Login</h1>
                 <LoginForm />
                 <p className={styles.options}>Don't have account? <span onClick={() => navigate("/register")}>Register</span></p> 
            </div>
           
        </div>
    )
}