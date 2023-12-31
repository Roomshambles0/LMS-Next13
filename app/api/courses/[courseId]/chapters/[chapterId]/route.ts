import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";
import { Pclient } from "@/lib/prismadb";
import Mux, { Asset } from "@mux/mux-node";
import { error } from "console";

import { NextResponse } from "next/server";





const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const teacher = await getCurrentAdmin();

    if (!teacher) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await Pclient.course.findUnique({
      where: {
        id: params.courseId,
        teacherId:teacher.id,
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
    console.log(chapter);
    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await Pclient.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        }
      });
     
      if (existingMuxData) {
        Video.Assets.get(existingMuxData.assetId).then(
          (responce)=>{
          Video.Assets.del(existingMuxData.assetId)
          }
        ).catch((error)=>{
          console.log(error)
        }
        ).finally(async()=>{
          await Pclient.muxData.delete({
            where: {
              id: existingMuxData.id,
            }
          });
        })
        }
      }

    const deletedChapter = await Pclient.chapter.delete({
      where: {
        id: params.chapterId
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

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const teacher = await getCurrentAdmin()
    const { isPublished, ...values } = await req.json();

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

    const chapter = await Pclient.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      }
    });

    console.log(chapter);

    if (values.videoUrl) {
      const existingMuxData = await Pclient.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        }
      });
   console.log(existingMuxData);
      if (existingMuxData) {
      Video.Assets.get(existingMuxData.assetId).then(
        (responce)=>{
        Video.Assets.del(existingMuxData.assetId)
        }
      ).catch((error)=>{
        console.log(error)
      }
      ).finally(async()=>{
        await Pclient.muxData.delete({
          where: {
            id: existingMuxData.id,
          }
        });
      })
      }
          
      const asset = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: "public",
        test: false,
      });

      console.log(asset);

      await Pclient.muxData.create({
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        }
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}