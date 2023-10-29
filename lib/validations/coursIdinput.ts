import { z } from "zod";

export const IdInput = z.
string({invalid_type_error: "id must be a string"}).
min(1,{
    message: "id is required"
})