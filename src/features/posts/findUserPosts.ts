import prisma from "@/utils/prisma";
import attachImage from "../images/attach-image";

const findUserPosts = async (username: string) => {
  const { posts } = await prisma.user.findFirstOrThrow({
    where: {
      username,
    },
    include: {
      posts: {
        include: {
          _count: {
            select: {
              liked_bys: true,
            },
          },
        },
      },
    },
  });

  // This is certainly bad in performance since we only need 1
  // and we are fetching everything
  return await Promise.all(
    posts.map(async (post) => await attachImage(post, "post"))
  );
};

export default findUserPosts;
