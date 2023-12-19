import { z } from "zod";


export const createcourseinput = z.object({
   title:z.string()
})


type createcourse = z.infer<typeof createcourseinput>;