import TextField from '@mui/material/TextField';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import { Product } from '../../feature/product/product-slice.type';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


  type Prop = {
    setProductList: (value: React.SetStateAction<Product[]>) => void;
    products : Product[];
  }

export default function SearchBar(prop : Prop) {
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        console.log(prop.products)
        if (value.length > 1)
        prop.setProductList(
            prop.products.filter((item) =>{
                if (value.length < 2) return true;
                const searchLower = value.toLowerCase();
                return(
                    item.product_name.toLowerCase().includes(searchLower) ||
                    item.description.toLowerCase().includes(searchLower)
                )
            })
        )
    }
  return (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}
    >
        <TextField label="Outlined" onChange={handleChange} />
    </Box>
  );
}