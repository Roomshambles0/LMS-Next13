import { Background } from "@/components/Background";
import { ReactNode } from "react";

export default function AuthLayout( 
    {children} :{children:ReactNode}
){
    return(
        <div className="flex h-screen w-screen justify-center">
   <Background />
   {children}
        </div>
    )
}