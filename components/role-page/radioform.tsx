"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { GraduationCap, School } from "lucide-react"
import axios from "axios"
import { redirect, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"


const FormSchema = z.object({
  type: z.enum([ "student", "teacher"], {
    required_error: "You need to select a role.",
  }),
})

export function RadioGroupForm() {
   const router = useRouter()
   const session =useSession()
   

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
        const response = await axios.patch("/api/role", data);
       
        const role = response.data.role;
        if(role == "ADMIN")
        {
          toast.success("continued as teacher");
          router.refresh()
        }else if(role == "USER")
        {
          toast.success("continued as student");
          router.refresh()
        } else
        {
          toast.error("something went wrong")
        }
      } catch {
        toast.error("Something went wrong");
      }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem >
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  <FormItem >
                    <FormControl>
                    <div>
                        <RadioGroupItem
                        value="teacher"
                        id="teacher"
                        className="peer sr-only"
                        />
                        <Label
                        htmlFor="teacher"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                        <School className="mb-3 h-6 w-6" />
                        Teacher
                        </Label>
                    </div>
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                    <div>
                        <RadioGroupItem value="student" id="student" className="peer sr-only" 

                        />
                        <Label
                        htmlFor="student"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                        <GraduationCap className="mb-3 h-6 w-6" />
                        Student
                        </Label>
                    </div>
                    </FormControl>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       <Button className="w-full mt-5" type="submit">Continue</Button>
      </form>
    </Form>
  )
}
