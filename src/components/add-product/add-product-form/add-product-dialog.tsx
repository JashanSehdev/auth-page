import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./add-product.module.css";
import {
  addProductSchema,
  addProductType,
} from "../type/add-product.type";
import FormField from "../form-field/form-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../../store";
import { addProduct } from "../../../feature/product/product.slice";
import FormDescription from "../form-description/form-description";
import { Box } from "@mui/material";
import { postProduct } from "../../../feature/product/product-list/product.actions";
import { InputProduct } from "../../../feature/product/product-slice.type";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const user = useSelector((state: RootState) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addProductType>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      product_name: "",
      description: "",
      price: '',
      img_url: "",
    },
  });

  const onSubmit : SubmitHandler<addProductType> = async (data: addProductType) => {

    const sendData : InputProduct = {
      ...data,
      publisher_email: user?.email || "none",
      price : Number.parseInt(data.price)
    }
    try {
      // 2. Unwrap the thunk result to handle promise resolution/rejection locally
      await dispatch(postProduct(sendData)).unwrap();
      handleClose(); // Close dialog only on success
    } catch (error) {
      console.error("Failed to add product:", error);
      // Keep dialog open so user sees form validation or global error banners
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Product
      </Button>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
        fullWidth
        fullScreen
      >
        <DialogTitle>{"Add your Product here."}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="add-product-form"
            className={styles.container}
          >
            <FormField
              type="text"
              placeholder="Product name"
              name="product_name"
              register={register}
              error={errors.product_name}
            />
            <FormDescription
              type="text"
              placeholder="Product Description"
              name="description"
              register={register}
              error={errors.description}
            />

            <FormField
              type="text"
              placeholder="price"
              name="price"
              register={register}
              // error={errors.price}
            />
            <FormField
              type="text"
              placeholder="Image URL"
              name="img_url"
              register={register}
              error={errors.img_url}
            />
            <Box>
              <Button type="submit">Submit</Button>
              <Button onClick={handleClose} type="reset">Cancel</Button>
            </Box>
            
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
