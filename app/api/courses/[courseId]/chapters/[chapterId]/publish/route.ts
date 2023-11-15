
import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";
import { Pclient } from "@/lib/prismadb";
import { NextResponse } from "next/server";



export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
   const teacher = await getCurrentAdmin()

    if (!teacher) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await Pclient.course.findUnique({
      where: {
        id: params.courseId,
        teacherId:teacher.id 
           }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await Pclient.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      }
    });

    const muxData = await Pclient.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      }
    });

    if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedChapter = await Pclient.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}