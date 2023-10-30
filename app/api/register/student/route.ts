import { Pclient } from "@/lib/prismadb";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { studentInput } from "@/lib/validations/userInput";

export async function POST(
    request: Request
  ){
    try{
        const body = await request.json();
        console.log(body)
        const {name,email,password} = body;
    
        const parsedadminInput =  studentInput.safeParse(body);
        if(!parsedadminInput.success){
            console.log(parsedadminInput.error)
           return NextResponse.json({"message":"add correct Input"} ,{status:401});
        }
       
    
    
        const role = Role.USER;
        const hashedpassword = await bcrypt.hash(password, 12);
  //creating user for next auth
        const user = await Pclient.user.create({
            data:{
                email,
                name,
                role,
                hashedpassword
            }
        })
        if(user){
        return NextResponse.json({message:"Account created successfully",name});
    }else{
        return NextResponse.json({"message":"take another username "},{status:401});
    }
    }catch (error) {
        console.error(error);
       return NextResponse.json({ message: "take another username " },{status:500});
      }
}