import attachImage from "../images/attach-image";
import prisma from "@/utils/prisma";

const findManyPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      _count: {
        select: {
          liked_bys: true,
        },
      },
    },
    orderBy: { created_at: "desc" },
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

export default findManyPosts;
