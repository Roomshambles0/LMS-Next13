
import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";
import { Pclient } from "@/lib/prismadb";
import { NextResponse } from "next/server";



export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const teacher = await getCurrentAdmin();
    const { url } = await req.json();

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

    const attachment = await Pclient.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: params.courseId,
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}