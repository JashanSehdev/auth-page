import z from "zod";

export const editFormSchema = z.object({
    product_name : z.string(),
    description : z.string(),
    img_url : z.string(),
    price : z.string(),
})


export type EditForm = z.infer<typeof editFormSchema>