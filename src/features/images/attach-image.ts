import { Image } from "@prisma/client";
import prisma from "@/utils/prisma";

export type AttachImage<T, Type extends string> = Type extends "user"
  ? T & { profile_pic?: Image } // for User's profile picture
  : Type extends "story"
  ? T & { image: Image } // for stories
  : T & {
      images: Image[]; // for posts
    };

export default async function attachImage<
  T extends { id: string },
  Type extends string
>(object: T, type: Type): Promise<AttachImage<T, Type>> {
  const images = await prisma.image.findMany({
    where: {
      associated_id: object.id,
      type,
    },
  });
  switch (type) {
    case "user":
      return {
        ...object,
        profile_pic: images?.[0],
      } as AttachImage<T, Type>;
    case "story":
      return {
        ...object,
        image: images?.[0],
      } as AttachImage<T, Type>;
  }
  return {
    ...object,
    images,
  } as AttachImage<T, Type>;
}
