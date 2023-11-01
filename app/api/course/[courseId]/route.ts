import { NextResponse } from "next/server"
import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";
import { Pclient } from "@/lib/prismadb";


interface IParams {
    courseId?: string;
  }
  

export async function GET(request: Request, { params }: { params: IParams }) {    
    try{

    const admin = await getCurrentAdmin();

        if(admin){
    const course = await Pclient.course.findUnique(
        {
            where: {
                id: params.courseId,
                teacherId:admin.id
              },
              include: {
                chapters: {
                  orderBy: {
                    position: "asc",
                  },
                },
                attachments: {
                  orderBy: {
                    createdAt: "desc",
                  },
                },
              },
        }
     )

     const categories = await Pclient.category.findMany({
        orderBy:{
            name:"asc"
        }
     })
     console.log(course,categories)
     return NextResponse.json({course,categories})
        }else{
           return NextResponse.json({message:"teacher not found"})
        }
    }catch(e){
        console.log(e)
       return NextResponse.json(null);
    }
}