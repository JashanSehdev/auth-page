import { useForm } from "react-hook-form";
import { FormData, signUpSchema } from "../input.type";
import FormField from "../form-field";
import PasswordField from "../password-field";
import {zodResolver} from '@hookform/resolvers/zod'
import { useDispatch, UseDispatch, useSelector } from "react-redux"; 
import { addUser, login } from "../../../feature/auth/auth.slice";
import { User } from "../../../feature/auth/auth.type";
import { AppDispatch, RootState } from "../../../store";
import styles from './form.module.css'
import { error, log } from "console";
import { useState } from "react";
import SimpleSnackbar from "../snack-bar";


function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((State : RootState) => State.auth.users)

  const [error, setError] = useState<string>("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = async (data: FormData) => {
    const user = users.find((u) => u.email === data.email);

    if (!user) {
      setError("User not found")
      return;
    }

    if (user.password !== data.password) {
      setError("Password is Incorrect");
      return;
    }

    dispatch(login({email : data.email, password : data.password}))
    setError("")
  }

  console.log(error)
  return (
      <div>
        <SimpleSnackbar error={error}/>
        <form  onSubmit={handleSubmit(onSubmit)} className={styles.container}>
          <FormField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
          />

          <PasswordField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
          />
           {
          errors.password && <p className={styles.error}>
            {errors.password.message}
          </p>
        }

          <span>Forget Password</span>

          <button type="submit" className={styles.submit_button}>
            Submit
          </button>
          
      </form>
      </div>
      
  );
}

export default LoginForm;