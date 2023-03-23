import { Post } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { AttachImage } from "@/features/images/attach-image";
import findManyPosts from "@/features/posts/findManyPosts";

export type AllPostsData = {
  posts: AttachImage<Post, "post">[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AllPostsData>
) {
  const posts = await findManyPosts();
  res.status(200).json({ posts });
}
