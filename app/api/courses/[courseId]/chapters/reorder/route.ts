
import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";
import { Pclient } from "@/lib/prismadb";
import { NextResponse } from "next/server";



export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; } }
) {
  try {
  const teacher = await getCurrentAdmin()

    if (!teacher) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { list } = await req.json();

    const ownCourse = await Pclient.course.findUnique({
      where: {
        id: params.courseId,
        teacherId:teacher.id
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (let item of list) {
      await Pclient.chapter.update({
        where: { id: item.id },
        data: { position: item.position }
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}