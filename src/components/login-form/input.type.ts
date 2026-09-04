import { Message } from "@mui/icons-material";
import { FieldError, UseFormRegister } from "react-hook-form";
import {z, ZodType} from "zod";


export type FormData = z.infer<typeof signUpSchema>

export const signUpSchema = z.object({
    email : z.string().min(1, {message : "Email required"}).email(),
    password : z.string().min(6,{
        message: "password is too short"
    }).max(20, {
        message : "Password is too long"
    }),
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
  | "password"



