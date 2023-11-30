"use client";

import { Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import Link from "next/link"
import {RoleCard} from "./role-ui"
import { Icons } from "@/components/icons"
import React from "react"
import { User } from "lucide-react";


export function Roledialogue() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
      <div className="container relative  h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0 ">
        <div className="lg:p-8 p-8 pt-28">
          <div className="mx-auto flex w-full flex-col  space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to LMS platform
              </h1>
              <p className="text-sm text-muted-foreground">
                After registering to service you have to select how you are going use our service.
              </p>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <User className="mr-2 h-4 w-4" />
        )}{" "}
        Select Role
      </Button>
          </div>
        </div>
      </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>LMS platform</DialogTitle>
          <DialogDescription>
           To continue learning
          </DialogDescription>
        </DialogHeader>
        <div className="lg:p-8 p-6 pt-4 ">
           <RoleCard/>
            <p className="px-8 pt-2 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        
      
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
