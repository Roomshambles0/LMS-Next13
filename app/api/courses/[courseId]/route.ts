import Mux from "@mux/mux-node";
import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";
import { NextResponse } from "next/server";

import { Pclient } from "@/lib/prismadb";


// // const { Video } = new Mux(
// //   process.env.MUX_TOKEN_ID!,
// //   process.env.MUX_TOKEN_SECRET!,
// // );

// const Video ={}

// export async function DELETE(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const teacher = await getCurrentAdmin();

//     if (!teacher) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await Pclient.course.findUnique({
//       where: {
//         id: params.courseId,
//         teacherId: teacher.id,
//       },
//       include: {
//         chapters: {
//           include: {
//             muxData: true,
//           }
//         }
//       }
//     });

//     if (!course) {
//       return new NextResponse("Not found", { status: 404 });
//     }

//     for (const chapter of course.chapters) {
//       if (chapter.muxData?.assetId) {
//         await Video.Assets.del(chapter.muxData.assetId);
//       }
//     }

//     const deletedCourse = await Pclient.course.delete({
//       where: {
//         id: params.courseId,
//       },
//     });

//     return NextResponse.json(deletedCourse);
//   } catch (error) {
//     console.log("[COURSE_ID_DELETE]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
   const teacher = await getCurrentAdmin();
    const { courseId } = params;
    const values = await req.json();
    console.log(values)
    if (!teacher) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await Pclient.course.update({
      where: {
        id: courseId,
        teacherId:teacher.id
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}