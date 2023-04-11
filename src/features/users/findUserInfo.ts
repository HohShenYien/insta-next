import prisma from "@/utils/prisma";
import attachImage from "../images/attach-image";

const findUserInfo = async (username: string, userId: string) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
      followers: {
        where: {
          follower_id: userId,
        },
      },
    },
  });

  return await attachImage(user, "user");
};

export default findUserInfo;
