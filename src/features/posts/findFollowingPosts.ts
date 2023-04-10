import attachImage from "../images/attach-image";
import prisma from "@/utils/prisma";

const findFollowingPosts = async (userId: string) => {
  const posts = await prisma.post.findMany({
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
    orderBy: { created_at: "desc" },
    where: {
      OR: [
        {
          user: {
            followers: {
              some: {
                follower_id: userId,
              },
            },
          },
        },
        {
          user_id: userId,
        },
      ],
    },
  });

  return await Promise.all(
    posts.map(async (post) => {
      const postsWithImages = await attachImage(post, "post");
      const postsWithAuthorWithImages = {
        ...postsWithImages,
        user: await attachImage(post.user, "user"),
      };
      return postsWithAuthorWithImages;
    })
  );
};

export default findFollowingPosts;
