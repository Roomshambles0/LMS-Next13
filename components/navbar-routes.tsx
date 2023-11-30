"use client";

"use client";
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation";

import { Profilebutton } from "./User-Profile-Button";
import { Logindialogue } from "./login-dialogue";

export const Navbarroutes = ()=>{
    const session = useSession();
    const name = session.data?.user?.name;
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";
    

    if(name){
        return(<div className="absolute right-8  top-4 md:right-16 md:top-6">
       <Profilebutton />
       </div>
            )
    }
    else{
        return(<>
           <Logindialogue></Logindialogue>
        </>
        )
    }
    
}