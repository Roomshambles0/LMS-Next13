import { z } from "zod";
export const adminInput = z.
object({
    name: z.
    string( {invalid_type_error: "Name must be a string"}).
    min(4 ,{
        message: "Name is required"
    }).
    max(10,{message:"Name is too long"}),
    email: z.string({invalid_type_error: "Name must be a string"}).
    min(10 ,{
        message: "email is required"
    }).
    max(50),
    password: z.string({invalid_type_error: "Name must be a string"}).
    min(8 ,{
        message: "password is required"
    })
})


export type SignupParams = z.infer<typeof adminInput>;