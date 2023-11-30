
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadioGroupForm } from "./radioform"


export function RoleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select your role</CardTitle>
        <CardDescription>
          Choose how you want to continue with 
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroupForm></RadioGroupForm>
      </CardContent>
    </Card>
  )
}