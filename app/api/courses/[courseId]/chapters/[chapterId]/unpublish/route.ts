
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

    const unpublishedChapter = await Pclient.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      }
    });

    const publishedChaptersInCourse = await Pclient.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      }
    });

    if (!publishedChaptersInCourse.length) {
      await Pclient.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        }
      });
    }

    return NextResponse.json(unpublishedChapter);
  } catch (error) {
    console.log("[CHAPTER_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}