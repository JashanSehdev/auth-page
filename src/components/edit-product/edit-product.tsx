import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EditForm } from './edit-product.type';
import { resolve } from 'path';
import { zodResolver } from '@hookform/resolvers/zod';
import { editFormSchema } from './edit-product.type';
import { Product } from '../../feature/product/product-slice.type';
import styles from './edit-product.module.css'
import { useAppDispatch } from '../../store';
import { edit_product } from '../../feature/product/product-list/product.actions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type Prop = {
    product : Product
}
export default function EditDialog(prop: Prop) {
  const {product} = prop
 
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch()

  const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setOpen(true);
  };
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditForm>({
    resolver: zodResolver(editFormSchema),
    defaultValues : {
        description : product.description,
        price: `${product.price}`,
        product_name : product.product_name,
        img_url : product.img_url
    }
  }
  )
  const onSubmit: SubmitHandler<EditForm> = (data : EditForm) => {
    console.log(data);
    const send_data: Product = {
        publisher_email: product.publisher_email,
        id : product.id,
        product_name: data.product_name,
        price: Number.parseInt(data.price),
        description: product.description,
        img_url: product.img_url
    }
    dispatch(edit_product(send_data));
    

  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Product
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        onClick={(e)=>e.stopPropagation()}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Product
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
 

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <TextField 
                    label='Product name'
                    {...register('product_name')}
                />
                <TextField 
                    label='description'
                    {...register('description')}
                />
                <TextField 
                    label='img_url'
                    {...register('img_url')}
                />
                <TextField 
                    label='price'
                    {...register('price')}
                />
                <Button type='submit' onClick={(e) => e.stopPropagation()}>Submit</Button>
            </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}