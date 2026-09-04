import { FieldError, UseFormRegister } from "react-hook-form";
import {z} from "zod";
import { Role } from "../../feature/auth/auth.type";


export type FormData = z.infer<typeof signUpSchema>
export const signUpSchema = z.object({
    email : z.string().min(1, {message : "Email required"}).email(),
    name : z.string().min(1, {message : "Name required"}),
    password : z.string().min(6, { message : "Password should be atleast 6 words"}).max(20),
    confirmPassword : z.string().min(1, {message : "confirm password requied"}),
    role : z.nativeEnum(Role)
})

.refine((data) => data.password === data.confirmPassword , {
    message : "Password do not match",
    path: ["confirmPassword"]
}) 

export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
}

  export type ValidFieldNames =
  | "email"
  | "name"
  | "password"
  | "confirmPassword"
  | "role";


