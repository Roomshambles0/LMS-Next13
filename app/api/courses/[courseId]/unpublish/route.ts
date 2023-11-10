
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
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const unpublishedCourse = await Pclient.course.update({
      where: {
        id: params.courseId,
        teacherId:teacher.id,
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}