

import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";
import { Pclient } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
     const teacher = await getCurrentAdmin();
     if(!teacher){
      return NextResponse.json({message:"unauthorized"},{status:401})
     }
     const teacherId = teacher?.id;
     const { title } = await req.json();
     
   
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

