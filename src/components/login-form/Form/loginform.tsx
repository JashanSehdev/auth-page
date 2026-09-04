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
import { error } from "console";


function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((State : RootState) => State.auth.users)
  const user = useSelector((State:RootState) => State.auth.user)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = async (data: FormData) => {
    dispatch(login({email : data.email, password : data.password}))
  }

  return (
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
  );
}

export default LoginForm;