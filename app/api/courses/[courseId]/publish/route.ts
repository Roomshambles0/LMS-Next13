
import { NextResponse } from "next/server";


import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";
import { Pclient } from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const teacher = await getCurrentAdmin();

    if (!teacher) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await Pclient.course.findUnique({
      where: {
        id: params.courseId,
        teacherId:teacher.id,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          }
        }
      }
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);

    if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedCourse = await Pclient.course.update({
      where: {
        id: params.courseId,
        teacherId:teacher.id,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}