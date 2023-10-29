"use client";

"use client";
import { useSession } from "next-auth/react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { LogIn } from 'lucide-react';


export const Navbarroutes = ()=>{
    const session = useSession();
    const name = session.data?.user?.name;
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";
    

    if(name || isCoursePage || isTeacherPage){
        return(
    <div>hello</div>
            )
    }else{
        return(<>
         <Link
          href='/studentauth/signin'
          
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-3 top-4 md:right-8 md:top-6 "
          )}
        >
        <LogIn size={19} />
          Login
        </Link>
            <Link
          href='/studentauth/signin'
          
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-4 top-4 md:right-8 md:top-6 "
          )}
        >
        <LogIn size={19} />
          Login
        </Link>
        </>
        )
    }
    
}