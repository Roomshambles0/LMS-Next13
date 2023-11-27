"use client"

import * as React from "react"
import axios from "axios";
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components//ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter();
  const [name ,setName] = React.useState("");
  const [email ,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");


  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label  htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => {
              setEmail(e.target.value);
                                }}
            />
        <Label htmlFor="name">username</Label>
            <Input
              id="name"
              placeholder="Monkey D. Luffy"
              onChange={(e) => {
                setName(e.target.value);
                                  }}
            />
           <p className="text-sm text-muted-foreground">
                This is your public display name.
              </p>
             <Label  htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                                  }}
            />
          </div>
          <Button disabled={isLoading} className="hoover:bg-white hoover:text-black" onClick={() => {
      axios.post(`/api/register/student`, {
        name: name,
        email: email,
        password: password
    }).then((response)=>{
  
    toast.success("account created successfully")
    signIn('user', { redirect: false, username:email,password:password})
      .then((callback) => {
        if (callback?.error) {
          console.error('Invalid credentials!');
        }
  
        if (callback?.ok) {
          router.push('/')
        }
      })
    }).catch((e) =>{ 
      console.log(e);
    toast.error(e.response.data.message);
          })}}
    >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign up
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid gap-2">
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      </div>
    </div>
  )
}