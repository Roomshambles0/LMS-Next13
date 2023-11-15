
import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";
import { Pclient } from "@/lib/prismadb";
import { NextResponse } from "next/server";



export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const teacher = await getCurrentAdmin();
    const { isCompleted } = await req.json();

    if (!teacher) {
      return new NextResponse("Unauthorized", { status: 401 });
    } 

    const userProgress = await Pclient.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: params.chapterId,
        }
      },
      update: {
        isCompleted
      },
      create: {
        userId,
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