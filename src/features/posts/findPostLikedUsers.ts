import attachImage from "../images/attach-image";

const findPostLikedUsers = async (postId: string, userId: string) => {
  const post = await prisma.post.findFirstOrThrow({
    where: {
      id: postId,
    },
    include: {
      liked_bys: {
        include: {
          user: {
            include: {
              followers: {
                where: {
                  follower_id: userId,
                },
              },
            },
          },
        },
      },
    },
  });

  const users = post.liked_bys.map((likedBy) => likedBy.user);

  return await Promise.all(
    users.map(async (user) => await attachImage(user, "user"))
  );
};

export default findPostLikedUsers;
