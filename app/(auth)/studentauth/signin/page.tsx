import { CreateAccount } from "./components/login-page"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"





export default function StudentSignin(){

    return <>
         <Link
          href="/studentauth/signin"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Signup
        </Link>
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] pt-28 ">
        <CreateAccount/>
    </div>
    </>
}