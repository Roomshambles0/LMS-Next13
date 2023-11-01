import { Pclient } from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";


export const getCurrentstudent = async ()=>{
    try {
        const user= await getCurrentUser();
    
        if (!user) {
          return null;
        }
    
        const currentstudent = await Pclient.student.findUnique({
          where: {
            email: user.email as string,
          }
        });
    
        if (!currentstudent) {
          return null;
        }
    
        return currentstudent;
      } catch (error: any) {
        return null;
      }

}