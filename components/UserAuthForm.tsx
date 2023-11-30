"use client"

import * as React from "react"

import { Icons } from "@/components/icons"
import { Button } from "@/components//ui/button"
import { signIn, useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"



interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()

  return (
    <div >
      <div className="grid gap-2">
      <Button variant="outline" type="button" disabled={isLoading} onClick={()=>{
        signIn("github", { redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials!');
          }
  
          if (callback?.ok) {
         
          }
        })
        .finally(() => setIsLoading(false));
    } 
    }>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
       Continue with Github
      </Button>
   
      </div>
    </div>
  )
}