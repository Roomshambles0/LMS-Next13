import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { LogIn } from "lucide-react"
import { UserAuthForm } from "./UserAuthForm"
import Link from "next/link"

export function Logindialogue() {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute right-4 top-4 md:right-8 md:top-6 "
          )}
        >
        <LogIn size={19} className="pr-1"/>
          Login
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in to our LMS platform</DialogTitle>
          <DialogDescription>
           To continue learning
          </DialogDescription>
        </DialogHeader>
        <div className="lg:p-8 p-6 pt-4 ">
            <UserAuthForm />
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
