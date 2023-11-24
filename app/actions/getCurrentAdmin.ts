import { Pclient } from "@/lib/prismadb";
import {getCurrentUser} from "./getCurrentUser";


export const getCurrentAdmin = async ()=>{
    try {
        const user= await getCurrentUser();
    
        if (!user) {
          return null;
        }
    
        const currentteacher = await Pclient.teacher.findUnique({
          where: {
            email: user.email as string
          }
        });
    
        if (!currentteacher) {
          return null;
        }
    
        return currentteacher;
      } catch (error: any) {
        return null;
      }
    }