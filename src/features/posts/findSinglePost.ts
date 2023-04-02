import prisma from "@/utils/prisma";
import attachImage from "../images/attach-image";
const findSinglePost = async (postId: number) => {
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
    },
  });
  const postWithImage = await attachImage(post, "post");
  const authorWithImage = await attachImage(user, "user");
  return { post: postWithImage, author: authorWithImage };
};

export default findSinglePost;
