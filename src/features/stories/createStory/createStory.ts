import createImage from "@/features/images/createImage/createImage";
import { CreateStoryParams } from "./createStory.schema";
import prisma from "@/utils/prisma";

export default async function createStory(
  data: CreateStoryParams,
  userId: string
) {
  const story = await prisma.story.create({
    data: {
      caption: data.caption,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  await createImage(data.image, "story", story.id);

  return story;
}
