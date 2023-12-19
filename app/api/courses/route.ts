

import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";
import { Pclient } from "@/lib/prismadb";
import { createcourseinput } from "@/lib/validations/createinput";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
     const teacher = await getCurrentAdmin();
     if(!teacher){
      return NextResponse.json({message:"unauthorized"},{status:401})
     }
     const teacherId = teacher?.id;

     const body = await req.json();
     const parsedinput = createcourseinput.safeParse(body);
     if(!parsedinput.success)
     {
        return NextResponse.json({Message:"add correct input"});
     }
    
     
     const { title } = body ;
     
   
     const createcourse = await Pclient.course.create({
        data:{
            teacherId,
            title,
        }
     })
     return NextResponse.json({message:"Course Created Succefully",createcourse},{status:200})
    }catch(e){
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}


