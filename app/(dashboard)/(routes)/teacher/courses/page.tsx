

import  Link  from "next/link";
import { Button } from "@/components/ui/button"
import {  columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { Pclient } from "@/lib/prismadb";
import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";
import toast from "react-hot-toast";

import { redirect } from "next/navigation";
 

const courses = async()=>{
    
    const teacher = await getCurrentAdmin();
    if(!teacher){
        toast.error("User not found")
         return redirect("/")
    }
    const Course = await Pclient.course.findMany({
        where:{
          teacherId: teacher?.id
        },
        orderBy: {
            createdAt: "desc",
          },
    }
    ) 
    
    console.log(Course)
    return(
        <>
    <div className=" md:ml-60 ml-4 mt-24">
       <Link href="/teacher/create">
       <Button>New Course</Button>
       </Link> 
        <div className="container mx-auto py-10">
      <DataTable columns={columns} data={Course} />
    </div>
    </div>
   
    </>)
}

export default courses;