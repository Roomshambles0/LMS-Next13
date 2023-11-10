
import { NextResponse } from "next/server";

import { Pclient } from "@/lib/prismadb";
import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string, attachmentId: string } }
) {
  try {
    const teacher = await getCurrentAdmin();
  
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

    const attachment = await Pclient.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

