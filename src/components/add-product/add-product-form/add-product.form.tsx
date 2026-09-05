import { useForm } from "react-hook-form";
import styles from './add-product.module.css'
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
import { Button } from "@mui/material";
import FormDescription from "../form-description";

export default function AddProductForm() {
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
    dispatch(addProduct({ id: uniqueId, publisher_email: user?.email || "none", ...data }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <FormField
        type="text"
        placeholder="Product name"
        name="product_name"
        register={register}
        error={errors.product_name}
      />
      {/* <FormField
        type="text"
        placeholder="Description"
        name="description"
        register={register}
        error={errors.description}
      /> */}
      <FormDescription
        type="text"
        placeholder = "Product Description"
        name = "description"
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
        placeholder="Image Url"
        name="img_url"
        register={register}
        error={errors.img_url}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
