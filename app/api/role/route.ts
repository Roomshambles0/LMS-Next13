import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { Pclient } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { roleinput } from "@/lib/validations/roleinput";


export async function PATCH(req:Request){
try
{
    const user = await getCurrentUser();
    if(!user)
    {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    
    const parsedinput = roleinput.safeParse(body);

    if(!parsedinput.success)
    {
      return NextResponse.json({message:"send correct input"});
    }

    

    let role;
    if(body.type == "teacher")
    {
      role = Role.ADMIN;
    }
    else if(body.type =="student")
    {
      role = Role.USER
    }
    else
    {
      return NextResponse.json({message:"please select apropriate role"});
    }

    const nuser = await Pclient.user.update({
        where: {
          id: user.id,
        },
        data: {
          role: role,
        }
      });
   
    //creating teacher 
  if(nuser.role=="ADMIN"){
    const teacher = await Pclient.teacher.create({
      data:{
        email:user.email,
        name:user.name,
      }
    })
  }


return NextResponse.json({"message":`continued as ${nuser.role}`, role:nuser.role})
}
catch(error)
{
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
}
 

}