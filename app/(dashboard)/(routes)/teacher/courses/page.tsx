
import  Link  from "next/link";
import { Button } from "@/components/ui/button"

const courses = ()=>{

    return(
    <div className="flex md:ml-60 ml-4 mt-24">
       <Link href="/teacher/create">
       <Button>New Course</Button>
       </Link>
    </div>)
}

export default courses;