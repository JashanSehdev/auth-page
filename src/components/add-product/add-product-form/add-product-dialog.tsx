import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useForm } from "react-hook-form";
import styles from "./add-product.module.css";
import {
  AddProductSchemaInput,
  AddProductSchemaOutput,
  addProductSchema,
} from "../type/add-product.type";
import FormField from "../form-field/form-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { addProduct } from "../../../feature/product/product.slice";
import FormDescription from "../form-description/form-description";
import { Box } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductSchemaInput, any, AddProductSchemaOutput>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      product_name: "",
      description: "",
      price: 0,
      img_url: "",
    },
  });

  const onSubmit = async (data: AddProductSchemaOutput) => {
    const uniqueId = crypto.randomUUID();
    dispatch(
      addProduct({
        id: uniqueId,
        publisher_email: user?.email || "none",
        ...data,
      }),
    );

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
              type="number"
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
