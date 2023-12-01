import { Pclient } from "@/lib/prismadb";
import getSession from "./getSession";


export const getCurrentAdmin = async ()=>{
    try {
        const ssuser = await getSession();
        
        if (!ssuser) {
          return null;
        }
    
        const currentteacher = await Pclient.teacher.findUnique({
          where: {
            email: ssuser.user?.email as string
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