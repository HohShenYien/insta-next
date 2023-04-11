import prisma from "@/utils/prisma";

const createUserFollower = async (userId: string, followerId: string) => {
  return await prisma.userFollower.upsert({
    where: {
      // We used a composite primary key,
      // so we must nest them under the prismary key
      user_id_follower_id: {
        follower_id: followerId,
        user_id: userId,
      },
    },
    update: {},
    create: {
      follower_id: followerId,
      user_id: userId,
    },
  });
};

export default createUserFollower;
