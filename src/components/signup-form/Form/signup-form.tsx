import { useForm } from "react-hook-form";
import { FormData, signUpSchema } from "../input.type";
import FormField from "../form-field";
import PasswordField from "../password-field";
import SelectField from "../select-field";
import {zodResolver} from '@hookform/resolvers/zod'
import styles from './signup.module.css'
import { useDispatch, UseDispatch, useSelector } from "react-redux"; 
import { addUser } from "../../../feature/auth/auth.slice";
import { User } from "../../../feature/auth/auth.type";
import { AppDispatch, RootState } from "../../../store";


function SignUpForm() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((State : RootState) => State.auth.users)
  const user = useSelector((State:RootState) => State.auth.user)
  console.log(users, user);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = async (data: FormData) => {
    const addUserData = {
      name : data.name,
      email : data.email,
      password : data.password,
      role : data.role
    }
      dispatch(addUser(addUserData))
  }

  return (
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <FormField
            type="name"
            placeholder="Name"
            name="name"
            register={register}
            error={errors.name}
          />
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

          
            <PasswordField
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
          />

          

          <SelectField
            type="text"
            placeholder="Role"
            name="role"
            register={register}
            error={errors.confirmPassword}
          />


          <button type="submit" className={styles.submit_button}>
            Submit
          </button>
      </form>
  );
}

export default SignUpForm;