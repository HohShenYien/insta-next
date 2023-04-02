import attachImage from "../images/attach-image";
import prisma from "@/utils/prisma";

const findManyStories = async () => {
  const users = await prisma.user.findMany({
    include: {
      stories: true,
    },
  });

  return await Promise.all(
    users.map(async ({ stories, ...user }) => {
      const userWithImage = await attachImage(user, "user");
      const storiesWithImage = await Promise.all(
        stories.map(async (story) => attachImage(story, "story"))
      );
      return { user: userWithImage, stories: storiesWithImage };
    })
  );
};

export default findManyStories;
