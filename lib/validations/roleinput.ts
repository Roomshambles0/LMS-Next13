import  { z } from "zod";


enum Role {
    Student = 'student',
    Admin = 'teacher',
  }


export const roleinput = z.object( 
    {
       type: z.nativeEnum(Role),
    }
);


type roleinput = z.infer<typeof roleinput>;