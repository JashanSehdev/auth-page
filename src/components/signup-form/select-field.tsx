import { FormFieldProps } from "./input.type";
import React from "react";
import { TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';

const SelectField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber,
}) =>{

    const roles = [
        {
            label : "Vendor",
            value : "vendor"
        },
        {
            label : "Buyer",
            value : "buyer"
        }
    ]

    return(
    <>
    <TextField
          id="outlined-select-currency"
          select
          {...register(name)}
          label={name}
          defaultValue="buyer"

        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </>
)
}



export default SelectField