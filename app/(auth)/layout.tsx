import { Background } from "@/components/Background";
import { ReactNode } from "react";

export default function AuthLayout( 
    {children} :{children:ReactNode}
){
    return(
        <div>
   <Background />
   {children}
        </div>
    )
}
