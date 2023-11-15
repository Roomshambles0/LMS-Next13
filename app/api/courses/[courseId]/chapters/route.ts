
import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";
import { Pclient } from "@/lib/prismadb";
import { NextResponse } from "next/server";



export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
   const teacher = await getCurrentAdmin();
    const { title } = await req.json();

    if (!teacher) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await Pclient.course.findUnique({
      where: {
        id: params.courseId,
        teacherId:teacher.id,
      }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastChapter = await Pclient.chapter.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await Pclient.chapter.create({
      data: {
        title,
        courseId: params.courseId,
        position: newPosition,
      }
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}