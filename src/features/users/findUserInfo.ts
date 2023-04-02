import prisma from "@/utils/prisma";
import attachImage from "../images/attach-image";

const findUserInfo = async (username: string) => {
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
    },
  });

  return await attachImage(user, "user");
};

export default findUserInfo;
