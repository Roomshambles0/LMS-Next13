"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export function CreateAccount() {
  const router = useRouter();
  const [email ,setEmail] = useState("");
  const [password,setPassword] = useState("");

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Teacher Sign in</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
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
          <Label htmlFor="email" >Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" onChange={(e)=>{
            setEmail(e.target.value)
          }}/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={async() => {
      signIn('admin', { redirect: false, username:email,password:password})
      .then((callback) => {
        if (callback?.error) {
          console.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/student')
        }
      })
}}>Sign in</Button>
      </CardFooter>
    </Card>
  )
}