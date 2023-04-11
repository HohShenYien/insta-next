import prisma from "@/utils/prisma";
const createPostLikes = async (userId: string, postId: string) => {
  return await prisma.postLike.upsert({
    where: {
      // We used a composite primary key,
      // so we must nest them under the prismary key
      user_id_post_id: {
        post_id: postId,
        user_id: userId,
      },
    },
    update: {},
    create: {
      post_id: postId,
      user_id: userId,
    },
  });
};

export default createPostLikes;
