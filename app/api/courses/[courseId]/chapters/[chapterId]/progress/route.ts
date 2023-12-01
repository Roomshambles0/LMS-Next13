
import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { Pclient } from "@/lib/prismadb";
import { NextResponse } from "next/server";



export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const user = await getCurrentUser();
    const { isCompleted } = await req.json();
  
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    } 

    const userProgress = await Pclient.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId:user.id,
          chapterId: params.chapterId,
        }
      },
      update: {
        isCompleted
      },
      create: {
        userId:user.id,
        chapterId: params.chapterId,
        isCompleted,
      }
    })

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[CHAPTER_ID_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}