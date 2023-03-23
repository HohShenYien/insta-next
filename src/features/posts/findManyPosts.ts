import attachImage from "../images/attach-image";
import prisma from "@/utils/prisma";

const findManyPosts = async () => {
  const posts = await prisma.post.findMany();

  return await Promise.all(
    posts.map(async (post) => await attachImage(post, "post"))
  );
};

export default findManyPosts;
