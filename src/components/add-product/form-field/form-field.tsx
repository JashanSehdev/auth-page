import React from "react";
import { TextField } from "@mui/material";
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";



export interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  type: string;
  placeholder: string;
  name: Path<TFieldValues>;            // Ensures name is a valid key of the form
  register: UseFormRegister<TFieldValues>; // Syncs register with the form values
  error?: FieldError;                  // Strongly types the error object
  valueAsNumber?: boolean;
}

const FormField = <TFieldValues extends FieldValues>({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}: FormFieldProps<TFieldValues>) => (
  <>
    <TextField
      fullWidth
      id="outlined-basic"
      label={placeholder}
      variant="outlined"
      placeholder={placeholder}
      type={type}
      // Pass valueAsNumber configuration directly into register options if required
      {...register(name, { valueAsNumber })}
      error={!!error}
      helperText={error?.message}
    />
  </>
);

export default FormField;
