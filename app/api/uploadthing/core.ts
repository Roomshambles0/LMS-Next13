import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";
import { error } from "console";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();


const handleauth = async()=>{
  const teacher = await getCurrentAdmin();
  if(!teacher)throw new Error("unauthorized");
  return {teacher};
}
 

export const ourFileRouter = {
 courseImage:f({image:{maxFileSize:"4MB",maxFileCount:1}}).
 middleware(async()=>{
  console.log("at uploadthing middleware")
  const res = await handleauth()
   return {userId:res.teacher.id}
}).onUploadComplete(()=>{}),
chapterVideo:f({video:{maxFileSize:"512GB",maxFileCount:1}}).
middleware(async()=>{
 const res = await handleauth()
  return{userId:res.teacher.id}
}).onUploadComplete(()=>{}),
courseAttachment: f(["text","image","video","audio"]).
middleware(async()=>{
 const res = await handleauth()
  return {userId:res.teacher.id}
}).onUploadComplete(()=>{})


 
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;