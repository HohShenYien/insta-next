import prisma from "@/utils/prisma";
import attachImage from "../images/attach-image";
const findSinglePost = async (userId: string, postId: string) => {
  const { user, ...post } = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
    include: {
      user: true,
      _count: {
        select: {
          liked_bys: true,
        },
      },
      liked_bys: {
        where: {
          user_id: userId,
        },
      },
    },
  });
  const postWithImage = await attachImage(post, "post");
  const authorWithImage = await attachImage(user, "user");
  return { post: postWithImage, author: authorWithImage };
};

export default findSinglePost;
