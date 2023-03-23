import attachImage from "../images/attach-image";
import prisma from "@/utils/prisma";

const findManyStories = async () => {
  const stories = await prisma.story.findMany();

  return await Promise.all(
    stories.map(async (story) => await attachImage(story, "story"))
  );
};

export default findManyStories;
