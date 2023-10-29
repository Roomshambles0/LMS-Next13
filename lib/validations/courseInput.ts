import { z } from "zod";
export const courseInput = z.
object({
    title: z.
    string( {invalid_type_error: "title must be a string"}).
    min(2 ,{
        message: "title is required"
    }),
    description: z.
    string( {invalid_type_error: "Description must be a string"}).
    min(2 ,{
        message: "Description is required"
    }),
    price:z.
    string( {invalid_type_error: "Price must be a string"}).
    min(2 ,{
        message: "Price is required"
    }),
    imageLink: z.
    string( {invalid_type_error: "ImageLink must be a string"}).
    min(2 ,{
        message: "ImageLink is required"
    }),
    published: z.boolean({
        required_error: "Published is required",
        invalid_type_error: "Published must be a boolean",
      })
})


export type SignupParams = z.infer<typeof courseInput>;